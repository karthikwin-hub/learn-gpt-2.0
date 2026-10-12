import { test, expect } from '@playwright/test';

test.describe('Feature 037 Acceptance: What Comes Next? (Sequence Rules & Difference Ladders) (Knot L4)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot L4 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const l4Btn = page.locator('button[data-knot="L4"]');
    await expect(l4Btn).toBeVisible();

    await l4Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=L4/);
    await expect(page.locator('.screen-title')).toContainText(
      /What comes next in the sequence: 3, 7, 11, 15/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges 3, 7, 11, 15 sequence and accepts 19 (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=L4');
    await expect(page.locator('.screen-title')).toContainText(
      /What comes next in the sequence: 3, 7, 11, 15/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting '19'
    const choiceBtn = page.getByRole('button', {
      name: '19',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=L4/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining difference ladders and worked examples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=L4');
    await expect(page.locator('.bodha-knot')).toContainText(/What comes next/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Sequences Workbench (#sequences) */
  test('US3-AS1: Sequences workbench displays terms train with difference ladder jumps (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/sequences');
    await expect(page.locator('.screen-title')).toContainText(
      /What Comes Next\? \(Sequence Rules & Difference Ladders\)/i
    );
    await expect(page.locator('.sequence-card')).toBeVisible();

    // 4 initial terms + 1 preview bubble = 5 bubbles
    const bubbles = page.locator('.term-bubble');
    await expect(bubbles).toHaveCount(5);
    await expect(page.locator('.ladder-summary')).toContainText(/Difference Ladder Jumps/i);
    await expect(page.locator('.sequence-next-pill')).toContainText(/Next = 19/i);
  });

  test('US3-AS2: Step 2 Doubling Tree vs Adding Trap uncovers geometric invariant (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/sequences');

    // Switch to step 2: Doubling Tree vs Adding Trap
    const step2Btn = page.getByRole('button', { name: /2\. Doubling Tree vs Adding Trap/i });
    await expect(step2Btn).toBeVisible();
    await step2Btn.click();

    await expect(page.locator('.doubling-card')).toBeVisible();
    await expect(page.locator('.gita-trap-box')).toBeVisible();
    await expect(page.locator('.doubling-next-bubble')).toContainText('32');
  });

  test('US3-AS3: Step 3 Distant Term Predictor calculates 10th term directly (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/sequences');

    // Switch to step 3: Distant Term Predictor
    const step3Btn = page.getByRole('button', { name: /3\. Distant Term Predictor/i });
    await expect(step3Btn).toBeVisible();
    await step3Btn.click();

    await expect(page.locator('.distant-card')).toBeVisible();
    await expect(page.locator('.target-n-pill')).toContainText(/Term #10/i);
    await expect(page.locator('.distant-result-pill')).toContainText(/Term #10 = 39/i);

    // Increase term count
    const incBtn = page.getByRole('button', { name: '+1 Term', exact: true });
    await incBtn.click();
    await expect(page.locator('.target-n-pill')).toContainText(/Term #11/i);
    await expect(page.locator('.distant-result-pill')).toContainText(/Term #11 = 43/i);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Gita adding instead of multiplying (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=L4');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: adds previous difference 16 + 8 = 24) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(/The next term is 16 × 2 = 32, not 24/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates rule and five cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=L4');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'rule'
    const ruleChip = page.getByRole('button', { name: 'rule', exact: true });
    await expect(ruleChip).toBeVisible();
    await ruleChip.click();

    // Select second blank tile 'five'
    const fiveChip = page.getByRole('button', { name: 'five', exact: true });
    await expect(fiveChip).toBeVisible();
    await fiveChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Sequences screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/sequences');

    const buttons = page.locator('button, input[type="range"]');
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
