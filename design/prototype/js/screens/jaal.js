/* Jaal (the web): the three Shalas as points of a triangle, joined by the threads that cross subjects. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var ui = Sutra.ui;
  var t = ui.t;
  var C = Sutra.model.curriculum;

  var POS = { ganita: { x: 180, y: 46 }, vijnana: { x: 60, y: 238 }, loka: { x: 300, y: 238 } };
  var COLOR = { ganita: 'var(--thread)', vijnana: 'var(--leaf)', loka: 'var(--indigo)' };

  function sectionOf(id) { return C.placeOf(id).section.id; }

  /* Links between the same two Shalas fan out as curves of increasing bend; links inside one Shala loop out from it. */
  function curveFor(link, order) {
    var sa = sectionOf(link.a), sb = sectionOf(link.b);
    var A = POS[sa], B = POS[sb];
    if (sa === sb) {
      var r = 40 + order * 14;
      return 'M' + A.x + ' ' + A.y + ' c ' + (-r) + ' ' + (-r) + ', ' + r + ' ' + (-r) + ', 0 0';
    }
    var mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    var dx = B.x - A.x, dy = B.y - A.y, len = Math.sqrt(dx * dx + dy * dy);
    var bend = (order - 1) * 26;
    var cx = mx - (dy / len) * bend, cy = my + (dx / len) * bend;
    return 'M' + A.x + ' ' + A.y + ' Q ' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + B.x + ' ' + B.y;
  }

  Sutra.screens.jaal = {
    title: 'jaal.title',
    note: 'Jaal (the web). Ideas do not stay inside subjects: a shadow is a clock for the turning Earth; a map\'s scale is measuring; a timeline is a number line for years. Each curved thread is one link between two knots in different Shalas. Tap a thread, or a link in the list, to hear the connection and open either knot. The links are data (JAAL in js/model/curriculum.js), so the full app can add more without new screens.',
    render: function (view, state) {
      if (!state.sel) state.sel = C.JAAL[0].id;
      var svg = u.svg('svg', { viewBox: '0 0 360 280', role: 'img', 'aria-label': t('jaal.art') });
      var curves = u.svg('g');
      svg.appendChild(curves);
      var pairCount = {};
      var paths = {};
      C.JAAL.forEach(function (link) {
        var key = [sectionOf(link.a), sectionOf(link.b)].sort().join('-');
        pairCount[key] = (pairCount[key] || 0) + 1;
        var p = u.svg('path', { d: curveFor(link, pairCount[key]), fill: 'none', 'stroke-width': 2.4, 'stroke-linecap': 'round', class: 'jaal-curve', 'data-id': link.id });
        p.addEventListener('click', function () { pick(link.id); });
        curves.appendChild(p);
        paths[link.id] = p;
      });
      Object.keys(POS).forEach(function (sid) {
        var P = POS[sid];
        svg.appendChild(u.svg('circle', { cx: P.x, cy: P.y, r: 22, fill: 'var(--paper-raised)', stroke: COLOR[sid], 'stroke-width': 3 }));
        svg.appendChild(u.svg('text', { x: P.x, y: P.y + (sid === 'ganita' ? -32 : 40), 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: 'var(--ink)', 'font-family': 'var(--font)', text: t('section.' + sid) }));
      });

      var detail = u.el('section', { class: 'card jaal-detail', 'aria-live': 'polite' });
      var list = u.el('div', { class: 'jaal-list' });

      function knotButton(id) {
        var knot = C.findKnot(id);
        var sid = sectionOf(id);
        return u.el('button', {
          class: 'jaal-knot' + (C.playable(knot) ? '' : ' later'), type: 'button', onclick: function () { ui.openKnot(knot); }
        }, [u.el('span', { class: 'sec', style: { color: COLOR[sid] }, text: t('section.' + sid) }), u.el('span', { text: t('knot.' + id + '.t') })]);
      }

      function paint() {
        Object.keys(paths).forEach(function (id) {
          paths[id].setAttribute('stroke', id === state.sel ? 'var(--thread)' : 'var(--ghost)');
          paths[id].setAttribute('stroke-width', id === state.sel ? 4 : 2.4);
        });
        var link = C.JAAL.filter(function (l) { return l.id === state.sel; })[0];
        u.clear(detail);
        detail.appendChild(u.el('h3', { class: 'pane-title', text: t('jaal.' + link.id + '.t') }));
        detail.appendChild(u.el('p', { text: t('jaal.' + link.id) }));
        detail.appendChild(u.el('div', { class: 'jaal-knots' }, [knotButton(link.a), knotButton(link.b)]));
        list.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.value === state.sel)); });
      }

      function pick(id) { state.sel = id; paint(); Sutra.voice.say(t('jaal.' + id), { noCaption: true }); }

      C.JAAL.forEach(function (link) {
        list.appendChild(u.el('button', { class: 'chip', type: 'button', 'data-value': link.id, text: t('jaal.' + link.id + '.t'), onclick: function () { pick(link.id); } }));
      });

      view.appendChild(u.el('p', { class: 'loom-intro', text: t('jaal.intro') }));
      view.appendChild(u.el('div', { class: 'model jaal-art' }, [svg]));
      view.appendChild(detail);
      view.appendChild(u.el('h3', { class: 'pane-title', text: t('jaal.all') }));
      view.appendChild(list);
      paint();
    }
  };
})();
