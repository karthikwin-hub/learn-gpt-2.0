import { test, expect } from '@playwright/test';

test.describe('Feature 011 User Journeys: Vijnana (Science) Shala', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J11: Complete Vijnana Exploration: Digestion, Ramp, and Shadow', async ({ page }) => {
    // 1. Enter Vijnana Shala
    await page.goto('/#/shala?s=vijnana');
    await expect(page.locator('.domain').first()).toBeVisible();

    // 2. Journey to Digestion screen
    await page.goto('/#/digest');
    await expect(page.locator('.organ-mouth')).toBeVisible();

    // 3. Journey to Friction Ramp screen
    await page.goto('/#/ramp');
    await expect(page.locator('.ramp-readout')).toBeVisible();
    await page.getByRole('button', { name: /wood/i }).click();
    await expect(page.locator('.ramp-readout')).toContainText('3.8m');

    // 4. Journey to Shadow screen
    await page.goto('/#/shadow');
    await expect(page.locator('.ground-shadow')).toBeVisible();
    const plusBtn = page.getByRole('button', { name: '+' });
    await plusBtn.click();
    await expect(page.locator('.shadow-readout')).toBeVisible();

    // 5. Return to Ashram courtyard
    await page.goto('/#/home');
    await expect(page.locator('.ashram-art svg')).toBeVisible();
  });
});
