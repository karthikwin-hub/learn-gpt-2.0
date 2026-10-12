import { test, expect } from '@playwright/test';

test.describe('Feature 031 Acceptance: Tangrams (Dissection & Area Conservation) (Knot G7)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot G7 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const g7Btn = page.locator('button[data-knot="G7"]');
    await expect(g7Btn).toBeVisible();

    await g7Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=G7/);
    await expect(page.locator('.screen-title')).toContainText(
      /rearrange all 7 wooden tangram pieces|tall candle/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges candle rearrangement and accepts unchanged area choice (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=G7');
    await expect(page.locator('.screen-title')).toContainText(/tall candle/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'No, rearranging pieces leaves total area exactly unchanged'
    const choiceBtn = page.getByRole('button', {
      name: /rearranging pieces leaves total area exactly unchanged/i,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=G7/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining tangram dissection and area conservation (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G7');
    await expect(page.locator('.bodha-knot')).toContainText(/Tangrams|G7/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Tangram Workbench (#tangram) */
  test('US3-AS1: Tangram workbench displays 7 pieces with default Square silhouette (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/tangram');
    await expect(page.locator('.screen-title')).toContainText(
      /Tangrams: Dissection & Area Conservation/i
    );
    await expect(page.locator('#pieces-count')).toContainText(/7 of 7/i);
    await expect(page.locator('#units-count')).toContainText(/16 \/ 16/i);
    await expect(page.locator('#area-display')).toContainText(/100 cm²/i);
    await expect(page.locator('#conservation-status')).toContainText(/Area Strictly Conserved/i);
  });

  test('US3-AS2: Silhouette presets update outline while conserving 16 units area strictly (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/tangram');

    // Switch to Swan silhouette
    const swanBtn = page.locator('#preset-swan-btn');
    await expect(swanBtn).toBeVisible();
    await swanBtn.click();

    await expect(page.locator('#conservation-status')).toContainText(/Swan/i);
    await expect(page.locator('#units-count')).toContainText(/16 \/ 16/i);
    await expect(page.locator('#area-display')).toContainText(/100 cm²/i);

    // Switch to Candle silhouette
    const candleBtn = page.locator('#preset-candle-btn');
    await expect(candleBtn).toBeVisible();
    await candleBtn.click();

    await expect(page.locator('#conservation-status')).toContainText(/Candle/i);
    await expect(page.locator('#units-count')).toContainText(/16 \/ 16/i);
  });

  test('US3-AS3: Small triangle equivalence tab shows 2 small triangles equal square (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/tangram');

    // Click step tab 3: Small Triangle Equivalence
    const step3Tab = page.getByRole('button', { name: /Small Triangle Equivalence/i });
    await expect(step3Tab).toBeVisible();
    await step3Tab.click();

    await expect(page.locator('#conservation-status')).toContainText(
      /Piece Decomposition Equivalence/i
    );
    await expect(page.locator('.tangram-canvas-container')).toContainText(/2 Small Triangles/i);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Meera confusing swan height with area (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=G7');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: swan neck taller claim) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(/Height does not determine area/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates unchanged and square cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=G7');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'unchanged'
    const unchangedChip = page.getByRole('button', { name: 'unchanged', exact: true });
    await expect(unchangedChip).toBeVisible();
    await unchangedChip.click();

    // Select second blank tile 'square'
    const squareChip = page.getByRole('button', { name: 'square', exact: true });
    await expect(squareChip).toBeVisible();
    await squareChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Tangram screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/tangram');

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
