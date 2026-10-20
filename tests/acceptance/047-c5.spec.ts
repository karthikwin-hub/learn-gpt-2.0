import { test, expect } from '@playwright/test';

test.describe('047 US11 C5 The northern plains (#plains)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/plains');
    await expect(page.locator('.screen-title')).toContainText('Build the plains');
  });

  async function fill(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Let it rain' }).click();
    await page.getByRole('button', { name: 'Send floods' }).click();
    for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Send a flood' }).click();
  }

  test('US11-AS1: "Let it rain" shows silt moving down the river', async ({ page }) => {
    await page.getByRole('button', { name: 'Let it rain' }).click();
    await expect(page.locator('.say')).toContainText('called silt, down to the low land');
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      'Rain on the mountains; the river carries silt down to the low land.'
    );
  });

  test('US11-AS2: four floods fill the low land into a flat plain', async ({ page }) => {
    await page.getByRole('button', { name: 'Let it rain' }).click();
    await page.getByRole('button', { name: 'Send floods' }).click();
    await page.getByRole('button', { name: 'Send a flood' }).click();
    await expect(page.locator('.say')).toContainText('Flood 1: the water spreads out');
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      'Layers of silt in the low land: 1 of 4.'
    );
    for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'Send a flood' }).click();
    await expect(page.locator('.say')).toContainText('Four floods, four layers');
  });

  test('US11-AS3: the chain in order completes the bench; a wrong link gets the hint', async ({
    page,
  }) => {
    await fill(page);
    const chain = page.getByRole('group', { name: /five links of the chain/ });
    await chain.getByRole('button', { name: 'A flood spreads it out' }).click();
    await expect(page.locator('.say')).toContainText('Start where the water starts');
    for (const link of [
      'Rain falls on the mountains',
      'The river picks up soil',
      'A flood spreads it out',
      'A new layer of silt settles',
      'Crops grow well',
    ])
      await chain.getByRole('button', { name: link }).click();
    await expect(page.locator('.say')).toContainText(
      'that is how rivers built the northern plains'
    );
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      'A flat plain of silt, with crops and a house.'
    );
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
