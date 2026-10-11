import { test, expect } from '@playwright/test';

test.describe('Feature 004 User Journeys: Division', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J5 (D1): End-to-end lesson flow for Fair Share', async ({ page }) => {
    // 1. Bodha D1
    await page.goto('/#/bodha?k=D1');
    await expect(page.locator('.bodha')).toBeVisible();

    // 2. Workbench (share D1)
    await page.goto('/#/share?mode=share');
    await expect(page.locator('.fair-share-svg')).toBeVisible();
    const dealAllBtn = page.getByRole('button', { name: /Deal them all/i });
    await dealAllBtn.click();
    await expect(page.locator('.bar-card')).toBeVisible({ timeout: 6000 });

    // 3. Explain D1
    await page.goto('/#/explain?k=D1');
    await expect(page.locator('.sentence')).toBeVisible();

    // 4. Stop D1
    await page.goto('/#/stop?k=D1');
    await expect(page.locator('.stop')).toBeVisible();
  });

  test('J5 (D3): End-to-end lesson flow for Leftovers and Fractions', async ({ page }) => {
    // 1. Bodha D3
    await page.goto('/#/bodha?k=D3');
    await expect(page.locator('.bodha')).toBeVisible();

    // 2. Workbench (share D3 leftover)
    await page.goto('/#/share?mode=leftover');
    await expect(page.locator('.fair-share-svg')).toBeVisible();
    const dealAllBtn = page.getByRole('button', { name: /Deal them all/i });
    await dealAllBtn.click();

    // Cut leftovers
    const cutBtn = page.getByRole('button', { name: /Cut leftovers/i });
    await expect(cutBtn).toBeVisible({ timeout: 6000 });
    await cutBtn.click();
    await expect(page.locator('.eq-card')).toContainText('2/4', { timeout: 3000 });

    // 3. Explain D3
    await page.goto('/#/explain?k=D3');
    await expect(page.locator('.sentence')).toBeVisible();

    // 4. Stop D3
    await page.goto('/#/stop?k=D3');
    await expect(page.locator('.stop')).toBeVisible();
  });

  test('J2: Language switch preserves workbench state on Fair Share Table', async ({ page }) => {
    // 1. Open share screen and deal
    await page.goto('/#/share?mode=leftover');
    const dealAllBtn = page.getByRole('button', { name: /Deal them all/i });
    await dealAllBtn.click();
    await expect(page.locator('.eq-card')).toContainText('14 ÷ 4 = 3', { timeout: 6000 });

    // 2. Switch to Tamil
    const langBtn = page.locator('#btn-lang');
    await langBtn.click();
    const taOption = page.locator('button.lang-option[lang="ta"]');
    await taOption.click();

    // 3. Verify equation preserved and language changed
    await expect(page.locator('.eq-card')).toContainText('14 ÷ 4 = 3');
    await expect(page.locator('.step-guide')).toContainText('தட்டுகளுக்கு');

    // 4. Switch back to English
    await page.locator('#btn-lang').click();
    const enOption = page.locator('button.lang-option[lang="en"]');
    await enOption.click();

    await expect(page.locator('.eq-card')).toContainText('14 ÷ 4 = 3');
    await expect(page.locator('.fair-share-svg')).toBeVisible();
  });
});
