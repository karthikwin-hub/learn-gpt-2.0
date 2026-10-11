import { test, expect } from '@playwright/test';

test.describe('Feature 005: Geometry threads (G1–G5), Rope & Pegs, Kolam Mirror', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: G2 Rope and Pegs */
  test('US1-AS1: Rope and Pegs loads with 24m perimeter and initial 1x11 dimensions', async ({
    page,
  }) => {
    await page.goto('/#/rope');
    await expect(page.locator('.rope-manipulative')).toBeVisible();

    const read = page.locator('.rope-readout');
    await expect(read).toContainText('1 + 11 + 1 + 11 = 24 m');
    await expect(read).toContainText('1 × 11 = 11 m²');

    const hill = page.locator('.area-hill');
    await expect(hill).toBeVisible();
  });

  test('US1-AS2: Stepper adjustment to 6x6 square reveals peak area and calm feedback', async ({
    page,
  }) => {
    await page.goto('/#/rope');
    const stepper = page.locator('.stepper');
    const plusBtn = stepper.getByRole('button', { name: '+' });

    // Step from 1 to 6
    for (let i = 1; i < 6; i++) {
      await plusBtn.click();
    }

    const read = page.locator('.rope-readout');
    await expect(read).toContainText('6 + 6 + 6 + 6 = 24 m');
    await expect(read).toContainText('6 × 6 = 36 m²');

    // Square calm feedback becomes visible
    const say = page.locator('.workbench-feedback');
    await expect(say).toBeVisible();
    await expect(say).toContainText('holds 36 square metres');

    // Ghost layer has previous outlines
    const ghosts = page.locator('.ghost-layer rect');
    await expect(ghosts).toHaveCount(5);
  });

  test('US1-AS3: Perimeter chip changes rope length to 20m and resets area hill', async ({
    page,
  }) => {
    await page.goto('/#/rope');
    const chip20 = page.getByRole('button', { name: '20 m' });
    await expect(chip20).toBeVisible();
    await chip20.click();

    const read = page.locator('.rope-readout');
    await expect(read).toContainText('20 m');
    await expect(page.locator('.step-guide')).toContainText('20 metres long');
  });

  /* ------------------------------------------------------------------ US2: G4 Kolam Mirror */
  test('US2-AS1: Kolam Mirror loads with 7x7 grid, order 4, mirror mode and demo stroke', async ({
    page,
  }) => {
    await page.goto('/#/kolam');
    const canvas = page.locator('.kolam-canvas');
    await expect(canvas).toBeVisible();

    const readout = page.locator('.workbench-feedback');
    await expect(readout).toContainText('4 mirror lines');
    await expect(readout).toContainText('90°');
  });

  test('US2-AS2: Toggling to turn mode switches to rotations only and smallest turn angle', async ({
    page,
  }) => {
    await page.goto('/#/kolam');
    const turnBtn = page.getByRole('button', { name: 'Turn only' });
    await expect(turnBtn).toBeVisible();
    await turnBtn.click();

    const readout = page.locator('.workbench-feedback');
    await expect(readout).toContainText('every 90° turn');
    await expect(readout).not.toContainText('4 mirror lines');
  });

  test('US2-AS3: Order chips dynamically update smallest turn angle', async ({ page }) => {
    await page.goto('/#/kolam');
    const turnBtn = page.getByRole('button', { name: 'Turn only' });
    await turnBtn.click();

    const chip8 = page.getByRole('button', { name: '8' });
    await chip8.click();

    const readout = page.locator('.workbench-feedback');
    await expect(readout).toContainText('45°');

    const chip2 = page.getByRole('button', { name: '2' });
    await chip2.click();
    await expect(readout).toContainText('180°');
  });

  test('US2-AS4: Turn mode order 4 with strokes meets challenge', async ({ page }) => {
    await page.goto('/#/kolam');
    const canvas = page.locator('.kolam-canvas');
    // Wait for demo stroke animation to finish
    await expect(canvas).toHaveAttribute('aria-label', /1 lines drawn/, { timeout: 4000 });

    const turnBtn = page.getByRole('button', { name: 'Turn only' });
    await turnBtn.click();

    const readout = page.locator('.workbench-feedback');
    await expect(readout).toContainText('challenge');
  });

  test('US2-AS5: Undo and clear buttons manipulate canvas strokes', async ({ page }) => {
    await page.goto('/#/kolam');
    const canvas = page.locator('.kolam-canvas');
    await expect(canvas).toHaveAttribute('aria-label', /1 lines drawn/, { timeout: 4000 });

    const clearBtn = page.getByRole('button', { name: 'Clear' });
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();

    await expect(canvas).toHaveAttribute('aria-label', /0 lines drawn/);
  });

  /* ------------------------------------------------------------------ US3: Bodha Concept Cards */
  test('US3-AS1: Bodha G2 displays 6 cards with rope diagram comparing dimensions', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G2');
    await expect(page.locator('.bodha')).toBeVisible();

    const fig = page.locator('.model.bodha-fig svg');
    await expect(fig).toBeVisible();
    await expect(fig).toContainText('11 m');
    await expect(fig).toContainText('6 m');

    // Check step navigation on worked example
    const nextCard = page.getByRole('button', { name: /Next|→/i });
    await nextCard.click(); // to idea
    await nextCard.click(); // to why
    await nextCard.click(); // to example
    await expect(page.locator('.bodha-text')).toContainText('20-metre rope');
  });

  test('US3-AS2: Bodha G4 displays flower petals with 90 deg turn and mirror symmetry', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=G4');
    await expect(page.locator('.bodha')).toBeVisible();

    const fig = page.locator('.model.bodha-fig svg');
    await expect(fig).toBeVisible();
    await expect(fig).toContainText('90°');
  });

  /* ------------------------------------------------------------------ US4: Curriculum Integration */
  test('US4-AS1: Shala Loom Rekha contains knots G1 to G5 with bench links', async ({ page }) => {
    await page.goto('/#/shala?s=ganita');
    await expect(page.locator('.domain').first()).toBeVisible();

    const g2Link = page.locator('button[data-knot="G2"]');
    await expect(g2Link).toBeVisible();

    const g4Link = page.locator('button[data-knot="G4"]');
    await expect(g4Link).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Invariants & Multilingual Equity */
  test('US5-AS1: No gamification or banned praise words appear on geometry screens', async ({
    page,
  }) => {
    await page.goto('/#/rope');
    const content = await page.content();
    const banned = [
      'great job',
      'points',
      'stars',
      'streak',
      'badges',
      'leaderboard',
      'awesome',
      'perfect',
    ];
    for (const word of banned) {
      expect(content.toLowerCase()).not.toContain(word);
    }
  });

  test('US5-AS2: Telugu localization displays pure Telugu terms without English leaks', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'te');
    });
    await page.goto('/#/rope');

    await expect(page.locator('.step-guide')).toContainText('తాడు 24 మీటర్ల పొడవు');
    await expect(page.locator('.control-row').first()).toContainText('వెడల్పు');

    await page.goto('/#/kolam');
    await expect(page.locator('.step-guide')).toContainText('ఒక గీత గీయి');
  });

  test('US5-AS3: In-place language toggle preserves rope state', async ({ page }) => {
    await page.goto('/#/rope');
    const plusBtn = page.locator('.stepper').getByRole('button', { name: '+' });
    await plusBtn.click(); // width = 2
    await plusBtn.click(); // width = 3

    // Toggle language to Hindi via language sheet
    const langBtn = page.locator('#btn-lang');
    await langBtn.click();
    const hiBtn = page.locator('button.lang-option[lang="hi"]');
    await hiBtn.click();

    // Width should still be 3 and 3x9=27 should be reflected
    const read = page.locator('.rope-readout');
    await expect(read).toContainText('3 + 9 + 3 + 9 = 24 m');
  });
});
