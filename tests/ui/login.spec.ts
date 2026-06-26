import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Login scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('standard_user can log in and land on the products page', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    const productsPage = new ProductsPage(page);
    await expect(productsPage.title).toHaveText('Products');
    expect(await productsPage.isOnProductsPage()).toBe(true);
  });

  test('locked_out_user sees error and is NOT logged in', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Error message must be visible
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');

    // URL must remain on the login page
    expect(page.url()).toBe('https://www.saucedemo.com/');
  });
});
