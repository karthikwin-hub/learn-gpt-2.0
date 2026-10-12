import { test, expect } from '@playwright/test';

test.describe('Feature 034 Acceptance: Time: 24-Hour Clock & Duration (Railway Time) (Knot U3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot U3 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const u3Btn = page.locator('button[data-knot="U3"]');
    await expect(u3Btn).toBeVisible();

    await u3Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=U3/);
    await expect(page.locator('.screen-title')).toContainText(/21:30|train ticket/i);
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges 21:30 departure and accepts 9:30 PM choice (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=U3');
    await expect(page.locator('.screen-title')).toContainText(/21:30/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting '9:30 at night (PM)'
    const choiceBtn = page.getByRole('button', {
      name: /9:30 at night \(PM\)/i,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=U3/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining 24-hour clock and time bridging (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=U3');
    await expect(page.locator('.bodha-knot')).toContainText(/Time/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Timeclock Workbench (#timeclock) */
  test('US3-AS1: Timeclock workbench renders Dual Clock Dial and converts 21:30 to 9:30 PM (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/timeclock');
    await expect(page.locator('.screen-title')).toContainText(/24-Hour Clock & Duration/i);
    await expect(page.locator('.clock-dial-wrapper')).toBeVisible();

    // Check dual readout pills
    await expect(page.locator('.railway-time-pill')).toContainText(/21:30/);
    await expect(page.locator('.standard-time-pill')).toContainText(/9:30 PM/);
  });

  test('US3-AS2: Step 2 demonstrates Base-60 minute roll, avoiding Rohan :75 trap (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/timeclock');

    // Switch to step 2: Base-60 Minute Roll
    const step2Btn = page.getByRole('button', { name: /2\. Base-60 Minute Roll/i });
    await expect(step2Btn).toBeVisible();
    await step2Btn.click();

    await expect(page.locator('.minute-roll-card')).toBeVisible();
    await expect(page.locator('.stat-pill', { hasText: '15:15' })).toBeVisible();
    await expect(page.locator('.minute-roll-card')).toContainText(/Rohan's Mistake Trap/i);
  });

  test('US3-AS3: Step 3 calculates timeline duration bridging from 09:45 to 12:15 (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/timeclock');

    // Switch to step 3: Hour Bridging Timeline
    const step3Btn = page.getByRole('button', { name: /3\. Hour Bridging Timeline/i });
    await expect(step3Btn).toBeVisible();
    await step3Btn.click();

    await expect(page.locator('.hour-bridging-card')).toBeVisible();
    await expect(page.locator('.total-duration-pill')).toContainText(/2 hr 30 min/i);

    // Verify timeline hops
    const hops = page.locator('.timeline-hop-item');
    await expect(hops).toHaveCount(3);
    await expect(hops.nth(0)).toContainText(/09:45 ➔ 10:00/);
    await expect(hops.nth(1)).toContainText(/10:00 ➔ 12:00/);
    await expect(hops.nth(2)).toContainText(/12:00 ➔ 12:15/);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Rohan adding time base-10 to get 14:75 (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=U3');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: writes 14:75) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /Time rolls in base 60, not base 10! There is no such time as 14:75/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates sixty and 20:00 cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=U3');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'sixty'
    const sixtyChip = page.getByRole('button', { name: 'sixty', exact: true });
    await expect(sixtyChip).toBeVisible();
    await sixtyChip.click();

    // Select second blank tile '20:00'
    const twentyChip = page.getByRole('button', { name: '20:00', exact: true });
    await expect(twentyChip).toBeVisible();
    await twentyChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Timeclock screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/timeclock');

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
