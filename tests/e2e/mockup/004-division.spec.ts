import { test, expect } from '@playwright/test';

test.describe('Mockup Parity: Feature 004 Division Screens vs Prototype', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('share?mode=share route renders Fair Share table, pile, plates, and action buttons', async ({
    page,
  }) => {
    await page.goto('/#/share?mode=share');
    await expect(page.locator('.fair-share-svg')).toBeVisible();
    await expect(page.locator('.stepper')).toHaveCount(2);
    await expect(page.getByRole('button', { name: /Deal one round/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Deal them all/i })).toBeVisible();
  });

  test('share?mode=leftover route renders Fair Share table with dashed remainder tray', async ({
    page,
  }) => {
    await page.goto('/#/share?mode=leftover');
    await expect(page.locator('.fair-share-svg')).toBeVisible();
    await expect(page.locator('.tray-layer text')).toHaveText(/left over/i);
    await expect(page.getByRole('button', { name: /Deal them all/i })).toBeVisible();
  });

  test('bodha route for D1 renders fair share concept cards and plate diagram', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=D1');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-dots')).toBeVisible();
    await expect(page.locator('.stage-bar')).toBeVisible();
  });

  test('bodha route for D3 renders leftovers and fractions cards with plate diagram', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=D3');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-dots')).toBeVisible();
    await expect(page.locator('.stage-bar')).toBeVisible();
  });
});
