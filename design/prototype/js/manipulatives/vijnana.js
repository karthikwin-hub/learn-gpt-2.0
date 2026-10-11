/*
 * Vijnana manipulatives, drawn from plain state: the digestion path (B3), the friction ramp (K2) and the lamp and
 * stick (R1). Rules live in model/science.js.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var F = Sutra.fig;
  var S = Sutra.model.science;
  var t = function (k, v) { return Sutra.i18n.t(k, v); };

  var tappable = F.tappable;

  /* ---------- digestion path ---------- */
  var ORGAN_SHAPE = {
    mouth: { d: 'M150 46 Q180 62 210 46', food: [180, 52], label: [262, 48] },
    pipe: { d: 'M180 62 L180 128', food: [180, 96], label: [262, 96] },
    stomach: { d: 'M180 128 C 230 118, 250 160, 222 182 C 200 198, 170 178, 176 160', food: [214, 158], label: [292, 150] },
    small: { d: 'M176 196 q 20 -10 40 0 q 20 10 0 20 q -20 10 -40 0 q -20 -10 0 -20 M176 216 q 20 10 40 0 q 20 -10 0 20 q -20 10 -40 0', food: [196, 222], label: [292, 226] },
    large: { d: 'M128 270 L128 196 Q128 186 140 186 L150 186 M246 186 L258 186 Q268 186 268 196 L268 270 L200 270 L200 300', food: [262, 240], label: [62, 250] }
  };
  Sutra.manip.digestPath = function (opts) {
    opts = opts || {};
    var s = F.svg(360, 320, t('dig.art'));
    s.appendChild(F.path('M180 6 C 140 6, 130 40, 150 60 L 112 90 C 96 140, 100 240, 116 300 L 244 300 C 260 240, 264 140, 248 90 L 210 60 C 230 40, 220 6, 180 6 Z', { stroke: 'var(--hair)', sw: 2, fill: 'var(--paper-raised)' }));
    S.organOrder().forEach(function (id) {
      var sh = ORGAN_SHAPE[id];
      var on = opts.highlight === id, done = opts.placed && opts.placed.indexOf(id) >= 0;
      var g = u.svg('g');
      g.appendChild(F.path(sh.d, { stroke: on ? 'var(--thread)' : done ? 'var(--leaf)' : 'var(--ink-soft)', sw: on ? 7 : 5 }));
      if (opts.labels !== false) g.appendChild(F.text(sh.label[0], sh.label[1], t('dig.o.' + id), { size: 12, color: on ? 'var(--ink)' : 'var(--ink-soft)', anchor: 'middle' }));
      if (opts.onTap) tappable(g, t('dig.o.' + id), function () { opts.onTap(id); });
      s.appendChild(g);
    });
    if (opts.blood) s.appendChild(F.path('M150 214 C 120 200, 110 160, 120 120', { stroke: 'var(--kumkum)', sw: 3, dash: '2 5' }));
    if (opts.at) {
      var p = ORGAN_SHAPE[opts.at].food;
      s.appendChild(F.circle(p[0], p[1], opts.at === 'large' ? 4 : 8, { fill: 'var(--thread)', stroke: 'var(--ink)', sw: 1 }));
    }
    return s;
  };

  /* ---------- friction ramp ---------- */
  var SURFACE_FILL = { tile: 'var(--paper-raised)', wood: '#C9A06A', rug: '#B35C4A', sand: '#E2C98A' };
  Sutra.manip.ramp = function (opts) {
    var h = opts.height, k = 11;
    var s = F.svg(360, 170, t('ramp.art', { h: h, s: t('ramp.s.' + opts.surface) }));
    var top = 120 - h * 22;
    s.appendChild(F.path('M10 120 L 10 ' + top + ' L 70 120 Z', { fill: 'var(--paper-sunk)', stroke: 'var(--ink-soft)', sw: 2 }));
    s.appendChild(F.rect(70, 120, 284, 12, { fill: SURFACE_FILL[opts.surface], stroke: 'var(--ink-soft)', sw: 1, rx: 0 }));
    if (opts.surface === 'sand' || opts.surface === 'rug') for (var i = 0; i < 40; i++) s.appendChild(F.circle(74 + i * 7, 124 + (i % 3) * 3, 1, { fill: 'var(--ink-soft)' }));
    for (var m = 0; m <= 25; m += 5) {
      s.appendChild(F.line(70 + m * k, 136, 70 + m * k, 142, { stroke: 'var(--ink-soft)', sw: 1 }));
      s.appendChild(F.text(70 + m * k, 152, m, { size: 10, weight: 400, color: 'var(--ink-soft)' }));
    }
    s.appendChild(F.text(354, 165, t('ramp.pretend'), { size: 10, weight: 400, color: 'var(--ink-soft)', anchor: 'end' }));
    (opts.ghosts || []).slice().sort(function (a, b) { return a.d - b.d; }).forEach(function (gh, i) {
      var ly = 92 - (i % 2) * 14;
      s.appendChild(F.line(70 + gh.d * k, ly + 6, 70 + gh.d * k, 118, { stroke: 'var(--ghost)', sw: 2, dash: '3 3' }));
      s.appendChild(F.text(70 + gh.d * k, ly, t('ramp.s.' + gh.surface), { size: 9, weight: 400, color: 'var(--ink-soft)' }));
    });
    var progress = opts.progress === undefined ? 1 : opts.progress;
    var dist = opts.distance === undefined ? 0 : opts.distance;
    var cx, cy;
    if (opts.distance === undefined) { cx = 16; cy = top - 6; }
    else if (progress < 0.3) { var q = progress / 0.3; cx = 16 + q * 54; cy = top + q * (120 - top) - 6; }
    else { cx = 70 + ((progress - 0.3) / 0.7) * dist * k; cy = 114; }
    s.appendChild(F.rect(cx - 12, cy - 8, 24, 12, { fill: 'var(--indigo)', stroke: 'var(--ink)', sw: 1, rx: 3 }));
    s.appendChild(F.circle(cx - 6, cy + 5, 3.5, { fill: 'var(--ink)' }));
    s.appendChild(F.circle(cx + 6, cy + 5, 3.5, { fill: 'var(--ink)' }));
    return s;
  };

  /* ---------- lamp and stick ---------- */
  Sutra.manip.lampStick = function (opts) {
    var k = 36, ground = 230, stickX = 150;
    var stickH = opts.stickH || 1.5, lampH = opts.lampH, dist = opts.dist || 3;
    var lampX = stickX - dist * k, lampY = ground - lampH * k, topY = ground - stickH * k;
    var len = S.shadowLength(stickH, lampH, dist);
    var s = F.svg(360, 250, t('light.art', { n: isFinite(len) ? Math.round(len * 10) / 10 : '∞' }));
    s.appendChild(F.line(0, ground, 360, ground, { stroke: 'var(--ink-soft)', sw: 2 }));
    var endX = isFinite(len) ? Math.min(358, stickX + len * k) : 358;
    var dark = S.shadowDarkness(opts.material || 'cardboard');
    s.appendChild(F.path('M' + stickX + ' ' + ground + ' L' + endX + ' ' + ground, { stroke: 'var(--ink)', sw: 9, opacity: 0.12 + 0.75 * dark }));
    if (endX >= 358 && opts.material !== 'glass') s.appendChild(F.arrow(330, ground - 14, 354, ground - 14, 'var(--ink-soft)'));
    s.appendChild(F.line(lampX, lampY, lampX, ground, { stroke: 'var(--ink-soft)', sw: 2 }));
    var rayEnd = isFinite(len) ? [endX, ground] : [358, topY];
    s.appendChild(F.line(lampX, lampY, rayEnd[0], rayEnd[1], { stroke: 'var(--thread)', sw: 2, dash: '6 4' }));
    s.appendChild(F.line(lampX, lampY, stickX - 2, ground - 2, { stroke: 'var(--thread)', sw: 1.5, dash: '2 5' }));
    s.appendChild(F.circle(lampX, lampY, 10, { fill: 'var(--thread)', stroke: 'var(--ink)', sw: 1 }));
    var stickFill = opts.material === 'glass' ? 'var(--paper-raised)' : opts.material === 'wax' ? 'var(--thread-soft)' : 'var(--ink)';
    s.appendChild(F.rect(stickX - 4, topY, 8, stickH * k, { fill: stickFill, stroke: 'var(--ink)', sw: 1, rx: 1 }));
    if (isFinite(len)) s.appendChild(F.text((stickX + endX) / 2, ground + 14, t('light.shadowLen', { n: Math.round(len * 10) / 10 }), { size: 12, color: 'var(--ink)' }));
    return s;
  };
})();
