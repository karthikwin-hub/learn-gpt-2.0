import { test, expect, type Page } from '@playwright/test';

async function inLang(page: Page, lang: string) {
  await page.addInitScript((l) => localStorage.setItem('gurukul:lang', l), lang);
}

test.describe('048 US2 Read the chapter', () => {
  test('US2-AS1: a Loka chapter card offers "Read the chapter", which opens the chapter', async ({
    page,
  }) => {
    await inLang(page, 'en');
    await page.goto('/#/shala?s=loka');
    await page.getByRole('button', { name: 'Read the chapter' }).first().click();
    await expect(page).toHaveURL(/#\/read\?k=I1/);
    await expect(page.locator('.read .screen-title')).toHaveText('Clues from the past');
    await expect(page.getByRole('heading', { level: 3 }).first()).toBeVisible();
    await expect(page.locator('.read figure svg').first()).toHaveAttribute('aria-label', /.+/);
  });

  test('US2-AS2: "Show answer" reveals the answer; nothing is scored', async ({ page }) => {
    await inLang(page, 'en');
    await page.goto('/#/read?k=I1');
    const first = page.locator('.read-q').first();
    await expect(first.locator('.read-a')).toBeHidden();
    await first.getByRole('button', { name: 'Show answer' }).click();
    await expect(first.locator('.read-a')).toHaveText('A source.');
    await expect(first.getByRole('button', { name: 'Hide answer' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    await expect(page.locator('.read')).not.toContainText(/score|correct|wrong/i);
  });

  test('US2-AS3: a word to know opens its meaning; A+ makes the text larger', async ({ page }) => {
    await inLang(page, 'en');
    await page.goto('/#/read?k=I1');
    await page.locator('.read button.term', { hasText: 'inscription' }).first().click();
    await expect(page.locator('.bridge')).toContainText('Writing carved on stone');
    const para = page.locator('.read .bodha-text').first();
    const before = await para.evaluate((n) => parseFloat(getComputedStyle(n).fontSize));
    await page.getByRole('button', { name: 'Bigger text' }).click();
    const after = await para.evaluate((n) => parseFloat(getComputedStyle(n).fontSize));
    expect(after).toBeGreaterThan(before);
  });

  test('US2-AS4: the end of Bodha and the Stop screen offer "Read the chapter"', async ({
    page,
  }) => {
    await inLang(page, 'en');
    await page.addInitScript(() =>
      localStorage.setItem(
        'gurukul:pages',
        JSON.stringify([
          {
            id: 'p1',
            thread: 'I1',
            fills: ['older', 'archaeological'],
            date: new Date().toISOString(),
            time: Date.now(),
          },
        ])
      )
    );
    await page.goto('/#/bodha?k=I1');
    await expect(page.getByRole('button', { name: 'Read the chapter' })).toBeVisible();
    await page.goto('/#/stop?page=p1');
    await page.getByRole('button', { name: 'Read the chapter' }).click();
    await expect(page).toHaveURL(/#\/read\?k=I1/);
  });

  for (const lang of ['hi', 'te', 'bn', 'ta']) {
    test(`US2-AS5: in ${lang} no "Read the chapter" entry is shown before the chapter exists`, async ({
      page,
    }) => {
      await inLang(page, lang);
      await page.goto('/#/shala?s=loka');
      await expect(page.locator('button.knot').first()).toBeVisible();
      await expect(page.locator('[data-read]')).toHaveCount(0);
      await page.goto('/#/bodha?k=I1');
      await expect(page.locator('.bodha')).toBeVisible();
      await expect(page.locator('[data-read]')).toHaveCount(0);
      await page.goto('/#/read?k=I1');
      await expect(page.locator('.read')).toHaveCount(0);
    });
  }
});
