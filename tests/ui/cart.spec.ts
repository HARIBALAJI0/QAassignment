import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Cart and product listing', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('cart badge updates to 2 after adding two products', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addFirstNProducts(2);

    await expect(productsPage.cartBadge).toHaveText('2');
  });

  test('sorting by Price (low to high) shows cheapest product first', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('lohi');

    const prices = await productsPage.getAllPrices();

    // First item must be the minimum price in the list
    const minPrice = Math.min(...prices);
    expect(prices[0]).toBe(minPrice);
  });
});
