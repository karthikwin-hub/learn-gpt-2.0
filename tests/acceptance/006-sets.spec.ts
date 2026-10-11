import { test, expect } from '@playwright/test';

test.describe('Feature 006: Sets threads (S1–S3), Sorting Courtyard, Venn Union & Intersection', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: S2 Sorting Courtyard */
  test('US1-AS1: Courtyard loads with 12 blocks, 2 rings, and universe boundary', async ({
    page,
  }) => {
    await page.goto('/#/sets');
    await expect(page.locator('.courtyard-manipulative')).toBeVisible();

    const blocks = page.locator('g.block');
    await expect(blocks).toHaveCount(12);

    const rings = page.locator('.ring-layer .handle');
    await expect(rings).toHaveCount(2);

    const counts = page.locator('.card .parts');
    await expect(counts).toBeVisible();
    await expect(counts).toContainText('In both');
    await expect(counts).toContainText('In neither');
  });

  test('US1-AS2: Counts card tallies exactly 12 blocks across 4 regions', async ({ page }) => {
    await page.goto('/#/sets');
    const parts = page.locator('.card .parts');
    await expect(parts).toContainText('In both: 2');
    await expect(parts).toContainText('Only A: 2');
    await expect(parts).toContainText('Only B: 2');
    await expect(parts).toContainText('In neither: 6');
  });

  test('US1-AS3: Tapping ring rule chip cycles rule and redistributes blocks', async ({ page }) => {
    await page.goto('/#/sets');
    const chipA = page.locator('.ring-chip-button').first();
    await chipA.click();

    // After cycling from yellow to big, counts update
    const parts = page.locator('.card .parts');
    await expect(parts).not.toContainText('yellow: 2');
  });

  test('US1-AS4: Word chips highlight intersection, union, and complement', async ({ page }) => {
    await page.goto('/#/sets');
    const andChip = page.getByRole('button', { name: 'and', exact: true });
    await expect(andChip).toBeVisible();
    await andChip.click();

    const hiNote = page.locator('.muted').first();
    await expect(hiNote).toContainText('yellow and circle');

    const orChip = page.getByRole('button', { name: 'or', exact: true });
    await orChip.click();
    await expect(hiNote).toContainText('yellow or circle');
  });

  test('US1-AS5: Apart layout leaves intersection blocks homeless with kumkum alert', async ({
    page,
  }) => {
    await page.goto('/#/sets');
    const apartChip = page.getByRole('button', { name: 'Apart' });
    await expect(apartChip).toBeVisible();
    await apartChip.click();

    const homelessNote = page.locator('.pointer-note');
    await expect(homelessNote).toBeVisible();
    await expect(homelessNote).toContainText('Where can they stand?');

    // Kumkum outline visible on homeless blocks
    const outlines = page.locator('g.block circle[opacity="1"]');
    await expect(outlines).toHaveCount(2);
  });

  /* ------------------------------------------------------------------ US2: S3 Mystery Rule Guessing */
  test('US2-AS1: Guess mode conceals ring rules behind question marks', async ({ page }) => {
    await page.goto('/#/sets?mode=guess');
    await expect(page.locator('.courtyard-manipulative')).toBeVisible();

    const chipTexts = page.locator('.ring-chip-button text');
    await expect(chipTexts.first()).toHaveText('?');
    await expect(chipTexts.nth(1)).toHaveText('?');
  });

  test('US2-AS2: Selecting matching rules solves the mystery', async ({ page }) => {
    await page.goto('/#/sets?mode=guess');

    // Default hidden rules in guess mode are green & big
    const ringA = page.locator('.pane-title.a-txt');
    await expect(ringA).toBeVisible();

    const greenBtn = page.getByRole('group', { name: 'ga' }).getByRole('button', { name: 'green' });
    await greenBtn.click();

    const bigBtn = page.getByRole('group', { name: 'gb' }).getByRole('button', { name: 'big' });
    await bigBtn.click();

    const say = page.locator('.workbench-feedback');
    await expect(say).toBeVisible();
    await expect(say).toContainText('Found them');
  });

  /* ------------------------------------------------------------------ US3: Bodha Concept Cards */
  test('US3-AS1: Bodha S2 displays concept cards with two-ring Venn diagram', async ({ page }) => {
    await page.goto('/#/bodha?k=S2');
    await expect(page.locator('.bodha')).toBeVisible();

    const fig = page.locator('.model.bodha-fig svg');
    await expect(fig).toBeVisible();
    await expect(fig).toContainText('yellow');
    await expect(fig).toContainText('circle');
  });

  test('US3-AS2: Bodha S3 displays mystery rule concept cards', async ({ page }) => {
    await page.goto('/#/bodha?k=S3');
    await expect(page.locator('.bodha')).toBeVisible();

    const fig = page.locator('.model.bodha-fig svg');
    await expect(fig).toBeVisible();
  });

  /* ------------------------------------------------------------------ US4: Curriculum Integration */
  test('US4-AS1: Shala Loom Tarka thread contains knots S1 to S3 with bench links', async ({
    page,
  }) => {
    await page.goto('/#/shala?s=ganita');
    await expect(page.locator('.domain').first()).toBeVisible();

    const s2Btn = page.locator('button[data-knot="S2"]');
    await expect(s2Btn).toBeVisible();

    const s3Btn = page.locator('button[data-knot="S3"]');
    await expect(s3Btn).toBeVisible();
  });

  /* ------------------------------------------------------------------ US5: Calm Invariants & Multilingual Equity */
  test('US5-AS1: Zero gamification or banned praise words appear on sets screens', async ({
    page,
  }) => {
    await page.goto('/#/sets');
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
    await page.goto('/#/sets');

    await expect(page.locator('.step-guide')).toContainText('వలయం');
    await expect(page.locator('.card .pane-title')).toContainText('ఎన్ని');
  });

  test('US5-AS3: In-place language toggle preserves courtyard state', async ({ page }) => {
    await page.goto('/#/sets');
    const apartChip = page.getByRole('button', { name: 'Apart' });
    await apartChip.click();

    // Toggle language to Hindi via #btn-lang
    const langBtn = page.locator('#btn-lang');
    await langBtn.click();
    const hiOption = page.locator('button.lang-option[lang="hi"]');
    await hiOption.click();

    // Outlines on homeless blocks should still be present
    const outlines = page.locator('g.block circle[opacity="1"]');
    await expect(outlines).toHaveCount(2);
  });
});
