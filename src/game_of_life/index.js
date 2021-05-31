module.exports = gameOfLife;

function gameOfLife(cells, generations) {
  if (generations === 0) return [[]];

  let solutionCells = [...cells.map((e) => [...e])];

  for (let generation = 0; generation < generations; generation++) {
    solutionCells = apply(
      [expandGeneration, calculateNewGeneration, contractGenerationAroundLivingCells],
      solutionCells
    );
  }

  return solutionCells;
}

function calculateNewGeneration(cells) {
  let newCells = [...cells.map((e) => [...e])];
  for (let y = 0; y < cells.length; y++) {
    for (let x = 0; x < cells[y].length; x++) {
      newCells[y][x] = isAlive(cells, x, y) ? 1 : 0;
    }
  }
  return newCells;
}

function isAlive(cells, x, y) {
  const alive = !!cells[y][x];
  const aliveNeighbours = numberOfAliveNeighbours(cells, x, y);
  if (alive && (aliveNeighbours === 2 || aliveNeighbours === 3)) return true;
  if (!alive && aliveNeighbours === 3) return true;
  return false;
}

function numberOfAliveNeighbours(cells, xCoord, yCoord) {
  function isOutOfBounds(cells, x, y) {
    return y < 0 || y >= cells.length || x < 0 || x >= cells[y].length;
  }
  let sum = 0;
  for (let y = yCoord - 1; y <= yCoord + 1; y++) {
    for (let x = xCoord - 1; x <= xCoord + 1; x++) {
      if ((x === xCoord && y === yCoord) || isOutOfBounds(cells, x, y)) continue;
      sum = !!cells[y][x] ? sum + 1 : sum;
    }
  }
  return sum;
}

function expandGeneration(cells) {
  function getArrayOfZeroes(length) {
    return new Array(length).fill(0);
  }

  return [
    getArrayOfZeroes(cells[0].length + 2),
    ...cells.map((e) => [0, ...e, 0]),
    getArrayOfZeroes(cells[0].length + 2),
  ];
}

function contractGenerationAroundLivingCells(cells) {
  let contractedCells = [...cells.map((e) => [...e])];
  while (contractedCells.length > 0 && contractedCells[0].every((e) => !e)) {
    contractedCells.shift();
  }
  while (contractedCells.length > 0 && contractedCells[contractedCells.length - 1].every((e) => !e)) {
    contractedCells.pop();
  }
  while (contractedCells[0].length > 0 && contractedCells.every((e) => !e[0])) {
    contractedCells.forEach((e) => e.shift());
  }
  while (contractedCells[contractedCells.length - 1].length > 0 && contractedCells.every((e) => !e[e.length - 1])) {
    contractedCells.forEach((e) => e.pop());
  }
  return contractedCells;
}

function apply(functions, acc) {
  return functions.reduce((result, func) => func(result), acc);
}
