import { test, expect } from '@playwright/test';

test.describe('Feature 012 User Journeys: Loka (Social Studies) Shala', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J12: Complete Loka Exploration: Timeline, Earth & Seasons, and Courtyard Map', async ({
    page,
  }) => {
    // 1. Enter Loka Shala
    await page.goto('/#/shala?s=loka');
    await expect(page.locator('.domain').first()).toBeVisible();

    // 2. Journey to Thread of Time (#timeline)
    await page.goto('/#/timeline');
    await expect(page.locator('.screen-title')).toContainText(/Thread of time/i);
    await page.getByRole('button', { name: /Unroll the thread/i }).click();
    await expect(page.locator('svg text', { hasText: '1 BCE | 1 CE' })).toBeVisible();

    // 3. Journey to Earth & Seasons (#earth)
    await page.goto('/#/earth');
    await expect(page.locator('.screen-title')).toContainText(/Spin and travel/i);
    await page.getByRole('button', { name: /Spin the Earth/i }).click();
    await expect(page.getByText('India', { exact: true })).toBeVisible();

    // 4. Journey to Courtyard Map (#map)
    await page.goto('/#/map');
    await expect(page.locator('.screen-title')).toContainText(/Courtyard from above/i);
    await page.getByRole('button', { name: /Look from above/i }).click();
    await expect(page.locator('svg text', { hasText: '1 square = 5 m' })).toBeVisible();

    // 5. Return to Ashram courtyard
    await page.goto('/#/home');
    await expect(page.locator('.ashram-art svg')).toBeVisible();
  });
});
