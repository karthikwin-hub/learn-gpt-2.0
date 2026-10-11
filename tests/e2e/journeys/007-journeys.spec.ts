import { test, expect } from '@playwright/test';

test.describe('Feature 007 User Journeys: Logic', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J6 (L2): End-to-end lesson flow for Marble Gates', async ({ page }) => {
    // 1. Bodha L2
    await page.goto('/#/bodha?k=L2');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();

    // 2. Workbench (#/logic)
    await page.goto('/#/logic');
    await expect(page.locator('.marbles-manipulative')).toBeVisible();
    const dropBtn = page.getByRole('button', { name: 'Drop a marble' });
    await dropBtn.click();
    await expect(page.locator('.residue-layer path')).toBeVisible();

    // 3. Explain L2
    await page.goto('/#/explain?k=L2');
    await expect(page.locator('.sentence')).toBeVisible();

    // 4. Stop L2
    await page.goto('/#/stop?k=L2');
    await expect(page.locator('.stop')).toBeVisible();
  });

  test('J2: Language switch preserves workbench state on Marble Machine', async ({ page }) => {
    await page.goto('/#/logic');
    const doorA = page.getByRole('button', { name: /^A:/ });
    await doorA.click(); // shut

    // Switch to Telugu via #btn-lang
    const langBtn = page.locator('#btn-lang');
    await langBtn.click();
    const teOption = page.locator('button.lang-option[lang="te"]');
    await teOption.click();

    // Door A remains shut in Telugu
    const teDoorA = page.getByRole('button', { name: /^A:/ });
    await expect(teDoorA).toContainText('మూసి');
  });
});
