import { test, expect } from '@playwright/test';

test.describe('Feature 009 User Journeys: Ashram Shell, Shala & Jaal', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J9: Complete Ashram exploration from Courtyard through Shalas to Jaal', async ({
    page,
  }) => {
    // 1. Start in Ashram courtyard
    await page.goto('/#/home');
    await expect(page.locator('.ashram-art svg')).toBeVisible();

    // 2. Open Ganita Shala
    const ganitaCard = page.locator('.shala-card').first();
    await ganitaCard.click();
    expect(page.url()).toContain('#/shala?s=ganita');

    // 3. Return to Ashram via back button / link
    await page.goto('/#/home');

    // 4. Open Jaal Web
    const jaalLink = page.getByRole('button', { name: /Jaal/i });
    await jaalLink.click();
    expect(page.url()).toContain('#/jaal');
    await expect(page.locator('.jaal-art svg')).toBeVisible();

    // 5. Select crossing in Jaal
    const firstCrossing = page.locator('.jaal-curve').first();
    await firstCrossing.click({ force: true });
    await expect(page.locator('.jaal-knots button').first()).toBeVisible();
  });
});
