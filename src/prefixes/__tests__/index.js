const getPrefixed = require('../index');

it('works for short list with prefix', () => {
  expect(getPrefixed(['12345', '9999', '13', '123'])).toBe(true);
});

it('works for short list without prefix', () => {
  expect(getPrefixed(['12345', '9999', '13', '1237'])).toBe(false);
});

it('works for larger list without prefix', () => {
  expect(
    getPrefixed(['12345', '9999', '143', '1237', '888', '131324', '9877'])
  ).toBe(false);
});

it('works for larger list with prefix', () => {
  expect(
    getPrefixed(['12345', '9999', '13', '1237', '888', '131324', '9877'])
  ).toBe(true);
});
