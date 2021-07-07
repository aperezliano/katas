class Store {
  constructor() {
    this.products = new Map();
    this.discounts = new Map();
  }

  /**
   *
   * @param {Product[]} products
   */
  setProducts(products) {
    products.forEach(({ product, price }) => this.products.set(product, price));
  }

  /**
   *
   * @param {Discount[]} discounts
   */
  setDiscounts(discounts) {
    discounts.forEach(({ product, discountFunction }) =>
      this.discounts.set(product, discountFunction)
    );
  }

  /**
   *
   * @param {[product: string, amount: number][]} products
   * @returns {number}
   */
  checkout(products) {
    const checkoutProducts = new Map();
    products.forEach(([product, amount]) => {
      let totalAmount = checkoutProducts.has(product)
        ? checkoutProducts.get(product) + amount
        : amount;
      checkoutProducts.set(product, totalAmount);
    });
    let checkoutPrice = 0;
    for (let [product, amount] of checkoutProducts) {
      if (this.discounts.has(product)) {
        const discountFunction = this.discounts.get(product);
        checkoutPrice += discountFunction(amount) * this.products.get(product);
      } else {
        checkoutPrice += amount * this.products.get(product);
      }
    }
    return checkoutPrice;
  }
}

class Product {
  /**
   *
   * @param {string} product
   * @param {number} price
   */
  constructor(product, price) {
    this.product = product;
    this.price = price;
  }
}

class Discount {
  /**
   *
   * @param {string} product
   * @param {(amount: number) => number} discountFunction
   */
  constructor(product, discountFunction) {
    this.product = product;
    this.discountFunction = discountFunction;
  }
}

module.exports = { Store, Product, Discount };
