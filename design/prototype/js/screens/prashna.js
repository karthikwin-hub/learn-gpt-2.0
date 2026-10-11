/* Prashna: one question and a committed guess before Bodha. The guess is never marked; Bodha reveals the answer. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;

  Sutra.screens.prashna = {
    title: 'prashna.title',
    stage: 'shravana', step: 'prashna',
    note: 'Prashna (question): under a minute. One picture, one real question, three choices. The child must commit to a guess before Bodha explains; the guess is shown back on Bodha\'s first card without being marked right or wrong. A short prediction activates what the child already thinks, which Bodha then confirms or refutes (RESEARCH C5, C6, C22).',
    render: function (view, state, params) {
      var knotId = params.k && Sutra.lessons[params.k] && Sutra.lessons[params.k].prashna ? params.k : 'N1';
      var L = Sutra.lessons[knotId];
      var cid = L.content || knotId;
      ui.enterThread(knotId, 'prashna', { k: knotId });
      var guess = u.store.get('guess:' + knotId, null);

      if (L.prashna.art) view.appendChild(u.el('div', { class: 'wonder-art' }, [L.prashna.art()]));
      view.appendChild(u.el('p', { class: 'muted small', text: t('knot.' + knotId + '.t') }));
      view.appendChild(u.el('h2', { class: 'screen-title', text: t('prashna.' + cid + '.q') }));
      view.appendChild(u.el('p', { class: 'muted', text: t('prashna.sub') }));

      var choices = u.el('div', { class: 'prashna-choices', role: 'group', 'aria-label': t('prashna.myGuess') });
      [0, 1, 2].forEach(function (i) {
        choices.appendChild(u.el('button', {
          class: 'choice', type: 'button', 'aria-pressed': String(guess === i), text: t('prashna.' + cid + '.c' + (i + 1)),
          onclick: function () { u.store.set('guess:' + knotId, i); Sutra.router.rerender(); }
        }));
      });
      view.appendChild(choices);
      var go = ui.btn(t('prashna.go'), function () { Sutra.router.go('bodha', { k: knotId }); }, 'primary block');
      if (guess === null) go.disabled = true;
      view.appendChild(u.el('div', { class: 'btn-row' }, [go]));
      if (!state.spoken) { state.spoken = true; setTimeout(function () { Sutra.voice.say(t('prashna.' + cid + '.q')); }, 350); }
    }
  };
})();
