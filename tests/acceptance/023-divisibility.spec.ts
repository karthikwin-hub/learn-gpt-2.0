import { test, expect } from '@playwright/test';

test.describe('Feature 023 Acceptance: Divisibility Tests (Knot F3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot F3 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const f3Btn = page.locator('button[data-knot="F3"]');
    await expect(f3Btn).toBeVisible();

    await f3Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=F3/);
    await expect(page.locator('.screen-title')).toContainText(
      /Is 5,232 divisible by 3 without performing long division/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges divisibility prediction and accepts Yes (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=F3');
    await expect(page.locator('.screen-title')).toContainText(
      /Is 5,232 divisible by 3 without performing long division/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'Yes' is the correct prediction
    const choiceBtn = page.getByRole('button', { name: 'Yes', exact: true });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=F3/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining last-digit and digit-sum rules (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=F3');
    await expect(page.locator('.bodha-knot')).toContainText(/Divisibility tests/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Divisibility Workbench (#divisibility) */
  test('US3-AS1: Divisibility workbench Step 1 inspects units digit for 2, 5, 10 (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/divisibility');
    await expect(page.locator('.screen-title')).toContainText(/Divisibility test scanner/i);
    await expect(page.locator('.units-badge')).toContainText(/Units digit is 2/i);
    await expect(page.locator('.divisibility-verdict')).toContainText(
      /Passes! 5232 is divisible by 2/i
    );

    // Test 5 for 5232: fails
    const test5Btn = page.getByRole('button', { name: 'Test ÷ 5', exact: true });
    await test5Btn.click();
    await expect(page.locator('.divisibility-verdict')).toContainText(
      /Fails! 5232 is NOT divisible by 5/i
    );

    // Switch to 4125: passes 5
    const btn4125 = page.locator('.btn-select-number', { hasText: '4125' });
    await btn4125.click();
    await expect(page.locator('.divisibility-verdict')).toContainText(
      /Passes! 4125 is divisible by 5/i
    );
  });

  test('US3-AS2: Step 2 digit-sum beam expands 5232 and validates against 3 and 9 (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/divisibility?step=2');
    await expect(page.locator('.sum-expression-text')).toContainText(
      /Digit Sum: 5 \+ 2 \+ 3 \+ 2 = 12/i
    );
    await expect(page.locator('.t3-verdict')).toContainText(/YES \(divides by 3\)/i);
    await expect(page.locator('.t9-verdict')).toContainText(/NO \(remainder\)/i);
  });

  test('US3-AS3: Step 3 tests dual gates for 6, requiring both even and digit sum by 3 (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/divisibility?step=3');
    await expect(page.locator('.g2-state')).toContainText(/PASS/i);
    await expect(page.locator('.g3-state')).toContainText(/PASS/i);
    await expect(page.locator('.gate-6-banner')).toContainText(/Unlocked! 5232 is divisible by 6/i);

    // Switch to 27: fails Gate 2
    const btn27 = page.locator('.btn-select-number-step3', { hasText: '27' });
    await btn27.click();
    await expect(page.locator('.g2-state')).toContainText(/FAIL/i);
    await expect(page.locator('.g3-state')).toContainText(/PASS/i);
    await expect(page.locator('.gate-6-banner')).toContainText(
      /Blocked! 27 is NOT divisible by 6/i
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Mona applying last-digit rule to 3 (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=F3');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: concluded ending in 3 means divides by 3) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(/Ending in 3 is a trap/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates digits and sum cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=F3');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'digits'
    const digitsChip = page.getByRole('button', { name: 'digits', exact: true });
    await expect(digitsChip).toBeVisible();
    await digitsChip.click();

    // Select second blank tile 'sum'
    const sumChip = page.getByRole('button', { name: 'sum', exact: true });
    await expect(sumChip).toBeVisible();
    await sumChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Pedagogical Invariants */
  test('US5-AS1: Divisibility screen maintains calm presentation without gamification (FR-005)', async ({
    page,
  }) => {
    await page.goto('/#/divisibility');
    // Ensure zero banned words or gamified banners exist
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
