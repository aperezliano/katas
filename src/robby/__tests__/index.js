const getCommands = require('../');

it.each([
  ['T.S.', 5, ['f']],
  ['S.......T', 10, ['r', 'f', 'f', 'r', 'f', 'f']],
  ['S.......T', 5, []],
  ['S#.##...T', 20, []],
])('works for simple fields %p %p %p', (field, power, solution) => {
  expect(getCommands(field, power)).toEqual(solution);
});
