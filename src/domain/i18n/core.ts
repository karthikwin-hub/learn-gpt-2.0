/**
 * Core i18n translation system for Gurukul.
 * Provides fallback to English, parameter replacement {key}, and language change notifications.
 */

import { DICTIONARIES, type LanguageCode } from './dictionaries/index';

export type { LanguageCode };

export interface LanguageMeta {
  glyph: string;
  native: string;
  english: string;
}

export const LANGS: Record<LanguageCode, LanguageMeta> = {
  en: { glyph: 'A', native: 'English', english: 'English' },
  hi: { glyph: 'अ', native: 'हिन्दी', english: 'Hindi' },
  te: { glyph: 'అ', native: 'తెలుగు', english: 'Telugu' },
  bn: { glyph: 'অ', native: 'বাংলা', english: 'Bengali' },
  ta: { glyph: 'அ', native: 'தமிழ்', english: 'Tamil' },
};

export const SUPPORTED_LANGUAGES: LanguageCode[] = ['en', 'hi', 'te', 'bn', 'ta'];

export function isLanguageCode(code: string): code is LanguageCode {
  return SUPPORTED_LANGUAGES.includes(code as LanguageCode);
}

// In-memory string tables initialized with ported dictionaries
const STRINGS: Record<LanguageCode, Record<string, string>> = {
  en: { ...DICTIONARIES.en },
  hi: { ...DICTIONARIES.hi },
  te: { ...DICTIONARIES.te },
  bn: { ...DICTIONARIES.bn },
  ta: { ...DICTIONARIES.ta },
};

let currentLang: LanguageCode = 'en';
const listeners: Array<(lang: LanguageCode) => void> = [];

export function fill(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (match, key: string) => {
    return vars[key] !== undefined && vars[key] !== null ? String(vars[key]) : match;
  });
}

export function tIn(
  lang: LanguageCode,
  key: string,
  vars?: Record<string, string | number>
): string {
  const table = STRINGS[lang] || STRINGS.en;
  let str = table[key];
  if (str === undefined) {
    str = STRINGS.en[key];
  }
  if (str === undefined) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('Missing string: ' + key);
    }
    return key;
  }
  return fill(str, vars);
}

export function t(key: string, vars?: Record<string, string | number>): string {
  return tIn(currentLang, key, vars);
}

export function getLang(): LanguageCode {
  return currentLang;
}

export function setLang(code: string, silent = false): LanguageCode {
  const safeCode: LanguageCode = isLanguageCode(code) ? code : 'en';
  currentLang = safeCode;
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.lang = safeCode;
  }
  if (!silent) {
    for (const fn of listeners) {
      try {
        fn(safeCode);
      } catch {
        // Guard listener failures
      }
    }
  }
  return safeCode;
}

export function onLangChange(fn: (lang: LanguageCode) => void): () => void {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function addStrings(code: LanguageCode, table: Record<string, string>): void {
  const target = STRINGS[code];
  if (!target) throw new Error('Unknown language: ' + code);
  for (const [k, v] of Object.entries(table)) {
    if (target[k] !== undefined) {
      throw new Error(`Duplicate string ${code}:${k}`);
    }
    target[k] = v;
  }
}
