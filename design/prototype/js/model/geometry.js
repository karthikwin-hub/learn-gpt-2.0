/* Pure geometry rules: rope rectangles and symmetry groups. */
(function () {
  'use strict';

  /* A rectangle made from a closed rope of fixed length. Width is whole units from 1 to P/2 - 1. */
  function ropeRect(perimeter, width) {
    var half = perimeter / 2;
    var w = Math.max(1, Math.min(half - 1, Math.round(width)));
    var h = half - w;
    return { w: w, h: h, perimeter: 2 * (w + h), area: w * h };
  }

  function ropeOptions(perimeter) {
    var out = [];
    for (var w = 1; w < perimeter / 2; w++) out.push(ropeRect(perimeter, w));
    return out;
  }

  function maxAreaRect(perimeter) {
    return ropeOptions(perimeter).reduce(function (best, r) { return r.area > best.area ? r : best; });
  }

  /*
   * Symmetry transforms about the origin.
   * mode 'turn': cyclic group C_n (n rotations).
   * mode 'mirror': dihedral group D_n (n rotations and n reflections, so n mirror lines).
   * Each transform maps a point {x, y} to a new point.
   */
  function symmetryTransforms(order, mode) {
    var list = [];
    for (var k = 0; k < order; k++) {
      var a = (2 * Math.PI * k) / order;
      list.push(rotation(a));
      if (mode === 'mirror') list.push(reflection(a / 2));
    }
    return list;
  }

  function rotation(a) {
    var c = Math.cos(a), s = Math.sin(a);
    return function (p) { return { x: c * p.x - s * p.y, y: s * p.x + c * p.y }; };
  }

  /* Reflection across the line through the origin at angle t. */
  function reflection(t) {
    var c = Math.cos(2 * t), s = Math.sin(2 * t);
    return function (p) { return { x: c * p.x + s * p.y, y: s * p.x - c * p.y }; };
  }

  /* Angles (radians) of the mirror lines for D_n, measured from the x-axis. */
  function mirrorLineAngles(order) {
    var out = [];
    for (var k = 0; k < order; k++) out.push((Math.PI * k) / order);
    return out;
  }

  /* Smallest turn (in degrees) that maps the pattern onto itself. */
  function smallestTurn(order) { return 360 / order; }

  window.Sutra.model.geometry = {
    ropeRect: ropeRect,
    ropeOptions: ropeOptions,
    maxAreaRect: maxAreaRect,
    symmetryTransforms: symmetryTransforms,
    mirrorLineAngles: mirrorLineAngles,
    smallestTurn: smallestTurn
  };
})();
