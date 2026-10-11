/*
 * Rubber Rectangle: a field of unit tiles whose corner the child drags.
 * Optional cut at the tens shows the four rooms of the distributive law.
 * Rendering only; every number comes from model/multiply.js.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var M = Sutra.model.multiply;

  Sutra.manip.areaGrid = function (opts) {
    var maxCols = opts.maxCols || 30, maxRows = opts.maxRows || 20;
    var cell = opts.cell || 11;
    var padL = 34, padT = 34, padR = 22, padB = 22;
    var W = padL + maxCols * cell + padR;
    var H = padT + maxRows * cell + padB;
    var cols = opts.cols, rows = opts.rows;
    var cut = false;
    var focus = null;
    var ghosts = [];
    var uid = 'ag' + Math.random().toString(36).slice(2, 7);

    var root = u.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img' });
    var defs = u.svg('defs');
    var pattern = u.svg('pattern', { id: uid + '-tile', width: cell, height: cell, patternUnits: 'userSpaceOnUse' }, [
      u.svg('rect', { x: 0.9, y: 0.9, width: cell - 1.8, height: cell - 1.8, rx: 1.8, fill: 'var(--paper-raised)', stroke: 'var(--ghost)', 'stroke-width': 0.8 })
    ]);
    defs.appendChild(pattern);
    root.appendChild(defs);

    var field = u.svg('g', { transform: 'translate(' + padL + ',' + padT + ')' });
    root.appendChild(field);

    var dotLayer = u.svg('g', { opacity: 0.5 });
    for (var i = 0; i <= maxCols; i += 5) {
      for (var j = 0; j <= maxRows; j += 5) {
        dotLayer.appendChild(u.svg('circle', { cx: i * cell, cy: j * cell, r: 1.2, fill: 'var(--ink-soft)' }));
      }
    }
    field.appendChild(dotLayer);

    var ghostLayer = u.svg('g');
    var tiles = u.svg('rect', { x: 0, y: 0, fill: 'url(#' + uid + '-tile)' });
    var roomLayer = u.svg('g');
    var edge = u.svg('rect', { x: 0, y: 0, fill: 'none', stroke: 'var(--thread)', 'stroke-width': 3, rx: 2 });
    var cutLayer = u.svg('g');
    var labelLayer = u.svg('g');
    field.appendChild(ghostLayer);
    field.appendChild(tiles);
    field.appendChild(roomLayer);
    field.appendChild(edge);
    field.appendChild(cutLayer);
    field.appendChild(labelLayer);

    var handle = u.svg('g', { class: 'handle', tabindex: '0', role: 'slider', 'aria-label': opts.handleLabel || '' }, [
      u.svg('circle', { class: 'hit', r: 28 }),
      u.svg('circle', { class: 'ring', r: 13 })
    ]);
    var finger = u.svg('circle', { r: 20, fill: 'var(--ink)', opacity: 0, 'pointer-events': 'none' });
    field.appendChild(handle);
    field.appendChild(finger);

    var ROOM_FILL = ['var(--indigo-soft)', 'var(--teal-soft)', 'var(--leaf-soft)', 'var(--thread-soft)'];

    function text(x, y, s, cls, anchor, color) {
      return u.svg('text', {
        x: x, y: y, 'text-anchor': anchor || 'middle', 'dominant-baseline': 'middle',
        'font-size': cls === 'big' ? 14 : 12, 'font-weight': 600, fill: color || 'var(--ink)',
        'font-family': 'var(--font)', text: s
      });
    }

    function paint() {
      var w = cols * cell, h = rows * cell;
      tiles.setAttribute('width', w);
      tiles.setAttribute('height', h);
      edge.setAttribute('width', w);
      edge.setAttribute('height', h);
      handle.setAttribute('transform', 'translate(' + w + ',' + h + ')');
      handle.setAttribute('aria-valuetext', cols + ' × ' + rows + ' = ' + M.area(cols, rows));
      root.setAttribute('aria-label', (opts.describe ? opts.describe(cols, rows) : cols + ' × ' + rows));

      u.clear(labelLayer);
      labelLayer.appendChild(u.svg('path', { d: 'M0 -12 V-17 H' + w + ' V-12', fill: 'none', stroke: 'var(--indigo)', 'stroke-width': 2 }));
      labelLayer.appendChild(text(w / 2, -26, String(cols), 'big', 'middle', 'var(--indigo)'));
      labelLayer.appendChild(u.svg('path', { d: 'M-12 0 H-17 V' + h + ' H-12', fill: 'none', stroke: 'var(--teal)', 'stroke-width': 2 }));
      labelLayer.appendChild(text(-25, h / 2, String(rows), 'big', 'middle', 'var(--teal)'));

      u.clear(roomLayer);
      u.clear(cutLayer);
      if (cut) {
        var rooms = M.partialProducts(cols, rows);
        var rowTens = M.splitTensOnes(rows).tens;
        rooms.forEach(function (r, idx) {
          var strip = rowTens > 0 && r.y === 0 ? 'tens' : 'ones';
          var isFocus = focus === null || focus === strip;
          roomLayer.appendChild(u.svg('rect', {
            x: r.x * cell, y: r.y * cell, width: r.w * cell, height: r.h * cell,
            fill: ROOM_FILL[idx % 4], opacity: isFocus ? 1 : 0.25
          }));
          var cx = (r.x + r.w / 2) * cell, cy = (r.y + r.h / 2) * cell;
          var fits = r.w * cell >= 30 && r.h * cell >= 22;
          var label = text(cx, cy, String(r.product), fits ? 'big' : 'small');
          if (!fits) {
            label.setAttribute('x', r.x * cell + r.w * cell + 4);
            label.setAttribute('text-anchor', 'start');
            if (r.x * cell + r.w * cell + 30 > maxCols * cell) { label.setAttribute('x', cx); label.setAttribute('y', (r.y + r.h) * cell + 10); label.setAttribute('text-anchor', 'middle'); }
          }
          label.setAttribute('opacity', isFocus ? 1 : 0.35);
          roomLayer.appendChild(label);
        });
        var c = M.splitTensOnes(cols), rr = M.splitTensOnes(rows);
        if (c.tens > 0 && c.ones > 0) cutLayer.appendChild(u.svg('line', { x1: c.tens * cell, y1: -4, x2: c.tens * cell, y2: h + 4, stroke: 'var(--thread)', 'stroke-width': 2.5, 'stroke-dasharray': '0', 'stroke-linecap': 'round' }));
        if (rr.tens > 0 && rr.ones > 0) cutLayer.appendChild(u.svg('line', { x1: -4, y1: rr.tens * cell, x2: w + 4, y2: rr.tens * cell, stroke: 'var(--thread)', 'stroke-width': 2.5, 'stroke-linecap': 'round' }));
      }
    }

    function set(c, r, silent) {
      c = u.clamp(Math.round(c), 1, maxCols);
      r = u.clamp(Math.round(r), 1, maxRows);
      if (c === cols && r === rows) return;
      cols = c; rows = r;
      paint();
      if (!silent) Sutra.voice.tone('tick');
      if (!silent && opts.onChange) opts.onChange(cols, rows);
    }

    function addGhost() {
      ghosts.push({ c: cols, r: rows });
      if (ghosts.length > 6) ghosts.shift();
      u.clear(ghostLayer);
      ghosts.forEach(function (g) {
        ghostLayer.appendChild(u.svg('rect', { x: 0, y: 0, width: g.c * cell, height: g.r * cell, fill: 'none', stroke: 'var(--ghost)', 'stroke-width': 1.5, 'stroke-dasharray': '4 3' }));
      });
    }

    var startDims = null;
    var offDrag = u.drag(handle, {
      start: function () { handle.classList.add('held'); startDims = { c: cols, r: rows }; },
      move: function (e) {
        var p = u.svgPoint(root, e);
        set((p.x - padL) / cell, (p.y - padT) / cell);
      },
      end: function () {
        handle.classList.remove('held');
        if (startDims && (startDims.c !== cols || startDims.r !== rows)) {
          var keep = { c: cols, r: rows };
          cols = startDims.c; rows = startDims.r; addGhost(); cols = keep.c; rows = keep.r;
          if (opts.onRelease) opts.onRelease(cols, rows);
        }
      }
    });

    handle.addEventListener('keydown', function (e) {
      var map = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] };
      if (map[e.key]) { e.preventDefault(); set(cols + map[e.key][0], rows + map[e.key][1]); }
    });

    /* The demonstrating hand: drags the corner to a target, so step 1 is fully worked. */
    function demo(tc, tr, done) {
      var fc = cols, fr = rows;
      finger.setAttribute('opacity', 0.18);
      return u.tween(1600, function (p) {
        var e = u.easeInOut(p);
        var c = u.lerp(fc, tc, e), r = u.lerp(fr, tr, e);
        finger.setAttribute('cx', c * cell);
        finger.setAttribute('cy', r * cell);
        set(c, r, true);
      }, function () {
        finger.setAttribute('opacity', 0);
        set(tc, tr, true);
        if (opts.onChange) opts.onChange(cols, rows);
        if (done) done();
      });
    }

    paint();

    return {
      node: root,
      set: function (c, r) { set(c, r, true); },
      get: function () { return { cols: cols, rows: rows }; },
      setCut: function (on) { cut = on; paint(); if (on) cutLayer.querySelectorAll('line').forEach(function (l) { u.drawStroke(l, 700); }); },
      isCut: function () { return cut; },
      focusStrip: function (strip) { focus = strip; paint(); },
      clearGhosts: function () { ghosts = []; u.clear(ghostLayer); },
      demo: demo,
      destroy: offDrag
    };
  };
})();
