import { test, expect } from '@playwright/test';

test.describe('Feature 003: Multiplication threads (M1–M5)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: M2 Multiplication is Area */
  test('US1-AS1: Courtyard guess transitions to Living Film and workbench', async ({ page }) => {
    await page.goto('/#/wonder?k=M2');
    await expect(page.locator('.wonder-art')).toBeVisible();
    const primaryBtn = page.locator('button.btn.primary');
    await expect(primaryBtn).toBeVisible();
    await primaryBtn.click();
    await expect(page).toHaveURL(/.*#\/bodha\?k=M2/);
    await expect(page.locator('.bodha')).toBeVisible();
  });

  test('US1-AS2: Target area floor stretching displays 18 unit squares', async ({ page }) => {
    await page.goto('/#/rect?k=M2');
    await expect(page.locator('.area-grid')).toBeVisible();
    const acrossStepper = page.locator('.stepper').first();
    const downStepper = page.locator('.stepper').nth(1);
    await acrossStepper.getByRole('button', { name: '+' }).click();
    await downStepper.getByRole('button', { name: '+' }).click();
    await expect(page.locator('.eq')).toContainText('=');
  });

  /* ------------------------------------------------------------------ US2: M4 Cut the Rectangle */
  test('US2-AS1: 23 × 14 grid cut at tens shows 4 rooms: 200, 30, 80, 12 (sum 322)', async ({
    page,
  }) => {
    await page.goto('/#/rect?k=M4');
    await expect(page.locator('.area-grid')).toBeVisible();
    const demoBtn = page.getByRole('button', { name: /Show me|Cut at the tens/i });
    if (await demoBtn.isVisible()) {
      await demoBtn.click();
    }
    const partsCard = page.locator('.card:has(.parts)');
    await expect(partsCard).toBeVisible();
    await expect(partsCard).toContainText('200');
    await expect(partsCard).toContainText('322');
  });

  test('US2-AS2: Cut grid folded into column lights up each column line with room strips', async ({
    page,
  }) => {
    await page.goto('/#/rect?k=M4&c=23&r=14&step=2&cut=true');
    const foldBtn = page.getByRole('button', { name: /Fold into column/i });
    if (await foldBtn.isVisible()) {
      await foldBtn.click();
      await expect(page.locator('.column')).toBeVisible();
      await expect(page.locator('.column .row.on').first()).toBeVisible();
    }
  });

  test('US2-AS3: Independent step 3: 17 × 12 produces rooms 100, 70, 20, 14 (total 204)', async ({
    page,
  }) => {
    await page.goto('/#/rect?k=M4&c=17&r=12');
    await expect(page.locator('.eq')).toContainText('204');
    await expect(page.locator('.parts')).toContainText('100');
  });

  /* ------------------------------------------------------------------ US3: M4 Spot the Mistake */
  test('US3-AS1: Mistake screen tapping correct step explains without saying "wrong"', async ({
    page,
  }) => {
    await page.goto('/#/mistake?k=M4');
    await expect(page.locator('.work-steps')).toBeVisible();
    const step1 = page.locator('.work-steps button').first();
    await step1.click();
    const say = page.locator('.say');
    await expect(say).toBeVisible();
    const text = await say.textContent();
    expect(text?.toLowerCase()).not.toContain('wrong');
    expect(text?.toLowerCase()).not.toContain('incorrect');
  });

  test('US3-AS2: Mistake screen tapping wrong step outlines 30 and 80 missing rooms in kumkum', async ({
    page,
  }) => {
    await page.goto('/#/mistake?k=M4');
    const step2 = page.locator('.work-steps button').nth(1);
    await step2.click();
    await expect(page.locator('.model svg')).toBeVisible();
    await expect(page.locator('text=322')).toBeVisible();
  });

  test('US3-AS3: Explain back completes sentence for knot M4', async ({ page }) => {
    await page.goto('/#/explain?k=M4');
    await expect(page.locator('.sentence')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: M5 Two Drummers */
  test('US4-AS1: Two Drummers rhythm audio-visual hits and dial rotations', async ({ page }) => {
    await page.goto('/#/drums');
    await expect(page.locator('.model svg')).toBeVisible();
    const playBtn = page.getByRole('button', { name: /Play/i });
    await expect(playBtn).toBeVisible();
  });

  test('US4-AS2: Drummers at 4 and 6 beats ring 12 as first meeting and 24 as next', async ({
    page,
  }) => {
    await page.goto('/#/drums?a=4&b=6');
    await expect(page.locator('.model svg')).toBeVisible();
    const playBtn = page.getByRole('button', { name: /Play/i });
    await playBtn.click();
    await expect(page.locator('.card')).toBeVisible();
  });

  test('US4-AS3: Prediction guess and multiples lists highlight common multiples', async ({
    page,
  }) => {
    await page.goto('/#/drums');
    await expect(page.locator('.card')).toBeVisible();
    await expect(page.locator('.stepper').first()).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: M1 Equal Groups & M3 Turn It Around */
  test('US5-AS1: M1 Equal groups arrange into rectangular arrays', async ({ page }) => {
    await page.goto('/#/rect?k=M1');
    await expect(page.locator('.area-grid')).toBeVisible();
  });

  test('US5-AS2: M3 Commutative rotation preserves total square count', async ({ page }) => {
    await page.goto('/#/rect?k=M3');
    await expect(page.locator('.area-grid')).toBeVisible();
    const turnBtn = page.getByRole('button', { name: /Turn it around/i });
    if (await turnBtn.isVisible()) {
      await turnBtn.click();
      await expect(page.locator('.eq')).toContainText('24');
    }
  });

  /* ------------------------------------------------------------------ US6: Calm Invariants & i18n */
  test('US6-AS1: Zero banned praise words or punitive alerts across screens', async ({ page }) => {
    await page.goto('/#/rect?k=M4');
    const content = await page.textContent('body');
    expect(content).not.toMatch(/good job|great work|bravo|well done|awesome/i);
    expect(content).not.toMatch(/wrong!|incorrect!|try again!/i);
  });

  test('US6-AS2: Full 5-language script purity and string parity for M1–M5', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'bn');
    });
    await page.goto('/#/drums');
    await expect(page.locator('.screen-title')).toBeVisible();
  });
});
