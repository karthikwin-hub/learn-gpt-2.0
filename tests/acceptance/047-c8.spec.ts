import { test, expect } from '@playwright/test';

const ORDER = ['Gangotri', 'Haridwar', 'Prayagraj', 'Varanasi', 'Patna', 'Sundarbans'];

test.describe('047 US14 C8 Rivers of India (#rivers)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/rivers');
    await expect(page.locator('.screen-title')).toContainText('Follow a river');
  });

  const order = (page: import('@playwright/test').Page) =>
    page.getByRole('group', { name: /in the order the water passes them/ });

  async function toOrder(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Follow the river' }).click();
    await page.getByRole('button', { name: 'Put the places in order' }).click();
  }

  test('US14-AS1: "Follow the river" shows the six places and their heights', async ({ page }) => {
    await page.getByRole('button', { name: 'Follow the river' }).click();
    await expect(page.locator('.say')).toContainText('0 metres at the Sundarbans');
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      'The Ganga, from the Gangotri glacier in the Himalaya east to the sea. Gangotri, about 4,000 metres; Haridwar, about 300 metres; Prayagraj, about 100 metres; Varanasi, about 80 metres; Patna, about 50 metres; Sundarbans, about 0 metres.'
    );
  });

  test('US14-AS2: a place out of order gets the downhill hint; the right order is done', async ({
    page,
  }) => {
    await toOrder(page);
    await order(page).getByRole('button', { name: 'Patna' }).click();
    await expect(page.locator('.say')).toContainText('Water only flows downhill');
    for (const p of ORDER) await order(page).getByRole('button', { name: p }).click();
    await expect(page.locator('.say')).toContainText('not down the map');
  });

  test('US14-AS3: choosing the snow-fed river for April completes the bench', async ({ page }) => {
    await toOrder(page);
    for (const p of ORDER) await order(page).getByRole('button', { name: p }).click();
    const which = page.getByRole('group', { name: 'In April, which river still flows?' });
    await which.getByRole('button', { name: 'Fed only by rain' }).click();
    await expect(page.locator('.say')).toContainText('the monsoon has not come yet');
    await which.getByRole('button', { name: 'Fed by Himalayan snow' }).click();
    await expect(page.locator('.say')).toContainText('The snow-fed river.');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
