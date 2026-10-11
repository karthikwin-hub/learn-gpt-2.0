/* Pure number rules: place value (lakh and crore), fractions, and decimals as rupees and paise. */
(function () {
  'use strict';
  var gcd = window.Sutra.model.multiply.gcd;

  /* Place names from the right; index = power of ten. */
  var PLACES = ['ones', 'tens', 'hundreds', 'thousands', 'tenThousands', 'lakhs', 'tenLakhs', 'crores'];

  /* Digits of n, ones first, padded to `places`. */
  function digits(n, places) {
    var out = [];
    for (var i = 0; i < (places || PLACES.length); i++) { out.push(n % 10); n = Math.floor(n / 10); }
    return out;
  }

  function fromDigits(d) {
    return d.reduce(function (sum, v, i) { return sum + v * Math.pow(10, i); }, 0);
  }

  /* Adds one bead to house `place`; every house that reaches ten bundles into the next.
     `last` is the house that finally kept the bead. If the top house would reach ten, nothing changes and `full` is true. */
  function addAt(d, place) {
    var next = d.slice(), bundled = [], i = place;
    next[i] += 1;
    while (next[i] === 10 && i < next.length - 1) { next[i] = 0; next[i + 1] += 1; bundled.push(i); i++; }
    if (next[i] === 10) return { digits: d.slice(), bundled: [], last: place, full: true };
    return { digits: next, bundled: bundled, last: i, full: false };
  }
  function addOne(d) { return addAt(d, 0); }

  /* India groups the last three digits, then pairs: 12,34,567. */
  function groupIndian(n) {
    var s = String(n);
    if (s.length <= 3) return s;
    var head = s.slice(0, -3), tail = s.slice(-3);
    return head.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + tail;
  }

  /* The international system groups in threes: 1,234,567. */
  function groupInternational(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  /* Expanded form, largest place first, skipping zeros: [[3, 100000], [5, 1000], ...]. */
  function expanded(n) {
    return digits(n).map(function (v, i) { return [v, Math.pow(10, i)]; }).filter(function (p) { return p[0]; }).reverse();
  }

  /* ---------- fractions ---------- */
  function simplify(num, den) { var g = gcd(num, den); return { num: num / g, den: den / g }; }
  function equivalent(a, b, c, d) { return a * d === b * c; }
  /* -1, 0 or 1 as a/b is less than, equal to or more than c/d. */
  function compare(a, b, c, d) { var l = a * d, r = c * b; return l < r ? -1 : l > r ? 1 : 0; }
  /* Folding every part in two doubles both numbers; the amount is unchanged. */
  function fold(num, den) { return { num: num * 2, den: den * 2 }; }

  /* ---------- money: work in whole paise so there is no rounding ---------- */
  function paiseOf(rupees, paise) { return rupees * 100 + paise; }
  function splitPaise(p) {
    return { rupees: Math.floor(p / 100), tenths: Math.floor((p % 100) / 10), hundredths: p % 10 };
  }
  function rupeeText(p) {
    var s = splitPaise(p);
    return '₹' + s.rupees + '.' + s.tenths + s.hundredths;
  }
  /* Parses "4.5" or "0.45" by place, not by length: "4.5" is 4 rupees 50 paise. */
  function parseRupees(text) {
    var m = /^(\d+)(?:\.(\d{1,2}))?$/.exec(String(text).trim());
    if (!m) throw new Error('Not a rupee amount: ' + text);
    var frac = (m[2] || '').padEnd(2, '0');
    return paiseOf(Number(m[1]), Number(frac));
  }

  window.Sutra.model.number = {
    PLACES: PLACES,
    digits: digits, fromDigits: fromDigits, addAt: addAt, addOne: addOne,
    groupIndian: groupIndian, groupInternational: groupInternational, expanded: expanded,
    simplify: simplify, equivalent: equivalent, compare: compare, fold: fold,
    paiseOf: paiseOf, splitPaise: splitPaise, rupeeText: rupeeText, parseRupees: parseRupees
  };
})();
