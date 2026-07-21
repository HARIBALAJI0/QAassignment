import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByTestId('checkout');
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.confirmationHeader = page.getByTestId('complete-header');
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getConfirmationText(): Promise<string> {
    return (await this.confirmationHeader.textContent()) ?? '';
  }
}
