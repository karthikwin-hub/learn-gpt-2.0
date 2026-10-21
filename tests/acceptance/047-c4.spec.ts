import { test, expect } from '@playwright/test';

test.describe('047 US10 C4 The Himalaya (#himalaya)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/himalaya');
    await expect(page.locator('.screen-title')).toContainText('Climb the Himalaya');
  });

  async function toSteps(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Climb', exact: true }).click();
    await page.getByRole('button', { name: 'Climb again, step by step' }).click();
  }

  async function toFreezing(page: import('@playwright/test').Page) {
    for (let i = 0; i < 5; i++)
      await page.getByRole('button', { name: 'Climb 1,000 metres' }).click();
  }

  test('US10-AS1: "Climb" shows the three ranges and the temperature falling to below freezing', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Climb', exact: true }).click();
    await expect(page.locator('.say')).toContainText('−7 °C at 6,000 metres');
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      'Shivalik, Himachal, Himadri. At 6,000 metres it is −7 °C.'
    );
  });

  test('US10-AS2: climbing 1,000 metres at a time reads each temperature and finds freezing at 5,000 metres', async ({
    page,
  }) => {
    await toSteps(page);
    await page.getByRole('button', { name: 'Climb 1,000 metres' }).click();
    await expect(page.locator('.say')).toContainText('At 1,000 metres it is 25.5 °C.');
    for (let i = 0; i < 3; i++)
      await page.getByRole('button', { name: 'Climb 1,000 metres' }).click();
    await expect(page.locator('.say')).toContainText('At 4,000 metres it is 6 °C.');
    await page.getByRole('button', { name: 'Climb 1,000 metres' }).click();
    await expect(page.locator('.say')).toContainText('At 5,000 metres it is −0.5 °C.');
    await expect(page.locator('.say')).toContainText('water freezes here');
  });

  test('US10-AS3: the ranges go in order from the plains; out of order gets a hint', async ({
    page,
  }) => {
    await toSteps(page);
    await toFreezing(page);
    const order = page.getByRole('group', { name: /Put the three ranges in order/ });
    await order.getByRole('button', { name: 'Himadri' }).click();
    await expect(page.locator('.say')).toContainText('Start from the plains');
    await order.getByRole('button', { name: 'Shivalik' }).click();
    await order.getByRole('button', { name: 'Himachal' }).click();
    await order.getByRole('button', { name: 'Himadri' }).click();
    await expect(page.locator('.say')).toContainText('the highest is the coldest');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
