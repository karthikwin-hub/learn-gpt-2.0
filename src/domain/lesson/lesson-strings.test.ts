import { describe, expect, it } from 'vitest';
import { SECTIONS } from '../curriculum/curriculum';
import { DICTIONARIES } from '../i18n/dictionaries/index';
import { explainSource, getLesson, mistakeSource } from './registry';

const en = DICTIONARIES.en;
const knots = SECTIONS.flatMap((s) => s.threads.flatMap((th) => th.knots)).filter((k) =>
  getLesson(k.id)
);

/* Every key a lesson screen will ask for, so a gap fails here instead of showing a raw key to a child. */
function keysFor(id: string, prashna: boolean): string[] {
  const lesson = getLesson(id)!;
  const keys = [`knot.${id}.t`];
  if (prashna) keys.push(...['q', 'c1', 'c2', 'c3', 'a'].map((p) => `prashna.${id}.${p}`));
  for (const card of lesson.cards) {
    keys.push(`bodha.${id}.${card.key}`);
    for (let s = 1; s <= (card.steps || 0); s++) keys.push(`bodha.${id}.${card.key}${s}`);
  }
  const m = mistakeSource(id);
  const mistake = m ? getLesson(m)?.mistake : undefined;
  if (m && mistake) {
    keys.push(`mistake.${m}.intro`, `mistake.${m}.found`, `mistake.${m}.eq`);
    for (let s = 1; s <= mistake.steps; s++) keys.push(`mistake.${m}.s${s}`);
  }
  const e = explainSource(id);
  for (const blank of (e && getLesson(e)?.explain) || []) {
    keys.push(...blank.tiles.map((tile) => `explain.${e}.${tile}`));
  }
  if (e) keys.push(`explain.${e}.s`, `explain.${e}.hint`);
  return keys;
}

describe('046 every lesson has all its English strings (US3-AS1, FR-003)', () => {
  for (const knot of knots) {
    it(`${knot.id}: Prashna, Bodha, mistake and explain keys exist`, () => {
      const missing = keysFor(knot.id, !!knot.prashna).filter((k) => en[k] === undefined);
      expect(missing).toEqual([]);
    });

    it(`${knot.id}: the explain sentence has one gap per tile row`, () => {
      const e = explainSource(knot.id);
      if (!e) return;
      const gaps = (en[`explain.${e}.s`] || '').match(/\{\d\}/g) || [];
      expect(gaps.length).toBe(getLesson(e)?.explain?.length);
    });
  }
});
