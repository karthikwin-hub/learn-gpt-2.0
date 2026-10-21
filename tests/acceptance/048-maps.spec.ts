import { test, expect, type Page } from '@playwright/test';

const KUMKUM = 'var(--kumkum)';
const FOUND = '#A8B86A';

async function open(page: Page, route: string): Promise<void> {
  await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
  await page.goto(route);
  await page.locator('#view').waitFor();
}

const region = (page: Page, id: string) => page.locator(`.model svg [data-region="${id}"]`);

test.describe('048 US1 A real map of India', () => {
  test('US1-AS1: the C1 bench shows India from the boundary data, one shape per region, with its source', async ({
    page,
  }) => {
    await open(page, '/#/states');
    await page.getByRole('button', { name: 'Show India' }).click();
    await expect(page.getByRole('button', { name: 'Choose my state' })).toBeVisible();
    const map = page.locator('.model svg').first();
    await expect(map.locator('path[data-region]')).toHaveCount(36);
    await expect(map).toContainText('Boundaries: Survey of India');
  });

  test('US1-AS2: choosing my state marks it, and each neighbour found is marked too', async ({
    page,
  }) => {
    await open(page, '/#/states');
    await page.getByRole('button', { name: 'Show India' }).click();
    await page.getByRole('button', { name: 'Choose my state' }).click();
    await page.getByLabel('My state').selectOption('telangana');
    await expect(region(page, 'telangana')).toHaveAttribute('fill', KUMKUM);
    await page.getByRole('button', { name: 'Find the neighbours' }).click();
    await expect(region(page, 'karnataka')).not.toHaveAttribute('fill', FOUND);
    await page.getByRole('button', { name: 'Karnataka', exact: true }).click();
    await expect(region(page, 'karnataka')).toHaveAttribute('fill', FOUND);
    await expect(region(page, 'telangana')).toHaveAttribute('fill', KUMKUM);
  });

  test('US1-AS3: the C9 bench lights the four festival states on the same map', async ({
    page,
  }) => {
    await open(page, '/#/unity');
    await page.getByRole('button', { name: 'Light up January' }).click();
    await expect(page.getByRole('button', { name: 'Match the festivals' })).toBeVisible();
    await expect(page.locator('.model svg [data-region]')).toHaveCount(36);
    for (const id of ['tn', 'punjab', 'assam', 'gujarat'])
      await expect(region(page, id)).toHaveAttribute('fill', FOUND);
    await expect(region(page, 'kerala')).not.toHaveAttribute('fill', FOUND);
  });
});
