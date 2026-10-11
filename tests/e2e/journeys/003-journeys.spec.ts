import { test, expect } from '@playwright/test';

test.describe('Feature 003 User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J5 (M4): End-to-end lesson flow for Cut the Rectangle', async ({ page }) => {
    // 1. Bodha M4
    await page.goto('/#/bodha?k=M4');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.model.bodha-fig')).toBeVisible();

    // 2. Workbench (rect M4)
    await page.goto('/#/rect?k=M4&c=23&r=14&step=2&cut=true');
    await expect(page.locator('.area-grid')).toBeVisible();
    await expect(page.locator('.card:has(.parts)')).toContainText('322');

    // Fold into column
    const foldBtn = page.getByRole('button', { name: /Fold into column/i });
    if (await foldBtn.isVisible()) {
      await foldBtn.click();
      await expect(page.locator('.column')).toBeVisible();
    }

    // 3. Mistake M4
    await page.goto('/#/mistake?k=M4');
    await expect(page.locator('.work-steps')).toBeVisible();
    const wrongStepBtn = page.locator('.work-steps button').nth(1);
    await wrongStepBtn.click();
    await expect(page.locator('.model svg')).toBeVisible();

    // 4. Explain M4
    await page.goto('/#/explain?k=M4');
    await expect(page.locator('.sentence')).toBeVisible();

    // 5. Stop M4
    await page.goto('/#/stop?k=M4');
    await expect(page.locator('.stop')).toBeVisible();
  });

  test('J5 (M5): End-to-end lesson flow for Two Drummers', async ({ page }) => {
    // 1. Bodha M5
    await page.goto('/#/bodha?k=M5');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.model.bodha-fig')).toBeVisible();

    // 2. Workbench (drums)
    await page.goto('/#/drums?a=4&b=6');
    await expect(page.locator('.model svg')).toBeVisible();
    const playBtn = page.getByRole('button', { name: /Play/i });
    await playBtn.click();
    await expect(page.locator('.card')).toBeVisible();

    // 3. Explain M5
    await page.goto('/#/explain?k=M5');
    await expect(page.locator('.sentence')).toBeVisible();

    // 4. Stop M5
    await page.goto('/#/stop?k=M5');
    await expect(page.locator('.stop')).toBeVisible();
  });

  test('J2: Language switch preserves workbench state on rect and drums', async ({ page }) => {
    // 1. Set dimensions on rect
    await page.goto('/#/rect?k=M4&c=17&r=12');
    await expect(page.locator('.eq')).toContainText('204');

    // 2. Switch to Hindi
    const langBtn = page.locator('#btn-lang');
    await langBtn.click();
    const hiCard = page.locator('button.lang-option[lang="hi"]');
    await hiCard.click();

    // 3. Verify model state preserved and language changed
    await expect(page.locator('.eq')).toContainText('204');
    await expect(page.locator('.stepper')).toHaveCount(2);

    // 4. Open drums, set cycles, switch back to English
    await page.goto('/#/drums?a=4&b=6');
    await expect(page.locator('.screen-title')).toBeVisible();

    await page.locator('#btn-lang').click();
    const enCard = page.locator('button.lang-option[lang="en"]');
    await enCard.click();

    await expect(page.locator('.model svg')).toBeVisible();
  });
});
