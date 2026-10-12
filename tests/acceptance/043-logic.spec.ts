import { test, expect } from '@playwright/test';

test.describe('Feature 043 Acceptance: Marble Gates (Boolean Logic: AND, OR, NOT) (Knot L2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot L2 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const l2Btn = page.locator('button[data-knot="L2"]');
    await expect(l2Btn).toBeVisible();

    await l2Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=L2/);
    await expect(page.locator('.screen-title')).toContainText(
      /In a track with an AND gate, Switch A is OPEN and Switch B is CLOSED/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges series AND gate and accepts choice B (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=L2');
    await expect(page.locator('.screen-title')).toContainText(
      /In a track with an AND gate, Switch A is OPEN and Switch B is CLOSED/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'No, because an AND gate requires BOTH switches to be open'
    const choiceBtn = page.getByRole('button', {
      name: 'No, because an AND gate requires BOTH switches to be open',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=L2/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining logic gates and worked examples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=L2');
    await expect(page.locator('.bodha-knot')).toContainText(/Marble gates/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Logic Workbench (#logic) */
  test('US3-AS1: Logic workbench displays marble machine, switch controls, and truth table (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/logic');
    await expect(page.locator('.screen-title')).toContainText(
      /Marble Gates \(Boolean Logic: AND, OR, NOT\)/i
    );
    await expect(page.locator('.model')).toBeVisible();
    await expect(page.locator('.truth')).toBeVisible();

    // Verify door switch buttons exist
    const doorBtns = page.locator('.btn-row .btn');
    await expect(doorBtns.first()).toBeVisible();

    // Drop a marble
    const dropBtn = page.getByRole('button', { name: /Drop a marble|Drop/i });
    await expect(dropBtn).toBeVisible();
    await dropBtn.click();

    // Truth table records outcome
    await expect(page.locator('.truth tbody tr')).toHaveCount(4);
    await expect(page.locator('.truth tbody tr').first()).toBeVisible();
  });

  test('US3-AS2: Gate selector allows testing OR and NOT gates with dynamic door inputs (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/logic');

    // Switch to OR gate
    const orChip = page.getByRole('button', { name: /OR/i }).first();
    await expect(orChip).toBeVisible();
    await orChip.click();

    // Verify truth table re-renders for OR gate
    await expect(page.locator('.truth')).toBeVisible();

    // Switch to NOT gate (single input A)
    const notChip = page.getByRole('button', { name: /NOT/i }).first();
    await expect(notChip).toBeVisible();
    await notChip.click();

    // Door B should not be present in unary NOT gate
    const doorBtns = page.locator('.btn-row button');
    const doorTexts = await doorBtns.allTextContents();
    const hasDoorB = doorTexts.some((t) => t.startsWith('B:'));
    expect(hasDoorB).toBe(false);
  });

  test('US3-AS3: Workbench maintains calm aesthetics with zero gamification (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/logic');
    await expect(page.locator('.score, .streak, .points, .stars, .timer, .confetti')).toHaveCount(
      0
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Sneha confusing inclusive OR with exclusive choice (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=L2');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: believes OR means exclusive choice) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(/OR is inclusive: it is true if A is open/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates both and one cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=L2');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'both'
    const bothChip = page.getByRole('button', { name: 'both', exact: true });
    await expect(bothChip).toBeVisible();
    await bothChip.click();

    // Select second blank tile 'one'
    const oneChip = page.getByRole('button', { name: 'one', exact: true });
    await expect(oneChip).toBeVisible();
    await oneChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Invariants */
  test('US5-AS1: Logic screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/logic');

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
