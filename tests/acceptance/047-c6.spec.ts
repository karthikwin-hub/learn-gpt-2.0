import { test, expect } from '@playwright/test';

test.describe('047 US12 C6 The Thar Desert (#desert)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/desert');
    await expect(page.locator('.screen-title')).toContainText('A day in the Thar');
  });

  const pick = (page: import('@playwright/test').Page, group: string, name: string) =>
    page.getByRole('group', { name: group }).getByRole('button', { name, exact: true }).click();

  async function toThings(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Run the day' }).click();
    await page.getByRole('button', { name: 'Find the coldest time' }).click();
    await pick(page, 'Season', 'Winter');
    await pick(page, 'Time of day', '6 in the morning');
  }

  async function match(page: import('@playwright/test').Page, thing: string, help: RegExp) {
    const chip = page.getByRole('button', { name: thing, exact: true });
    if ((await chip.getAttribute('aria-pressed')) !== 'true') await chip.click();
    await page.locator('.loka-place', { hasText: help }).click();
  }

  test('US12-AS1: "Run the day" shows the big Thar swing and the small seaside swing', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Run the day' }).click();
    await expect(page.locator('.say')).toContainText('a swing of 20');
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      /In one day the Thar swings 20\s°C; the seaside town only 7\s°C\./
    );
  });

  test('US12-AS2: a winter Thar hour at 6 °C or below shows the done line', async ({ page }) => {
    await page.getByRole('button', { name: 'Run the day' }).click();
    await page.getByRole('button', { name: 'Find the coldest time' }).click();
    await pick(page, 'Time of day', 'Midnight');
    await expect(page.locator('.say')).toContainText('Summer, Midnight: Thar');
    await pick(page, 'Season', 'Winter');
    await expect(page.locator('.say')).not.toContainText('not always hot');
    await pick(page, 'Time of day', '6 in the morning');
    await expect(page.locator('.say')).toContainText(/Thar 5\s°C/);
    await expect(page.locator('.say')).toContainText('not always hot');
  });

  test('US12-AS3: four right matches complete the bench', async ({ page }) => {
    await toThings(page);
    await match(page, "A camel's wide, soft feet", /^Store rainwater/);
    await expect(page.locator('.say')).toContainText('walking on soft sand');
    await match(page, "A camel's wide, soft feet", /^Walk on soft sand/);
    await match(page, "A khejri tree's deep roots", /^Reach water/);
    await match(page, 'A kund', /^Store rainwater/);
    await match(page, 'Thick mud walls', /^Keep a house cool/);
    await expect(page.locator('.say')).toContainText('All four matched');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
