const equalTo24 = require('../index');

// it.each([
//   [1, 2, 3, 4, '(1+3)*(2+4)'],
//   [2, 3, 4, 5, '(5+3-2)*4'],
//   [3, 4, 5, 6, '(3-4+5)*6'],
//   [1, 1, 1, 1, "It's not possible!"],
//   [13, 13, 13, 13, "It's not possible!"],
// ])('%p %p %p %p', (a, b, c, d, expected) => {
//   expect(equalTo24(a, b, c, d)).toBe(expected);
// });

it.each([
  [1, 2, 3, 4, true],
  [2, 3, 4, 5, true],
  [3, 4, 5, 6, true],
  [1, 5, 1, 4, true],
  [2, 8, 10, 54, true],
  [1, 1, 1, 1, false],
  [13, 13, 13, 13, false],
  [1, 50, 1, 4, false],
  [100, 50, 10, 100, false],
])('%p %p %p %p', (a, b, c, d, expected) => {
  expect(equalTo24(a, b, c, d)).toBe(expected);
});
