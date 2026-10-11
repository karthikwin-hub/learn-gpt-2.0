/* Small SVG builders for Bodha diagrams, and the lesson registry each lesson file adds itself to. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;

  Sutra.lessons = Sutra.lessons || {};

  var F = {
    svg: function (w, h, label) { return u.svg('svg', { viewBox: '0 0 ' + w + ' ' + h, role: 'img', 'aria-label': label || '' }); },
    text: function (x, y, s, o) {
      o = o || {};
      return u.svg('text', {
        x: x, y: y, 'text-anchor': o.anchor || 'middle', 'dominant-baseline': 'middle', 'font-size': o.size || 14,
        'font-weight': o.weight || 600, fill: o.color || 'var(--ink)', 'font-family': 'var(--font)', text: String(s)
      });
    },
    rect: function (x, y, w, h, o) {
      o = o || {};
      return u.svg('rect', { x: x, y: y, width: w, height: h, rx: o.rx === undefined ? 3 : o.rx, fill: o.fill || 'none', stroke: o.stroke || 'var(--ink-soft)', 'stroke-width': o.sw || 1.2, 'stroke-dasharray': o.dash || null, opacity: o.opacity || null });
    },
    line: function (x1, y1, x2, y2, o) {
      o = o || {};
      return u.svg('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: o.stroke || 'var(--ink)', 'stroke-width': o.sw || 2, 'stroke-linecap': 'round', 'stroke-dasharray': o.dash || null });
    },
    circle: function (cx, cy, r, o) {
      o = o || {};
      return u.svg('circle', { cx: cx, cy: cy, r: r, fill: o.fill || 'none', stroke: o.stroke || 'none', 'stroke-width': o.sw || 1.5, opacity: o.opacity || null });
    },
    path: function (d, o) {
      o = o || {};
      return u.svg('path', { d: d, fill: o.fill || 'none', stroke: o.stroke || 'var(--ink)', 'stroke-width': o.sw || 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': o.dash || null, opacity: o.opacity || null });
    },
    arrow: function (x1, y1, x2, y2, color) {
      var a = Math.atan2(y2 - y1, x2 - x1), h = 8;
      var g = u.svg('g', {}, [F.line(x1, y1, x2, y2, { stroke: color || 'var(--ink)', sw: 2.2 })]);
      g.appendChild(F.path('M' + (x2 - h * Math.cos(a - 0.45)) + ' ' + (y2 - h * Math.sin(a - 0.45)) + ' L' + x2 + ' ' + y2 + ' L' + (x2 - h * Math.cos(a + 0.45)) + ' ' + (y2 - h * Math.sin(a + 0.45)), { stroke: color || 'var(--ink)', sw: 2.2 }));
      return g;
    },
    /* A grid of square cells; fill(c, r) returns a fill colour or null. */
    grid: function (x, y, cols, rows, cell, fill) {
      var g = u.svg('g');
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          g.appendChild(F.rect(x + c * cell + 1, y + r * cell + 1, cell - 2, cell - 2, { fill: (fill && fill(c, r)) || 'var(--paper-sunk)', stroke: 'none', rx: 2 }));
        }
      }
      return g;
    },
    /* Makes an SVG part a keyboard-reachable button; without onTap the node is returned unchanged. */
    tappable: function (node, label, onTap) {
      if (!onTap) return node;
      node.setAttribute('role', 'button');
      node.setAttribute('tabindex', '0');
      node.setAttribute('aria-label', label);
      node.setAttribute('class', 'tap');
      node.addEventListener('click', onTap);
      node.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTap(); } });
      return node;
    },
    add: function (parent, kids) { kids.forEach(function (k) { if (k) parent.appendChild(k); }); return parent; },
    /* The six Bodha cards in their fixed order; figs maps a card key to fig(step, state). */
    cards: function (ex, figs) {
      return [
        { key: 'what', fig: figs.what }, { key: 'idea', fig: figs.idea }, { key: 'why', fig: figs.why },
        { key: 'example', steps: ex, fig: figs.example }, { key: 'where', fig: figs.where }, { key: 'sutra' }
      ];
    }
  };

  Sutra.fig = F;
})();
