const gameOfLife = require('../index');

const glider = [
  [1, 0, 0],
  [0, 1, 1],
  [1, 1, 0],
];

it('returns an empty matrix for a 0 generation', () => {
  expect(gameOfLife(glider, 0)).toEqual([[]]);
});

it('works for a first generation', () => {
  expect(gameOfLife(glider, 1)).toEqual([
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ]);
});

it('works for a second generation', () => {
  expect(gameOfLife(glider, 2)).toEqual([
    [1, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ]);
});

it('works for a third generation', () => {
  expect(gameOfLife(glider, 3)).toEqual([
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 1],
  ]);
});
