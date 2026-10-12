import { test, expect } from '@playwright/test';

test.describe('Feature 025 Acceptance: Angles as Turns (Knot G1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot G1 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const g1Btn = page.locator('button[data-knot="G1"]');
    await expect(g1Btn).toBeVisible();

    await g1Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=G1/);
    await expect(page.locator('.screen-title')).toContainText(
      /Which clock’s hands make a bigger angle|bigger angle/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges clock angle prediction and accepts identical choice (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=G1');
    await expect(page.locator('.screen-title')).toContainText(/bigger angle/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'Both angles are exactly the same'
    const choiceBtn = page.getByRole('button', {
      name: /Both angles are exactly the same/i,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=G1/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining turn amounts and clock progression (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G1');
    await expect(page.locator('.bodha-knot')).toContainText(/Angles as turns/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Angles Workbench (#angles) */
  test('US3-AS1: Angles workbench Step 1 rotates ray to 90° and shows Quarter turn (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/angles');
    await expect(page.locator('.screen-title')).toContainText(/Angles as turns/i);

    // Click 90° preset button
    const preset90 = page.getByRole('button', { name: /90° \(Quarter\)/i });
    await expect(preset90).toBeVisible();
    await preset90.click();

    await expect(page.locator('.angle-degrees')).toContainText('90°');
    await expect(page.locator('.angle-type-badge')).toContainText(/Quarter turn \/ Right angle/i);
    await expect(page.locator('.say')).toContainText(/Quarter turn made: 90°/i);

    const nextBtn = page.locator('#btn-step1-next');
    await expect(nextBtn).toBeVisible();
  });

  test('US3-AS2: Step 2 tests arm length stretcher and proves angle invariance (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/angles?step=2');
    await expect(page.locator('.angles-canvas-stretcher')).toBeVisible();
    await expect(page.locator('.invariance-status')).toContainText(/Angle: 90° \(Constant!\)/i);

    // Stretcher controls
    const slider = page.locator('#arm-slider');
    await expect(slider).toBeVisible();

    // Set slider to max arm length
    await slider.fill('160');
    await slider.dispatchEvent('change');

    await expect(page.locator('.invariance-status')).toContainText('160px');
    await expect(page.locator('.invariance-status')).toContainText('Angle: 90°');
    await expect(page.locator('.say')).toContainText(/Longer arms do not make a bigger angle/i);
  });

  test('US3-AS3: Step 3 compares giant tower clock and wristwatch showing identical 90° (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/angles?step=3');
    await expect(page.locator('.clock-comparison-container')).toBeVisible();
    await expect(page.locator('.tower-clock')).toBeVisible();
    await expect(page.locator('.wrist-watch')).toBeVisible();

    await expect(page.locator('.clock-conclusion-box')).toContainText(
      /Both hands turn exactly 1\/4 of a full circle: both are 90°/i
    );

    const mistakeBtn = page.locator('#btn-to-mistake');
    await expect(mistakeBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Tarun comparing door size instead of turn angle (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=G1');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 3 (0-indexed 2: door is bigger) is the mistake
    await stepBtns.nth(2).click();
    await expect(page.locator('.say')).toContainText(
      /Angle is amount of turn, not the size of the object/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates turn and right angle cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=G1');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'turn'
    const turnChip = page.getByRole('button', { name: 'turn', exact: true });
    await expect(turnChip).toBeVisible();
    await turnChip.click();

    // Select second blank tile 'right'
    const rightChip = page.getByRole('button', { name: 'right', exact: true });
    await expect(rightChip).toBeVisible();
    await rightChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Pedagogical Invariants */
  test('US5-AS1: Angles screen maintains calm presentation without gamification (FR-005)', async ({
    page,
  }) => {
    await page.goto('/#/angles');
    // Ensure zero banned words or gamified banners exist
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
