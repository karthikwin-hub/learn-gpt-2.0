/*
 * Interface strings in five languages. The tables live in js/i18n/<lang>*.js and register themselves with add().
 * ALL non-English strings are DRAFTS for review by native-speaking teachers before any child sees them
 * (docs/product/CURRICULUM.md §8). A missing key falls back to English.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;

  var LANGS = {
    en: { glyph: 'A', native: 'English', english: 'English' },
    hi: { glyph: 'अ', native: 'हिन्दी', english: 'Hindi' },
    te: { glyph: 'అ', native: 'తెలుగు', english: 'Telugu' },
    bn: { glyph: 'অ', native: 'বাংলা', english: 'Bengali' },
    ta: { glyph: 'அ', native: 'தமிழ்', english: 'Tamil' }
  };

  var S = {};

  var listeners = [];

  function fill(str, vars) {
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined && vars[k] !== null ? String(vars[k]) : m; });
  }

  function tIn(lang, key, vars) {
    var table = S[lang] || S.en;
    var str = table[key] !== undefined ? table[key] : S.en[key];
    if (str === undefined) {
      if (window.console) console.warn('Missing string: ' + key);
      return key;
    }
    return fill(str, vars);
  }

  var i18n = {
    LANGS: LANGS,
    STRINGS: S,
    lang: 'en',
    t: function (key, vars) { return tIn(i18n.lang, key, vars); },
    tIn: tIn,
    /* Merges a table of strings into a language. A key defined twice is a mistake, so it fails loudly. */
    add: function (code, table) {
      if (!LANGS[code]) throw new Error('Unknown language: ' + code);
      var target = (S[code] = S[code] || {});
      Object.keys(table).forEach(function (k) {
        if (target[k] !== undefined) throw new Error('Duplicate string ' + code + ':' + k);
        target[k] = table[k];
      });
    },
    /* silent: apply without storing or notifying (used once at start-up). */
    setLang: function (code, silent) {
      if (!LANGS[code]) code = 'en';
      i18n.lang = code;
      document.documentElement.lang = code;
      if (silent) return;
      Sutra.util.store.set('lang', code);
      listeners.forEach(function (fn) { fn(code); });
    },
    onChange: function (fn) { listeners.push(fn); }
  };

  Sutra.i18n = i18n;
})();
