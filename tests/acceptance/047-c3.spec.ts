import { test, expect } from '@playwright/test';

test.describe('047 US9 C3 Cities of India (#cities)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/cities');
    await expect(page.locator('.screen-title')).toContainText('Where cities grow');
  });

  const site = (page: import('@playwright/test').Page, name: string) =>
    page
      .getByRole('group', { name: 'Where do you build?' })
      .getByRole('button', { name: new RegExp(`^\\d\\. ${name}$`) })
      .click();

  async function match(page: import('@playwright/test').Page, city: string, reason: RegExp) {
    const chip = page.getByRole('button', { name: city, exact: true });
    if ((await chip.getAttribute('aria-pressed')) !== 'true') await chip.click();
    await page.locator('.loka-place', { hasText: reason }).click();
  }

  test('US9-AS1: "Let time pass" grows the river-bank settlement into a city', async ({ page }) => {
    await page.getByRole('button', { name: 'Let time pass' }).click();
    await expect(page.getByRole('button', { name: 'Try other places' })).toBeVisible();
    await expect(page.locator('.model svg')).toHaveAttribute('aria-label', 'River bank: a city');
  });

  test('US9-AS2: a site missing something says what; the site with all three becomes a city', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Let time pass' }).click();
    await page.getByRole('button', { name: 'Try other places' }).click();
    await site(page, 'Dry crossroads');
    await expect(page.locator('.say')).toContainText('It grows into a town. There is no water.');
    await site(page, 'Dry hilltop');
    await expect(page.locator('.say')).toContainText('No one settles here.');
    await site(page, 'River bank');
    await expect(page.locator('.say')).toContainText('so it grows into a city');
  });

  test('US9-AS3: four right matches complete the bench; a wrong one gets a hint', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Let time pass' }).click();
    await page.getByRole('button', { name: 'Try other places' }).click();
    await site(page, 'River bank');
    await match(page, 'Mumbai', /^A river port/);
    await expect(page.locator('.say')).toContainText('Mumbai grew on islands in the sea');
    await match(page, 'Mumbai', /^A deep, safe harbour/);
    await match(page, 'Kolkata', /^A river port/);
    await match(page, 'Delhi', /^A river where old roads/);
    await match(page, 'Bengaluru', /^Cool air/);
    await expect(page.locator('.say')).toContainText('All four matched');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
