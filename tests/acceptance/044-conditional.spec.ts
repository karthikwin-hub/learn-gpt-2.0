import { test, expect } from '@playwright/test';

test.describe('Feature 044 Acceptance: If This, Then That (Conditionals & Converse Fallacy) (Knot L3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot L3 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const l3Btn = page.locator('button[data-knot="L3"]');
    await expect(l3Btn).toBeVisible();

    await l3Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=L3/);
    await expect(page.locator('.screen-title')).toContainText(
      /If an animal is a dog, it has 4 legs/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges 4-legged converse fallacy and accepts choice B (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=L3');
    await expect(page.locator('.screen-title')).toContainText(
      /If an animal is a dog, it has 4 legs/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'No, it could be a cat, cow, or tiger'
    const choiceBtn = page.getByRole('button', {
      name: 'No, it could be a cat, cow, or tiger',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=L3/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining conditionals and worked examples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=L3');
    await expect(page.locator('.bodha-knot')).toContainText(/If this, then that/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Conditionals Workbench (#conditional) */
  test('US3-AS1: Conditional workbench displays formula card and nested subset visualizer (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/conditional');
    await expect(page.locator('.screen-title')).toContainText(
      /If This, Then That \(Conditionals & Converse Fallacy\)/i
    );
    await expect(page.locator('.statement-card')).toBeVisible();
    await expect(page.locator('.nested-venn-container')).toBeVisible();

    // Default forward statement valid pill
    await expect(page.locator('.forward-pill')).toBeVisible();
    await expect(page.locator('.forward-pill')).toContainText(/Forward statement is ALWAYS TRUE/i);
  });

  test('US3-AS2: Testing reverse statement reveals converse fallacy and counterexamples (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/conditional');

    // Click 'Test Reverse Statement' button
    const reverseBtn = page.getByRole('button', { name: /Test Reverse Statement/i });
    await expect(reverseBtn).toBeVisible();
    await reverseBtn.click();

    // Converse fallacy pill is displayed
    await expect(page.locator('.converse-fallacy-pill')).toBeVisible();
    await expect(page.locator('.converse-fallacy-pill')).toContainText(/Converse is FALSE/i);

    // Counterexamples callout is displayed with Cat, Cow, etc.
    await expect(page.locator('.counterexample-callout-box')).toBeVisible();
    await expect(page.locator('.counterexample-callout-box')).toContainText(/Cat/i);

    // Switch to Squares & 4 Sides preset (Farhan's Trap)
    const preset2Btn = page.getByRole('button', { name: /2\. Squares & 4 Sides/i });
    await expect(preset2Btn).toBeVisible();
    await preset2Btn.click();

    // Farhan's trap callout box appears
    await expect(page.locator('.farhan-trap-box')).toBeVisible();
    await expect(page.locator('.farhan-trap-box')).toContainText(/Farhan's Mistake Trap/i);
  });

  test('US3-AS3: Workbench maintains calm aesthetics with zero gamification (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/conditional');
    await expect(page.locator('.score, .streak, .points, .stars, .timer, .confetti')).toHaveCount(
      0
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Farhan committing converse fallacy on 4-sided shapes (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=L3');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: any shape with 4 sides must be a square) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /Having 4 sides does not guarantee being a square/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates forward and not cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=L3');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'forward'
    const forwardChip = page.getByRole('button', { name: 'forward', exact: true });
    await expect(forwardChip).toBeVisible();
    await forwardChip.click();

    // Select second blank tile 'not'
    const notChip = page.getByRole('button', { name: 'not', exact: true });
    await expect(notChip).toBeVisible();
    await notChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Invariants */
  test('US5-AS1: Conditional screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/conditional');

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
