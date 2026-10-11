/* The Ashram (home): a banyan courtyard with one card per Shala, a "Remember this?" recall and a Continue card. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;
  var C = Sutra.model.curriculum;

  /* A banyan in thread line: trunk, canopy arcs and hanging aerial roots. No figures, no symbols. */
  function banyan() {
    var s = u.svg('svg', { viewBox: '0 0 360 170', role: 'img', 'aria-label': t('ashram.art') });
    s.appendChild(u.svg('ellipse', { cx: 180, cy: 160, rx: 150, ry: 9, fill: 'var(--paper-sunk)' }));
    var ink = { fill: 'none', stroke: 'var(--ink)', 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    var canopy = [
      'M60 92 C 40 60, 90 30, 130 44 C 140 14, 200 8, 222 36 C 262 18, 316 46, 300 88',
      'M60 92 C 120 104, 240 104, 300 88'
    ];
    var trunk = 'M168 158 C 172 130, 166 112, 176 96 M192 158 C 188 130, 196 112, 186 96';
    var branches = 'M176 96 C 150 84, 120 82, 96 88 M186 96 C 210 84, 244 82, 268 88 M180 96 L 180 60';
    var paths = canopy.concat([trunk, branches]).map(function (d) { return u.svg('path', Object.assign({ d: d }, ink)); });
    var roots = [];
    [92, 116, 238, 262].forEach(function (x, i) {
      roots.push(u.svg('path', { d: 'M' + x + ' ' + (90 + (i % 2) * 4) + ' L ' + x + ' ' + (132 + (i % 2) * 10), fill: 'none', stroke: 'var(--thread)', 'stroke-width': 1.8, 'stroke-linecap': 'round' }));
    });
    var leaves = [];
    [[100, 60], [140, 40], [184, 28], [226, 42], [266, 62], [212, 70], [150, 72]].forEach(function (p) {
      leaves.push(u.svg('ellipse', { cx: p[0], cy: p[1], rx: 7, ry: 4.2, transform: 'rotate(-24 ' + p[0] + ' ' + p[1] + ')', fill: 'var(--leaf-soft)', stroke: 'var(--leaf)', 'stroke-width': 1.2 }));
    });
    paths.concat(roots).concat(leaves).forEach(function (n) { s.appendChild(n); });
    s.drawAll = function () { paths.concat(roots).forEach(function (p, i) { u.drawStroke(p, 900, i * 90); }); };
    return s;
  }

  /* One small motif per Shala, drawn in the meaning colours: kolam dots, a leaf and drop, a globe line. */
  function motif(id) {
    var s = u.svg('svg', { viewBox: '0 0 48 48', 'aria-hidden': 'true' });
    if (id === 'ganita') {
      [[16, 16], [32, 16], [16, 32], [32, 32], [24, 24]].forEach(function (p) { s.appendChild(u.svg('circle', { cx: p[0], cy: p[1], r: 2.6, fill: 'var(--ink)' })); });
      s.appendChild(u.svg('path', { d: 'M24 8 C 40 8, 40 24, 24 24 C 8 24, 8 40, 24 40 C 40 40, 40 24, 24 24 C 8 24, 8 8, 24 8', fill: 'none', stroke: 'var(--thread)', 'stroke-width': 2 }));
    } else if (id === 'vijnana') {
      s.appendChild(u.svg('path', { d: 'M12 34 C 12 18, 26 10, 38 10 C 38 24, 30 36, 14 36 Z', fill: 'var(--leaf-soft)', stroke: 'var(--leaf)', 'stroke-width': 2 }));
      s.appendChild(u.svg('path', { d: 'M14 36 L 30 18', stroke: 'var(--leaf)', 'stroke-width': 1.5 }));
      s.appendChild(u.svg('path', { d: 'M36 30 C 36 30, 30 37, 33 41 C 35 44, 40 43, 40 39 C 40 36, 36 30, 36 30 Z', fill: 'var(--teal-soft)', stroke: 'var(--teal)', 'stroke-width': 1.5 }));
    } else {
      s.appendChild(u.svg('circle', { cx: 24, cy: 24, r: 15, fill: 'var(--indigo-soft)', stroke: 'var(--indigo)', 'stroke-width': 2 }));
      s.appendChild(u.svg('ellipse', { cx: 24, cy: 24, rx: 6.5, ry: 15, fill: 'none', stroke: 'var(--indigo)', 'stroke-width': 1.3 }));
      s.appendChild(u.svg('path', { d: 'M9 24 H39 M12 16 H36 M12 32 H36', stroke: 'var(--indigo)', 'stroke-width': 1.1 }));
    }
    return s;
  }

  function rememberCard(state) {
    var kept = u.store.get('sutras', []).filter(function (id) { return C.findKnot(id); });
    if (!kept.length) return null;
    var id = kept[Math.floor(Date.now() / 86400000) % kept.length];
    var card = u.el('section', { class: 'card remember' }, [
      u.el('h3', { class: 'pane-title', text: t('ashram.remember') }),
      u.el('p', { text: t('ashram.rememberQ', { name: t('knot.' + id + '.t') }) })
    ]);
    if (state.revealed === id) card.appendChild(u.el('p', { class: 'sutra-line', text: t('bodha.' + id + '.sutra') }));
    else card.appendChild(ui.btn(t('ashram.reveal'), function () { state.revealed = id; Sutra.router.rerender(); }, 'quiet'));
    return card;
  }

  Sutra.screens.home = {
    title: 'home.title',
    hideBack: true,
    note: 'The Ashram: the home of Gurukul, a calm courtyard around a banyan drawn in thread line. One card per Shala (subject): Ganita, Vijnana and Loka, each in the child\'s script with the school subject beneath, and up to four pictures of models the child has built there. No greeting, no streak, no points. "Remember this?" appears once the Pothi holds a sutra: the child recalls it before revealing it (retrieval practice). Guardrail: no deities, symbols or robed figures; the frame is secular.',
    render: function (view, state) {
      var done = u.store.get('done', []);
      var pages = u.store.get('pages', []);
      var cont = u.store.get('continue', null);

      var art = banyan();
      view.appendChild(u.el('div', { class: 'ashram-art' }, [art]));
      view.appendChild(u.el('p', { class: 'loom-intro', text: t('ashram.intro') }));

      if (cont && C.findKnot(cont.knot)) {
        view.appendChild(u.el('button', {
          class: 'continue-card', type: 'button', onclick: function () { Sutra.router.go(cont.route, cont.params || undefined); }
        }, [
          u.el('span', { class: 'thumb', html: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 5l8 7-8 7"/></svg>' }),
          u.el('span', {}, [u.el('span', { class: 'label', text: t('home.continue') }), u.el('br'), u.el('span', { class: 'name', text: t('knot.' + cont.knot + '.t') })])
        ]));
      }

      var remember = rememberCard(state);
      if (remember) view.appendChild(remember);

      var list = u.el('div', { class: 'shala-list' });
      C.SECTIONS.forEach(function (s) {
        var ids = C.knotsIn(s.id).map(function (k) { return k.id; });
        var mine = pages.filter(function (p) { return ids.indexOf(p.thread) >= 0; });
        var seen = {};
        var thumbs = mine.reverse().filter(function (p) { if (seen[p.thread]) return false; seen[p.thread] = true; return true; }).slice(0, 4);
        var countDone = ids.filter(function (id) { return done.indexOf(id) >= 0; }).length;
        list.appendChild(u.el('button', {
          class: 'shala-card', type: 'button', onclick: function () { Sutra.router.go('shala', { s: s.id }); }
        }, [
          u.el('span', { class: 'motif' }, [motif(s.id)]),
          u.el('span', { class: 'body' }, [
            u.el('span', { class: 'name', text: t('section.' + s.id) }),
            u.el('span', { class: 'sub', text: t('section.' + s.id + '.sub') }),
            u.el('span', { class: 'meta', text: t('ashram.threads', { n: s.threads.length }) + (countDone ? ' · ' + t('ashram.explored', { n: countDone }) : '') }),
            thumbs.length ? u.el('span', { class: 'thumbs' }, thumbs.map(function (p) { return u.el('i', {}, [Sutra.thumb(p)]); })) : null
          ])
        ]));
      });
      view.appendChild(list);

      view.appendChild(u.el('div', { class: 'home-links' }, [
        ui.btn(t('home.toJaal'), function () { Sutra.router.go('jaal'); }, 'quiet'),
        ui.btn(t('home.notebook'), function () { Sutra.router.go('notebook'); }, 'quiet')
      ]));
      view.appendChild(u.el('div', { class: 'home-links end' }, [
        u.el('button', { class: 'link-btn', type: 'button', text: t('home.grownups'), onclick: function () { Sutra.router.go('grownups'); } })
      ]));

      if (!state.drawn) { state.drawn = true; requestAnimationFrame(function () { art.drawAll(); }); }
    }
  };
})();
