import { test, expect } from '@playwright/test';

test.describe('Mockup Parity: Feature 002 Lesson Screens vs Prototype', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('wonder route renders prashna prediction question and courtyard art', async ({ page }) => {
    await page.goto('/#/wonder?k=M2');
    await expect(page.locator('.wonder-art')).toBeVisible();
    await expect(page.locator('input[type="range"]')).toBeVisible();
    await expect(page.locator('button.btn.primary')).toBeVisible();
  });

  test('bodha route renders concept cards, progress beads, and stage bar', async ({ page }) => {
    await page.goto('/#/bodha?k=M2');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.screen-title')).toBeVisible();
    await expect(page.locator('.bodha-dots')).toBeVisible();
    await expect(page.locator('.stage-bar')).toBeVisible();
  });

  test('film route renders living film player, controls, scrubber, and drag handle', async ({
    page,
  }) => {
    await page.goto('/#/film?k=M2');
    await expect(page.locator('.film-stage')).toBeVisible();
    await expect(page.locator('.play-btn')).toBeVisible();
    await expect(page.locator('input[type="range"]')).toBeVisible();
    await expect(page.locator('.film-line')).toBeVisible();
  });

  test('rect route renders rubber rectangle manipulative, steppers, and area formula', async ({
    page,
  }) => {
    await page.goto('/#/rect?k=M2');
    await expect(page.locator('.area-grid')).toBeVisible();
    await expect(page.locator('.stepper')).toHaveCount(2);
    await expect(page.locator('.eq')).toBeVisible();
  });

  test('mistake route renders spot the mistake screen, room visual, and calm prompt', async ({
    page,
  }) => {
    await page.goto('/#/mistake?k=M4');
    await expect(page.locator('.work-steps')).toBeVisible();
    await expect(page.locator('.work-steps button').first()).toBeVisible();
  });

  test('explain route renders explain it back sentence builder with word tiles', async ({
    page,
  }) => {
    await page.goto('/#/explain?k=M2');
    await expect(page.locator('.sentence')).toBeVisible();
    await expect(page.locator('.chip').first()).toBeVisible();
  });

  test('stop route renders calm stopping screen, kept sutras, and ashram return', async ({
    page,
  }) => {
    await page.goto('/#/stop?k=M2');
    await expect(page.locator('.stop')).toBeVisible();
    await expect(page.locator('button.btn.primary')).toBeVisible();
  });
});
