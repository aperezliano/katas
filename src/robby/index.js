module.exports = getCommands;

const Fields = {
  WALKABLE: '.', // Robby may walk on this
  BLOCKED: '#', // Robby must not walk on this
  START: 'S', // Robby is starting here, he may also walk here
  TARGET: 'T', // The target cell, Robby has to reach
};

const Orientations = ['n', 'e', 's', 'w'];

const isInRange = ([x, y], field) =>
  y >= 0 && y < field.length && x >= 0 && x < field.length;
const isTarget = ([x, y], field) => field[y][x] === Fields.TARGET;
const isBlocked = ([x, y], field) => field[y][x] === Fields.BLOCKED;

function getNextPoint(orientation, x, y) {
  switch (orientation) {
    case 'n':
      return [x, y - 1];
    case 'e':
      return [x + 1, y];
    case 's':
      return [x, y + 1];
    default:
      return [x - 1, y];
  }
}

function turnRight(currentCell) {
  const newOrientation =
    Orientations[(Orientations.indexOf(currentCell.orientation) + 1) % 4];
  return new Cell(
    new Coords(currentCell.x, currentCell.y),
    newOrientation,
    currentCell.power - 1,
    [...currentCell.moves, 'r']
  );
}

function turnLeft(currentCell) {
  const newOrientation =
    Orientations[(Orientations.indexOf(currentCell.orientation) + 3) % 4];
  return new Cell(
    new Coords(currentCell.x, currentCell.y),
    newOrientation,
    currentCell.power - 1,
    [...currentCell.moves, 'l']
  );
}

function tryMoveForward(currentCell, field) {
  const nextPoint = getNextPoint(
    currentCell.orientation,
    currentCell.x,
    currentCell.y
  );
  if (!isInRange(nextPoint, field) || isBlocked(nextPoint, field)) return [];

  return [
    new Cell(
      new Coords(...nextPoint),
      currentCell.orientation,
      currentCell.power - 1,
      [...currentCell.moves, 'f']
    ),
  ];
}

function getNextCells(currentCell, field) {
  return currentCell.power > 0
    ? [
        turnRight(currentCell),
        turnLeft(currentCell),
        ...tryMoveForward(currentCell, field),
      ]
    : [];
}

function getCommands(field, power) {
  const fieldArray = getFieldArray(field);
  const start = getStart(fieldArray, power);
  const queue = [start];
  const known = new Set();
  known.add(start.toString());
  while (queue.length > 0) {
    const cell = popMaxPowerVertex(queue);
    if (isTarget([cell.x, cell.y], fieldArray)) return cell.moves;
    const nextCells = getNextCells(cell, fieldArray).filter(
      (c) => !known.has(c.toString())
    );
    queue.push(...nextCells);
    nextCells.forEach((c) => known.add(c.toString()));
  }
  return [];
}

/**
 *
 * @param {Cell[][]} fieldArray
 * @param {number} power
 * @returns {Cell?}
 */
function getStart(fieldArray, power) {
  for (let y = 0; y < fieldArray.length; y++) {
    let x = fieldArray[y].findIndex((cell) => cell === Fields.START);
    if (x > -1) return new Cell(new Coords(x, y), Orientations[0], power);
  }
  return null;
}

/**
 *
 * @param {string} field
 * @returns {string[][]}
 */
function getFieldArray(field) {
  const fieldSize = Math.sqrt(field.length);
  const fieldArray = [...field];

  let y = 0;
  while (fieldArray.length > fieldSize) {
    fieldArray.push(fieldArray.splice(0, fieldSize).map((e) => e));
    y++;
  }
  return fieldArray;
}

/**
 *
 * @param {Coords} coords
 * @param {string} orientation
 * @param {number} power
 * @param {string[]} moves
 */
function Cell({ x, y }, orientation, power = 0, moves = []) {
  this.orientation = orientation;
  this.x = x;
  this.y = y;
  this.moves = moves;
  this.power = power;
}

Cell.prototype.toString = function toString() {
  return `${this.x},${this.y},${this.orientation}`;
};

function Coords(x, y) {
  this.x = x;
  this.y = y;
}

function popMaxPowerVertex(queue) {
  let max = -Infinity;
  let index = -1;
  for (let i = 0; i < queue.length; i++) {
    if (queue[i].power > max) {
      index = i;
      max = queue[i].power;
    }
  }
  return queue.splice(index, 1)[0];
}
