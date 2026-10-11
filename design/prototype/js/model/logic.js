/* Pure logic rules for the marble machine. */
(function () {
  'use strict';

  function gate(type, a, b) {
    if (type === 'and') return a && b;
    if (type === 'or') return a || b;
    if (type === 'not') return !a;
    throw new Error('Unknown gate: ' + type);
  }

  function inputs(type) {
    if (type === 'not') return [[false], [true]];
    return [[false, false], [false, true], [true, false], [true, true]];
  }

  /*
   * The marble's route through the machine, as the doors it meets in order.
   * AND: through door A, then door B; any closed door drops it into "no".
   * OR: tries door A; if closed, rolls across to try door B.
   * NOT: an open door A lets it fall into "no"; a closed door deflects it to "yes".
   */
  function route(type, a, b) {
    if (type === 'and') {
      if (!a) return ['A', 'no'];
      if (!b) return ['A', 'B', 'no'];
      return ['A', 'B', 'yes'];
    }
    if (type === 'or') {
      if (a) return ['A', 'yes'];
      if (b) return ['A', 'B', 'yes'];
      return ['A', 'B', 'no'];
    }
    return a ? ['A', 'no'] : ['A', 'yes'];
  }

  window.Sutra.model.logic = { gate: gate, inputs: inputs, route: route };
})();
