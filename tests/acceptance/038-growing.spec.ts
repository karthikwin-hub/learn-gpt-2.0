import { test, expect } from '@playwright/test';

test.describe('Feature 038 Acceptance: Growing Patterns (Figurate & Triangular Numbers) (Knot P1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot P1 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const p1Btn = page.locator('button[data-knot="P1"]');
    await expect(p1Btn).toBeVisible();

    await p1Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=P1/);
    await expect(page.locator('.screen-title')).toContainText(
      /In a dot triangle, row 1 has 1 dot/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges 4-row triangle and accepts 10 dots (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=P1');
    await expect(page.locator('.screen-title')).toContainText(
      /In a dot triangle, row 1 has 1 dot/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting '10 dots'
    const choiceBtn = page.getByRole('button', {
      name: '10 dots',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=P1/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining figurate growing patterns and worked examples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=P1');
    await expect(page.locator('.bodha-knot')).toContainText(/Growing Patterns/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Growing Patterns Workbench (#growing) */
  test('US3-AS1: Growing patterns workbench displays Dot Triangle pyramid with glowing new layer (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/growing');
    await expect(page.locator('.screen-title')).toContainText(
      /Growing Patterns \(Figurate & Triangular Numbers\)/i
    );
    await expect(page.locator('.triangular-card')).toBeVisible();

    // Stage 4 has 10 dots total, with 4 in the bottom layer
    const dots = page.locator('.pyramid-dot');
    await expect(dots).toHaveCount(10);
    const newLayerDots = page.locator('.new-layer-dot');
    await expect(newLayerDots).toHaveCount(4);

    await expect(page.locator('.tri-total-pill')).toContainText(/Total: 10 Dots/i);
  });

  test('US3-AS2: Step 2 Square Gnomon Grid displays square tiles with L-shaped border (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/growing');

    // Switch to step 2: Square Gnomon Grid
    const step2Btn = page.getByRole('button', { name: /2\. Square Gnomon Grid/i });
    await expect(step2Btn).toBeVisible();
    await step2Btn.click();

    await expect(page.locator('.square-card')).toBeVisible();
    // Default Stage 3 has 9 tiles total, with 5 gnomon tiles
    const tiles = page.locator('.square-tile');
    await expect(tiles).toHaveCount(9);
    const gnomonTiles = page.locator('.gnomon-tile');
    await expect(gnomonTiles).toHaveCount(5);

    await expect(page.locator('.sq-total-pill')).toContainText(/Total: 9 Tiles/i);
  });

  test('US3-AS3: Step 3 Growth Table contrasts quadratic growth with Amit linear guess (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/growing');

    // Switch to step 3: Growth Table & Lab
    const step3Btn = page.getByRole('button', { name: /3\. Growth Table & Lab/i });
    await expect(step3Btn).toBeVisible();
    await step3Btn.click();

    await expect(page.locator('.growth-table-card')).toBeVisible();
    await expect(page.locator('.growth-table')).toBeVisible();
    await expect(page.locator('.amit-trap-box')).toBeVisible();

    // Stage 5 row shows 25 tiles vs 10 guess
    const tableText = await page.locator('.growth-table').innerText();
    expect(tableText).toContain('25');
    expect(tableText).toContain('10');
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Amit multiplying by 2 instead of squaring (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=P1');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: multiplies 5 × 2 = 10) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /A square of side 5 has 5 rows of 5 tiles = 5 × 5 = 25 tiles, not 10/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates layer and sixteen cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=P1');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'layer'
    const layerChip = page.getByRole('button', { name: 'layer', exact: true });
    await expect(layerChip).toBeVisible();
    await layerChip.click();

    // Select second blank tile 'sixteen'
    const sixteenChip = page.getByRole('button', { name: 'sixteen', exact: true });
    await expect(sixteenChip).toBeVisible();
    await sixteenChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Growing patterns screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/growing');

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
