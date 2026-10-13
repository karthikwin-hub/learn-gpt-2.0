import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DICTIONARIES, type LanguageCode } from './dictionaries/index';
import { checkBannedWords } from '../lesson/banned-words';

const OTHER: Exclude<LanguageCode, 'en'>[] = ['hi', 'te', 'bn', 'ta'];

const SCRIPT: Record<Exclude<LanguageCode, 'en'>, RegExp> = {
  hi: /[\u0900-\u097F]/,
  te: /[\u0C00-\u0C7F]/,
  bn: /[\u0980-\u09FF]/,
  ta: /[\u0B80-\u0BFF]/,
};

/* Polite "you" pronouns. Lessons talk to a ten-year-old with the familiar form (तुम, నువ్వు, তুমি, நீ). */
const FORMAL_YOU: Record<Exclude<LanguageCode, 'en'>, RegExp> = {
  hi: /(?<![\u0900-\u097F])(?<!अपने )आप(?![\u0900-\u097F])/,
  te: /మీరు|మీకు/,
  bn: /আপনি|আপনার/,
  ta: /நீங்கள்|உங்கள்/,
};

/* Latin tokens a translation may keep: Roman numerals, unit and time symbols, single letters naming
   points or sets, and the AND/OR/NOT gate names printed on the marble machine. */
const LATIN_ALLOWED =
  /^(?:[IVXLCDM]+|[A-Za-z]|cm|mm|km|kg|mg|ml|mL|AM|PM|am|pm|LCM|HCF|AND|OR|NOT|AI)$/;

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

    it(`${lang}: no other Indian script and no letters that do not exist in ${lang} (US1-AS2)`, () => {
      const others = OTHER.filter((o) => o !== lang && SCRIPT[o].source !== SCRIPT[lang].source);
      const bad = Object.entries(DICTIONARIES[lang])
        .filter(([, v]) => {
          const text = v.replace(/[\u0964\u0965]/g, '');
          return /\p{Cn}/u.test(text) || others.some((o) => SCRIPT[o].test(text));
        })
        .map(([k, v]) => `${k} = ${v.slice(0, 50)}`);
      expect(bad, `${bad.length} values in ${lang}: ${bad.slice(0, 10).join(' | ')}`).toEqual([]);
    });

    it(`${lang}: no Latin letter inside a ${lang} word and no letters from any other script (US1-AS2)`, () => {
      const own = SCRIPT[lang].source;
      const glued = new RegExp(`(?![\\u0964\\u0965])${own}[a-z]|[a-z](?![\\u0964\\u0965])${own}`);
      const bad = Object.entries(DICTIONARIES[lang])
        .filter(
          ([, v]) =>
            glued.test(v) ||
            [...v].some((c) => /\p{L}/u.test(c) && c > '\u007f' && !SCRIPT[lang].test(c))
        )
        .map(([k, v]) => `${k} = ${v.slice(0, 50)}`);
      expect(bad, `${bad.length} values in ${lang}: ${bad.slice(0, 10).join(' | ')}`).toEqual([]);
    });

    it(`${lang}: the child is addressed informally; only grown-up screens use the polite form (US1-AS2)`, () => {
      const bad = Object.entries(DICTIONARIES[lang])
        .filter(([k, v]) => !/^(?:grown|language)\./.test(k) && FORMAL_YOU[lang].test(v))
        .map(([k, v]) => `${k} = ${v.slice(0, 50)}`);
      expect(bad, `${bad.length} values in ${lang}: ${bad.slice(0, 10).join(' | ')}`).toEqual([]);
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

describe('046 dictionaries: every glossary term is well formed and defined (US1-AS2)', () => {
  for (const lang of ['en', ...OTHER] as LanguageCode[]) {
    it(`${lang}: every [[id|word]] parses and gloss.<id> exists`, () => {
      const bad: string[] = [];
      for (const [k, v] of Object.entries(DICTIONARIES[lang])) {
        const left = v.replace(/\[\[([\w.-]+)\|([^\]]+)\]\]/g, (_m, id: string) => {
          if (DICTIONARIES.en[`gloss.${id}`] === undefined) bad.push(`${k}: unknown term ${id}`);
          return '';
        });
        if (left.includes('[[') || left.includes(']]')) bad.push(`${k}: malformed term markup`);
      }
      expect(bad).toEqual([]);
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

describe('046 each key has one home per language (FR-003)', () => {
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dictionaries');
  const files = fs
    .readdirSync(dir)
    .filter((f) => /^[a-z]{2}(-[\w-]+)?\.ts$/.test(f) && f !== 'index.ts');
  for (const lang of ['en', ...OTHER]) {
    it(`${lang}: no key is defined in two files, so nothing is silently overridden`, () => {
      const seen = new Map<string, string>();
      const twice: string[] = [];
      for (const f of files.filter((f) => f === `${lang}.ts` || f.startsWith(`${lang}-`))) {
        const text = fs.readFileSync(path.join(dir, f), 'utf8');
        for (const m of text.matchAll(/^\s+'([^']+)':/gm)) {
          const key = m[1]!;
          if (seen.has(key)) twice.push(`${key}: ${seen.get(key)} and ${f}`);
          else seen.set(key, f);
        }
      }
      expect(twice).toEqual([]);
    });
  }
});
