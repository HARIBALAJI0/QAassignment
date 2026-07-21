import { test, expect } from '../../fixtures';
import { testUsers } from '../../test-data/constants/users';

test.describe('Login scenarios', () => {
  test('standard_user can log in and land on the products page', async ({ page, loginPage }) => {
    await loginPage.login(testUsers.standard_user.username, testUsers.standard_user.password);

    const productsPage = page.locator('[data-test="title"]');
    await expect(productsPage).toHaveText('Products');
  });

  test('locked_out_user sees error and is NOT logged in', async ({ page, loginPage }) => {
    await loginPage.login(testUsers.locked_out_user.username, testUsers.locked_out_user.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');
    expect(page.url()).toBe('https://www.saucedemo.com/');
  });
});
