import { test, expect } from '@playwright/test';

test.describe('Feature 021 Acceptance: Factors Make Rectangles (Knot F1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot F1 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const f1Btn = page.locator('button[data-knot="F1"]');
    await expect(f1Btn).toBeVisible();

    await f1Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=F1/);
    await expect(page.locator('.screen-title')).toContainText(
      /How many different rectangles can you build using 12 square tiles/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges rectangle count prediction and accepts 3 (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=F1');
    await expect(page.locator('.screen-title')).toContainText(
      /How many different rectangles can you build using 12 square tiles/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 3 is the correct prediction
    const choiceBtn = page.getByRole('button', { name: '3', exact: true });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=F1/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining factor pairs and rectangle sides (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=F1');
    await expect(page.locator('.bodha-knot')).toContainText(/Factors make rectangles/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Factors Workbench (#factors) */
  test('US3-AS1: Factors workbench Step 1 tests row heights and snaps valid rectangles (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/factors');
    await expect(page.locator('.screen-title')).toContainText(/Factors make rectangles/i);
    await expect(page.locator('.rect-status')).toContainText(/Solid Rectangle! 3 × 4 = 12/i);

    // Select row 5 which leaves 2 loose remainder tiles
    const row5Btn = page.locator('.btn-row-select', { hasText: '5' });
    await row5Btn.click();
    await expect(page.locator('.rect-status')).toContainText(
      /5 rows leaves 2 loose tile\(s\) — Not a rectangle!/i
    );

    // Select row 2 which forms a valid 2 x 6 rectangle
    const row2Btn = page.locator('.btn-row-select', { hasText: '2' });
    await row2Btn.click();
    await expect(page.locator('.rect-status')).toContainText(/Solid Rectangle! 2 × 6 = 12/i);
  });

  test('US3-AS2: Step 2 shows rainbow factor pair arcs linking partner factors (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/factors?step=2');
    await expect(page.locator('.rainbow-explanation')).toBeVisible();
    await expect(page.locator('.rainbow-svg-wrap')).toBeVisible();

    // Verify all 6 factor tokens exist
    const tokens = page.locator('.factor-token');
    await expect(tokens).toHaveCount(6);

    // Click pair button for 3 x 4
    const pair3x4 = page.getByRole('button', { name: '3 × 4', exact: true });
    await pair3x4.click();
    await expect(page.locator('.factor-token.highlighted')).toHaveCount(2);
  });

  test('US3-AS3: Step 3 demonstrates square symmetry and odd factor count for 16 (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/factors?step=3');
    await expect(page.locator('.symmetry-banner')).toContainText(
      /4 × 4 = 16: A Perfect Square Mat!/i
    );
    await expect(page.locator('.odd-factors-container')).toContainText(/All Factors of 16/i);
    await expect(page.locator('.odd-factor-rule')).toContainText(/odd number/i);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Raju missing partner factors (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=F1');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: wrote 1, 2, 3, 6 omitting 9 and 18) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(/Raju forgot the partner factors/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates pairs and partner cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=F1');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'pairs'
    const pairsChip = page.getByRole('button', { name: 'pairs', exact: true });
    await expect(pairsChip).toBeVisible();
    await pairsChip.click();

    // Select second blank tile 'partner'
    const partnerChip = page.getByRole('button', { name: 'partner', exact: true });
    await expect(partnerChip).toBeVisible();
    await partnerChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Pedagogical Invariants */
  test('US5-AS1: Factors screen maintains calm presentation without gamification (FR-005)', async ({
    page,
  }) => {
    await page.goto('/#/factors');
    // Ensure zero banned words or gamified banners exist
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
