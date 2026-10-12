import { test, expect } from '@playwright/test';
import { playableLessons, url } from '../sweep/lesson-routes';

/* J5 for every playable knot: Prashna → Bodha → bench → Spot-the-mistake → Explain → stop → Pothi. */

const lessons = playableLessons();

test.describe('046 J5: every lesson end to end', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      if (!sessionStorage.getItem('seeded')) {
        localStorage.clear();
        localStorage.setItem('gurukul:lang', 'en');
        sessionStorage.setItem('seeded', '1');
      }
    });
  });

  for (const { knot, lesson, first, bench } of lessons) {
    test(`${knot.id}: the child completes the lesson and the Pothi gains its page (US3-AS1)`, async ({
      page,
    }) => {
      expect(lesson, `${knot.id} has no lesson entry (FR-003)`).not.toBeNull();
      if (!lesson) return;

      await page.goto(first);
      if (knot.prashna) {
        await expect(page).toHaveURL(new RegExp(`#/prashna\\?k=${knot.id}`));
        await page.locator('.prashna-choices .choice').first().click();
        await page.locator('.btn.primary.block').click();
      }
      if (knot.start?.route !== 'wonder') {
        await expect(page).toHaveURL(new RegExp(`#/bodha\\?k=${knot.id}`));
        await expect(page.locator('.bodha-knot')).not.toBeEmpty();
        await page.locator('.bodha-nav .btn.quiet.block').click();
        await expect(page).toHaveURL(new RegExp(bench.replace(/[?]/g, '\\?')));
      }

      if (lesson.mistake) {
        await page.goto(url('mistake', { k: knot.id }));
        const steps = page.locator('.work-steps button');
        await expect(steps).toHaveCount(lesson.mistake.steps);
        for (let i = 0; i < lesson.mistake.steps; i++) {
          if (i !== lesson.mistake.wrong) await steps.nth(i).click();
        }
        await steps.nth(lesson.mistake.wrong).click();
        await expect(page.locator('.model svg')).toHaveCount(1);
        await page.locator('.after .btn.primary').click();
        await expect(page).toHaveURL(/#\/explain/);
      } else {
        await page.goto(url('explain', { k: knot.id }));
      }

      if (lesson.explain) {
        await expect(page.locator('.explain-knot')).not.toBeEmpty();
        for (const blank of lesson.explain) {
          await page.locator('.tiles .chip').nth(blank.tiles.indexOf(blank.expect)).click();
        }
        await page.locator('.explain-actions .btn.primary').click();
        await expect(page).toHaveURL(/#\/stop/);
        const pages = await page.evaluate(() =>
          JSON.parse(localStorage.getItem('gurukul:pages') || '[]')
        );
        expect(pages.map((p: { thread: string }) => p.thread)).toContain(knot.id);
        await expect(page.locator('.sutra-line')).not.toBeEmpty();
      }
    });
  }

  for (const { knot, lesson } of lessons.filter((l) => l.lesson?.explain)) {
    test(`${knot.id}: a sentence that does not match the model gets the hint once, then is kept (US3-AS2)`, async ({
      page,
    }) => {
      if (!lesson?.explain) return;
      await page.goto(url('explain', { k: knot.id }));
      for (const [i, blank] of lesson.explain.entries()) {
        const pick =
          i === 0
            ? blank.tiles.findIndex((x) => x !== blank.expect)
            : blank.tiles.indexOf(blank.expect);
        await page.locator('.tiles .chip').nth(pick).click();
      }
      await page.locator('.explain-actions .btn.primary').click();
      await expect(page.locator('.explain-hint')).toBeVisible();
      await expect(page.locator('.explain-hint')).not.toBeEmpty();
      await expect(page).toHaveURL(/#\/explain/);
      await page.locator('.explain-actions .btn.primary').click();
      await expect(page).toHaveURL(/#\/stop/);
    });
  }
});
