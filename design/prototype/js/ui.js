/* Small screen-building helpers shared by all screens. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var t = function (k, v) { return Sutra.i18n.t(k, v); };

  Sutra.ui = {
    title: function (text) { return u.el('h2', { class: 'screen-title', text: text }); },

    stepGuide: function (num, text) {
      return u.el('div', { class: 'step-guide' }, [u.el('span', { class: 'num', text: String(num) }), u.el('p', { text: text })]);
    },

    /* A line the narrator describes (never praise). Spoken when speak is true. */
    say: function (node, text, speak) {
      node.textContent = text;
      node.hidden = !text;
      if (speak && text) Sutra.voice.say(text, { noCaption: true });
    },

    card: function (title, children) {
      return u.el('section', { class: 'card' }, [title ? u.el('h3', { class: 'pane-title', text: title }) : null].concat(children || []));
    },

    btn: function (label, onclick, cls) {
      return u.el('button', { class: 'btn ' + (cls || ''), type: 'button', text: label, onclick: onclick });
    },

    chips: function (options, current, onPick, label) {
      var row = u.el('div', { class: 'seg', role: 'group', 'aria-label': label || '' });
      function paint(value) {
        row.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.value === String(value))); });
      }
      options.forEach(function (o) {
        row.appendChild(u.el('button', {
          class: 'chip', type: 'button', 'data-value': String(o.value), text: o.label,
          onclick: function () { paint(o.value); onPick(o.value); }
        }));
      });
      paint(current);
      row.setValue = paint;
      return row;
    },

    labelled: function (label, control) {
      return u.el('div', { class: 'control-row' }, [u.el('label', { text: label }), control]);
    },

    /* Marks the current thread so Explain, Stop and the Loom's Continue card know where the child is. */
    enterThread: function (knotId, route, params) {
      Sutra.state.thread = knotId;
      u.store.set('continue', { knot: knotId, route: route, params: params || null });
    },

    next: function (label, route, params) {
      return u.el('div', { class: 'btn-row' }, [Sutra.ui.btn(label, function () { Sutra.router.go(route, params); }, 'primary block')]);
    },

    /* The three movements of a lesson. On a workbench it also offers "What am I learning?", which reopens Bodha. */
    stageBar: function (stage, step, isBench) {
      var stages = ['shravana', 'manana', 'nididhyasana'];
      var at = stages.indexOf(stage);
      var bar = u.el('nav', { class: 'stage-bar', 'aria-label': t('stage.label') }, [
        u.el('ol', {}, stages.map(function (s, i) {
          return u.el('li', { class: i < at ? 'past' : i === at ? 'now' : '', 'aria-current': i === at ? 'step' : null }, [
            u.el('span', { class: 'bead', 'aria-hidden': 'true' }), u.el('span', { text: t('stage.' + s) })
          ]);
        }))
      ]);
      var row = u.el('div', { class: 'stage-step' }, [u.el('span', { text: t('step.' + step) })]);
      var knot = Sutra.state.thread;
      if (isBench && knot) {
        row.appendChild(u.el('button', {
          class: 'learn-link', type: 'button', text: t('stage.whatLearning'),
          onclick: function () { Sutra.router.go('bodha', { k: knot }); }
        }));
      }
      bar.appendChild(row);
      return bar;
    },

    /* Goes to the first step of a knot, or explains that it is not in the prototype yet. */
    openKnot: function (knot) {
      var C = Sutra.model.curriculum;
      if (!C.playable(knot)) { u.toast(t('home.notInProto')); return; }
      var step = C.firstStep(knot);
      Sutra.router.go(step.route, step.params);
    },

    t: t
  };
})();
