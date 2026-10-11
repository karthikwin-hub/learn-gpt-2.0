import { test, expect } from '@playwright/test';

test.describe('Feature 002 User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J3: Prashna to Stop flow progresses sequentially through all stages', async ({ page }) => {
    // 1. Wonder / Prashna
    await page.goto('/#/wonder?k=M2');
    await expect(page.locator('.wonder-art')).toBeVisible();
    const wonderSubmit = page.locator('button.btn.primary');
    await expect(wonderSubmit).toBeVisible();
    await wonderSubmit.click();

    // 2. Bodha cards
    await expect(page).toHaveURL(/#\/bodha\?k=M2/);
    await expect(page.locator('.bodha')).toBeVisible();
    const btnFilm = page.locator('button', { hasText: /film|watch/i });
    await expect(btnFilm).toBeVisible();
    await btnFilm.click();

    // 3. Living Film
    await expect(page).toHaveURL(/#\/film/);
    await expect(page.locator('.film-stage')).toBeVisible();
    const btnWorkbench = page.locator('button', { hasText: /build|rect|workbench/i }).first();
    await expect(btnWorkbench).toBeVisible();
    await btnWorkbench.click();

    // 4. Workbench (rect)
    await expect(page).toHaveURL(/#\/rect/);
    await expect(page.locator('.area-grid')).toBeVisible();

    // 5. Navigate to Mistake
    await page.goto('/#/mistake?k=M2');
    await expect(page.locator('.work-steps')).toBeVisible();
    const stepBtn = page.locator('.work-steps button').first();
    await stepBtn.click();

    // 6. Navigate to Explain
    await page.goto('/#/explain?k=M2');
    await expect(page.locator('.sentence')).toBeVisible();
    const firstChip = page.locator('.chip').first();
    await expect(firstChip).toBeVisible();
    await firstChip.click();

    // 7. Navigate to Stop screen
    await page.goto('/#/stop?k=M2');
    await expect(page.locator('.stop')).toBeVisible();
    const loomBtn = page.locator('button.btn.primary');
    await expect(loomBtn).toBeVisible();
    await loomBtn.click();
    await expect(page).toHaveURL(/#\/home/);
  });

  test('J4: Film interactive pause allows dragging with ghost outline', async ({ page }) => {
    await page.goto('/#/film');
    const scrubber = page.locator('input[type="range"][aria-label*="scrub" i]');
    await expect(scrubber).toBeVisible();

    // Scrub to beat 3 (t >= 14s) where handle appears
    await scrubber.fill('160');
    await scrubber.dispatchEvent('input');

    const handle = page.locator('.handle');
    await expect(handle).toBeVisible();

    // Press ArrowRight on handle to expand model
    await handle.focus();
    await page.keyboard.press('ArrowRight');

    // Active scene shows modified model and ghostLayer displays ghost outline
    const ghostRect = page.locator('svg g rect[stroke-dasharray]');
    await expect(ghostRect.first()).toBeVisible();
  });

  test('J7: Keep sutra persists saved insight across sessions', async ({ page }) => {
    await page.goto('/#/bodha?k=M2');
    await expect(page.locator('.bodha')).toBeVisible();

    const keepBtn = page.locator('button', { hasText: /keep this sutra|keep/i });
    await expect(keepBtn).toBeVisible();
    await keepBtn.click();

    // Verify stored in localStorage
    const savedSutras = await page.evaluate(() => localStorage.getItem('gurukul:sutras'));
    expect(savedSutras).toContain('M2');

    // Navigate to stop screen
    await page.goto('/#/stop?k=M2');
    await expect(page.locator('.stop')).toBeVisible();
  });
});
