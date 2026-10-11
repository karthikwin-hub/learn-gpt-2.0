/*
 * Ganita phase 2 manipulatives, drawn from plain state so Bodha diagrams, workbenches and Pothi thumbs share them:
 * place-value houses (N1), folding strips (N3) and the rupee grid (U1). Rules live in model/number.js.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var F = Sutra.fig;
  var N = Sutra.model.number;
  var t = function (k, v) { return Sutra.i18n.t(k, v); };

  var tappable = F.tappable;

  /* Houses from the largest place on the left to ones on the right. Indian periods are shaded alternately. */
  Sutra.manip.placeHouses = function (opts) {
    var places = opts.places || 7, d = opts.digits, hi = opts.highlight || [];
    var w = 340 / places, H = 210;
    var s = F.svg(360, H, N.groupIndian(N.fromDigits(d)));
    for (var col = 0; col < places; col++) {
      var i = places - 1 - col, x = 10 + col * w;
      var period = i < 3 ? 0 : Math.floor((i - 3) / 2) + 1;
      var g = u.svg('g');
      g.appendChild(F.rect(x + 2, 22, w - 4, 150, { fill: period % 2 ? 'var(--paper-sunk)' : 'var(--paper-raised)', stroke: hi.indexOf(i) >= 0 ? 'var(--thread)' : 'var(--hair)', sw: hi.indexOf(i) >= 0 ? 3 : 1 }));
      g.appendChild(F.text(x + w / 2, 12, t('pv.short.' + N.PLACES[i]), { size: 11, color: 'var(--ink-soft)' }));
      for (var b = 0; b < Math.min(d[i], 10); b++) g.appendChild(F.circle(x + w / 2, 160 - b * 14, 6, { fill: d[i] >= 10 ? 'var(--kumkum)' : 'var(--indigo)' }));
      g.appendChild(F.text(x + w / 2, 192, d[i] >= 10 ? '10' : d[i], { size: 22, color: 'var(--ink)' }));
      tappable(g, t('pv.addBead', { place: t('pv.' + N.PLACES[i]) }), opts.onTap ? (function (idx) { return function () { opts.onTap(idx); }; })(i) : null);
      s.appendChild(g);
      if (i === 3 || i === 5 || i === 7) s.appendChild(F.text(x + w + 1, 200, ',', { size: 22, color: 'var(--thread)' }));
    }
    return s;
  };

  /* Paper strips of the same length, each cut into `den` equal parts with `num` shaded. */
  Sutra.manip.foldStrips = function (opts) {
    var strips = opts.strips, rowH = 52, W = 270, x0 = 12;
    var s = F.svg(360, strips.length * rowH + 8, strips.map(function (st) { return st.num + '/' + st.den; }).join(', '));
    strips.forEach(function (st, r) {
      var y = 8 + r * rowH, pw = W / st.den;
      for (var p = 0; p < st.den; p++) {
        var cell = F.rect(x0 + p * pw, y, pw, 38, { fill: p < st.num ? (st.color || 'var(--thread-soft)') : 'var(--paper-raised)', stroke: 'var(--ink-soft)', sw: 1.5, rx: 0 });
        s.appendChild(tappable(cell, t('frac.part', { n: p + 1, d: st.den }), opts.onTap ? (function (row, idx) { return function () { opts.onTap(row, idx); }; })(r, p) : null));
      }
      if (st.hideLabel) return;
      s.appendChild(F.text(x0 + W + 40, y + 12, st.num, { size: 16 }));
      s.appendChild(F.line(x0 + W + 30, y + 20, x0 + W + 50, y + 20, { sw: 1.8 }));
      s.appendChild(F.text(x0 + W + 40, y + 30, st.den, { size: 16 }));
    });
    if (opts.line !== undefined) s.appendChild(F.line(x0 + W * opts.line, 2, x0 + W * opts.line, strips.length * rowH + 4, { stroke: 'var(--leaf)', sw: 2.5, dash: '5 4' }));
    return s;
  };

  /* One rupee = a 10 × 10 grid: a strip is 10 paise (a tenth), a square is 1 paisa (a hundredth). */
  function rupeeBlock(x, y, size, paise) {
    var g = u.svg('g'), c = size / 10;
    var strips = Math.floor(paise / 10), squares = paise % 10;
    for (var col = 0; col < 10; col++) {
      for (var row = 0; row < 10; row++) {
        var on = col < strips || (col === strips && row < squares);
        var fill = on ? (col < strips ? 'var(--indigo)' : 'var(--teal)') : 'var(--paper-raised)';
        g.appendChild(F.rect(x + col * c, y + row * c, c, c, { fill: fill, stroke: 'var(--hair)', sw: 0.6, rx: 0 }));
      }
    }
    g.appendChild(F.rect(x, y, size, size, { stroke: 'var(--ink-soft)', sw: 1.5, rx: 0 }));
    return g;
  }
  Sutra.manip.rupeeGrid = function (opts) {
    var p = opts.paise, sp = N.splitPaise(p);
    var blocks = Math.max(1, sp.rupees + (p % 100 ? 1 : 0));
    var size = Math.min(110, (340 - (blocks - 1) * 10) / blocks);
    var s = F.svg(360, size + 40, N.rupeeText(p));
    var x = (360 - blocks * size - (blocks - 1) * 10) / 2;
    for (var b = 0; b < blocks; b++) {
      var inBlock = Math.max(0, Math.min(100, p - b * 100));
      s.appendChild(rupeeBlock(x + b * (size + 10), 6, size, inBlock));
    }
    s.appendChild(F.text(180, size + 26, N.rupeeText(p) + ' = ' + p + ' ' + t('money.paise'), { size: 15, color: 'var(--ink)' }));
    return s;
  };
  /* Two amounts below one rupee, side by side, for comparing by place. */
  Sutra.manip.rupeeCompare = function (a, b, labelA, labelB) {
    var s = F.svg(360, 180, N.rupeeText(a) + ', ' + N.rupeeText(b));
    s.appendChild(rupeeBlock(30, 10, 130, a));
    s.appendChild(rupeeBlock(200, 10, 130, b));
    s.appendChild(F.text(95, 162, labelA || N.rupeeText(a), { size: 15 }));
    s.appendChild(F.text(265, 162, labelB || N.rupeeText(b), { size: 15 }));
    return s;
  };
})();
