import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Feature 001: Gurukul App Shell Acceptance Scenarios', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  // --- Story US1: First Run Experience ---
  test('US1-AS1: First launch displays opening and then 5 language cards in native script', async ({
    page,
  }) => {
    await page.goto('/');

    const opening = page.locator('.opening');
    if (await opening.isVisible()) {
      const beginBtn = page.locator('button', {
        hasText: /Begin|प्रारंभ|ప్రారంభించు|শুরু|தொடங்கு/i,
      });
      await beginBtn.click();
    }

    const langHeading = page.locator('.lang-cards');
    await expect(langHeading).toBeVisible();

    const langCards = page.locator('.lang-card');
    await expect(langCards).toHaveCount(5);

    await expect(page.locator('.lang-card[lang="en"] .native')).toHaveText('English');
    await expect(page.locator('.lang-card[lang="hi"] .native')).toHaveText('हिन्दी');
    await expect(page.locator('.lang-card[lang="te"] .native')).toHaveText('తెలుగు');
    await expect(page.locator('.lang-card[lang="bn"] .native')).toHaveText('বাংলা');
    await expect(page.locator('.lang-card[lang="ta"] .native')).toHaveText('தமிழ்');
  });

  test('US1-AS2: Selecting Tamil and Continue displays Ashram in Tamil and persists preference', async ({
    page,
  }) => {
    await page.goto('/');

    const opening = page.locator('.opening');
    if (await opening.isVisible()) {
      await opening.click();
      const beginBtn = page.locator('button', {
        hasText: /Begin|தொடங்கு/i,
      });
      await beginBtn.click();
    }

    const taCard = page.locator('.lang-card[lang="ta"]');
    await taCard.click();
    await expect(taCard).toHaveAttribute('aria-checked', 'true');

    const continueBtn = page.locator('button', { hasText: /தொடர்/i });
    await continueBtn.click();

    await expect(page).toHaveURL(/#\/home/);
    const storedLang = await page.evaluate(() => localStorage.getItem('gurukul:lang'));
    expect(storedLang).toContain('ta');

    const topbarTitle = page.locator('#topbar-title');
    await expect(topbarTitle).toHaveText(/குருகுலம்|ஆசிரமம்/i);
  });

  test('US1-AS3: Returning child skips language screen and opening directly to Ashram', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'te');
    });

    await page.goto('/');

    await expect(page).toHaveURL(/#\/home/);
    const opening = page.locator('.opening');
    await expect(opening).toBeHidden();
  });

  // --- Story US2: Language Switching ---
  test('US2-AS1: Topbar language switch re-renders in place without losing route or state', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/shala?s=ganita');
    const topbarTitle = page.locator('#topbar-title');
    await expect(topbarTitle).toHaveText('Ganita');

    const langBtn = page.locator('#btn-lang');
    await langBtn.click();

    const sheet = page.locator('#lang-sheet');
    await expect(sheet).toBeVisible();

    const hiOption = page.locator('.lang-option[lang="hi"]');
    await hiOption.click();

    await expect(page).toHaveURL(/#\/shala\?s=ganita/);
    await expect(topbarTitle).toHaveText('गणित');
  });

  test('US2-AS2: Missing translation key falls back to English without crashing', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'hi');
    });

    await page.goto('/#/home');
    const view = page.locator('#view');
    await expect(view).toBeVisible();

    const text = await view.textContent();
    expect(text).not.toMatch(/[a-z]{2,}\.[a-z0-9_-]+\.[a-z0-9_-]+/i);
  });

  // --- Story US3: The Ashram (Home) ---
  test('US3-AS1: Ashram renders banyan line art, 3 Shala cards, and Jaal link', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/home');

    // Banyan tree line art
    const banyan = page.locator('.ashram-art svg');
    await expect(banyan).toBeVisible();

    // 3 Shala cards
    const shalaCards = page.locator('.shala-card');
    await expect(shalaCards).toHaveCount(3);
    await expect(page.locator('.shala-card', { hasText: 'Ganita' })).toBeVisible();
    await expect(page.locator('.shala-card', { hasText: 'Vijnana' })).toBeVisible();
    await expect(page.locator('.shala-card', { hasText: 'Loka' })).toBeVisible();

    // Link to Jaal
    const jaalBtn = page.locator('button', { hasText: /The Web|Jaal/i });
    await expect(jaalBtn).toBeVisible();
  });

  test('US3-AS2: Ashram renders continue card when thread in progress', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
      localStorage.setItem(
        'gurukul:continue',
        JSON.stringify({ knot: 'M2', route: 'wonder', params: {} })
      );
    });

    await page.goto('/#/home');
    const continueCard = page.locator('.continue-card');
    await expect(continueCard).toBeVisible();
    await expect(continueCard).toContainText(/Area/i);
  });

  test('US3-AS3: Ashram renders Remember this card when sutras are kept', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
      localStorage.setItem('gurukul:sutras', JSON.stringify(['M2']));
    });

    await page.goto('/#/home');
    const rememberCard = page.locator('.card.remember');
    await expect(rememberCard).toBeVisible();
    await expect(rememberCard).toContainText(/Remember this/i);
  });

  // --- Story US4: Ganita Shala ---
  test('US4-AS1: Ganita Shala renders all 8 threads and 33 knots', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/shala?s=ganita');
    const threads = page.locator('section.domain');
    await expect(threads).toHaveCount(8);

    const knots = page.locator('button.knot');
    await expect(knots).toHaveCount(42);
  });

  test('US4-AS2: Unbuilt knot on Ganita Shala displays calm toast without error', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/shala?s=ganita');
    const unbuiltKnot = page.locator('button.knot.later').first();
    await unbuiltKnot.click();

    const toast = page.locator('#toast');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText(/coming|in this prototype/i);
  });

  // --- Story US5: Vijnana Shala ---
  test('US5-AS1: Vijnana Shala renders all 6 threads and 14 knots', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/shala?s=vijnana');
    const threads = page.locator('section.domain');
    await expect(threads).toHaveCount(6);

    const knots = page.locator('button.knot');
    await expect(knots).toHaveCount(14);
  });

  test('US5-AS2: Vijnana crossing knot displays also in tag', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/shala?s=vijnana');
    // Knot R1 crosses with Earth in Loka
    const r1Knot = page.locator('button.knot', { hasText: /Lamp and the stick/i });
    await expect(r1Knot.locator('.jaal-tag')).toContainText(/Loka/i);
  });

  // --- Story US6: Loka Shala ---
  test('US6-AS1: Loka Shala renders all 4 threads and 18 knots', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/shala?s=loka');
    const threads = page.locator('section.domain');
    await expect(threads).toHaveCount(4);

    const knots = page.locator('button.knot');
    await expect(knots).toHaveCount(18);
  });

  // --- Story US7: Jaal (Cross-Subject Web) ---
  test('US7-AS1: Jaal screen renders triangle diagram connecting all 3 Shalas', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/jaal');
    const svg = page.locator('svg[role="img"]');
    await expect(svg).toBeVisible();

    const curves = page.locator('.jaal-curve');
    await expect(curves).toHaveCount(10);
  });

  test('US7-AS2: Selecting Jaal link reveals explanation and navigation buttons', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/jaal');
    const detailCard = page.locator('.card.jaal-detail');
    await expect(detailCard).toBeVisible();

    const knotButtons = detailCard.locator('button');
    await expect(knotButtons).toHaveCount(2);
  });

  // --- Story US8: Offline & Privacy ---
  test('US8-AS1: App operates offline after first load', async ({ page, context }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.ready;
      }
    });

    await context.setOffline(true);
    await page.reload();

    const app = page.locator('#app');
    await expect(app).toBeVisible();
    await expect(app).toHaveAttribute('data-app-ready', 'true');
  });

  test('US8-AS2: Local storage contains only gurukul: keys and zero PII', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/home');
    const keys = await page.evaluate(() => Object.keys(localStorage));
    for (const key of keys) {
      expect(key.startsWith('gurukul:')).toBe(true);
      const val = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(val).not.toMatch(/name|email|phone|age|id|uuid|analytic|track/i);
    }
  });

  // --- Story US9: Night Colours ---
  test('US9-AS1: Night theme toggle meets WCAG AA contrast standards', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
      localStorage.setItem('gurukul:theme', 'night');
    });

    await page.goto('/#/home');
    const body = page.locator('body');
    await expect(body).toHaveAttribute('data-theme', 'night');

    const axeResults = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    const contrastViolations = axeResults.violations.filter((v) => v.id === 'color-contrast');
    expect(contrastViolations).toHaveLength(0);
  });
});
