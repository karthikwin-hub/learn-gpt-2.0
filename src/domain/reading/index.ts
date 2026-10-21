/**
 * Domain module: chapters to read (feature 048). English first; another language gets a chapter only
 * once a teacher has approved the English and the translation is written, so `availableIn` is false
 * until then and no screen shows English to a child reading in another language.
 */

import type { LanguageCode } from '../i18n/core';
import type { Chapter } from './types';
import { CHAPTERS_EN } from './en';

export type { Chapter, ReadingSection, WordToKnow, CheckQuestion } from './types';

const CHAPTERS: Partial<Record<LanguageCode, Readonly<Record<string, Chapter>>>> = {
  en: CHAPTERS_EN,
};

export function chapterFor(knot: string, lang: LanguageCode): Chapter | null {
  return CHAPTERS[lang]?.[knot] ?? null;
}

export function availableIn(knot: string, lang: LanguageCode): boolean {
  return chapterFor(knot, lang) !== null;
}

export function chapterKnots(lang: LanguageCode): string[] {
  return Object.keys(CHAPTERS[lang] ?? {});
}

const MARK = /\[\[[\w.-]+\|([^\]]+)\]\]/g;

/** Everything the child reads, as plain text, in reading order. */
export function chapterText(c: Chapter): string[] {
  return [
    c.title,
    c.intro,
    ...c.sections.flatMap((s) => [
      s.heading,
      ...s.paras,
      ...(s.caption ? [s.caption] : []),
      ...(s.didYouKnow ? [s.didYouKnow] : []),
    ]),
    ...c.words.flatMap((w) => [w.word, w.meaning]),
    c.activity.title,
    ...c.activity.steps,
    ...c.questions.flatMap((q) => [q.q, q.a]),
  ].map((s) => s.replace(MARK, '$1'));
}

export function wordCount(c: Chapter): number {
  return chapterText(c).join(' ').split(/\s+/).filter(Boolean).length;
}

/** Word ids used in the text that the chapter does not define. */
export function undefinedWords(c: Chapter): string[] {
  const known = new Set(c.words.map((w) => w.id));
  const all = [c.intro, ...c.sections.flatMap((s) => [...s.paras, s.didYouKnow ?? ''])];
  const used = all.flatMap((s) => [...s.matchAll(/\[\[([\w.-]+)\|/g)].map((m) => m[1] ?? ''));
  return [...new Set(used.filter((id) => !known.has(id)))];
}
