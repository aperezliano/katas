const checkPipe = require('../index');

it('test 1', () => {
  const pipe = ['╋━━┓', '┃..┃', '┛..┣'];
  expect(checkPipe(pipe)).toBe(true);
});

it('test 2', () => {
  const pipe = ['...┏', '┃..┃', '┛..┣'];
  expect(checkPipe(pipe)).toBe(false);
});

it('test 3', () => {
  const pipe = ['...┏', '...┃', '┛..┣'];
  expect(checkPipe(pipe)).toBe(false);
});

it('test 4', () => {
  const pipe = ['...┏', '...┃', '┓..┣'];
  expect(checkPipe(pipe)).toBe(true);
});

it('test 5', () => {
  const pipe = ['╋', '╋', '╋'];
  expect(checkPipe(pipe)).toBe(true);
});

it('test 6', () => {
  const pipe = ['╋....', '┃..┛.', '┃....'];
  expect(checkPipe(pipe)).toBe(false);
});

it('test 7', () => {
  const pipe = ['....', '.┛┛.', '....'];
  expect(checkPipe(pipe)).toBe(true);
});
