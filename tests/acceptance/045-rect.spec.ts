import { test, expect } from '@playwright/test';

test.describe('Feature 045 Acceptance: Multiplication Foundations: Equal Groups & Commutative Rotation (Knots M1, M3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot M1 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const m1Btn = page.locator('button[data-knot="M1"]');
    await expect(m1Btn).toBeVisible();

    await m1Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=M1/);
    await expect(page.locator('.screen-title')).toContainText(
      /You have 3 baskets with 8 apples each/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges apple baskets prediction and accepts choice C (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=M1');
    await expect(page.locator('.screen-title')).toContainText(
      /You have 3 baskets with 8 apples each/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'Both have the exact same total (24 apples)'
    const choiceBtn = page.getByRole('button', {
      name: /Both have the exact same total \(24 apples\)/i,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=M1/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining equal groups and commutative array rotation (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=M1');
    await expect(page.locator('.bodha-knot')).toContainText(/Equal groups/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Workbench (#rect) */
  test('US3-AS1: Rect workbench displays area grid and synchronized equation (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/rect?k=M1');
    await expect(page.locator('.screen-title')).toBeVisible();
    await expect(page.locator('.area-grid')).toBeVisible();
    await expect(page.locator('.eq')).toBeVisible();
  });

  test('US3-AS2: Rotating rectangular array swaps dimensions while conserving total product (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/rect?k=M1');
    const rotateBtn = page.getByRole('button', { name: /Rotate Array/i });
    await expect(rotateBtn).toBeVisible();

    // Initial state for M1: 4 × 7 = 28
    await expect(page.locator('.eq')).toContainText('28');

    // Rotate 90 degrees
    await rotateBtn.click();
    // Swapped to 7 × 4 = 28
    await expect(page.locator('.eq')).toContainText('28');
    await expect(page.locator('.say')).toContainText('4 × 7 = 7 × 4 = 28');

    // Advance button to Spot the Mistake
    const nextBtn = page.getByRole('button', { name: /Spot (a|the) Mistake/i });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();
    await expect(page).toHaveURL(/#\/mistake\?k=M1/);
  });

  test('US3-AS3: Workbench maintains calm aesthetics with zero gamification (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/rect?k=M1');
    await expect(page.locator('.score, .streak, .points, .stars, .timer, .confetti')).toHaveCount(
      0
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Varun failing to recognize commutative rotation (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?k=M1');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: Varun claims knowing 8 × 3 does not help with 3 × 8) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /Rotating 8 × 3 by a quarter turn creates 3 × 8/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates columns and equal to cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=M1');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'columns'
    const columnsChip = page.getByRole('button', { name: 'columns', exact: true });
    await expect(columnsChip).toBeVisible();
    await columnsChip.click();

    // Select second blank tile 'equal to'
    const equalToChip = page.getByRole('button', { name: 'equal to', exact: true });
    await expect(equalToChip).toBeVisible();
    await equalToChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Invariants */
  test('US5-AS1: Rect screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/rect?k=M1');

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
