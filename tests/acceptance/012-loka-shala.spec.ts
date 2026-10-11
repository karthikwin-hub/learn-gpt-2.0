import { test, expect } from '@playwright/test';

test.describe('Feature 012 Acceptance: Loka (Social Studies) Shala — Thread of Time, Spin and Travel, Courtyard from Above', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Thread of time (I2) */
  test('US1-AS1: Timeline screen #timeline unrolls the thread and renders the BCE/CE join without year zero (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/timeline');
    await expect(page.locator('.screen-title')).toContainText(/Thread of time/i);

    const unrollBtn = page.getByRole('button', { name: /Unroll the thread/i });
    await expect(unrollBtn).toBeVisible();
    await unrollBtn.click();

    // After unrolling, the join label '1 BCE | 1 CE' appears
    await expect(page.locator('svg text', { hasText: '1 BCE | 1 CE' })).toBeVisible();
    await expect(page.locator('.say')).toContainText(/There is no year zero/i);
  });

  test('US1-AS2: Hanging events in chronological order attaches them to the thread (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/timeline');
    await page.getByRole('button', { name: /Unroll the thread/i }).click();

    // Out of order attempt (e.g. Independence before Mohenjo-daro)
    const independenceBtn = page.getByRole('button', { name: 'Independence' });
    await independenceBtn.click();
    await expect(page.locator('.say')).toContainText(/Is that the oldest of the ones left/i);

    // Correct chronological sequence
    const sequence = [
      'Mohenjo-daro',
      'Ashoka’s edicts',
      'Aryabhatiya',
      'Taj Mahal',
      'Independence',
      'Chandrayaan-3',
    ];

    for (const name of sequence) {
      const btn = page.getByRole('button', { name });
      await btn.click();
    }

    await expect(page.locator('.say')).toContainText(/All six are hung/i);
  });

  test('US1-AS3: Calculating years between 250 BCE and 499 CE rejects year zero and accepts 748 (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/timeline');
    await page.getByRole('button', { name: /Unroll the thread/i }).click();

    const sequence = [
      'Mohenjo-daro',
      'Ashoka’s edicts',
      'Aryabhatiya',
      'Taj Mahal',
      'Independence',
      'Chandrayaan-3',
    ];
    for (const name of sequence) {
      await page.getByRole('button', { name }).click();
    }

    // Attempting 749 years (which erroneously counts year zero)
    const zeroBtn = page.getByRole('button', { name: '749 years' });
    await zeroBtn.click();
    await expect(page.locator('.say')).toContainText(/counts a year zero/i);

    // Correct answer without year zero: 748 years
    const correctBtn = page.getByRole('button', { name: '748 years' });
    await correctBtn.click();
    await expect(page.locator('.say')).toContainText(/748 years/i);
    await expect(page.getByRole('button', { name: /Spot the mistake/i })).toBeVisible();
  });

  /* ------------------------------------------------------------------ US2: Spin and travel (E1) */
  test('US2-AS1: Earth screen #earth renders the North Pole view, day/night shading, and solar hour (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/earth');
    await expect(page.locator('.screen-title')).toContainText(/Spin and travel/i);
    await expect(page.getByText('India', { exact: true })).toBeVisible();

    const spinBtn = page.getByRole('button', { name: /Spin the Earth/i });
    await expect(spinBtn).toBeVisible();
    await spinBtn.click();

    await expect(page.locator('.say')).toContainText(/24 hours/i);
  });

  test('US2-AS2: Turning the Earth to night advances to the orbit view (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/earth');
    await page.getByRole('button', { name: /Spin the Earth/i }).click();

    const turnBtn = page.getByRole('button', { name: /^Turn$/i });
    // Turn until India rotates into night and orbit month choices appear
    while ((await page.getByRole('button', { name: 'Dec' }).count()) === 0) {
      await turnBtn.click();
    }

    await expect(page.locator('.say')).toContainText(/away from the Sun/i);
    // Month choice chips for orbit view now appear
    await expect(page.getByRole('button', { name: 'Dec' })).toBeVisible();
  });

  test('US2-AS3: Orbit view confirms winter is caused by axial tilt leaning away from the Sun (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/earth');
    await page.getByRole('button', { name: /Spin the Earth/i }).click();

    const turnBtn = page.getByRole('button', { name: /^Turn$/i });
    while ((await page.getByRole('button', { name: 'Dec' }).count()) === 0) {
      await turnBtn.click();
    }

    // Selecting summer month gives guidance
    const marBtn = page.getByRole('button', { name: 'Mar' });
    await marBtn.click();
    await expect(page.locator('.say')).toContainText(/Where does the northern half lean away/i);

    // Selecting December confirms axial tilt caused winter
    const decBtn = page.getByRole('button', { name: 'Dec' });
    await decBtn.click();
    await expect(page.locator('.say')).toContainText(/The tilt does it, not the distance/i);
    await expect(page.getByRole('button', { name: /Spot the mistake/i })).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Courtyard from above (E4) */
  test('US3-AS1: Map screen #map flattens the courtyard into a top-down orthogonal map (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/map');
    await expect(page.locator('.screen-title')).toContainText(/Courtyard from above/i);

    const showMeBtn = page.getByRole('button', { name: /Look from above/i });
    await expect(showMeBtn).toBeVisible();
    await showMeBtn.click();

    // Scale and compass now visible
    await expect(page.locator('svg text', { hasText: '1 square = 5 m' })).toBeVisible();
    await expect(page.locator('.compass-pad')).toBeVisible();
  });

  test('US3-AS2: Cardinal movement prevents walking into boundary walls and the house (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/map');
    await page.getByRole('button', { name: /Look from above/i }).click();

    // Gate is at [1, 5]. Moving South hits the bottom boundary wall.
    const southBtn = page.getByRole('button', { name: /S ↓/i });
    await southBtn.click();
    await expect(page.locator('.say')).toContainText(/A wall or the house is in the way/i);

    // Move north toward courtyard: N, N
    const northBtn = page.getByRole('button', { name: /N ↑/i });
    await northBtn.click();
    await northBtn.click();

    // Undo button retracts a step
    const undoBtn = page.getByRole('button', { name: /Undo/i });
    await expect(undoBtn).toBeVisible();
    await undoBtn.click();
  });

  test('US3-AS3: Completing walk to the well requires multiplying by the scale factor (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/map');
    await page.getByRole('button', { name: /Look from above/i }).click();

    const northBtn = page.getByRole('button', { name: /N ↑/i });
    const eastBtn = page.getByRole('button', { name: /E →/i });

    // Path: N, N, N, E, N, E, E, E, E (9 steps)
    await northBtn.click();
    await northBtn.click();
    await northBtn.click();
    await eastBtn.click();
    await northBtn.click();
    await eastBtn.click();
    await eastBtn.click();
    await eastBtn.click();
    await eastBtn.click();

    await expect(page.locator('.say')).toContainText(/You reached the well/i);

    // Erroneously adding scale: 9 + 5 = 14 m
    const addBtn = page.getByRole('button', { name: '14 m' });
    await addBtn.click();
    await expect(page.locator('.say')).toContainText(/That adds the scale/i);

    // Correctly multiplying scale: 9 * 5 = 45 m
    const multBtn = page.getByRole('button', { name: '45 m' });
    await multBtn.click();
    await expect(page.locator('.say')).toContainText(/9 × 5 = 45 m/i);
    await expect(page.getByRole('button', { name: /Spot the mistake/i })).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Lesson Engine Flow */
  test('US4-AS1: Full lesson flow operates cleanly for knot I2 (Thread of time) (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?knot=I2');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await page.goto('/#/mistake?knot=I2');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await page.goto('/#/explain?knot=I2');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
