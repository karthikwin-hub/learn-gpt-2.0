import { test, expect } from '@playwright/test';

const FESTIVALS: readonly [string, string][] = [
  ['Pongal', 'Tamil Nadu'],
  ['Lohri', 'Punjab'],
  ['Bihu', 'Assam'],
  ['Uttarayan', 'Gujarat'],
];
const GREETINGS: readonly [string, string][] = [
  ['नमस्ते', 'Hindi'],
  ['வணக்கம்', 'Tamil'],
  ['নমস্কার', 'Bengali'],
  ['ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'Punjabi'],
  ['నమస్కారం', 'Telugu'],
];

test.describe('047 US15 C9 Unity in diversity (#unity)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
    await page.goto('/#/unity');
    await expect(page.locator('.screen-title')).toContainText('One harvest, many names');
  });

  async function match(page: import('@playwright/test').Page, item: string, place: string) {
    const chip = page.getByRole('button', { name: item, exact: true });
    if ((await chip.getAttribute('aria-pressed')) !== 'true') await chip.click();
    await page.locator('.loka-place', { hasText: new RegExp(`^${place}`) }).click();
  }

  async function matchFestivals(page: import('@playwright/test').Page) {
    await page.getByRole('button', { name: 'Light up January' }).click();
    await page.getByRole('button', { name: 'Match the festivals' }).click();
    for (const [festival, state] of FESTIVALS) await match(page, festival, state);
  }

  test('US15-AS1: "Light up January" shows the festivals and the shared harvest', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Light up January' }).click();
    await expect(page.locator('.say')).toContainText('celebrates the harvest');
    const label = await page.locator('.model svg').getAttribute('aria-label');
    for (const [, state] of FESTIVALS) expect(label).toContain(state);
  });

  test('US15-AS2: four festivals matched to their states show the done line', async ({ page }) => {
    await page.getByRole('button', { name: 'Light up January' }).click();
    await page.getByRole('button', { name: 'Match the festivals' }).click();
    await match(page, 'Pongal', 'Punjab');
    await expect(page.locator('.say')).toContainText('harvest festival of the Tamil people');
    for (const [festival, state] of FESTIVALS) await match(page, festival, state);
    await expect(page.locator('.say')).toContainText('Four festivals, four states, one harvest.');
  });

  test('US15-AS3: five greetings matched to their languages complete the bench', async ({
    page,
  }) => {
    await matchFestivals(page);
    await match(page, 'வணக்கம்', 'Hindi');
    await expect(page.locator('.say')).toContainText('Each language has its own script.');
    for (const [greeting, language] of GREETINGS) await match(page, greeting, language);
    await expect(page.locator('.say')).toContainText('five scripts');
    await expect(page.getByRole('button', { name: 'Spot the mistake' })).toBeVisible();
  });
});
