/*
 * Fair Share Table: laddoos dealt one by one onto plates; what cannot complete a round goes to the leftover tray,
 * and leftovers can be cut into one piece per plate. Dealing order comes from model/divide.js.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var D = Sutra.model.divide;

  var W = 360, H = 360;
  var PLATE_R = 50;
  var TRAY = { x: 60, y: 318, w: 240, h: 34 };

  function platePos(i, n) {
    var perRow = n <= 3 ? n : Math.ceil(n / 2);
    var row = Math.floor(i / perRow);
    var inRow = row === 0 ? Math.min(perRow, n) : n - perRow;
    var col = i - row * perRow;
    var gap = W / inRow;
    var y = n <= 3 ? 196 : 152 + row * 112;
    return { x: gap * col + gap / 2, y: y };
  }

  function slotInPlate(k) {
    var perRow = 4;
    var r = Math.floor(k / perRow), c = k % perRow;
    return { dx: (c - 1.5) * 19, dy: (r - 1.5) * 19 };
  }

  function pilePos(i) {
    return { x: 36 + (i % 10) * 32, y: 26 + Math.floor(i / 10) * 24 };
  }

  function laddoo() {
    return u.svg('g', { class: 'laddoo' }, [
      u.svg('circle', { r: 8.5, fill: 'var(--thread)', stroke: '#B57A18', 'stroke-width': 1 }),
      u.svg('circle', { cx: -2.5, cy: -2, r: 1.1, fill: '#B57A18' }),
      u.svg('circle', { cx: 2.5, cy: 1.5, r: 1.1, fill: '#B57A18' }),
      u.svg('circle', { cx: -0.5, cy: 3.5, r: 1, fill: '#B57A18' })
    ]);
  }

  function wedge(k, n) {
    var a0 = (2 * Math.PI * k) / n - Math.PI / 2, a1 = (2 * Math.PI * (k + 1)) / n - Math.PI / 2;
    var r = 8.5;
    var d = 'M0 0 L' + (r * Math.cos(a0)).toFixed(2) + ' ' + (r * Math.sin(a0)).toFixed(2) +
      ' A' + r + ' ' + r + ' 0 ' + (a1 - a0 > Math.PI ? 1 : 0) + ' 1 ' + (r * Math.cos(a1)).toFixed(2) + ' ' + (r * Math.sin(a1)).toFixed(2) + ' Z';
    return u.svg('g', { class: 'laddoo' }, [u.svg('path', { d: d, fill: 'var(--thread)', stroke: '#B57A18', 'stroke-width': 1 })]);
  }

  function place(node, x, y, instant) {
    node.style.transition = instant ? 'none' : 'transform 480ms cubic-bezier(.3,.7,.2,1)';
    node.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }

  Sutra.manip.fairShare = function (opts) {
    var total = opts.total, plates = opts.plates;
    var seq = [], dealt = 0, cut = false;
    var timers = [];
    var nodes = [];
    var root = u.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img' });
    var plateLayer = u.svg('g');
    var trayLayer = u.svg('g');
    var itemLayer = u.svg('g');
    root.appendChild(u.svg('rect', { x: 8, y: 6, width: W - 16, height: 72, rx: 14, fill: 'var(--paper-sunk)' }));
    root.appendChild(plateLayer);
    root.appendChild(trayLayer);
    root.appendChild(itemLayer);

    function stopTimers() { timers.forEach(clearTimeout); timers = []; }

    function counts() {
      var per = [];
      for (var i = 0; i < plates; i++) per.push(0);
      var left = 0;
      for (var k = 0; k < dealt; k++) { if (seq[k] >= 0) per[seq[k]]++; else left++; }
      return { perPlate: per, leftover: left, dealt: dealt, total: total, plates: plates, done: dealt === total, cut: cut };
    }

    function emit() { if (opts.onChange) opts.onChange(counts()); }

    function build() {
      stopTimers();
      seq = D.dealSequence(total, plates);
      dealt = 0;
      cut = false;
      u.clear(plateLayer); u.clear(itemLayer); u.clear(trayLayer);
      for (var i = 0; i < plates; i++) {
        var p = platePos(i, plates);
        plateLayer.appendChild(u.svg('circle', { cx: p.x, cy: p.y, r: PLATE_R, fill: 'var(--paper-raised)', stroke: 'var(--hair)', 'stroke-width': 2 }));
        plateLayer.appendChild(u.svg('circle', { cx: p.x, cy: p.y, r: PLATE_R - 8, fill: 'none', stroke: 'var(--hair)', 'stroke-width': 1 }));
      }
      trayLayer.appendChild(u.svg('rect', { x: TRAY.x, y: TRAY.y, width: TRAY.w, height: TRAY.h, rx: 17, fill: 'none', stroke: 'var(--ghost)', 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }));
      trayLayer.appendChild(u.svg('text', { x: TRAY.x + TRAY.w + 8, y: TRAY.y + TRAY.h / 2, 'dominant-baseline': 'middle', 'font-size': 12, fill: 'var(--ink-soft)', 'font-family': 'var(--font)', text: opts.trayLabel || '' }));
      nodes = [];
      for (var k = 0; k < total; k++) {
        var n = laddoo();
        var pp = pilePos(k);
        place(n, pp.x, pp.y, true);
        itemLayer.appendChild(n);
        nodes.push(n);
      }
      emit();
    }

    function targetFor(k) {
      var plate = seq[k];
      if (plate < 0) {
        var leftIndex = 0;
        for (var j = 0; j < k; j++) if (seq[j] < 0) leftIndex++;
        return { x: TRAY.x + 26 + leftIndex * 26, y: TRAY.y + TRAY.h / 2 };
      }
      var onPlate = 0;
      for (var i = 0; i < k; i++) if (seq[i] === plate) onPlate++;
      var p = platePos(plate, plates);
      var s = slotInPlate(onPlate);
      return { x: p.x + s.dx, y: p.y + s.dy };
    }

    function dealNext() {
      if (dealt >= total) return false;
      var k = total - 1 - dealt;
      var node = nodes[k];
      var tgt = targetFor(dealt);
      place(node, tgt.x, tgt.y);
      dealt++;
      Sutra.voice.tone('tick');
      emit();
      return true;
    }

    function dealRound() {
      stopTimers();
      var n = Math.min(plates, total - dealt);
      if (total - dealt < plates) n = total - dealt;
      for (var i = 0; i < n; i++) timers.push(setTimeout(dealNext, i * 170));
    }

    function dealAll() {
      stopTimers();
      var remaining = total - dealt;
      for (var i = 0; i < remaining; i++) timers.push(setTimeout(dealNext, i * 150));
    }

    function cutLeftovers() {
      var c = counts();
      if (!c.done || c.leftover === 0 || cut) return;
      cut = true;
      var leftIdx = 0;
      for (var k = 0; k < total; k++) {
        if (seq[k] >= 0) continue;
        var node = nodes[total - 1 - k];
        var from = targetFor(k);
        node.style.opacity = 0;
        for (var p = 0; p < plates; p++) {
          (function (p, from, li) {
            var w = wedge(p, plates);
            place(w, from.x, from.y, true);
            itemLayer.appendChild(w);
            timers.push(setTimeout(function () {
              var pp = platePos(p, plates);
              place(w, pp.x - PLATE_R + 18 + li * 20, pp.y + PLATE_R - 16);
            }, 120 + p * 90 + li * 200));
          })(p, from, leftIdx);
        }
        leftIdx++;
      }
      emit();
    }

    build();

    return {
      node: root,
      setTotal: function (n) { total = n; build(); },
      setPlates: function (n) { plates = n; build(); },
      dealRound: dealRound,
      dealAll: dealAll,
      cutLeftovers: cutLeftovers,
      reset: build,
      counts: counts,
      destroy: stopTimers
    };
  };
})();
