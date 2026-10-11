/*
 * Lesson data for the Loka lessons I2, E1 and E4: Bodha cards, Prashna picture, Pothi thumb, Explain template
 * and Spot-the-mistake. Strings: js/i18n/en-loka.js. Rules: model/world.js.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var F = Sutra.fig;
  var M = Sutra.manip;
  var W = Sutra.model.world;
  var t = Sutra.ui.t;

  /* A close-up of the years around the BCE/CE join; `crossZero` marks the year that does not exist. */
  function joinLine(crossZero) {
    var s = F.svg(360, 110, t('time.joinArt'));
    var years = [-3, -2, -1, 1, 2, 3];
    s.appendChild(F.line(10, 50, 350, 50, { stroke: 'var(--thread)', sw: 4 }));
    years.forEach(function (y, i) {
      var x = 30 + i * 60;
      s.appendChild(F.line(x, 42, x, 58, { stroke: 'var(--ink)', sw: 2 }));
      s.appendChild(F.text(x, 76, y < 0 ? t('time.bce', { y: -y }) : t('time.ce', { y: y }), { size: 12, color: y < 0 ? 'var(--indigo)' : 'var(--teal)' }));
    });
    s.appendChild(F.text(180, 24, crossZero ? t('time.noZero') : t('time.join'), { size: 12, color: 'var(--kumkum)' }));
    if (crossZero) {
      s.appendChild(F.text(180, 98, '0', { size: 18, color: 'var(--kumkum)' }));
      s.appendChild(F.line(168, 90, 192, 106, { stroke: 'var(--kumkum)', sw: 2.5 }));
    }
    return s;
  }

  /* ---------- I2: thread of time ---------- */
  var ALL = W.EVENTS.map(function (e) { return e.id; });
  Sutra.lessons.I2 = {
    stateKey: 'timeline',
    prashna: { art: function () { return M.timeline({ hung: [] }); } },
    cards: F.cards(3, {
      what: function () { return M.timeline({ hung: ALL }); },
      idea: function () { return M.timeline({ hung: [] }); },
      why: function () { return joinLine(true); },
      example: function (step) { return joinLine(step >= 2); },
      where: function () { return M.timeline({ hung: ALL.slice(3) }); }
    }),
    thumb: function (m) { return M.timeline({ hung: m.hung || ALL }); },
    explain: [{ tiles: ['longer', 'less', 'never'], expect: 'longer' }, { tiles: ['a', 'no', 'one'], expect: 'no' }],
    mistake: {
      steps: 4, wrong: 1,
      picture: function (reveal) { return joinLine(reveal); },
      eq: function () { return '49 + 1 + 49 = <span class="r">99</span>'; }
    }
  };

  /* ---------- E1: spin and travel ---------- */
  Sutra.lessons.E1 = {
    stateKey: 'earth',
    prashna: { art: function () { return M.earthSpin({ spin: 60 }); } },
    cards: F.cards(4, {
      what: function () { return M.earthSpin({ spin: 0 }); },
      idea: function () { return M.earthSpin({ spin: 180 }); },
      why: function () { return M.earthOrbit({ month: 5 }); },
      example: function (step) { return M.earthSpin({ spin: [270, 270, 0, 90, 180][step] }); },
      where: function () { return M.earthOrbit({ month: 11 }); }
    }),
    thumb: function (m) { return M.earthOrbit({ month: m.month === undefined ? 11 : m.month }); },
    explain: [{ tiles: ['spins', 'stops', 'shrinks'], expect: 'spins' }, { tiles: ['tilted', 'straight', 'broken'], expect: 'tilted' }],
    mistake: {
      steps: 4, wrong: 2,
      picture: function (reveal) { return M.earthOrbit({ month: reveal ? 0 : 5 }); }
    }
  };

  /* ---------- E4: courtyard from above ---------- */
  var gate = M.mapGrid.PLACES.gate;
  var SAMPLE = W.walk(gate, ['N', 'N', 'N', 'E', 'N', 'E', 'E', 'E', 'E']);
  Sutra.lessons.E4 = {
    stateKey: 'map',
    prashna: { art: function () { return M.courtyardMap({ flat: 0.3 }); } },
    cards: F.cards(3, {
      what: function () { return M.courtyardMap({ flat: 0.3 }); },
      idea: function () { return M.courtyardMap({}); },
      why: function () { return M.courtyardMap({ scale: 5 }); },
      example: function (step) { return M.courtyardMap({ path: step >= 1 ? SAMPLE.slice(0, step >= 2 ? SAMPLE.length : 6) : [gate] }); },
      where: function () { return M.courtyardMap({ path: SAMPLE }); }
    }),
    thumb: function (m) { return M.courtyardMap({ path: m.path || SAMPLE }); },
    explain: [{ tiles: ['above', 'side', 'inside'], expect: 'above' }, { tiles: ['ground', 'colour', 'time'], expect: 'ground' }],
    mistake: {
      steps: 4, wrong: 2,
      picture: function (reveal) {
        var s = F.svg(360, 90, '3 × 10 m');
        for (var i = 0; i < 3; i++) {
          s.appendChild(F.rect(60 + i * 80, 20, 80, 36, { fill: 'var(--paper-raised)', stroke: 'var(--ink)', sw: 2, rx: 0 }));
          s.appendChild(F.text(100 + i * 80, 38, '10 m', { size: 13, color: reveal ? 'var(--leaf)' : 'var(--ink)' }));
        }
        s.appendChild(F.text(180, 76, reveal ? '10 + 10 + 10 = 3 × 10 = 30 m' : '3 + 10 = 13 m ?', { size: 14, color: reveal ? 'var(--leaf)' : 'var(--kumkum)' }));
        return s;
      }
    }
  };
})();
