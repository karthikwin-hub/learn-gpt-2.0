import { test, expect } from '@playwright/test';

test.describe('047 US6 E3 Mountains, plateaus, plains (#landforms)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/landforms');
    await expect(page.locator('.screen-title')).toContainText('Shapes of the land');
  });

  async function pick(page: import('@playwright/test').Page, group: string, name: string) {
    await page
      .getByRole('group', { name: group })
      .getByRole('button', { name, exact: true })
      .click();
  }

  async function buildAll(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Raise the land' }).click();
    await page.getByRole('button', { name: 'Build the landforms' }).click();
    await expect(page.locator('.say')).toContainText('Build a plateau');
    await pick(page, 'Height', 'High');
    await expect(page.locator('.say')).toContainText('High and flat: a plateau');
    await pick(page, 'Top', 'Peaked');
    await expect(page.locator('.say')).toContainText('High and peaked: a mountain');
    await pick(page, 'Height', 'Low');
    await expect(page.locator('.say')).toContainText('a hill, which is not one of the three');
    await pick(page, 'Top', 'Flat');
  }

  test('US6-AS1: "Raise the land" lifts flat land into a mountain, a plateau and a plain', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Raise the land' }).click();
    await expect(page.getByRole('button', { name: 'Build the landforms' })).toBeVisible();
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      'Mountain, Plateau, Plain'
    );
  });

  test('US6-AS2: height and top build a plateau, a mountain and a plain in turn', async ({
    page,
  }) => {
    await buildAll(page);
    await expect(page.locator('.say')).toContainText('All three are built');
  });

  test('US6-AS3: mountains get their reason; plains complete and offer the mistake', async ({
    page,
  }) => {
    await buildAll(page);
    await pick(page, 'Where do most people live and farm?', 'Mountain');
    await expect(page.locator('.say')).toContainText('few people can farm there');
    await pick(page, 'Where do most people live and farm?', 'Plain');
    await expect(page.locator('.say')).toContainText('Plains: flat land');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
