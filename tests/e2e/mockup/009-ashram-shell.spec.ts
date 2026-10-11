import { test, expect } from '@playwright/test';

test.describe('Mockup Parity: Feature 009 Ashram Shell Screens vs Prototype', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('home route renders banyan tree and 3 shala cards', async ({ page }) => {
    await page.goto('/#/home');
    await expect(page.locator('.ashram-art svg')).toBeVisible();
    await expect(page.locator('.shala-card')).toHaveCount(3);
  });

  test('shala route renders subject loom with sinusoidal thread line', async ({ page }) => {
    await page.goto('/#/shala?s=ganita');
    await expect(page.locator('.domain').first()).toBeVisible();
    await expect(page.locator('.domain-thread path').first()).toBeVisible();
  });

  test('jaal route renders triangle network diagram and crossing curves', async ({ page }) => {
    await page.goto('/#/jaal');
    await expect(page.locator('.jaal-art svg')).toBeVisible();
    await expect(page.locator('.jaal-curve')).toHaveCount(10);
  });
});
