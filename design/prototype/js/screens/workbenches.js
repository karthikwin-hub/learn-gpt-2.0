/* Workbench screens: each wires one manipulative to guidance, linked panes and narration. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;
  var M = Sutra.model.multiply, D = Sutra.model.divide, G = Sutra.model.geometry, S = Sutra.model.sets, L = Sutra.model.logic;

  function eqHTML(a, b, r, op) {
    return '<span class="a">' + a + '</span> ' + (op || '×') + ' <span class="b">' + b + '</span> = <span class="r">' + r + '</span>';
  }

  /* ------------------------------------------------------------------ Rubber Rectangle (M4) */
  Sutra.screens.rect = {
    title: 'rect.title',
    note: 'Step 3: the workbench, with steps that fade from fully worked to independent. Step 1 the hand demonstrates; step 2 the child cuts at the tens and folds the four rooms into the written column method (the distributive law, seen rather than told); step 3 they do 17 × 12 alone. Steppers are the accessible alternative to dragging. Dashed outlines are ghosts of earlier sizes.',
    render: function (view, state) {
      ui.enterThread('M4', 'rect');
      if (!state.cols) { state.cols = 6; state.rows = 4; state.step = 1; state.cut = false; state.folded = 0; }
      var cancel = null;

      var guide = u.el('div');
      var eq = u.el('div', { class: 'eq', 'aria-live': 'polite' });
      var partsCard = u.el('section', { class: 'card' });
      var action = u.el('div', { class: 'btn-row' });
      var say = u.el('p', { class: 'say', hidden: true });

      var grid = Sutra.manip.areaGrid({
        cols: state.cols, rows: state.rows, handleLabel: t('rect.handle'),
        describe: function (c, r) { return t('rect.describe', { a: c, b: r, n: M.area(c, r) }); },
        onChange: function (c, r) { state.cols = c; state.rows = r; colStep.set(c); rowStep.set(r); paint(); },
        onRelease: function () { checkStep3(); }
      });
      if (state.cut) grid.setCut(true);

      var colStep = u.stepper({ value: state.cols, min: 1, max: 30, label: t('rect.across'), onChange: function (v) { state.cols = v; grid.set(v, state.rows); paint(); checkStep3(); } });
      var rowStep = u.stepper({ value: state.rows, min: 1, max: 20, label: t('rect.down'), onChange: function (v) { state.rows = v; grid.set(state.cols, v); paint(); checkStep3(); } });

      function columnBlock() {
        var cm = M.columnMethod(state.cols, state.rows);
        var col = u.el('div', { class: 'column', 'aria-label': t('rect.columnLabel') });
        col.appendChild(u.el('div', { class: 'row on', html: '<span class="a-txt">' + state.cols + '</span>' }));
        col.appendChild(u.el('div', { class: 'row on', html: '× <span class="b-txt">' + state.rows + '</span>' }));
        col.appendChild(u.el('div', { class: 'rule' }));
        cm.lines.forEach(function (line, i) {
          col.appendChild(u.el('div', { class: 'row' + (state.folded > i ? ' on' : '') }, [String(line.value), u.el('span', { class: 'note', text: '(' + state.cols + ' × ' + line.by + ')' })]));
        });
        col.appendChild(u.el('div', { class: 'rule' }));
        col.appendChild(u.el('div', { class: 'row' + (state.folded > cm.lines.length ? ' on' : ''), html: '<span class="r-txt">' + cm.total + '</span>' }));
        return col;
      }

      function paint() {
        eq.innerHTML = eqHTML(state.cols, state.rows, M.area(state.cols, state.rows));
        u.clear(partsCard);
        partsCard.hidden = !state.cut;
        if (state.cut) {
          partsCard.appendChild(u.el('h3', { class: 'pane-title', text: t('rect.parts') }));
          var rooms = M.partialProducts(state.cols, state.rows);
          partsCard.appendChild(u.el('div', { class: 'parts' }, rooms.map(function (r) { return u.el('div', { text: r.w + ' × ' + r.h + ' = ' + r.product }); })));
          partsCard.appendChild(u.el('p', { class: 'small muted', style: { marginTop: '8px' }, text: rooms.map(function (r) { return r.product; }).join(' + ') + ' = ' + M.area(state.cols, state.rows) }));
          if (state.folded > 0) partsCard.appendChild(u.el('div', { class: 'column-wrap' }, [columnBlock(), u.el('p', { class: 'small muted', style: { flex: '1', minWidth: '140px' }, text: t('rect.foldNote') })]));
        }
        paintGuide();
      }

      function paintGuide() {
        u.clear(guide); u.clear(action);
        if (state.step === 1) {
          guide.appendChild(ui.stepGuide(1, t('rect.s1')));
          action.appendChild(ui.btn(t('rect.showMe'), function () {
            if (cancel) return;
            cancel = grid.demo(23, 14, function () { cancel = null; state.step = 2; paint(); ui.say(say, t('rect.s1done'), true); });
          }, 'thread block'));
        } else if (state.step === 2) {
          guide.appendChild(ui.stepGuide(2, t('rect.s2')));
          if (!state.cut) action.appendChild(ui.btn(t('rect.cut'), function () { state.cut = true; grid.setCut(true); paint(); ui.say(say, t('rect.cutSay'), true); }, 'thread block'));
          else if (state.folded === 0) action.appendChild(ui.btn(t('rect.fold'), fold, 'thread block'));
          else action.appendChild(ui.btn(t('rect.yourTurn'), function () { state.step = 3; grid.focusStrip(null); paint(); ui.say(say, '', false); }, 'primary block'));
        } else {
          guide.appendChild(ui.stepGuide(3, t('rect.s3')));
          if (state.step3done) action.appendChild(ui.btn(t('rect.next'), function () { Sutra.router.go('mistake'); }, 'primary block'));
        }
      }

      function fold() {
        var lines = M.columnMethod(state.cols, state.rows).lines;
        state.folded = 1;
        grid.focusStrip(lines[0].strip);
        paint();
        ui.say(say, t('rect.foldSay1', { a: state.cols, b: lines[0].by, n: lines[0].value }), true);
        var timers = [];
        if (lines[1]) {
          timers.push(setTimeout(function () { state.folded = 2; grid.focusStrip(lines[1].strip); paint(); ui.say(say, t('rect.foldSay2', { a: state.cols, b: lines[1].by, n: lines[1].value }), true); }, 3600));
        }
        timers.push(setTimeout(function () { state.folded = lines.length + 1; grid.focusStrip(null); paint(); ui.say(say, t('rect.foldSay3', { n: M.area(state.cols, state.rows) }), true); }, lines[1] ? 7200 : 3600));
        cleanTimers = function () { timers.forEach(clearTimeout); };
      }
      var cleanTimers = function () {};

      function checkStep3() {
        if (state.step !== 3 || state.step3done) return;
        if (state.cols === 17 && state.rows === 12) {
          state.step3done = true;
          if (!state.cut) { state.cut = true; grid.setCut(true); }
          paint();
          var rooms = M.partialProducts(17, 12).map(function (r) { return r.product; });
          ui.say(say, t('rect.s3done', { parts: rooms.join(' + '), n: 204 }), true);
        }
      }

      view.appendChild(guide);
      view.appendChild(u.el('div', { class: 'model' }, [grid.node]));
      view.appendChild(eq);
      view.appendChild(u.el('div', { class: 'control-row' }, [
        u.el('label', {}, [u.el('span', { class: 'a-txt', text: t('rect.across') })]), colStep.node
      ]));
      view.appendChild(u.el('div', { class: 'control-row' }, [
        u.el('label', {}, [u.el('span', { class: 'b-txt', text: t('rect.down') })]), rowStep.node
      ]));
      view.appendChild(say);
      view.appendChild(action);
      view.appendChild(partsCard);
      view.appendChild(u.el('button', { class: 'link-btn', text: t('common.clearGhosts'), onclick: function () { grid.clearGhosts(); } }));
      paint();

      return function () { if (cancel) cancel(); cleanTimers(); grid.destroy(); };
    }
  };

  /* ------------------------------------------------------------------ Fair Share Table (D1, D3) */
  Sutra.screens.share = {
    title: function (p) { return t(p.mode === 'leftover' ? 'share.titleLeft' : 'share.title'); },
    note: 'Division as fair sharing. Laddoos are dealt round and round, exactly as a child deals by hand. What cannot complete a round waits in the leftover tray; nothing is "thrown away". In the leftovers thread, cutting them gives each plate a fraction: the doorway to the fractions chapter. Three linked views: plates, a bar, and the written forms (division and the multiplication it undoes).',
    render: function (view, state, params) {
      var leftover = params.mode === 'leftover';
      ui.enterThread(leftover ? 'D3' : 'D1', 'share', { mode: params.mode || 'share' });
      if (!state.total) { state.total = leftover ? 14 : 12; state.plates = 4; }
      var spoken = false;

      var say = u.el('p', { class: 'say', hidden: true });
      var eqCard = u.el('section', { class: 'card' });
      var barWrap = u.el('div');
      var actions = u.el('div', { class: 'btn-row' });
      var ready = false, cutSpoken = false;

      var table = Sutra.manip.fairShare({
        total: state.total, plates: state.plates, trayLabel: t('share.tray'),
        onChange: function (c) { if (ready) paint(c); }
      });

      function bar(c) {
        var s = D.share(c.total, c.plates);
        var W = 320, unit = W / c.total;
        var svg = u.svg('svg', { viewBox: '0 0 ' + W + ' 54', role: 'img', 'aria-label': t('share.barLabel', { a: c.total, b: c.plates }) });
        for (var i = 0; i < c.plates; i++) {
          var x = i * s.each * unit;
          svg.appendChild(u.svg('rect', { x: x + 1, y: 6, width: Math.max(0, s.each * unit - 2), height: 28, rx: 5, fill: i % 2 ? 'var(--indigo-soft)' : 'var(--teal-soft)', stroke: 'var(--ink-soft)', 'stroke-width': 1 }));
          svg.appendChild(u.svg('text', { x: x + (s.each * unit) / 2, y: 21, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 13, 'font-weight': 600, fill: 'var(--ink)', 'font-family': 'var(--font)', text: String(s.each) }));
        }
        if (s.remainder) {
          var rx = c.plates * s.each * unit;
          svg.appendChild(u.svg('rect', { x: rx + 1, y: 6, width: s.remainder * unit - 2, height: 28, rx: 5, fill: 'none', stroke: 'var(--kumkum)', 'stroke-width': 1.5, 'stroke-dasharray': '4 3' }));
          svg.appendChild(u.svg('text', { x: rx + (s.remainder * unit) / 2, y: 21, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 13, 'font-weight': 600, fill: 'var(--kumkum)', 'font-family': 'var(--font)', text: String(s.remainder) }));
        }
        svg.appendChild(u.svg('text', { x: W / 2, y: 48, 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--ink-soft)', 'font-family': 'var(--font)', text: t('share.barCaption', { a: c.total }) }));
        return svg;
      }

      function paint(c) {
        var s = D.share(c.total, c.plates);
        u.clear(eqCard);
        eqCard.appendChild(u.el('h3', { class: 'pane-title', text: t('share.written') }));
        if (!c.done) {
          eqCard.appendChild(u.el('p', { text: t('share.dealt', { n: c.dealt, total: c.total }) }));
        } else {
          eqCard.appendChild(u.el('div', { class: 'eq', html: '<span class="a">' + c.total + '</span> ÷ <span class="b">' + c.plates + '</span> = <span class="r">' + s.each + '</span>' + (s.remainder ? ' <span class="small muted">r</span> <span style="color:var(--kumkum)">' + s.remainder + '</span>' : '') }));
          eqCard.appendChild(u.el('p', { class: 'muted', html: '<span class="b-txt">' + c.plates + '</span> × <span class="r-txt">' + s.each + '</span>' + (s.remainder ? ' + ' + s.remainder : '') + ' = <span class="a-txt">' + c.total + '</span>' }));
          if (c.cut) {
            var f = D.leftoverFraction(s.remainder, c.plates);
            var frac = f.num + '/' + f.den + (f.simpleDen !== f.den ? ' = ' + f.simpleNum + '/' + f.simpleDen : '');
            eqCard.appendChild(u.el('div', { class: 'eq', html: t('share.eachGets') + ' <span class="r">' + s.each + '</span> + <span class="t">' + frac + '</span>' }));
          }
        }
        u.clear(barWrap);
        if (c.done) barWrap.appendChild(ui.card(t('share.barTitle'), [bar(c)]));

        u.clear(actions);
        if (!c.done) {
          actions.appendChild(ui.btn(t('share.round'), table.dealRound, 'thread'));
          actions.appendChild(ui.btn(t('share.all'), table.dealAll, 'quiet'));
        } else if (s.remainder && !c.cut && leftover) {
          actions.appendChild(ui.btn(t('share.cut', { n: c.plates }), table.cutLeftovers, 'thread'));
        }
        if (c.dealt > 0) actions.appendChild(ui.btn(t('common.reset'), function () { spoken = false; table.reset(); ui.say(say, '', false); }, 'quiet'));

        if (c.done && !spoken) {
          spoken = true;
          ui.say(say, s.remainder ? t('share.left', { each: s.each, r: s.remainder }) : t('share.even', { each: s.each }), true);
        }
        if (!c.cut) cutSpoken = false;
        else if (!cutSpoken) {
          cutSpoken = true;
          var ff = D.leftoverFraction(s.remainder, c.plates);
          ui.say(say, t('share.cutSay', { n: c.plates, each: s.each, f: ff.simpleNum + '/' + ff.simpleDen }), true);
        }
        nextRow.hidden = !(c.done && (!leftover || !s.remainder || c.cut));
      }

      var totalStep = u.stepper({ value: state.total, min: 2, max: 30, label: t('share.laddoos'), onChange: function (v) { state.total = v; spoken = false; ui.say(say, '', false); table.setTotal(v); } });
      var plateStep = u.stepper({ value: state.plates, min: 2, max: 6, label: t('share.plates'), onChange: function (v) { state.plates = v; spoken = false; ui.say(say, '', false); table.setPlates(v); } });
      var nextRow = ui.next(t('common.explain'), 'explain');

      view.appendChild(ui.stepGuide(1, t(leftover ? 'share.l1' : 'share.s1', { a: state.total, b: state.plates })));
      view.appendChild(u.el('div', { class: 'model' }, [table.node]));
      view.appendChild(actions);
      view.appendChild(say);
      view.appendChild(ui.labelled(t('share.laddoos'), totalStep.node));
      view.appendChild(ui.labelled(t('share.plates'), plateStep.node));
      view.appendChild(eqCard);
      view.appendChild(barWrap);
      view.appendChild(nextRow);
      ready = true;
      paint(table.counts());
      return function () { table.destroy(); };
    }
  };

  /* ------------------------------------------------------------------ Rope and Pegs (G2) */
  Sutra.screens.rope = {
    title: 'rope.title',
    note: 'Perimeter versus area. The corner can only slide along the dashed diagonal, so the rope (perimeter) is always the same length. Each rectangle tried leaves a ghost, and the "area hill" fills in bar by bar until the child sees that the square holds the most. Rooted in the Sulba Sutras: geometry made with rope and pegs.',
    render: function (view, state) {
      ui.enterThread('G2', 'rope');
      if (!state.perimeter) { state.perimeter = 24; state.w = 1; }
      var say = u.el('p', { class: 'say', hidden: true });
      var read = u.el('div');
      var hill = u.el('div');
      var squareSaid = false;

      var rope = Sutra.manip.rope({
        perimeter: state.perimeter, width: state.w, handleLabel: t('rope.handle'),
        onChange: function (r, tried) { state.w = r.w; wStep.set(r.w); paint(r, tried); }
      });
      var wStep = u.stepper({ value: state.w, min: 1, max: state.perimeter / 2 - 1, label: t('rope.width'), onChange: function (v) { rope.set(v); } });

      function paint(r, tried) {
        u.clear(read);
        read.appendChild(u.el('div', { class: 'eq', style: { fontSize: '20px' }, html: '<span class="a">' + r.w + '</span> + <span class="b">' + r.h + '</span> + <span class="a">' + r.w + '</span> + <span class="b">' + r.h + '</span> = <span class="t">' + r.perimeter + ' m</span>' }));
        read.appendChild(u.el('p', { class: 'muted small', text: t('rope.perimNote') }));
        read.appendChild(u.el('div', { class: 'eq', html: t('rope.area') + ' = <span class="a">' + r.w + '</span> × <span class="b">' + r.h + '</span> = <span class="r">' + r.area + '</span> m²' }));
        u.clear(hill);
        hill.appendChild(ui.card(t('rope.hill'), [Sutra.manip.areaHill(state.perimeter, tried, r)]));
        if (r.w === r.h && !squareSaid) { squareSaid = true; ui.say(say, t('rope.square', { s: r.w, n: r.area }), true); }
        else if (r.w !== r.h) { squareSaid = false; }
      }

      view.appendChild(ui.stepGuide(1, t('rope.s1', { p: state.perimeter })));
      view.appendChild(u.el('div', { class: 'model' }, [rope.node]));
      view.appendChild(read);
      view.appendChild(ui.labelled(t('rope.width'), wStep.node));
      view.appendChild(ui.labelled(t('rope.length'), ui.chips([{ value: 24, label: '24 m' }, { value: 20, label: '20 m' }], state.perimeter, function (p) {
        state.perimeter = p;
        rope.setPerimeter(p);
        Sutra.router.rerender();
      }, t('rope.length'))));
      view.appendChild(say);
      view.appendChild(hill);
      view.appendChild(ui.next(t('common.explain'), 'explain'));
      paint(rope.get(), rope.tried());
      return function () { rope.destroy(); };
    }
  };

  /* ------------------------------------------------------------------ Kolam Mirror (G4) */
  Sutra.screens.kolam = {
    title: 'kolam.title',
    note: 'Symmetry as kolam: rice-white lines on dark ground, the way kolam is drawn at thresholds every morning. One stroke repeats through the chosen symmetry. Mirror mode shows mirror lines; turn mode has rotation only, so the child sees that the two are different. The first visit shows the demonstrating hand drawing one stroke. The challenge asks for quarter-turn symmetry without a mirror line.',
    render: function (view, state) {
      ui.enterThread('G4', 'kolam');
      if (!state.order) { state.order = 4; state.mode = 'mirror'; state.strokes = []; }
      var readout = u.el('p', { class: 'say' });

      var km = Sutra.manip.kolamMirror({
        order: state.order, mode: state.mode, strokes: state.strokes,
        describe: function (o, m, n) { return t('kolam.describe', { o: o, n: n }); },
        onChange: function () { paintRead(); }
      });

      function paintRead() {
        var deg = G.smallestTurn(state.order);
        var txt;
        if (state.order === 1) txt = state.mode === 'mirror' ? t('kolam.read1Mirror') : t('kolam.read1Turn');
        else txt = state.mode === 'mirror' ? t('kolam.readMirror', { n: state.order, deg: deg }) : t('kolam.readTurn', { deg: deg });
        readout.textContent = txt;
        if (state.mode === 'turn' && state.order === 4 && state.strokes.length > 0) readout.textContent += ' ' + t('kolam.challengeMet');
      }

      view.appendChild(ui.stepGuide(1, t('kolam.s1')));
      view.appendChild(u.el('div', { class: 'model', style: { margin: '4px 0 8px' } }, [km.node]));
      view.appendChild(readout);
      view.appendChild(ui.labelled(t('kolam.order'), ui.chips([1, 2, 4, 8].map(function (n) { return { value: n, label: String(n) }; }), state.order, function (o) { state.order = o; km.setOrder(o); paintRead(); }, t('kolam.order'))));
      view.appendChild(ui.chips([{ value: 'mirror', label: t('kolam.mirror') }, { value: 'turn', label: t('kolam.turn') }], state.mode, function (m) { state.mode = m; km.setMode(m); paintRead(); }, t('kolam.mode')));
      view.appendChild(u.el('div', { class: 'btn-row' }, [
        ui.btn(t('common.undo'), function () { km.undo(); }, 'quiet'),
        ui.btn(t('common.clear'), function () { km.clear(); }, 'quiet')
      ]));
      view.appendChild(ui.card(t('kolam.challengeTitle'), [u.el('p', { text: t('kolam.challenge') })]));
      view.appendChild(ui.next(t('common.explain'), 'explain'));
      paintRead();
      var demoTimer = 0;
      if (!state.demoed && state.strokes.length === 0) { state.demoed = true; demoTimer = setTimeout(km.demo, 500); }
      return function () { clearTimeout(demoTimer); km.destroy(); };
    }
  };

  /* ------------------------------------------------------------------ Two Drummers (M5) */
  Sutra.screens.drums = {
    title: 'drums.title',
    note: 'Common multiples as rhythm. Two tala cycles play along one beat line; every hit stays marked, and beats where both drummers hit are ringed. The child predicts first. Then the prompt invites 4 and 6, which meet at 12, not 24: the misconception this thread targets. Sound is the content here, so every hit is also shown visually.',
    render: function (view, state) {
      ui.enterThread('M5', 'drums');
      if (!state.a) { state.a = 3; state.b = 4; state.guess = 7; }
      var say = u.el('p', { class: 'say', hidden: true });
      var lists = u.el('section', { class: 'card' });
      var hitsA = [], hitsB = [], firstMeet = null;

      var drums = Sutra.manip.drums({
        a: state.a, b: state.b,
        describe: function (a, b) { return t('drums.describe', { a: a, b: b }); },
        onBeat: function (n, ha, hb) {
          if (ha) hitsA.push(n);
          if (hb) hitsB.push(n);
          if (ha && hb && firstMeet === null) firstMeet = n;
          paintLists();
        },
        onEnd: function () { playBtn.textContent = t('drums.play'); reveal(); }
      });

      function reveal() {
        var meet = M.lcm(state.a, state.b);
        ui.say(say, t('drums.meet', { n: meet, guess: state.guess }), true);
      }

      function paintLists() {
        u.clear(lists);
        lists.appendChild(u.el('h3', { class: 'pane-title', text: t('drums.lists') }));
        [[state.a, hitsA, 'a-txt'], [state.b, hitsB, 'b-txt']].forEach(function (row) {
          var p = u.el('p', {});
          p.appendChild(u.el('span', { class: row[2], text: row[0] + ': ' }));
          row[1].forEach(function (n, i) {
            if (i) p.appendChild(document.createTextNode(', '));
            p.appendChild(n === firstMeet || (firstMeet && n % M.lcm(state.a, state.b) === 0) ? u.el('strong', { style: { color: 'var(--ink)', background: 'var(--thread-soft)', padding: '0 4px', borderRadius: '6px' }, text: String(n) }) : document.createTextNode(String(n)));
          });
          if (!row[1].length) p.appendChild(u.el('span', { class: 'muted', text: '…' }));
          lists.appendChild(p);
        });
      }

      var question = u.el('h2', { class: 'screen-title', style: { fontSize: '20px' } });
      function restart() {
        hitsA = []; hitsB = []; firstMeet = null;
        question.textContent = t('drums.q', { a: state.a, b: state.b });
        ui.say(say, '', false);
        playBtn.textContent = t('drums.play');
        paintLists();
      }

      var playBtn = ui.btn(t('drums.play'), function () {
        if (drums.playing()) { drums.stop(); playBtn.textContent = t('drums.play'); return; }
        restart();
        drums.reset();
        playBtn.textContent = t('drums.stop');
        drums.play();
      }, 'thread');
      var guessStep = u.stepper({ value: state.guess, min: 1, max: 72, label: t('drums.guess'), onChange: function (v) { state.guess = v; } });
      var aStep = u.stepper({ value: state.a, min: 2, max: 9, label: t('drums.first'), onChange: function (v) { state.a = v; drums.setA(v); restart(); } });
      var bStep = u.stepper({ value: state.b, min: 2, max: 9, label: t('drums.second'), onChange: function (v) { state.b = v; drums.setB(v); restart(); } });

      view.appendChild(question);
      view.appendChild(ui.labelled(t('drums.guess'), guessStep.node));
      view.appendChild(u.el('div', { class: 'model' }, [drums.node]));
      view.appendChild(u.el('div', { class: 'btn-row' }, [playBtn]));
      view.appendChild(say);
      view.appendChild(lists);
      view.appendChild(u.el('div', { class: 'control-row' }, [u.el('label', {}, [u.el('span', { class: 'a-txt', text: t('drums.first') })]), aStep.node]));
      view.appendChild(u.el('div', { class: 'control-row' }, [u.el('label', {}, [u.el('span', { class: 'b-txt', text: t('drums.second') })]), bStep.node]));
      view.appendChild(u.el('p', { class: 'muted small', text: t('drums.try') }));
      view.appendChild(ui.next(t('common.explain'), 'explain'));
      restart();
      return function () { drums.destroy(); };
    }
  };

  /* ------------------------------------------------------------------ Sorting Courtyard (S2, S3) */
  Sutra.screens.sets = {
    title: function (p) { return t(p.mode === 'guess' ? 'sets.titleGuess' : 'sets.title'); },
    note: 'Sets as a courtyard. Blocks walk to the region their rules put them in; regions are counted and named with "and", "or" and "not". Pull the rings apart and blocks that belong to both have nowhere to stand (outlined in kumkum, the colour for attention, never for "wrong"). One ring inside the other shows a subset. The guess mode reverses the task: find the hidden rules.',
    render: function (view, state, params) {
      var guess = params.mode === 'guess';
      ui.enterThread(guess ? 'S3' : 'S2', 'sets', { mode: params.mode || 'sort' });
      if (!state.ruleA) {
        state.ruleA = guess ? 'green' : 'yellow';
        state.ruleB = guess ? 'big' : 'circle';
        state.layout = 'overlap';
        state.hi = null;
        state.ga = null; state.gb = null;
      }
      var say = u.el('p', { class: 'say', hidden: true });
      var countsCard = u.el('section', { class: 'card' });
      var hiNote = u.el('p', { class: 'muted' });
      var homelessNote = u.el('p', { class: 'pointer-note', hidden: true });
      var last = null;
      function rl(k) { return t('rule.' + k); }

      var yard = Sutra.manip.courtyard({
        ruleA: state.ruleA, ruleB: state.ruleB, hidden: guess, rings: Sutra.manip.courtyard.LAYOUTS[state.layout],
        ruleLabel: rl,
        describe: function (c) { return t('sets.describe', { both: c.both, a: c.a, b: c.b, none: c.none }); },
        onChipTap: function (idx) {
          if (guess) return;
          var key = idx === 0 ? 'ruleA' : 'ruleB';
          var other = idx === 0 ? state.ruleB : state.ruleA;
          var i = S.RULE_ORDER.indexOf(state[key]);
          do { i = (i + 1) % S.RULE_ORDER.length; } while (S.RULE_ORDER[i] === other);
          state[key] = S.RULE_ORDER[i];
          yard.setRules(state.ruleA, state.ruleB);
        },
        onChange: function (info) { last = info; paint(info); }
      });

      function paint(info) {
        var c = info.counts;
        var A = guess ? 'A' : rl(state.ruleA), B = guess ? 'B' : rl(state.ruleB);
        u.clear(countsCard);
        countsCard.appendChild(u.el('h3', { class: 'pane-title', text: t('sets.counts') }));
        countsCard.appendChild(u.el('div', { class: 'parts' }, [
          u.el('div', { html: t('sets.cBoth') + ': <b>' + c.both + '</b>' }),
          u.el('div', { html: '<span class="a-txt">' + t('sets.cA') + '</span>: <b>' + c.a + '</b>' }),
          u.el('div', { html: '<span class="b-txt">' + t('sets.cB') + '</span>: <b>' + c.b + '</b>' }),
          u.el('div', { html: t('sets.cNone') + ': <b>' + c.none + '</b>' })
        ]));
        homelessNote.hidden = !info.homeless;
        homelessNote.textContent = info.homeless ? t('sets.homeless', { n: info.homeless }) : '';
        if (state.hi === 'and') hiNote.textContent = t('sets.and', { a: A, b: B, n: c.both });
        else if (state.hi === 'or') hiNote.textContent = t('sets.or', { a: A, b: B, n: c.both + c.a + c.b });
        else if (state.hi === 'not') hiNote.textContent = t('sets.not', { a: A, b: B, n: c.none });
        else hiNote.textContent = t('sets.wordsHint');
      }

      view.appendChild(ui.stepGuide(1, t(guess ? 'sets.g1' : 'sets.s1')));
      view.appendChild(u.el('div', { class: 'model' }, [yard.node]));
      view.appendChild(homelessNote);

      if (guess) {
        var pick = function (which) {
          return ui.chips(S.RULE_ORDER.map(function (k) { return { value: k, label: rl(k) }; }), state[which], function (v) {
            state[which] = v;
            if (state.ga && state.gb) {
              var ok = yard.setGuess(state.ga, state.gb);
              var moved = S.items().filter(function (it) { return S.region(it, state.ga, state.gb) !== S.region(it, state.ruleA, state.ruleB); }).length;
              ui.say(say, ok ? t('sets.solved', { a: rl(state.ruleA), b: rl(state.ruleB) }) : t('sets.wouldMove', { n: moved }), true);
            }
          }, which);
        };
        view.appendChild(u.el('h3', { class: 'pane-title a-txt', text: t('sets.ringA') }));
        view.appendChild(pick('ga'));
        view.appendChild(u.el('h3', { class: 'pane-title b-txt', text: t('sets.ringB') }));
        view.appendChild(pick('gb'));
        view.appendChild(say);
      }

      view.appendChild(ui.chips([{ value: 'and', label: t('sets.wAnd') }, { value: 'or', label: t('sets.wOr') }, { value: 'not', label: t('sets.wNot') }], state.hi, function (h) {
        state.hi = state.hi === h ? null : h;
        yard.highlight(state.hi);
        paint(last);
        hiRow.setValue(state.hi);
      }, t('sets.words')));
      var hiRow = view.lastChild;
      view.appendChild(hiNote);
      if (!guess) {
        view.appendChild(ui.labelled(t('sets.arrange'), ui.chips([
          { value: 'overlap', label: t('sets.overlap') }, { value: 'apart', label: t('sets.apart') }, { value: 'inside', label: t('sets.inside') }
        ], state.layout, function (l) { state.layout = l; yard.arrange(l); }, t('sets.arrange'))));
      }
      view.appendChild(countsCard);
      view.appendChild(ui.next(t('common.explain'), 'explain'));
      if (state.hi) yard.highlight(state.hi);
      if (guess && state.ga && state.gb) yard.setGuess(state.ga, state.gb);
      if (last) paint(last);
      return function () { yard.destroy(); };
    }
  };

  /* ------------------------------------------------------------------ Marble Machine (L2) */
  Sutra.screens.logic = {
    title: 'logic.title',
    note: 'Logic as visible cause and effect. Open or shut the doors and drop a marble: it follows the route the gate allows and lands in YES or NO, where it stays. Every try writes one row of the truth table, and rows remain (visual residue). Mystery mode covers the machine: the child fills the table, then names the gate. This bridges to "and / or / not" in the Sorting Courtyard.',
    render: function (view, state) {
      ui.enterThread('L2', 'logic');
      if (!state.type) { state.type = 'and'; state.a = true; state.b = false; state.rows = {}; state.mystery = false; }
      var say = u.el('p', { class: 'say', hidden: true });
      var tableCard = u.el('section', { class: 'card' });
      var doorRow = u.el('div', { class: 'btn-row' });
      var gateRow = u.el('div');
      var gateNames = { and: t('gate.and'), or: t('gate.or'), not: t('gate.not') };
      var showType = function () { return state.mystery ? state.mysteryType : state.type; };

      var machine = Sutra.manip.marbles({
        type: showType(), a: state.a, b: state.b, yesLabel: t('logic.yes'), noLabel: t('logic.no'),
        describe: function (ty, a, b) { return t('logic.describe', { a: a ? t('logic.open') : t('logic.shut'), b: b ? t('logic.open') : t('logic.shut') }); }
      });
      machine.setHidden(state.mystery);

      function key(a, b) { return showType() === 'not' ? String(a) : a + ',' + b; }

      function paintDoors() {
        u.clear(doorRow);
        doorRow.appendChild(u.el('button', { class: 'btn', style: { borderColor: 'var(--indigo)' }, 'aria-pressed': String(state.a), text: 'A: ' + (state.a ? t('logic.open') : t('logic.shut')), onclick: function () { state.a = !state.a; machine.setInputs(state.a, state.b); paintDoors(); } }));
        if (showType() !== 'not') doorRow.appendChild(u.el('button', { class: 'btn', style: { borderColor: 'var(--teal)' }, 'aria-pressed': String(state.b), text: 'B: ' + (state.b ? t('logic.open') : t('logic.shut')), onclick: function () { state.b = !state.b; machine.setInputs(state.a, state.b); paintDoors(); } }));
      }

      function paintTable() {
        u.clear(tableCard);
        var type = showType();
        tableCard.appendChild(u.el('h3', { class: 'pane-title', text: t('logic.table') }));
        var head = u.el('tr', {}, [u.el('th', { class: 'a-txt', text: 'A' })].concat(type !== 'not' ? [u.el('th', { class: 'b-txt', text: 'B' })] : []).concat([u.el('th', { text: t('logic.marble') })]));
        var tbody = u.el('tbody');
        L.inputs(type).forEach(function (inp) {
          var a = inp[0], b = inp[1];
          var k = key(a, b);
          var tried = state.rows[k] !== undefined;
          var tr = u.el('tr', { class: (tried ? '' : 'empty') + (state.latest === k ? ' latest' : '') });
          tr.appendChild(u.el('td', { text: a ? t('logic.open') : t('logic.shut') }));
          if (type !== 'not') tr.appendChild(u.el('td', { text: b ? t('logic.open') : t('logic.shut') }));
          tr.appendChild(u.el('td', { class: tried ? (state.rows[k] ? 'yes' : 'no') : '', text: tried ? (state.rows[k] ? t('logic.yes') : t('logic.no')) : '?' }));
          tbody.appendChild(tr);
        });
        tableCard.appendChild(u.el('table', { class: 'truth' }, [u.el('thead', {}, [head]), tbody]));
        var complete = L.inputs(type).every(function (inp) { return state.rows[key(inp[0], inp[1])] !== undefined; });
        if (complete && !state.mystery) tableCard.appendChild(u.el('p', { class: 'say', text: t('logic.rule.' + type) }));
        if (complete && state.mystery && !state.solved) {
          tableCard.appendChild(u.el('p', { text: t('logic.whichGate') }));
          tableCard.appendChild(ui.chips(['and', 'or', 'not'].map(function (g) { return { value: g, label: gateNames[g] }; }), null, function (g) {
            if (g === state.mysteryType) {
              state.solved = true;
              machine.setHidden(false);
              ui.say(say, t('logic.solved', { g: gateNames[g] }), true);
              paintTable();
            } else {
              ui.say(say, t('logic.notThat', { g: gateNames[g] }), true);
            }
          }, t('logic.whichGate')));
        }
      }

      function paintGates() {
        u.clear(gateRow);
        gateRow.appendChild(ui.chips(['and', 'or', 'not'].map(function (g) { return { value: g, label: gateNames[g] }; }).concat([{ value: 'mystery', label: t('logic.mystery') }]), state.mystery ? 'mystery' : state.type, function (g) {
          state.rows = {}; state.latest = null; state.solved = false;
          if (g === 'mystery') {
            state.mystery = true;
            var opts = ['and', 'or', 'not'];
            state.mysteryType = opts[Math.floor(Math.random() * 3)];
          } else { state.mystery = false; state.type = g; }
          machine.setType(showType());
          machine.setHidden(state.mystery);
          ui.say(say, '', false);
          paintDoors(); paintTable();
        }, t('logic.gate')));
      }

      var dropBtn = ui.btn(t('logic.drop'), function () {
        if (machine.busy()) return;
        var a = state.a, b = state.b;
        machine.drop(function (yes) {
          var k = key(a, b);
          state.rows[k] = yes;
          state.latest = k;
          paintTable();
        });
      }, 'thread block');

      view.appendChild(ui.stepGuide(1, t('logic.s1')));
      view.appendChild(gateRow);
      view.appendChild(u.el('div', { class: 'model' }, [machine.node]));
      view.appendChild(doorRow);
      view.appendChild(u.el('div', { class: 'btn-row' }, [dropBtn]));
      view.appendChild(say);
      view.appendChild(tableCard);
      view.appendChild(ui.next(t('common.explain'), 'explain'));
      paintGates(); paintDoors(); paintTable();
      return function () { machine.destroy(); };
    }
  };
})();
