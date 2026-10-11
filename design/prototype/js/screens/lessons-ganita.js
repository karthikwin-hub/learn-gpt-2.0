/* Phase 2 Ganita workbenches: place-value houses (N1), folding strips (N3) and the rupee grid (U1). */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;
  var N = Sutra.model.number;

  function guide(prefix, step) { return ui.stepGuide(step, t(prefix + '.s' + step)); }
  function toMistake() { return ui.next(t('bench.toMistake'), 'mistake'); }

  /* ------------------------------------------------------------------ Place-value houses (N1) */
  Sutra.screens.place = {
    stage: 'manana', step: 'abhyasa', bench: true,
    title: 'place.title',
    note: 'Place value as bead houses. Step 1 adds one bead to 99,999 and every house bundles ten into one, all the way to 1,00,000. Step 2: tap houses to build 3,05,200 (a house that reaches ten bundles into the next, as in step 1). Step 3: the same number in international commas. The two readouts always show the Indian and international forms together, so lakh and million are seen as two ways of grouping, not two different numbers.',
    render: function (view, state) {
      ui.enterThread('N1', 'place');
      if (!state.step) { state.step = 1; state.digits = N.digits(99999, 7); state.highlight = []; }
      var holder = u.el('div', { class: 'model' });
      var read = u.el('div', { class: 'eq', 'aria-live': 'polite' });
      var action = u.el('div');
      var say = u.el('p', { class: 'say', hidden: true });

      function paint() {
        u.clear(holder);
        holder.appendChild(Sutra.manip.placeHouses({ digits: state.digits, highlight: state.highlight, onTap: state.step === 2 ? tap : null }));
        var n = N.fromDigits(state.digits);
        read.innerHTML = '<span class="a">' + t('place.indian') + ' ' + N.groupIndian(n) + '</span><br><span class="b">' + t('place.intl') + ' ' + N.groupInternational(n) + '</span>';
        u.clear(action);
        action.appendChild(guide('place', state.step));
        if (state.step === 1) action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('place.addOne'), addOne, 'thread block')]));
        if (state.step === 2) action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('common.clear'), function () { state.digits = N.digits(0, 7); state.highlight = []; paint(); }, 'quiet')]));
        if (state.step === 3 && !state.done) {
          action.appendChild(ui.chips(['4,50,000', '450,000', '45,0000'].map(function (v) { return { value: v, label: v }; }), null, function (v) {
            if (v === N.groupInternational(450000)) { state.done = true; state.digits = N.digits(450000, 7); paint(); ui.say(say, t('place.s3done'), true); }
            else ui.say(say, t('place.s3try'), true);
          }, t('place.s3')));
        }
        if (state.done) action.appendChild(toMistake());
      }

      function addOne() {
        var r = N.addOne(state.digits);
        state.digits = r.digits; state.highlight = r.bundled.concat([r.bundled.length]);
        paint();
        ui.say(say, t('place.s1done'), true);
        state.step = 2; state.digits = N.digits(0, 7);
        setTimeout(function () { state.highlight = []; paint(); }, u.reducedMotion() ? 0 : 3500);
      }

      function tap(i) {
        var d = state.digits.slice();
        d[i] += 1;
        state.highlight = [i];
        while (d[i] === 10 && i < d.length - 1) { d[i] = 0; d[i + 1] += 1; i++; state.highlight.push(i); }
        state.digits = d;
        paint();
        if (N.fromDigits(d) === 305200) { state.step = 3; paint(); ui.say(say, t('place.s2done'), true); }
      }

      view.appendChild(holder);
      view.appendChild(read);
      view.appendChild(say);
      view.appendChild(action);
      paint();
    }
  };

  /* ------------------------------------------------------------------ Folding strips (N3) */
  Sutra.screens.fractions = {
    stage: 'manana', step: 'abhyasa', bench: true,
    title: 'frac.title',
    note: 'Fractions as folded paper strips of the same length. Step 1 folds one strip into halves and another into quarters: 1/2 and 2/4 line up. Step 2: shade 3/4, then the same amount in eighths (6/8). Step 3 compares 2/3 and 3/4 by where the shading ends, not by the size of the numbers. Tapping a part shades up to it; tapping the last shaded part unshades it.',
    render: function (view, state) {
      ui.enterThread('N3', 'fractions');
      if (!state.step) { state.step = 1; state.strips = [{ num: 0, den: 1, hideLabel: true }, { num: 0, den: 1, hideLabel: true }]; }
      var holder = u.el('div', { class: 'model' });
      var action = u.el('div');
      var say = u.el('p', { class: 'say', hidden: true });
      var timers = [];

      function paint() {
        u.clear(holder);
        holder.appendChild(Sutra.manip.foldStrips({ strips: state.strips, line: state.line, onTap: state.step === 2 ? tap : null }));
        u.clear(action);
        action.appendChild(guide('frac', state.step));
        if (state.step === 1) action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('frac.fold'), demo, 'thread block')]));
        if (state.step === 3 && !state.done) {
          action.appendChild(ui.chips([{ value: 'a', label: '2/3' }, { value: 'b', label: '3/4' }, { value: 'same', label: t('frac.same') }], null, function (v) {
            var c = N.compare(2, 3, 3, 4);
            var right = c < 0 ? 'b' : c > 0 ? 'a' : 'same';
            if (v === right) { state.done = true; state.line = 2 / 3; paint(); ui.say(say, t('frac.s3done'), true); }
            else ui.say(say, t('frac.s3try'), true);
          }, t('frac.s3')));
        }
        if (state.done) action.appendChild(toMistake());
      }

      function demo() {
        state.strips = [{ num: 1, den: 2 }, { num: 0, den: 1, hideLabel: true }]; paint();
        var wait = u.reducedMotion() ? 0 : 1300;
        timers.push(setTimeout(function () { state.strips = [{ num: 1, den: 2 }, { num: 1, den: 2 }]; paint(); }, wait));
        timers.push(setTimeout(function () {
          state.strips = [{ num: 1, den: 2 }, N.fold(1, 2)]; state.line = 0.5; paint();
          ui.say(say, t('frac.s1done'), true);
          state.step = 2;
          timers.push(setTimeout(function () { state.strips = [{ num: 0, den: 4 }, { num: 0, den: 8 }]; state.line = undefined; paint(); }, wait * 3));
        }, wait * 2));
      }

      function tap(row, idx) {
        var st = state.strips[row];
        st.num = st.num === idx + 1 ? idx : idx + 1;
        paint();
        var a = state.strips[0], b = state.strips[1];
        if (a.num === 3 && b.num && N.equivalent(a.num, a.den, b.num, b.den)) {
          state.line = 0.75; state.step = 3; state.strips = [{ num: 2, den: 3 }, { num: 3, den: 4 }];
          ui.say(say, t('frac.s2done'), true);
          timers.push(setTimeout(function () { state.line = undefined; paint(); }, u.reducedMotion() ? 0 : 2600));
          paint();
        }
      }

      view.appendChild(holder);
      view.appendChild(say);
      view.appendChild(action);
      paint();
      return function () { timers.forEach(clearTimeout); };
    }
  };

  /* ------------------------------------------------------------------ The rupee grid (U1) */
  Sutra.screens.money = {
    stage: 'manana', step: 'abhyasa', bench: true,
    title: 'money.title',
    note: 'Decimals as money. One rupee is a 10 × 10 grid: a strip is 10 paise (a tenth), a square is 1 paisa (a hundredth). The place chart under the grid shows rupees . tenths hundredths, and amounts are kept in whole paise so nothing rounds. Step 3 puts ₹0.5 and ₹0.45 side by side, the misconception that a longer decimal is bigger. Paise are a unit of measure here, not coins in everyday use.',
    render: function (view, state) {
      ui.enterThread('U1', 'money');
      if (!state.step) { state.step = 1; state.paise = 0; }
      var holder = u.el('div', { class: 'model' });
      var chart = u.el('div', { class: 'eq', 'aria-live': 'polite' });
      var action = u.el('div');
      var say = u.el('p', { class: 'say', hidden: true });
      var timers = [];

      function paint() {
        u.clear(holder);
        if (state.step === 3) holder.appendChild(Sutra.manip.rupeeCompare(50, 45, '₹0.5', '₹0.45'));
        else holder.appendChild(Sutra.manip.rupeeGrid({ paise: state.paise }));
        var sp = N.splitPaise(state.step === 3 ? 50 : state.paise);
        chart.innerHTML = state.step === 3 ? '' : t('money.chart') + ': <span class="a">' + sp.rupees + '</span> . <span class="b">' + sp.tenths + '</span><span class="r">' + sp.hundredths + '</span>';
        u.clear(action);
        action.appendChild(guide('money', state.step));
        if (state.step === 1) action.appendChild(u.el('div', { class: 'btn-row' }, [ui.btn(t('money.showMe'), demo, 'thread block')]));
        if (state.step === 2) {
          action.appendChild(u.el('div', { class: 'btn-row' }, [
            ui.btn(t('money.addRupee'), function () { add(100); }, 'quiet'),
            ui.btn(t('money.addStrip'), function () { add(10); }, 'quiet'),
            ui.btn(t('money.addSquare'), function () { add(1); }, 'quiet'),
            ui.btn(t('common.clear'), function () { state.paise = 0; paint(); }, 'quiet')
          ]));
        }
        if (state.step === 3 && !state.done) {
          action.appendChild(ui.chips([{ value: 50, label: '₹0.5' }, { value: 45, label: '₹0.45' }, { value: 0, label: t('frac.same') }], null, function (v) {
            if (v === Math.max(N.parseRupees('0.5'), N.parseRupees('0.45'))) { state.done = true; paint(); ui.say(say, t('money.s3done'), true); }
            else ui.say(say, t('money.s3try'), true);
          }, t('money.s3')));
        }
        if (state.done) action.appendChild(toMistake());
      }

      function add(p) {
        state.paise = Math.min(300, state.paise + p);
        paint();
        if (state.paise === N.paiseOf(2, 50)) { state.step = 3; paint(); ui.say(say, t('money.s2done'), true); }
      }

      function demo() {
        var seq = [100, 110, 120, 121, 122, 123, 124, 125], wait = u.reducedMotion() ? 0 : 450;
        seq.forEach(function (p, i) { timers.push(setTimeout(function () { state.paise = p; paint(); }, wait * i)); });
        timers.push(setTimeout(function () { ui.say(say, t('money.s1done'), true); state.step = 2; state.paise = 0; }, wait * seq.length + 300));
        timers.push(setTimeout(function () { paint(); }, wait * seq.length + (u.reducedMotion() ? 300 : 3000)));
      }

      view.appendChild(holder);
      view.appendChild(chart);
      view.appendChild(say);
      view.appendChild(action);
      paint();
      return function () { timers.forEach(clearTimeout); };
    }
  };
})();
