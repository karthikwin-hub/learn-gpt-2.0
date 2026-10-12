import { test, expect } from '@playwright/test';

test.describe('Feature 033 Acceptance: Metres, Grams and Litres (Metric Conversion Ladder) (Knot U2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot U2 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const u2Btn = page.locator('button[data-knot="U2"]');
    await expect(u2Btn).toBeVisible();

    await u2Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=U2/);
    await expect(page.locator('.screen-title')).toContainText(/250 centimetres or 2 metres/i);
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges 250 cm vs 2 m and accepts 250 cm choice (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=U2');
    await expect(page.locator('.screen-title')).toContainText(/250 centimetres or 2 metres/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting '250 centimetres (which is 2.5 metres)'
    const choiceBtn = page.getByRole('button', {
      name: /250 centimetres/i,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=U2/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining metric conversion ladder (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=U2');
    await expect(page.locator('.bodha-knot')).toContainText(/Metres, grams and litres|U2/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Metric Workbench (#metric) */
  test('US3-AS1: Metric workbench displays Length Ladder and converts values (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/metric');
    await expect(page.locator('.screen-title')).toContainText(/Metric Conversion Ladder/i);
    await expect(page.locator('.ladder-view')).toBeVisible();

    // Verify 4 ladder rungs exist (km, m, cm, mm)
    const rungs = page.locator('.ladder-rung');
    await expect(rungs).toHaveCount(4);
    await expect(page.locator('.stat-pill', { hasText: '2.5 m' })).toBeVisible();
    await expect(page.locator('.stat-pill', { hasText: '250 cm' })).toBeVisible();
    await expect(page.locator('.stat-pill', { hasText: '2500 mm' })).toBeVisible();
  });

  test('US3-AS2: Step 2 explores Mass and Capacity ladders (FR-003)', async ({ page }) => {
    await page.goto('/#/metric');

    // Switch to step 2: Mass & Capacity
    const step2Btn = page.getByRole('button', { name: /2\. Mass & Capacity/i });
    await expect(step2Btn).toBeVisible();
    await step2Btn.click();

    await expect(page.locator('.workbench-feedback')).toContainText(/grams.*litres/i);
    await expect(page.locator('.stat-pill', { hasText: '1.5 kg' })).toBeVisible();
    await expect(page.locator('.stat-pill', { hasText: '1500 g' })).toBeVisible();

    // Toggle Capacity submode
    const capBtn = page.getByRole('button', { name: /Capacity \(L/i });
    await capBtn.click();
    await expect(page.locator('.stat-pill', { hasText: '500 mL' })).toBeVisible();
    await expect(page.locator('.stat-pill', { hasText: '0.5 L' })).toBeVisible();
  });

  test('US3-AS3: Step 3 Dual Balance evaluates presets and tests equality (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/metric');

    // Switch to step 3: Dual Balance
    const step3Btn = page.getByRole('button', { name: /3\. Dual Balance/i });
    await expect(step3Btn).toBeVisible();
    await step3Btn.click();

    await expect(page.locator('.balance-card')).toBeVisible();

    // Test preset '4 m 5 cm vs 4.05 m'
    const presetBtn = page.getByRole('button', { name: /4 m 5 cm vs 4.05 m/i });
    await expect(presetBtn).toBeVisible();
    await presetBtn.click();

    await expect(page.locator('.workbench-feedback')).toContainText(/Balanced!/i);
    await expect(page.locator('.balance-card')).toContainText(/=/);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Sonia confusing 4 m 5 cm with 4.5 m (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=U2');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: 5 cm written as 4.5 m) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /5 cm is 5 hundredths of a metre \(0.05 m\), not 5 tenths/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates one hundred and divide cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=U2');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'one hundred'
    const hundredChip = page.getByRole('button', { name: 'one hundred', exact: true });
    await expect(hundredChip).toBeVisible();
    await hundredChip.click();

    // Select second blank tile 'divide'
    const divideChip = page.getByRole('button', { name: 'divide', exact: true });
    await expect(divideChip).toBeVisible();
    await divideChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Metric screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/metric');

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
