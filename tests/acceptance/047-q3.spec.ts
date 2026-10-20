import { test, expect } from '@playwright/test';

test.describe('047 US4 Q3 Pollution and us (#river)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/river');
    await expect(page.locator('.screen-title')).toContainText('A river village');
  });

  const CAUSES = [
    'Factory smoke and waste',
    'Sewage from homes',
    'Burning leaves',
    'Plastic on the bank',
    'Trucks and horns',
  ];

  async function showDay(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Show the day' }).click();
    await expect(page.locator('.say')).toContainText('By evening');
  }

  async function switchAllOff(page: import('@playwright/test').Page) {
    for (const c of CAUSES) await page.getByRole('button', { name: c }).click();
  }

  test('US4-AS1: "Show the day" switches every cause on and the readings rise', async ({
    page,
  }) => {
    await showDay(page);
    for (const c of CAUSES) {
      await expect(page.getByRole('button', { name: c })).toHaveAttribute('aria-pressed', 'true');
    }
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      'Air: very dirty, Water: very dirty, Land: a little dirty, Noise: a little dirty'
    );
  });

  test('US4-AS2: switching every cause off makes all four readings clean', async ({ page }) => {
    await showDay(page);
    await page.getByRole('button', { name: 'Burning leaves' }).click();
    await expect(page.locator('.say')).toContainText('the air gets cleaner');
    await page.getByRole('button', { name: 'Burning leaves' }).click();
    await expect(page.locator('.say')).toContainText('back on');
    await switchAllOff(page);
    await expect(page.locator('.say')).toContainText('All four readings are clean');
  });

  test('US4-AS3: a wrong bin gets a reason; all six sorted completes the bench', async ({
    page,
  }) => {
    await showDay(page);
    await switchAllOff(page);
    await page.getByRole('button', { name: 'dry leaves', exact: true }).click();
    await page.locator('.loka-place', { hasText: /^Blue/ }).click();
    await expect(page.locator('.say')).toContainText('even dry ones');
    await page.locator('.loka-place', { hasText: /^Green/ }).click();
    for (const [item, bin] of [
      ['banana peel', /^Green/],
      ['used tea leaves', /^Green/],
      ['plastic bottle', /^Blue/],
      ['old newspaper', /^Blue/],
      ['tin can', /^Blue/],
    ] as const) {
      await page.getByRole('button', { name: item, exact: true }).click();
      await page.locator('.loka-place', { hasText: bin }).click();
    }
    await expect(page.locator('.say')).toContainText('Nothing needs to be burnt');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
