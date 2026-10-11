import { test, expect } from '@playwright/test';

test.describe('Mockup Parity: Feature 005 Geometry Screens vs Prototype', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('rope route renders Rope and Pegs manipulative, equations, steppers and hill chart', async ({
    page,
  }) => {
    await page.goto('/#/rope');
    await expect(page.locator('.rope-manipulative')).toBeVisible();
    await expect(page.locator('.stepper')).toHaveCount(1);
    await expect(page.locator('.chip-group')).toHaveCount(1);
    await expect(page.locator('.rope-readout')).toBeVisible();
    await expect(page.locator('.area-hill')).toBeVisible();
  });

  test('kolam route renders canvas, order chips, mode chips, and undo/clear controls', async ({
    page,
  }) => {
    await page.goto('/#/kolam');
    await expect(page.locator('.kolam-canvas')).toBeVisible();
    await expect(page.locator('.chip-group')).toHaveCount(2);
    await expect(page.getByRole('button', { name: /Undo/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Clear/i })).toBeVisible();
    await expect(page.locator('.workbench-feedback')).toBeVisible();
  });

  test('bodha route for G2 renders concept cards with rope comparison diagram', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G2');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-dots')).toBeVisible();
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();
  });

  test('bodha route for G4 renders concept cards with flower symmetry diagram', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G4');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-dots')).toBeVisible();
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();
  });
});
