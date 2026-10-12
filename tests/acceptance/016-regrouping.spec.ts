import { test, expect } from '@playwright/test';

test.describe('Feature 016 Acceptance: Regrouping & Big Sums (Knot A1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot A1 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const a1Btn = page.locator('button[data-knot="A1"]');
    await expect(a1Btn).toBeVisible();

    await a1Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=A1/);
    await expect(page.locator('.screen-title')).toContainText(
      /To solve 500 - 247, what must you do first/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges borrowing across zeroes and accepts exchange (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=A1');
    await expect(page.locator('.screen-title')).toContainText(/500 - 247/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting exchange 1 hundred for 10 tens is the prediction
    const choiceBtn = page.getByRole('button', { name: /Exchange 1 hundred for 10 tens/i });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=A1/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining columnar regrouping (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=A1');
    await expect(page.locator('.bodha-knot')).toContainText(/Big sums/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Regroup Workbench (#regroup) */
  test('US3-AS1: Regroup screen unbundles 500 into 400 + 90 + 10 (FR-003)', async ({ page }) => {
    await page.goto('/#/regroup');
    await expect(page.locator('.screen-title')).toContainText(/Big sums & regrouping/i);
    await expect(page.locator('.model-card svg')).toBeVisible();

    const unbundleHundredBtn = page.getByRole('button', { name: /Unbundle 1 hundred/i });
    const unbundleTenBtn = page.getByRole('button', { name: /Unbundle 1 ten/i });

    // Unbundle 1 hundred -> 10 tens
    await unbundleHundredBtn.click();
    // Unbundle 1 ten -> 10 ones
    await unbundleTenBtn.click();

    await expect(page.locator('.equation-card')).toContainText(/400 \+ 90 \+ 10 = 500/i);
    await expect(page.locator('.say')).toContainText(/The value is conserved/i);
  });

  test('US3-AS2: Step-by-step subtraction confirms 500 - 247 = 253 (FR-003)', async ({ page }) => {
    await page.goto('/#/regroup?step=2');
    await expect(page.locator('.equation-card')).toContainText(/500 - 247 = 253/i);
    await expect(page.locator('.say')).toContainText(/500 - 247 = 253/i);
  });

  test('US3-AS3: Columnar addition bundles columns to 1134 (FR-003)', async ({ page }) => {
    await page.goto('/#/regroup?step=3');
    await expect(page.locator('.equation-card')).toContainText(/678 \+ 456 = 1134/i);
    await expect(page.locator('.say')).toContainText(/678 \+ 456 = 1134/i);
    await expect(page.getByRole('button', { name: /Spot the mistake/i })).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Dev inverting subtraction (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=A1');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(4);

    // Step 2 (0-indexed 1: subtract 4 from 8) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /You cannot flip subtraction when the top digit is smaller/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates unbundle and ten cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=A1');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'unbundle'
    const unbundleChip = page.getByRole('button', { name: 'unbundle', exact: true });
    await expect(unbundleChip).toBeVisible();
    await unbundleChip.click();

    // Select second blank tile 'ten'
    const tenChip = page.getByRole('button', { name: 'ten', exact: true });
    await expect(tenChip).toBeVisible();
    await tenChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });
});
