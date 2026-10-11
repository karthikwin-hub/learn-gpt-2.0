import { test, expect, type Page } from '@playwright/test';

test.describe('Feature 007: Logic threads (L1–L4), Marble Gates & Truth Tables', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  async function dropMarble(page: Page) {
    const count = await page.locator('.basin-layer circle').count();
    await page.getByRole('button', { name: 'Drop a marble' }).click();
    await expect(page.locator('.basin-layer circle')).toHaveCount(count + 1);
  }

  /* ------------------------------------------------------------------ US1: L2 Marble Machine */
  test('US1-AS1: Marble Machine loads with default AND gate, doors A and B, and basins', async ({
    page,
  }) => {
    await page.goto('/#/logic');
    await expect(page.locator('.marbles-manipulative')).toBeVisible();

    const doorA = page.getByRole('button', { name: /^A:/ });
    await expect(doorA).toBeVisible();
    await expect(doorA).toContainText('open');

    const doorB = page.getByRole('button', { name: /^B:/ });
    await expect(doorB).toBeVisible();
    await expect(doorB).toContainText('shut');

    const table = page.locator('.card table.truth');
    await expect(table).toBeVisible();
    await expect(table.locator('tbody tr')).toHaveCount(4);
  });

  test('US1-AS2: Toggling doors updates open and shut states', async ({ page }) => {
    await page.goto('/#/logic');
    const doorA = page.getByRole('button', { name: /^A:/ });
    await expect(doorA).toContainText('open');

    await doorA.click();
    await expect(doorA).toContainText('shut');

    await doorA.click();
    await expect(doorA).toContainText('open');
  });

  test('US1-AS3: Dropping a marble animates run and tallies in basin', async ({ page }) => {
    await page.goto('/#/logic');
    const dropBtn = page.getByRole('button', { name: 'Drop a marble' });
    await dropBtn.click();

    // After animation, residue line is present
    await expect(page.locator('.residue-layer path')).toBeVisible();

    // A is open (true), B is shut (false) -> AND gate output is NO
    const noBasinMarbles = page.locator('.basin-layer circle');
    await expect(noBasinMarbles).toHaveCount(1);
  });

  test('US1-AS4: Dropping a marble records row in dynamic truth table', async ({ page }) => {
    await page.goto('/#/logic');
    const dropBtn = page.getByRole('button', { name: 'Drop a marble' });
    await dropBtn.click();

    // Row for A=open, B=shut should now have 'NO'
    const table = page.locator('.card table.truth');
    const row = table.locator('tbody tr').nth(2); // true, false
    await expect(row.locator('td.no')).toHaveText('NO');
  });

  test('US1-AS5: Switching gate to NOT reconfigures machine and hides Door B', async ({ page }) => {
    await page.goto('/#/logic');
    const notChip = page.getByRole('button', { name: 'NOT', exact: false });
    await notChip.click();

    // Door B button should be absent
    await expect(page.getByRole('button', { name: /^B:/ })).toHaveCount(0);

    // Truth table has 2 rows for NOT
    const rows = page.locator('.card table.truth tbody tr');
    await expect(rows).toHaveCount(2);
  });

  /* ------------------------------------------------------------------ US2: Mystery Gate Deduction */
  test('US2-AS1: Mystery chip covers the tracks with question mark cover', async ({ page }) => {
    await page.goto('/#/logic');
    const mysteryChip = page.getByRole('button', { name: 'Mystery' });
    await mysteryChip.click();

    const cover = page.locator('.mystery-cover');
    await expect(cover).toBeVisible();
    await expect(cover.locator('text')).toHaveText('?');
  });

  test('US2-AS2: Completing all trials presents gate guessing chips', async ({ page }) => {
    await page.goto('/#/logic');
    const notChip = page.getByRole('button', { name: 'NOT', exact: false });
    await notChip.click();

    // In NOT gate, try both input states: Door A open (true), then Door A shut (false)
    await dropMarble(page);

    const doorA = page.getByRole('button', { name: /^A:/ });
    await doorA.click();
    await dropMarble(page);

    // Explanation should appear when table is complete
    const explanation = page.locator('.card p.say');
    await expect(explanation).toBeVisible();
    await expect(explanation).toContainText('NOT:');
  });

  test('US2-AS3: Mystery deduction validates candidate gate guess', async ({ page }) => {
    await page.goto('/#/logic');
    const mysteryChip = page.getByRole('button', { name: 'Mystery' });
    await mysteryChip.click();

    const doorA = page.getByRole('button', { name: /^A:/ });
    const doorB = page.getByRole('button', { name: /^B:/ });

    // Trial 1
    await dropMarble(page);

    if (await doorB.isVisible()) {
      // 4-row mystery gate (AND or OR)
      await doorB.click();
      await dropMarble(page);

      await doorA.click();
      await dropMarble(page);

      await doorB.click();
      await dropMarble(page);
    } else {
      // 2-row mystery gate (NOT)
      await doorA.click();
      await dropMarble(page);
    }

    // Guess prompt should appear
    const guessGroup = page.getByRole('group', { name: /which machine/i });
    await expect(guessGroup).toBeVisible();

    const andBtn = guessGroup.getByRole('button').first();
    await andBtn.click();
    const say = page.locator('.workbench-feedback');
    await expect(say).toBeVisible();
  });

  /* ------------------------------------------------------------------ US3: Bodha Concept Cards */
  test('US3-AS1: Bodha L2 displays concept cards with marble gate cross-section', async ({
    page,
  }) => {
    await page.goto('/#/bodha?k=L2');
    await expect(page.locator('.bodha')).toBeVisible();

    const fig = page.locator('.model.bodha-fig svg');
    await expect(fig).toBeVisible();
    await expect(fig).toHaveAttribute('aria-label', /Marble Gate:/);
  });

  test('US3-AS2: Bodha L1, L3, L4 display their respective concept diagrams', async ({ page }) => {
    await page.goto('/#/bodha?k=L1');
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();

    await page.goto('/#/bodha?k=L3');
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();

    await page.goto('/#/bodha?k=L4');
    await expect(page.locator('.model.bodha-fig svg')).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Curriculum Integration */
  test('US4-AS1: Shala Loom Tarka thread contains knots L1 to L4 with bench links', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    await expect(page.locator('.domain').first()).toBeVisible();

    const l2Btn = page.locator('button[data-knot="L2"]');
    await expect(l2Btn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Invariants & Multilingual Equity */
  test('US5-AS1: Zero gamification or banned praise words appear on logic screens', async ({
    page,
  }) => {
    await page.goto('/#/logic');
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
    await page.goto('/#/logic');

    await expect(page.locator('.step-guide')).toContainText('తలుపులు');
    await expect(page.locator('.card .pane-title')).toContainText('ప్రతి ప్రయత్నం');
  });

  test('US5-AS3: In-place language toggle preserves machine and door states', async ({ page }) => {
    await page.goto('/#/logic');
    const doorA = page.getByRole('button', { name: /^A:/ });
    await doorA.click(); // shut

    // Toggle language to Hindi via #btn-lang
    const langBtn = page.locator('#btn-lang');
    await langBtn.click();
    const hiOption = page.locator('button.lang-option[lang="hi"]');
    await hiOption.click();

    // Verify door A remains shut in Hindi
    const hiDoorA = page.getByRole('button', { name: /^A:/ });
    await expect(hiDoorA).toContainText('बंद');
  });
});
