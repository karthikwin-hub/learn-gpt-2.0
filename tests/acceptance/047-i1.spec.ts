import { test, expect } from '@playwright/test';

test.describe('047 US1 I1 Clues from the past (#dig)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/dig');
    await expect(page.locator('.screen-title')).toContainText('Clues from the past');
  });

  async function dig(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Dig down' }).click();
    await expect(page.locator('.say')).toContainText('so it is the oldest');
  }

  async function sortAll(page: import('@playwright/test').Page) {
    const kinds: [string, RegExp][] = [
      ['coin', /^Archaeological/],
      ['inscription', /^Archaeological/],
      ['clay pot', /^Archaeological/],
      ['seal', /^Archaeological/],
      ['manuscript', /^Literary/],
      ['traveller’s diary', /^Literary/],
    ];
    for (const [clue, kind] of kinds) {
      await page.getByRole('button', { name: clue, exact: true }).click();
      await page.locator('.loka-place', { hasText: kind }).click();
    }
  }

  test('US1-AS1: digging down reveals four layers and explains that deeper is older', async ({
    page,
  }) => {
    await dig(page);
    await expect(page.locator('.model svg')).toHaveAttribute('aria-label', /seal/);
  });

  test('US1-AS2: an inscription is an archaeological source; six sorted shows the done line', async ({
    page,
  }) => {
    await dig(page);
    await page.getByRole('button', { name: 'inscription', exact: true }).click();
    await page.locator('.loka-place', { hasText: /^Literary/ }).click();
    await expect(page.locator('.say')).toContainText('so it is an archaeological source');
    await sortAll(page);
    await expect(page.locator('.say')).toContainText('All six are sorted');
  });

  test('US1-AS3: the finds go oldest first, deepest layer first', async ({ page }) => {
    await dig(page);
    await sortAll(page);
    await page.getByRole('button', { name: 'coin', exact: true }).click();
    await expect(page.locator('.say')).toContainText('Is that the deepest one left?');
    for (const find of ['seal', 'clay pot', 'inscription', 'coin']) {
      await page.getByRole('button', { name: find, exact: true }).click();
    }
    await expect(page.locator('.say')).toContainText('The seal is the oldest');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
