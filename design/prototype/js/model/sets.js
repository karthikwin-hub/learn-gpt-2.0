/* Pure set rules over attribute blocks (shape x colour x size, after Dienes' logic blocks). */
(function () {
  'use strict';

  /* Block colours are attributes, deliberately not the indigo/teal that mean "set A" / "set B" on screen. */
  var RULES = {
    yellow: function (it) { return it.colour === 'yellow'; },
    green: function (it) { return it.colour === 'green'; },
    black: function (it) { return it.colour === 'black'; },
    circle: function (it) { return it.shape === 'circle'; },
    square: function (it) { return it.shape === 'square'; },
    triangle: function (it) { return it.shape === 'triangle'; },
    big: function (it) { return it.size === 'big'; },
    small: function (it) { return it.size === 'small'; }
  };

  var RULE_ORDER = ['yellow', 'circle', 'big', 'green', 'triangle', 'small', 'square', 'black'];

  /* The twelve blocks in the courtyard. */
  function items() {
    var spec = [
      ['circle', 'yellow', 'big'], ['circle', 'yellow', 'small'], ['circle', 'green', 'big'], ['circle', 'black', 'small'],
      ['square', 'yellow', 'big'], ['square', 'green', 'small'], ['square', 'black', 'big'], ['square', 'green', 'big'],
      ['triangle', 'yellow', 'small'], ['triangle', 'green', 'big'], ['triangle', 'black', 'big'], ['triangle', 'black', 'small']
    ];
    return spec.map(function (s, i) { return { id: i, shape: s[0], colour: s[1], size: s[2] }; });
  }

  /* 'both' | 'a' | 'b' | 'none' */
  function region(item, ruleA, ruleB) {
    var inA = RULES[ruleA](item);
    var inB = RULES[ruleB](item);
    if (inA && inB) return 'both';
    if (inA) return 'a';
    if (inB) return 'b';
    return 'none';
  }

  function counts(list, ruleA, ruleB) {
    var c = { both: 0, a: 0, b: 0, none: 0 };
    list.forEach(function (it) { c[region(it, ruleA, ruleB)]++; });
    return c;
  }

  /* Two rule pairs sort the items the same way (ring order matters). */
  function sameSort(list, a1, b1, a2, b2) {
    return list.every(function (it) { return region(it, a1, b1) === region(it, a2, b2); });
  }

  window.Sutra.model.sets = {
    RULES: RULES,
    RULE_ORDER: RULE_ORDER,
    items: items,
    region: region,
    counts: counts,
    sameSort: sameSort
  };
})();
