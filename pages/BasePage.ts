import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async waitForPage(urlOrPattern: string | RegExp, timeout = 30000) {
    await this.page.waitForURL(urlOrPattern, { timeout });
  }

  async waitForLoader(selector = '.loading_spinner', state: 'visible' | 'hidden' = 'hidden', timeout = 30000) {
    const loader = this.page.locator(selector);

    if (state === 'visible') {
      await loader.waitFor({ state: 'visible', timeout });
      return;
    }

    await loader.waitFor({ state: 'hidden', timeout }).catch(() => undefined);
  }

  async takeScreenshot(name: string, fullPage = false) {
    const outputPath = `test-results/screenshots/${name}.png`;
    await this.page.screenshot({ path: outputPath, fullPage });
    return outputPath;
  }
}
