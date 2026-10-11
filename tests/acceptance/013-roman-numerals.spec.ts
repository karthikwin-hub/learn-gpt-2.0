import { test, expect } from '@playwright/test';

test.describe('Feature 013 Acceptance: Roman Numerals (Knot N2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot N2 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const n2Btn = page.locator('button[data-knot="N2"]');
    await expect(n2Btn).toBeVisible();

    // Verify it is NOT disabled or marked as not in prototype
    await n2Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=N2/);
    await expect(page.locator('.screen-title')).toContainText(/Roman numerals/i);
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges the IIII misconception and accepts IV (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=N2');
    await expect(page.locator('.screen-title')).toContainText(/How do you write the number 4/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Choosing IV is correct prediction
    const ivChoice = page.getByRole('button', { name: 'IV' });
    await ivChoice.click();
    await expect(ivChoice).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=N2/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining additive and subtractive rules (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=N2');
    await expect(page.locator('.bodha-knot')).toContainText(/Roman numerals/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    // Verify presence of next card button and advance
    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Slate Workbench (#roman) */
  test('US3-AS1: Roman screen #roman renders stone slate and symbol tiles (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/roman');
    await expect(page.locator('.screen-title')).toContainText(/Roman numerals/i);
    await expect(page.locator('.model-card svg')).toBeVisible();

    // Symbol tiles exist
    await expect(page.getByRole('button', { name: 'I', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'V', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'X', exact: true })).toBeVisible();
  });

  test('US3-AS2: Building target numbers updates the slate and advances (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/roman');

    // Advance from explore step to build step
    const buildStepBtn = page.getByRole('button', { name: /Build numbers/i });
    await buildStepBtn.click();

    await expect(page.locator('.guide-text')).toContainText(/Build 14/i);

    // Build 14 = X + I + V
    await page.getByRole('button', { name: 'X', exact: true }).click();
    await page.getByRole('button', { name: 'I', exact: true }).click();
    await page.getByRole('button', { name: 'V', exact: true }).click();

    await expect(page.locator('.say')).toContainText(/assembled 14/i);
  });

  test('US3-AS3: Subtractive challenge rejects XXXX and accepts XL for 40 (FR-003)', async ({
    page,
  }) => {
    // Jump straight to step 3 on roman screen
    await page.goto('/#/roman?step=3');

    // Answering XXXX provides 3-repetition rule guidance
    const xxxxBtn = page.getByRole('button', { name: 'XXXX' });
    await xxxxBtn.click();
    await expect(page.locator('.say')).toContainText(
      /no symbol may be repeated more than three times/i
    );

    // Answering XL is accepted
    const xlBtn = page.getByRole('button', { name: 'XL' });
    await xlBtn.click();
    await expect(page.locator('.say')).toContainText(/No symbol repeats four times/i);
    await expect(page.getByRole('button', { name: /Spot the mistake/i })).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies that V cannot be subtracted (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=N2');
    await expect(page.locator('.work-steps')).toBeVisible();

    // Click step 3 (0-indexed 2: Aman writing VL)
    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(4);
    await stepBtns.nth(2).click();

    // Found error unlocks Explain button
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates subtracts and three word tiles (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=N2');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'subtracts'
    const subtractsChip = page.getByRole('button', { name: 'subtracts', exact: true });
    await expect(subtractsChip).toBeVisible();
    await subtractsChip.click();

    // Select second blank tile 'three'
    const threeChip = page.getByRole('button', { name: 'three', exact: true });
    await expect(threeChip).toBeVisible();
    await threeChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });
});
