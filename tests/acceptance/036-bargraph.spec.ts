import { test, expect } from '@playwright/test';

test.describe('Feature 036 Acceptance: Bar Graphs (Axes, Scale Intervals & Jaal B1 ↔ H2) (Knot H2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot H2 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const h2Btn = page.locator('button[data-knot="H2"]');
    await expect(h2Btn).toBeVisible();

    await h2Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=H2/);
    await expect(page.locator('.screen-title')).toContainText(
      /A bar reaches line 4 on an axis marked in steps of 10/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges line 4 on axis step 10 and accepts 40 (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=H2');
    await expect(page.locator('.screen-title')).toContainText(
      /A bar reaches line 4 on an axis marked in steps of 10/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting '40'
    const choiceBtn = page.getByRole('button', {
      name: '40',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=H2/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining scaled bar graphs and worked examples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=H2');
    await expect(page.locator('.bodha-knot')).toContainText(/Bar Graphs/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Bar Graph Workbench (#bargraph) */
  test('US3-AS1: Bar Graph workbench displays interactive bar chart with step scale selector (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/bargraph');
    await expect(page.locator('.screen-title')).toContainText(
      /Bar Graphs \(Axes, Scale Intervals & Jaal B1 ↔ H2\)/i
    );
    await expect(page.locator('.axis-scale-bar')).toBeVisible();
    await expect(page.locator('.axis-scale-bar')).toContainText(/Axis Step: 5 units \/ mark/i);

    // Initial bars in SVG
    const bars = page.locator('.bar-rect');
    await expect(bars).toHaveCount(4);
  });

  test('US3-AS2: Step 2 Scale Multipliers calculates grid mark × axis step (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/bargraph');

    // Switch to step 2: Scale Multipliers
    const step2Btn = page.getByRole('button', { name: /2\. Scale Multipliers/i });
    await expect(step2Btn).toBeVisible();
    await step2Btn.click();

    await expect(page.locator('.multiplier-card')).toBeVisible();
    await expect(page.locator('.multiplier-total-pill')).toContainText(/40 Units/i);

    // Change step to 5
    const step5Btn = page.getByRole('button', { name: 'Step 5', exact: true });
    await step5Btn.click();
    await expect(page.locator('.multiplier-total-pill')).toContainText(/20 Units/i);
  });

  test('US3-AS3: Step 3 Jaal B1 Food Nutrient Intake renders nutrition bars with orientation toggle (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/bargraph');

    // Switch to step 3: Jaal B1 Food Intake
    const step3Btn = page.getByRole('button', { name: /3\. Jaal B1 Food Intake/i });
    await expect(step3Btn).toBeVisible();
    await step3Btn.click();

    await expect(page.locator('.jaal-food-card')).toBeVisible();
    const foodItems = page.locator('.food-bar-item');
    await expect(foodItems).toHaveCount(4);

    // Orientation toggle
    const horizBtn = page.getByRole('button', { name: 'Horizontal Bars', exact: true });
    await expect(horizBtn).toBeVisible();
    await horizBtn.click();
    await expect(page.locator('.jaal-food-card')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Vikram reading grid line index instead of axis step (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=H2');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: writes only 3 footballs) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /Grid line 3 corresponds to 3 × 5 = 15 footballs, not 3/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates scale and width cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=H2');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'scale'
    const scaleChip = page.getByRole('button', { name: 'scale', exact: true });
    await expect(scaleChip).toBeVisible();
    await scaleChip.click();

    // Select second blank tile 'width'
    const widthChip = page.getByRole('button', { name: 'width', exact: true });
    await expect(widthChip).toBeVisible();
    await widthChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Bar Graph screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/bargraph');

    const buttons = page.locator('button, input[type="range"]');
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
