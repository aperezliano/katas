const triangle = require('../index');

it.each([['B'], ['G'], ['R']])('works for a single node: %p', (node) => {
  expect(triangle(node)).toBe(node);
});

it.each([
  ['BG', 'R'],
  ['RG', 'B'],
  ['BR', 'G'],
])('works for a single combination: %p %p', (node, combined) => {
  expect(triangle(node)).toBe(combined);
});

it.each([
  ['GG', 'G'],
  ['BB', 'B'],
  ['RR', 'R'],
])('works for a single of same colors: %p %p', (node, combined) => {
  expect(triangle(node)).toBe(combined);
});

it('works for RGBG', () => {
  expect(triangle('RGBG')).toBe('B');
});

it('works for RBRGBRB', () => {
  expect(triangle('RBRGBRB')).toBe('G');
});

it('works for RBRGBRBGGRRRBGBBBGG', () => {
  expect(triangle('RBRGBRBGGRRRBGBBBGG')).toBe('G');
});
