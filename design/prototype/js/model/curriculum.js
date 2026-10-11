/* Phase 1 concept map (docs/product/CURRICULUM.md). route: the prototype screen, or null when not prototyped. */
(function () {
  'use strict';

  var DOMAINS = [
    { id: 'multiply', knots: [
      { id: 'M1', route: null },
      { id: 'M2', route: 'wonder' },
      { id: 'M3', route: null },
      { id: 'M4', route: 'rect' },
      { id: 'M5', route: 'drums' }
    ] },
    { id: 'divide', crossing: 'cross.divide', knots: [
      { id: 'D1', route: 'share', params: { mode: 'share' } },
      { id: 'D2', route: null },
      { id: 'D3', route: 'share', params: { mode: 'leftover' } },
      { id: 'D4', route: null }
    ] },
    { id: 'shapes', crossing: 'cross.shapes', knots: [
      { id: 'G1', route: null },
      { id: 'G2', route: 'rope' },
      { id: 'G3', route: null },
      { id: 'G4', route: 'kolam' },
      { id: 'G5', route: null }
    ] },
    { id: 'sets', knots: [
      { id: 'S1', route: null },
      { id: 'S2', route: 'sets', params: { mode: 'sort' } },
      { id: 'S3', route: 'sets', params: { mode: 'guess' } }
    ] },
    { id: 'logic', crossing: 'cross.logic', knots: [
      { id: 'L1', route: null },
      { id: 'L2', route: 'logic' },
      { id: 'L3', route: null },
      { id: 'L4', route: null }
    ] }
  ];

  function findKnot(id) {
    for (var i = 0; i < DOMAINS.length; i++) {
      for (var j = 0; j < DOMAINS[i].knots.length; j++) {
        if (DOMAINS[i].knots[j].id === id) return DOMAINS[i].knots[j];
      }
    }
    return null;
  }

  window.Sutra.model.curriculum = { DOMAINS: DOMAINS, findKnot: findKnot };
})();
