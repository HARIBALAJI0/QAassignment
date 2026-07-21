import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { toSlug } from '../utils/helpers/slug';

export class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  async addProductToCartByName(productName: string) {
    const button = this.page.getByTestId(`add-to-cart-${toSlug(productName)}`);
    await button.click();
  }

  async addFirstNProducts(n: number) {
    const addButtons = this.page.locator('[data-test^="add-to-cart"]');
    const count = await addButtons.count();
    const limit = Math.min(n, count);
    for (let i = 0; i < limit; i++) {
      await addButtons.nth(i).click();
    }
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getAllPrices(): Promise<number[]> {
    const priceLocators = this.page.locator('.inventory_item_price');
    const texts = await priceLocators.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async getFirstProductName(): Promise<string> {
    return (await this.page.locator('.inventory_item_name').first().textContent()) ?? '';
  }

  async isOnProductsPage(): Promise<boolean> {
    return (await this.title.textContent()) === 'Products';
  }
}
