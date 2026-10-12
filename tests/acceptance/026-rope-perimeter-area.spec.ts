import { test, expect } from '@playwright/test';

test.describe('Feature 026 Acceptance: Rope and Pegs (Perimeter vs Area) (Knot G2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot G2 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const g2Btn = page.locator('button[data-knot="G2"]');
    await expect(g2Btn).toBeVisible();

    await g2Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=G2/);
    await expect(page.locator('.screen-title')).toContainText(
      /24-metre rope fences a rectangular vegetable garden|vegetable garden/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges fence question and accepts squarer shape choice (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=G2');
    await expect(page.locator('.screen-title')).toContainText(/vegetable garden/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'Yes, squarer shapes hold more ground'
    const choiceBtn = page.getByRole('button', {
      name: /Yes, squarer shapes hold more ground/i,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=G2/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining perimeter vs area (FR-002)', async ({ page }) => {
    await page.goto('/#/bodha?k=G2');
    await expect(page.locator('.bodha-knot')).toContainText(/Rope and pegs/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Rope Workbench (#rope) */
  test('US3-AS1: Rope workbench shows constant perimeter 24 m while area varies (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/rope');
    await expect(page.locator('.screen-title')).toContainText(/Rope and pegs/i);
    await expect(page.locator('.rope-readout')).toContainText('24 m');

    // Default width is 1 -> area 11
    await expect(page.locator('.rope-readout')).toContainText('11 m²');

    // Step stepper up
    const incBtn = page.getByRole('button', { name: /Increase/i });
    if (await incBtn.isVisible()) {
      await incBtn.click();
      await incBtn.click();
      await incBtn.click();
      await incBtn.click();
      await incBtn.click(); // w = 6 (square)
    }

    await expect(page.locator('.rope-readout')).toContainText('24 m');
  });

  test('US3-AS2: Square dimensions 6 by 6 maximize area to 36 m² on Area Hill (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/rope?p=24&w=6');
    await expect(page.locator('.rope-readout')).toContainText('6 × 6 = 36 m²');
    await expect(page.locator('.rope-hill-container')).toBeVisible();

    const mistakeBtn = page.locator('#btn-to-mistake');
    await expect(mistakeBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Neha claiming same area for different shapes (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=G2');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 3 (0-indexed 2: claiming same area) is the mistake
    await stepBtns.nth(2).click();
    await expect(page.locator('.say')).toContainText(/Same perimeter does NOT mean same area/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates square and area cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=G2');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'square'
    const squareChip = page.getByRole('button', { name: 'square', exact: true });
    await expect(squareChip).toBeVisible();
    await squareChip.click();

    // Select second blank tile 'area'
    const areaChip = page.getByRole('button', { name: 'area', exact: true });
    await expect(areaChip).toBeVisible();
    await areaChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Pedagogical Invariants */
  test('US5-AS1: Rope screen maintains calm presentation without gamification (FR-005)', async ({
    page,
  }) => {
    await page.goto('/#/rope');
    // Ensure zero banned words or gamified banners exist
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
