/*
 * Two Drummers: two tala cycles (every a-th and every b-th beat) played along a shared beat line.
 * Hits stay marked on the line as they are played; the beats where both hit are ringed.
 * Every hit is shown visually as well as heard. Multiples come from model/multiply.js.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var M = Sutra.model.multiply;

  var W = 360;
  var PER_ROW = 24;

  Sutra.manip.drums = function (opts) {
    var a = opts.a, b = opts.b;
    var beat = 0, timer = 0;
    var root = u.svg('svg', { role: 'img' });
    var ringLayer = u.svg('g');
    var lineLayer = u.svg('g');
    var markLayer = u.svg('g');
    root.appendChild(ringLayer);
    root.appendChild(lineLayer);
    root.appendChild(markLayer);

    var ringA = null, ringB = null;

    function length() {
      var l = M.lcm(a, b);
      return Math.min(72, Math.max(24, Math.ceil(l / 12) * 12));
    }

    function beatXY(n) {
      var row = Math.floor((n - 1) / PER_ROW);
      var col = (n - 1) % PER_ROW;
      var gap = (W - 36) / (PER_ROW - 1);
      return { x: 18 + col * gap, y: 196 + row * 62 };
    }

    function ring(cx, n, colour, label) {
      var g = u.svg('g', { transform: 'translate(' + cx + ',84)' });
      g.appendChild(u.svg('circle', { r: 58, fill: 'none', stroke: 'var(--hair)', 'stroke-width': 2 }));
      var dots = [];
      for (var i = 0; i < n; i++) {
        var ang = -Math.PI / 2 + (2 * Math.PI * i) / n;
        var isHit = i === n - 1;
        var d = u.svg('circle', { cx: 58 * Math.cos(ang), cy: 58 * Math.sin(ang), r: isHit ? 10 : 5.5, fill: isHit ? colour : 'var(--paper-raised)', stroke: colour, 'stroke-width': 2 });
        g.appendChild(d);
        dots.push(d);
      }
      var hand = u.svg('line', { x1: 0, y1: 0, x2: 0, y2: -44, stroke: 'var(--ink)', 'stroke-width': 2.5, 'stroke-linecap': 'round' });
      g.appendChild(hand);
      g.appendChild(u.svg('circle', { r: 4, fill: 'var(--ink)' }));
      g.appendChild(u.svg('text', { y: 4, 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, fill: colour, 'font-family': 'var(--font)', dy: 24, text: label }));
      ringLayer.appendChild(g);
      return { g: g, dots: dots, hand: hand, n: n, colour: colour };
    }

    function pointRing(r, k) {
      var idx = (k - 1 + r.n) % r.n;
      var ang = (360 * idx) / r.n;
      r.hand.setAttribute('transform', 'rotate(' + ang + ')');
      r.dots.forEach(function (d, i) { d.setAttribute('opacity', i === idx || k === 0 ? 1 : 0.55); });
    }

    var pulseTimers = [];
    function pulse(r) {
      var hit = r.dots[r.n - 1];
      hit.setAttribute('r', 15);
      pulseTimers.push(setTimeout(function () { hit.setAttribute('r', 10); }, 160));
      if (pulseTimers.length > 8) pulseTimers.shift();
    }

    function build() {
      stop();
      beat = 0;
      u.clear(ringLayer); u.clear(lineLayer); u.clear(markLayer);
      ringA = ring(96, a, 'var(--indigo)', String(a));
      ringB = ring(264, b, 'var(--teal)', String(b));
      pointRing(ringA, 0); pointRing(ringB, 0);
      var N = length();
      var rows = Math.ceil(N / PER_ROW);
      root.setAttribute('viewBox', '0 0 ' + W + ' ' + (196 + rows * 62 - 10));
      for (var n = 1; n <= N; n++) {
        var p = beatXY(n);
        lineLayer.appendChild(u.svg('line', { x1: p.x, y1: p.y - 4, x2: p.x, y2: p.y + 4, stroke: 'var(--ghost)', 'stroke-width': 1.5 }));
        if (n % 6 === 0) lineLayer.appendChild(u.svg('text', { x: p.x, y: p.y + 24, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--ink-soft)', 'font-family': 'var(--font)', text: String(n) }));
      }
      for (var r = 0; r < rows; r++) {
        var s = beatXY(r * PER_ROW + 1), e = beatXY(Math.min(N, (r + 1) * PER_ROW));
        lineLayer.appendChild(u.svg('line', { x1: s.x - 6, y1: s.y, x2: e.x + 6, y2: e.y, stroke: 'var(--hair)', 'stroke-width': 1.5 }));
      }
      root.setAttribute('aria-label', opts.describe ? opts.describe(a, b) : '');
    }

    function mark(n, hitA, hitB) {
      var p = beatXY(n);
      if (hitA) markLayer.appendChild(u.svg('circle', { cx: p.x, cy: p.y - 11, r: 4.5, fill: 'var(--indigo)' }));
      if (hitB) markLayer.appendChild(u.svg('circle', { cx: p.x, cy: p.y + 11, r: 4.5, fill: 'var(--teal)' }));
      if (hitA && hitB) {
        markLayer.appendChild(u.svg('circle', { cx: p.x, cy: p.y, r: 17, fill: 'none', stroke: 'var(--thread)', 'stroke-width': 2.5 }));
        markLayer.appendChild(u.svg('text', { x: p.x, y: p.y - 26, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 600, fill: 'var(--ink)', 'font-family': 'var(--font)', text: String(n) }));
      }
    }

    function step() {
      var N = length();
      beat++;
      var hitA = beat % a === 0, hitB = beat % b === 0;
      pointRing(ringA, beat); pointRing(ringB, beat);
      if (hitA) { pulse(ringA); Sutra.voice.tone('low'); }
      if (hitB) { pulse(ringB); setTimeout(function () { Sutra.voice.tone('high'); }, hitA ? 30 : 0); }
      mark(beat, hitA, hitB);
      if (opts.onBeat) opts.onBeat(beat, hitA, hitB);
      if (beat >= N) { stop(); if (opts.onEnd) opts.onEnd(); return; }
      timer = setTimeout(step, u.reducedMotion() ? 120 : 360);
    }

    function play() {
      if (timer) return;
      if (beat >= length()) build();
      step();
    }

    function stop() { clearTimeout(timer); timer = 0; }

    build();

    return {
      node: root,
      setA: function (n) { a = n; build(); },
      setB: function (n) { b = n; build(); },
      play: play,
      stop: stop,
      reset: build,
      playing: function () { return !!timer; },
      destroy: function () { stop(); pulseTimers.forEach(clearTimeout); }
    };
  };
})();
