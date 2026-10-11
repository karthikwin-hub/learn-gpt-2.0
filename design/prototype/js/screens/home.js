(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var t = Sutra.ui.t;
  var C = Sutra.model.curriculum;

  var WAVE = 'M24 0 C 36 14, 12 30, 24 46 S 36 80, 24 100';

  function openKnot(knot) {
    if (!knot.route) {
      u.toast(t('home.notInProto'));
      return;
    }
    Sutra.router.go(knot.route, knot.params);
  }

  Sutra.screens.home = {
    title: 'home.title',
    hideBack: true,
    note: 'The Loom. Five domain threads, each with its concept knots. Nothing is locked; a turmeric dot only suggests where to start. Finished knots show a tiny picture of the model the child built, not a star. No greeting, no streak, no points. Dashed crossings explain how two domains connect. Dashed knots are in the full curriculum but not in this prototype.',
    render: function (view) {
      var done = u.store.get('done', []);
      var pages = u.store.get('pages', []);
      var cont = u.store.get('continue', null);

      if (cont && C.findKnot(cont.knot)) {
        view.appendChild(u.el('button', {
          class: 'continue-card', onclick: function () { Sutra.router.go(cont.route, cont.params || undefined); }
        }, [
          u.el('span', { class: 'thumb', html: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 5l8 7-8 7"/></svg>' }),
          u.el('span', {}, [u.el('span', { class: 'label', text: t('home.continue') }), u.el('br'), u.el('span', { class: 'name', text: t('knot.' + cont.knot + '.t') })])
        ]));
      }

      view.appendChild(u.el('p', { class: 'loom-intro', text: t('home.intro') }));

      C.DOMAINS.forEach(function (d) {
        var section = u.el('section', { class: 'domain', 'aria-label': t('domain.' + d.id) });
        section.appendChild(u.svg('svg', { class: 'domain-thread', viewBox: '0 0 48 100', preserveAspectRatio: 'none', 'aria-hidden': 'true' }, [
          u.svg('path', { d: WAVE, 'vector-effect': 'non-scaling-stroke' })
        ]));
        section.appendChild(u.el('div', { class: 'domain-head' }, [
          u.el('h3', { text: t('domain.' + d.id) }),
          u.el('span', { text: t('home.ideas', { n: d.knots.length }) })
        ]));
        var nextMarked = false;
        d.knots.forEach(function (k) {
          var isDone = done.indexOf(k.id) >= 0;
          var isNext = !isDone && !nextMarked;
          if (isNext) nextMarked = true;
          var cls = 'knot' + (isDone ? ' done' : '') + (isNext ? ' next' : '') + (!k.route ? ' later' : '');
          var dot = u.el('i');
          if (isDone) {
            var page = pages.filter(function (p) { return p.thread === k.id; }).pop();
            if (page && Sutra.thumb) dot.appendChild(Sutra.thumb(page));
          }
          section.appendChild(u.el('button', { class: cls, onclick: function () { openKnot(k); } }, [
            u.el('span', { class: 'dot' }, [dot]),
            u.el('span', { class: 'txt' }, [
              u.el('span', { class: 't1', text: t('knot.' + k.id + '.t') }),
              u.el('span', { class: 't2', text: t('knot.' + k.id + '.d') })
            ]),
            isNext ? u.el('span', { class: 'tag', text: t('home.startHere') }) : null
          ]));
        });
        view.appendChild(section);
        if (d.crossing) {
          view.appendChild(u.el('button', {
            class: 'crossing', text: t(d.crossing),
            onclick: function () { Sutra.voice.say(t(d.crossing)); }
          }));
        }
      });

      view.appendChild(u.el('div', { class: 'home-links' }, [
        Sutra.ui.btn(t('home.notebook'), function () { Sutra.router.go('notebook'); }, 'quiet'),
        u.el('button', { class: 'link-btn', text: t('home.grownups'), onclick: function () { Sutra.router.go('grownups'); } })
      ]));
    }
  };
})();
