import { test, expect } from '@playwright/test';

test.describe('047 US8 C2 Farms of India (#farms)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/farms');
    await expect(page.locator('.screen-title')).toContainText('A year on the farm');
  });

  async function sow(page: import('@playwright/test').Page, crop: string, season: RegExp) {
    const chip = page.getByRole('button', { name: crop, exact: true });
    if ((await chip.getAttribute('aria-pressed')) !== 'true') await chip.click();
    await page.locator('.loka-place', { hasText: season }).click();
  }

  async function toSowing(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Turn the year' }).click();
    await page.getByRole('button', { name: 'Sow the crops' }).click();
  }

  async function sowSix(page: import('@playwright/test').Page) {
    const crops: [string, RegExp][] = [
      ['Rice', /^Kharif/],
      ['Cotton', /^Kharif/],
      ['Wheat', /^Rabi/],
      ['Mustard', /^Rabi/],
      ['Watermelon', /^Zaid/],
      ['Cucumber', /^Zaid/],
    ];
    for (const [crop, season] of crops) await sow(page, crop, season);
  }

  test('US8-AS1: "Turn the year" shows the three seasons and their months', async ({ page }) => {
    await page.getByRole('button', { name: 'Turn the year' }).click();
    await expect(page.getByRole('button', { name: 'Sow the crops' })).toBeVisible();
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      'Kharif: June, July; Rabi: October to December; Zaid: March, April'
    );
  });

  test('US8-AS2: a crop in the wrong season gets its reason; six right shows the done line', async ({
    page,
  }) => {
    await toSowing(page);
    await sow(page, 'Wheat', /^Kharif/);
    await expect(page.locator('.say')).toContainText('Wheat needs cool winter days');
    await sowSix(page);
    await expect(page.locator('.say')).toContainText('All six are sown in their seasons');
  });

  test('US8-AS3: rice for July, wheat for November, watermelon for April completes the bench', async ({
    page,
  }) => {
    await toSowing(page);
    await sowSix(page);
    const pick = (month: string, crop: string) =>
      page
        .getByRole('group', { name: `A field in ${month}. Which crop do you sow?` })
        .getByRole('button', { name: crop, exact: true })
        .click();
    await pick('July', 'Wheat');
    await expect(page.locator('.say')).toContainText('Wheat needs cool winter days');
    await pick('July', 'Rice');
    await pick('November', 'Wheat');
    await pick('April', 'Watermelon');
    await expect(page.locator('.say')).toContainText('each crop in its own season');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
