import { test, expect } from '@playwright/test';

test.describe('047 US3 Q2 A good citizen (#citizen)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/citizen');
    await expect(page.locator('.screen-title')).toContainText('Rights and duties');
  });

  async function showPark(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Show the park' }).click();
    await expect(page.locator('.say')).toContainText('It is the same park');
  }

  async function pair(page: import('@playwright/test').Page, duty: string, right: string) {
    const chip = page.getByRole('button', { name: duty, exact: true });
    if ((await chip.getAttribute('aria-pressed')) !== 'true') await chip.click();
    await page.locator('.loka-place', { hasText: new RegExp(`^${right}`) }).click();
  }

  async function pairAll(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Pair the rights' }).click();
    await pair(page, 'Go to school and learn', 'Free school from 6 to 14');
    await pair(page, 'Put rubbish in the bin', 'A clean place to live');
    await pair(page, 'Take care of public things', 'Using parks, buses and roads');
    await pair(page, 'Vote, and choose carefully', 'Voting at 18');
  }

  test('US3-AS1: "Show the park" shows the cared-for and the uncared-for park', async ({
    page,
  }) => {
    await showPark(page);
    await expect(page.locator('.model svg')).toHaveAttribute(
      'aria-label',
      'Cared for, Not cared for'
    );
  });

  test('US3-AS2: a wrong pair gets a hint; four right pairs show the done line', async ({
    page,
  }) => {
    await showPark(page);
    await page.getByRole('button', { name: 'Pair the rights' }).click();
    await pair(page, 'Put rubbish in the bin', 'Voting at 18');
    await expect(page.locator('.say')).toContainText('which right would stop working');
    await pair(page, 'Go to school and learn', 'Free school from 6 to 14');
    await pair(page, 'Put rubbish in the bin', 'A clean place to live');
    await pair(page, 'Take care of public things', 'Using parks, buses and roads');
    await pair(page, 'Vote, and choose carefully', 'Voting at 18');
    await expect(page.locator('.say')).toContainText('All four are paired');
  });

  test('US3-AS3: the careful action in all three situations completes the bench', async ({
    page,
  }) => {
    await showPark(page);
    await pairAll(page);
    await page.getByRole('button', { name: 'Push it under the bench' }).click();
    await expect(page.locator('.say')).toContainText('Hidden rubbish is still rubbish');
    await page.getByRole('button', { name: 'Put it in the bin' }).click();
    await page.getByRole('button', { name: 'Close the tap' }).click();
    await page.getByRole('button', { name: 'Ask your friend to stop' }).click();
    await expect(page.locator('.say')).toContainText('That is what a good citizen does');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
