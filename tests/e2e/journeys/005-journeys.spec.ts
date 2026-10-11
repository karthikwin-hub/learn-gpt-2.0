import { test, expect } from '@playwright/test';

test.describe('Feature 005 User Journeys: Geometry', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  test('J5 (G2): End-to-end lesson flow for Rope and Pegs', async ({ page }) => {
    // 1. Bodha G2
    await page.goto('/#/bodha?k=G2');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();

    // 2. Workbench (rope G2)
    await page.goto('/#/rope');
    await expect(page.locator('.rope-manipulative')).toBeVisible();
    const plusBtn = page.locator('.stepper').getByRole('button', { name: '+' });
    await plusBtn.click();
    await plusBtn.click();
    await expect(page.locator('.rope-readout')).toContainText('3 + 9 + 3 + 9 = 24 m');

    // 3. Explain G2
    await page.goto('/#/explain?k=G2');
    await expect(page.locator('.sentence')).toBeVisible();

    // 4. Stop G2
    await page.goto('/#/stop?k=G2');
    await expect(page.locator('.stop')).toBeVisible();
  });

  test('J5 (G4): End-to-end lesson flow for Kolam Mirror & Turn', async ({ page }) => {
    // 1. Bodha G4
    await page.goto('/#/bodha?k=G4');
    await expect(page.locator('.bodha')).toBeVisible();
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();

    // 2. Workbench (kolam G4)
    await page.goto('/#/kolam');
    await expect(page.locator('.kolam-canvas')).toBeVisible();
    const turnBtn = page.getByRole('button', { name: /Turn only/i });
    await turnBtn.click();
    await expect(page.locator('.workbench-feedback')).toContainText('90°');

    // 3. Explain G4
    await page.goto('/#/explain?k=G4');
    await expect(page.locator('.sentence')).toBeVisible();

    // 4. Stop G4
    await page.goto('/#/stop?k=G4');
    await expect(page.locator('.stop')).toBeVisible();
  });

  test('J2: Language switch preserves workbench state on Rope and Pegs', async ({ page }) => {
    await page.goto('/#/rope');
    const plusBtn = page.locator('.stepper').getByRole('button', { name: '+' });
    await plusBtn.click(); // width 2
    await plusBtn.click(); // width 3
    await plusBtn.click(); // width 4

    // Open language sheet and switch to Telugu
    const langBtn = page.locator('#btn-lang');
    await langBtn.click();
    const teOption = page.locator('button.lang-option[lang="te"]');
    await teOption.click();

    // Verify width 4 preserved
    const read = page.locator('.rope-readout');
    await expect(read).toContainText('4 + 8 + 4 + 8 = 24 m');
  });

  test('J2: Language switch preserves order and mode on Kolam', async ({ page }) => {
    await page.goto('/#/kolam');
    const turnBtn = page.getByRole('button', { name: /Turn only/i });
    await turnBtn.click();
    const chip8 = page.getByRole('button', { name: '8' });
    await chip8.click();

    // Switch to Hindi
    const langBtn = page.locator('#btn-lang');
    await langBtn.click();
    const hiOption = page.locator('button.lang-option[lang="hi"]');
    await hiOption.click();

    // Verify 45° rotation remains in Hindi readout
    const readout = page.locator('.workbench-feedback');
    await expect(readout).toContainText('45°');
  });
});
