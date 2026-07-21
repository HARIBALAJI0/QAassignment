import { test, expect } from '../../fixtures';

test.describe('Checkout flow', () => {
  test('completes checkout and shows Thank you confirmation', async ({ authenticatedUser }) => {
    await authenticatedUser.productsPage.addFirstNProducts(2);
    await expect(authenticatedUser.productsPage.cartBadge).toHaveText('2');

    await authenticatedUser.checkoutPage.goToCart();
    await authenticatedUser.checkoutPage.proceedToCheckout();
    await authenticatedUser.checkoutPage.fillCheckoutInfo('Hari', 'Tester', '600001');
    await authenticatedUser.checkoutPage.finishOrder();

    const confirmation = await authenticatedUser.checkoutPage.getConfirmationText();
    expect(confirmation).toBe('Thank you for your order!');
  });
});
