import { test, expect } from '@playwright/test';

test.describe('Feature 028 Acceptance: Kolam Mirror (Line vs Rotational Symmetry) (Knot G4)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot G4 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const g4Btn = page.locator('button[data-knot="G4"]');
    await expect(g4Btn).toBeVisible();

    await g4Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=G4/);
    await expect(page.locator('.screen-title')).toContainText(
      /four-blade pinwheel turns and looks identical|pinwheel/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges pinwheel foldability and accepts no mirror lines choice (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=G4');
    await expect(page.locator('.screen-title')).toContainText(/pinwheel/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'No, it has no mirror fold lines even though it looks symmetrical'
    const choiceBtn = page.getByRole('button', {
      name: /No, it has no mirror fold lines/i,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=G4/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining mirror lines and rotational symmetry (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G4');
    await expect(page.locator('.bodha-knot')).toContainText(/Kolam mirror|Symmetry/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Kolam Workbench (#kolam) */
  test('US3-AS1: Kolam workbench allows switching between Mirror and Turn modes (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/kolam');
    await expect(page.locator('.model')).toBeVisible();

    // Switch to Turn mode
    const turnBtn = page.getByRole('button', { name: 'Turn only', exact: true });
    await expect(turnBtn).toBeVisible();
    await turnBtn.click();
    await expect(turnBtn).toHaveAttribute('aria-pressed', 'true');

    // Switch back to Mirror mode
    const mirrorBtn = page.getByRole('button', { name: /Mirror/i });
    await expect(mirrorBtn).toBeVisible();
    await mirrorBtn.click();
    await expect(mirrorBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('US3-AS2: Order selector updates symmetry and readout feedback (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/kolam');
    const order4Btn = page.getByRole('button', { name: '4', exact: true });
    await expect(order4Btn).toBeVisible();
    await order4Btn.click();

    await expect(page.locator('.workbench-feedback')).toContainText(/4 mirror lines/i);

    const mistakeBtn = page.locator('#btn-to-mistake');
    await expect(mistakeBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Arun confusing rotation with mirror symmetry (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=G4');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: claiming 4-fold rotational symmetry requires mirror lines) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /A shape can have rotational symmetry without ANY mirror lines/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates folds and without cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=G4');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'folds'
    const foldsChip = page.getByRole('button', { name: 'folds', exact: true });
    await expect(foldsChip).toBeVisible();
    await foldsChip.click();

    // Select second blank tile 'without'
    const withoutChip = page.getByRole('button', { name: 'without', exact: true });
    await expect(withoutChip).toBeVisible();
    await withoutChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Kolam screen maintains calm presentation and accessible touch targets (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/kolam');

    const buttons = page.locator('.chip, .btn');
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
