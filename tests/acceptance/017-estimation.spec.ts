import { test, expect } from '@playwright/test';

test.describe('Feature 017 Acceptance: Estimate First & Benchmarks (Knot A2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot A2 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const a2Btn = page.locator('button[data-knot="A2"]');
    await expect(a2Btn).toBeVisible();

    await a2Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=A2/);
    await expect(page.locator('.screen-title')).toContainText(
      /Buying 48 notebooks at ₹98 each costs approximately how much/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges magnitude prediction and accepts About ₹5,000 (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=A2');
    await expect(page.locator('.screen-title')).toContainText(/costs approximately how much/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting About ₹5,000 is the prediction
    const choiceBtn = page.getByRole('button', { name: /About ₹5,000/i });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=A2/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining friendly rounding and estimation (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=A2');
    await expect(page.locator('.bodha-knot')).toContainText(/Estimate first/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Estimation Workbench (#estimate) */
  test('US3-AS1: Estimate screen snaps 48 to 50 and 392 to 400 (FR-003)', async ({ page }) => {
    await page.goto('/#/estimate');
    await expect(page.locator('.screen-title')).toContainText(/Estimate first & benchmarks/i);
    await expect(page.locator('.model-card svg')).toBeVisible();

    const snap48Btn = page.getByRole('button', { name: /Snap 48/i });
    const snap392Btn = page.getByRole('button', { name: /Snap 392/i });

    await snap48Btn.click();
    await snap392Btn.click();

    await expect(page.locator('.equation-card')).toContainText(
      /48 → 50 \(nearest 10\) · 392 → 400 \(nearest 100\)/i
    );
    await expect(page.locator('.say')).toContainText(/48 snaps to 50, and 392 snaps to 400/i);
  });

  test('US3-AS2: Safe Zone guardrail displays range for 29 × 41 (FR-003)', async ({ page }) => {
    await page.goto('/#/estimate?step=2');
    await expect(page.locator('.equation-card')).toContainText(/29 × 41 ≈ 30 × 40 = 1200/i);
    await expect(page.locator('.say')).toContainText(/Safe zone: 30 × 40 = 1200/i);
  });

  test('US3-AS3: Wild error radar detects 8190 as outside safe zone (FR-003)', async ({ page }) => {
    await page.goto('/#/estimate?step=3');
    await expect(page.locator('.equation-card')).toContainText(
      /21 × 39 \(Estimate: 20 × 40 = 800\)/i
    );

    const wildBtn = page.getByRole('button', { name: '8190' });
    await wildBtn.click();
    await expect(page.locator('.say')).toContainText(
      /8190 is a wild error: it is outside the safe zone for 20 × 40 = 800/i
    );

    const safeBtn = page.getByRole('button', { name: '819', exact: true });
    await safeBtn.click();
    await expect(page.locator('.say')).toContainText(/819 is in the safe zone around 800/i);
    await expect(page.getByRole('button', { name: /Spot the mistake/i })).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Meera accepting wild error without check (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=A2');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(4);

    // Step 4 (0-indexed 3: accepting 8190 without checking against estimate) is the mistake
    await stepBtns.nth(3).click();
    await expect(page.locator('.say')).toContainText(
      /An answer of 8190 is more than 10 times larger than the estimate of 800/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates estimate and before cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=A2');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'estimate'
    const estimateChip = page.getByRole('button', { name: 'estimate', exact: true });
    await expect(estimateChip).toBeVisible();
    await estimateChip.click();

    // Select second blank tile 'before'
    const beforeChip = page.getByRole('button', { name: 'before', exact: true });
    await expect(beforeChip).toBeVisible();
    await beforeChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });
});
