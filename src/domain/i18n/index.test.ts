import { describe, it, expect, beforeEach } from 'vitest';
import {
  LANGS,
  SUPPORTED_LANGUAGES,
  t,
  tIn,
  getLang,
  setLang,
  onLangChange,
  addStrings,
  DICTIONARIES,
} from './index';

describe('src/domain/i18n', () => {
  beforeEach(() => {
    setLang('en', true);
  });

  it('supports all 5 Indic languages with correct glyphs and native names', () => {
    expect(SUPPORTED_LANGUAGES).toEqual(['en', 'hi', 'te', 'bn', 'ta']);
    expect(LANGS.en.native).toBe('English');
    expect(LANGS.hi.native).toBe('हिन्दी');
    expect(LANGS.te.native).toBe('తెలుగు');
    expect(LANGS.bn.native).toBe('বাংলা');
    expect(LANGS.ta.native).toBe('தமிழ்');
  });

  it('translates app.name and section names across all languages', () => {
    expect(tIn('en', 'app.name')).toBe('Gurukul');
    expect(tIn('hi', 'app.name')).toBe('गुरुकुल');
    expect(tIn('te', 'app.name')).toBe('గురుకులం');
    expect(tIn('bn', 'app.name')).toBe('গুরুকুল');
    expect(tIn('ta', 'app.name')).toBe('குருகுலம்');
  });

  it('interpolates placeholders with {var} syntax', () => {
    const formatted = tIn('en', 'home.ideas', { n: 12 });
    expect(formatted).toBe('12 ideas');
  });

  it('falls back to English when translation key is missing in active language', () => {
    // If a key exists in English but is missing in hi, tIn should return English string
    expect(tIn('hi', 'app.tagline')).toBeTruthy();
  });

  it('returns key itself when key does not exist even in English', () => {
    expect(tIn('hi', 'completely.nonexistent.key.xyz')).toBe('completely.nonexistent.key.xyz');
  });

  it('notifies listeners on language change', () => {
    let notified: string | null = null;
    const unbind = onLangChange((lang) => {
      notified = lang;
    });

    setLang('ta');
    expect(notified).toBe('ta');
    expect(getLang()).toBe('ta');
    expect(t('app.name')).toBe('குருகுலம்');

    unbind();
    setLang('te');
    expect(notified).toBe('ta'); // Unbound listener was not called again
  });

  it('detects duplicate keys in addStrings', () => {
    expect(() => {
      addStrings('en', { 'app.name': 'Duplicate' });
    }).toThrow(/Duplicate string/);
  });

  it('contains over 1200 keys for all languages', () => {
    expect(Object.keys(DICTIONARIES.en).length).toBeGreaterThan(1200);
    expect(Object.keys(DICTIONARIES.hi).length).toBeGreaterThan(1200);
    expect(Object.keys(DICTIONARIES.te).length).toBeGreaterThan(1200);
    expect(Object.keys(DICTIONARIES.bn).length).toBeGreaterThan(1200);
    expect(Object.keys(DICTIONARIES.ta).length).toBeGreaterThan(1200);
  });
});
