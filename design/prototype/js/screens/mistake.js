/* Spot the mistake: someone else's working, with one wrong step to find. M4 is built in; other lessons supply
   Sutra.lessons[knot].mistake = { steps, wrong, picture(reveal), eq() } with strings 'mistake.<knot>.*'. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;


  /* 23 × 14 as four rooms; the two the working forgot (20 × 4 and 3 × 10) are outlined in kumkum. */
  function rooms(reveal) {
    var k = 7, X = 30, Y = 14;
    var svg = u.svg('svg', { viewBox: '0 0 220 130', role: 'img', 'aria-label': t('mistake.m4.roomsLabel') });
    var parts = [
      { x: 0, y: 0, w: 20, h: 10, n: 200, kept: true },
      { x: 20, y: 0, w: 3, h: 10, n: 30, kept: false },
      { x: 0, y: 10, w: 20, h: 4, n: 80, kept: false },
      { x: 20, y: 10, w: 3, h: 4, n: 12, kept: true }
    ];
    parts.forEach(function (p) {
      var miss = !p.kept && reveal;
      svg.appendChild(u.svg('rect', {
        x: X + p.x * k, y: Y + p.y * k, width: p.w * k, height: p.h * k,
        fill: p.kept ? 'var(--leaf-soft)' : 'var(--paper-sunk)',
        stroke: miss ? 'var(--kumkum)' : 'var(--ink-soft)', 'stroke-width': miss ? 2.5 : 1,
        'stroke-dasharray': miss ? '5 3' : null
      }));
      var label = u.svg('text', {
        x: X + (p.x + p.w / 2) * k, y: Y + (p.y + p.h / 2) * k, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        'font-size': p.w < 5 ? 11 : 14, 'font-weight': 600, fill: miss ? 'var(--kumkum)' : 'var(--ink)', 'font-family': 'var(--font)', text: String(p.n)
      });
      if (p.w < 5) { label.setAttribute('x', X + 23 * k + 14); label.setAttribute('text-anchor', 'start'); }
      svg.appendChild(label);
    });
    svg.appendChild(u.svg('text', { x: X + 10 * k, y: Y - 5, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--indigo)', 'font-family': 'var(--font)', text: '20' }));
    svg.appendChild(u.svg('text', { x: X + 21.5 * k, y: Y - 5, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--indigo)', 'font-family': 'var(--font)', text: '3' }));
    svg.appendChild(u.svg('text', { x: X - 6, y: Y + 5 * k, 'text-anchor': 'end', 'dominant-baseline': 'middle', 'font-size': 11, fill: 'var(--teal)', 'font-family': 'var(--font)', text: '10' }));
    svg.appendChild(u.svg('text', { x: X - 6, y: Y + 12 * k, 'text-anchor': 'end', 'dominant-baseline': 'middle', 'font-size': 11, fill: 'var(--teal)', 'font-family': 'var(--font)', text: '4' }));
    return svg;
  }

  var M4 = {
    steps: 4, wrong: 1, picture: rooms,
    eq: function () { return '200 + <span style="color:var(--kumkum)">30</span> + <span style="color:var(--kumkum)">80</span> + 12 = <span class="r">322</span>'; }
  };

  function entryFor(thread) {
    var L = Sutra.lessons[thread];
    if (L && L.mistake) return { knot: thread, prefix: thread, data: L.mistake };
    return { knot: 'M4', prefix: 'm4', data: M4 };
  }

  Sutra.screens.mistake = {
    stage: 'manana', step: 'mistake',
    title: 'mistake.title',
    note: 'Spot the mistake. Error-finding in someone else\'s worked example strengthens understanding without the sting of being wrong yourself. Tapping a correct step explains why it follows; tapping the wrong step reveals a picture of what went wrong. Each lesson uses the most common mistake for its idea (for M4: multiplying only tens by tens and ones by ones).',
    render: function (view, state) {
      var e = entryFor(Sutra.state.thread);
      var key = function (k) { return 'mistake.' + e.prefix + '.' + k; };
      ui.enterThread(e.knot, 'mistake');
      if (state.knot !== e.knot) { state.knot = e.knot; state.found = false; state.fine = []; }
      var say = u.el('p', { class: 'say', hidden: true });
      var picture = u.el('div', { class: 'model' });
      var after = u.el('div');
      var list = u.el('div', { class: 'work-steps' });

      function paint() {
        u.clear(list);
        for (var n = 0; n < e.data.steps; n++) list.appendChild(stepButton(n));
        u.clear(picture);
        u.clear(after);
        if (state.found) {
          picture.appendChild(e.data.picture(true));
          if (e.data.eq) after.appendChild(u.el('div', { class: 'eq', html: e.data.eq() }));
          after.appendChild(ui.next(t('common.explain'), 'explain'));
        }
      }

      function stepButton(i) {
        var cls = state.found && i === e.data.wrong ? 'found' : state.fine && state.fine.indexOf(i) >= 0 ? 'fine' : '';
        return u.el('button', {
          class: cls, type: 'button',
          onclick: function () {
            if (state.found) return;
            if (i === e.data.wrong) { state.found = true; paint(); ui.say(say, t(key('found')), true); }
            else { state.fine = (state.fine || []).concat([i]); paint(); ui.say(say, t(key('fine' + (i + 1))), true); }
          }
        }, [u.el('span', { class: 'num', text: String(i + 1) }), u.el('span', { text: t(key('s' + (i + 1))) })]);
      }

      view.appendChild(u.el('p', { text: t(key('intro')) }));
      view.appendChild(list);
      view.appendChild(say);
      view.appendChild(picture);
      view.appendChild(after);
      paint();
      if (state.found) ui.say(say, t(key('found')), false);
    }
  };
})();
