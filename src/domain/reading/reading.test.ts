import { describe, expect, it } from 'vitest';
import { availableIn, chapterFor, chapterKnots, chapterText, undefinedWords, wordCount } from '.';
import { checkBannedWords } from '../lesson/banned-words';
import { findSection } from '../curriculum/curriculum';

const LOKA = (findSection('loka')?.threads ?? []).flatMap((th) => th.knots.map((k) => k.id));

describe('chapters to read (048)', () => {
  it('is English only until a teacher approves the English', () => {
    expect(availableIn('I1', 'en')).toBe(true);
    for (const lang of ['hi', 'te', 'bn', 'ta'] as const)
      expect(availableIn('I1', lang)).toBe(false);
    expect(chapterFor('nope', 'en')).toBeNull();
  });

  it('only has chapters for Loka knots', () => {
    for (const k of chapterKnots('en')) expect(LOKA).toContain(k);
  });

  for (const knot of chapterKnots('en')) {
    describe(knot, () => {
      const c = chapterFor(knot, 'en');
      if (!c) throw new Error(`${knot} missing`);

      it('is filed under its own knot', () => expect(c.knot).toBe(knot));

      it('has at least 1,000 words', () => expect(wordCount(c)).toBeGreaterThanOrEqual(1000));

      it('has sections, pictures, words, an activity and questions', () => {
        expect(c.sections.length).toBeGreaterThanOrEqual(4);
        expect(c.sections.filter((s) => s.figure).length).toBeGreaterThanOrEqual(2);
        expect(c.sections.some((s) => s.didYouKnow)).toBe(true);
        expect(c.words.length).toBeGreaterThanOrEqual(4);
        expect(c.activity.steps.length).toBeGreaterThanOrEqual(3);
        expect(c.questions.length).toBeGreaterThanOrEqual(4);
        for (const q of c.questions) expect(q.a.trim()).not.toBe('');
      });

      it('defines every word it marks', () => expect(undefinedWords(c)).toEqual([]));

      it('has no praise, score or streak words', () => {
        expect(checkBannedWords(chapterText(c).join('\n'), 'en').violations).toEqual([]);
      });

      it('uses no straight apostrophe inside a word', () => {
        expect(chapterText(c).join(' ')).not.toMatch(/\w'\w/);
      });
    });
  }
});
