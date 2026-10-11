import { test, expect } from '@playwright/test';

test.describe('Feature 008 User Journeys: Pothi & Grown-ups', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J6: Pothi page accumulation, inspection, and workbench reopening', async ({ page }) => {
    // 1. Visit explain screen and complete M4 sentence
    await page.goto('/#/explain?k=M4');
    await expect(page.locator('.sentence')).toBeVisible();

    const tensChip = page.getByRole('button', { name: 'tens' });
    if (await tensChip.isVisible()) await tensChip.click();

    const roomChip = page.getByRole('button', { name: 'room' });
    if (await roomChip.isVisible()) await roomChip.click();

    const addChip = page.getByRole('button', { name: 'add' });
    if (await addChip.isVisible()) await addChip.click();

    // 2. Click Keep to save page and transition to Stop screen
    const keepBtn = page.getByRole('button', { name: /Keep/i });
    await expect(keepBtn).toBeVisible();
    await keepBtn.click();
    expect(page.url()).toContain('#/stop');

    // 3. From Stop screen, open Pothi
    const openPothiBtn = page.getByRole('button', { name: /Open my Pothi|Pothi/i });
    await expect(openPothiBtn).toBeVisible();
    await openPothiBtn.click();
    expect(page.url()).toContain('#/notebook');

    // 4. Verify newly created page in Pothi
    const pageCard = page.locator('button.page').first();
    await expect(pageCard).toBeVisible();
    await expect(pageCard.locator('.thumb svg')).toBeVisible();

    // 5. Reopen workbench from Pothi page
    await pageCard.click();
    expect(page.url()).toContain('#/rect');
  });

  test('J8: Grown-ups gate unlock and privacy inspection', async ({ page }) => {
    await page.goto('/#/grownups');

    // Locked gate
    await expect(page.locator('.hold-check')).toBeVisible();

    // Unlock via dot keydown simulation
    const dot = page.locator('.hold-dot').first();
    await dot.focus();
    await dot.dispatchEvent('keydown', { key: 'Enter' });
    await page.waitForTimeout(2100);

    // Verify unlocked content
    await expect(page.getByRole('heading', { name: /This week/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Privacy/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible();
  });
});
