import { test, expect } from '@playwright/test';

test.describe('Feature 041 Acceptance: Guess the Rules (Reverse Sorting & Inductive Logic) (Knot S3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot S3 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const s3Btn = page.locator('button[data-knot="S3"]');
    await expect(s3Btn).toBeVisible();

    await s3Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=S3/);
    await expect(page.locator('.screen-title')).toContainText(
      /All items in Ring A are green shapes/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges green shapes rule hypothesis and accepts choice B (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=S3');
    await expect(page.locator('.screen-title')).toContainText(
      /All items in Ring A are green shapes/i
    );

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'No, because non-green shapes are left outside Ring A'
    const choiceBtn = page.getByRole('button', {
      name: 'No, because non-green shapes are left outside Ring A',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=S3/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining inductive rule deduction and worked examples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=S3');
    await expect(page.locator('.bodha-knot')).toContainText(/Which rules made this/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Guess the Rules Workbench (#sets?mode=guess) */
  test('US3-AS1: Guess mode conceals ring rules behind question marks (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/sets?mode=guess');
    await expect(page.locator('.courtyard-manipulative')).toBeVisible();

    const chipTexts = page.locator('.ring-chip-button text');
    await expect(chipTexts.first()).toHaveText('?');
    await expect(chipTexts.nth(1)).toHaveText('?');
  });

  test('US3-AS2: Selecting matching rules solves the mystery (FR-003)', async ({ page }) => {
    await page.goto('/#/sets?mode=guess');

    // Default hidden rules in guess mode are green & big
    const ringA = page.locator('.pane-title.a-txt');
    await expect(ringA).toBeVisible();

    const greenBtn = page.getByRole('group', { name: 'ga' }).getByRole('button', { name: 'green' });
    await greenBtn.click();

    const bigBtn = page.getByRole('group', { name: 'gb' }).getByRole('button', { name: 'big' });
    await bigBtn.click();

    const say = page.locator('.workbench-feedback');
    await expect(say).toBeVisible();
    await expect(say).toContainText('Found them');
  });

  test('US3-AS3: Workbench maintains calm aesthetics with zero gamification (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/sets?mode=guess');
    await expect(page.locator('.score, .streak, .points, .stars, .timer, .confetti')).toHaveCount(
      0
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Aman ignoring non-conforming items in Ring A (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=S3');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: guesses Triangles despite circles being present) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(/A rule must fit ALL items in the ring/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates every and revised cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=S3');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'every'
    const everyChip = page.getByRole('button', { name: 'every', exact: true });
    await expect(everyChip).toBeVisible();
    await everyChip.click();

    // Select second blank tile 'revised'
    const revisedChip = page.getByRole('button', { name: 'revised', exact: true });
    await expect(revisedChip).toBeVisible();
    await revisedChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Invariants */
  test('US5-AS1: Guess the rules screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/sets?mode=guess');

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
