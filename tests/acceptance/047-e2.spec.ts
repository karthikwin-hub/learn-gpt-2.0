import { test, expect } from '@playwright/test';

test.describe('047 US5 E2 Land, water, air and life (#domains)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/domains');
    await expect(page.locator('.screen-title')).toContainText('Land, water, air and life');
  });

  async function fill(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Fill the Earth' }).click();
    await expect(page.locator('.say')).toContainText('71 squares are water and 29 are land');
    await page.getByRole('button', { name: 'Sort the domains' }).click();
  }

  async function place(page: import('@playwright/test').Page, thing: string, sphere: RegExp) {
    const chip = page.getByRole('button', { name: thing, exact: true });
    if ((await chip.getAttribute('aria-pressed')) !== 'true') await chip.click();
    await page.locator('.loka-place', { hasText: sphere }).click();
  }

  async function sortAll(page: import('@playwright/test').Page) {
    const things: [string, RegExp][] = [
      ['a mountain', /^Lithosphere/],
      ['soil', /^Lithosphere/],
      ['an ocean', /^Hydrosphere/],
      ['a river', /^Hydrosphere/],
      ['oxygen', /^Atmosphere/],
      ['the wind', /^Atmosphere/],
      ['a tree', /^Biosphere/],
      ['a fish', /^Biosphere/],
    ];
    for (const [thing, sphere] of things) await place(page, thing, sphere);
  }

  test('US5-AS1: "Fill the Earth" shows 71 water squares and 29 land squares', async ({ page }) => {
    await page.getByRole('button', { name: 'Fill the Earth' }).click();
    await expect(page.getByRole('button', { name: 'Sort the domains' })).toBeVisible();
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      '71 water squares, 29 land squares'
    );
  });

  test('US5-AS2: a wrong domain gets its reason; all eight placed shows the done line', async ({
    page,
  }) => {
    await fill(page);
    await place(page, 'a river', /^Lithosphere/);
    await expect(page.locator('.say')).toContainText('A river is flowing water');
    await sortAll(page);
    await expect(page.locator('.say')).toContainText('All eight are sorted');
  });

  test('US5-AS3: after pouring out salt water and ice, 71 gets the reason and 1 completes', async ({
    page,
  }) => {
    await fill(page);
    await sortAll(page);
    await page.getByRole('button', { name: 'Pour out the salty water (97)' }).click();
    await expect(page.locator('.say')).toContainText('3 drops are left');
    await page.getByRole('button', { name: 'Pour out the ice (2)' }).click();
    await page.getByRole('button', { name: '71', exact: true }).click();
    await expect(page.locator('.say')).toContainText('not how much water we can use');
    await page.getByRole('button', { name: '1', exact: true }).click();
    await expect(page.locator('.say')).toContainText('About 1 drop in 100');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
