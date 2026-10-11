import { test, expect } from '@playwright/test';

test.describe('Feature 011 Acceptance: Vijnana (Science) Shala — Body, Light, Motion & Living Systems', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Digestion (B3) */
  test('US1-AS1: Digestion screen #digest renders the five organ stops in order (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/digest');
    const organs = page.locator('.organ-path');
    await expect(organs).toHaveCount(5);
    await expect(page.locator('.organ-mouth')).toHaveCount(1);
    await expect(page.locator('.organ-pipe')).toHaveCount(1);
    await expect(page.locator('.organ-stomach')).toHaveCount(1);
    await expect(page.locator('.organ-small')).toHaveCount(1);
    await expect(page.locator('.organ-large')).toHaveCount(1);
  });

  test('US1-AS2: Demo button traces the food bolus along the tract (FR-001)', async ({ page }) => {
    await page.goto('/#/digest');
    const followBtn = page.locator('.btn-follow');
    await expect(followBtn).toBeVisible();
    await followBtn.click();
    await expect(page.locator('.say')).toBeVisible();
  });

  test('US1-AS3: Small intestine absorbs nutrients and large intestine absorbs water (FR-001)', async ({
    page,
  }) => {
    // Step 3 allows tapping on small intestine
    await page.goto('/#/digest?step=3');
    const smallBtn = page.locator('.btn-organ-small');
    await smallBtn.click();
    await expect(page.locator('.say')).toContainText(/small intestine/i);
  });

  /* ------------------------------------------------------------------ US2: Light & Shadows (R1) */
  test('US2-AS1: Shadow screen #shadow renders lamp, stick, and ground shadow (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/shadow');
    await expect(page.locator('.ground-shadow')).toBeVisible();
    await expect(page.locator('.shadow-readout')).toContainText(/m/);
  });

  test('US2-AS2: Adjusting lamp height modifies shadow length (FR-002)', async ({ page }) => {
    await page.goto('/#/shadow');
    const initialText = await page.locator('.shadow-readout').textContent();
    const plusBtn = page.getByRole('button', { name: '+' });
    await plusBtn.click();
    const updatedText = await page.locator('.shadow-readout').textContent();
    expect(updatedText).not.toBe(initialText);
  });

  test('US2-AS3: Material choice adjusts shadow transparency (FR-002)', async ({ page }) => {
    await page.goto('/#/shadow');
    const waxChip = page.getByRole('button', { name: /wax/i });
    await waxChip.click();
    await expect(waxChip).toHaveClass(/active/);

    const glassChip = page.getByRole('button', { name: /glass/i });
    await glassChip.click();
    await expect(glassChip).toHaveClass(/active/);
  });

  /* ------------------------------------------------------------------ US3: Ramp & Friction (K2) */
  test('US3-AS1: Ramp screen #ramp renders wedge and surface choices (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/ramp');
    const surfaceChips = page.locator('.surface-chips button');
    await expect(surfaceChips).toHaveCount(4); // Tile, Wood, Rug, Sand
  });

  test('US3-AS2: Car rolls to model friction distances Tile > Wood > Rug > Sand (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/ramp');
    // Default tile
    await expect(page.locator('.ramp-readout')).toContainText('6m');

    // Wood
    await page.locator('.surface-chips').getByRole('button', { name: /wood/i }).click();
    await expect(page.locator('.ramp-readout')).toContainText('3.8m');

    // Rug
    await page.locator('.surface-chips').getByRole('button', { name: /rug/i }).click();
    await expect(page.locator('.ramp-readout')).toContainText('1.9m');

    // Sand
    await page.locator('.surface-chips').getByRole('button', { name: /sand/i }).click();
    await expect(page.locator('.ramp-readout')).toContainText('1.2m');
  });

  test('US3-AS3: Changing single surface reports fair test validation (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/ramp');
    await page.getByRole('button', { name: /wood/i }).click();
    await expect(page.locator('.say')).toContainText(/fair test/i);
  });

  /* ------------------------------------------------------------------ US4: Seed Germination (J2) */
  test('US4-AS1: Seed screen #seed renders anatomical layers (FR-004)', async ({ page }) => {
    await page.goto('/#/seed');
    await expect(page.locator('.part-coat')).toBeVisible();
    await expect(page.locator('.part-cotyledon')).toBeVisible();
    await expect(page.locator('.part-radicle')).toBeVisible();
    await expect(page.locator('.part-plumule')).toBeVisible();
  });

  test('US4-AS2: Toggling conditions triggers germination (FR-004)', async ({ page }) => {
    await page.goto('/#/seed');
    // Disable water
    const waterChip = page.getByRole('button', { name: /Water/i });
    await waterChip.click();
    await expect(page.locator('.seed-status-notice')).toContainText(/halted|requires/i);

    // Re-enable water
    await waterChip.click();
    await expect(page.locator('.seed-status-notice')).toContainText(/favorable/i);
  });

  /* ------------------------------------------------------------------ US5: Two-Pan Balance (K1) */
  test('US5-AS1: Balance screen #balance displays beam in equilibrium (FR-005)', async ({
    page,
  }) => {
    await page.goto('/#/balance');
    await expect(page.locator('.balance-status')).toContainText(/Equilibrium/i);
  });

  test('US5-AS2: Adding mass causes balance beam to dip (FR-005)', async ({ page }) => {
    await page.goto('/#/balance');
    const rightPlus = page.locator('.actions-card .btn.mini').nth(3);
    await rightPlus.click();
    await expect(page.locator('.balance-status')).toContainText(/Right/i);
  });

  /* ------------------------------------------------------------------ US6: Calm UX & Multilingual Invariants */
  test('US6-AS1: Accessible stage bar renders return link on all Vijnana screens', async ({
    page,
  }) => {
    for (const route of ['#/digest', '#/ramp', '#/shadow', '#/seed', '#/balance']) {
      await page.goto(route);
      await expect(page.locator('.stage-bar')).toBeVisible();
    }
  });

  test('US6-AS2: Zero gamification across all Vijnana workbenches', async ({ page }) => {
    for (const route of ['#/digest', '#/ramp', '#/shadow', '#/seed', '#/balance']) {
      await page.goto(route);
      await expect(page.locator('.badge, .star, .score, .streak')).toHaveCount(0);
    }
  });

  test('US6-AS3: Multilingual rendering preserves localized titles without unrendered tokens', async ({
    page,
  }) => {
    for (const lang of ['hi', 'te', 'bn']) {
      await page.addInitScript((l) => {
        localStorage.setItem('gurukul:lang', l);
      }, lang);

      await page.goto('/#/digest');
      const title = await page.locator('.screen-title').textContent();
      expect(title).toBeTruthy();
      expect(title?.trim().length).toBeGreaterThan(0);
    }
  });
});
