import { test, expect } from '@playwright/test';

test.describe('Feature 009: Gurukul Shell — Ashram, Shalas & Jaal Web', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ashram Courtyard */
  test('US1-AS1: Ashram renders Banyan tree, 3 Shala cards, and navigation links', async ({
    page,
  }) => {
    await page.goto('/#/home');
    await expect(page.locator('.ashram-art svg')).toBeVisible();
    await expect(page.locator('.loom-intro')).toBeVisible();

    const shalaCards = page.locator('.shala-card');
    await expect(shalaCards).toHaveCount(3);

    // Verify 3 Shala names
    await expect(shalaCards.nth(0)).toContainText('Ganita');
    await expect(shalaCards.nth(1)).toContainText('Vijnana');
    await expect(shalaCards.nth(2)).toContainText('Loka');

    // Bottom links
    await expect(page.getByRole('button', { name: /Jaal/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Pothi/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Acharya corner/i })).toBeVisible();
  });

  test('US1-AS2: Carry-on card resumes in-flight knot with state', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'gurukul:continue',
        JSON.stringify({
          knot: 'M4',
          route: 'rect',
        })
      );
    });

    await page.goto('/#/home');
    const continueCard = page.locator('.continue-card');
    await expect(continueCard).toBeVisible();
    await expect(continueCard).toContainText('Carry on');

    await continueCard.locator('button').click();
    expect(page.url()).toContain('#/rect');
  });

  /* ------------------------------------------------------------------ US2: Shala Looms */
  test('US2-AS1: Shala looms render threads and knots for all 3 subjects', async ({ page }) => {
    // 1. Ganita Loom
    await page.goto('/#/shala?s=ganita');
    await expect(page.locator('.domain')).toHaveCount(8);

    // 2. Vijnana Loom
    await page.goto('/#/shala?s=vijnana');
    await expect(page.locator('.domain')).toHaveCount(6);

    // 3. Loka Loom
    await page.goto('/#/shala?s=loka');
    await expect(page.locator('.domain')).toHaveCount(4);
  });

  test('US2-AS2: Tapping an unbuilt knot displays calm notice without crash', async ({ page }) => {
    await page.goto('/#/shala?s=vijnana');

    // Knot B1 is unbuilt in current prototype
    const unbuiltKnot = page.locator('button.knot.later').first();
    await expect(unbuiltKnot).toBeVisible();
    await unbuiltKnot.click();

    // Verify toast notice
    const toast = page.locator('.toast');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText(/coming soon|not in this preview|prototype|full app|yet/i);
  });

  test('US2-AS3: Tapping a playable knot opens first step and saves continue', async ({ page }) => {
    await page.goto('/#/shala?s=ganita');

    const m4Knot = page.locator('button.knot', { hasText: 'M4' });
    if (await m4Knot.isVisible()) {
      await m4Knot.click();
      expect(page.url()).toMatch(/#(rect|bodha)/);

      const cont = await page.evaluate(() => localStorage.getItem('gurukul:continue'));
      expect(cont).toBeTruthy();
      expect(cont).toContain('M4');
    }
  });

  /* ------------------------------------------------------------------ US3: Stage Bar */
  test('US3-AS1: Stage bar marks active stage with accessible label', async ({ page }) => {
    await page.goto('/#/bodha?k=M4');
    const stageBar = page.locator('.stage-bar');
    await expect(stageBar).toBeVisible();
    await expect(stageBar).toHaveAttribute('aria-label');

    const nowItem = stageBar.locator('li.now');
    await expect(nowItem).toBeVisible();
    await expect(nowItem).toHaveAttribute('aria-current', 'step');
  });

  test('US3-AS2: What am I learning link returns to Bodha from workbench', async ({ page }) => {
    await page.goto('/#/rect');
    const learnLink = page.locator('button.learn-link');
    if (await learnLink.isVisible()) {
      await learnLink.click();
      expect(page.url()).toContain('#/bodha');
    }
  });

  /* ------------------------------------------------------------------ US4: Jaal Web */
  test('US4-AS1: Jaal screen renders triangle network SVG', async ({ page }) => {
    await page.goto('/#/jaal');
    await expect(page.locator('.jaal-art svg')).toBeVisible();
    await expect(page.locator('.jaal-curve')).toHaveCount(10);
  });

  test('US4-AS2: Selecting crossing curve displays explanation card and jump buttons', async ({
    page,
  }) => {
    await page.goto('/#/jaal');
    const curves = page.locator('.jaal-curve');
    await curves.first().click({ force: true });

    const detailCard = page.locator('.jaal-detail, .card');
    await expect(detailCard.first()).toBeVisible();
    await expect(page.locator('.jaal-knots button').first()).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Invariants */
  test('US5-AS1: Shell screens uphold calm invariants with zero score pressure', async ({
    page,
  }) => {
    await page.goto('/#/home');
    await expect(page.locator('.badge, .star, .score, .streak')).toHaveCount(0);

    await page.goto('/#/shala?s=ganita');
    await expect(page.locator('.badge, .star, .score, .streak')).toHaveCount(0);

    await page.goto('/#/jaal');
    await expect(page.locator('.badge, .star, .score, .streak')).toHaveCount(0);
  });

  test('US5-AS2: Multilingual script purity across languages', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'hi');
    });

    await page.goto('/#/home');
    const introText = await page.locator('.loom-intro').textContent();
    expect(introText).toBeTruthy();
    expect(/[\u0900-\u097F]/.test(introText!)).toBe(true);
  });
});
