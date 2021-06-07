const { decodeRailFenceCipher, encodeRailFenceCipher } = require('../index');

it('encodes WEAREDISCOVEREDFLEEATONCE with 3 rails', () => {
  expect(encodeRailFenceCipher('WEAREDISCOVEREDFLEEATONCE', 3)).toBe(
    'WECRLTEERDSOEEFEAOCAIVDEN'
  );
});

it('decodes WECRLTEERDSOEEFEAOCAIVDEN with 3 rails', () => {
  expect(decodeRailFenceCipher('WECRLTEERDSOEEFEAOCAIVDEN', 3)).toBe(
    'WEAREDISCOVEREDFLEEATONCE'
  );
});

it('encodes HELLOWORLD with 4 rails', () => {
  expect(encodeRailFenceCipher('HELLOWORLD', 4)).toBe('HOEWRLOLLD');
});

it('decodes HOEWRLOLLD with 4 rails', () => {
  expect(decodeRailFenceCipher('HOEWRLOLLD', 4)).toBe('HELLOWORLD');
});
