const equalTo24 = require('../index');

it.each([
  [1, 2, 3, 4, '((1*2)*(3*4))'],
  [2, 3, 4, 5, '(4*(5+(3-2)))'],
  [3, 4, 5, 6, '(6*(5-(4-3)))'],
  [1, 1, 1, 13, '((1+1)*(13-1))'],
  [1, 1, 1, 1, "It's not possible!"],
  [13, 13, 13, 13, "It's not possible!"],
])('%p %p %p %p', (a, b, c, d, expected) => {
  expect(equalTo24(a, b, c, d)).toBe(expected);
});
