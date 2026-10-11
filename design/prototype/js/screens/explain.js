/* Explain it back: the child builds one sentence from word tiles, then keeps it as a notebook page. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;

  /* Each blank offers three tiles; `expect` is the tile that matches the model. Tile order is fixed per blank. */
  var TEMPLATES = {
    M4: [{ tiles: ['rows', 'tens', 'halves'], expect: 'tens' }, { tiles: ['room', 'digit', 'row'], expect: 'room' }, { tiles: ['multiply', 'subtract', 'add'], expect: 'add' }],
    D1: [{ tiles: ['more', 'same', 'any'], expect: 'same' }, { tiles: ['multiply', 'add', 'divide'], expect: 'multiply' }],
    D3: [{ tiles: ['hide', 'cut', 'keep'], expect: 'cut' }, { tiles: ['whole', 'plate', 'fraction'], expect: 'fraction' }],
    G2: [{ tiles: ['thin', 'square', 'long'], expect: 'square' }, { tiles: ['rope', 'area', 'perimeter'], expect: 'area' }],
    G4: [{ tiles: ['folds', 'grows', 'hides'], expect: 'folds' }, { tiles: ['only', 'without', 'never'], expect: 'without' }],
    M5: [{ tiles: ['one', 'neither', 'both'], expect: 'both' }, { tiles: ['smallest', 'biggest', 'last'], expect: 'smallest' }],
    S2: [{ tiles: ['or', 'and', 'butnot'], expect: 'and' }, { tiles: ['also', 'always', 'not'], expect: 'not' }],
    L2: [{ tiles: ['no', 'both', 'one'], expect: 'both' }, { tiles: ['every', 'no', 'least'], expect: 'least' }]
  };
  var ALIAS = { S3: 'S2' };

  var STATE_KEY = { M4: 'rect', D1: 'share:share', D3: 'share:leftover', G2: 'rope', G4: 'kolam', M5: 'drums', S2: 'sets:sort', S3: 'sets:guess', L2: 'logic' };

  function templateId(thread) { return ALIAS[thread] || (TEMPLATES[thread] ? thread : 'M4'); }

  /* Sentence parts: plain text and blanks, from a template like "I cut it into {0} and ones…". */
  function parts(thread) {
    var src = t('explain.' + templateId(thread) + '.s');
    return src.split(/(\{\d\})/).filter(Boolean).map(function (p) {
      var m = /^\{(\d)\}$/.exec(p);
      return m ? { blank: Number(m[1]) } : { text: p };
    });
  }

  function tileLabel(thread, tile) { return t('explain.' + templateId(thread) + '.' + tile); }

  /* Renders the sentence in the current language, so the notebook re-reads it after a language switch. */
  function sentence(thread, fills, opts) {
    opts = opts || {};
    var p = u.el(opts.tag || 'p', { class: 'sentence' });
    parts(thread).forEach(function (part) {
      if (part.text !== undefined) { p.appendChild(document.createTextNode(part.text)); return; }
      var f = fills[part.blank];
      if (opts.interactive) {
        p.appendChild(u.el('button', {
          type: 'button',
          class: 'blank' + (f ? ' filled' : '') + (opts.active === part.blank ? ' active' : ''),
          'aria-label': f ? tileLabel(thread, f) : t('explain.blankLabel', { n: part.blank + 1 }),
          text: f ? tileLabel(thread, f) : '…',
          onclick: function () { opts.onBlank(part.blank); }
        }));
      } else {
        p.appendChild(u.el('span', { class: 'blank filled', text: f ? tileLabel(thread, f) : '…' }));
      }
    });
    return p;
  }

  function sentenceText(thread, fills) { return sentence(thread, fills).textContent; }

  function snapshot(thread) {
    var s = Sutra.state[STATE_KEY[thread]] || {};
    var copy = JSON.parse(JSON.stringify(s));
    if (copy.strokes) copy.strokes = copy.strokes.slice(0, 6);
    return copy;
  }

  Sutra.voiceNotes = Sutra.voiceNotes || {};

  Sutra.screens.explain = {
    stage: 'nididhyasana', step: 'explain',
    title: 'explain.title',
    note: 'Explain it back. Self-explanation is one of the strongest learning effects for this age, but typing is slow and spelling gets in the way, so the child assembles one sentence from word tiles. If it does not match the model, a gentle hint points back to the model, and the child can still keep their own sentence: it is theirs. An optional voice note stays in memory only and is never saved or sent.',
    sentence: sentence,
    sentenceText: sentenceText,
    stateKey: STATE_KEY,
    render: function (view, state) {
      var thread = Sutra.state.thread || 'M4';
      if (state.thread !== thread) { state.thread = thread; state.fills = []; state.active = 0; state.hinted = false; }
      var tpl = TEMPLATES[templateId(thread)];
      var holder = u.el('div');
      var tiles = u.el('div', { class: 'tiles' });
      var hint = u.el('p', { class: 'pointer-note', hidden: true });
      var actions = u.el('div', { class: 'btn-row' });
      var record = u.el('div');
      var recorder = null, chunks = [];

      function complete() { return tpl.every(function (_, i) { return !!state.fills[i]; }); }
      function matches() { return tpl.every(function (b, i) { return state.fills[i] === b.expect; }); }

      function paint() {
        u.clear(holder);
        holder.appendChild(sentence(thread, state.fills, {
          interactive: true, active: state.active,
          onBlank: function (i) { state.active = i; state.hinted = false; hint.hidden = true; paint(); }
        }));
        u.clear(tiles);
        var b = tpl[state.active];
        if (b) {
          b.tiles.forEach(function (tile) {
            tiles.appendChild(u.el('button', {
              type: 'button', class: 'chip', 'aria-pressed': String(state.fills[state.active] === tile), text: tileLabel(thread, tile),
              onclick: function () {
                state.fills[state.active] = tile;
                state.hinted = false; hint.hidden = true;
                var next = tpl.findIndex(function (_, i) { return !state.fills[i]; });
                state.active = next >= 0 ? next : state.active;
                paint();
              }
            }));
          });
        }
        u.clear(actions);
        if (complete()) {
          actions.appendChild(ui.btn(t('explain.hear'), function () { Sutra.voice.say(sentenceText(thread, state.fills)); }, 'quiet'));
          actions.appendChild(ui.btn(state.hinted ? t('explain.keepAnyway') : t('explain.keep'), keep, 'primary'));
        }
      }

      function keep() {
        if (!matches() && !state.hinted) {
          state.hinted = true;
          hint.textContent = t('explain.' + templateId(thread) + '.hint') + ' ' + t('explain.hintTail');
          hint.hidden = false;
          Sutra.voice.say(hint.textContent, { noCaption: true });
          paint();
          return;
        }
        var knot = Sutra.model.curriculum.findKnot(thread);
        var page = {
          id: Date.now(),
          thread: thread,
          route: knot && knot.bench ? knot.bench.route : 'rect',
          params: knot && knot.bench ? knot.bench.params || null : null,
          fills: state.fills.slice(),
          model: snapshot(thread),
          date: new Date().toISOString()
        };
        var pages = u.store.get('pages', []);
        pages.push(page);
        u.store.set('pages', pages);
        var done = u.store.get('done', []);
        if (done.indexOf(thread) < 0) { done.push(thread); u.store.set('done', done); }
        if (state.audio) Sutra.voiceNotes[page.id] = state.audio;
        state.thread = null; state.fills = []; state.audio = null;
        Sutra.router.go('stop', { page: page.id });
      }

      function paintRecord() {
        u.clear(record);
        var canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
        if (!canRecord) return;
        if (recorder) {
          record.appendChild(ui.btn(t('explain.stopRec'), function () { recorder.stop(); }, 'thread'));
          return;
        }
        record.appendChild(ui.btn(state.audio ? t('explain.recAgain') : t('explain.record'), startRec, 'quiet'));
        if (state.audio) record.appendChild(u.el('audio', { controls: true, src: state.audio, style: { width: '100%', marginTop: '8px' } }));
        record.appendChild(u.el('p', { class: 'muted small', text: t('explain.recNote') }));
      }

      function startRec() {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
          chunks = [];
          recorder = new MediaRecorder(stream);
          recorder.ondataavailable = function (e) { chunks.push(e.data); };
          recorder.onstop = function () {
            stream.getTracks().forEach(function (tr) { tr.stop(); });
            state.audio = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' }));
            recorder = null;
            paintRecord();
          };
          recorder.start();
          setTimeout(function () { if (recorder && recorder.state === 'recording') recorder.stop(); }, 20000);
          paintRecord();
        }).catch(function () { u.toast(t('explain.noMic')); });
      }

      view.appendChild(ui.stepGuide(1, t('explain.intro')));
      view.appendChild(u.el('p', { class: 'muted small', text: t('knot.' + thread + '.t') }));
      view.appendChild(holder);
      view.appendChild(tiles);
      view.appendChild(hint);
      view.appendChild(actions);
      view.appendChild(record);
      paint();
      paintRecord();
      return function () { if (recorder && recorder.state === 'recording') recorder.stop(); };
    }
  };
})();
