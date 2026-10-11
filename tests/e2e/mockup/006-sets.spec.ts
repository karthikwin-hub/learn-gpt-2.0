import { test, expect } from '@playwright/test';

test.describe('Mockup Parity: Feature 006 Sets Screens vs Prototype', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('sets route renders courtyard, universe box, rings, and chips', async ({ page }) => {
    await page.goto('/#/sets');
    await expect(page.locator('.courtyard-manipulative')).toBeVisible();
    await expect(page.locator('g.block')).toHaveCount(12);
    await expect(page.locator('.chip-group')).toHaveCount(2);
    await expect(page.locator('.card .parts')).toBeVisible();
  });

  test('sets?mode=guess route renders mystery courtyard with guess selectors', async ({ page }) => {
    await page.goto('/#/sets?mode=guess');
    await expect(page.locator('.courtyard-manipulative')).toBeVisible();
    await expect(page.locator('.pane-title.a-txt')).toBeVisible();
    await expect(page.locator('.pane-title.b-txt')).toBeVisible();
  });

  test('bodha route for S2 renders concept cards with Venn rings diagram', async ({ page }) => {
    await page.goto('/#/bodha?k=S2');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-dots')).toBeVisible();
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();
  });

  test('bodha route for S3 renders mystery rules concept cards', async ({ page }) => {
    await page.goto('/#/bodha?k=S3');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-dots')).toBeVisible();
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();
  });
});
