import { test, expect } from '@playwright/test';

test.describe('Feature 020 Acceptance: Which Operation? (Knot A3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot A3 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const a3Btn = page.locator('button[data-knot="A3"]');
    await expect(a3Btn).toBeVisible();

    await a3Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=A3/);
    await expect(page.locator('.screen-title')).toContainText(
      /5 children share 30 laddoos equally\. Which mathematical model finds each child’s share/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges operation selection and accepts 30 ÷ 5 (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=A3');
    await expect(page.locator('.screen-title')).toContainText(
      /Which mathematical model finds each child’s share/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 30 ÷ 5 is the model
    const choiceBtn = page.getByRole('button', { name: '30 ÷ 5', exact: true });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=A3/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining root actions and keyword traps (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=A3');
    await expect(page.locator('.bodha-knot')).toContainText(/Which operation/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Word Problem Workbench (#wordprob) */
  test('US3-AS1: Word problem workbench classifies replicate action with tape diagram (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/wordprob');
    await expect(page.locator('.screen-title')).toContainText(
      /Which operation\? Action detective/i
    );
    await expect(page.locator('.story-card')).toContainText(
      /Radha buys 6 boxes of colored pencils/i
    );

    const replicateBtn = page.getByRole('button', { name: /Replicate Equal Groups/i });
    await expect(replicateBtn).toBeVisible();

    await replicateBtn.click();
    await expect(page.locator('.tape-diagram-box')).toContainText(
      /6 equal boxes of 24 = 24 × 6 = 144 pencils/i
    );
    await expect(page.locator('.say')).toContainText(/Action identified: Replicate equal groups/i);
  });

  test('US3-AS2: Comparison gap model shows subtraction difference between heights (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/wordprob?step=2');
    await expect(page.locator('.story-card')).toContainText(/temple flagpole is 40 m tall/i);

    const revealBtn = page.getByRole('button', { name: /Find Comparison Gap/i });
    await expect(revealBtn).toBeVisible();

    await revealBtn.click();
    await expect(page.locator('.gap-bar')).toContainText(/Difference Gap: 25 m \(40 - 15 = 25\)/i);
    await expect(page.locator('.say')).toContainText(/Comparison gap: 40 − 15 = 25 m difference/i);
  });

  test('US3-AS3: Equation assembler constructs partition model for equal shares (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/wordprob?step=3');
    await expect(page.locator('.story-card')).toContainText(/5 children share 30 laddoos equally/i);

    const assembleBtn = page.getByRole('button', { name: /Assemble Partition Equation/i });
    await expect(assembleBtn).toBeVisible();

    await assembleBtn.click();
    await expect(page.locator('.math-banner')).toContainText(/30 ÷ 5 = 6 laddoos each/i);
    await expect(page.locator('.say')).toContainText(
      /Equation assembled: 30 ÷ 5 = 6 equal shares/i
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Amit falling for more keyword trap (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=A3');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: adding 40 + 15 = 55 because of word "more") is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /asks for the difference gap between the two poles/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates difference and subtracting cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=A3');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'difference'
    const diffChip = page.getByRole('button', { name: 'difference', exact: true });
    await expect(diffChip).toBeVisible();
    await diffChip.click();

    // Select second blank tile 'subtracting'
    const subChip = page.getByRole('button', { name: 'subtracting', exact: true });
    await expect(subChip).toBeVisible();
    await subChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Pedagogical Invariants */
  test('US5-AS1: Word problem screen maintains calm presentation without gamification (FR-005)', async ({
    page,
  }) => {
    await page.goto('/#/wordprob');
    // Ensure zero banned words or gamified banners exist
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
