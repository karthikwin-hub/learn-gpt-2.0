/* Loka workbenches: the thread of time (I2), spin and travel (E1) and the courtyard from above (E4). */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;
  var W = Sutra.model.world;

  function guide(prefix, step) { return ui.stepGuide(step, t(prefix + '.s' + step)); }
  function toMistake() { return ui.next(t('bench.toMistake'), 'mistake'); }

  /* ------------------------------------------------------------------ Thread of time (I2) */
  var SHUFFLED = ['taj', 'ashoka', 'chandrayaan', 'harappa', 'independence', 'aryabhata'];
  Sutra.screens.timeline = {
    stage: 'manana', step: 'abhyasa', bench: true,
    title: 'time.title',
    note: 'History as a number line for years, drawn to true scale so recent events crowd together, which is itself worth noticing. The knot at the join is between 1 BCE and 1 CE: there is no year zero. Step 2 hangs six events oldest first; labels sit in slots with a leader to their true place. Step 3 counts years across the join (250 BCE to 499 CE = 748), the place where children most often add a year that does not exist. Approximate dates say "about".',
    render: function (view, state) {
      ui.enterThread('I2', 'timeline');
      if (!state.step) { state.step = 1; state.hung = []; state.reveal = 0; }
      var holder = u.el('div', { class: 'model' });
      var action = u.el('div');
      var say = u.el('p', { class: 'say', hidden: true });
      var cancel = null;

      function draw(span) {
        u.clear(holder);
        holder.appendChild(Sutra.manip.timeline({ hung: state.hung, reveal: state.reveal, span: span }));
      }

      function paint() {
        draw(state.done ? [-250, 499] : null);
        u.clear(action);
        action.appendChild(guide('time', state.step));
        if (state.step === 1) action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('time.showMe'), demo, 'thread block')]));
        if (state.step === 2) {
          action.appendChild(ui.chips(SHUFFLED.filter(function (id) { return state.hung.indexOf(id) < 0; }).map(function (id) { return { value: id, label: t('time.e.' + id) }; }), null, hang, t('time.s2')));
        }
        if (state.step === 3 && !state.done) {
          var right = W.yearsBetween(W.signed(250, 'BCE'), W.signed(499, 'CE'));
          action.appendChild(ui.chips([right + 1, right, 249].map(function (n) { return { value: n, label: t('time.years', { n: n }) }; }), null, function (n) {
            if (n === right) { state.done = true; paint(); ui.say(say, t('time.s3done', { n: right }), true); }
            else ui.say(say, n === right + 1 ? t('time.s3tryZero') : t('time.s3try'), true);
          }, t('time.s3')));
        }
        if (state.done) action.appendChild(toMistake());
      }

      function demo() {
        if (cancel) return;
        cancel = u.tween(2600, function (p) { state.reveal = p; draw(null); }, function () {
          cancel = null; state.reveal = 1; state.step = 2; paint(); ui.say(say, t('time.s1done'), true);
        });
      }

      function hang(id) {
        var trial = state.hung.concat([id]);
        var remaining = W.EVENTS.filter(function (e) { return trial.indexOf(e.id) < 0; });
        var ev = W.EVENTS.filter(function (e) { return e.id === id; })[0];
        var oldest = remaining.every(function (e) { return W.isEarlier(ev.year, e.year); });
        if (oldest && W.chronological(trial)) {
          state.hung = trial;
          if (state.hung.length === W.EVENTS.length) { state.step = 3; ui.say(say, t('time.s2done'), true); }
          paint();
        } else ui.say(say, t('time.notYet'), true);
      }

      view.appendChild(holder);
      view.appendChild(say);
      view.appendChild(action);
      paint();
      return function () { if (cancel) cancel(); };
    }
  };

  /* ------------------------------------------------------------------ Spin and travel (E1) */
  var MONTHS = [2, 5, 8, 11];
  Sutra.screens.earth = {
    stage: 'manana', step: 'abhyasa', bench: true,
    title: 'earth.title',
    note: 'Two views of one Earth. The spin view looks down on the North Pole with the Sun to the left; the night half is shaded and India\'s marker turns with the Earth (one spin is about 24 hours). The orbit view keeps the tilted axis pointing the same way all year, so in June the northern half leans toward the Sun and in December away. It never uses distance from the Sun to explain seasons: the Earth is actually closest in early January.',
    render: function (view, state) {
      ui.enterThread('E1', 'earth');
      if (!state.step) { state.step = 1; state.spin = 0; state.month = 5; }
      var holder = u.el('div', { class: 'model' });
      var action = u.el('div');
      var say = u.el('p', { class: 'say', hidden: true });
      var cancel = null;

      function draw() {
        u.clear(holder);
        holder.appendChild(state.step === 3 ? Sutra.manip.earthOrbit({ month: state.month }) : Sutra.manip.earthSpin({ spin: state.spin }));
      }

      function paint() {
        draw();
        u.clear(action);
        action.appendChild(guide('earth', state.step));
        if (state.step === 1) action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('earth.showMe'), demo, 'thread block')]));
        if (state.step === 2) {
          action.appendChild(u.el('div', { class: 'btn-row' }, [
            ui.btn(t('earth.turnBack'), function () { turn(-30); }, 'quiet'),
            ui.btn(t('earth.turn'), function () { turn(30); }, 'primary')
          ]));
        }
        if (state.step === 3) {
          action.appendChild(ui.chips(MONTHS.map(function (m) { return { value: m, label: t('earth.m' + m) }; }), state.month, function (m) {
            state.month = m; draw();
            if (state.done) return;
            if (W.northernSeason(m) === 'winter') { state.done = true; paint(); ui.say(say, t('earth.s3done'), true); }
            else ui.say(say, t('earth.tryAgain', { m: t('earth.m' + m), s: t('earth.season.' + W.northernSeason(m)) }), true);
          }, t('earth.month')));
        }
        if (state.done) action.appendChild(toMistake());
      }

      function turn(deg) {
        state.spin = (state.spin + deg + 360) % 360;
        draw();
        var hour = W.hourAt(state.spin);
        if (!W.isDay(hour)) {
          state.step = 3; state.month = 5;
          ui.say(say, t('earth.s2done', { h: String(hour).padStart(2, '0') + ':00' }), true);
          setTimeout(paint, u.reducedMotion() ? 0 : 2400);
        }
      }

      function demo() {
        if (cancel) return;
        cancel = u.tween(6000, function (p) { state.spin = Math.round(p * 24) * 15 % 360; draw(); }, function () {
          cancel = null; state.spin = 0; state.step = 2; paint(); ui.say(say, t('earth.s1done'), true);
        });
      }

      view.appendChild(holder);
      view.appendChild(say);
      view.appendChild(action);
      paint();
      return function () { if (cancel) cancel(); };
    }
  };

  /* ------------------------------------------------------------------ Courtyard from above (E4) */
  var SCALE = 5;
  Sutra.screens.map = {
    stage: 'manana', step: 'abhyasa', bench: true,
    title: 'map.title',
    note: 'A map as the courtyard seen from above. Step 1 tips the courtyard flat into a top view with north at the top, a legend and a scale. Step 2 walks from the gate to the well with N, E, S and W; walls and the house block the way. Step 3 turns the squares walked into metres by multiplying by the scale, against the common mistake of adding it. The answer uses the child\'s own path, so any route works.',
    render: function (view, state) {
      ui.enterThread('E4', 'map');
      var gate = W.COURTYARD.places.gate, well = W.COURTYARD.places.well;
      if (!state.step) { state.step = 1; state.flat = 0.3; state.path = [gate]; }
      var holder = u.el('div', { class: 'model' });
      var action = u.el('div');
      var say = u.el('p', { class: 'say', hidden: true });
      var cancel = null;

      function draw() {
        u.clear(holder);
        holder.appendChild(Sutra.manip.courtyardMap({ flat: state.flat, path: state.step > 1 ? state.path : null, scale: SCALE }));
      }

      function paint() {
        draw();
        u.clear(action);
        action.appendChild(guide('map', state.step));
        if (state.step === 1) action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('map.showMe'), demo, 'thread block')]));
        if (state.step === 2) {
          action.appendChild(u.el('div', { class: 'compass-pad', role: 'group', 'aria-label': t('map.s2') }, ['N', 'W', 'E', 'S'].map(function (d) {
            return ui.btn(t('map.dir.' + d), function () { move(d); }, 'quiet dir-' + d);
          })));
          action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('common.undo'), function () { if (state.path.length > 1) { state.path.pop(); paint(); } }, 'quiet')]));
        }
        if (state.step === 3 && !state.done) {
          var n = state.path.length - 1, right = W.realDistance(n, SCALE);
          action.appendChild(u.el('p', { class: 'muted small', text: t('map.walked', { n: n }) }));
          action.appendChild(ui.chips([n + SCALE, right, n].map(function (v) { return { value: v, label: v + ' m' }; }), null, function (v) {
            if (v === right) { state.done = true; paint(); ui.say(say, t('map.s3done', { n: n, m: right, s: SCALE }), true); }
            else ui.say(say, v === n + SCALE ? t('map.s3tryAdd') : t('map.s3try'), true);
          }, t('map.s3')));
        }
        if (state.done) action.appendChild(toMistake());
      }

      function move(d) {
        var next = W.step(state.path[state.path.length - 1], d);
        if (W.isBlocked(next[0], next[1])) { ui.say(say, t('map.blocked'), true); return; }
        state.path = state.path.concat([next]);
        if (next[0] === well[0] && next[1] === well[1]) { state.step = 3; ui.say(say, t('map.s2done'), true); }
        paint();
      }

      function demo() {
        if (cancel) return;
        cancel = u.tween(2200, function (p) { state.flat = 0.3 + 0.7 * u.easeInOut(p); draw(); }, function () {
          cancel = null; state.flat = 1; state.step = 2; paint(); ui.say(say, t('map.s1done', { s: SCALE }), true);
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
