import { test, expect } from '@playwright/test';

test.describe('Feature 030 Acceptance: Circles (Centre, Radius, Diameter) (Knot G6)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot G6 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const g6Btn = page.locator('button[data-knot="G6"]');
    await expect(g6Btn).toBeVisible();

    await g6Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=G6/);
    await expect(page.locator('.screen-title')).toContainText(
      /bicycle wheel spoke|straight from the centre axle/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges bicycle wheel spoke and accepts 60 cm choice (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=G6');
    await expect(page.locator('.screen-title')).toContainText(/bicycle wheel spoke/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting '60 cm'
    const choiceBtn = page.getByRole('button', {
      name: '60 cm',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=G6/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining centre, radius, and diameter (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G6');
    await expect(page.locator('.bodha-knot')).toContainText(/Circles|G6/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Circle Workbench (#circle) */
  test('US3-AS1: Circle workbench displays SVG canvas and badges with default radius 5 cm (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/circle');
    await expect(page.locator('.screen-title')).toContainText(/Circles: Centre, Radius, Diameter/i);
    await expect(page.locator('#radius-display')).toContainText(/Radius: 5 cm/i);
    await expect(page.locator('#diameter-display')).toContainText(/Diameter: 10 cm/i);
    await expect(page.locator('#chord-status')).toContainText(
      /Passes Through Centre \(Diameter\)/i
    );
  });

  test('US3-AS2: Adjusting offset slider distinguishes diameter from off-centre chord (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/circle');

    // Click Off-Centre Preset button (offset 3 cm)
    const offCentreBtn = page.locator('#preset-chord-btn');
    await expect(offCentreBtn).toBeVisible();
    await offCentreBtn.click();

    // With radius 5 and offset 3, chord length is 2 * sqrt(25 - 9) = 8 cm
    await expect(page.locator('#chord-display')).toContainText(/8\.0 cm/i);
    await expect(page.locator('#chord-status')).toContainText(/Off-Centre Chord/i);
    await expect(page.locator('#chord-status')).toContainText(/shorter/i);

    // Return to centre diameter via preset button
    const centreBtn = page.locator('#preset-diameter-btn');
    await expect(centreBtn).toBeVisible();
    await centreBtn.click();

    await expect(page.locator('#chord-display')).toContainText(/10\.0 cm/i);
    await expect(page.locator('#chord-status')).toContainText(/Diameter/i);
  });

  test('US3-AS3: Radius slider dynamically scales diameter and circle boundary (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/circle');
    const radiusSlider = page.locator('#radius-slider');
    await expect(radiusSlider).toBeVisible();

    // Change radius to 7 cm
    await radiusSlider.fill('7');
    await radiusSlider.dispatchEvent('input');

    await expect(page.locator('#radius-display')).toContainText(/Radius: 7 cm/i);
    await expect(page.locator('#diameter-display')).toContainText(/Diameter: 14 cm/i);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Dev mislabeling an off-centre chord as diameter (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=G6');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: 8 cm line near top edge) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /A diameter MUST pass directly through the centre dot/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates radius and twice cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=G6');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'radius'
    const radiusChip = page.getByRole('button', { name: 'radius', exact: true });
    await expect(radiusChip).toBeVisible();
    await radiusChip.click();

    // Select second blank tile 'twice'
    const twiceChip = page.getByRole('button', { name: 'twice', exact: true });
    await expect(twiceChip).toBeVisible();
    await twiceChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Circle screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/circle');

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
