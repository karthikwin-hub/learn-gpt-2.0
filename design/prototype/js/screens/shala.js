/* A Shala: one subject's threads (sutras) and their knots. Nothing is locked; a turmeric dot only suggests where to start. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;
  var C = Sutra.model.curriculum;

  var WAVE = 'M24 0 C 36 14, 12 30, 24 46 S 36 80, 24 100';

  Sutra.screens.shala = {
    title: function (params) { return t('section.' + (C.findSection(params.s) ? params.s : 'ganita')); },
    note: 'A Shala (hall): one subject. Each thread is a sutra, a strand of the subject, with its concept knots. Nothing is locked; a turmeric dot only suggests where to start. Finished knots show a tiny picture of the model the child built, not a star. Dashed knots are in the full curriculum (docs/product/CURRICULUM_PHASE2.md) but not in this prototype. A small "also in" tag marks knots that cross into another subject (see Jaal).',
    render: function (view, state, params) {
      var section = C.findSection(params.s) || C.findSection('ganita');
      var done = u.store.get('done', []);
      var pages = u.store.get('pages', []);

      view.appendChild(u.el('p', { class: 'shala-sub', text: t('section.' + section.id + '.sub') }));
      view.appendChild(u.el('p', { class: 'loom-intro', text: t('section.' + section.id + '.intro') }));

      section.threads.forEach(function (th) {
        var block = u.el('section', { class: 'domain', 'aria-label': t('thread.' + th.id) });
        block.appendChild(u.svg('svg', { class: 'domain-thread', viewBox: '0 0 48 100', preserveAspectRatio: 'none', 'aria-hidden': 'true' }, [
          u.svg('path', { d: WAVE, 'vector-effect': 'non-scaling-stroke' })
        ]));
        block.appendChild(u.el('div', { class: 'domain-head' }, [
          u.el('h3', { text: t('thread.' + th.id) }),
          u.el('span', { text: t('thread.' + th.id + '.m') + ' · ' + t('home.ideas', { n: th.knots.length }) })
        ]));
        var nextMarked = false;
        th.knots.forEach(function (k) {
          var isDone = done.indexOf(k.id) >= 0;
          var canPlay = C.playable(k);
          var isNext = canPlay && !isDone && !nextMarked;
          if (isNext) nextMarked = true;
          var cls = 'knot' + (isDone ? ' done' : '') + (isNext ? ' next' : '') + (!canPlay ? ' later' : '');
          var dot = u.el('i');
          if (isDone) {
            var page = pages.filter(function (p) { return p.thread === k.id; }).pop();
            if (page && Sutra.thumb) dot.appendChild(Sutra.thumb(page));
          }
          var links = C.jaalFor(k.id).filter(function (l) { return l.otherSection !== section.id; });
          var otherNames = links.map(function (l) { return t('section.' + l.otherSection); }).filter(function (v, i, a) { return a.indexOf(v) === i; });
          block.appendChild(u.el('button', { class: cls, type: 'button', onclick: function () { ui.openKnot(k); } }, [
            u.el('span', { class: 'dot' }, [dot]),
            u.el('span', { class: 'txt' }, [
              u.el('span', { class: 't1', text: t('knot.' + k.id + '.t') }),
              u.el('span', { class: 't2', text: t('knot.' + k.id + '.d') }),
              otherNames.length ? u.el('span', { class: 'jaal-tag', text: t('shala.alsoIn', { s: otherNames.join(', ') }) }) : null
            ]),
            isNext ? u.el('span', { class: 'tag', text: t('home.startHere') }) : null
          ]));
        });
        view.appendChild(block);
        if (th.crossing) {
          view.appendChild(u.el('button', {
            class: 'crossing', type: 'button', text: t(th.crossing),
            onclick: function () { Sutra.voice.say(t(th.crossing)); }
          }));
        }
      });

      view.appendChild(u.el('div', { class: 'home-links' }, [
        ui.btn(t('home.toJaal'), function () { Sutra.router.go('jaal'); }, 'quiet'),
        ui.btn(t('home.notebook'), function () { Sutra.router.go('notebook'); }, 'quiet')
      ]));
    }
  };
})();
