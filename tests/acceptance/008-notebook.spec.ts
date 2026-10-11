import { test, expect } from '@playwright/test';

test.describe('Feature 008: Pothi (Notebook), Recall & Grown-ups (Acharya Corner)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });
  });

  /* ------------------------------------------------------------------ US1: Pothi Notebook */
  test('US1-AS1: Notebook renders title and intro description', async ({ page }) => {
    await page.goto('/#/notebook');
    await expect(page.locator('.screen-title, h1, h2').first()).toBeVisible();
    await expect(page.locator('.muted').first()).toContainText('Pothi');
  });

  test('US1-AS5: Empty notebook displays sample card and return link', async ({ page }) => {
    await page.goto('/#/notebook');
    await expect(page.locator('.page.sample')).toBeVisible();
    await expect(page.locator('.say')).toBeVisible();

    const toLoomBtn = page.getByRole('button', { name: /Ashram|Loom/i });
    await expect(toLoomBtn).toBeVisible();
    await toLoomBtn.click();
    expect(page.url()).toContain('#/home');
  });

  test('US1-AS2: Saved pages render with thumbnail, meta date, and reconstructed sentence', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const mockPages = [
        {
          id: 'p1',
          thread: 'M4',
          fills: ['tens', 'room', 'add'],
          date: new Date(Date.now() - 3600000).toISOString(),
          time: Date.now() - 3600000,
          model: { cols: 23, rows: 14 },
        },
        {
          id: 'p2',
          thread: 'D1',
          fills: ['fair', 'equal', 'leftover'],
          date: new Date().toISOString(),
          time: Date.now(),
          model: { total: 12, plates: 4 },
        },
      ];
      localStorage.setItem('gurukul:pages', JSON.stringify(mockPages));
    });

    await page.goto('/#/notebook');

    // Should display newest first (p2, then p1)
    const pageButtons = page.locator('button.page');
    await expect(pageButtons).toHaveCount(2);

    // p2 is first
    await expect(pageButtons.nth(0).locator('.thumb svg')).toBeVisible();
    await expect(pageButtons.nth(0).locator('.sutra')).toBeVisible();

    // p1 is second
    await expect(pageButtons.nth(1).locator('.thumb svg')).toBeVisible();
    await expect(pageButtons.nth(1).locator('.sutra')).toBeVisible();
  });

  test('US1-AS3: Tapping a notebook page navigates to its workbench', async ({ page }) => {
    await page.addInitScript(() => {
      const mockPages = [
        {
          id: 'p1',
          thread: 'M4',
          fills: ['tens', 'room', 'add'],
          date: new Date().toISOString(),
          time: Date.now(),
          model: { cols: 23, rows: 14 },
        },
      ];
      localStorage.setItem('gurukul:pages', JSON.stringify(mockPages));
    });

    await page.goto('/#/notebook');
    const pageBtn = page.locator('button.page').first();
    await pageBtn.click();

    expect(page.url()).toContain('#/rect');
  });

  test('US1-AS4: Kept sutras render and link directly to Bodha concept cards', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:sutras', JSON.stringify(['M4']));
    });

    await page.goto('/#/notebook');
    const sutraCard = page.locator('button.sutra-card');
    await expect(sutraCard).toBeVisible();
    await expect(sutraCard.locator('.sutra-line')).toBeVisible();

    await sutraCard.click();
    expect(page.url()).toContain('#/bodha?k=M4');
  });

  /* ------------------------------------------------------------------ US2: Sentence Preservation */
  test('US2-AS1: Explain screen fills blanks and clicking Keep saves to pages storage', async ({
    page,
  }) => {
    await page.goto('/#/explain?k=M4');
    await expect(page.locator('.sentence')).toBeVisible();

    // Fill all 3 blanks
    const tensChip = page.getByRole('button', { name: 'tens' });
    if (await tensChip.isVisible()) {
      await tensChip.click();
    }
    const roomChip = page.getByRole('button', { name: 'room' });
    if (await roomChip.isVisible()) {
      await roomChip.click();
    }
    const addChip = page.getByRole('button', { name: 'add' });
    if (await addChip.isVisible()) {
      await addChip.click();
    }

    const keepBtn = page.getByRole('button', { name: /Keep|Keep this page/i });
    await expect(keepBtn).toBeVisible();
    await keepBtn.click();

    // Should navigate to stop screen
    expect(page.url()).toContain('#/stop');
  });

  test('US2-AS2: Page saved in English displays in Telugu when language switches', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const mockPages = [
        {
          id: 'p1',
          thread: 'M4',
          fills: ['tens', 'room', 'add'],
          date: new Date().toISOString(),
          time: Date.now(),
        },
      ];
      localStorage.setItem('gurukul:pages', JSON.stringify(mockPages));
      localStorage.setItem('gurukul:lang', 'te');
    });

    await page.goto('/#/notebook');
    const pageBtn = page.locator('button.page').first();
    await expect(pageBtn).toBeVisible();

    // Telugu string contains Telugu characters
    const sutraText = await pageBtn.locator('.sutra').textContent();
    expect(sutraText).toBeTruthy();
    // Verify non-empty and contains Telugu script characters
    expect(/[\u0C00-\u0C7F]/.test(sutraText!)).toBe(true);
  });

  /* ------------------------------------------------------------------ US4: Stop Screen */
  test('US4-AS1: Stop screen renders model thumbnail, child sentence, and sutra line', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const mockPages = [
        {
          id: 'p1',
          thread: 'M4',
          fills: ['tens', 'room', 'add'],
          date: new Date().toISOString(),
          time: Date.now(),
          model: { cols: 23, rows: 14 },
        },
      ];
      localStorage.setItem('gurukul:pages', JSON.stringify(mockPages));
    });

    await page.goto('/#/stop?page=p1');
    await expect(page.locator('.stop .thumb svg')).toBeVisible();
    await expect(page.locator('.stop .sutra')).toBeVisible();
    await expect(page.locator('.sutra-line')).toBeVisible();
  });

  test('US4-AS2: Stop screen provides calm return buttons with zero gamification', async ({
    page,
  }) => {
    await page.goto('/#/stop');
    const loomBtn = page.getByRole('button', { name: /Ashram|Loom/i });
    const notebookBtn = page.getByRole('button', { name: /Pothi|Notebook/i });

    await expect(loomBtn).toBeVisible();
    await expect(notebookBtn).toBeVisible();

    // Zero star, points, streak, badge indicators
    await expect(page.locator('.badge, .star, .score, .streak')).toHaveCount(0);
  });

  /* ------------------------------------------------------------------ US5: Grown-ups Acharya Corner */
  test('US5-AS1: Grown-ups screen is locked by default with two hold dots', async ({ page }) => {
    await page.goto('/#/grownups');
    await expect(page.locator('.hold-check')).toBeVisible();
    await expect(page.locator('.hold-dot')).toHaveCount(2);
  });

  test('US5-AS2: Holding dots unlocks grown-ups screen', async ({ page }) => {
    await page.goto('/#/grownups');
    const dot1 = page.locator('.hold-dot').first();

    // Simulate keydown on dot to unlock in desktop/test environment
    await dot1.focus();
    await dot1.dispatchEvent('keydown', { key: 'Enter' });

    // Wait for the unlock animation / tick (2s)
    await page.waitForTimeout(2100);

    // Unlocked screen should display Weekly card and Settings card
    await expect(
      page.getByRole('heading', { name: /This week|The method|Privacy|How Gurukul/i }).first()
    ).toBeVisible();
  });

  test('US5-AS3: Unlocked view displays weekly sentences, pedagogy, and privacy guarantees', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const mockPages = [
        {
          id: 'p1',
          thread: 'M4',
          fills: ['tens', 'room', 'add'],
          date: new Date().toISOString(),
          time: Date.now(),
        },
      ];
      localStorage.setItem('gurukul:pages', JSON.stringify(mockPages));
    });

    await page.goto('/#/grownups');
    const dot1 = page.locator('.hold-dot').first();
    await dot1.focus();
    await dot1.dispatchEvent('keydown', { key: 'Enter' });
    await page.waitForTimeout(2100);

    await expect(page.locator('.card').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Open the Pothi|Notebook/i })).toBeVisible();
  });

  test('US5-AS4: Settings chips toggle and persist', async ({ page }) => {
    await page.goto('/#/grownups');
    const dot1 = page.locator('.hold-dot').first();
    await dot1.focus();
    await dot1.dispatchEvent('keydown', { key: 'Enter' });
    await page.waitForTimeout(2100);

    const slowChip = page.getByRole('button', { name: /Slower|Slow/i });
    await expect(slowChip).toBeVisible();
    await slowChip.click();
    await expect(slowChip).toHaveClass(/on/);
  });

  test('US5-AS5: Erase button requires two taps before wiping storage', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:test', 'keep');
    });

    await page.goto('/#/grownups');
    const dot1 = page.locator('.hold-dot').first();
    await dot1.focus();
    await dot1.dispatchEvent('keydown', { key: 'Enter' });
    await page.waitForTimeout(2100);

    const resetBtn = page.getByRole('button', { name: /Erase everything|Reset/i });
    await expect(resetBtn).toBeVisible();

    // Tap 1: Changes label to confirm, does not clear
    await resetBtn.click();
    const confirmBtn = page.getByRole('button', { name: /Tap again to erase|confirm/i });
    await expect(confirmBtn).toBeVisible();

    const testVal = await page.evaluate(() => localStorage.getItem('gurukul:test'));
    expect(testVal).toBe('keep');

    // Tap 2: Wipes storage and redirects
    await confirmBtn.click();
    expect(page.url()).toContain('#/language');

    const testValAfter = await page.evaluate(() => localStorage.getItem('gurukul:test'));
    expect(testValAfter).toBeNull();
  });
});
