import { test, expect } from '@playwright/test';

test.describe('Feature 004: Division threads (D1–D4) & Fair Share Table', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: D1 Fair Share Workbench */
  test('US1-AS1: 12 laddoos shared across 4 plates round-by-round deals evenly', async ({
    page,
  }) => {
    await page.goto('/#/share?mode=share');
    await expect(page.locator('.fair-share-svg')).toBeVisible();

    const roundBtn = page.getByRole('button', { name: /Deal one round/i });
    await expect(roundBtn).toBeVisible();

    // Deal 3 rounds to distribute 12 items onto 4 plates
    await roundBtn.click();
    await page.waitForTimeout(700);
    await roundBtn.click();
    await page.waitForTimeout(700);
    await roundBtn.click();
    await page.waitForTimeout(700);

    const eqCard = page.locator('.eq-card');
    await expect(eqCard).toContainText('12 ÷ 4 = 3');
    await expect(eqCard).toContainText('4 × 3 = 12');
  });

  test('US1-AS2: Dealing all shows bar partition diagram with equal parts', async ({ page }) => {
    await page.goto('/#/share?mode=share');
    const dealAllBtn = page.getByRole('button', { name: /Deal them all/i });
    await expect(dealAllBtn).toBeVisible();
    await dealAllBtn.click();

    // Wait for all deals to finish
    await expect(page.locator('.bar-card')).toBeVisible({ timeout: 6000 });
    const barSvg = page.locator('.bar-card svg');
    await expect(barSvg).toBeVisible();
    await expect(barSvg).toContainText('12 laddoos in all');
  });

  test('US1-AS3: Stepper adjustment updates total and plates', async ({ page }) => {
    await page.goto('/#/share?mode=share');
    const totalStepper = page.locator('.stepper').first();
    const plusBtn = totalStepper.getByRole('button', { name: '+' });
    await plusBtn.click();
    await expect(page.locator('.step-guide')).toContainText('13');
  });

  /* ------------------------------------------------------------------ US2: D3 Leftovers and Fractions */
  test('US2-AS1: 14 laddoos on 4 plates retains 2 in remainder tray with kumkum equation', async ({
    page,
  }) => {
    await page.goto('/#/share?mode=leftover');
    await expect(page.locator('.fair-share-svg')).toBeVisible();

    const dealAllBtn = page.getByRole('button', { name: /Deal them all/i });
    await dealAllBtn.click();

    const eqCard = page.locator('.eq-card');
    await expect(eqCard).toContainText('14 ÷ 4 = 3');
    await expect(eqCard).toContainText('r');
    await expect(eqCard).toContainText('2');
    await expect(eqCard).toContainText('4 × 3 + 2 = 14');
  });

  test('US2-AS2: Cut leftovers divides remainder into fractional wedges', async ({ page }) => {
    await page.goto('/#/share?mode=leftover');
    const dealAllBtn = page.getByRole('button', { name: /Deal them all/i });
    await dealAllBtn.click();

    const cutBtn = page.getByRole('button', { name: /Cut leftovers/i });
    await expect(cutBtn).toBeVisible({ timeout: 6000 });
    await cutBtn.click();

    const eqCard = page.locator('.eq-card');
    await expect(eqCard).toContainText('2/4', { timeout: 3000 });
  });

  /* ------------------------------------------------------------------ US3: Bodha Cards for D1 & D3 */
  test('US3-AS1: Bodha D1 renders plate diagrams on concept cards', async ({ page }) => {
    await page.goto('/#/bodha?k=D1');
    await expect(page.locator('.bodha')).toBeVisible();
    const nextBtn = page.getByRole('button', { name: /Next/i });
    await nextBtn.click();

    // Card 2 (idea) has plate diagram
    const fig = page.locator('.bodha-fig svg');
    await expect(fig).toBeVisible();
    await expect(fig.locator('circle')).toHaveCount(16); // 4 plates + 4*3 laddoos
  });

  test('US3-AS2: Bodha D3 renders leftover remainder and cut halves', async ({ page }) => {
    await page.goto('/#/bodha?k=D3');
    await expect(page.locator('.bodha')).toBeVisible();
    const nextBtn = page.getByRole('button', { name: /Next/i });
    await nextBtn.click();

    // Card 2 (idea) has plate diagram with remainder equation
    const fig = page.locator('.bodha-fig svg');
    await expect(fig).toBeVisible();
    await expect(fig).toContainText('14 ÷ 4 = 3 r 2');
  });

  /* ------------------------------------------------------------------ US4: D2 & D4 Curriculum Integration */
  test('US4-AS1: Bodha D2 provides grouping cards and explanation', async ({ page }) => {
    await page.goto('/#/bodha?k=D2');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-text').first()).toBeVisible();
  });

  test('US4-AS2: Bodha D4 provides missing side rectangular cards', async ({ page }) => {
    await page.goto('/#/bodha?k=D4');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.bodha-text').first()).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Invariants & Multilingual Equity */
  test('US5-AS1: Calm pedagogy feedback has zero banned praise words', async ({ page }) => {
    await page.goto('/#/share?mode=share');
    const dealAllBtn = page.getByRole('button', { name: /Deal them all/i });
    await dealAllBtn.click();

    const say = page.locator('.say');
    await expect(say).toBeVisible({ timeout: 6000 });
    const text = (await say.textContent()) || '';
    expect(text).not.toMatch(/great|good job|correct|perfect|awesome|stars|points|well done/i);
    expect(text).toContain('Every plate has 3');
  });

  test('US5-AS2: Tamil rotation renders native strings in place', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'ta');
    });
    await page.goto('/#/share?mode=share');

    await expect(page.locator('.step-guide')).toContainText('தட்டுகளுக்கு');
    const roundBtn = page.getByRole('button', { name: 'ஒரு சுற்று பகிர்' });
    await expect(roundBtn).toBeVisible();
    const dealAllBtn = page.getByRole('button', { name: 'எல்லாவற்றையும் பகிர்' });
    await expect(dealAllBtn).toBeVisible();
  });
});
