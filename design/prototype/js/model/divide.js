/* Pure division rules. */
(function () {
  'use strict';
  var gcd = function (a, b) { return b === 0 ? a : gcd(b, a % b); };

  /* Fair share (partitive): total items over n groups. */
  function share(total, groups) {
    var each = Math.floor(total / groups);
    return { each: each, remainder: total - each * groups };
  }

  /*
   * Dealing order, one item per plate round and round, as a child deals by hand.
   * Items that cannot complete a full round go to the leftover tray (plate -1).
   */
  function dealSequence(total, groups) {
    var s = share(total, groups);
    var seq = [];
    for (var i = 0; i < s.each * groups; i++) seq.push(i % groups);
    for (var j = 0; j < s.remainder; j++) seq.push(-1);
    return seq;
  }

  /* Leftovers cut into equal pieces: remainder r over g plates -> each plate gets r/g, simplified. */
  function leftoverFraction(remainder, groups) {
    if (remainder === 0) return null;
    var g = gcd(remainder, groups);
    return { num: remainder, den: groups, simpleNum: remainder / g, simpleDen: groups / g };
  }

  function factorPairs(n) {
    var pairs = [];
    for (var a = 1; a * a <= n; a++) if (n % a === 0) pairs.push([a, n / a]);
    return pairs;
  }

  window.Sutra.model.divide = {
    share: share,
    dealSequence: dealSequence,
    leftoverFraction: leftoverFraction,
    factorPairs: factorPairs
  };
})();
