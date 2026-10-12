import { test, expect } from '@playwright/test';

test.describe('Feature 015 Acceptance: Tenths and Hundredths (Knot N5)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot N5 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const n5Btn = page.locator('button[data-knot="N5"]');
    await expect(n5Btn).toBeVisible();

    await n5Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=N5/);
    await expect(page.locator('.screen-title')).toContainText(
      /Which is longer: 0\.4 cm or 0\.09 cm/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges length misconception and accepts 0.4 cm (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=N5');
    await expect(page.locator('.screen-title')).toContainText(/0\.4 cm or 0\.09 cm/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 0.4 cm is the prediction
    const choiceBtn = page.getByRole('button', { name: /0\.4 cm/i });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=N5/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining decimal place value (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=N5');
    await expect(page.locator('.bodha-knot')).toContainText(/Tenths and hundredths/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Decimals Workbench (#decimals) */
  test('US3-AS1: Decimals screen renders 10x10 hundred-grid and shades tenths and hundredths (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/decimals');
    await expect(page.locator('.screen-title')).toContainText(/Tenths and hundredths/i);
    await expect(page.locator('.model-card svg')).toBeVisible();

    const addTenthBtn = page.getByRole('button', { name: '+0.1' });
    const addHundredthBtn = page.getByRole('button', { name: '+0.01' });

    // Click +0.1 three times
    await addTenthBtn.click();
    await addTenthBtn.click();
    await addTenthBtn.click();

    // Click +0.01 four times
    await addHundredthBtn.click();
    await addHundredthBtn.click();
    await addHundredthBtn.click();
    await addHundredthBtn.click();

    await expect(page.locator('.equation-card')).toContainText(
      /0\.34 = 34\/100 = 3 tenths \+ 4 hundredths/i
    );
  });

  test('US3-AS2: Side-by-side comparison confirms 0.5 > 0.15 (FR-003)', async ({ page }) => {
    await page.goto('/#/decimals?step=2');
    await expect(page.locator('.model-card svg')).toHaveCount(2);

    await expect(page.locator('.equation-card')).toContainText(/0\.5 > 0\.15/i);
    await expect(page.locator('.say')).toContainText(
      /5 tenths is 50 hundredths; 50 is more than 15: 0\.5 > 0\.15/i
    );
  });

  test('US3-AS3: Trailing zero conservation proves 0.5 = 0.50 (FR-003)', async ({ page }) => {
    await page.goto('/#/decimals?step=3');
    await expect(page.locator('.equation-card')).toContainText(/0\.5 = 5\/10 = 50\/100/i);

    const toggleBtn = page.getByRole('button', { name: /Add trailing zero \(0\.50\)/i });
    await toggleBtn.click();

    await expect(page.locator('.equation-card')).toContainText(/0\.50 = 5\/10 = 50\/100/i);
    await expect(page.locator('.say')).toContainText(
      /5 tenths and 50 hundredths cover the exact same space: 0\.5 = 0\.50/i
    );
    await expect(page.getByRole('button', { name: /Spot the mistake/i })).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Priya comparing digits instead of place value (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=N5');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(4);

    // Step 2 (0-indexed 1: Look at the numbers after the dot: 7 and 15) is the error
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /0\.7 has 7 tenths \(70 hundredths\), while 0\.15 has only 1 tenth/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates tenths and place cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=N5');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'tenths'
    const tenthsChip = page.getByRole('button', { name: 'tenths', exact: true });
    await expect(tenthsChip).toBeVisible();
    await tenthsChip.click();

    // Select second blank tile 'place'
    const placeChip = page.getByRole('button', { name: 'place', exact: true });
    await expect(placeChip).toBeVisible();
    await placeChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });
});
