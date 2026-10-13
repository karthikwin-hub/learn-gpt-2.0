import { describe, expect, it, vi } from 'vitest';
import { playable, SECTIONS } from '../../domain/curriculum/curriculum';
import { getLesson } from '../../domain/lesson/registry';
import { setLang } from '../../domain/i18n/core';
import { getVisuals, mergeTables } from './index';

const pic = () => document.createElementNS('http://www.w3.org/2000/svg', 'svg');

describe('046 lesson-visuals registry (FR-002)', () => {
  it('combines a knot’s cards from one group with its mistake picture from another', () => {
    const t = mergeTables({
      A: { G2: { cards: { what: pic } } },
      B: { G2: { mistake: pic } },
    });
    expect(t.G2?.cards?.what).toBe(pic);
    expect(t.G2?.mistake).toBe(pic);
  });

  it('refuses a picture defined by two groups, instead of silently replacing it', () => {
    expect(() =>
      mergeTables({ A: { G2: { cards: { what: pic } } }, B: { G2: { cards: { what: pic } } } })
    ).toThrow(/G2 what figure is defined twice/);
  });
});

describe('046 every lesson has its pictures (US2-AS1, US2-AS2, US2-AS3)', () => {
  const knots = SECTIONS.flatMap((s) => s.threads.flatMap((th) => th.knots)).filter(
    (k) => getLesson(k.id) && playable(k)
  );

  function checkPicture(svgEl: SVGSVGElement | null | undefined, what: string): string[] {
    if (!svgEl) return [`${what}: missing`];
    const problems: string[] = [];
    if (svgEl.querySelector('svg')) problems.push(`${what}: an SVG nested inside the picture`);
    if (!svgEl.getAttribute('aria-label')?.trim()) problems.push(`${what}: no aria-label`);
    return problems;
  }

  for (const knot of knots) {
    it(`${knot.id}: Prashna art, five card figures, an example that changes, a mistake picture`, () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const lesson = getLesson(knot.id)!;
      const v = getVisuals(knot.id);
      const problems: string[] = [];
      if (knot.prashna) problems.push(...checkPicture(v.prashna?.(), 'prashna'));
      for (const card of lesson.cards) {
        if (card.key === 'sutra') continue;
        const draw = v.cards?.[card.key];
        problems.push(...checkPicture(draw?.(0), card.key));
        if (card.key === 'example' && draw) {
          const first = draw(0)?.outerHTML;
          const last = draw(card.steps || 0)?.outerHTML;
          if (first === last) problems.push('example: the same picture at every step');
        }
      }
      if (lesson.mistake) {
        problems.push(...checkPicture(v.mistake?.(false), 'mistake'));
        problems.push(...checkPicture(v.mistake?.(true), 'mistake revealed'));
      }
      const missing = warn.mock.calls
        .map((c) => String(c[0]))
        .filter((m) => m.startsWith('Missing'));
      warn.mockRestore();
      expect([...problems, ...missing]).toEqual([]);
    });
  }

  /* Latin a translated picture may keep: Roman numerals, single letters naming points or sets, unit and
     time symbols, and the AND/OR/NOT gate names. Mirrors the dictionary script test. */
  const LATIN_OK =
    /^(?:[IVXLCDM]+|[A-Za-z]|cm|mm|km|kg|mg|ml|mL|AM|PM|am|pm|LCM|HCF|AND|OR|NOT|AI)$/;

  function englishIn(svgEl: SVGSVGElement | null | undefined): string[] {
    if (!svgEl) return [];
    const texts = [...svgEl.querySelectorAll('text, tspan, title')].map((n) => n.textContent || '');
    texts.push(svgEl.getAttribute('aria-label') || '');
    return texts.flatMap((x) => (x.match(/[A-Za-z]+/g) || []).filter((w) => !LATIN_OK.test(w)));
  }

  for (const knot of knots) {
    it(`${knot.id}: every picture is in the learner's language, with no English left (US1-AS1)`, () => {
      setLang('hi', true);
      try {
        const lesson = getLesson(knot.id)!;
        const v = getVisuals(knot.id);
        const pictures: [string, SVGSVGElement | null | undefined][] = [];
        if (knot.prashna) pictures.push(['prashna', v.prashna?.()]);
        for (const card of lesson.cards) {
          if (card.key === 'sutra') continue;
          const draw = v.cards?.[card.key];
          if (!draw) continue;
          for (let step = 0; step <= (card.steps || 0); step++) {
            pictures.push([`${card.key} step ${step}`, draw(step)]);
          }
        }
        if (lesson.mistake) {
          pictures.push(['mistake', v.mistake?.(false)], ['mistake revealed', v.mistake?.(true)]);
        }
        const english = pictures
          .map(([name, el]) => [name, englishIn(el)] as const)
          .filter(([, words]) => words.length > 0)
          .map(([name, words]) => `${name}: ${[...new Set(words)].join(' ')}`);
        expect(english).toEqual([]);
      } finally {
        setLang('en', true);
      }
    });
  }
});
