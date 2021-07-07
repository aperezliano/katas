const CacheLRU = require('../index');

it('Adds an element to the cache', () => {
  const cacheLRU = new CacheLRU();
  cacheLRU.getData(1);
  expect(cacheLRU.entries.size).toBe(1);
  expect(cacheLRU.list.length).toBe(1);
  expect(cacheLRU.list.head.data).toBe(1);
});

it('Evicts last used data if cache if full', () => {
  const cacheLRU = new CacheLRU();
  cacheLRU.getData(1);
  cacheLRU.getData(2);
  cacheLRU.getData(3);
  cacheLRU.getData(4);
  expect(cacheLRU.entries.size).toBe(3);
  expect(cacheLRU.list.length).toBe(3);
  expect(cacheLRU.list.head.data).toBe(4);
});
