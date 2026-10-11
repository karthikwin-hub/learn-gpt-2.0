/*
 * Pure science rules for the Vijnana lessons: digestion order, the friction ramp and shadows.
 * Facts are as listed in docs/product/CURRICULUM_PHASE2.md §7 and need a science teacher's sign-off.
 */
(function () {
  'use strict';

  /* ---------- digestion (B3) ---------- */
  /* Stops in order. `absorbs` marks where most food passes into the blood. Times are rough, for adults. */
  var ORGANS = [
    { id: 'mouth', time: 'seconds' },
    { id: 'pipe', time: 'seconds' },
    { id: 'stomach', time: 'hours2to4' },
    { id: 'small', time: 'hours', absorbs: true },
    { id: 'large', time: 'day' }
  ];
  function organOrder() { return ORGANS.map(function (o) { return o.id; }); }
  function isInOrder(list) { return list.length === ORGANS.length && list.every(function (id, i) { return id === ORGANS[i].id; }); }
  function absorbsMost(id) { return ORGANS.some(function (o) { return o.id === id && o.absorbs; }); }

  /* ---------- friction ramp (K2) ---------- */
  /* Illustrative only ("pretend measurements"): roll-out distance shrinks as grip rises. */
  var SURFACES = { tile: 1, wood: 1.6, rug: 3.2, sand: 5 };
  var SURFACE_ORDER = ['tile', 'wood', 'rug', 'sand'];
  function rollDistance(height, surface) {
    if (!SURFACES[surface]) throw new Error('Unknown surface: ' + surface);
    return Math.round((height * 60) / SURFACES[surface]) / 10;
  }
  /* A test is fair when only one thing changed between two runs. */
  function changed(a, b) {
    return ['height', 'surface', 'car'].filter(function (k) { return a[k] !== b[k]; });
  }
  function isFair(a, b) { return changed(a, b).length === 1; }
  /* Most friction first. */
  function byFriction() { return SURFACE_ORDER.slice().sort(function (x, y) { return SURFACES[y] - SURFACES[x]; }); }

  /* ---------- light and shadow (R1) ---------- */
  /* Similar triangles: a lamp of height H at distance d from a stick of height h casts h·d / (H − h). */
  function shadowLength(stickH, lampH, dist) {
    if (lampH <= stickH) return Infinity;
    return (stickH * dist) / (lampH - stickH);
  }
  var MATERIALS = { cardboard: 'opaque', wax: 'translucent', glass: 'transparent' };
  /* How dark the shadow is, 0 (none) to 1 (full). */
  function shadowDarkness(material) {
    var kind = MATERIALS[material];
    if (!kind) throw new Error('Unknown material: ' + material);
    return kind === 'opaque' ? 1 : kind === 'translucent' ? 0.4 : 0.05;
  }

  window.Sutra.model.science = {
    ORGANS: ORGANS, organOrder: organOrder, isInOrder: isInOrder, absorbsMost: absorbsMost,
    SURFACES: SURFACES, SURFACE_ORDER: SURFACE_ORDER, rollDistance: rollDistance, changed: changed, isFair: isFair, byFriction: byFriction,
    shadowLength: shadowLength, MATERIALS: MATERIALS, shadowDarkness: shadowDarkness
  };
})();
