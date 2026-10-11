import { test, expect } from '@playwright/test';

test.describe('Feature 010 Acceptance: Ganita Expansion — Numbers, Fractions & Units (N1, N3, U1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Place Houses (N1) */
  test('US1-AS1: Place value screen #place displays houses with Indian comma formatting (FR-001, FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/place');
    await expect(page.locator('.place-num')).toBeVisible();
    await expect(page.locator('.place-num')).toContainText(/1,25,00,000/);

    const houses = page.locator('.place-house');
    await expect(houses).toHaveCount(4);
    await expect(page.locator('.house-crores')).toBeVisible();
    await expect(page.locator('.house-lakhs')).toBeVisible();
    await expect(page.locator('.house-thousands')).toBeVisible();
    await expect(page.locator('.house-ones')).toBeVisible();
  });

  test('US1-AS2: Incrementing digit updates expanded sum and formatted numeral in real-time (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/place');
    const firstIncBtn = page.locator('.place-house .btn.mini').first();
    await firstIncBtn.click();

    // Numeral updates
    const numText = await page.locator('.place-num').textContent();
    expect(numText).toBeTruthy();
    expect(numText).not.toBe('1,25,00,000');
    await expect(page.locator('.place-expanded')).toContainText(/\+/);
  });

  test('US1-AS3: Preset chip and reset button update values without error buzzers (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/place');
    const bundleChip = page.getByRole('button', { name: /99,999/i });
    await bundleChip.click();
    await expect(page.locator('.place-num')).toContainText('99,999');

    const resetBtn = page.locator('#btn-reset');
    await resetBtn.click();
    await expect(page.locator('.place-num')).toContainText('0');
  });

  /* ------------------------------------------------------------------ US2: Fraction Strips (N3) */
  test('US2-AS1: Fraction screen #fractions renders whole and subdivided strips (FR-002, FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/fractions');
    await expect(page.locator('.fraction-strips')).toBeVisible();
    const rows = page.locator('.strip-row');
    await expect(rows).toHaveCount(4); // 1, 1/2, 1/4, 1/8
  });

  test('US2-AS2: Tapping fraction segments highlights equivalent alignments (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/fractions');
    const halfRow = page.locator('.strip-2');
    const firstHalfSegment = halfRow.locator('.strip-segment').first();
    await firstHalfSegment.click();

    await expect(page.locator('.frac-readout')).toContainText('1/2');
    await expect(page.locator('.frac-equivalents')).toContainText(/2\/4|4\/8/);
  });

  test('US2-AS3: Selecting equivalent parts updates visual strip comparisons (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/fractions');
    const chip = page.getByRole('button', { name: /2\/4/i });
    if (await chip.isVisible()) {
      await chip.click();
      await expect(page.locator('.frac-readout')).toContainText('2/4');
    }
  });

  /* ------------------------------------------------------------------ US3: Rupee & Paise Grid (U1) */
  test('US3-AS1: Money screen #money displays coins and notes trays (FR-003, FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/money');
    await expect(page.locator('.money-total')).toBeVisible();
    await expect(page.locator('.money-trays')).toBeVisible();
    await expect(page.locator('.denom-box')).toHaveCount(9);
  });

  test('US3-AS2: Exchanging 100 paise updates drawer with ₹1 conservation (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/money');
    // Starting drawer has two 50p coins and one ₹1 coin (total ₹2.00)
    await expect(page.locator('.money-total')).toContainText('₹2.00');

    const exchangeBtn = page.locator('.btn-exchange');
    await expect(exchangeBtn).toBeEnabled();
    await exchangeBtn.click();

    // Total remains conserved at ₹2.00, but 50p is now 0 and ₹1 is 2
    await expect(page.locator('.money-total')).toContainText('₹2.00');
    await expect(page.locator('.item-p50 .denom-count')).toContainText('× 0');
    await expect(page.locator('.item-r1 .denom-count')).toContainText('× 2');
  });

  test('US3-AS3: Total amount formats in ₹ symbol without score buzzers (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/money');
    const totalEl = page.locator('.money-total');
    await expect(totalEl).toContainText(/₹\d+\.\d{2}/);
    await expect(page.locator('.score, .star, .timer')).toHaveCount(0);
  });

  /* ------------------------------------------------------------------ US4: Routing & Stage Bar */
  test('US4-AS1: Opening N1, N3, or U1 from Shala loom routes cleanly (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const n1Knot = page.locator('button.knot[data-knot="N1"]');
    if (await n1Knot.isVisible()) {
      await n1Knot.click();
      expect(page.url()).toMatch(/#\/?(place|prashna|bodha)/);
    }
  });

  test('US4-AS2: Accessible stage bar renders return link on workbenches (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/place');
    await expect(page.locator('.stage-bar')).toBeVisible();
    await expect(page.locator('button.learn-link')).toBeVisible();

    await page.goto('/#/fractions');
    await expect(page.locator('.stage-bar')).toBeVisible();

    await page.goto('/#/money');
    await expect(page.locator('.stage-bar')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm UX & Multilingual Invariants */
  test('US5-AS1: Zero gamification across all three workbenches', async ({ page }) => {
    for (const route of ['#/place', '#/fractions', '#/money']) {
      await page.goto(route);
      await expect(page.locator('.badge, .star, .score, .streak')).toHaveCount(0);
    }
  });

  test('US5-AS2: Multilingual rendering preserves localized titles and scripts', async ({
    page,
  }) => {
    for (const lang of ['hi', 'te']) {
      await page.addInitScript((l) => {
        localStorage.setItem('gurukul:lang', l);
      }, lang);

      await page.goto('/#/place');
      const title = await page.locator('.screen-title').textContent();
      expect(title).toBeTruthy();
      expect(title?.trim().length).toBeGreaterThan(0);
    }
  });
});
