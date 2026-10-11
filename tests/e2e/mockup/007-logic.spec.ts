import { test, expect } from '@playwright/test';

test.describe('Mockup Parity: Feature 007 Logic Screens vs Prototype', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('logic route renders marble machine, doors, and truth table', async ({ page }) => {
    await page.goto('/#/logic');
    await expect(page.locator('.marbles-manipulative')).toBeVisible();
    await expect(page.locator('.chip-group')).toBeVisible();
    await expect(page.locator('.card table.truth')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Drop a marble' })).toBeVisible();
  });

  test('bodha route for L2 renders concept cards with marble gate diagram', async ({ page }) => {
    await page.goto('/#/bodha?k=L2');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-dots')).toBeVisible();
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();
  });
});
