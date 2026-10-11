(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var t = Sutra.ui.t;

  /* Top-down courtyard: walls, a doorway kolam, edge ticks, and one tile named in advance (pre-training). */
  function courtyardArt() {
    var s = u.svg('svg', { viewBox: '0 0 360 250', role: 'img', 'aria-label': t('wonder.m2.art') });
    s.appendChild(u.svg('rect', { x: 0, y: 0, width: 360, height: 250, fill: 'var(--paper-sunk)' }));
    s.appendChild(u.svg('rect', { x: 50, y: 30, width: 260, height: 174, rx: 4, fill: 'var(--paper-raised)', stroke: 'var(--ink)', 'stroke-width': 6 }));
    s.appendChild(u.svg('rect', { x: 158, y: 198, width: 44, height: 12, fill: 'var(--paper-sunk)' }));
    for (var i = 1; i < 6; i++) s.appendChild(u.svg('line', { x1: 53 + (254 / 6) * i, y1: 33, x2: 53 + (254 / 6) * i, y2: 43, stroke: 'var(--ink-soft)', 'stroke-width': 1.5 }));
    for (var j = 1; j < 4; j++) s.appendChild(u.svg('line', { x1: 53, y1: 33 + (168 / 4) * j, x2: 63, y2: 33 + (168 / 4) * j, stroke: 'var(--ink-soft)', 'stroke-width': 1.5 }));
    s.appendChild(u.svg('rect', { x: 55, y: 35, width: 254 / 6 - 4, height: 168 / 4 - 4, rx: 3, fill: 'var(--thread-soft)', stroke: 'var(--thread)', 'stroke-width': 2.5 }));
    s.appendChild(u.svg('text', { x: 55 + 254 / 12, y: 35 + 168 / 8, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 14, 'font-weight': 600, fill: 'var(--ink)', 'font-family': 'var(--font)', text: '1' }));
    var k = Sutra.manip.kolamLine({ m: 2, n: 3 });
    k.setAttribute('x', 156); k.setAttribute('y', 210); k.setAttribute('width', 48); k.setAttribute('height', 36);
    k.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    k.querySelector('.kolam-line').setAttribute('stroke-width', 4);
    s.appendChild(k);
    return s;
  }

  Sutra.screens.wonder = {
    title: 'wonder.title',
    note: 'Step 1 of a thread (under a minute). One real question and one picture. The tile is named before the film (pre-training). The child commits to a guess, which is never marked right or wrong; the film reveals it at the end. Evidence: brief prediction, then direct teaching, suits this age better than open discovery.',
    render: function (view, state) {
      Sutra.ui.enterThread('M2', 'wonder');
      if (state.guess === undefined) state.guess = u.store.get('m2guess', 12);
      view.appendChild(u.el('div', { class: 'wonder-art' }, [courtyardArt()]));
      view.appendChild(u.el('p', { class: 'muted small', text: t('wonder.m2.name') }));
      view.appendChild(u.el('h2', { class: 'screen-title', text: t('wonder.m2.q') }));
      view.appendChild(u.el('p', { class: 'muted', text: t('wonder.m2.sub') }));

      var out = u.el('output', { text: String(state.guess) });
      var range = u.el('input', {
        type: 'range', min: 1, max: 60, value: state.guess, 'aria-label': t('wonder.guessLabel'),
        oninput: function (e) { state.guess = Number(e.target.value); out.textContent = String(state.guess); }
      });
      view.appendChild(u.el('div', { class: 'card' }, [
        u.el('h3', { class: 'pane-title', text: t('wonder.guessLabel') }),
        u.el('div', { class: 'guess-box' }, [out, range])
      ]));
      view.appendChild(u.el('div', { class: 'btn-row' }, [Sutra.ui.btn(t('wonder.go'), function () {
        u.store.set('m2guess', state.guess);
        Sutra.router.go('film');
      }, 'primary block')]));
      setTimeout(function () { Sutra.voice.say(t('wonder.m2.q')); }, 350);
    }
  };
})();
