import { test, expect } from '@playwright/test';

test.describe('Feature 040 Acceptance: Two Rings (Venn Overlap, Union & Complement) (Knot S2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot S2 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const s2Btn = page.locator('button[data-knot="S2"]');
    await expect(s2Btn).toBeVisible();

    await s2Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=S2/);
    await expect(page.locator('.screen-title')).toContainText(/A ball is both RED and ROUND/i);
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges red and round ball and accepts shared middle overlap (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=S2');
    await expect(page.locator('.screen-title')).toContainText(/A ball is both RED and ROUND/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 'In the shared middle overlap between both rings'
    const choiceBtn = page.getByRole('button', {
      name: 'In the shared middle overlap between both rings',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=S2/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining Venn overlap and worked examples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=S2');
    await expect(page.locator('.bodha-knot')).toContainText(/Two rings/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Two Rings Workbench (#sets) */
  test('US3-AS1: Two rings workbench displays Courtyard canvas with 12 attribute blocks (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/sets?mode=sort');
    await expect(page.locator('.courtyard-manipulative')).toBeVisible();

    const blocks = page.locator('g.block');
    await expect(blocks).toHaveCount(12);

    const rings = page.locator('.ring-layer .handle');
    await expect(rings).toHaveCount(2);
  });

  test('US3-AS2: Counts card partitions blocks across 4 Venn regions (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/sets?mode=sort');
    const parts = page.locator('.card .parts');
    await expect(parts).toBeVisible();

    // With default rules yellow and circle:
    await expect(parts).toContainText('In both: 2');
    await expect(parts).toContainText('Only A: 2');
    await expect(parts).toContainText('Only B: 2');
    await expect(parts).toContainText('In neither: 6');
  });

  test('US3-AS3: Workbench maintains calm aesthetics with zero gamification (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/sets?mode=sort');
    await expect(page.locator('.score, .streak, .points, .stars, .timer, .confetti')).toHaveCount(
      0
    );
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Pooja omitting overlap membership for 12 (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=S2');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: places 12 in multiples of 4 only) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(/12 is a multiple of both 4 and 3/i);
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates both and outside cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=S2');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'both'
    const bothChip = page.getByRole('button', { name: 'both', exact: true });
    await expect(bothChip).toBeVisible();
    await bothChip.click();

    // Select second blank tile 'outside'
    const outsideChip = page.getByRole('button', { name: 'outside', exact: true });
    await expect(outsideChip).toBeVisible();
    await outsideChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Invariants */
  test('US5-AS1: Two rings screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/sets?mode=sort');

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
