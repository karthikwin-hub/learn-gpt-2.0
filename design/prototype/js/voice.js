/*
 * Narration and functional sound.
 * The device's speech voice stands in for the human narration the product will record,
 * so captions are on by default here; device voices for Telugu, Bengali and Tamil vary widely.
 */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var store = Sutra.util.store;

  var SPEECH_LANG = { en: 'en-IN', hi: 'hi-IN', te: 'te-IN', bn: 'bn-IN', ta: 'ta-IN' };
  var audioCtx = null;
  var captionTimer = 0;

  var voice = {
    enabled: store.get('sound', true),
    captions: store.get('captions', true),

    setEnabled: function (on) {
      voice.enabled = on;
      store.set('sound', on);
      if (!on) voice.stopSpeech();
    },

    setCaptions: function (on) {
      voice.captions = on;
      store.set('captions', on);
      if (!on) voice.hideCaption();
    },

    say: function (text, opts) {
      opts = opts || {};
      voice.stopSpeech();
      if (!opts.noCaption && (voice.captions || !voice.enabled)) voice.showCaption(text, opts.captionMs);
      if (!voice.enabled || !('speechSynthesis' in window)) return;
      var u = new SpeechSynthesisUtterance(text);
      var lang = SPEECH_LANG[Sutra.i18n.lang] || 'en-IN';
      u.lang = lang;
      var match = window.speechSynthesis.getVoices().filter(function (v) { return v.lang && v.lang.replace('_', '-').indexOf(lang.slice(0, 2)) === 0; });
      if (match.length) u.voice = match.filter(function (v) { return v.lang.replace('_', '-') === lang; })[0] || match[0];
      u.rate = store.get('voiceRate', 0.92);
      if (opts.onend) u.onend = opts.onend;
      window.speechSynthesis.speak(u);
    },

    stopSpeech: function () {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    },

    showCaption: function (text, ms) {
      var node = document.getElementById('caption');
      node.textContent = text;
      node.hidden = false;
      clearTimeout(captionTimer);
      captionTimer = setTimeout(voice.hideCaption, ms || Math.max(3500, text.length * 75));
    },

    hideCaption: function () {
      clearTimeout(captionTimer);
      var node = document.getElementById('caption');
      if (node) node.hidden = true;
    },

    stop: function () {
      voice.stopSpeech();
      voice.hideCaption();
    },

    /* Short synthesized tone. kind: 'tick' (snap), 'low' / 'high' (drums), 'tock' (marble lands). */
    tone: function (kind) {
      if (!voice.enabled) return;
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var spec = {
        tick: { f: 1200, d: 0.03, g: 0.04, type: 'sine' },
        low: { f: 110, d: 0.22, g: 0.35, type: 'sine', drop: 55 },
        high: { f: 330, d: 0.16, g: 0.22, type: 'triangle', drop: 220 },
        tock: { f: 520, d: 0.08, g: 0.12, type: 'sine', drop: 300 }
      }[kind];
      var t = audioCtx.currentTime;
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = spec.type;
      osc.frequency.setValueAtTime(spec.f, t);
      if (spec.drop) osc.frequency.exponentialRampToValueAtTime(spec.drop, t + spec.d);
      gain.gain.setValueAtTime(spec.g, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + spec.d);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + spec.d + 0.02);
    }
  };

  if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
  Sutra.voice = voice;
})();
