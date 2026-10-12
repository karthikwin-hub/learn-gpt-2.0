import { describe, it, expect } from 'vitest';
import { DICTIONARIES, type LanguageCode } from './dictionaries/index';
import { checkBannedWords } from '../lesson/banned-words';

const OTHER: Exclude<LanguageCode, 'en'>[] = ['hi', 'te', 'bn', 'ta'];

const SCRIPT: Record<Exclude<LanguageCode, 'en'>, RegExp> = {
  hi: /[\u0900-\u097F]/,
  te: /[\u0C00-\u0C7F]/,
  bn: /[\u0980-\u09FF]/,
  ta: /[\u0B80-\u0BFF]/,
};

/* Latin tokens a translation may keep: Roman numerals, unit and time symbols, single letters naming
   points or sets, and the AND/OR/NOT gate names printed on the marble machine. */
const LATIN_ALLOWED =
  /^(?:[IVXLCDM]+|[A-Za-z]|cm|mm|km|kg|mg|ml|mL|AM|PM|am|pm|LCM|HCF|AND|OR|NOT)$/;

/* `gloss.<id>.en` holds the English bridge word shown under a translated term, so it exists only in English. */
const en = Object.fromEntries(
  Object.entries(DICTIONARIES.en).filter(([k]) => !/^gloss\..+\.en$/.test(k))
);

function strip(s: string): string {
  return s
    .replace(/\{\w+\}/g, ' ')
    .replace(/\[\[[\w.-]+\|/g, ' ')
    .replace(/\]\]/g, ' ')
    .replace(/<\/?[sr]>/g, ' ');
}

function latinWords(s: string): string[] {
  return strip(s).match(/[A-Za-z]+/g) || [];
}

function placeholders(s: string): string[] {
  return (s.match(/\{\w+\}/g) || []).sort();
}

function termIds(s: string): string[] {
  return (s.match(/\[\[([\w.-]+)\|/g) || []).sort();
}

function markup(s: string): string[] {
  return (s.match(/<\/?[sr]>/g) || []).sort();
}

describe('046 dictionaries: every English string exists in hi, te, bn, ta (US1-AS2)', () => {
  for (const lang of OTHER) {
    it(`${lang}: no English key is missing`, () => {
      const dict = DICTIONARIES[lang];
      const missing = Object.keys(en).filter((k) => dict[k] === undefined);
      expect(
        missing,
        `${missing.length} keys missing in ${lang}: ${missing.slice(0, 20).join(', ')}`
      ).toEqual([]);
    });

    it(`${lang}: values are written in ${lang} script, not English (US1-AS2)`, () => {
      const dict = DICTIONARIES[lang];
      const bad: string[] = [];
      for (const [k, enValue] of Object.entries(en)) {
        const v = dict[k];
        if (v === undefined) continue;
        const enWords = latinWords(enValue).filter((w) => !LATIN_ALLOWED.test(w));
        if (enWords.length === 0) continue;
        const foreign = latinWords(v).filter((w) => !LATIN_ALLOWED.test(w));
        if (!SCRIPT[lang].test(v) || foreign.length > 0) bad.push(`${k} = ${v.slice(0, 60)}`);
      }
      expect(
        bad,
        `${bad.length} values in ${lang} are English or mixed: ${bad.slice(0, 15).join(' | ')}`
      ).toEqual([]);
    });

    it(`${lang}: placeholders, glossary term ids and mistake markup match English (US1-AS2)`, () => {
      const dict = DICTIONARIES[lang];
      const bad: string[] = [];
      for (const [k, enValue] of Object.entries(en)) {
        const v = dict[k];
        if (v === undefined) continue;
        const same =
          placeholders(v).join() === placeholders(enValue).join() &&
          termIds(v).join() === termIds(enValue).join() &&
          markup(v).join() === markup(enValue).join();
        if (!same) bad.push(k);
      }
      expect(bad, `${bad.length} mismatches in ${lang}: ${bad.slice(0, 20).join(', ')}`).toEqual(
        []
      );
    });
  }
});

describe('046 dictionaries: no praise, score or streak words (US1-AS3)', () => {
  for (const lang of ['en', ...OTHER] as LanguageCode[]) {
    it(`${lang}: no banned word in any value`, () => {
      const hits = Object.entries(DICTIONARIES[lang])
        .map(([k, v]) => ({ k, r: checkBannedWords(v, lang) }))
        .filter((x) => !x.r.valid)
        .map((x) => `${x.k}: ${x.r.violations.join('/')}`);
      expect(hits).toEqual([]);
    });
  }
});
