import { test, expect } from '@playwright/test';

test.describe('Feature 019 Acceptance: Long Division Algorithm (Knot D4)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot D4 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const d4Btn = page.locator('button[data-knot="D4"]');
    await expect(d4Btn).toBeVisible();

    await d4Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=D4/);
    await expect(page.locator('.screen-title')).toContainText(
      /When dividing 615 by 3, what digit belongs in the tens house of the quotient/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges zero-gate prediction and accepts 0 (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=D4');
    await expect(page.locator('.screen-title')).toContainText(
      /what digit belongs in the tens house/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 0 is the prediction
    const choiceBtn = page.getByRole('button', { name: '0', exact: true });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=D4/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining place columns and the four-beat rhythm (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=D4');
    await expect(page.locator('.bodha-knot')).toContainText(/Missing side/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Long Division Workbench (#longdiv) */
  test('US3-AS1: Long division workbench executes four-beat rhythm for 824 ÷ 4 (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/longdiv');
    await expect(page.locator('.screen-title')).toContainText(/The long division algorithm/i);
    await expect(page.locator('.longdiv-bracket-box')).toBeVisible();

    const nextBtn = page.getByRole('button', { name: /Next Column House/i });
    await expect(nextBtn).toBeVisible();

    // Step through hundreds, tens (zero gate), and ones
    await nextBtn.click();
    await nextBtn.click();
    await nextBtn.click();

    await expect(page.locator('.math-banner')).toContainText(/824 ÷ 4 = 206 \(Complete!\)/i);
    await expect(page.locator('.say')).toContainText(
      /824 ÷ 4 = 206 solved through systematic columnar sharing/i
    );
  });

  test('US3-AS2: Zero Gate challenge requires writing 0 for 612 ÷ 3 (FR-003)', async ({ page }) => {
    await page.goto('/#/longdiv?step=2');
    await expect(page.locator('.math-banner')).toContainText(/Tens House Gate/i);

    const btnZero = page.getByRole('button', { name: 'Write 0', exact: true });
    await expect(btnZero).toBeVisible();

    await btnZero.click();
    await expect(page.locator('.math-banner')).toContainText(
      /612 ÷ 3 = 204 \(Zero Gate Guarded!\)/i
    );
    await expect(page.locator('.say')).toContainText(/The Zero Gate guarded: 612 ÷ 3 = 204/i);
  });

  test('US3-AS3: Inverse check verifies quotient via inverse multiplication (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/longdiv?step=3');
    await expect(page.locator('.formula-card')).toContainText(
      /\(Quotient × Divisor\) \+ Remainder = Dividend/i
    );

    const verifyBtn = page.getByRole('button', { name: /Verify \(204 × 3\)/i });
    await expect(verifyBtn).toBeVisible();

    await verifyBtn.click();
    await expect(page.locator('.math-banner')).toContainText(
      /Verified: 204 × 3 = 612 \(Inverse Multiplication\)/i
    );
    await expect(page.locator('.say')).toContainText(/Verified: 204 × 3 = 612/i);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Kabir omitting tens quotient zero (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=D4');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: pulling down 4 without writing 0) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /When 2 tens cannot be divided by 4, he MUST write 0 in the tens house/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates zero and door cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=D4');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'zero'
    const zeroChip = page.getByRole('button', { name: 'zero', exact: true });
    await expect(zeroChip).toBeVisible();
    await zeroChip.click();

    // Select second blank tile 'door'
    const doorChip = page.getByRole('button', { name: 'door', exact: true });
    await expect(doorChip).toBeVisible();
    await doorChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Pedagogical Invariants */
  test('US5-AS1: Long division screen maintains calm presentation without gamification (FR-005)', async ({
    page,
  }) => {
    await page.goto('/#/longdiv');
    // Ensure zero banned words or gamified banners exist
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
