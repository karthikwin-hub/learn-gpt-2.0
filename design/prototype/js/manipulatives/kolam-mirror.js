/*
 * Kolam Mirror: draw on dark ground with rice-white lines; each stroke is repeated by a symmetry group.
 * 'mirror' mode = dihedral group (mirror lines), 'turn' mode = rotations only. Transforms come from model/geometry.js.
 * Strokes are stored in normalised coordinates (centre 0,0; edge ±1) so they survive resizing.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var G = Sutra.model.geometry;

  var DEMO = [];
  for (var i = 0; i <= 40; i++) {
    var t = i / 40;
    DEMO.push({ x: 0.12 + 0.55 * t, y: -0.06 - 0.32 * Math.sin(Math.PI * t) + 0.05 * Math.sin(3 * Math.PI * t) });
  }

  Sutra.manip.kolamMirror = function (opts) {
    var order = opts.order || 4;
    var mode = opts.mode || 'mirror';
    var strokes = opts.strokes || [];
    var live = null;
    var canvas = u.el('canvas', { class: 'kolam-canvas', role: 'img' });
    var ctx = canvas.getContext('2d');
    var size = 0, dpr = 1;
    var cancelDemo = null;

    function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      dpr = window.devicePixelRatio || 1;
      size = rect.width;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      render();
    }

    function toPx(p) { return { x: (p.x + 1) * size / 2, y: (p.y + 1) * size / 2 }; }

    function drawStroke(pts, transforms) {
      if (pts.length < 2) return;
      transforms.forEach(function (T) {
        ctx.beginPath();
        var a = toPx(T(pts[0]));
        ctx.moveTo(a.x, a.y);
        for (var i = 1; i < pts.length - 1; i++) {
          var p = toPx(T(pts[i])), q = toPx(T(pts[i + 1]));
          ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2);
        }
        var z = toPx(T(pts[pts.length - 1]));
        ctx.lineTo(z.x, z.y);
        ctx.stroke();
      });
    }

    function render() {
      if (!size) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = css('--ground') || '#2A2723';
      ctx.fillRect(0, 0, size, size);
      var rice = css('--rice') || '#F3EBDD';

      ctx.fillStyle = rice;
      ctx.globalAlpha = 0.55;
      var n = 7;
      for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
        var p = toPx({ x: -0.84 + (1.68 * i) / (n - 1), y: -0.84 + (1.68 * j) / (n - 1) });
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2); ctx.fill();
      }

      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = css('--thread') || '#E0A030';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      if (mode === 'mirror') {
        G.mirrorLineAngles(order).forEach(function (a) {
          var c = Math.cos(a), s = Math.sin(a);
          var p1 = toPx({ x: -c * 1.2, y: -s * 1.2 }), p2 = toPx({ x: c * 1.2, y: s * 1.2 });
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        });
      }
      ctx.setLineDash([]);
      if (order > 1) {
        var c0 = toPx({ x: 0, y: 0 });
        ctx.globalAlpha = 0.6;
        ctx.beginPath(); ctx.arc(c0.x, c0.y, 14, -Math.PI / 2, -Math.PI / 2 + (2 * Math.PI) / order); ctx.stroke();
        ctx.beginPath(); ctx.arc(c0.x, c0.y, 3, 0, Math.PI * 2); ctx.fillStyle = css('--thread'); ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.strokeStyle = rice;
      ctx.lineWidth = 3.2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      var T = G.symmetryTransforms(order, mode);
      strokes.forEach(function (s) { drawStroke(s, T); });
      if (live) drawStroke(live, T);
      canvas.setAttribute('aria-label', opts.describe ? opts.describe(order, mode, strokes.length) : '');
    }

    function norm(e) {
      var r = canvas.getBoundingClientRect();
      return { x: ((e.clientX - r.left) / r.width) * 2 - 1, y: ((e.clientY - r.top) / r.height) * 2 - 1 };
    }

    var offDrag = u.drag(canvas, {
      start: function (e) { if (cancelDemo) { cancelDemo(); cancelDemo = null; } live = [norm(e)]; render(); },
      move: function (e) {
        if (!live) return;
        var p = norm(e), last = live[live.length - 1];
        if (Math.hypot(p.x - last.x, p.y - last.y) > 0.012) { live.push(p); render(); }
      },
      end: function () {
        if (live && live.length > 1) { strokes.push(live); if (opts.onChange) opts.onChange(strokes); }
        live = null;
        render();
      }
    });

    var ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function demo() {
      live = [];
      cancelDemo = u.tween(1500, function (p) {
        live = DEMO.slice(0, Math.max(2, Math.round(p * DEMO.length)));
        render();
      }, function () {
        strokes.push(DEMO.slice());
        live = null;
        cancelDemo = null;
        render();
        if (opts.onChange) opts.onChange(strokes);
      });
    }

    return {
      node: canvas,
      setOrder: function (o) { order = o; render(); },
      setMode: function (m) { mode = m; render(); },
      undo: function () { strokes.pop(); render(); if (opts.onChange) opts.onChange(strokes); },
      clear: function () { strokes.length = 0; render(); if (opts.onChange) opts.onChange(strokes); },
      demo: demo,
      strokes: function () { return strokes; },
      destroy: function () { offDrag(); ro.disconnect(); if (cancelDemo) cancelDemo(); }
    };
  };
})();
