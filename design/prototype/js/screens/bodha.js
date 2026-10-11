/*
 * Bodha: the concept explained before practice (docs/product/EXPERIENCE.md §3.2).
 * Cards come from Sutra.lessons[knot].cards; strings are 'bodha.<content>.<card>'. Key words are written
 * [[glossId|shown words]] inside strings and become tappable bridge cards.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;
  var C = Sutra.model.curriculum;

  var SIZES = ['1', '1.15', '1.3'];
  var TERM = /\[\[([\w.]+)\|([^\]]+)\]\]/g;

  function plain(s) { return s.replace(TERM, function (m, id, shown) { return shown; }); }

  function contentId(knot) { var L = Sutra.lessons[knot]; return (L && L.content) || knot; }

  /* Text with [[id|words]] turned into buttons that open a bridge card under the paragraph. */
  function richPara(str, onTerm) {
    var p = u.el('p', { class: 'bodha-text' });
    var last = 0;
    str.replace(TERM, function (m, id, shown, at) {
      if (at > last) p.appendChild(document.createTextNode(str.slice(last, at)));
      p.appendChild(u.el('button', { class: 'term', type: 'button', text: shown, onclick: function () { onTerm(id, shown); } }));
      last = at + m.length;
      return m;
    });
    if (last < str.length) p.appendChild(document.createTextNode(str.slice(last)));
    return p;
  }

  function cardText(cid, card, step) {
    var key = 'bodha.' + cid + '.' + card.key;
    if (card.key === 'example') {
      var parts = [t(key)];
      for (var i = 1; i <= step; i++) parts.push(t(key + i));
      return parts;
    }
    if (card.key === 'what') return [t(key), t('bodha.' + cid + '.can')];
    return [t(key)];
  }

  Sutra.screens.bodha = {
    title: 'bodha.title',
    stage: 'shravana', step: 'bodha',
    note: 'Bodha: the idea explained before the child tries anything (product feedback on phase 1). Five or six cards: what we are learning, the idea, why it works, a worked example revealed one step at a time, where you see it, and the sutra to keep. At most three short sentences per card and one diagram, read aloud, at the child\'s own pace. Underlined words open a bridge card with the everyday meaning and the English school term. A− and A+ change the text size. Evidence: explicit instruction first for this age (RESEARCH C6, C20), segmenting, signalling and pre-training (C9), refutation of the misconception (C22).',
    render: function (view, state, params) {
      var knotId = params.k && Sutra.lessons[params.k] ? params.k : 'M4';
      var knot = C.findKnot(knotId);
      var L = Sutra.lessons[knotId];
      var cid = contentId(knotId);
      var cards = L.cards;
      ui.enterThread(knotId, 'bodha', { k: knotId });
      if (state.card === undefined) state.card = 0;
      if (state.step === undefined) state.step = 0;
      state.card = u.clamp(state.card, 0, cards.length - 1);
      var card = cards[state.card];
      var exSteps = card.steps || 0;

      var size = u.store.get('textSize', 0);
      var wrap = u.el('div', { class: 'bodha', style: { '--bodha-scale': SIZES[size] } });

      var dots = u.el('div', { class: 'bodha-dots', 'aria-hidden': 'true' }, cards.map(function (c, i) {
        return u.el('span', { class: i === state.card ? 'on' : i < state.card ? 'past' : '' });
      }));
      var sizeRow = u.el('div', { class: 'bodha-size', role: 'group', 'aria-label': t('bodha.textSize') }, [
        u.el('button', { type: 'button', class: 'chip', 'aria-label': t('bodha.smaller'), text: 'A−', disabled: size === 0 ? true : null, onclick: function () { u.store.set('textSize', Math.max(0, size - 1)); Sutra.router.rerender(); } }),
        u.el('button', { type: 'button', class: 'chip', 'aria-label': t('bodha.bigger'), text: 'A+', disabled: size === SIZES.length - 1 ? true : null, onclick: function () { u.store.set('textSize', Math.min(SIZES.length - 1, size + 1)); Sutra.router.rerender(); } })
      ]);
      wrap.appendChild(u.el('div', { class: 'bodha-top' }, [dots, sizeRow]));
      wrap.appendChild(u.el('p', { class: 'bodha-knot', text: t('knot.' + knotId + '.t') }));
      wrap.appendChild(u.el('h2', { class: 'screen-title', text: t('bodha.t.' + card.key) }));

      var bridge = u.el('div', { class: 'bridge', hidden: true, 'aria-live': 'polite' });
      function onTerm(id, shown) {
        u.clear(bridge);
        bridge.hidden = false;
        bridge.appendChild(u.el('p', { class: 'bridge-word', text: shown }));
        bridge.appendChild(u.el('p', { text: t('gloss.' + id) }));
        if (Sutra.i18n.lang !== 'en') bridge.appendChild(u.el('p', { class: 'muted small', lang: 'en', text: t('bodha.inEnglish') + ' ' + Sutra.i18n.tIn('en', 'gloss.' + id + '.en') }));
        Sutra.voice.say(shown + '. ' + t('gloss.' + id), { noCaption: true });
      }

      if (card.key === 'what' && L.prashna) {
        var guess = u.store.get('guess:' + knotId, null);
        if (guess !== null) {
          wrap.appendChild(u.el('div', { class: 'guess-reveal' }, [
            u.el('p', { class: 'muted small', text: t('bodha.youGuessed', { g: t('prashna.' + cid + '.c' + (guess + 1)) }) }),
            u.el('p', { text: t('prashna.' + cid + '.a') })
          ]));
        }
      }

      var texts = cardText(cid, card, state.step);
      if (card.key === 'sutra') {
        wrap.appendChild(u.el('p', { class: 'bodha-sutra', text: plain(t('bodha.' + cid + '.sutra')) }));
      } else if (card.key === 'example') {
        wrap.appendChild(richPara(texts[0], onTerm));
        var ol = u.el('ol', { class: 'bodha-steps' });
        texts.slice(1).forEach(function (s, i) { ol.appendChild(u.el('li', { class: i === texts.length - 2 ? 'new' : '' }, [richPara(s, onTerm)])); });
        wrap.appendChild(ol);
      } else {
        texts.forEach(function (s) { wrap.appendChild(richPara(s, onTerm)); });
      }
      wrap.appendChild(bridge);

      if (card.fig) {
        var fig = card.fig(state.step, state);
        if (fig) wrap.appendChild(u.el('div', { class: 'model bodha-fig' }, [fig]));
      }

      var actions = u.el('div', { class: 'btn-row bodha-nav' });
      if (card.key === 'example' && state.step < exSteps) {
        actions.appendChild(ui.btn(t(state.step === 0 ? 'bodha.showFirst' : 'bodha.nextStep'), function () { state.step++; Sutra.router.rerender(); speak(true); }, 'thread block'));
      }
      var back = ui.btn(t('bodha.back'), function () { state.card--; state.step = 0; state.spoken = null; Sutra.router.rerender(); }, 'quiet');
      if (state.card === 0) back.disabled = true;
      actions.appendChild(back);
      actions.appendChild(ui.btn(t('bodha.hear'), function () { speak(false, true); }, 'quiet'));
      if (card.key === 'sutra') {
        var kept = u.store.get('sutras', []);
        var isKept = kept.indexOf(knotId) >= 0;
        actions.appendChild(ui.btn(isKept ? t('bodha.kept') : t('bodha.keep'), function () {
          var list = u.store.get('sutras', []);
          if (list.indexOf(knotId) < 0) { list.push(knotId); u.store.set('sutras', list); }
          Sutra.router.rerender();
        }, isKept ? 'quiet' : 'thread'));
        var next = C.afterBodha(knot);
        actions.appendChild(ui.btn(t(next.route === 'film' ? 'bodha.toFilm' : 'bodha.toBench'), function () {
          state.card = 0; state.step = 0; state.spoken = null;
          Sutra.router.go(next.route, next.params);
        }, 'primary block'));
      } else {
        var nextBtn = ui.btn(t('bodha.next'), function () { state.card++; state.step = 0; state.spoken = null; Sutra.router.rerender(); }, 'primary');
        if (card.key === 'example' && state.step < exSteps) nextBtn.classList.remove('primary');
        actions.appendChild(nextBtn);
      }
      wrap.appendChild(actions);
      view.appendChild(wrap);

      function speak(lastOnly, force) {
        var all = cardText(cid, card, state.step).map(plain);
        var text = card.key === 'sutra' ? plain(t('bodha.' + cid + '.sutra')) : lastOnly ? all[all.length - 1] : all.join(' ');
        if (!force && state.spoken === state.card + ':' + state.step) return;
        state.spoken = state.card + ':' + state.step;
        Sutra.voice.say(text, { noCaption: true });
      }
      speak(false);
    }
  };

  Sutra.bodhaPlain = plain;
})();
