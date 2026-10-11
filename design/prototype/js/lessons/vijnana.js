/*
 * Lesson data for the Vijnana lessons B3, K2 and R1: Bodha cards, Prashna picture, Pothi thumb, Explain template
 * and Spot-the-mistake. Strings: js/i18n/en-vijnana.js. Rules: model/science.js.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var F = Sutra.fig;
  var M = Sutra.manip;
  var S = Sutra.model.science;
  var t = Sutra.ui.t;

  /* ---------- B3: journey of a roti ---------- */
  var ORDER = S.organOrder();
  Sutra.lessons.B3 = {
    stateKey: 'digest',
    prashna: {
      art: function () {
        var s = F.svg(360, 120, t('dig.lengthArt'));
        s.appendChild(F.rect(20, 20, 18, 80, { fill: 'var(--indigo-soft)', stroke: 'var(--indigo)', sw: 2 }));
        s.appendChild(F.text(29, 112, '1.5 m', { size: 11 }));
        s.appendChild(F.path('M60 60 q 15 -30 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0', { stroke: 'var(--leaf)', sw: 6 }));
        s.appendChild(F.text(200, 100, t('dig.smallLen'), { size: 12, color: 'var(--leaf)' }));
        return s;
      }
    },
    cards: F.cards(3, {
      what: function () { return M.digestPath({ at: 'mouth' }); },
      idea: function () { return M.digestPath({ placed: ORDER }); },
      why: function () { return M.digestPath({ highlight: 'small', blood: true }); },
      example: function (step) { var at = ['mouth', 'mouth', 'stomach', 'small'][step]; return M.digestPath({ at: at, highlight: at, blood: step === 3 }); },
      where: function () { return M.digestPath({ highlight: 'large' }); }
    }),
    thumb: function () { return M.digestPath({ placed: ORDER, labels: false }); },
    explain: [{ tiles: ['blood', 'air', 'bones'], expect: 'blood' }, { tiles: ['stomach', 'small', 'mouth'], expect: 'small' }],
    mistake: {
      steps: 4, wrong: 2,
      picture: function (reveal) { return M.digestPath({ highlight: reveal ? 'small' : 'stomach', blood: reveal }); }
    }
  };

  /* ---------- K2: the ramp test ---------- */
  var run = function (h, s) { return { d: S.rollDistance(h, s), surface: s }; };
  Sutra.lessons.K2 = {
    stateKey: 'ramp',
    prashna: { art: function () { return M.ramp({ height: 2, surface: 'rug' }); } },
    cards: F.cards(3, {
      what: function () { return M.ramp({ height: 2, surface: 'tile', distance: S.rollDistance(2, 'tile') }); },
      idea: function () {
        var s = F.svg(360, 110, t('ramp.bumps'));
        s.appendChild(F.path('M20 50 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8', { stroke: 'var(--ink-soft)', sw: 2 }));
        s.appendChild(F.path('M120 56 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8 l10 -8', { stroke: 'var(--indigo)', sw: 2 }));
        s.appendChild(F.arrow(150, 86, 220, 86, 'var(--indigo)'));
        s.appendChild(F.arrow(210, 100, 160, 100, 'var(--kumkum)'));
        s.appendChild(F.text(240, 86, t('ramp.motion'), { size: 11, anchor: 'start', color: 'var(--indigo)' }));
        s.appendChild(F.text(240, 100, t('ramp.friction'), { size: 11, anchor: 'start', color: 'var(--kumkum)' }));
        return s;
      },
      why: function () { return M.ramp({ height: 2, surface: 'sand', distance: S.rollDistance(2, 'sand') }); },
      example: function (step) {
        if (step === 0) return M.ramp({ height: 2, surface: 'tile' });
        if (step === 1) return M.ramp({ height: 2, surface: 'tile', distance: S.rollDistance(2, 'tile') });
        return M.ramp({ height: 2, surface: 'sand', distance: S.rollDistance(2, 'sand'), ghosts: [run(2, 'tile')] });
      },
      where: function () { return M.ramp({ height: 2, surface: 'rug', distance: S.rollDistance(2, 'rug'), ghosts: [run(2, 'tile'), run(2, 'wood')] }); }
    }),
    thumb: function (m) { return M.ramp({ height: m.height || 2, surface: m.surface || 'sand', distance: S.rollDistance(m.height || 2, m.surface || 'sand') }); },
    explain: [{ tiles: ['more', 'less', 'no'], expect: 'more' }, { tiles: ['sooner', 'later', 'never'], expect: 'sooner' }, { tiles: ['one', 'two', 'every'], expect: 'one' }],
    mistake: {
      steps: 4, wrong: 1,
      picture: function () { return M.ramp({ height: 3, surface: 'sand', distance: S.rollDistance(3, 'sand'), ghosts: [run(1, 'tile')] }); },
      eq: function () { return t('ramp.twoChanges'); }
    }
  };

  /* ---------- R1: the lamp and the stick ---------- */
  Sutra.lessons.R1 = {
    stateKey: 'shadow',
    prashna: { art: function () { return M.lampStick({ lampH: 6, dist: 0.6 }); } },
    cards: F.cards(3, {
      what: function () { return M.lampStick({ lampH: 4, dist: 3 }); },
      idea: function () { return M.lampStick({ lampH: 3, dist: 3 }); },
      why: function () { return M.lampStick({ lampH: 2.5, dist: 3 }); },
      example: function (step) { return M.lampStick({ lampH: [2.5, 2.5, 4, 6][step], dist: step === 3 ? 0.6 : 3 }); },
      where: function () { return M.lampStick({ lampH: 6, dist: 1.2 }); }
    }),
    thumb: function (m) { return M.lampStick({ lampH: m.lampH || 3, dist: m.dist || 3, material: m.material }); },
    explain: [{ tiles: ['straight', 'curved', 'zigzag'], expect: 'straight' }, { tiles: ['longer', 'shorter', 'gone'], expect: 'shorter' }],
    mistake: {
      steps: 4, wrong: 2,
      picture: function (reveal) { return M.lampStick({ lampH: reveal ? 2.2 : 4, dist: 3 }); }
    }
  };
})();
