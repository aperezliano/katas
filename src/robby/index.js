module.exports = getCommands;

/**
 *
 * @param {string} field
 * @param {number} power
 * @returns {string[]}
 */
function getCommands(field, power) {
  const fieldArray = getFieldArray(field);
  const startingCell = getStartingCell(fieldArray);
  if (!startingCell) return [];

  startingCell.visited = true;
  startingCell.orientation = Orientation.UP;
  startingCell.cost = 0;
  const queue = [startingCell];

  while (queue.length > 0) {
    const cell = popMinVertex(queue);
    cell.visited = true;
    if (cell.type === Fields.TARGET && cell.cost <= power) return cell.moves;
    const updatedCells = updateNeighbourCells(fieldArray, cell, power);
    queue.push(...updatedCells);
  }

  return [];
}

/**
 *
 * @param {[Cell[]]} cells
 * @param {Cell} cell
 * @param {number} addedCost
 * @param {number} orientation
 * @param {[number, number]} coords
 * @param {[string]} moves
 */
function updateCell(cells, cell, addedCost, orientation, coords, moves, power) {
  const [x, y] = coords;
  if (y < 0 || y >= cells.length || x < 0 || x >= cells.length) return null;

  const cellToUpdate = cells[y][x];
  if (cellToUpdate.visited || cellToUpdate.type === Fields.BLOCKED) return null;
  if (
    cellToUpdate.cost < cell.cost + addedCost ||
    power < cell.cost + addedCost
  )
    return null;

  cellToUpdate.orientation = orientation;
  cellToUpdate.cost = cell.cost + addedCost;
  cellToUpdate.moves = [...cell.moves, ...moves];
  return cellToUpdate;
}

/**
 *
 * @param {Cell[]} cells
 * @param {Cell} cell
 * @returns {Cell[]}
 */
function updateNeighbourCells(cells, cell, power) {
  const [x, y] = [cell.x, cell.y];
  let frontCoords = [];
  let rightCoords = [];
  let leftCoords = [];
  let leftOrientation;
  let rightOrientation;
  switch (cell.orientation) {
    case Orientation.UP:
      frontCoords = [x, y - 1];
      rightCoords = [x + 1, y];
      leftCoords = [x - 1, y];
      rightOrientation = Orientation.RIGHT;
      leftOrientation = Orientation.LEFT;
      break;
    case Orientation.RIGHT:
      frontCoords = [x + 1, y];
      rightCoords = [x, y + 1];
      leftCoords = [x, y - 1];
      rightOrientation = Orientation.DOWN;
      leftOrientation = Orientation.UP;
      break;
    case Orientation.DOWN:
      frontCoords = [x, y + 1];
      rightCoords = [x - 1, y];
      leftCoords = [x + 1, y];
      rightOrientation = Orientation.LEFT;
      leftOrientation = Orientation.RIGHT;
      break;
    case Orientation.LEFT:
      frontCoords = [x - 1, y];
      rightCoords = [x, y - 1];
      leftCoords = [x, y + 1];
      rightOrientation = Orientation.UP;
      leftOrientation = Orientation.DOWN;
      break;
  }
  const updatedFrontCell = updateCell(
    cells,
    cell,
    1,
    cell.orientation,
    frontCoords,
    ['f'],
    power
  );
  const updatedRightCell = updateCell(
    cells,
    cell,
    2,
    rightOrientation,
    rightCoords,
    ['r', 'f'],
    power
  );
  const updatedLeftCell = updateCell(
    cells,
    cell,
    2,
    leftOrientation,
    leftCoords,
    ['l', 'f'],
    power
  );

  const updatedCells = [];
  updatedCells.push(
    ...[updatedFrontCell, updatedRightCell, updatedLeftCell].filter((e) => !!e)
  );

  return updatedCells;
}

/**
 *
 * @param {Cell[]} cells
 * @returns {Cell}
 */
function popMinVertex(cells) {
  let min = Infinity;
  let index = -1;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].cost < min) {
      index = i;
      min = cells[i].cost;
    }
  }
  return cells.splice(index, 1)[0];
}

/**
 *
 * @param {[Cell[]]} fieldArray
 * @returns {Cell?}
 */
function getStartingCell(fieldArray) {
  for (let y = 0; y < fieldArray.length; y++) {
    let startingCell = fieldArray[y].find((cell) => cell.type === Fields.START);
    if (startingCell) return startingCell;
  }
  return null;
}

/**
 *
 * @param {string} field
 * @returns [Cell[]]
 */
function getFieldArray(field) {
  const fieldSize = Math.sqrt(field.length);
  const fieldArray = [...field];

  let y = 0;
  while (fieldArray.length > fieldSize) {
    fieldArray.push(
      fieldArray.splice(0, fieldSize).map((e, x) => new Cell(e, x, y))
    );
    y++;
  }
  return fieldArray;
}

/**
 *
 * @param {any} type
 * @param {number} x
 * @param {number} y
 */
function Cell(type, x, y) {
  this.type = type;
  this.orientation = null;
  this.visited = false;
  this.moves = [];
  this.x = x;
  this.y = y;
  this.cost = Infinity;
  this.orientation = null;
}

const Fields = {
  WALKABLE: '.', // Robby may walk on this
  BLOCKED: '#', // Robby must not walk on this
  START: 'S', // Robby is starting here, he may also walk here
  TARGET: 'T', // The target cell, Robby has to reach
};

const Orientation = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
};
