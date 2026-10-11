/* For grown-ups: behind a two-finger hold, shows this week's notebook pages, how Sutra teaches, privacy and settings. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;

  var HOLD_MS = 2000;

  function holdCheck(view, state) {
    var held = {};
    var start = 0, raf = 0;
    var bar = u.el('i');
    var dots = [0, 1].map(function (i) {
      var d = u.el('button', { class: 'hold-dot', type: 'button', 'aria-label': t('grown.dot', { n: i + 1 }) });
      d.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        held[i] = e.pointerType;
        d.classList.add('held');
        check();
      });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
        d.addEventListener(ev, function () { delete held[i]; d.classList.remove('held'); check(); });
      });
      d.addEventListener('keydown', function (e) {
        if ((e.key === ' ' || e.key === 'Enter') && !held[i]) { e.preventDefault(); held[i] = 'mouse'; d.classList.add('held'); check(); }
      });
      d.addEventListener('keyup', function () { delete held[i]; d.classList.remove('held'); check(); });
      return d;
    });

    /* Touch needs both dots; a mouse or keyboard can only press one, so one held dot is enough there. */
    function ready() {
      var keys = Object.keys(held);
      if (keys.length === 2) return true;
      return keys.length === 1 && held[keys[0]] === 'mouse';
    }

    function check() {
      if (ready()) {
        if (!start) { start = performance.now(); tick(); }
      } else {
        start = 0; cancelAnimationFrame(raf); bar.style.width = '0';
      }
    }

    function tick() {
      raf = requestAnimationFrame(function () {
        if (!start) return;
        var p = Math.min(1, (performance.now() - start) / HOLD_MS);
        bar.style.width = (p * 100) + '%';
        if (p >= 1) { state.unlocked = true; Sutra.router.rerender(); return; }
        tick();
      });
    }

    view.appendChild(u.el('h2', { class: 'screen-title', text: t('grown.heading') }));
    view.appendChild(u.el('p', { text: t('grown.holdPrompt') }));
    view.appendChild(u.el('div', { class: 'hold-check' }, dots));
    view.appendChild(u.el('div', { class: 'progress-ring', 'aria-hidden': 'true' }, [bar]));
    view.appendChild(u.el('p', { class: 'muted small', style: { textAlign: 'center', marginTop: '14px' }, text: t('grown.holdWhy') }));
    return function () { cancelAnimationFrame(raf); };
  }

  function setting(label, control) {
    return u.el('div', { class: 'setting' }, [u.el('span', { text: label }), control]);
  }

  Sutra.screens.grownups = {
    title: 'grown.title',
    note: 'For grown-ups. A two-finger hold (not a sum: maths questions are easy for a child who is learning maths) keeps children out without a password. Shows what was explored this week, as the child\'s own sentences, not time-on-app. Explains the method, states plainly that nothing leaves the phone, and holds the settings. Reset needs two taps. On touch screens both dots must be held; with a mouse or keyboard (this desktop preview) one held dot is accepted, which the real app should revisit.',
    render: function (view, state) {
      if (!state.unlocked) return holdCheck(view, state);

      var weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
      var pages = u.store.get('pages', []).filter(function (p) { return new Date(p.date).getTime() >= weekAgo; }).reverse();
      var week = u.el('section', { class: 'card' }, [u.el('h3', { class: 'pane-title', text: t('grown.week') })]);
      if (!pages.length) week.appendChild(u.el('p', { class: 'muted', text: t('grown.weekEmpty') }));
      else {
        week.appendChild(u.el('ul', { class: 'list-plain' }, pages.map(function (p) {
          return u.el('li', {}, [u.el('strong', { text: t('knot.' + p.thread + '.t') + ': ' }), Sutra.screens.explain.sentenceText(p.thread, p.fills)]);
        })));
      }
      week.appendChild(u.el('button', { class: 'link-btn', text: t('grown.openNotebook'), onclick: function () { Sutra.router.go('notebook'); } }));
      view.appendChild(week);

      view.appendChild(ui.card(t('grown.howTitle'), [u.el('ul', { class: 'list-plain' }, ['grown.how1', 'grown.how2', 'grown.how3', 'grown.how4'].map(function (k) { return u.el('li', { text: t(k) }); }))]));
      view.appendChild(ui.card(t('grown.privacyTitle'), [u.el('ul', { class: 'list-plain' }, ['grown.priv1', 'grown.priv2', 'grown.priv3', 'grown.priv4'].map(function (k) { return u.el('li', { text: t(k) }); }))]));
      view.appendChild(ui.card(t('grown.together'), [u.el('p', { text: t('grown.togetherText') })]));

      var codes = Object.keys(Sutra.i18n.LANGS);
      var settings = u.el('section', { class: 'card' }, [u.el('h3', { class: 'pane-title', text: t('grown.settings') })]);
      settings.appendChild(u.el('div', { style: { padding: '6px 0 10px' } }, [
        u.el('p', { style: { margin: '0 0 8px' }, text: t('chrome.language') }),
        ui.chips(codes.map(function (c) { return { value: c, label: Sutra.i18n.LANGS[c].native }; }), Sutra.i18n.lang, function (c) { Sutra.i18n.setLang(c); }, t('chrome.language'))
      ]));
      settings.appendChild(setting(t('grown.speed'), ui.chips([{ value: 0.8, label: t('grown.slow') }, { value: 0.92, label: t('grown.normal') }], u.store.get('voiceRate', 0.92), function (v) { u.store.set('voiceRate', v); Sutra.voice.say(t('grown.speedSample')); }, t('grown.speed'))));
      settings.appendChild(setting(t('grown.captions'), ui.chips([{ value: 'on', label: t('common.on') }, { value: 'off', label: t('common.off') }], Sutra.voice.captions ? 'on' : 'off', function (v) { Sutra.voice.setCaptions(v === 'on'); }, t('grown.captions'))));
      settings.appendChild(setting(t('grown.night'), ui.chips([{ value: 'day', label: t('common.off') }, { value: 'night', label: t('common.on') }], u.store.get('theme', 'day'), function (v) { u.store.set('theme', v); Sutra.app.applyTheme(); }, t('grown.night'))));

      var resetBtn = ui.btn(t('grown.reset'), function () {
        if (!state.confirmReset) {
          state.confirmReset = true;
          resetBtn.textContent = t('grown.resetConfirm');
          resetBtn.classList.add('thread');
          return;
        }
        u.store.clearAll();
        Object.keys(Sutra.state).forEach(function (k) { delete Sutra.state[k]; });
        Sutra.voiceNotes = {};
        u.toast(t('grown.resetDone'));
        Sutra.app.applyTheme();
        Sutra.router.replace('language');
      }, 'quiet');
      state.confirmReset = false;
      settings.appendChild(u.el('div', { class: 'setting' }, [u.el('span', { class: 'muted small', text: t('grown.resetNote') }), resetBtn]));
      view.appendChild(settings);
    }
  };
})();
