import { test, expect, type Page } from '@playwright/test';
import {
  checkNoHorizontalOverflow,
  checkNoRawKeysOrPlaceholders,
  checkAccessibility,
} from './helpers';
import { LANGUAGES, playableLessons, url, type Lang } from './lesson-routes';
import { chapterFor, chapterKnots } from '../../../src/domain/reading';

/* Tokens a translated screen may show in Latin script: Roman numerals, units, gate names, single letters. */
const LATIN_OK = /^(?:[IVXLCDM]+|[A-Za-z]|cm|mm|km|kg|mg|ml|mL|AM|PM|LCM|HCF|AND|OR|NOT|AI)$/;

function watchConsole(page: Page): string[] {
  const problems: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.text().startsWith('Missing string'))
      problems.push(msg.text());
  });
  page.on('pageerror', (err) => problems.push(err.message));
  return problems;
}

async function englishLeft(page: Page): Promise<string[]> {
  const text = await page.evaluate(() => {
    const view = document.querySelector('#view');
    if (!view) return '';
    const clone = view.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('[lang="en"]').forEach((n) => n.remove());
    const parts: string[] = [];
    const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) parts.push(walker.currentNode.textContent || '');
    return parts.join(' ');
  });
  return (text.match(/[A-Za-z]{2,}/g) || []).filter((w) => !LATIN_OK.test(w));
}

async function checkScreen(page: Page, lang: Lang, label: string): Promise<void> {
  await checkNoRawKeysOrPlaceholders(page);
  await checkNoHorizontalOverflow(page);
  if (lang !== 'en') {
    const words = await englishLeft(page);
    expect(
      words,
      `${label}: English words on a ${lang} screen: ${words.slice(0, 12).join(' ')}`
    ).toEqual([]);
  }
}

async function open(page: Page, lang: Lang, route: string): Promise<void> {
  await page.goto(route);
  await page.locator('#view').waitFor();
  await page.waitForTimeout(150);
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
}

const lessons = playableLessons();

for (const lang of LANGUAGES) {
  test.describe(`046 app sweep in ${lang}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((l) => localStorage.setItem('gurukul:lang', l), lang);
    });

    for (const { knot, lesson, bench } of lessons) {
      test(`${knot.id}: every lesson screen is in ${lang}, with pictures (US1-AS1, US2-AS1, US2-AS2, US2-AS3)`, async ({
        page,
      }) => {
        test.setTimeout(90_000);
        const problems = watchConsole(page);
        expect(lesson, `${knot.id} has no lesson entry (FR-003)`).not.toBeNull();
        if (!lesson) return;

        if (knot.prashna) {
          await open(page, lang, url('prashna', { k: knot.id }));
          await expect(page.locator('.prashna-art svg'), `${knot.id} Prashna picture`).toHaveCount(
            1
          );
          await checkScreen(page, lang, `${knot.id} prashna`);
        }

        await open(page, lang, url('bodha', { k: knot.id }));
        for (let i = 0; i < lesson.cards.length; i++) {
          const card = lesson.cards[i];
          if (!card) continue;
          if (card.key !== 'sutra') {
            await expect(
              page.locator('.bodha-fig svg'),
              `${knot.id} card ${card.key} figure`
            ).toHaveCount(1);
          }
          if (card.key === 'example' && card.steps) {
            const before = await page.locator('.bodha-fig').innerHTML();
            for (let s = 0; s < card.steps; s++)
              await page.locator('.bodha-nav .btn.thread').click();
            const after = await page.locator('.bodha-fig').innerHTML();
            expect(after, `${knot.id} example figure must change with its steps`).not.toEqual(
              before
            );
          }
          await checkScreen(page, lang, `${knot.id} bodha ${card.key}`);
          if (i < lesson.cards.length - 1) await page.locator('.bodha-nav .btn.primary').click();
        }

        await open(page, lang, bench);
        await checkScreen(page, lang, `${knot.id} bench`);
        if (lang === 'en' || lang === 'hi') await checkAccessibility(page);

        if (lesson.mistake) {
          await open(page, lang, url('mistake', { k: knot.id }));
          await checkScreen(page, lang, `${knot.id} mistake`);
          await page.locator('.work-steps button').nth(lesson.mistake.wrong).click();
          await expect(page.locator('.model svg'), `${knot.id} mistake picture`).toHaveCount(1);
          await expect(page.locator('.eq')).not.toBeEmpty();
          await checkScreen(page, lang, `${knot.id} mistake revealed`);
        }

        if (lesson.explain) {
          await open(page, lang, url('explain', { k: knot.id }));
          await checkScreen(page, lang, `${knot.id} explain`);
        }

        expect(problems, `${knot.id} console problems`).toEqual([]);
      });
    }
  });
}

test.describe('048 chapter sweep in en', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gurukul:lang', 'en'));
  });

  for (const k of chapterKnots('en')) {
    const chapter = chapterFor(k, 'en');
    test(`${k}: Read the chapter shows every part and picture (US3-AS1)`, async ({ page }) => {
      expect(chapter, `${k} chapter`).not.toBeNull();
      if (!chapter) return;
      const problems = watchConsole(page);
      await open(page, 'en', url('read', { k }));
      await expect(page.locator('.read h3')).toHaveCount(chapter.sections.length + 3);
      const figures = chapter.sections.filter((s) => s.figure).length;
      await expect(page.locator('.read-fig svg'), `${k} pictures`).toHaveCount(figures);
      await expect(page.locator('.read-q')).toHaveCount(chapter.questions.length);
      await checkScreen(page, 'en', `${k} read`);
      await checkAccessibility(page);
      expect(problems, `${k} console problems`).toEqual([]);
    });
  }
});

test.describe('046 reduced motion sweep', () => {
  for (const lang of ['en', 'hi'] as const) {
    test(`every bench renders without errors under reduced motion in ${lang} (US4-AS1)`, async ({
      page,
    }) => {
      test.setTimeout(180_000);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript((l) => localStorage.setItem('gurukul:lang', l), lang);
      const problems = watchConsole(page);
      for (const { knot, bench } of lessons) {
        await open(page, lang, bench);
        await checkNoRawKeysOrPlaceholders(page);
        expect(problems, `${knot.id} bench under reduced motion`).toEqual([]);
      }
    });
  }
});
