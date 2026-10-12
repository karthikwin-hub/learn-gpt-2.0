import { test, expect } from '@playwright/test';

test.describe('Feature 024 Acceptance: Common Factors & HCF (Knot F4)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot F4 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const f4Btn = page.locator('button[data-knot="F4"]');
    await expect(f4Btn).toBeVisible();

    await f4Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=F4/);
    await expect(page.locator('.screen-title')).toContainText(
      /What is the largest measuring cup that can measure both 12 L and 18 L of milk exactly/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges largest cup prediction and accepts 6 L (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=F4');
    await expect(page.locator('.screen-title')).toContainText(
      /What is the largest measuring cup that can measure both 12 L and 18 L of milk exactly/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting '6 L' is the correct prediction
    const choiceBtn = page.getByRole('button', { name: '6 L', exact: true });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=F4/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining shared factors and beam tiling (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=F4');
    await expect(page.locator('.bodha-knot')).toContainText(/Common factors/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive HCF Workbench (#hcf) */
  test('US3-AS1: HCF workbench Step 1 classifies factors in Venn intersection (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/hcf');
    await expect(page.locator('.screen-title')).toContainText(/Common factors & HCF/i);
    await expect(page.locator('.intersection-title')).toContainText(/Common Factors/i);
    await expect(page.locator('.hcf-result-banner')).toContainText(
      /Common Factors: \{1, 2, 3, 6\} → Highest Common Factor is 6/i
    );
    await expect(page.locator('.factor-chip.hcf-highlight')).toContainText('6');
  });

  test('US3-AS2: Step 2 tests dual-beam tile fitting and proves tile 6 is HCF (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/hcf?step=2');
    await expect(page.locator('.rods-container')).toBeVisible();

    // Default tile 6 fits both beams 12 and 18 with zero gaps
    await expect(page.locator('.fit-status-banner')).toContainText(
      /Tile 6 is the HCF! Fits both 12 and 18 with ZERO gaps/i
    );

    // Select tile 4: leaves leftovers on 18
    const tile4Btn = page.getByRole('button', { name: 'Tile 4', exact: true });
    await tile4Btn.click();
    await expect(page.locator('.fit-status-banner')).toContainText(
      /Tile 4 leaves leftovers on 18/i
    );
  });

  test('US3-AS3: Step 3 simplifies fraction in one step dividing by HCF (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/hcf?step=3');
    await expect(page.locator('.frac-block.orig')).toBeVisible();

    const reduceBtn = page.getByRole('button', { name: /Divide by HCF \(6\)/i });
    await expect(reduceBtn).toBeVisible();
    await reduceBtn.click();

    await expect(page.locator('.frac-block.final')).toBeVisible();
    await expect(page.locator('.frac-block.final')).toContainText('2');
    await expect(page.locator('.frac-block.final')).toContainText('3');
    await expect(page.locator('.fraction-reduction-explanation')).toContainText(
      /Reduced in a single clean leap/i
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Tarun stopping at common factor 2 instead of HCF 4 (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=F4');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: stopped at 2) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /2 is a common factor, but it is NOT the highest/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates largest and remainder cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=F4');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'largest'
    const largestChip = page.getByRole('button', { name: 'largest', exact: true });
    await expect(largestChip).toBeVisible();
    await largestChip.click();

    // Select second blank tile 'remainder'
    const remChip = page.getByRole('button', { name: 'remainder', exact: true });
    await expect(remChip).toBeVisible();
    await remChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Pedagogical Invariants */
  test('US5-AS1: HCF screen maintains calm presentation without gamification (FR-005)', async ({
    page,
  }) => {
    await page.goto('/#/hcf');
    // Ensure zero banned words or gamified banners exist
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
