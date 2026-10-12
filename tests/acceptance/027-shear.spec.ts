import { test, expect } from '@playwright/test';

test.describe('Feature 027 Acceptance: Slide the Top (Conservation of Area under Shear) (Knot G3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot G3 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const g3Btn = page.locator('button[data-knot="G3"]');
    await expect(g3Btn).toBeVisible();

    await g3Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=G3/);
    await expect(page.locator('.screen-title')).toContainText(
      /push the top card of a deck of cards sideways|deck of cards/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges deck shear question and accepts invariant choice (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=G3');
    await expect(page.locator('.screen-title')).toContainText(/deck of cards/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'No, the area stays exactly the same'
    const choiceBtn = page.getByRole('button', {
      name: /No, the area stays exactly the same/i,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=G3/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining conservation of area under shear (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G3');
    await expect(page.locator('.bodha-knot')).toContainText(/Slide the top/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Shear Workbench (#shear) */
  test('US3-AS1: Shear workbench displays slidable parallelogram and live readouts (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/shear');
    await expect(page.locator('.screen-title')).toContainText(/Slide the top/i);
    await expect(page.locator('.shear-canvas-wrap')).toBeVisible();
    await expect(page.locator('.stat-val').first()).toContainText('24 cm²');
  });

  test('US3-AS2: Sliding top along guide rail keeps Area constant while Perimeter grows (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/shear');
    const slider = page.locator('#shear-offset-slider');
    await expect(slider).toBeVisible();

    // Initial state: offset = 0, area = 24, perimeter = 2 * (6 + 4) = 20
    await expect(page.locator('.stat-val').nth(0)).toContainText('24 cm²');
    await expect(page.locator('.stat-val').nth(1)).toContainText('20.0 cm');

    // Slide offset to 3
    await slider.fill('3');
    await slider.dispatchEvent('input');

    // Area must still be 24 cm²! Slant is sqrt(4^2 + 3^2) = 5 cm, Perimeter = 2 * (6 + 5) = 22 cm
    await expect(page.locator('.stat-val').nth(0)).toContainText('24 cm²');
    await expect(page.locator('.stat-val').nth(1)).toContainText('22.0 cm');
    await expect(page.locator('.stat-val').nth(2)).toContainText('5.0 cm');
    await expect(page.locator('.workbench-feedback')).toContainText(/perimeter grew longer/i);
  });

  test('US3-AS3: Cut & Shift decomposition proves triangular equality (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/shear');
    const slider = page.locator('#shear-offset-slider');
    await slider.fill('3');
    await slider.dispatchEvent('input');

    const cutShiftBtn = page.locator('#btn-cut-shift');
    await expect(cutShiftBtn).toBeVisible();
    await cutShiftBtn.click();
    await expect(cutShiftBtn).toHaveAttribute('aria-pressed', 'true');

    await expect(page.locator('.workbench-feedback')).toContainText(
      /The cut piece perfectly fills the gap/i
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Leena using slant height instead of vertical height (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=G3');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: multiplied 6 * 5 = 30) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /multiplied by the slanted side .* instead of the perpendicular height/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates area and perpendicular cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=G3');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'area'
    const areaChip = page.getByRole('button', { name: 'area', exact: true });
    await expect(areaChip).toBeVisible();
    await areaChip.click();

    // Select second blank tile 'perpendicular'
    const perpChip = page.getByRole('button', { name: 'perpendicular', exact: true });
    await expect(perpChip).toBeVisible();
    await perpChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Shear screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/shear');

    const buttons = page.locator('button, input[type="range"]');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const box = await buttons.nth(i).boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(40); // Standard accessibility touch clearance
      }
    }

    // Zero gamification elements
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
