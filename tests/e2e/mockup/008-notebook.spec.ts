import { test, expect } from '@playwright/test';

test.describe('Mockup Parity: Feature 008 Notebook and Grown-ups vs Prototype', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('notebook route renders intro, sample page, and empty prompt', async ({ page }) => {
    await page.goto('/#/notebook');
    await expect(page.locator('.screen-title, h1, h2').first()).toBeVisible();
    await expect(page.locator('.page.sample')).toBeVisible();
    await expect(page.locator('.page.sample .thumb svg')).toBeVisible();
    await expect(page.locator('.say')).toBeVisible();
  });

  test('grownups route renders hold check gate with two interactive dots', async ({ page }) => {
    await page.goto('/#/grownups');
    await expect(page.locator('.hold-check')).toBeVisible();
    await expect(page.locator('.hold-dot')).toHaveCount(2);
    await expect(page.locator('.progress-ring')).toBeVisible();
  });
});
