/*
 * Sorting Courtyard: twelve attribute blocks and two rope rings with rules.
 * Blocks walk to the region their rules put them in; the rings can be dragged apart, together, or one inside the other.
 * Membership comes from model/sets.js; this file only places and draws.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var S = Sutra.model.sets;

  var W = 360, H = 384;
  var YARD = { x: 6, y: 44, w: 348, h: 334 };
  var COLOUR = { yellow: 'var(--thread)', green: 'var(--leaf)', black: 'var(--ink)' };
  var LAYOUTS = {
    overlap: [{ x: 128, y: 214, r: 92 }, { x: 232, y: 214, r: 92 }],
    apart: [{ x: 92, y: 214, r: 80 }, { x: 268, y: 214, r: 80 }],
    inside: [{ x: 180, y: 214, r: 136 }, { x: 196, y: 238, r: 66 }]
  };

  function shapeNode(it) {
    var s = it.size === 'big' ? 13 : 8;
    var fill = COLOUR[it.colour];
    var g = u.svg('g', { class: 'block' });
    var outline = u.svg('circle', { r: s + 7, fill: 'none', stroke: 'var(--kumkum)', 'stroke-width': 2.5, opacity: 0 });
    g.appendChild(outline);
    if (it.shape === 'circle') g.appendChild(u.svg('circle', { r: s, fill: fill }));
    else if (it.shape === 'square') g.appendChild(u.svg('rect', { x: -s * 0.9, y: -s * 0.9, width: s * 1.8, height: s * 1.8, rx: 2, fill: fill }));
    else g.appendChild(u.svg('path', { d: 'M0 ' + (-s * 1.1) + ' L' + s * 1.05 + ' ' + s * 0.8 + ' L' + (-s * 1.05) + ' ' + s * 0.8 + ' Z', fill: fill, 'stroke-linejoin': 'round' }));
    g.style.pointerEvents = 'none';
    return { g: g, outline: outline };
  }

  Sutra.manip.courtyard = function (opts) {
    var items = S.items();
    var ruleA = opts.ruleA, ruleB = opts.ruleB;
    var rings = JSON.parse(JSON.stringify(opts.rings || LAYOUTS.overlap));
    var hidden = !!opts.hidden;
    var guess = null;
    var highlight = null;
    var uid = 'cy' + Math.random().toString(36).slice(2, 7);
    var root = u.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img' });

    var defs = u.svg('defs');
    var clipB = u.svg('clipPath', { id: uid + '-cb' }, [u.svg('circle')]);
    var mask = u.svg('mask', { id: uid + '-out' }, [u.svg('rect', { x: YARD.x, y: YARD.y, width: YARD.w, height: YARD.h, fill: 'white' }), u.svg('circle', { fill: 'black' }), u.svg('circle', { fill: 'black' })]);
    defs.appendChild(clipB); defs.appendChild(mask);
    root.appendChild(defs);

    root.appendChild(u.svg('rect', { x: YARD.x, y: YARD.y, width: YARD.w, height: YARD.h, rx: 16, fill: 'var(--paper-sunk)' }));
    root.appendChild(u.svg('text', { x: YARD.x + 14, y: YARD.y + 22, 'font-size': 14, 'font-weight': 600, fill: 'var(--ink-soft)', 'font-family': 'var(--font)', text: 'U' }));
    var hiLayer = u.svg('g', { 'pointer-events': 'none' });
    var ringLayer = u.svg('g');
    var itemLayer = u.svg('g');
    var chipLayer = u.svg('g');
    root.appendChild(hiLayer);
    root.appendChild(ringLayer);
    root.appendChild(itemLayer);
    root.appendChild(chipLayer);

    var nodes = items.map(function (it) {
      var n = shapeNode(it);
      n.pos = { x: 180, y: 70 };
      n.g.style.transform = 'translate(180px, 70px)';
      itemLayer.appendChild(n.g);
      return n;
    });

    var ringNodes = rings.map(function (r, idx) {
      var colour = idx === 0 ? 'var(--indigo)' : 'var(--teal)';
      var g = u.svg('g', { class: 'handle', style: { cursor: 'grab' } });
      var disk = u.svg('circle', { fill: 'transparent' });
      var ropeA = u.svg('circle', { fill: 'none', stroke: colour, 'stroke-width': 5 });
      var ropeB = u.svg('circle', { fill: 'none', stroke: 'var(--paper)', 'stroke-width': 1.2, 'stroke-dasharray': '3 6', opacity: 0.8 });
      g.appendChild(disk); g.appendChild(ropeA); g.appendChild(ropeB);
      ringLayer.appendChild(g);
      var chip = u.svg('g', { style: { cursor: 'pointer' }, tabindex: '0', role: 'button' });
      var chipBg = u.svg('rect', { height: 30, rx: 15, fill: colour });
      var chipText = u.svg('text', { 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 14, 'font-weight': 600, fill: '#FFFBF3', 'font-family': 'var(--font)' });
      chip.appendChild(chipBg); chip.appendChild(chipText);
      chipLayer.appendChild(chip);
      chip.addEventListener('click', function () { if (opts.onChipTap) opts.onChipTap(idx); });
      chip.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (opts.onChipTap) opts.onChipTap(idx); } });
      var start = null;
      u.drag(g, {
        start: function (e) { var p = u.svgPoint(root, e); start = { px: p.x, py: p.y, x: rings[idx].x, y: rings[idx].y }; },
        move: function (e) {
          var p = u.svgPoint(root, e);
          var r = rings[idx];
          r.x = u.clamp(start.x + p.x - start.px, YARD.x + r.r * 0.6, YARD.x + YARD.w - r.r * 0.6);
          r.y = u.clamp(start.y + p.y - start.py, YARD.y + r.r * 0.6, YARD.y + YARD.h - r.r * 0.6);
          paintRings();
          placeItems(false);
        },
        end: function () { if (opts.onMove) opts.onMove(rings); }
      });
      return { g: g, disk: disk, ropeA: ropeA, ropeB: ropeB, chip: chip, chipBg: chipBg, chipText: chipText };
    });

    function inRing(p, r, margin) { return Math.hypot(p.x - r.x, p.y - r.y) < r.r - margin; }
    function outRing(p, r, margin) { return Math.hypot(p.x - r.x, p.y - r.y) > r.r + margin; }

    function classify(p) {
      var a = rings[0], b = rings[1], m = 15;
      var inA = inRing(p, a, m), inB = inRing(p, b, m), outA = outRing(p, a, m), outB = outRing(p, b, m);
      if (inA && inB) return 'both';
      if (inA && outB) return 'a';
      if (inB && outA) return 'b';
      if (outA && outB) return 'none';
      return null;
    }

    var homeless = 0;
    function placeItems(stagger) {
      var pts = [];
      for (var x = YARD.x + 22; x < YARD.x + YARD.w - 12; x += 25) {
        for (var y = YARD.y + 40; y < YARD.y + YARD.h - 12; y += 25) {
          var off = (Math.round((x - YARD.x) / 25) % 2) * 12;
          var p = { x: x, y: y + off > YARD.y + YARD.h - 14 ? y : y + off };
          var c = classify(p);
          if (c) pts.push({ x: p.x, y: p.y, c: c, used: false });
        }
      }
      homeless = 0;
      items.forEach(function (it, i) {
        var target = S.region(it, ruleA, ruleB);
        var n = nodes[i];
        var best = null, bestD = Infinity;
        pts.forEach(function (p) {
          if (p.used || p.c !== target) return;
          var d = Math.hypot(p.x - n.pos.x, p.y - n.pos.y);
          if (d < bestD) { bestD = d; best = p; }
        });
        var dest;
        if (best) { best.used = true; dest = { x: best.x, y: best.y }; }
        else {
          homeless++;
          var a = rings[0], b = rings[1];
          dest = { x: (a.x + b.x) / 2 + (homeless - 1.5) * 26, y: Math.min(a.y, b.y) - Math.max(a.r, b.r) * 0.2 + 30 };
        }
        n.pos = dest;
        n.homeless = !best;
        n.g.style.transition = 'transform 620ms cubic-bezier(.3,.7,.2,1) ' + (stagger ? i * 60 : 0) + 'ms';
        n.g.style.transform = 'translate(' + dest.x + 'px,' + dest.y + 'px)';
      });
      paintOutlines();
      if (opts.onChange) opts.onChange({ counts: S.counts(items, ruleA, ruleB), homeless: homeless, rings: rings });
    }

    function paintOutlines() {
      items.forEach(function (it, i) {
        var moved = guess && S.region(it, guess[0], guess[1]) !== S.region(it, ruleA, ruleB);
        nodes[i].outline.setAttribute('opacity', nodes[i].homeless || moved ? 1 : 0);
      });
    }

    function paintRings() {
      rings.forEach(function (r, idx) {
        var n = ringNodes[idx];
        [n.disk, n.ropeA, n.ropeB].forEach(function (c) { c.setAttribute('cx', r.x); c.setAttribute('cy', r.y); c.setAttribute('r', r.r); });
        var label = hidden && !(guess && guessMatches()) ? '?' : opts.ruleLabel(idx === 0 ? ruleA : ruleB);
        n.chipText.textContent = label;
        var w = Math.max(44, label.length * 8.5 + 28);
        var cy = idx === 1 && rings[1].r < rings[0].r && Math.hypot(rings[0].x - rings[1].x, rings[0].y - rings[1].y) < rings[0].r ? r.y + r.r - 2 : r.y - r.r - 2;
        cy = u.clamp(cy, 16, H - 16);
        n.chipBg.setAttribute('x', r.x - w / 2); n.chipBg.setAttribute('y', cy - 15); n.chipBg.setAttribute('width', w);
        n.chipText.setAttribute('x', r.x); n.chipText.setAttribute('y', cy + 1);
      });
      clipB.firstChild.setAttribute('cx', rings[1].x); clipB.firstChild.setAttribute('cy', rings[1].y); clipB.firstChild.setAttribute('r', rings[1].r);
      [1, 2].forEach(function (k) {
        var c = mask.childNodes[k], r = rings[k - 1];
        c.setAttribute('cx', r.x); c.setAttribute('cy', r.y); c.setAttribute('r', r.r);
      });
      paintHighlight();
      root.setAttribute('aria-label', opts.describe ? opts.describe(S.counts(items, ruleA, ruleB)) : '');
    }

    function paintHighlight() {
      u.clear(hiLayer);
      if (!highlight) return;
      var g = u.svg('g', { opacity: 0.3 });
      var fill = 'var(--thread)';
      if (highlight === 'and') {
        g.appendChild(u.svg('circle', { cx: rings[0].x, cy: rings[0].y, r: rings[0].r, fill: fill, 'clip-path': 'url(#' + uid + '-cb)' }));
      } else if (highlight === 'or') {
        g.appendChild(u.svg('circle', { cx: rings[0].x, cy: rings[0].y, r: rings[0].r, fill: fill }));
        g.appendChild(u.svg('circle', { cx: rings[1].x, cy: rings[1].y, r: rings[1].r, fill: fill }));
      } else if (highlight === 'not') {
        g.appendChild(u.svg('rect', { x: YARD.x, y: YARD.y, width: YARD.w, height: YARD.h, rx: 16, fill: fill, mask: 'url(#' + uid + '-out)' }));
      }
      hiLayer.appendChild(g);
    }

    function guessMatches() { return guess && S.sameSort(items, guess[0], guess[1], ruleA, ruleB); }

    paintRings();
    placeItems(true);

    return {
      node: root,
      setRules: function (a, b) { ruleA = a; ruleB = b; paintRings(); placeItems(true); },
      arrange: function (name) { rings = JSON.parse(JSON.stringify(LAYOUTS[name])); paintRings(); placeItems(true); if (opts.onMove) opts.onMove(rings); },
      highlight: function (h) { highlight = h; paintHighlight(); },
      setGuess: function (ga, gb) { guess = ga && gb ? [ga, gb] : null; paintRings(); paintOutlines(); return guessMatches(); },
      rules: function () { return [ruleA, ruleB]; },
      destroy: function () {}
    };
  };

  Sutra.manip.courtyard.LAYOUTS = LAYOUTS;
})();
