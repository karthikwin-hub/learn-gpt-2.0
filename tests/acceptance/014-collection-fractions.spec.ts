import { test, expect } from '@playwright/test';

test.describe('Feature 014 Acceptance: Fractions of a Collection (Knot N4)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot N4 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const n4Btn = page.locator('button[data-knot="N4"]');
    await expect(n4Btn).toBeVisible();

    await n4Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=N4/);
    await expect(page.locator('.screen-title')).toContainText(/1\/3 of a basket of 12 apples/i);
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges fraction prediction and accepts 4 apples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=N4');
    await expect(page.locator('.screen-title')).toContainText(/How many apples is 1\/3/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Choosing 4 apples is the prediction
    const choice4 = page.getByRole('button', { name: '4 apples' });
    await choice4.click();
    await expect(choice4).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=N4/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining collections and like fractions (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=N4');
    await expect(page.locator('.bodha-knot')).toContainText(
      /Parts of a group|Fractions of a collection/i
    );
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Workbench (#collection) */
  test('US3-AS1: Collection screen renders token tray and partitions into 4 rings (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/collection');
    await expect(page.locator('.screen-title')).toContainText(/Fractions of a collection/i);
    await expect(page.locator('.model-card svg')).toBeVisible();

    // Select 4 rings
    const ring4Btn = page.getByRole('button', { name: '4 rings' });
    await expect(ring4Btn).toBeVisible();
    await ring4Btn.click();

    await expect(page.locator('.equation-card')).toContainText(/12 ÷ 4 = 3/i);
    await expect(page.locator('.equation-card')).toContainText(/1\/4 of 12/i);
  });

  test('US3-AS2: Selecting 3 rings in step 2 updates fraction of amount readout (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/collection?step=2');
    await expect(page.locator('.model-card svg')).toBeVisible();

    const ringGroups = page.locator('.model-card svg .ring-group');
    await expect(ringGroups).toHaveCount(4);

    // Tap 3 rings
    await ringGroups.nth(0).click();
    await ringGroups.nth(1).click();
    await ringGroups.nth(2).click();

    await expect(page.locator('.equation-card')).toContainText(/3\/4 of 16/i);
    await expect(page.locator('.equation-card')).toContainText(/12/i);
    await expect(page.locator('.say')).toContainText(
      /3 out of 4 equal baskets taken: 12 tokens in all/i
    );
  });

  test('US3-AS3: Like-fraction addition rejects denominator sum and accepts 3/5 (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/collection?step=3');
    await expect(page.locator('.equation-card')).toContainText(/1\/5 \+ 2\/5 = 3\/5/i);

    // 3/10 explains why denominator does not change
    const optWrong = page.getByRole('button', { name: '3/10' });
    await optWrong.click();
    await expect(page.locator('.say')).toContainText(/10 would mean cutting into 10 baskets/i);

    // 3/5 accepts and shows completion
    const optCorrect = page.getByRole('button', { name: '3/5' });
    await optCorrect.click();
    await expect(page.locator('.say')).toContainText(
      /The baskets are still fifths: 1\/5 \+ 2\/5 = 3\/5/i
    );
    await expect(page.getByRole('button', { name: /Spot the mistake/i })).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Rahul adding denominators (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=N4');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(4);

    // Step 3 (0-indexed 2: 5 + 5 = 10) is the error
    await stepBtns.nth(2).click();
    await expect(page.locator('.say')).toContainText(/The parts are fifths/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates cloze synthesis (FR-004)', async ({ page }) => {
    await page.goto('/#/explain?knot=N4');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'stays'
    const staysChip = page.getByRole('button', { name: 'stays', exact: true });
    await expect(staysChip).toBeVisible();
    await staysChip.click();

    // Select second blank tile 'add'
    const addChip = page.getByRole('button', { name: 'add', exact: true });
    await expect(addChip).toBeVisible();
    await addChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });
});
