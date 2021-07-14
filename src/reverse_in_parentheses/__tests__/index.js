const reverseInParentheses = require('../index');

it('Ex 1', () => {
  expect(reverseInParentheses('(bar)')).toBe('rab');
});

it('Ex 2', () => {
  expect(reverseInParentheses('foo(bar)baz')).toBe('foorabbaz');
});

it('Ex 3', () => {
  expect(reverseInParentheses('foo(bar)baz(blim)')).toBe('foorabbazmilb');
});

it('Ex 4', () => {
  expect(reverseInParentheses('foo(bar(baz))blim')).toBe('foobazrabblim');
});

it('Ex 5', () => {
  expect(reverseInParentheses('foo')).toBe('foo');
});
