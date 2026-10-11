/* A good place to stop: names what was understood, shows the child's own sentence, and ends the session calmly. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;

  Sutra.screens.stop = {
    title: 'stop.title',
    hideBack: true,
    note: 'A good place to stop. No score, no confetti, no "come back tomorrow or lose your streak". It names what the child now knows, in plain words, shows their own sentence and a picture of their model, and offers a calm way out. Ending on understanding, not on an urge to continue, is a deliberate choice against attention-capturing design.',
    render: function (view, state, params) {
      u.store.set('continue', null);
      var pages = u.store.get('pages', []);
      var page = pages.filter(function (p) { return String(p.id) === String(params.page); })[0] || pages[pages.length - 1];

      var wrap = u.el('div', { class: 'stop' });
      if (page) {
        var thumb = u.el('div', { class: 'thumb' });
        if (Sutra.thumb) thumb.appendChild(Sutra.thumb(page));
        wrap.appendChild(thumb);
        wrap.appendChild(u.el('h2', { class: 'screen-title', text: t('stop.heading') }));
        wrap.appendChild(u.el('p', { class: 'say', text: t('know.' + page.thread) }));
        wrap.appendChild(u.el('p', { class: 'muted small', text: t('stop.yourWords') }));
        var s = Sutra.screens.explain.sentence(page.thread, page.fills);
        s.classList.add('sutra');
        wrap.appendChild(s);
        if (Sutra.voiceNotes[page.id]) wrap.appendChild(u.el('audio', { controls: true, src: Sutra.voiceNotes[page.id], style: { width: '100%' } }));
      } else {
        wrap.appendChild(u.el('h2', { class: 'screen-title', text: t('stop.heading') }));
      }
      wrap.appendChild(u.el('p', { class: 'muted', text: t('stop.later') }));
      view.appendChild(wrap);
      view.appendChild(u.el('div', { class: 'btn-row' }, [
        ui.btn(t('stop.loom'), function () { Sutra.router.go('home'); }, 'primary'),
        ui.btn(t('stop.notebook'), function () { Sutra.router.go('notebook'); }, 'quiet')
      ]));
      if (page && state.spoken !== page.id) { state.spoken = page.id; Sutra.voice.say(t('know.' + page.thread), { noCaption: true }); }
    }
  };
})();
