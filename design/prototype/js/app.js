/* App shell: top bar, language sheet, sound toggle, reviewer panel, start-up. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var t = function (k, v) { return Sutra.i18n.t(k, v); };

  var REVIEW_NAV = [
    { group: 'Start', items: [['opening', 'Opening thread'], ['language', 'Choose language'], ['home', 'Ashram (home)']] },
    { group: 'Gurukul', items: [['shala?s=ganita', 'Ganita Shala (maths)'], ['shala?s=vijnana', 'Vijnana Shala (science)'], ['shala?s=loka', 'Loka Shala (social studies)'], ['jaal', 'Jaal: links across subjects']] },
    { group: 'One full lesson (multiplication)', items: [['wonder', '1 · Prashna: a question'], ['bodha?k=M2', '2 · Bodha: understand'], ['film', '3 · Darshana: Living Film'], ['rect', '4 · Abhyasa: Rubber Rectangle'], ['mistake', '5 · Spot the mistake'], ['explain', '6 · Explain it back'], ['stop', '7 · A good place to stop']] },
    { group: 'More workbenches (Ganita)', items: [['share?mode=share', 'Fair Share Table'], ['share?mode=leftover', 'Leftovers to fractions'], ['rope', 'Rope and Pegs'], ['kolam', 'Kolam Mirror'], ['drums', 'Two Drummers'], ['sets?mode=sort', 'Sorting Courtyard'], ['sets?mode=guess', 'Which rules made this?'], ['logic', 'Marble Machine']] },
    { group: 'Child and parent', items: [['notebook', 'My Pothi (notebook)'], ['grownups', 'Acharya corner (grown-ups)']] }
  ];

  var SOUND_ON = '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/>';
  var SOUND_OFF = '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 6M22 9l-5 6"/>';

  function paintChrome() {
    var L = Sutra.i18n.LANGS[Sutra.i18n.lang];
    document.getElementById('lang-glyph').textContent = L.glyph;
    document.getElementById('btn-lang').setAttribute('aria-label', t('chrome.language'));
    document.getElementById('btn-back').setAttribute('aria-label', t('chrome.back'));
    var sb = document.getElementById('btn-sound');
    sb.setAttribute('aria-pressed', String(Sutra.voice.enabled));
    sb.setAttribute('aria-label', t('chrome.sound'));
    document.getElementById('sound-icon').innerHTML = Sutra.voice.enabled ? SOUND_ON : SOUND_OFF;
    document.getElementById('lang-sheet-title').textContent = t('chrome.chooseLanguage');
  }

  function openLangSheet() {
    var sheet = document.getElementById('lang-sheet');
    var list = document.getElementById('lang-list');
    u.clear(list);
    Object.keys(Sutra.i18n.LANGS).forEach(function (code) {
      var L = Sutra.i18n.LANGS[code];
      list.appendChild(u.el('button', {
        class: 'lang-option', role: 'menuitemradio', 'aria-checked': String(code === Sutra.i18n.lang), lang: code,
        onclick: function () {
          sheet.hidden = true;
          Sutra.i18n.setLang(code);
        }
      }, [
        u.el('span', { class: 'glyph', text: L.glyph }),
        u.el('span', {}, [u.el('span', { class: 'native', text: L.native }), u.el('br'), u.el('span', { class: 'english', lang: 'en', text: L.english })])
      ]));
    });
    sheet.hidden = false;
    list.querySelector('[aria-checked="true"]').focus();
  }

  function buildReviewerNav() {
    var nav = document.getElementById('reviewer-nav');
    REVIEW_NAV.forEach(function (g) {
      nav.appendChild(u.el('h3', { text: g.group }));
      g.items.forEach(function (it) {
        nav.appendChild(u.el('a', { href: '#/' + it[0], 'data-route': it[0], text: it[1] }));
      });
    });
  }

  function onRoute(id, screen) {
    var hash = location.hash.replace(/^#\//, '');
    document.querySelectorAll('#reviewer-nav a').forEach(function (a) {
      var r = a.getAttribute('data-route');
      var match = r === hash || (r.indexOf('?') < 0 && r === id && hash.indexOf('?') < 0);
      if (match) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    document.getElementById('reviewer-note-text').textContent = screen.note || '';
    document.getElementById('view').focus({ preventScroll: true });
  }

  function applyTheme() {
    var night = u.store.get('theme', 'day') === 'night';
    document.documentElement.setAttribute('data-theme', night ? 'night' : 'day');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', night ? '#171A21' : '#F6F1E7');
  }

  Sutra.app = {
    startScreen: function () { return 'opening'; },
    afterOpening: function () {
      if (u.store.get('lang', null)) Sutra.router.replace('home');
      else Sutra.router.replace('language');
    },
    onRoute: onRoute,
    applyTheme: applyTheme,
    paintChrome: paintChrome
  };

  document.getElementById('btn-back').addEventListener('click', function () { Sutra.router.back(); });
  document.getElementById('btn-lang').addEventListener('click', openLangSheet);
  document.getElementById('lang-sheet').addEventListener('click', function (e) { if (e.target.id === 'lang-sheet') e.currentTarget.hidden = true; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') document.getElementById('lang-sheet').hidden = true; });
  document.getElementById('btn-sound').addEventListener('click', function () {
    Sutra.voice.setEnabled(!Sutra.voice.enabled);
    paintChrome();
  });

  Sutra.i18n.onChange(function () {
    paintChrome();
    Sutra.router.rerender();
  });

  applyTheme();
  buildReviewerNav();
  Sutra.i18n.setLang(u.store.get('lang', 'en'), true);
  paintChrome();
  Sutra.router.start();
})();
