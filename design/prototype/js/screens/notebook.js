/* The Notebook: one page per idea the child explained, with a tiny picture of the model they built. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;
  var G = Sutra.model.geometry;

  var INK = 'var(--ink-soft)';

  function rectThumb(m) {
    var c = m.cols || 23, r = m.rows || 14;
    var k = 40 / Math.max(c, r), w = c * k, h = r * k, x = (48 - w) / 2, y = (48 - h) / 2;
    var out = [u.svg('rect', { x: x, y: y, width: w, height: h, fill: 'var(--leaf-soft)', stroke: INK, 'stroke-width': 1 })];
    if (c >= 10 && c % 10) out.push(u.svg('line', { x1: x + Math.floor(c / 10) * 10 * k, y1: y, x2: x + Math.floor(c / 10) * 10 * k, y2: y + h, stroke: 'var(--thread)', 'stroke-width': 1.5 }));
    if (r >= 10 && r % 10) out.push(u.svg('line', { x1: x, y1: y + Math.floor(r / 10) * 10 * k, x2: x + w, y2: y + Math.floor(r / 10) * 10 * k, stroke: 'var(--thread)', 'stroke-width': 1.5 }));
    return out;
  }

  function shareThumb(m, leftover) {
    var total = m.total || (leftover ? 14 : 12), plates = m.plates || 4;
    var s = Sutra.model.divide.share(total, plates);
    var out = [];
    var cols = Math.min(plates, 3), rowsN = Math.ceil(plates / cols);
    for (var i = 0; i < plates; i++) {
      var cx = 24 + ((i % cols) - (cols - 1) / 2) * 15;
      var cy = 19 + (Math.floor(i / cols) - (rowsN - 1) / 2) * 16;
      out.push(u.svg('circle', { cx: cx, cy: cy, r: 7, fill: 'var(--paper-raised)', stroke: INK, 'stroke-width': 1 }));
      out.push(u.svg('text', { x: cx, y: cy + 0.5, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 7, 'font-weight': 700, fill: 'var(--ink)', 'font-family': 'var(--font)', text: String(s.each) }));
    }
    if (s.remainder) {
      for (var j = 0; j < s.remainder; j++) out.push(u.svg('circle', { cx: 10 + j * 7, cy: 43, r: 2.6, fill: m.cut || leftover ? 'var(--thread)' : 'var(--kumkum)' }));
    }
    return out;
  }

  function ropeThumb(m) {
    var r = G.ropeRect(m.perimeter || 24, m.w || 6);
    var k = 38 / (r.perimeter / 2), w = r.w * k, h = r.h * k;
    return [u.svg('rect', { x: (48 - w) / 2, y: (48 - h) / 2, width: w, height: h, fill: 'var(--leaf-soft)', stroke: 'var(--thread)', 'stroke-width': 2 })];
  }

  function kolamThumb(m) {
    var order = m.order || 4, mode = m.mode || 'mirror';
    var strokes = m.strokes && m.strokes.length ? m.strokes : null;
    var out = [u.svg('rect', { x: 0, y: 0, width: 48, height: 48, fill: 'var(--ground)' })];
    var tf = G.symmetryTransforms(order, mode);
    var src = strokes || [[{ x: 0.1, y: -0.05 }, { x: 0.35, y: -0.3 }, { x: 0.6, y: -0.05 }]];
    src.forEach(function (pts) {
      tf.forEach(function (f) {
        var d = pts.map(function (p, i) { var q = f(p); return (i ? 'L' : 'M') + (24 + q.x * 22).toFixed(1) + ' ' + (24 + q.y * 22).toFixed(1); }).join('');
        out.push(u.svg('path', { d: d, fill: 'none', stroke: 'var(--rice)', 'stroke-width': 1.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
      });
    });
    return out;
  }

  function drumsThumb(m) {
    var a = m.a || 3, b = m.b || 4, lcm = Sutra.model.multiply.lcm(a, b), n = Math.min(24, lcm * 2);
    var out = [];
    for (var i = 1; i <= n; i++) {
      var x = 4 + (i - 1) * (40 / (n - 1 || 1));
      if (i % a === 0) out.push(u.svg('circle', { cx: x, cy: 18, r: 1.8, fill: 'var(--indigo)' }));
      if (i % b === 0) out.push(u.svg('circle', { cx: x, cy: 30, r: 1.8, fill: 'var(--teal)' }));
      if (i % lcm === 0) out.push(u.svg('circle', { cx: x, cy: 24, r: 5, fill: 'none', stroke: 'var(--thread)', 'stroke-width': 1.5 }));
    }
    return out;
  }

  function setsThumb(m) {
    var lay = m.layout || 'overlap';
    var A = { x: 18, y: 24, r: 13 }, B = { x: 30, y: 24, r: 13 };
    if (lay === 'apart') { A = { x: 13, y: 24, r: 10 }; B = { x: 35, y: 24, r: 10 }; }
    if (lay === 'inside') { A = { x: 24, y: 24, r: 18 }; B = { x: 26, y: 26, r: 9 }; }
    return [
      u.svg('circle', { cx: A.x, cy: A.y, r: A.r, fill: 'var(--indigo-soft)', stroke: 'var(--indigo)', 'stroke-width': 1.5, 'fill-opacity': 0.6 }),
      u.svg('circle', { cx: B.x, cy: B.y, r: B.r, fill: 'var(--teal-soft)', stroke: 'var(--teal)', 'stroke-width': 1.5, 'fill-opacity': 0.6 })
    ];
  }

  function logicThumb(m) {
    var type = m.type || 'and';
    var out = [];
    var rows = Sutra.model.logic.inputs(type);
    rows.forEach(function (inp, i) {
      var y = 8 + i * (32 / Math.max(1, rows.length - 1));
      var yes = Sutra.model.logic.gate(type, inp[0], inp[1]);
      out.push(u.svg('circle', { cx: 12, cy: y, r: 3, fill: inp[0] ? 'var(--indigo)' : 'none', stroke: 'var(--indigo)' }));
      if (type !== 'not') out.push(u.svg('circle', { cx: 22, cy: y, r: 3, fill: inp[1] ? 'var(--teal)' : 'none', stroke: 'var(--teal)' }));
      out.push(u.svg('circle', { cx: 36, cy: y, r: 3.5, fill: yes ? 'var(--leaf)' : 'var(--ghost)' }));
    });
    return out;
  }

  Sutra.thumb = function (page) {
    var m = page.model || {};
    var kids;
    switch (page.thread) {
      case 'M4': kids = rectThumb(m); break;
      case 'D1': kids = shareThumb(m, false); break;
      case 'D3': kids = shareThumb(m, true); break;
      case 'G2': kids = ropeThumb(m); break;
      case 'G4': kids = kolamThumb(m); break;
      case 'M5': kids = drumsThumb(m); break;
      case 'S2': case 'S3': kids = setsThumb(m); break;
      case 'L2': kids = logicThumb(m); break;
      default: kids = [u.svg('circle', { cx: 24, cy: 24, r: 8, fill: 'var(--thread)' })];
    }
    return u.svg('svg', { viewBox: '0 0 48 48', width: '100%', height: '100%', 'aria-hidden': 'true' }, kids);
  };

  function dateLabel(iso) {
    try {
      return new Date(iso).toLocaleDateString(document.documentElement.lang || 'en', { day: 'numeric', month: 'short' });
    } catch (e) { return ''; }
  }

  Sutra.screens.notebook = {
    title: 'notebook.title',
    note: 'The Notebook replaces points and badges. Each page is the child\'s own sentence plus a small picture of the model they built, newest first. Tapping a page reopens the workbench exactly as they left it. Sentences are stored as tile choices, so they re-read in whichever language is chosen. Pages live only on this phone.',
    render: function (view) {
      var pages = u.store.get('pages', []).slice().reverse();
      view.appendChild(u.el('p', { class: 'muted', text: t('notebook.intro') }));
      if (!pages.length) {
        var sample = { thread: 'M4', fills: ['tens', 'room', 'add'], model: { cols: 23, rows: 14 } };
        view.appendChild(u.el('div', { class: 'page sample', 'aria-hidden': 'true' }, [
          u.el('span', { class: 'thumb' }, [Sutra.thumb(sample)]),
          u.el('span', {}, [(function () { var s = Sutra.screens.explain.sentence('M4', sample.fills); s.classList.add('sutra'); return s; })()])
        ]));
        view.appendChild(u.el('p', { class: 'say', text: t('notebook.empty') }));
        view.appendChild(ui.next(t('notebook.toLoom'), 'home'));
        return;
      }
      pages.forEach(function (p) {
        var s = Sutra.screens.explain.sentence(p.thread, p.fills, { tag: 'span' });
        s.classList.add('sutra');
        view.appendChild(u.el('button', {
          class: 'page', type: 'button',
          onclick: function () {
            var key = Sutra.screens.explain.stateKey[p.thread];
            if (key) Sutra.state[key] = JSON.parse(JSON.stringify(p.model || {}));
            Sutra.router.go(p.route, p.params || undefined);
          }
        }, [
          u.el('span', { class: 'thumb' }, [Sutra.thumb(p)]),
          u.el('span', {}, [
            u.el('span', { class: 'meta', text: t('knot.' + p.thread + '.t') + ' · ' + dateLabel(p.date) }),
            s,
            Sutra.voiceNotes[p.id] ? u.el('span', { class: 'meta', text: t('notebook.hasVoice') }) : null
          ])
        ]));
      });
    }
  };
})();
