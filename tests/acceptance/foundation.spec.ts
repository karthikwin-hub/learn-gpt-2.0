import { test, expect } from '@playwright/test';

test.describe('Phase 0 Foundation Acceptance', () => {
  test('US0-AS1: application root initializes cleanly', async ({ page }) => {
    await page.goto('/');
    const app = page.locator('#app');
    await expect(app).toBeVisible();
    await expect(app).toHaveAttribute('data-app-ready', 'true');

    const title = page.locator('h1.app-title');
    await expect(title).toHaveText('Gurukul');
  });
});
