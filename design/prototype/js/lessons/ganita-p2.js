/*
 * Lesson data for the phase 2 Ganita lessons N1, N3 and U1: Bodha cards, Prashna picture, Pothi thumb,
 * Explain template and Spot-the-mistake. Strings: js/i18n/en-ganita.js. Rules: model/number.js.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var F = Sutra.fig;
  var M = Sutra.manip;
  var N = Sutra.model.number;
  var t = Sutra.ui.t;

  function twoLines(top, bottom, label) {
    var s = F.svg(360, 90, label || top + ', ' + bottom);
    s.appendChild(F.text(180, 28, top, { size: 22, color: 'var(--indigo)' }));
    s.appendChild(F.text(180, 66, bottom, { size: 22, color: 'var(--teal)' }));
    return s;
  }

  /* ---------- N1: lakh and crore ---------- */
  var houses = function (n, hi) { return M.placeHouses({ digits: N.digits(n, 7), highlight: hi }); };
  Sutra.lessons.N1 = {
    stateKey: 'place',
    prashna: { art: function () { return houses(100000, [5]); } },
    cards: F.cards(3, {
      what: function () { return houses(305200); },
      idea: function () { var r = N.addOne(N.digits(99999, 7)); return M.placeHouses({ digits: r.digits, highlight: r.bundled.concat([5]) }); },
      why: function () { return twoLines(t('place.indian') + ': ' + N.groupIndian(1234567), t('place.intl') + ': ' + N.groupInternational(1234567)); },
      example: function (step) { return houses(1234567, step === 1 ? [5, 6] : step === 2 ? [3, 4] : step === 3 ? [0, 1, 2] : []); },
      where: function () { return twoLines(t('place.indian') + ': 10,00,000', t('place.intl') + ': 1,000,000'); }
    }),
    thumb: function (m) { return houses(N.fromDigits(m.digits || N.digits(305200, 7))); },
    explain: [{ tiles: ['two', 'ten', 'hundred'], expect: 'ten' }, { tiles: ['one', 'two', 'three'], expect: 'two' }],
    mistake: {
      steps: 4, wrong: 2,
      picture: function (reveal) { return houses(205000, reveal ? [5, 3] : []); },
      eq: function () { return '<s>2,5000</s> → <span class="r">2,05,000</span>'; }
    }
  };

  /* ---------- N3: equal parts ---------- */
  Sutra.lessons.N3 = {
    stateKey: 'fractions',
    prashna: {
      art: function () {
        var s = F.svg(360, 150, '1/2, 2/4');
        [[100, 2], [260, 4]].forEach(function (r) {
          s.appendChild(F.circle(r[0], 72, 56, { fill: '#E9C98F', stroke: 'var(--ink-soft)', sw: 2 }));
          for (var i = 0; i < r[1]; i++) {
            var a = (i * 2 * Math.PI) / r[1];
            s.appendChild(F.line(r[0], 72, r[0] + 56 * Math.cos(a), 72 + 56 * Math.sin(a), { stroke: 'var(--ink-soft)', sw: 2 }));
          }
          s.appendChild(F.path('M' + r[0] + ' 72 L' + (r[0] + 56) + ' 72 A 56 56 0 0 1 ' + (r[0] - 56) + ' 72 Z', { fill: 'var(--paper-sunk)', stroke: 'none', opacity: 0.85 }));
        });
        s.appendChild(F.text(100, 140, t('frac.ravi'), { size: 13 }));
        s.appendChild(F.text(260, 140, t('frac.mini'), { size: 13 }));
        return s;
      }
    },
    cards: F.cards(3, {
      what: function () { return M.foldStrips({ strips: [{ num: 1, den: 2 }, { num: 2, den: 4 }] }); },
      idea: function () { return M.foldStrips({ strips: [{ num: 3, den: 4 }] }); },
      why: function () {
        var s = F.svg(360, 70, t('frac.unequal'));
        s.appendChild(F.rect(30, 10, 200, 40, { fill: 'var(--thread-soft)', stroke: 'var(--ink-soft)', sw: 1.5, rx: 0 }));
        s.appendChild(F.rect(230, 10, 100, 40, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', sw: 1.5, rx: 0 }));
        s.appendChild(F.text(180, 62, t('frac.unequal'), { size: 12, color: 'var(--kumkum)' }));
        return s;
      },
      example: function (step) {
        var list = [{ num: 1, den: 2 }];
        if (step >= 1) list.push({ num: 2, den: 4 });
        if (step >= 2) list.push({ num: 4, den: 8 });
        return M.foldStrips({ strips: list, line: step >= 3 ? 0.5 : undefined });
      },
      where: function () { return M.foldStrips({ strips: [{ num: 1, den: 2 }, { num: 1, den: 4 }] }); }
    }),
    thumb: function (m) { return M.foldStrips({ strips: m.strips || [{ num: 3, den: 4 }, { num: 6, den: 8 }] }); },
    explain: [{ tiles: ['equal', 'big', 'any'], expect: 'equal' }, { tiles: ['bigger', 'same', 'smaller'], expect: 'same' }],
    mistake: {
      steps: 4, wrong: 2,
      picture: function (reveal) { return M.foldStrips({ strips: [{ num: 1, den: 2 }, { num: 1, den: 3 }], line: reveal ? 0.5 : undefined }); },
      eq: function () { return '1/3 &lt; <span class="r">1/2</span>'; }
    }
  };

  /* ---------- U1: rupees and paise ---------- */
  Sutra.lessons.U1 = {
    stateKey: 'money',
    prashna: {
      art: function () {
        var s = F.svg(360, 130, '₹4.5, ₹4.25');
        [[100, '₹4.5', t('money.pencil')], [260, '₹4.25', t('money.eraser')]].forEach(function (p) {
          s.appendChild(F.path('M' + (p[0] - 60) + ' 30 L' + (p[0] + 40) + ' 30 L' + (p[0] + 64) + ' 62 L' + (p[0] + 40) + ' 94 L' + (p[0] - 60) + ' 94 Z', { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', sw: 2 }));
          s.appendChild(F.text(p[0] - 6, 62, p[1], { size: 24 }));
          s.appendChild(F.text(p[0] - 6, 114, p[2], { size: 13, color: 'var(--ink-soft)' }));
        });
        return s;
      }
    },
    cards: F.cards(3, {
      what: function () { return M.rupeeGrid({ paise: 125 }); },
      idea: function () { return M.rupeeGrid({ paise: 100 }); },
      why: function () { return M.rupeeGrid({ paise: 37 }); },
      example: function (step) { return M.rupeeGrid({ paise: step >= 3 ? 375 : step >= 2 ? 370 : step >= 1 ? 300 : 0 }); },
      where: function () { return M.rupeeCompare(50, 45); }
    }),
    thumb: function (m) { return M.rupeeGrid({ paise: m.paise || 250 }); },
    explain: [{ tiles: ['tenths', 'hundredths', 'ones'], expect: 'tenths' }, { tiles: ['p5', 'p50', 'p500'], expect: 'p50' }],
    mistake: {
      steps: 4, wrong: 2,
      picture: function (reveal) { return M.rupeeCompare(50, 45, reveal ? '₹0.50' : '₹0.5', '₹0.45'); },
      eq: function () { return '₹0.45 &lt; <span class="r">₹0.50</span>'; }
    }
  };
})();
