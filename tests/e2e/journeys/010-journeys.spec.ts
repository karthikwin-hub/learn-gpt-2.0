import { test, expect } from '@playwright/test';

test.describe('Feature 010 User Journeys: Ganita Expansion Workbenches', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J10: Journey through Place Houses, Folding Fraction Strips, and Money Grid', async ({
    page,
  }) => {
    // 1. Enter Place Houses
    await page.goto('/#/place');
    await expect(page.locator('.place-num')).toContainText('1,25,00,000');

    // Manipulate place house
    const bundleChip = page.getByRole('button', { name: /99,999/i });
    await bundleChip.click();
    await expect(page.locator('.place-num')).toContainText('99,999');

    // 2. Journey to Fractions workbench
    await page.goto('/#/fractions');
    await expect(page.locator('.fraction-strips')).toBeVisible();

    // Select 1/2 and check equivalence
    const halfRow = page.locator('.strip-2');
    await halfRow.locator('.strip-segment').first().click();
    await expect(page.locator('.frac-readout')).toContainText('1/2');

    // 3. Journey to Money workbench
    await page.goto('/#/money');
    await expect(page.locator('.money-total')).toContainText('₹2.00');

    // Exchange 100 paise to ₹1
    const exchangeBtn = page.locator('.btn-exchange');
    await exchangeBtn.click();
    await expect(page.locator('.money-total')).toContainText('₹2.00');
    await expect(page.locator('.item-p50 .denom-count')).toContainText('× 0');
    await expect(page.locator('.item-r1 .denom-count')).toContainText('× 2');

    // 4. Return to Ganita Shala
    await page.goto('/#/shala?s=ganita');
    await expect(page.locator('.domain').first()).toBeVisible();
  });
});
