/*
 * Living Film: "Multiplication is area" (thread M2).
 * The scene is a pure function of time, so it scrubs both ways. It stops after each beat (segmenting);
 * while paused the child can grab the corner and change the floor (pause-to-grab), and earlier states stay as ghosts.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var t = Sutra.ui.t;
  var M = Sutra.model.multiply;

  var X0 = 72, Y0 = 58, CELL = 36, COLS = 6, ROWS = 4, MAXC = 7, MAXR = 5;
  var T_END = 36;
  var BEATS = [
    { s: 0, e: 6, k: 'film.m2.b1' },
    { s: 6, e: 13, k: 'film.m2.b2' },
    { s: 13, e: 21, k: 'film.m2.b3' },
    { s: 21, e: 28, k: 'film.m2.b4' },
    { s: 28, e: 36, k: 'film.m2.b5' }
  ];

  function beatAt(time) {
    for (var i = 0; i < BEATS.length; i++) if (time < BEATS[i].e) return i;
    return BEATS.length - 1;
  }

  function appearAt(c, r) {
    if (r === 0 && c === 0) return 1.6;
    if (r === 0) return 6.6 + (c - 1) * 0.95;
    return 14 + (r - 1) * 2.3 + c * 0.1;
  }

  function ramp(time, start, dur) { return u.clamp((time - start) / dur, 0, 1); }

  function beatText(i) {
    var guess = u.store.get('m2guess', null);
    if (i === 4) return guess === null ? t('film.m2.b5none') : t('film.m2.b5', { guess: guess });
    return t(BEATS[i].k);
  }

  Sutra.screens.film = {
    title: 'film.title',
    note: 'Step 2: a Living Film, not a video file. Narrated, five short beats; it stops after each beat until the child taps play (segmenting). The scrubber runs both ways. Pause, then drag the turmeric corner: the film becomes a model you can hold, and the scripted floor stays as a ghost. Colour carries meaning: indigo is always the first factor, teal the second.',
    render: function (view, state) {
      Sutra.ui.enterThread('M2', 'film');
      if (state.t === undefined) state.t = 0;
      state.playing = false;
      var raf = 0, lastTs = null;

      var stage = u.el('div', { class: 'film-stage' });
      var svg = u.svg('svg', { viewBox: '0 0 360 300', role: 'img' });
      stage.appendChild(svg);
      var hint = u.el('div', { class: 'film-hint' });
      stage.appendChild(hint);

      var ghostLayer = u.svg('g');
      var tileLayer = u.svg('g');
      var outline = u.svg('rect', { x: X0, y: Y0, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3, rx: 3 });
      var rowGhost = u.svg('rect', { x: X0, y: Y0, height: CELL, fill: 'none', stroke: 'var(--thread)', 'stroke-width': 2, 'stroke-dasharray': '5 4' });
      var hiRect = u.svg('rect', { fill: 'none', stroke: 'var(--thread)', 'stroke-width': 3.5, rx: 4 });
      var labelLayer = u.svg('g');
      var braceTop = u.svg('path', { fill: 'none', stroke: 'var(--indigo)', 'stroke-width': 2.5, 'stroke-linecap': 'round' });
      var braceLeft = u.svg('path', { fill: 'none', stroke: 'var(--teal)', 'stroke-width': 2.5, 'stroke-linecap': 'round' });
      var topNum = u.svg('text', { 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 600, fill: 'var(--indigo)', 'font-family': 'var(--font)' });
      var leftNum = u.svg('text', { 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 20, 'font-weight': 600, fill: 'var(--teal)', 'font-family': 'var(--font)' });
      var eq = u.svg('text', { x: 180, y: 278, 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 600, 'font-family': 'var(--font)' });
      var eqA = u.svg('tspan', { fill: 'var(--indigo)' }), eqX = u.svg('tspan', { fill: 'var(--ink)', text: ' × ' }), eqB = u.svg('tspan', { fill: 'var(--teal)' }), eqR = u.svg('tspan', { fill: 'var(--leaf)' });
      [eqA, eqX, eqB, eqR].forEach(function (n) { eq.appendChild(n); });
      var handle = u.svg('g', { class: 'handle', tabindex: '0', role: 'slider', 'aria-label': t('film.handle') }, [u.svg('circle', { class: 'hit', r: 28 }), u.svg('circle', { class: 'ring', r: 13 })]);
      [ghostLayer, tileLayer, rowGhost, outline, hiRect, labelLayer, braceTop, braceLeft, topNum, leftNum, eq, handle].forEach(function (n) { svg.appendChild(n); });

      var tiles = [];
      for (var r = 0; r < MAXR; r++) {
        for (var c = 0; c < MAXC; c++) {
          var tile = u.svg('rect', { x: X0 + c * CELL + 2, y: Y0 + r * CELL + 2, width: CELL - 4, height: CELL - 4, rx: 4, fill: 'var(--paper-sunk)', stroke: 'var(--ghost)', 'stroke-width': 1 });
          tileLayer.appendChild(tile);
          tiles.push({ node: tile, c: c, r: r });
        }
      }

      function label(x, y, s, colour, size) {
        return u.svg('text', { x: x, y: y, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': size || 14, 'font-weight': 600, fill: colour || 'var(--ink)', 'font-family': 'var(--font)', text: s });
      }

      function render() {
        var time = state.t;
        var held = state.held;
        var cols = held ? held.cols : COLS, rows = held ? held.rows : ROWS;
        var dim = held ? 1 : 1 - 0.6 * ramp(time, 21, 0.6) + 0.25 * ramp(time, 28, 0.8);

        tiles.forEach(function (tl) {
          var vis = 0;
          if (tl.c < cols && tl.r < rows) vis = held ? 1 : (tl.c < COLS && tl.r < ROWS ? ramp(time, appearAt(tl.c, tl.r), 0.35) : 0);
          tl.node.setAttribute('opacity', (vis * dim).toFixed(3));
          tl.node.setAttribute('fill', vis > 0 ? 'var(--paper-raised)' : 'var(--paper-sunk)');
          tl.node.setAttribute('stroke', vis > 0 ? 'var(--ink-soft)' : 'var(--ghost)');
        });

        var drawP = held ? 1 : ramp(time, 0.1, 1.4);
        var per = 2 * (cols + rows) * CELL;
        outline.setAttribute('width', cols * CELL);
        outline.setAttribute('height', rows * CELL);
        outline.style.strokeDasharray = per;
        outline.style.strokeDashoffset = (per * (1 - drawP)).toFixed(1);

        rowGhost.setAttribute('width', COLS * CELL);
        rowGhost.setAttribute('opacity', !held && time >= 13 && time < 28 ? 0.9 : 0);

        u.clear(ghostLayer);
        var ghosts = [];
        if (held) ghosts.push({ c: COLS, r: ROWS });
        if (state.yourGhost && !held) ghosts.push({ c: state.yourGhost.cols, r: state.yourGhost.rows });
        ghosts.forEach(function (g) {
          ghostLayer.appendChild(u.svg('rect', { x: X0, y: Y0, width: g.c * CELL, height: g.r * CELL, fill: 'none', stroke: 'var(--ghost)', 'stroke-width': 2, 'stroke-dasharray': '6 5' }));
        });

        if (!held && time < 6 && time >= 1.6) {
          hiRect.setAttribute('x', X0); hiRect.setAttribute('y', Y0); hiRect.setAttribute('width', CELL); hiRect.setAttribute('height', CELL); hiRect.setAttribute('opacity', 1);
        } else if (!held && time >= 6 && time < 13) {
          hiRect.setAttribute('x', X0); hiRect.setAttribute('y', Y0); hiRect.setAttribute('width', CELL * COLS); hiRect.setAttribute('height', CELL); hiRect.setAttribute('opacity', 1);
        } else hiRect.setAttribute('opacity', 0);

        u.clear(labelLayer);
        if (!held && time >= 1.6 && time < 6) labelLayer.appendChild(label(X0 + CELL / 2, Y0 + CELL / 2, '1', 'var(--ink)', 16));
        if (!held && time >= 6 && time < 13) {
          for (var c2 = 0; c2 < COLS; c2++) if (time >= appearAt(c2, 0)) labelLayer.appendChild(label(X0 + c2 * CELL + CELL / 2, Y0 - 14, String(c2 + 1), 'var(--ink-soft)'));
        }
        if (!held && time >= 13 && time < 21) {
          for (var r2 = 0; r2 < ROWS; r2++) {
            var shown = time >= appearAt(COLS - 1, r2) + 0.2 || (r2 === 0 && time >= 13.2);
            if (shown) labelLayer.appendChild(label(X0 + COLS * CELL + 24, Y0 + r2 * CELL + CELL / 2, String((r2 + 1) * COLS), 'var(--ink)', 16));
          }
        }

        var braceP = held ? 1 : ramp(time, 21.2, 1.2);
        var braceP2 = held ? 1 : ramp(time, 22, 1.2);
        var w = cols * CELL, h = rows * CELL;
        braceTop.setAttribute('d', 'M' + X0 + ' ' + (Y0 - 10) + ' V' + (Y0 - 16) + ' H' + (X0 + w * braceP) + (braceP === 1 ? ' V' + (Y0 - 10) : ''));
        braceTop.setAttribute('opacity', braceP > 0 ? 1 : 0);
        topNum.setAttribute('x', X0 + w / 2); topNum.setAttribute('y', Y0 - 24); topNum.textContent = String(cols);
        topNum.setAttribute('opacity', braceP);
        braceLeft.setAttribute('d', 'M' + (X0 - 10) + ' ' + Y0 + ' H' + (X0 - 16) + ' V' + (Y0 + h * braceP2) + (braceP2 === 1 ? ' H' + (X0 - 10) : ''));
        braceLeft.setAttribute('opacity', braceP2 > 0 ? 1 : 0);
        leftNum.setAttribute('x', X0 - 32); leftNum.setAttribute('y', Y0 + h / 2); leftNum.textContent = String(rows);
        leftNum.setAttribute('opacity', braceP2);

        var eqP = held ? 1 : ramp(time, 28.6, 1.2);
        eqA.textContent = String(cols); eqB.textContent = String(rows); eqR.textContent = ' = ' + M.area(cols, rows);
        eq.setAttribute('opacity', eqP);
        eq.setAttribute('transform', 'translate(0,' + (8 * (1 - eqP)).toFixed(1) + ')');

        var canHold = !state.playing && time >= 13;
        handle.style.display = canHold ? '' : 'none';
        handle.setAttribute('transform', 'translate(' + (X0 + w) + ',' + (Y0 + h) + ')');
        hint.textContent = !canHold ? '' : held ? t('film.heldHint', { n: M.area(cols, rows) }) : t('film.holdHint');
        svg.setAttribute('aria-label', t('film.sceneLabel', { a: cols, b: rows, n: M.area(cols, rows) }));

        range.value = Math.round(time * 10);
        var bi = beatAt(time);
        var atBreak = !state.playing && bi > 0 && time === BEATS[bi - 1].e && time < T_END;
        var shownBeat = atBreak ? bi - 1 : bi;
        dots.querySelectorAll('span').forEach(function (d, i) { d.className = i <= shownBeat && time > BEATS[i].s ? 'on' : ''; });
        lineNo.textContent = t('film.beatOf', { n: shownBeat + 1, total: BEATS.length }) + (atBreak ? ' · ' + t('film.tapContinue') : '');
        lineText.textContent = beatText(shownBeat);
        playBtn.innerHTML = state.playing ? '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></svg>';
        playBtn.setAttribute('aria-label', state.playing ? t('film.pause') : time >= T_END ? t('film.replay') : t('film.play'));
        endRow.hidden = time < T_END;
      }

      function frame(ts) {
        if (!state.playing) return;
        if (lastTs === null) lastTs = ts;
        var dt = Math.min(0.1, (ts - lastTs) / 1000);
        lastTs = ts;
        var bi = beatAt(state.t);
        var end = BEATS[bi].e;
        state.t = Math.min(end, state.t + dt);
        if (state.t >= end) { state.playing = false; }
        render();
        if (state.playing) raf = requestAnimationFrame(frame);
      }

      function play() {
        if (state.t >= T_END) { state.t = 0; state.yourGhost = null; }
        if (state.held) { state.yourGhost = state.held; state.held = null; }
        var bi = beatAt(state.t);
        Sutra.voice.say(beatText(bi), { noCaption: true });
        if (u.reducedMotion()) {
          state.t = BEATS[bi].e;
          render();
          return;
        }
        state.playing = true;
        lastTs = null;
        render();
        raf = requestAnimationFrame(frame);
      }

      function pause() {
        state.playing = false;
        cancelAnimationFrame(raf);
        Sutra.voice.stopSpeech();
        render();
      }

      var playBtn = u.el('button', { class: 'play-btn', type: 'button', onclick: function () { if (state.playing) pause(); else play(); } });
      var range = u.el('input', {
        type: 'range', min: 0, max: T_END * 10, step: 1, 'aria-label': t('film.scrub'),
        oninput: function (e) { if (state.playing) pause(); state.held = null; state.t = Number(e.target.value) / 10; render(); }
      });
      var dots = u.el('div', { class: 'beat-dots', 'aria-hidden': 'true' }, BEATS.map(function () { return u.el('span'); }));
      var lineNo = u.el('span', { class: 'beat-no' });
      var lineText = u.el('span');
      var endRow = u.el('div', { class: 'btn-row' }, [
        Sutra.ui.btn(t('film.build'), function () { Sutra.router.go('rect'); }, 'primary block')
      ]);

      var offDrag = u.drag(handle, {
        start: function () { handle.classList.add('held'); if (!state.held) state.held = { cols: COLS, rows: ROWS }; },
        move: function (e) {
          var p = u.svgPoint(svg, e);
          var nc = u.clamp(Math.round((p.x - X0) / CELL), 1, MAXC), nr = u.clamp(Math.round((p.y - Y0) / CELL), 1, MAXR);
          if (nc !== state.held.cols || nr !== state.held.rows) { state.held = { cols: nc, rows: nr }; Sutra.voice.tone('tick'); render(); }
        },
        end: function () { handle.classList.remove('held'); }
      });
      var ARROWS = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] };
      handle.addEventListener('keydown', function (e) {
        var d = ARROWS[e.key];
        if (!d || state.playing) return;
        e.preventDefault();
        var cur = state.held || { cols: COLS, rows: ROWS };
        state.held = { cols: u.clamp(cur.cols + d[0], 1, MAXC), rows: u.clamp(cur.rows + d[1], 1, MAXR) };
        Sutra.voice.tone('tick');
        render();
      });

      view.appendChild(stage);
      view.appendChild(u.el('div', { class: 'film-bar' }, [playBtn, u.el('div', { class: 'scrub' }, [range, dots])]));
      view.appendChild(u.el('p', { class: 'film-line', 'aria-live': 'polite' }, [lineNo, lineText]));
      view.appendChild(endRow);
      view.appendChild(u.el('div', { class: 'btn-row' }, [
        Sutra.ui.btn(t('film.skip'), function () { Sutra.router.go('rect'); }, 'quiet')
      ]));
      render();

      return function () { state.playing = false; cancelAnimationFrame(raf); offDrag(); };
    }
  };
})();
