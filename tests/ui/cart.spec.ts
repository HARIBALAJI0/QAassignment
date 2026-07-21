import { test, expect } from '../../fixtures';

test.describe('Cart and product listing', () => {
  test('cart badge updates to 2 after adding two products', async ({ authenticatedUser }) => {
    await authenticatedUser.productsPage.addFirstNProducts(2);
    await expect(authenticatedUser.productsPage.cartBadge).toHaveText('2');
  });

  test('sorting by Price (low to high) shows cheapest product first', async ({ authenticatedUser }) => {
    await authenticatedUser.productsPage.sortBy('lohi');

    const prices = await authenticatedUser.productsPage.getAllPrices();
    const minPrice = Math.min(...prices);
    expect(prices[0]).toBe(minPrice);
  });
});
