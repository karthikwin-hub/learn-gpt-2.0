import { test, expect } from '@playwright/test';

test.describe('Feature 022 Acceptance: Primes & Composites (Knot F2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot F2 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const f2Btn = page.locator('button[data-knot="F2"]');
    await expect(f2Btn).toBeVisible();

    await f2Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=F2/);
    await expect(page.locator('.screen-title')).toContainText(
      /How many different rectangles can you build using 7 square tiles/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges prime line prediction and accepts Only 1 line (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=F2');
    await expect(page.locator('.screen-title')).toContainText(
      /How many different rectangles can you build using 7 square tiles/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'Only 1 line' is the correct prediction
    const choiceBtn = page.getByRole('button', { name: 'Only 1 line', exact: true });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=F2/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining stubborn primes and two-factor rule (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=F2');
    await expect(page.locator('.bodha-knot')).toContainText(/Prime numbers/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Primes Workbench (#primes) */
  test('US3-AS1: Primes workbench Step 1 tests stubborn prime vs composite rectangles (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/primes');
    await expect(page.locator('.screen-title')).toContainText(/Primes & composites sieve/i);
    await expect(page.locator('.verdict-box')).toContainText(
      /Stubborn Prime! 7 only forms a single straight/i
    );

    // Try folding 7 into 2 rows: leaves 1 loose tile
    const row2Btn = page.locator('.btn-fold-row', { hasText: '2 row(s)' });
    await row2Btn.click();
    await expect(page.locator('.prime-status-banner')).toContainText(
      /Broken! 2 rows leaves 1 loose tile\(s\)/i
    );

    // Switch to 6 tiles: can fold into 2 rows of 3 (composite)
    const btn6 = page.locator('.btn-test-num', { hasText: '6 tiles' });
    await btn6.click();
    await expect(page.locator('.prime-status-banner')).toContainText(
      /Solid Rectangle! 2 × 3 = 6 \(Composite!\)/i
    );
  });

  test('US3-AS2: Step 2 Sieve of Eratosthenes filters composite multiples across 1-50 grid (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/primes?step=2');
    await expect(page.locator('.sieve-filter-controls')).toBeVisible();

    // Click Filter 2s
    const filter2Btn = page.getByRole('button', { name: 'Filter 2s', exact: true });
    await filter2Btn.click();

    // Multiple 4 should now be struck out
    const cell4 = page.locator('.sieve-cell[data-number="4"]');
    await expect(cell4).toHaveClass(/struck/);

    // Reveal All 15 Primes
    const revealAllBtn = page.getByRole('button', { name: 'Reveal All 15 Primes', exact: true });
    await revealAllBtn.click();

    // Cell 7 is prime and glowing
    const cell7 = page.locator('.sieve-cell[data-number="7"]');
    await expect(cell7).toHaveClass(/prime-glow/);
    await expect(page.locator('.sieve-summary-banner')).toContainText(/15 primes total/i);
  });

  test('US3-AS3: Step 3 decomposes composite numbers into prime factor trees (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/primes?step=3');
    await expect(page.locator('.root-node')).toContainText('24');
    await expect(page.locator('.prime-factors-banner')).toContainText(
      /Prime Factorization: 24 = 2 × 2 × 2 × 3/i
    );

    // Switch to 18
    const btn18 = page.locator('.btn-tree-select', { hasText: '18' });
    await btn18.click();
    await expect(page.locator('.root-node')).toContainText('18');
    await expect(page.locator('.prime-factors-banner')).toContainText(
      /Prime Factorization: 18 = 2 × 3 × 3/i
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Arjun calling 9 prime because it is odd (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=F2');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: concluded 9 has no other factors) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(/Being odd does not make a number prime/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates two and composite cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=F2');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'two'
    const twoChip = page.getByRole('button', { name: 'two', exact: true });
    await expect(twoChip).toBeVisible();
    await twoChip.click();

    // Select second blank tile 'composite'
    const compChip = page.getByRole('button', { name: 'composite', exact: true });
    await expect(compChip).toBeVisible();
    await compChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Pedagogical Invariants */
  test('US5-AS1: Primes screen maintains calm presentation without gamification (FR-005)', async ({
    page,
  }) => {
    await page.goto('/#/primes');
    // Ensure zero banned words or gamified banners exist
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
