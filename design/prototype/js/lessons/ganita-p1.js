/* Bodha cards and diagrams for the phase 1 Ganita lessons. Strings: js/i18n/en-bodha.js. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var F = Sutra.fig;
  var t = Sutra.ui.t;
  var IND = 'var(--indigo)', TEAL = 'var(--teal)', LEAF = 'var(--leaf)', THREAD = 'var(--thread)';

  var cards = F.cards;

  /* ---------- M2: multiplication is area ---------- */
  function tiles(cols, rows, filledRows, totals) {
    var cell = Math.min(34, 240 / cols);
    var s = F.svg(360, rows * cell + 50, cols + ' × ' + rows);
    var x0 = (300 - cols * cell) / 2, y0 = 30;
    s.appendChild(F.grid(x0, y0, cols, rows, cell, function (c, r) { return r < filledRows ? 'var(--leaf-soft)' : null; }));
    s.appendChild(F.text(x0 + cols * cell / 2, 14, cols, { color: IND, size: 16 }));
    s.appendChild(F.text(x0 - 14, y0 + rows * cell / 2, rows, { color: TEAL, size: 16 }));
    if (totals) for (var r = 0; r < filledRows; r++) s.appendChild(F.text(x0 + cols * cell + 26, y0 + r * cell + cell / 2, cols * (r + 1), { color: LEAF, size: 14 }));
    return s;
  }
  Sutra.lessons.M2 = { cards: cards(3, {
    idea: function () { return tiles(6, 4, 4, false); },
    why: function () { return tiles(6, 4, 4, true); },
    example: function (step) {
      var s = tiles(5, 3, step >= 2 ? 3 : step >= 1 ? 1 : 0, step >= 2);
      if (step >= 3) s.appendChild(F.text(150, 30 + 3 * 34 + 14, '5 × 3 = 15', { color: LEAF, size: 16 }));
      return s;
    }
  }) };

  /* ---------- M4: cut the rectangle ---------- */
  function rooms(a, b, step, label) {
    var k = Math.min(9, 260 / a, 150 / b);
    var ta = Math.floor(a / 10) * 10, tb = Math.floor(b / 10) * 10;
    var x0 = 40, y0 = 26;
    var s = F.svg(360, b * k + 70, label);
    var parts = [[0, 0, ta, tb], [ta, 0, a - ta, tb], [0, tb, ta, b - tb], [ta, tb, a - ta, b - tb]];
    var fills = ['var(--leaf-soft)', 'var(--indigo-soft)', 'var(--teal-soft)', 'var(--thread-soft)'];
    parts.forEach(function (p, i) {
      s.appendChild(F.rect(x0 + p[0] * k, y0 + p[1] * k, p[2] * k, p[3] * k, { fill: step >= 1 ? fills[i] : 'var(--paper-sunk)', stroke: 'var(--ink-soft)', rx: 0 }));
      if (step >= 2) {
        var n = p[2] * p[3], cx = x0 + (p[0] + p[2] / 2) * k, cy = y0 + (p[1] + p[3] / 2) * k;
        if (p[2] < 5) cx = x0 + a * k + 22;
        s.appendChild(F.text(cx, cy, n, { size: p[2] < 5 || p[3] < 5 ? 12 : 16 }));
      }
    });
    if (step >= 1) {
      s.appendChild(F.line(x0 + ta * k, y0 - 6, x0 + ta * k, y0 + b * k + 6, { stroke: THREAD, sw: 3 }));
      s.appendChild(F.line(x0 - 6, y0 + tb * k, x0 + a * k + 6, y0 + tb * k, { stroke: THREAD, sw: 3 }));
      s.appendChild(F.text(x0 + ta * k / 2, 12, ta, { color: IND })); s.appendChild(F.text(x0 + (ta + (a - ta) / 2) * k, 12, a - ta, { color: IND }));
      s.appendChild(F.text(x0 - 16, y0 + tb * k / 2, tb, { color: TEAL })); s.appendChild(F.text(x0 - 16, y0 + (tb + (b - tb) / 2) * k, b - tb, { color: TEAL }));
    } else {
      s.appendChild(F.text(x0 + a * k / 2, 12, a, { color: IND })); s.appendChild(F.text(x0 - 16, y0 + b * k / 2, b, { color: TEAL }));
    }
    if (step >= 3) {
      var vals = parts.map(function (p) { return p[2] * p[3]; });
      s.appendChild(F.text(180, y0 + b * k + 30, vals.join(' + ') + ' = ' + a * b, { color: LEAF, size: 16 }));
    }
    return s;
  }
  Sutra.lessons.M4 = { cards: cards(3, {
    idea: function () { return rooms(23, 14, 2, '23 × 14'); },
    why: function () { return rooms(23, 14, 3, '23 × 14 = 322'); },
    example: function (step) { return rooms(17, 12, step, '17 × 12'); }
  }) };

  /* ---------- M5: two drummers ---------- */
  function beats(a, b, n, step) {
    var s = F.svg(360, 120, a + ', ' + b);
    var dx = 320 / n;
    for (var i = 1; i <= n; i++) {
      var x = 24 + (i - 1) * dx;
      s.appendChild(F.text(x, 104, i, { size: 9, weight: 400, color: 'var(--ink-soft)' }));
      var hitA = i % a === 0 && step >= 1, hitB = i % b === 0 && step >= 2;
      s.appendChild(F.circle(x, 36, hitA ? 6 : 2, { fill: hitA ? IND : 'var(--ghost)' }));
      s.appendChild(F.circle(x, 70, hitB ? 6 : 2, { fill: hitB ? TEAL : 'var(--ghost)' }));
      if (step >= 3 && i % a === 0 && i % b === 0) s.appendChild(F.rect(x - 11, 22, 22, 62, { stroke: THREAD, sw: 2.5, rx: 11 }));
    }
    return s;
  }
  Sutra.lessons.M5 = { cards: cards(3, {
    idea: function () { return beats(3, 4, 12, 2); },
    why: function () { return beats(3, 4, 12, 3); },
    example: function (step) { return beats(4, 6, 24, step); }
  }) };

  /* ---------- D1 / D3: fair share and leftovers ---------- */
  function plates(n, each, left, opts) {
    opts = opts || {};
    var s = F.svg(360, 150, n + ' × ' + each);
    var gap = 320 / n;
    for (var i = 0; i < n; i++) {
      var cx = 20 + gap * (i + 0.5);
      s.appendChild(F.circle(cx, 56, Math.min(34, gap / 2 - 4), { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', sw: 1.5 }));
      for (var j = 0; j < each; j++) s.appendChild(F.circle(cx - 12 + (j % 3) * 12, 46 + Math.floor(j / 3) * 13, 5, { fill: THREAD }));
      if (opts.half) s.appendChild(F.path('M' + (cx - 5) + ' 76 A 5 5 0 0 1 ' + (cx + 5) + ' 76 Z', { fill: THREAD, stroke: 'none' }));
    }
    for (var r = 0; r < left; r++) s.appendChild(F.circle(150 + r * 16, 122, 6, { fill: opts.cutLeft ? 'none' : THREAD, stroke: THREAD, sw: 2 }));
    if (left && opts.cutLeft) for (var c = 0; c < left; c++) s.appendChild(F.line(150 + c * 16, 115, 150 + c * 16, 129, { stroke: 'var(--ink)', sw: 1.5 }));
    if (opts.eq) s.appendChild(F.text(180, 138, opts.eq, { color: LEAF, size: 15 }));
    return s;
  }
  Sutra.lessons.D1 = { cards: cards(3, {
    idea: function () { return plates(4, 3, 0); },
    why: function () { return plates(4, 3, 0, { eq: '4 × 3 = 12' }); },
    example: function (step) { return plates(5, Math.min(step, 3), 0, { eq: step >= 3 ? '5 × 3 = 15' : null }); }
  }) };
  Sutra.lessons.D3 = { cards: cards(3, {
    idea: function () { return plates(4, 3, 2, { eq: '14 ÷ 4 = 3 r 2' }); },
    why: function () { return plates(4, 3, 2, { cutLeft: true, half: true, eq: '3 + ½' }); },
    example: function (step) { return plates(2, step >= 1 ? 3 : 0, step >= 1 && step < 3 ? 1 : 0, { cutLeft: step >= 2, half: step >= 3, eq: step >= 3 ? '7 ÷ 2 = 3½' : null }); }
  }) };

  /* ---------- G2: rope and pegs ---------- */
  function ropes(list, showArea) {
    var sumW = list.reduce(function (a, r) { return a + r[0]; }, 0);
    var maxH = Math.max.apply(null, list.map(function (r) { return r[1]; }));
    var k = Math.min(24, (320 - 30 * (list.length - 1)) / sumW, 100 / maxH);
    var s = F.svg(360, 30 + maxH * k + 44, list.map(function (r) { return r[0] + ' × ' + r[1]; }).join(', '));
    var x = (360 - sumW * k - 30 * (list.length - 1)) / 2;
    list.forEach(function (r) {
      s.appendChild(F.rect(x, 30, r[0] * k, r[1] * k, { fill: showArea ? 'var(--leaf-soft)' : 'none', stroke: THREAD, sw: 4, rx: 2 }));
      s.appendChild(F.text(x + r[0] * k / 2, 16, r[0] + ' m', { color: IND, size: 12 }));
      s.appendChild(F.text(x + r[0] * k / 2, 30 + r[1] * k + 16, r[1] + ' m', { color: TEAL, size: 12 }));
      if (showArea) s.appendChild(F.text(x + r[0] * k / 2, 30 + r[1] * k / 2, r[0] * r[1], { color: LEAF, size: r[1] < 2 ? 0 : 18 }));
      if (showArea && r[1] < 2) s.appendChild(F.text(x + r[0] * k / 2, 30 + r[1] * k + 34, r[0] * r[1] + ' m²', { color: LEAF, size: 14 }));
      x += r[0] * k + 30;
    });
    return s;
  }
  Sutra.lessons.G2 = { cards: cards(3, {
    idea: function () { return ropes([[11, 1], [6, 6]], false); },
    why: function () { return ropes([[11, 1], [6, 6]], true); },
    example: function (step) { return ropes([[8, 2], [5, 5]], step >= 2); }
  }) };

  /* ---------- G4: mirror and turn ---------- */
  function petal(cx, cy, angle, mirrorable) {
    var d = mirrorable ? 'M0 0 C 10 -18, 30 -18, 40 0 C 30 18, 10 18, 0 0' : 'M0 0 C 14 -22, 34 -16, 40 0 C 26 4, 12 10, 0 0';
    var p = F.path(d, { fill: 'var(--leaf-soft)', stroke: LEAF, sw: 2 });
    p.setAttribute('transform', 'translate(' + cx + ' ' + cy + ') rotate(' + angle + ') scale(1.6)');
    p.setAttribute('stroke-width', 1.4);
    return p;
  }
  function flower(mirrorable, showMirror, showTurn) {
    var s = F.svg(360, 180, mirrorable ? 'mirror and turn' : 'turn only');
    var cx = 180, cy = 90;
    [0, 90, 180, 270].forEach(function (a) { s.appendChild(petal(cx, cy, a, mirrorable)); });
    s.appendChild(F.circle(cx, cy, 4, { fill: 'var(--ink)' }));
    if (showMirror) {
      s.appendChild(F.line(cx - 70, cy, cx + 70, cy, { stroke: IND, sw: 2, dash: '6 5' }));
      s.appendChild(F.line(cx, cy - 70, cx, cy + 70, { stroke: IND, sw: 2, dash: '6 5' }));
    }
    if (showTurn) {
      s.appendChild(F.path('M' + (cx + 60) + ' ' + (cy - 28) + ' A 66 66 0 0 1 ' + (cx + 28) + ' ' + (cy + 60), { stroke: TEAL, sw: 2.5 }));
      s.appendChild(F.text(cx + 76, cy + 46, '90°', { color: TEAL }));
    }
    return s;
  }
  Sutra.lessons.G4 = { cards: cards(3, {
    idea: function () { return flower(true, true, true); },
    why: function () { return flower(false, false, true); },
    example: function (step) { return flower(false, false, step >= 2); }
  }) };

  /* ---------- S2 / S3: two rings ---------- */
  function rings(step, labels) {
    var s = F.svg(360, 200, t('rule.yellow') + ', ' + t('rule.circle'));
    s.appendChild(F.circle(140, 100, 74, { fill: 'var(--indigo-soft)', stroke: IND, sw: 2.5 }));
    s.appendChild(F.circle(220, 100, 74, { fill: 'var(--teal-soft)', stroke: TEAL, sw: 2.5 }));
    s.appendChild(F.text(96, 18, 'A: ' + t('rule.yellow'), { color: IND }));
    s.appendChild(F.text(266, 18, 'B: ' + t('rule.circle'), { color: TEAL }));
    s.appendChild(F.circle(180, 100, 11, { fill: '#E2B93B', stroke: 'var(--ink)', sw: 1 }));
    if (labels) {
      s.appendChild(F.text(180, 130, t('sets.wAnd'), { size: 12, color: LEAF }));
      s.appendChild(F.text(40, 186, t('sets.wNot'), { size: 12, color: 'var(--ink-soft)', anchor: 'start' }));
    }
    if (step >= 1) s.appendChild(F.circle(250, 90, 11, { fill: '#4E8A3E', stroke: 'var(--ink)', sw: 1 }));
    if (step >= 2) s.appendChild(F.rect(98, 82, 22, 22, { fill: '#E2B93B', stroke: 'var(--ink)', sw: 1, rx: 1 }));
    if (step >= 3) s.appendChild(F.path('M320 178 L 334 154 L 348 178 Z', { fill: 'var(--ink)', stroke: 'var(--ink)', sw: 1 }));
    return s;
  }
  Sutra.lessons.S2 = { cards: cards(3, {
    idea: function () { return rings(0, false); },
    why: function () { return rings(0, true); },
    example: function (step) { return rings(step, false); }
  }) };
  Sutra.lessons.S3 = { content: 'S2', cards: Sutra.lessons.S2.cards };

  /* ---------- L2: marble gates ---------- */
  function table(rows, cols) {
    var s = F.svg(360, 30 + rows.length * 28, cols.join(' '));
    var w = 320 / cols.length;
    cols.forEach(function (c, i) { s.appendChild(F.text(20 + w * (i + 0.5), 14, c, { size: 13, color: 'var(--ink-soft)' })); });
    rows.forEach(function (r, j) {
      r.forEach(function (v, i) {
        var yes = v === 'YES', open = v === 'open';
        s.appendChild(F.text(20 + w * (i + 0.5), 42 + j * 28, v === 'YES' ? t('logic.yes') : v === 'NO' ? t('logic.no') : v === 'open' ? t('logic.open') : v === 'shut' ? t('logic.shut') : v, { size: 13, color: yes ? LEAF : open ? IND : 'var(--ink)' }));
      });
    });
    return s;
  }
  var AB = [['open', 'open'], ['open', 'shut'], ['shut', 'open'], ['shut', 'shut']];
  Sutra.lessons.L2 = { cards: cards(3, {
    idea: function () { return table(AB.map(function (r) { return r.concat([r[0] === 'open' && r[1] === 'open' ? 'YES' : 'NO', r[0] === 'open' || r[1] === 'open' ? 'YES' : 'NO']); }), ['A', 'B', t('gate.and'), t('gate.or')]); },
    why: function () { return table([['open', 'NO'], ['shut', 'YES']], ['A', t('gate.not')]); },
    example: function (step) {
      return table([['open', 'shut', step >= 1 ? 'NO' : '…', step >= 2 ? 'YES' : '…', step >= 3 ? 'NO' : '…']], ['A', 'B', t('gate.and'), t('gate.or'), t('gate.not') + ' A']);
    }
  }) };
})();
