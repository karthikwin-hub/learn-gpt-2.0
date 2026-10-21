import { test, expect } from '@playwright/test';

test.describe('047 US2 Q1 What is civics? (#govern)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/govern');
    await expect(page.locator('.screen-title')).toContainText('Who looks after what?');
  });

  const LOCAL = /^Local: panchayat or municipality/;
  const STATE = /^State government/;
  const UNION = /^Union government/;

  async function show(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Show the levels' }).click();
    await expect(page.locator('.say')).toContainText('every state is inside India');
  }

  async function place(page: import('@playwright/test').Page, item: string, level: RegExp) {
    const chip = page.getByRole('button', { name: item, exact: true });
    if ((await chip.getAttribute('aria-pressed')) !== 'true') await chip.click();
    await page.locator('.loka-place', { hasText: level }).click();
  }

  async function sortJobs(page: import('@playwright/test').Page) {
    const jobs: [string, RegExp][] = [
      ['Fix a lane’s streetlight', LOCAL],
      ['Collect the garbage', LOCAL],
      ['Run the police stations', STATE],
      ['Repair a state highway', STATE],
      ['Make rupee notes and coins', UNION],
      ['Guard the borders with the army', UNION],
    ];
    for (const [job, level] of jobs) await place(page, job, level);
  }

  test('US2-AS1: showing the levels nests local inside state inside union', async ({ page }) => {
    await show(page);
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      'Union: all of India, State, Local'
    );
  });

  test('US2-AS2: the streetlight is a local job; six sorted shows the done line', async ({
    page,
  }) => {
    await show(page);
    await place(page, 'Fix a lane’s streetlight', UNION);
    await expect(page.locator('.say')).toContainText('the whole country?');
    await sortJobs(page);
    await expect(page.locator('.say')).toContainText('All six are sorted');
  });

  test('US2-AS3: each elected person matches their level, then the mistake opens', async ({
    page,
  }) => {
    await show(page);
    await sortJobs(page);
    await place(page, 'Sarpanch', UNION);
    await expect(page.locator('.say')).toContainText('Where does this person work');
    await place(page, 'Sarpanch', LOCAL);
    await place(page, 'Member of the state assembly', STATE);
    await place(page, 'Member of Parliament', UNION);
    await expect(page.locator('.say')).toContainText('government by the people');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
