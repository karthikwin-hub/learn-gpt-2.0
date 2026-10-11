import { test, expect } from '@playwright/test';

test.describe('Feature 006 User Journeys: Sets', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J5 (S2): End-to-end lesson flow for Sorting Courtyard', async ({ page }) => {
    // 1. Bodha S2
    await page.goto('/#/bodha?k=S2');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();

    // 2. Workbench (sets S2)
    await page.goto('/#/sets');
    await expect(page.locator('.courtyard-manipulative')).toBeVisible();
    const andChip = page.getByRole('button', { name: 'and', exact: true });
    await andChip.click();
    await expect(page.locator('.muted').first()).toContainText('yellow and circle');

    // 3. Explain S2
    await page.goto('/#/explain?k=S2');
    await expect(page.locator('.sentence')).toBeVisible();

    // 4. Stop S2
    await page.goto('/#/stop?k=S2');
    await expect(page.locator('.stop')).toBeVisible();
  });

  test('J5 (S3): End-to-end lesson flow for Mystery Rules', async ({ page }) => {
    // 1. Bodha S3
    await page.goto('/#/bodha?k=S3');
    await expect(page.locator('.bodha')).toBeVisible();

    // 2. Workbench (sets S3 guess)
    await page.goto('/#/sets?mode=guess');
    await expect(page.locator('.courtyard-manipulative')).toBeVisible();
    const greenBtn = page.getByRole('group', { name: 'ga' }).getByRole('button', { name: 'green' });
    await greenBtn.click();
    const bigBtn = page.getByRole('group', { name: 'gb' }).getByRole('button', { name: 'big' });
    await bigBtn.click();
    await expect(page.locator('.workbench-feedback')).toContainText('Found them');

    // 3. Explain S3
    await page.goto('/#/explain?k=S3');
    await expect(page.locator('.sentence')).toBeVisible();

    // 4. Stop S3
    await page.goto('/#/stop?k=S3');
    await expect(page.locator('.stop')).toBeVisible();
  });

  test('J2: Language switch preserves workbench state on Sorting Courtyard', async ({ page }) => {
    await page.goto('/#/sets');
    const apartChip = page.getByRole('button', { name: 'Apart' });
    await apartChip.click();

    // Switch to Telugu via #btn-lang
    const langBtn = page.locator('#btn-lang');
    await langBtn.click();
    const teOption = page.locator('button.lang-option[lang="te"]');
    await teOption.click();

    // Verify 2 homeless blocks preserved in Telugu
    const outlines = page.locator('g.block circle[opacity="1"]');
    await expect(outlines).toHaveCount(2);
  });
});
