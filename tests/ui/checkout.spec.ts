import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('completes checkout and shows Thank you confirmation', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add two products to cart
    await productsPage.addFirstNProducts(2);
    await expect(productsPage.cartBadge).toHaveText('2');

    // Navigate to cart and proceed to checkout
    await checkoutPage.goToCart();
    await checkoutPage.proceedToCheckout();

    // Fill in shipping info
    await checkoutPage.fillCheckoutInfo('Hari', 'Tester', '600001');

    // Finish the order
    await checkoutPage.finishOrder();

    // Verify the success message
    const confirmation = await checkoutPage.getConfirmationText();
    expect(confirmation).toBe('Thank you for your order!');
  });
});
