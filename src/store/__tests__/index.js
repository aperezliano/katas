const { Store, Product, Discount } = require('../index');

it('creates a Store', () => {
  const store = new Store();
  expect(store).not.toBeNull();
});

it('sets products', () => {
  const store = new Store();
  store.setProducts([new Product('foo', 1), new Product('baz', 2)]);
  expect(store.products.get('foo')).toBe(1);
  expect(store.products.get('baz')).toBe(2);
});

it('sets discounts', () => {
  const store = new Store();
  store.setDiscounts([new Discount('foo', (amount) => amount / 3)]);
  expect(store.discounts.get('foo')).not.toBeNull();
});

it.each([
  [
    [
      ['grapes', 1],
      ['apples', 0],
      ['peaches', 1],
    ],
    12,
  ],
  [
    [
      ['grapes', 1],
      ['apples', 1],
      ['peaches', 1],
    ],
    15,
  ],
  [
    [
      ['grapes', 2],
      ['apples', 2],
      ['peaches', 1],
    ],
    16.8,
  ],
  [
    [
      ['grapes', 3],
      ['apples', 5],
      ['peaches', 2],
    ],
    36,
  ],
  [
    [
      ['peaches', 7],
      ['grapes', 7],
      ['apples', 7],
    ],
    85.8,
  ],
])('works for a simple case %p %p', (checkoutItems, solution) => {
  const products = [
    new Product('grapes', 5),
    new Product('apples', 3),
    new Product('peaches', 7),
  ];
  const discounts = [
    new Discount('grapes', (amount) => Math.ceil(amount / 2)),
    new Discount('apples', (amount) => (amount >= 2 ? amount * 0.8 : amount)),
  ];

  const store = new Store();
  store.setProducts(products);
  store.setDiscounts(discounts);

  expect(store.checkout(checkoutItems)).toBe(solution);
});
