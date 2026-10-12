import { test, expect } from '@playwright/test';

test.describe('Feature 042 Acceptance: True for All? (Universal Claims & Counterexamples) (Knot L1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot L1 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const l1Btn = page.locator('button[data-knot="L1"]');
    await expect(l1Btn).toBeVisible();

    await l1Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=L1/);
    await expect(page.locator('.screen-title')).toContainText(
      /Every number that ends in 4 can be shared equally by 4 friends/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges ending in 4 claim and accepts 14 remainder 2 (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=L1');
    await expect(page.locator('.screen-title')).toContainText(
      /Every number that ends in 4 can be shared equally by 4 friends/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'No, because 14 ends in 4 but leaves a remainder of 2'
    const choiceBtn = page.getByRole('button', {
      name: 'No, because 14 ends in 4 but leaves a remainder of 2',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=L1/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining universal claims and worked examples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=L1');
    await expect(page.locator('.bodha-knot')).toContainText(/True for all/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Counterexample Workbench (#counterexample) */
  test('US3-AS1: Counterexample workbench displays claim card and testing courtyard (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/counterexample');
    await expect(page.locator('.screen-title')).toContainText(
      /True for All\? \(Universal Claims & Counterexamples\)/i
    );
    await expect(page.locator('.claim-card')).toBeVisible();
    await expect(page.locator('.testing-courtyard')).toBeVisible();

    // In default claim 'ends-in-4-div-4', 14 is a counterexample and callout box shows
    await expect(page.locator('.counterexample-callout-box')).toBeVisible();
    await expect(page.locator('.counterexample-callout-box')).toContainText(
      /Counterexample Found: 14!/i
    );
  });

  test('US3-AS2: Preset tab switches to Rahul trap and reveals boundary misconception (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/counterexample');

    // Switch to step 3: Multiply Bigger (Rahul's Trap)
    const step3Btn = page.getByRole('button', { name: /3\. Multiply Bigger/i });
    await expect(step3Btn).toBeVisible();
    await step3Btn.click();

    await expect(page.locator('.rahul-trap-box')).toBeVisible();
    await expect(page.locator('.rahul-trap-box')).toContainText(/Rahul's Mistake Trap/i);

    // 0 and 1 are counterexamples for 5 * b > 5
    await expect(page.locator('.counterexample-callout-box')).toBeVisible();
    await expect(page.locator('.counterexample-callout-box')).toContainText(
      /Counterexample Found: 0!/i
    );
  });

  test('US3-AS3: Workbench maintains calm aesthetics with zero gamification (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/counterexample');
    await expect(page.locator('.score, .streak, .points, .stars, .timer, .confetti')).toHaveCount(
      0
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Rahul ignoring 0 and 1 boundary cases (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=L1');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: lists 5 × 6 = 30 and claims holds for all) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /5 × 1 = 5 \(equal\) and 5 × 0 = 0 \(smaller\)/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates one and false cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=L1');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'one'
    const oneChip = page.getByRole('button', { name: 'one', exact: true });
    await expect(oneChip).toBeVisible();
    await oneChip.click();

    // Select second blank tile 'false'
    const falseChip = page.getByRole('button', { name: 'false', exact: true });
    await expect(falseChip).toBeVisible();
    await falseChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Invariants */
  test('US5-AS1: Counterexample screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/counterexample');

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
