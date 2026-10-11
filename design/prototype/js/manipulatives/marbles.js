/*
 * Marble Machine: doors A and B on tracks; a dropped marble follows the route from model/logic.js
 * and lands in the YES or NO basin, where it stays. The route it took stays drawn as residue.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var L = Sutra.model.logic;

  var W = 360, H = 360;
  var HOP = { x: 180, y: 26 };
  var YES = { x: 86, y: 318 }, NO = { x: 274, y: 318 };

  /* Track geometry per gate: door positions and the polyline for every possible route. */
  var GEO = {
    and: {
      doors: { A: { x: 180, y: 100 }, B: { x: 180, y: 186 } },
      routes: {
        'A,no': [HOP, { x: 180, y: 100 }, { x: 250, y: 140 }, { x: 274, y: 290 }, NO],
        'A,B,no': [HOP, { x: 180, y: 100 }, { x: 180, y: 186 }, { x: 250, y: 226 }, { x: 274, y: 290 }, NO],
        'A,B,yes': [HOP, { x: 180, y: 100 }, { x: 180, y: 186 }, { x: 150, y: 246 }, { x: 86, y: 290 }, YES]
      }
    },
    or: {
      doors: { A: { x: 180, y: 100 }, B: { x: 272, y: 150 } },
      routes: {
        'A,yes': [HOP, { x: 180, y: 100 }, { x: 120, y: 190 }, { x: 86, y: 290 }, YES],
        'A,B,yes': [HOP, { x: 180, y: 100 }, { x: 272, y: 150 }, { x: 214, y: 214 }, { x: 120, y: 250 }, { x: 86, y: 290 }, YES],
        'A,B,no': [HOP, { x: 180, y: 100 }, { x: 272, y: 150 }, { x: 300, y: 220 }, { x: 274, y: 290 }, NO]
      }
    },
    not: {
      doors: { A: { x: 180, y: 120 } },
      routes: {
        'A,no': [HOP, { x: 180, y: 120 }, { x: 230, y: 200 }, { x: 274, y: 290 }, NO],
        'A,yes': [HOP, { x: 180, y: 120 }, { x: 130, y: 200 }, { x: 86, y: 290 }, YES]
      }
    }
  };

  function polyD(pts) { return pts.map(function (p, i) { return (i ? 'L' : 'M') + p.x + ' ' + p.y; }).join(' '); }

  Sutra.manip.marbles = function (opts) {
    var type = opts.type, a = opts.a, b = opts.b;
    var landed = { yes: 0, no: 0 };
    var cancelRun = null;
    var root = u.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img' });
    var trackLayer = u.svg('g');
    var residueLayer = u.svg('g');
    var doorLayer = u.svg('g');
    var basinLayer = u.svg('g');
    var marble = u.svg('circle', { r: 9, fill: 'var(--ink)', opacity: 0 });
    var cover = u.svg('g', { style: { display: 'none' } }, [
      u.svg('rect', { x: 40, y: 54, width: 280, height: 226, rx: 18, fill: 'var(--paper-sunk)', stroke: 'var(--ghost)', 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }),
      u.svg('text', { x: 180, y: 170, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 64, 'font-weight': 600, fill: 'var(--ink-soft)', 'font-family': 'var(--font)', text: '?' })
    ]);
    [trackLayer, residueLayer, basinLayer, doorLayer, marble, cover].forEach(function (n) { root.appendChild(n); });

    function text(x, y, s, size, colour) {
      return u.svg('text', { x: x, y: y, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': size, 'font-weight': 600, fill: colour || 'var(--ink)', 'font-family': 'var(--font)', text: s });
    }

    function paintBasins() {
      u.clear(basinLayer);
      [[YES, 'yes', opts.yesLabel, 'var(--leaf)'], [NO, 'no', opts.noLabel, 'var(--ink-soft)']].forEach(function (bk) {
        var p = bk[0];
        basinLayer.appendChild(u.svg('path', { d: 'M' + (p.x - 46) + ' ' + (p.y - 22) + ' Q' + (p.x - 46) + ' ' + (p.y + 26) + ' ' + p.x + ' ' + (p.y + 26) + ' Q' + (p.x + 46) + ' ' + (p.y + 26) + ' ' + (p.x + 46) + ' ' + (p.y - 22), fill: 'var(--paper-sunk)', stroke: bk[3], 'stroke-width': 3 }));
        basinLayer.appendChild(text(p.x, p.y + 42, bk[2], 14, bk[3]));
        for (var i = 0; i < landed[bk[1]]; i++) {
          basinLayer.appendChild(u.svg('circle', { cx: p.x - 30 + (i % 6) * 12, cy: p.y + 14 - Math.floor(i / 6) * 11, r: 5.5, fill: 'var(--ink)', opacity: 0.8 }));
        }
      });
    }

    function paintDoors() {
      u.clear(doorLayer);
      var doors = GEO[type].doors;
      Object.keys(doors).forEach(function (k) {
        var d = doors[k];
        var open = k === 'A' ? a : b;
        var colour = k === 'A' ? 'var(--indigo)' : 'var(--teal)';
        doorLayer.appendChild(u.svg('circle', { cx: d.x, cy: d.y, r: 22, fill: 'var(--paper-raised)', stroke: colour, 'stroke-width': 2 }));
        if (open) {
          doorLayer.appendChild(u.svg('line', { x1: d.x - 18, y1: d.y - 14, x2: d.x - 18, y2: d.y + 14, stroke: colour, 'stroke-width': 5, 'stroke-linecap': 'round' }));
          doorLayer.appendChild(u.svg('line', { x1: d.x + 18, y1: d.y - 14, x2: d.x + 18, y2: d.y + 14, stroke: colour, 'stroke-width': 5, 'stroke-linecap': 'round' }));
        } else {
          doorLayer.appendChild(u.svg('line', { x1: d.x - 16, y1: d.y + 6, x2: d.x + 16, y2: d.y - 6, stroke: colour, 'stroke-width': 6, 'stroke-linecap': 'round' }));
        }
        doorLayer.appendChild(text(d.x + (d.x > 230 ? 40 : -40), d.y, k, 22, colour));
      });
      root.setAttribute('aria-label', opts.describe ? opts.describe(type, a, b) : '');
    }

    function paintTracks() {
      u.clear(trackLayer);
      u.clear(residueLayer);
      trackLayer.appendChild(u.svg('path', { d: 'M' + (HOP.x - 22) + ' ' + (HOP.y - 14) + ' L' + HOP.x + ' ' + (HOP.y + 8) + ' L' + (HOP.x + 22) + ' ' + (HOP.y - 14), fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3, 'stroke-linejoin': 'round' }));
      var routes = GEO[type].routes;
      Object.keys(routes).forEach(function (k) {
        trackLayer.appendChild(u.svg('path', { d: polyD(routes[k]), fill: 'none', stroke: 'var(--hair)', 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
      });
    }

    function paintAll() { paintTracks(); paintDoors(); paintBasins(); }

    function drop(done) {
      if (cancelRun) return;
      var key = L.route(type, a, b).join(',');
      var pts = GEO[type].routes[key];
      var path = u.svg('path', { d: polyD(pts), fill: 'none', stroke: 'var(--thread)', 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.85 });
      u.clear(residueLayer);
      residueLayer.appendChild(path);
      var len = path.getTotalLength();
      marble.setAttribute('opacity', 1);
      cancelRun = u.tween(Math.max(900, len * 3.2), function (p) {
        var pt = path.getPointAtLength(len * (p * p * 0.6 + p * 0.4));
        marble.setAttribute('cx', pt.x);
        marble.setAttribute('cy', pt.y);
      }, function () {
        cancelRun = null;
        marble.setAttribute('opacity', 0);
        var out = key.slice(-3) === 'yes' ? 'yes' : 'no';
        landed[out]++;
        paintBasins();
        Sutra.voice.tone('tock');
        if (done) done(out === 'yes');
      });
    }

    paintAll();

    return {
      node: root,
      setType: function (t) { type = t; landed = { yes: 0, no: 0 }; paintAll(); },
      setInputs: function (na, nb) { a = na; b = nb; paintDoors(); },
      setHidden: function (on) { cover.style.display = on ? '' : 'none'; },
      drop: drop,
      busy: function () { return !!cancelRun; },
      destroy: function () { if (cancelRun) cancelRun(); }
    };
  };
})();
