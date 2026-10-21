import { test, expect } from '@playwright/test';

test.describe('047 US7 C1 The states of India (#states)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/states');
    await expect(page.locator('.screen-title')).toContainText('States of India');
  });

  async function chooseTelangana(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Show India' }).click();
    await page.getByRole('button', { name: 'Choose my state' }).click();
    await page.getByLabel('My state').selectOption('telangana');
  }

  test('US7-AS1: "Show India" shows the map of India, 36 regions with union territories marked, and its source', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Show India' }).click();
    await expect(page.getByRole('button', { name: 'Choose my state' })).toBeVisible();
    const map = page.locator('.model svg').first();
    await expect(map).toHaveAttribute(
      'aria-label',
      /Map of India: 28 states and 8 union territories/
    );
    await expect(map.locator('[data-region]')).toHaveCount(36);
    await expect(map.locator('[data-region][data-kind="ut"]')).toHaveCount(8);
    await expect(map).toContainText('Boundaries: Survey of India');
  });

  test('US7-AS2: choosing Telangana shows Hyderabad, Telugu and its four neighbours', async ({
    page,
  }) => {
    await chooseTelangana(page);
    const say = page.locator('.say');
    await expect(say).toContainText('the capital is Hyderabad');
    await expect(say).toContainText('The main language is Telugu');
    await expect(say).toContainText('shares a border with 4 states and union territories');
  });

  test('US7-AS3: a non-neighbour gets a reason; all four neighbours complete the bench', async ({
    page,
  }) => {
    await chooseTelangana(page);
    await page.getByRole('button', { name: 'Find the neighbours' }).click();
    const row = page.getByRole('group', { name: 'Which of these share a border with Telangana?' });
    await row.getByRole('button', { name: 'Odisha', exact: true }).click();
    await expect(page.locator('.say')).toContainText('Odisha does not touch Telangana');
    for (const name of ['Maharashtra', 'Chhattisgarh', 'Andhra Pradesh', 'Karnataka']) {
      await row.getByRole('button', { name, exact: true }).click();
    }
    await expect(page.locator('.say')).toContainText('Every neighbour of Telangana is found');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
