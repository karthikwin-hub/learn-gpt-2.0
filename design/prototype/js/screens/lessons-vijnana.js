/* Vijnana workbenches: the journey of a roti (B3), the ramp test (K2) and the lamp and stick (R1). */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;
  var S = Sutra.model.science;

  function guide(prefix, step) { return ui.stepGuide(step, t(prefix + '.s' + step)); }
  function toMistake() { return ui.next(t('bench.toMistake'), 'mistake'); }

  /* ------------------------------------------------------------------ Journey of a roti (B3) */
  Sutra.screens.digest = {
    stage: 'manana', step: 'abhyasa', bench: true,
    title: 'dig.title',
    note: 'Digestion as a journey. Step 1 follows one bite through five stops, each with one plain sentence. Step 2: tap the stops in order; a wrong tap only asks where food goes next. Step 3 targets the common idea that food enters the blood in the stomach: most of it passes into the blood in the small intestine. The facts used are listed in CURRICULUM_PHASE2 §7 and need a science teacher\'s sign-off.',
    render: function (view, state) {
      ui.enterThread('B3', 'digest');
      if (!state.step) { state.step = 1; state.placed = []; state.at = null; }
      var holder = u.el('div', { class: 'model' });
      var action = u.el('div');
      var say = u.el('p', { class: 'say', hidden: true });
      var order = S.organOrder();
      var timers = [];

      function paint() {
        u.clear(holder);
        holder.appendChild(Sutra.manip.digestPath({
          at: state.at, highlight: state.at, placed: state.placed, blood: state.done,
          onTap: state.step > 1 && !state.done ? tap : null
        }));
        u.clear(action);
        action.appendChild(guide('dig', state.step));
        if (state.step === 1) action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('dig.showMe'), demo, 'thread block')]));
        if (state.step === 2 && state.placed.length) {
          action.appendChild(u.el('ol', { class: 'placed-list' }, state.placed.map(function (id) { return u.el('li', { text: t('dig.o.' + id) }); })));
        }
        if (state.done) action.appendChild(toMistake());
      }

      function demo() {
        var wait = u.reducedMotion() ? 600 : 2600;
        order.forEach(function (id, i) {
          timers.push(setTimeout(function () { state.at = id; paint(); ui.say(say, t('dig.say.' + id), true); }, wait * i));
        });
        timers.push(setTimeout(function () { state.at = null; state.step = 2; paint(); ui.say(say, t('dig.s1done'), true); }, wait * order.length));
      }

      function tap(id) {
        if (state.step === 2) {
          var next = order[state.placed.length];
          if (id === next) {
            state.placed.push(id);
            if (S.isInOrder(state.placed)) { state.step = 3; ui.say(say, t('dig.s2done'), true); }
            paint();
          } else if (state.placed.indexOf(id) < 0) {
            ui.say(say, state.placed.length ? t('dig.notYet', { last: t('dig.o.' + state.placed[state.placed.length - 1]) }) : t('dig.notFirst'), true);
          }
        } else if (state.step === 3) {
          if (S.absorbsMost(id)) { state.done = true; state.at = id; paint(); ui.say(say, t('dig.s3done'), true); }
          else ui.say(say, t('dig.s3try', { o: t('dig.o.' + id) }), true);
        }
      }

      view.appendChild(holder);
      view.appendChild(say);
      view.appendChild(action);
      paint();
      return function () { timers.forEach(clearTimeout); };
    }
  };

  /* ------------------------------------------------------------------ The ramp test (K2) */
  Sutra.screens.ramp = {
    stage: 'manana', step: 'abhyasa', bench: true,
    title: 'ramp.title',
    note: 'Friction and the fair test. Distances are illustrative ("pretend measurements") and the child is invited to try a real ramp at home. Each run leaves a marker. After every run the model compares it with the one before: if only the floor changed it names a fair test; if the height and the floor both changed it says the test cannot tell which one mattered. Step 2 ends when all four floors were tried from one height; step 3 ranks them.',
    render: function (view, state) {
      ui.enterThread('K2', 'ramp');
      if (!state.step) { state.step = 1; state.height = 2; state.surface = 'tile'; state.runs = []; state.rank = []; }
      var holder = u.el('div', { class: 'model' });
      var action = u.el('div');
      var say = u.el('p', { class: 'say', hidden: true });
      var cancel = null, timers = [];

      function draw(progress, distance) {
        u.clear(holder);
        holder.appendChild(Sutra.manip.ramp({
          height: state.height, surface: state.surface, progress: progress, distance: distance,
          ghosts: state.runs.filter(function (r) { return r.height === state.height; }).map(function (r) { return { d: r.d, surface: r.surface }; })
        }));
      }

      function paint() {
        var last = state.runs[state.runs.length - 1];
        draw(1, last && last.height === state.height && last.surface === state.surface ? last.d : undefined);
        u.clear(action);
        action.appendChild(guide('ramp', state.step));
        if (state.step === 1) action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('ramp.showMe'), demo, 'thread block')]));
        if (state.step === 2) {
          var hStep = u.stepper({ value: state.height, min: 1, max: 4, label: t('ramp.height'), onChange: function (v) { state.height = v; paint(); } });
          action.appendChild(ui.labelled(t('ramp.height'), hStep.node));
          action.appendChild(ui.chips(S.SURFACE_ORDER.map(function (s) { return { value: s, label: t('ramp.s.' + s) }; }), state.surface, function (s) { state.surface = s; paint(); }, t('ramp.floor')));
          action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('ramp.roll'), roll, 'primary block')]));
        }
        if (state.step === 3 && !state.done) {
          action.appendChild(u.el('p', { class: 'muted small', text: state.rank.map(function (s) { return t('ramp.s.' + s); }).join(' › ') || ' ' }));
          action.appendChild(ui.chips(S.SURFACE_ORDER.filter(function (s) { return state.rank.indexOf(s) < 0; }).map(function (s) { return { value: s, label: t('ramp.s.' + s) }; }), null, rank, t('ramp.s3')));
        }
        if (state.done) {
          action.appendChild(u.el('p', { class: 'muted small', text: S.byFriction().map(function (s) { return t('ramp.s.' + s); }).join(' › ') }));
          action.appendChild(u.el('p', { class: 'muted small', text: t('ramp.atHome') }));
          action.appendChild(toMistake());
        }
      }

      function animate(distance, done) {
        cancel = u.tween(1600, function (p) { draw(p, distance); }, function () { cancel = null; done(); });
      }

      function roll() {
        if (cancel) return;
        var d = S.rollDistance(state.height, state.surface);
        var run = { height: state.height, surface: state.surface, car: 1, d: d };
        var prev = state.runs[state.runs.length - 1];
        animate(d, function () {
          state.runs.push(run);
          var msg;
          if (!prev) msg = t('ramp.first', { s: t('ramp.s.' + run.surface), d: d });
          else if (S.isFair(prev, run)) msg = S.changed(prev, run)[0] === 'surface' ? t('ramp.fair', { s: t('ramp.s.' + run.surface), d: d }) : t('ramp.fairHeight', { d: d });
          else if (S.changed(prev, run).length === 0) msg = t('ramp.same', { d: d });
          else msg = t('ramp.unfair');
          var at = state.runs.filter(function (r) { return r.height === state.height; }).map(function (r) { return r.surface; });
          if (S.SURFACE_ORDER.every(function (s) { return at.indexOf(s) >= 0; })) { state.step = 3; msg += ' ' + t('ramp.s2done'); }
          paint();
          ui.say(say, msg, true);
        });
      }

      function demo() {
        if (cancel) return;
        state.surface = 'tile';
        animate(S.rollDistance(2, 'tile'), function () {
          state.runs.push({ height: 2, surface: 'tile', car: 1, d: S.rollDistance(2, 'tile') });
          state.surface = 'sand';
          timers.push(setTimeout(function () {
            animate(S.rollDistance(2, 'sand'), function () {
              state.runs.push({ height: 2, surface: 'sand', car: 1, d: S.rollDistance(2, 'sand') });
              state.step = 2; paint(); ui.say(say, t('ramp.s1done'), true);
            });
          }, 500));
        });
      }

      function rank(s) {
        var expect = S.byFriction()[state.rank.length];
        if (s === expect) {
          state.rank.push(s);
          if (state.rank.length === S.SURFACE_ORDER.length) { state.done = true; ui.say(say, t('ramp.s3done'), true); }
          paint();
        } else ui.say(say, t('ramp.rankTry'), true);
      }

      view.appendChild(holder);
      view.appendChild(say);
      view.appendChild(action);
      paint();
      return function () { if (cancel) cancel(); timers.forEach(clearTimeout); };
    }
  };

  /* ------------------------------------------------------------------ The lamp and the stick (R1) */
  Sutra.screens.shadow = {
    stage: 'manana', step: 'abhyasa', bench: true,
    title: 'light.title',
    note: 'Light and shadow. Rays are drawn as straight dashed lines from the lamp past the top of the stick; the shadow ends where that ray meets the ground (shadow = stick height × distance ÷ (lamp height − stick height)). Step 1 raises the lamp and the shadow shrinks. Step 2 targets the misconception that a lower light makes a shorter shadow. Step 3 compares opaque, translucent and transparent materials by how dark the shadow is.',
    render: function (view, state) {
      ui.enterThread('R1', 'shadow');
      if (!state.step) { state.step = 1; state.lampH = 2.5; state.dist = 3; state.material = 'cardboard'; }
      var STICK = 1.5;
      var holder = u.el('div', { class: 'model' });
      var action = u.el('div');
      var say = u.el('p', { class: 'say', hidden: true });
      var cancel = null;

      function draw() {
        u.clear(holder);
        holder.appendChild(Sutra.manip.lampStick({ lampH: state.lampH, dist: state.dist, stickH: STICK, material: state.material }));
      }

      function paint() {
        draw();
        u.clear(action);
        action.appendChild(guide('light', state.step));
        if (state.step === 1) action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('light.showMe'), demo, 'thread block')]));
        if (state.step === 2) {
          var hStep = u.stepper({ value: state.lampH * 2, min: 4, max: 12, label: t('light.lampHeight'), onChange: function (v) { state.lampH = v / 2; check(); } });
          var dStep = u.stepper({ value: state.dist, min: 1, max: 5, label: t('light.distance'), onChange: function (v) { state.dist = v; check(); } });
          action.appendChild(ui.labelled(t('light.lampHeight'), hStep.node));
          action.appendChild(ui.labelled(t('light.distance'), dStep.node));
        }
        if (state.step === 3) {
          action.appendChild(ui.chips(Object.keys(S.MATERIALS).map(function (m) { return { value: m, label: t('light.m.' + m) }; }), state.material, function (m) { state.material = m; draw(); ui.say(say, t('light.kind.' + S.MATERIALS[m]), true); }, t('light.material')));
          if (!state.done) {
            action.appendChild(u.el('p', { class: 'muted small', text: t('light.darkestQ') }));
            action.appendChild(ui.chips(Object.keys(S.MATERIALS).map(function (m) { return { value: m, label: t('light.m.' + m) }; }), null, function (m) {
              if (S.shadowDarkness(m) === 1) { state.done = true; state.material = m; paint(); ui.say(say, t('light.s3done'), true); }
              else ui.say(say, t('light.s3try'), true);
            }, t('light.darkestQ')));
          }
        }
        if (state.done) action.appendChild(toMistake());
      }

      function check() {
        draw();
        var len = S.shadowLength(STICK, state.lampH, state.dist);
        if (len > STICK) {
          state.step = 3;
          paint();
          ui.say(say, t('light.s2done', { n: isFinite(len) ? Math.round(len * 10) / 10 : '∞', h: STICK }), true);
        }
      }

      function demo() {
        if (cancel) return;
        cancel = u.tween(3200, function (p) { state.lampH = 2.5 + p * 3.5; draw(); }, function () {
          cancel = null; state.lampH = 6; state.step = 2; paint(); ui.say(say, t('light.s1done'), true);
        });
      }

      view.appendChild(holder);
      view.appendChild(say);
      view.appendChild(action);
      paint();
      return function () { if (cancel) cancel(); };
    }
  };
})();
