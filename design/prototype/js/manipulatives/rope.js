/*
 * Rope and Pegs: a closed rope of fixed length around four pegs.
 * The free corner can only slide along the diagonal where width + height = half the rope,
 * so the perimeter never changes while the area does. Rectangles come from model/geometry.js.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var G = Sutra.model.geometry;

  var CELL = 24, X0 = 34, Y0 = 30;

  Sutra.manip.rope = function (opts) {
    var perimeter = opts.perimeter;
    var rect = G.ropeRect(perimeter, opts.width);
    var tried = {};
    var uid = 'rp' + Math.random().toString(36).slice(2, 7);
    var W = 360, H = 330;

    var root = u.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img' });
    root.appendChild(u.svg('defs', {}, [
      u.svg('pattern', { id: uid + '-m', width: CELL, height: CELL, patternUnits: 'userSpaceOnUse', x: X0, y: Y0 }, [
        u.svg('rect', { x: 1.2, y: 1.2, width: CELL - 2.4, height: CELL - 2.4, rx: 3, fill: 'var(--leaf-soft)' })
      ])
    ]));

    var grid = u.svg('g', { opacity: 0.55 });
    for (var i = 0; i <= 12; i++) {
      grid.appendChild(u.svg('line', { x1: X0 + i * CELL, y1: Y0, x2: X0 + i * CELL, y2: Y0 + 12 * CELL, stroke: 'var(--hair)', 'stroke-width': 1 }));
      grid.appendChild(u.svg('line', { x1: X0, y1: Y0 + i * CELL, x2: X0 + 12 * CELL, y2: Y0 + i * CELL, stroke: 'var(--hair)', 'stroke-width': 1 }));
    }
    root.appendChild(grid);

    var guide = u.svg('line', { stroke: 'var(--thread)', 'stroke-width': 2, 'stroke-dasharray': '2 6', 'stroke-linecap': 'round', opacity: 0.7 });
    var ghostLayer = u.svg('g');
    var fill = u.svg('rect', { x: X0, y: Y0, fill: 'url(#' + uid + '-m)' });
    var ropeA = u.svg('rect', { x: X0, y: Y0, fill: 'none', stroke: 'var(--thread)', 'stroke-width': 6, rx: 3 });
    var ropeB = u.svg('rect', { x: X0, y: Y0, fill: 'none', stroke: '#9A6512', 'stroke-width': 1.6, 'stroke-dasharray': '3 5', rx: 3, opacity: 0.8 });
    var pegs = u.svg('g');
    var labels = u.svg('g');
    var handle = u.svg('g', { class: 'handle', tabindex: '0', role: 'slider', 'aria-label': opts.handleLabel || '' }, [
      u.svg('circle', { class: 'hit', r: 30 }),
      u.svg('circle', { class: 'ring', r: 13 })
    ]);
    [guide, ghostLayer, fill, ropeA, ropeB, pegs, labels, handle].forEach(function (n) { root.appendChild(n); });

    function label(x, y, s, color, size) {
      return u.svg('text', { x: x, y: y, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': size || 14, 'font-weight': 600, fill: color, 'font-family': 'var(--font)', text: s });
    }

    function paintGhosts() {
      u.clear(ghostLayer);
      Object.keys(tried).forEach(function (k) {
        var r = tried[k];
        if (r.w === rect.w) return;
        ghostLayer.appendChild(u.svg('rect', { x: X0, y: Y0, width: r.w * CELL, height: r.h * CELL, fill: 'none', stroke: 'var(--ghost)', 'stroke-width': 1.5, 'stroke-dasharray': '4 3' }));
      });
    }

    function paint() {
      var half = perimeter / 2;
      guide.setAttribute('x1', X0 + 1 * CELL); guide.setAttribute('y1', Y0 + (half - 1) * CELL);
      guide.setAttribute('x2', X0 + (half - 1) * CELL); guide.setAttribute('y2', Y0 + 1 * CELL);
      var w = rect.w * CELL, h = rect.h * CELL;
      [fill, ropeA, ropeB].forEach(function (n) { n.setAttribute('width', w); n.setAttribute('height', h); });
      u.clear(pegs);
      [[0, 0], [w, 0], [0, h]].forEach(function (p) {
        pegs.appendChild(u.svg('circle', { cx: X0 + p[0], cy: Y0 + p[1], r: 6.5, fill: 'var(--ink)' }));
      });
      handle.setAttribute('transform', 'translate(' + (X0 + w) + ',' + (Y0 + h) + ')');
      handle.setAttribute('aria-valuetext', rect.w + ' × ' + rect.h);
      u.clear(labels);
      labels.appendChild(label(X0 + w / 2, Y0 - 14, rect.w + ' m', 'var(--indigo)'));
      labels.appendChild(label(X0 - 18, Y0 + h / 2, rect.h + ' m', 'var(--teal)'));
      if (w >= 40 && h >= 30) labels.appendChild(label(X0 + w / 2, Y0 + h / 2, String(rect.area), 'var(--leaf)', 22));
      root.setAttribute('aria-label', rect.w + ' × ' + rect.h + ', ' + rect.area);
      paintGhosts();
    }

    function set(width, silent) {
      var next = G.ropeRect(perimeter, width);
      if (next.w === rect.w) return;
      rect = next;
      tried[rect.w] = rect;
      paint();
      if (!silent) Sutra.voice.tone('tick');
      if (opts.onChange) opts.onChange(rect, tried);
    }

    var offDrag = u.drag(handle, {
      start: function () { handle.classList.add('held'); },
      move: function (e) {
        var p = u.svgPoint(root, e);
        var half = perimeter / 2;
        var gx = (p.x - X0) / CELL, gy = (p.y - Y0) / CELL;
        set((gx - gy + half) / 2);
      },
      end: function () { handle.classList.remove('held'); if (opts.onRelease) opts.onRelease(rect, tried); }
    });
    handle.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); set(rect.w + 1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); set(rect.w - 1); }
    });

    tried[rect.w] = rect;
    paint();

    return {
      node: root,
      set: function (w) { set(w); },
      get: function () { return rect; },
      tried: function () { return tried; },
      setPerimeter: function (p) { perimeter = p; tried = {}; rect = G.ropeRect(perimeter, Math.min(rect.w, perimeter / 2 - 1)); tried[rect.w] = rect; paint(); if (opts.onChange) opts.onChange(rect, tried); },
      destroy: offDrag
    };
  };

  /* The "area hill": one bar per possible width; bars appear only once tried. */
  Sutra.manip.areaHill = function (perimeter, tried, current) {
    var opts = G.ropeOptions(perimeter);
    var max = G.maxAreaRect(perimeter).area;
    var W = 320, H = 110, bw = W / opts.length;
    var root = u.svg('svg', { viewBox: '0 0 ' + W + ' ' + (H + 22), role: 'img' });
    opts.forEach(function (r, i) {
      var h = (r.area / max) * (H - 8);
      var on = !!tried[r.w];
      root.appendChild(u.svg('rect', {
        x: i * bw + 3, y: H - h, width: bw - 6, height: h, rx: 3,
        fill: on ? (r.w === current.w ? 'var(--leaf)' : 'var(--leaf-soft)') : 'none',
        stroke: on ? 'none' : 'var(--ghost)', 'stroke-dasharray': on ? '0' : '3 3'
      }));
      root.appendChild(u.svg('text', { x: i * bw + bw / 2, y: H + 14, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--ink-soft)', 'font-family': 'var(--font)', text: String(r.w) }));
      if (on) root.appendChild(u.svg('text', { x: i * bw + bw / 2, y: H - h - 6, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 600, fill: 'var(--ink)', 'font-family': 'var(--font)', text: String(r.area) }));
    });
    return root;
  };
})();
