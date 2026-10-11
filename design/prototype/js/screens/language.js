(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var t = Sutra.ui.t;

  Sutra.screens.language = {
    title: 'language.title',
    hideBack: true,
    note: 'First run only. No account, no name, no age, no email. Each language is written in its own script, and tapping one switches the whole app immediately and speaks a sample. This choice can be changed at any time from the letter button in the top bar.',
    render: function (view) {
      view.appendChild(Sutra.ui.title(t('language.heading')));
      view.appendChild(u.el('p', { class: 'muted', text: t('language.sub') }));
      var list = u.el('div', { class: 'lang-cards', role: 'radiogroup', 'aria-label': t('language.heading') });
      Object.keys(Sutra.i18n.LANGS).forEach(function (code) {
        var L = Sutra.i18n.LANGS[code];
        list.appendChild(u.el('button', {
          class: 'lang-card', role: 'radio', lang: code, 'aria-checked': String(code === Sutra.i18n.lang),
          onclick: function () {
            Sutra.i18n.setLang(code);
            Sutra.voice.say(Sutra.i18n.tIn(code, 'app.tagline'));
          }
        }, [
          u.el('div', { class: 'native', text: L.native }),
          u.el('div', { class: 'sample', text: Sutra.i18n.tIn(code, 'app.tagline') })
        ]));
      });
      view.appendChild(list);
      view.appendChild(Sutra.ui.btn(t('language.continue'), function () {
        u.store.set('lang', Sutra.i18n.lang);
        Sutra.router.replace('home');
      }, 'primary block'));
    }
  };
})();
