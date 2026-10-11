/*
 * Loka manipulatives, drawn from plain state: the thread of time (I2), the Earth's spin and orbit (E1) and the
 * courtyard map (E4). Rules live in model/world.js.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var F = Sutra.fig;
  var W = Sutra.model.world;
  var t = function (k, v) { return Sutra.i18n.t(k, v); };

  function yearLabel(y) { return y < 0 ? t('time.bce', { y: -y }) : t('time.ce', { y: y }); }

  /* ---------- thread of time ---------- */
  /* A true-scale number line for years. Hung events get a label in the next slot, with a leader to their real place. */
  Sutra.manip.timeline = function (opts) {
    var from = -3000, to = 2100, x0 = 20, x1 = 340, axisY = 70;
    var X = function (y) { return x0 + ((y - from) / (to - from)) * (x1 - x0); };
    var s = F.svg(360, 210, t('time.art'));
    var drawn = opts.reveal === undefined ? 1 : opts.reveal;
    s.appendChild(F.line(x0, axisY, x0 + (x1 - x0) * drawn, axisY, { stroke: 'var(--thread)', sw: 4 }));
    [-3000, -2000, -1000, 1000, 2000].forEach(function (y) {
      if (X(y) > x0 + (x1 - x0) * drawn) return;
      s.appendChild(F.line(X(y), axisY - 6, X(y), axisY + 6, { stroke: 'var(--ink-soft)', sw: 1.5 }));
      s.appendChild(F.text(X(y), axisY - 16, yearLabel(y), { size: 10, weight: 400, color: 'var(--ink-soft)' }));
    });
    if (drawn >= 0.6) {
      s.appendChild(F.circle(X(0), axisY, 7, { fill: 'var(--paper-raised)', stroke: 'var(--kumkum)', sw: 2.5 }));
      s.appendChild(F.text(X(0), axisY - 34, t('time.join'), { size: 10, color: 'var(--kumkum)' }));
      s.appendChild(F.arrow(X(0) - 12, axisY + 20, X(0) - 52, axisY + 20, 'var(--indigo)'));
      s.appendChild(F.arrow(X(0) + 12, axisY + 20, X(0) + 52, axisY + 20, 'var(--teal)'));
    }
    if (opts.span) {
      var a = X(opts.span[0]), b = X(opts.span[1]);
      s.appendChild(F.path('M' + a + ' ' + (axisY - 4) + ' Q ' + (a + b) / 2 + ' ' + (axisY - 46) + ' ' + b + ' ' + (axisY - 4), { stroke: 'var(--leaf)', sw: 2.5 }));
    }
    var hung = opts.hung || [];
    var slotW = (x1 - x0) / 6;
    hung.forEach(function (id, i) {
      var ev = W.EVENTS.filter(function (e) { return e.id === id; })[0];
      var sx = x0 + slotW * (i + 0.5), ly = i % 2 ? 176 : 140;
      s.appendChild(F.line(X(ev.year), axisY + 4, sx, ly - 14, { stroke: 'var(--ink-soft)', sw: 1 }));
      s.appendChild(F.circle(X(ev.year), axisY, 5, { fill: 'var(--leaf)' }));
      s.appendChild(F.text(sx, ly - 4, t('time.e.' + id), { size: 10 }));
      s.appendChild(F.text(sx, ly + 10, (ev.about ? t('time.about') + ' ' : '') + yearLabel(ev.year), { size: 9, weight: 400, color: 'var(--ink-soft)' }));
    });
    return s;
  };

  /* ---------- the Earth ---------- */
  /* Spin view: looking down on the North Pole, the Sun to the left. India's marker turns with the Earth. */
  Sutra.manip.earthSpin = function (opts) {
    var cx = 220, cy = 120, r = 74, th = (opts.spin * Math.PI) / 180;
    var hour = W.hourAt(opts.spin);
    var s = F.svg(360, 240, t('earth.spinArt', { h: hour }));
    s.appendChild(F.circle(30, cy, 22, { fill: 'var(--thread)' }));
    for (var i = -2; i <= 2; i++) s.appendChild(F.arrow(60, cy + i * 30, 120, cy + i * 30, 'var(--thread)'));
    s.appendChild(F.circle(cx, cy, r, { fill: 'var(--teal-soft)', stroke: 'var(--ink-soft)', sw: 1.5 }));
    s.appendChild(F.path('M' + cx + ' ' + (cy - r) + ' A ' + r + ' ' + r + ' 0 0 1 ' + cx + ' ' + (cy + r) + ' Z', { fill: 'var(--ink)', stroke: 'none', opacity: 0.55 }));
    s.appendChild(F.circle(cx, cy, 4, { fill: 'var(--ink)' }));
    s.appendChild(F.path('M' + (cx + r + 14) + ' ' + (cy + 30) + ' A ' + (r + 14) + ' ' + (r + 14) + ' 0 0 1 ' + (cx + 30) + ' ' + (cy + r + 14), { stroke: 'var(--ink-soft)', sw: 1.5 }));
    var mx = cx - r * Math.cos(th), my = cy + r * Math.sin(th);
    s.appendChild(F.circle(mx, my, 9, { fill: 'var(--kumkum)', stroke: 'var(--paper-raised)', sw: 2 }));
    s.appendChild(F.text(mx + (mx < cx ? -14 : 14), my, t('earth.india'), { size: 12, anchor: mx < cx ? 'end' : 'start' }));
    s.appendChild(F.text(cx, 232, t('earth.hourLine', { h: String(hour).padStart(2, '0') + ':00', d: t(W.isDay(hour) ? 'earth.day' : 'earth.night') }), { size: 13 }));
    return s;
  };
  /* Orbit view: the axis always points the same way (tilted to the right), so June leans the north toward the Sun. */
  Sutra.manip.earthOrbit = function (opts) {
    var cx = 180, cy = 116, R = 120, ry = 70;
    var phi = Math.PI + ((opts.month - 5.5) / 12) * 2 * Math.PI;
    var ex = cx + R * Math.cos(phi), ey = cy + ry * Math.sin(phi);
    var season = W.northernSeason(opts.month);
    var s = F.svg(360, 240, t('earth.orbitArt', { m: t('earth.m' + opts.month), s: t('earth.season.' + season) }));
    s.appendChild(u.svg('ellipse', { cx: cx, cy: cy, rx: R, ry: ry, fill: 'none', stroke: 'var(--hair)', 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }));
    s.appendChild(F.circle(cx, cy, 20, { fill: 'var(--thread)' }));
    [0, 2, 5, 8, 11].forEach(function (m) {
      var p = Math.PI + ((m - 5.5) / 12) * 2 * Math.PI;
      s.appendChild(F.text(cx + (R + 22) * Math.cos(p), cy + (ry + 18) * Math.sin(p), t('earth.m' + m), { size: 10, weight: 400, color: 'var(--ink-soft)' }));
    });
    s.appendChild(F.circle(ex, ey, 18, { fill: 'var(--teal-soft)', stroke: 'var(--ink-soft)', sw: 1.5 }));
    var tilt = (23.5 * Math.PI) / 180;
    s.appendChild(F.line(ex - 28 * Math.sin(tilt), ey + 28 * Math.cos(tilt), ex + 28 * Math.sin(tilt), ey - 28 * Math.cos(tilt), { stroke: 'var(--ink)', sw: 2 }));
    s.appendChild(F.text(ex + 32 * Math.sin(tilt), ey - 34, 'N', { size: 11 }));
    s.appendChild(F.text(cx, 228, t('earth.orbitLine', { m: t('earth.m' + opts.month), s: t('earth.season.' + season) }), { size: 13 }));
    return s;
  };

  /* ---------- courtyard map ---------- */
  var COLS = 8, ROWS = 6, CELL = 38;
  var PLACES = { gate: [1, 5], well: [6, 1], tulsi: [3, 2], tree: [1, 1], house: [[4, 3], [5, 3], [4, 4], [5, 4]] };
  function isBlocked(c, r) {
    if (c < 0 || r < 0 || c >= COLS || r >= ROWS) return true;
    return PLACES.house.some(function (h) { return h[0] === c && h[1] === r; });
  }
  Sutra.manip.mapGrid = { PLACES: PLACES, isBlocked: isBlocked };
  Sutra.manip.courtyardMap = function (opts) {
    opts = opts || {};
    var x0 = 20, y0 = 26, flat = opts.flat === undefined ? 1 : opts.flat;
    var s = F.svg(360, 300, t('map.art'));
    /* Tipped courtyard: a sheared, squashed parallelogram that straightens into the top view, kept centred. */
    var sx = 1 - (1 - flat) * 0.25, shear = -(1 - flat) * 0.5, sy = 0.45 + 0.55 * flat;
    var e = 180 - (shear * ROWS * CELL + sx * COLS * CELL) / 2;
    var g = u.svg('g', { transform: 'translate(' + e + ' ' + (y0 + (1 - flat) * 70) + ') matrix(' + sx + ' 0 ' + shear + ' ' + sy + ' 0 0)' });
    g.appendChild(F.rect(0, 0, COLS * CELL, ROWS * CELL, { fill: 'var(--ground-soft, var(--paper-sunk))', stroke: 'var(--ink)', sw: 3, rx: 0 }));
    for (var c = 1; c < COLS; c++) g.appendChild(F.line(c * CELL, 0, c * CELL, ROWS * CELL, { stroke: 'var(--hair)', sw: 1 }));
    for (var r = 1; r < ROWS; r++) g.appendChild(F.line(0, r * CELL, COLS * CELL, r * CELL, { stroke: 'var(--hair)', sw: 1 }));
    PLACES.house.forEach(function (h) { g.appendChild(F.rect(h[0] * CELL + 2, h[1] * CELL + 2, CELL - 4, CELL - 4, { fill: '#B35C4A', stroke: 'none', rx: 1 })); });
    var cen = function (p) { return [p[0] * CELL + CELL / 2, p[1] * CELL + CELL / 2]; };
    var w = cen(PLACES.well), tr = cen(PLACES.tree), tu = cen(PLACES.tulsi), gt = cen(PLACES.gate);
    g.appendChild(F.circle(w[0], w[1], 13, { fill: 'var(--teal-soft)', stroke: 'var(--teal)', sw: 3 }));
    g.appendChild(F.circle(tr[0], tr[1], 15, { fill: 'var(--leaf-soft)', stroke: 'var(--leaf)', sw: 2 }));
    g.appendChild(F.rect(tu[0] - 8, tu[1] - 8, 16, 16, { fill: 'var(--leaf)', stroke: 'none', rx: 2 }));
    g.appendChild(F.rect(gt[0] - 15, ROWS * CELL - 4, 30, 8, { fill: 'var(--paper-raised)', stroke: 'none', rx: 0 }));
    if (opts.path && opts.path.length > 1) {
      g.appendChild(F.path(opts.path.map(function (p, i) { var q = cen(p); return (i ? 'L' : 'M') + q[0] + ' ' + q[1]; }).join(' '), { stroke: 'var(--thread)', sw: 4, dash: '1 7' }));
    }
    var me = opts.path ? opts.path[opts.path.length - 1] : null;
    if (me) { var m = cen(me); g.appendChild(F.circle(m[0], m[1], 9, { fill: 'var(--kumkum)', stroke: 'var(--paper-raised)', sw: 2 })); }
    s.appendChild(g);
    if (flat >= 1) {
      s.appendChild(F.text(338, 12, 'N', { size: 13 }));
      s.appendChild(F.arrow(338, 46, 338, 20, 'var(--ink)'));
      var ly = y0 + ROWS * CELL + 18;
      s.appendChild(F.circle(30, ly, 6, { fill: 'var(--teal-soft)', stroke: 'var(--teal)', sw: 2 }));
      s.appendChild(F.text(42, ly, t('map.well'), { size: 11, weight: 400, anchor: 'start' }));
      s.appendChild(F.circle(110, ly, 6, { fill: 'var(--leaf-soft)', stroke: 'var(--leaf)', sw: 2 }));
      s.appendChild(F.text(122, ly, t('map.tree'), { size: 11, weight: 400, anchor: 'start' }));
      s.appendChild(F.rect(184, ly - 6, 12, 12, { fill: '#B35C4A', stroke: 'none', rx: 1 }));
      s.appendChild(F.text(202, ly, t('map.house'), { size: 11, weight: 400, anchor: 'start' }));
      s.appendChild(F.text(340, ly, t('map.scale', { m: opts.scale || 5 }), { size: 11, anchor: 'end' }));
    }
    return s;
  };
})();
