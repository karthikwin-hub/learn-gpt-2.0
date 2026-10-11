/* Hash router: #/screen?key=value. Screens keep their state in Sutra.state, so a language switch re-renders in place. */
(function () {
  'use strict';
  var Sutra = window.Sutra;
  var t = function (k, v) { return Sutra.i18n.t(k, v); };

  var current = null;
  var cleanup = null;
  var depth = 0;

  function parse() {
    var raw = (location.hash || '').replace(/^#\/?/, '');
    var parts = raw.split('?');
    var params = {};
    if (parts[1]) {
      parts[1].split('&').forEach(function (kv) {
        var p = kv.split('=');
        params[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
      });
    }
    return { id: parts[0] || '', params: params };
  }

  function hashFor(id, params) {
    var q = params ? Object.keys(params).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); }).join('&') : '';
    return '#/' + id + (q ? '?' + q : '');
  }

  function render() {
    var route = parse();
    var screen = Sutra.screens[route.id];
    if (!screen) {
      location.replace(hashFor(Sutra.app.startScreen()));
      return;
    }
    if (cleanup) { try { cleanup(); } catch (err) { console.error(err); } }
    cleanup = null;
    Sutra.voice.stop();

    var view = document.getElementById('view');
    Sutra.util.clear(view);
    view.className = 'view' + (screen.full ? ' full' : '');
    view.scrollTop = 0;
    void view.offsetWidth;
    view.style.animation = 'none';
    void view.offsetWidth;
    view.style.animation = '';

    var key = route.id + (route.params.mode ? ':' + route.params.mode : '');
    var state = (Sutra.state[key] = Sutra.state[key] || {});
    current = { id: route.id, params: route.params, screen: screen, state: state };

    var title = typeof screen.title === 'function' ? screen.title(route.params) : screen.title ? t(screen.title) : '';
    document.getElementById('topbar-title').textContent = title;
    document.getElementById('btn-back').hidden = !!screen.hideBack;
    document.getElementById('topbar').style.display = screen.hideTopbar ? 'none' : '';

    cleanup = screen.render(view, state, route.params) || null;
    Sutra.app.onRoute(route.id, screen);
  }

  Sutra.router = {
    go: function (id, params) {
      depth++;
      location.hash = hashFor(id, params);
    },
    replace: function (id, params) {
      location.replace(hashFor(id, params));
    },
    back: function () {
      if (depth > 0) { depth--; history.back(); }
      else location.hash = hashFor('home');
    },
    rerender: render,
    current: function () { return current; },
    start: function () {
      window.addEventListener('hashchange', render);
      render();
    }
  };
})();
