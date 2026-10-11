import { test, expect } from '@playwright/test';

test.describe('Mockup Parity: Feature 003 Multiplication Screens vs Prototype', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('rect route renders rubber rectangle manipulative, steppers, and parts card', async ({
    page,
  }) => {
    await page.goto('/#/rect?k=M4');
    await expect(page.locator('.area-grid')).toBeVisible();
    await expect(page.locator('.stepper')).toHaveCount(2);
    await expect(page.locator('.eq')).toBeVisible();
  });

  test('drums route renders two drummers dials, beat timeline, and play button', async ({
    page,
  }) => {
    await page.goto('/#/drums');
    await expect(page.locator('.model svg')).toBeVisible();
    await expect(page.getByRole('button', { name: /Play/i })).toBeVisible();
    await expect(page.locator('.card')).toBeVisible();
  });

  test('mistake route renders M4 spot the mistake screen, choices, and four rooms diagram', async ({
    page,
  }) => {
    await page.goto('/#/mistake?k=M4');
    await expect(page.locator('.work-steps')).toBeVisible();
    await expect(page.locator('.work-steps button')).toHaveCount(4);
  });

  test('bodha route for M4 renders cut the rectangle concept cards and four rooms figure', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=M4');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-dots')).toBeVisible();
    await expect(page.locator('.stage-bar')).toBeVisible();
  });

  test('bodha route for M5 renders two drummers concept cards and beat dots figure', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=M5');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-dots')).toBeVisible();
    await expect(page.locator('.stage-bar')).toBeVisible();
  });
});
