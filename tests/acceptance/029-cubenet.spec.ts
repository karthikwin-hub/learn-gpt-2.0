import { test, expect } from '@playwright/test';

test.describe('Feature 029 Acceptance: Fold a Box (Cube Nets & Spatial Visualization) (Knot G5)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot G5 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const g5Btn = page.locator('button[data-knot="G5"]');
    await expect(g5Btn).toBeVisible();

    await g5Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=G5/);
    await expect(page.locator('.screen-title')).toContainText(
      /connect 6 squares in a 2 by 3 solid rectangle|solid rectangle/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges 2x3 foldability and accepts overlap choice (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=G5');
    await expect(page.locator('.screen-title')).toContainText(/solid rectangle/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'No, because faces will overlap and leave holes'
    const choiceBtn = page.getByRole('button', {
      name: /faces will overlap and leave holes/i,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=G5/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining cube nets and spatial folding (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G5');
    await expect(page.locator('.bodha-knot')).toContainText(/Fold a box/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Cube Net Workbench (#cubenet) */
  test('US3-AS1: Cubenet workbench displays grid and validates T-Net by default (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/cubenet');
    await expect(page.locator('.screen-title')).toContainText(/Fold a box/i);
    await expect(page.locator('.status-badge')).toContainText(/Valid Cube Net/i);
    await expect(page.locator('.workbench-feedback')).toContainText(/Valid cube net/i);
  });

  test('US3-AS2: Presets toggle between valid nets and colliding 2x3 block (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/cubenet');

    // Click 2x3 preset
    const btn2x3 = page.getByRole('button', { name: /2×3 Block/i });
    await expect(btn2x3).toBeVisible();
    await btn2x3.click();

    await expect(page.locator('.status-badge')).toContainText(/Faces Collide|Open Holes/i);
    await expect(page.locator('.workbench-feedback')).toContainText(/Faces collide/i);

    // Click T-Net preset to return to valid net
    const btnT = page.getByRole('button', { name: /T-Net/i });
    await expect(btnT).toBeVisible();
    await btnT.click();

    await expect(page.locator('.status-badge')).toContainText(/Valid Cube Net/i);
  });

  test('US3-AS3: Fold 3D slider transforms flat net to 3D isometric representation (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/cubenet');
    const slider = page.locator('#fold-slider');
    await expect(slider).toBeVisible();

    // Slide to 90 degrees (fully folded)
    await slider.fill('90');
    await slider.dispatchEvent('input');

    await expect(page.locator('.cubenet-canvas-card')).toContainText(/Closed 3D Cube/i);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Priya assuming 2x3 block folds into cube (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=G5');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 1 (0-indexed 0: drawing 2x3 rectangle) is the mistake
    await stepBtns.nth(0).click();
    await expect(page.locator('.say')).toContainText(
      /A 2 by 3 solid block cannot fold into a cube/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates six and overlap cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=G5');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'six'
    const sixChip = page.getByRole('button', { name: 'six', exact: true });
    await expect(sixChip).toBeVisible();
    await sixChip.click();

    // Select second blank tile 'overlap'
    const overlapChip = page.getByRole('button', { name: 'overlap', exact: true });
    await expect(overlapChip).toBeVisible();
    await overlapChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Cubenet screen maintains calm presentation and accessible touch targets (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/cubenet');

    const buttons = page.locator('.chip, .btn, input[type="range"]');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const box = await buttons.nth(i).boundingBox();
      if (box && box.height > 0) {
        expect(box.height).toBeGreaterThanOrEqual(40);
      }
    }

    // Zero gamification elements
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
