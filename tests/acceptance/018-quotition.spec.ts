import { test, expect } from '@playwright/test';

test.describe('Feature 018 Acceptance: Division as Repeated Subtraction (Knot D2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot D2 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const d2Btn = page.locator('button[data-knot="D2"]');
    await expect(d2Btn).toBeVisible();

    await d2Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=D2/);
    await expect(page.locator('.screen-title')).toContainText(
      /If 20 laddoos are packed into boxes of 4, how many boxes can be packed/i
    );
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges grouping prediction and accepts 5 boxes (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=D2');
    await expect(page.locator('.screen-title')).toContainText(/how many boxes can be packed/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting 5 boxes is the prediction
    const choiceBtn = page.getByRole('button', { name: /5 boxes/i });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=D2/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining quotitive grouping and backward hops (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=D2');
    await expect(page.locator('.bodha-knot')).toContainText(/How many groups/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Quotition Workbench (#quotition) */
  test('US3-AS1: Quotition screen packs 20 into 5 boxes of 4 via backward hops (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/quotition');
    await expect(page.locator('.screen-title')).toContainText(/Repeated subtraction & grouping/i);
    await expect(page.locator('.card svg')).toBeVisible();

    const hopBtn = page.getByRole('button', { name: /Take group of 4/i });
    await expect(hopBtn).toBeVisible();

    // Take 5 hops
    for (let i = 0; i < 5; i++) {
      await hopBtn.click();
    }

    await expect(page.locator('.math-banner')).toContainText(
      /20 ÷ 4 = 5 \(5 boxes packed, 0 left\)/i
    );
    await expect(page.locator('.say')).toContainText(/Packed 5 boxes of 4: 20 ÷ 4 = 5/i);
    await expect(page.locator('.packed-box')).toHaveCount(5);
  });

  test('US3-AS2: Quotition screen stops at remainder 2 for 22 divided by 5 (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/quotition?step=2');
    await expect(page.locator('.math-banner')).toContainText(/Total: 22/i);

    const hopBtn = page.getByRole('button', { name: /Take group of 5/i });
    await expect(hopBtn).toBeVisible();

    // Take 4 hops
    for (let i = 0; i < 4; i++) {
      await hopBtn.click();
    }

    await expect(page.locator('.math-banner')).toContainText(
      /22 ÷ 5 = 4 R 2 \(4 boxes packed, 2 remainder\)/i
    );
    await expect(page.locator('.remainder-tray')).toContainText(/Remainder Tray \(2 left over\)/i);
    await expect(page.locator('.packed-box')).toHaveCount(4);
  });

  test('US3-AS3: Duality visualizer toggles between sharing and grouping (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/quotition?step=3');
    await expect(page.locator('.math-banner')).toContainText(
      /Quotitive \(Grouping\): 20 ÷ 4 = 5 boxes packed/i
    );
    await expect(page.locator('.box-item')).toHaveCount(5);

    const toggleBtn = page.getByRole('button', { name: /Switch to Sharing Mode/i });
    await toggleBtn.click();

    await expect(page.locator('.math-banner')).toContainText(
      /Partitive \(Sharing\): 20 ÷ 4 = 5 on each plate/i
    );
    await expect(page.locator('.plate-item')).toHaveCount(4);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Sita stopping after single subtraction (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=D2');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 3 (0-indexed 2: stopping and writing answer is 12) is the mistake
    await stepBtns.nth(2).click();
    await expect(page.locator('.say')).toContainText(
      /Division is repeated subtraction until zero or leftover/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates groups and subtracting cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=D2');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'groups'
    const groupsChip = page.getByRole('button', { name: 'groups', exact: true });
    await expect(groupsChip).toBeVisible();
    await groupsChip.click();

    // Select second blank tile 'subtracting'
    const subChip = page.getByRole('button', { name: 'subtracting', exact: true });
    await expect(subChip).toBeVisible();
    await subChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Pedagogical Invariants */
  test('US5-AS1: Quotition screen maintains calm presentation without gamification (FR-005)', async ({
    page,
  }) => {
    await page.goto('/#/quotition');
    // Ensure zero banned words or gamified banners exist
    await expect(page.locator('.score, .streak, .points, .stars, .badge')).toHaveCount(0);
  });
});
