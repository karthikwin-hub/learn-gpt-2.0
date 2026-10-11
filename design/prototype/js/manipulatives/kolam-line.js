/* Draws a single-line kolam (model/kolam.js) as SVG. Used by the opening and as a quiet mark elsewhere. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var K = Sutra.model.kolam;

  /* opts: m, n, size, animate (ms), onDone */
  Sutra.manip.kolamLine = function (opts) {
    var m = opts.m || 3, n = opts.n || 4;
    var unit = 22;
    var pad = 22;
    var w = 2 * m * unit + 2 * pad;
    var h = 2 * n * unit + 2 * pad;
    var root = u.svg('svg', { viewBox: '0 0 ' + w + ' ' + h, role: 'img', 'aria-label': opts.label || '' });
    var g = u.svg('g', { transform: 'translate(' + pad + ',' + pad + ')' });
    root.appendChild(g);

    var dotNodes = K.dots(m, n).map(function (d) {
      var c = u.svg('circle', { class: 'kolam-dot', cx: d.x * unit, cy: d.y * unit, r: 3.6 });
      g.appendChild(c);
      return c;
    });

    var pts = K.softenBorder(K.mirrorCurve(m, n), m, n, 0.45);
    var path = u.svg('path', { class: 'kolam-line', d: K.toPath(pts, unit, 0) });
    g.appendChild(path);

    if (opts.animate && !u.reducedMotion()) {
      dotNodes.forEach(function (c, i) {
        c.style.opacity = 0;
        c.style.transition = 'opacity 300ms ease ' + i * 45 + 'ms';
      });
      requestAnimationFrame(function () {
        dotNodes.forEach(function (c) { c.style.opacity = 1; });
        u.drawStroke(path, opts.animate, dotNodes.length * 45 + 200);
        setTimeout(function () { if (opts.onDone) opts.onDone(); }, opts.animate + dotNodes.length * 45 + 300);
      });
    } else if (opts.onDone) {
      setTimeout(opts.onDone, 0);
    }
    return root;
  };
})();
