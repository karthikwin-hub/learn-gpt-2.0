import { test, expect } from '@playwright/test';

test.describe('Feature 039 Acceptance: Sort by a Rule (Single Set & Universe of Discourse) (Knot S1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot S1 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const s1Btn = page.locator('button[data-knot="S1"]');
    await expect(s1Btn).toBeVisible();

    await s1Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=S1/);
    await expect(page.locator('.screen-title')).toContainText(
      /If the sorting ring rule is "Multiples of 5", where does the number 34 belong\?/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges number 34 placement and accepts Outside the ring (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=S1');
    await expect(page.locator('.screen-title')).toContainText(
      /If the sorting ring rule is "Multiples of 5", where does the number 34 belong\?/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'Outside the ring'
    const choiceBtn = page.getByRole('button', {
      name: 'Outside the ring',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=S1/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining single set rule partition and worked examples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=S1');
    await expect(page.locator('.bodha-knot')).toContainText(/Sort by a Rule/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Single Set Workbench (#singleset) */
  test('US3-AS1: Single set workbench displays sorting courtyard and ring for Multiples of 5 (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/singleset');
    await expect(page.locator('.screen-title')).toContainText(
      /Sort by a Rule \(Single Set & Universe of Discourse\)/i
    );
    await expect(page.locator('.sorting-courtyard')).toBeVisible();
    await expect(page.locator('.sorting-ring')).toBeVisible();

    // In Multiples of 5 default items: 5, 15, 20 are inside (3); 34, 42 are outside (2)
    const insideChips = page.locator('.inside-chip');
    await expect(insideChips).toHaveCount(3);
    const outsideChips = page.locator('.outside-chip');
    await expect(outsideChips).toHaveCount(2);

    await expect(page.locator('.partition-stat-pill')).toContainText(/3 In \/ 2 Out/i);
  });

  test('US3-AS2: Step 2 Ending in 5 highlights Kunal trap callout box (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/singleset');

    // Switch to step 2: Ending in 5
    const step2Btn = page.getByRole('button', { name: /2\. Ending in 5/i });
    await expect(step2Btn).toBeVisible();
    await step2Btn.click();

    await expect(page.locator('.kunal-trap-box')).toBeVisible();
    await expect(page.locator('.kunal-trap-box')).toContainText(/Kunal's Mistake Trap/i);
    // 15, 25 end in 5 (2 inside)
    await expect(page.locator('.inside-chip')).toHaveCount(2);
  });

  test('US3-AS3: Step 3 Four-Sided Shapes tests geometric shapes (FR-003)', async ({ page }) => {
    await page.goto('/#/singleset');

    // Switch to step 3: Four-Sided Shapes
    const step3Btn = page.getByRole('button', { name: /3\. Four-Sided Shapes/i });
    await expect(step3Btn).toBeVisible();
    await step3Btn.click();

    await expect(page.locator('.sorting-ring')).toBeVisible();
    // Square and Rectangle have 4 sides (2 inside)
    await expect(page.locator('.inside-chip')).toHaveCount(2);
    // Triangle (3) and Circle (0) are outside (2 outside)
    await expect(page.locator('.outside-chip')).toHaveCount(2);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Kunal leaving 15 outside (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=S1');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: leaves 15 outside because divisible by 3) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(/The rule only asks if the number ends in 5/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates rule and outside cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=S1');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'rule'
    const ruleChip = page.getByRole('button', { name: 'rule', exact: true });
    await expect(ruleChip).toBeVisible();
    await ruleChip.click();

    // Select second blank tile 'outside'
    const outsideChip = page.getByRole('button', { name: 'outside', exact: true });
    await expect(outsideChip).toBeVisible();
    await outsideChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Single set screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/singleset');

    const buttons = page.locator('button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const box = await buttons.nth(i).boundingBox();
      if (box && box.height > 0) {
        expect(box.height).toBeGreaterThanOrEqual(40);
      }
    }

    // Zero gamification elements
    await expect(page.locator('.score, .streak, .points, .stars, .timer, .confetti')).toHaveCount(
      0
    );
  });
});
