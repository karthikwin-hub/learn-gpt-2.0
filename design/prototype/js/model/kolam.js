/*
 * A single-line kolam around an m x n grid of dots, built as a "mirror curve":
 * a line travels diagonally between the dots and bounces off the border.
 * When m and n share no common factor the line visits every gap and closes into one loop.
 * Coordinates are doubled: dots sit at odd (x, y); the line passes points where x + y is odd.
 */
(function () {
  'use strict';

  function dots(m, n) {
    var out = [];
    for (var i = 0; i < m; i++) for (var j = 0; j < n; j++) out.push({ x: 2 * i + 1, y: 2 * j + 1 });
    return out;
  }

  function mirrorCurve(m, n) {
    var W = 2 * m, H = 2 * n;
    var x = 1, y = 0, dx = 1, dy = 1;
    var pts = [];
    var guard = 4 * W * H + 8;
    do {
      pts.push({ x: x, y: y });
      if (x + dx < 0 || x + dx > W) dx = -dx;
      if (y + dy < 0 || y + dy > H) dy = -dy;
      x += dx;
      y += dy;
      guard--;
    } while (!(x === 1 && y === 0) && guard > 0);
    return pts;
  }

  /* Points that lie on the border get pushed outward so loops swing around the edge dots. */
  function softenBorder(pts, m, n, push) {
    var W = 2 * m, H = 2 * n;
    return pts.map(function (p) {
      var q = { x: p.x, y: p.y };
      if (p.x === 0) q.x -= push;
      if (p.x === W) q.x += push;
      if (p.y === 0) q.y -= push;
      if (p.y === H) q.y += push;
      return q;
    });
  }

  /* Smooth closed SVG path through the points (quadratic curves via midpoints). */
  function toPath(pts, scale, offset) {
    function P(p) { return { x: p.x * scale + offset, y: p.y * scale + offset }; }
    function mid(a, b) { return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }
    var s = pts.map(P);
    var n = s.length;
    var start = mid(s[n - 1], s[0]);
    var d = 'M' + start.x.toFixed(2) + ' ' + start.y.toFixed(2);
    for (var i = 0; i < n; i++) {
      var c = s[i];
      var e = mid(s[i], s[(i + 1) % n]);
      d += ' Q' + c.x.toFixed(2) + ' ' + c.y.toFixed(2) + ' ' + e.x.toFixed(2) + ' ' + e.y.toFixed(2);
    }
    return d + ' Z';
  }

  window.Sutra.model.kolam = { dots: dots, mirrorCurve: mirrorCurve, softenBorder: softenBorder, toPath: toPath };
})();
