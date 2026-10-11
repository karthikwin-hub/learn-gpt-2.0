import { test, expect } from '@playwright/test';

test.describe('Mockup Parity: Feature 001 Shell vs Prototype', () => {
  test('opening screen renders kolam art, wordmark, tagline and begin button', async ({ page }) => {
    await page.goto('/#/opening');
    await expect(page.locator('.opening')).toBeVisible();
    await expect(page.locator('.wordmark')).toHaveText('Gurukul');
    await expect(page.locator('.opening svg')).toBeVisible();
    await expect(page.locator('button.btn.primary')).toBeVisible();
  });

  test('language screen renders all 5 Indic language cards in native script', async ({ page }) => {
    await page.goto('/#/language');
    await expect(page.locator('.lang-cards')).toBeVisible();
    const cards = page.locator('.lang-card');
    await expect(cards).toHaveCount(5);
    await expect(page.locator('.lang-card[lang="en"] .native')).toHaveText('English');
    await expect(page.locator('.lang-card[lang="hi"] .native')).toHaveText('हिन्दी');
    await expect(page.locator('.lang-card[lang="te"] .native')).toHaveText('తెలుగు');
    await expect(page.locator('.lang-card[lang="bn"] .native')).toHaveText('বাংলা');
    await expect(page.locator('.lang-card[lang="ta"] .native')).toHaveText('தமிழ்');
  });

  test('home ashram renders banyan art, 3 shala cards, and jaal launcher', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
    await page.goto('/#/home');
    await expect(page.locator('.ashram-art svg')).toBeVisible();
    const shalaCards = page.locator('.shala-card');
    await expect(shalaCards).toHaveCount(3);
    await expect(page.locator('button', { hasText: /The Web|Jaal/i })).toBeVisible();
  });

  test('ganita shala renders wave spine with 8 domains and 42 knots', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
    await page.goto('/#/shala?s=ganita');
    await expect(page.locator('#topbar-title')).toHaveText(/Ganita/i);
    await expect(page.locator('section.domain')).toHaveCount(8);
    await expect(page.locator('button.knot')).toHaveCount(42);
  });

  test('vijnana shala renders wave spine with 6 domains and 14 knots', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
    await page.goto('/#/shala?s=vijnana');
    await expect(page.locator('#topbar-title')).toHaveText(/Vijnana/i);
    await expect(page.locator('section.domain')).toHaveCount(6);
    await expect(page.locator('button.knot')).toHaveCount(14);
  });

  test('loka shala renders wave spine with 4 domains and 18 knots', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
    await page.goto('/#/shala?s=loka');
    await expect(page.locator('#topbar-title')).toHaveText(/Loka/i);
    await expect(page.locator('section.domain')).toHaveCount(4);
    await expect(page.locator('button.knot')).toHaveCount(18);
  });

  test('jaal screen renders triangular web with 10 curves and detail inspector', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
    await page.goto('/#/jaal');
    await expect(page.locator('.jaal-curve')).toHaveCount(10);
    await expect(page.locator('.card.jaal-detail')).toBeVisible();
  });
});
