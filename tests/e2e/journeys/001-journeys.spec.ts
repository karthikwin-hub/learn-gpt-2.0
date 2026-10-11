import { test, expect } from '@playwright/test';

test.describe('Feature 001 User Journeys', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('J1: First run journey from opening to Tamil Ashram and reload memory', async ({ page }) => {
    await page.goto('/');

    const opening = page.locator('.opening');
    if (await opening.isVisible()) {
      await opening.click();
      const beginBtn = page.locator('button', { hasText: /Begin|தொடங்கு/i });
      await beginBtn.click();
    }

    const taCard = page.locator('.lang-card[lang="ta"]');
    await taCard.click();

    const continueBtn = page.locator('button', { hasText: /தொடர்/i });
    await continueBtn.click();

    await expect(page).toHaveURL(/#\/home/);
    await expect(page.locator('#topbar-title')).toHaveText(/குருகுலம்|ஆசிரமம்/i);

    // Reload verifies memory
    await page.reload();
    await expect(page).toHaveURL(/#\/home/);
    await expect(page.locator('.opening')).toBeHidden();
  });

  test('J2: Language switch preserves active screen and route state', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/shala?s=ganita');
    await expect(page.locator('#topbar-title')).toHaveText(/Ganita/i);

    // Switch to Hindi from topbar
    await page.locator('#btn-lang').click();
    await page.locator('.lang-option[lang="hi"]').click();

    await expect(page).toHaveURL(/#\/shala\?s=ganita/);
    await expect(page.locator('#topbar-title')).toHaveText(/गणित/i);

    // Navigate to Vijnana
    await page.goto('/#/shala?s=vijnana');
    await expect(page.locator('#topbar-title')).toHaveText(/विज्ञान/i);

    // Switch back to English
    await page.locator('#btn-lang').click();
    await page.locator('.lang-option[lang="en"]').click();
    await expect(page.locator('#topbar-title')).toHaveText(/Vijnana/i);
  });

  test('J9: Shell functions offline after initial load', async ({ page, context }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/home');
    await page.waitForLoadState('networkidle');
    await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.ready;
      }
    });

    await expect(page.locator('#app')).toBeVisible();
    await expect(page.locator('.ashram-art svg')).toBeVisible();

    await context.setOffline(true);

    // Navigate offline to Shala
    const ganitaCard = page.locator('.shala-card', { hasText: 'Ganita' });
    await ganitaCard.click();
    await expect(page).toHaveURL(/#\/shala\?s=ganita/);
    await expect(page.locator('section.domain')).toHaveCount(8);

    // Navigate offline to Jaal
    const backBtn = page.locator('#btn-back');
    await backBtn.click();
    await expect(page).toHaveURL(/#\/home/);
    const jaalBtn = page.locator('button', { hasText: /The Web|Jaal/i });
    await jaalBtn.click();
    await expect(page).toHaveURL(/#\/jaal/);
    await expect(page.locator('.card.jaal-detail')).toBeVisible();
  });

  test('J10: Cross-subject exploration via Jaal', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/home');
    const jaalBtn = page.locator('button', { hasText: /The Web|Jaal/i });
    await jaalBtn.click();

    await expect(page).toHaveURL(/#\/jaal/);
    const detailCard = page.locator('.card.jaal-detail');
    await expect(detailCard).toBeVisible();

    // Pick topView Jaal link
    const topViewChip = page.locator('.chip', {
      hasText: /Looking from above|Courtyard from above/i,
    });
    if (await topViewChip.isVisible()) {
      await topViewChip.click();
      await expect(topViewChip).toHaveAttribute('aria-pressed', 'true');
    }
  });
});
