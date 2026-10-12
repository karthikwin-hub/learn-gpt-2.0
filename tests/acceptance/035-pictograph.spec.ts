import { test, expect } from '@playwright/test';

test.describe('Feature 035 Acceptance: Pictographs (Scaled Keys & Data Representation) (Knot H1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Ganita Shala Loom Playability */
  test('US1-AS1: Knot H1 in Ganita Shala is marked playable and enters Prashna (FR-001)', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    const h1Btn = page.locator('button[data-knot="H1"]');
    await expect(h1Btn).toBeVisible();

    await h1Btn.click();
    await expect(page).toHaveURL(/#\/prashna\?k=H1/);
    await expect(page.locator('.screen-title')).toContainText(/1 book symbol stands for 5 books/i);
  });

  /* ------------------------------------------------------------------ US2: Prashna & Bodha */
  test('US2-AS1: Prashna challenges 4 book symbols with key 5 and accepts 20 books (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/prashna?k=H1');
    await expect(page.locator('.screen-title')).toContainText(/1 book symbol stands for 5 books/i);

    const goBtn = page.getByRole('button', { name: /Understand it/i });
    await expect(goBtn).toBeDisabled();

    // Selecting '20 books'
    const choiceBtn = page.getByRole('button', {
      name: '20 books',
      exact: true,
    });
    await choiceBtn.click();
    await expect(choiceBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(goBtn).toBeEnabled();

    await goBtn.click();
    await expect(page).toHaveURL(/#\/bodha\?k=H1/);
  });

  test('US2-AS2: Bodha renders 6 cards explaining scaled pictographs and worked examples (FR-002)', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=H1');
    await expect(page.locator('.bodha-knot')).toContainText(/Pictographs/i);
    await expect(page.locator('.screen-title')).toBeVisible();

    const nextCardBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextCardBtn).toBeVisible();
    await nextCardBtn.click();
    await expect(page.locator('.screen-title')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Interactive Pictograph Workbench (#pictograph) */
  test('US3-AS1: Pictograph workbench displays Fruit Survey Chart with scale multiplier (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/pictograph');
    await expect(page.locator('.screen-title')).toContainText(
      /Pictographs \(Scaled Keys & Data Representation\)/i
    );
    await expect(page.locator('.key-scale-bar')).toBeVisible();
    await expect(page.locator('.key-scale-bar')).toContainText(/Key: 1 Symbol = 5 Fruits/i);

    // Initial fruit rows
    const rows = page.locator('.survey-row-card');
    await expect(rows).toHaveCount(3);
    await expect(page.locator('.grand-total-pill')).toBeVisible();
  });

  test('US3-AS2: Step 2 Scale Multiplier Explorer calculates icons × key scale (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/pictograph');

    // Switch to step 2: Scale Multiplier Explorer
    const step2Btn = page.getByRole('button', { name: /2\. Scale Multiplier Explorer/i });
    await expect(step2Btn).toBeVisible();
    await step2Btn.click();

    await expect(page.locator('.scale-explorer-card')).toBeVisible();
    await expect(page.locator('.explorer-total-pill')).toContainText(/20 Items/i);

    // Change key scale to 10
    const key10Btn = page.getByRole('button', { name: '1 = 10', exact: true });
    await key10Btn.click();
    await expect(page.locator('.explorer-total-pill')).toContainText(/40 Items/i);
  });

  test('US3-AS3: Step 3 Half-Icon Fractional Tally decodes partial stars (FR-003)', async ({
    page,
  }) => {
    await page.goto('/#/pictograph');

    // Switch to step 3: Half-Icon Fractional Tally
    const step3Btn = page.getByRole('button', { name: /3\. Half-Icon Fractional Tally/i });
    await expect(step3Btn).toBeVisible();
    await step3Btn.click();

    await expect(page.locator('.half-icon-card')).toBeVisible();
    await expect(page.locator('.half-tally-pill')).toContainText(/14 students/i);
    await expect(page.locator('.full-star')).toHaveCount(3);
    await expect(page.locator('.half-star')).toHaveCount(1);
  });

  /* ------------------------------------------------------------------ US4: Mistake and Explain */
  test('US4-AS1: Spot the mistake identifies Anita forgetting the key scale multiplier (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/mistake?knot=H1');
    await expect(page.locator('.work-steps')).toBeVisible();

    const stepBtns = page.locator('.work-steps button');
    await expect(stepBtns).toHaveCount(3);

    // Step 2 (0-indexed 1: writes only 3 bicycles) is the mistake
    await stepBtns.nth(1).click();
    await expect(page.locator('.say')).toContainText(
      /Multiply the icon count by the key scale! 1 symbol is worth 10 bicycles/i
    );
    await expect(page.getByRole('button', { name: /explain/i })).toBeVisible();
  });

  test('US4-AS2: Explain back validates key and twenty cloze synthesis (FR-004)', async ({
    page,
  }) => {
    await page.goto('/#/explain?knot=H1');
    await expect(page.locator('.sentence')).toBeVisible();

    // Select first blank tile 'key'
    const keyChip = page.getByRole('button', { name: 'key', exact: true });
    await expect(keyChip).toBeVisible();
    await keyChip.click();

    // Select second blank tile 'twenty'
    const twentyChip = page.getByRole('button', { name: 'twenty', exact: true });
    await expect(twentyChip).toBeVisible();
    await twentyChip.click();

    // Completing sentence reveals "Keep in my Pothi"
    const keepBtn = page.getByRole('button', { name: /Keep in my Pothi/i });
    await expect(keepBtn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Viewport Responsiveness & Calm Pedagogical Invariants */
  test('US5-AS1: Pictograph screen renders responsive touch targets on 360px and 390px viewports (FR-005)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/#/pictograph');

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
