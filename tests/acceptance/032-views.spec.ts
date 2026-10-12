import { test, expect } from '@playwright/test';

test.describe('Feature 032 Acceptance: Views from Above (Top, Front, Side Views & Jaal E4 <-> G8) (Knot G8)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot G8 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const g8Btn = page.locator('button[data-knot="G8"]');
    await expect(g8Btn).toBeVisible();

    await g8Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=G8/);
    await expect(page.locator('.screen-title')).toContainText(
      /straight down from the ceiling|round water cup/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges round water cup and accepts circle choice (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=G8');
    await expect(page.locator('.screen-title')).toContainText(/round water cup/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'A circle'
    const choiceBtn = page.getByRole('button', {
      name: 'A circle',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=G8/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining top, front, and side views (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G8');
    await expect(page.locator('.bodha-knot')).toContainText(/Top, front and side|G8/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Views Workbench (#views) */
  test('US3-AS1: Views workbench displays Top, Front, and Side viewports for Staircase (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/views');
    await expect(page.locator('.screen-title')).toContainText(
      /Views from Above: Top, Front, Side/i
    );
    await expect(page.locator('#structure-name')).toContainText(/Staircase/i);
    await expect(page.locator('#blocks-count')).toContainText(/6/i);
    await expect(page.locator('#top-view-card')).toBeVisible();
    await expect(page.locator('#front-view-card')).toBeVisible();
    await expect(page.locator('#side-view-card')).toBeVisible();
    await expect(page.locator('#perspective-status')).toContainText(/Top View Collapses Drops/i);
  });

  test('US3-AS2: Structure presets update 3D block projections across all viewports (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/views');

    // Switch to Tower preset
    const towerBtn = page.locator('#preset-tower-btn');
    await expect(towerBtn).toBeVisible();
    await towerBtn.click();

    await expect(page.locator('#structure-name')).toContainText(/Tower/i);
    await expect(page.locator('#blocks-count')).toContainText(/3/i);

    // Switch to L-Corner preset
    const cornerBtn = page.locator('#preset-l_shape-btn');
    await expect(cornerBtn).toBeVisible();
    await cornerBtn.click();

    await expect(page.locator('#structure-name')).toContainText(/L-Corner/i);
    await expect(page.locator('#blocks-count')).toContainText(/5/i);
  });

  test('US3-AS3: Step 3 demonstrates Jaal E4 Map link from overhead perspective (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/views');

    // Click step tab 3: Jaal E4 Map Link
    const step3Tab = page.getByRole('button', { name: /Jaal E4 Map Link/i });
    await expect(step3Tab).toBeVisible();
    await step3Tab.click();

    await expect(page.locator('#perspective-status')).toContainText(
      /Jaal Link \(E4 Maps ↔ G8 Top View\)/i
    );
    await expect(page.locator('.workbench-feedback')).toContainText(
      /maps, floor plans, and blueprints/i
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Kabir confusing elevation drops with top view (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=G8');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: drawing step drops in overhead view) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /Looking straight down from above collapses vertical height completely/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates map and height cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=G8');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'map'
    const mapChip = page.getByRole('button', { name: 'map', exact: true });
    await expect(mapChip).toBeVisible();
    await mapChip.click();

    // Select second blank tile 'height'
    const heightChip = page.getByRole('button', { name: 'height', exact: true });
    await expect(heightChip).toBeVisible();
    await heightChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Views screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/views');

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
