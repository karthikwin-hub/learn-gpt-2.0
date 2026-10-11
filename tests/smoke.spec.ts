import { test, expect } from '@playwright/test';
import path from 'node:path';

const prototypeFileUrl = `file://${path.resolve(process.cwd(), 'design/prototype/index.html')}`;

test.describe('Phase 0 Smoke Tests', () => {
  test('opens the prototype page', async ({ page }) => {
    await page.goto(prototypeFileUrl);
    await expect(page).toHaveTitle(/Gurukul/);
    const view = page.locator('#view');
    await expect(view).toBeVisible();
  });

  test('opens the app page', async ({ page }) => {
    await page.goto('/');
    const app = page.locator('#app');
    await expect(app).toBeVisible();
    await expect(app).toHaveAttribute('data-app-ready', 'true');
  });
});
