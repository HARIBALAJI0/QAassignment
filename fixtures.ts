import { test as base, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { testUsers } from './test-data/constants/users';

type CustomFixtures = {
  loginPage: LoginPage;
  authenticatedUser: {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    checkoutPage: CheckoutPage;
  };
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  authenticatedUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUsers.standard_user.username, testUsers.standard_user.password);

    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await use({ loginPage, productsPage, checkoutPage });
  },
});

export { expect };
