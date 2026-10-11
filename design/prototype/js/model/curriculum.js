/*
 * The Gurukul curriculum (docs/product/CURRICULUM_PHASE2.md): Shalas -> threads (sutras) -> knots (concepts).
 * A knot is playable when it has a bench (its workbench route) or a start route. Lesson order:
 * Prashna (if prashna) -> Bodha -> afterBodha or the bench. Knots without a bench are in the curriculum, not the prototype.
 */
(function () {
  'use strict';

  function k(id, extra) {
    var knot = { id: id };
    if (extra) Object.keys(extra).forEach(function (key) { knot[key] = extra[key]; });
    return knot;
  }
  function bench(route, params) { return params ? { route: route, params: params } : { route: route }; }

  var SECTIONS = [
    { id: 'ganita', threads: [
      { id: 'sankhya', knots: [k('N1', { prashna: true, bench: bench('place') }), k('N2'), k('N3', { prashna: true, bench: bench('fractions') }), k('N4'), k('N5')] },
      { id: 'ganana', crossing: 'cross.divide', knots: [
        k('A1'), k('A2'), k('M1'),
        k('M2', { start: { route: 'wonder' }, afterBodha: { route: 'film' } }),
        k('M3'), k('M4', { bench: bench('rect') }),
        k('D1', { bench: bench('share', { mode: 'share' }) }), k('D2'),
        k('D3', { bench: bench('share', { mode: 'leftover' }) }), k('D4'), k('A3')
      ] },
      { id: 'guna', knots: [k('F1'), k('F2'), k('F3'), k('M5', { bench: bench('drums') }), k('F4')] },
      { id: 'rekha', crossing: 'cross.shapes', knots: [k('G1'), k('G2', { bench: bench('rope') }), k('G3'), k('G4', { bench: bench('kolam') }), k('G5'), k('G6'), k('G7'), k('G8')] },
      { id: 'mana', knots: [k('U1', { prashna: true, bench: bench('money') }), k('U2'), k('U3')] },
      { id: 'ankana', knots: [k('H1'), k('H2')] },
      { id: 'krama', knots: [k('L4'), k('P1')] },
      { id: 'tarka', crossing: 'cross.logic', knots: [
        k('S1'), k('S2', { bench: bench('sets', { mode: 'sort' }) }), k('S3', { bench: bench('sets', { mode: 'guess' }) }),
        k('L1'), k('L2', { bench: bench('logic') }), k('L3')
      ] }
    ] },
    { id: 'vijnana', threads: [
      { id: 'sharira', knots: [k('B1'), k('B2'), k('B3', { prashna: true, bench: bench('digest') }), k('B4')] },
      { id: 'jiva', knots: [k('J1'), k('J2'), k('J3')] },
      { id: 'padartha', knots: [k('X1'), k('X2')] },
      { id: 'prakasha', knots: [k('R1', { prashna: true, bench: bench('shadow') }), k('R2')] },
      { id: 'mapana', knots: [k('Z1')] },
      { id: 'bala', knots: [k('K1'), k('K2', { prashna: true, bench: bench('ramp') })] }
    ] },
    { id: 'loka', threads: [
      { id: 'itihasa', knots: [k('I1'), k('I2', { prashna: true, bench: bench('timeline') })] },
      { id: 'nagarika', knots: [k('Q1'), k('Q2'), k('Q3')] },
      { id: 'bhugola', knots: [k('E1', { prashna: true, bench: bench('earth') }), k('E2'), k('E3'), k('E4', { prashna: true, bench: bench('map') })] },
      { id: 'bharata', knots: [k('C1'), k('C2'), k('C3'), k('C4'), k('C5'), k('C6'), k('C7'), k('C8'), k('C9')] }
    ] }
  ];

  /* Jaal: threads that cross subjects. Each link joins two knots; its sentence is 'jaal.<id>'. */
  var JAAL = [
    { id: 'shadowClock', a: 'R1', b: 'E1' },
    { id: 'sundial', a: 'R1', b: 'U3' },
    { id: 'topView', a: 'E4', b: 'G8' },
    { id: 'scale', a: 'E4', b: 'U2' },
    { id: 'yearsLine', a: 'I2', b: 'N1' },
    { id: 'sameUnits', a: 'Z1', b: 'U2' },
    { id: 'foodGraph', a: 'B1', b: 'H2' },
    { id: 'desertPlants', a: 'C6', b: 'J2' },
    { id: 'cleanAir', a: 'Q3', b: 'X1' },
    { id: 'farms', a: 'C2', b: 'J1' }
  ];

  var index = {};
  SECTIONS.forEach(function (s) {
    s.threads.forEach(function (th) {
      th.knots.forEach(function (knot) {
        if (index[knot.id]) throw new Error('Duplicate knot id ' + knot.id);
        index[knot.id] = { knot: knot, thread: th, section: s };
      });
    });
  });

  function findKnot(id) { return index[id] ? index[id].knot : null; }
  function placeOf(id) { return index[id] || null; }
  function findSection(id) { return SECTIONS.filter(function (s) { return s.id === id; })[0] || null; }
  function playable(knot) { return !!(knot && (knot.start || knot.bench)); }

  function firstStep(knot) {
    if (knot.start) return knot.start;
    return { route: knot.prashna ? 'prashna' : 'bodha', params: { k: knot.id } };
  }
  function afterBodha(knot) { return knot.afterBodha || knot.bench; }

  function knotsIn(sectionId) {
    var s = findSection(sectionId);
    return s ? s.threads.reduce(function (all, th) { return all.concat(th.knots); }, []) : [];
  }

  /* Links that touch a knot, each with the other end's knot and section. */
  function jaalFor(knotId) {
    return JAAL.filter(function (l) { return l.a === knotId || l.b === knotId; }).map(function (l) {
      var other = l.a === knotId ? l.b : l.a;
      return { link: l, other: other, otherSection: index[other].section.id };
    });
  }

  window.Sutra.model.curriculum = {
    SECTIONS: SECTIONS, JAAL: JAAL,
    findKnot: findKnot, placeOf: placeOf, findSection: findSection, playable: playable,
    firstStep: firstStep, afterBodha: afterBodha, knotsIn: knotsIn, jaalFor: jaalFor
  };
})();
