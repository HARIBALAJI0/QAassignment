import { defineConfig, devices } from '@playwright/test';
import process from 'process';

const reporters = [
  ['list'],
  ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ['allure-playwright', { outputFolder: 'allure-results', disableWebdriverStepsReporting: true, disableWebdriverScreenshotsReporting: false }],
];

if (process.env.CI) {
  reporters.push(['junit', { outputFile: 'test-results/junit.xml' }]);
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: reporters,
  use: {
    trace: 'on-first-retry',
    headless: true,
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
