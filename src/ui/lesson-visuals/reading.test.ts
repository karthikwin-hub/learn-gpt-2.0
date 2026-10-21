import { describe, expect, it } from 'vitest';
import { chapterFor, chapterKnots } from '../../domain/reading';
import { readingFigure } from './reading';

describe('reading figures (048)', () => {
  it('rejects an id it does not know', () => {
    expect(readingFigure('nope')).toBeNull();
    expect(readingFigure('map:nope')).toBeNull();
  });

  for (const knot of chapterKnots('en')) {
    it(`${knot}: every figure draws`, () => {
      const c = chapterFor(knot, 'en');
      for (const s of c?.sections ?? []) {
        if (!s.figure) continue;
        const pic = readingFigure(s.figure);
        expect(pic, `${knot} ${s.figure}`).not.toBeNull();
        expect(pic?.getAttribute('aria-label') ?? '', `${knot} ${s.figure} label`).not.toBe('');
      }
    });
  }
});
