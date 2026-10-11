/* Pure multiplication rules. No DOM access: mirrors src/domain/math in docs/ARCHITECTURE.md. */
(function () {
  'use strict';

  function area(cols, rows) { return cols * rows; }

  /* 23 -> { tens: 20, ones: 3 } */
  function splitTensOnes(n) {
    var ones = n % 10;
    return { tens: n - ones, ones: ones };
  }

  /* The four rooms of an area model cut at the tens. Empty rooms (a zero side) are dropped. */
  function partialProducts(cols, rows) {
    var c = splitTensOnes(cols);
    var r = splitTensOnes(rows);
    var rooms = [];
    [{ w: c.tens, x: 0 }, { w: c.ones, x: c.tens }].forEach(function (col) {
      [{ h: r.tens, y: 0 }, { h: r.ones, y: r.tens }].forEach(function (row) {
        if (col.w > 0 && row.h > 0) {
          rooms.push({ x: col.x, y: row.y, w: col.w, h: row.h, product: col.w * row.h });
        }
      });
    });
    return rooms;
  }

  /*
   * The written column method, built from the same rooms:
   * one line per strip of the second factor (its ones strip, then its tens strip).
   */
  function columnMethod(cols, rows) {
    var r = splitTensOnes(rows);
    var lines = [];
    if (r.ones > 0) lines.push({ strip: 'ones', by: r.ones, value: cols * r.ones });
    if (r.tens > 0) lines.push({ strip: 'tens', by: r.tens, value: cols * r.tens });
    return { lines: lines, total: cols * rows };
  }

  function multiples(n, upTo) {
    var out = [];
    for (var k = n; k <= upTo; k += n) out.push(k);
    return out;
  }

  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
  function lcm(a, b) { return (a * b) / gcd(a, b); }

  window.Sutra.model.multiply = {
    area: area,
    splitTensOnes: splitTensOnes,
    partialProducts: partialProducts,
    columnMethod: columnMethod,
    multiples: multiples,
    gcd: gcd,
    lcm: lcm
  };
})();
