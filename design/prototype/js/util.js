/* Shared helpers: DOM/SVG builders, pointer dragging, animation, local storage. */
(function () {
  'use strict';
  var Sutra = (window.Sutra = window.Sutra || {});
  Sutra.model = Sutra.model || {};
  Sutra.manip = Sutra.manip || {};
  Sutra.screens = Sutra.screens || {};
  Sutra.state = Sutra.state || {};

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function applyAttrs(node, attrs) {
    if (!attrs) return;
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === undefined || v === null || v === false) return;
      if (k === 'text') node.textContent = v;
      else if (k === 'html') node.innerHTML = v;
      else if (k === 'class') node.setAttribute('class', v);
      else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
      else if (k.indexOf('on') === 0 && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? '' : v);
    });
  }

  function append(node, children) {
    (Array.isArray(children) ? children : [children]).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
    });
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    applyAttrs(node, attrs);
    if (children !== undefined) append(node, children);
    return node;
  }

  function svg(tag, attrs, children) {
    var node = document.createElementNS(SVG_NS, tag);
    applyAttrs(node, attrs);
    if (children !== undefined) append(node, children);
    return node;
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function reducedMotion() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

  /* Converts a pointer event to the SVG's own coordinate system. */
  function svgPoint(svgEl, evt) {
    var pt = svgEl.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var m = svgEl.getScreenCTM();
    return m ? pt.matrixTransform(m.inverse()) : { x: 0, y: 0 };
  }

  /* Single-pointer drag. Extra fingers are ignored so stray touches never break a model. */
  function drag(target, handlers) {
    var activeId = null;
    function down(e) {
      if (activeId !== null) return;
      activeId = e.pointerId;
      try { target.setPointerCapture(e.pointerId); } catch (err) { /* capture unsupported */ }
      e.preventDefault();
      if (handlers.start) handlers.start(e);
    }
    function move(e) {
      if (e.pointerId !== activeId) return;
      e.preventDefault();
      if (handlers.move) handlers.move(e);
    }
    function up(e) {
      if (e.pointerId !== activeId) return;
      activeId = null;
      if (handlers.end) handlers.end(e);
    }
    target.addEventListener('pointerdown', down);
    target.addEventListener('pointermove', move);
    target.addEventListener('pointerup', up);
    target.addEventListener('pointercancel', up);
    return function off() {
      target.removeEventListener('pointerdown', down);
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerup', up);
      target.removeEventListener('pointercancel', up);
    };
  }

  /* Runs fn(progress 0..1) over duration ms; returns a cancel function. */
  function tween(duration, fn, done) {
    if (reducedMotion()) duration = 1;
    var start = null;
    var id = 0;
    var cancelled = false;
    function frame(ts) {
      if (cancelled) return;
      if (start === null) start = ts;
      var p = clamp((ts - start) / duration, 0, 1);
      fn(p);
      if (p < 1) id = requestAnimationFrame(frame);
      else if (done) done();
    }
    id = requestAnimationFrame(frame);
    return function cancel() { cancelled = true; cancelAnimationFrame(id); };
  }

  /* Reveals an SVG stroke along its length ("ink draws itself"). */
  function drawStroke(path, duration, delay) {
    if (!path.isConnected) return;
    var len = path.getTotalLength ? path.getTotalLength() : 0;
    if (!len || reducedMotion()) return;
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset ' + duration + 'ms cubic-bezier(.2,.7,.2,1) ' + (delay || 0) + 'ms';
    path.style.strokeDashoffset = 0;
  }

  var PREFIX = 'sutra-proto:';
  var store = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem(PREFIX + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (err) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (err) { /* storage full or blocked */ }
    },
    clearAll: function () {
      try {
        Object.keys(localStorage).forEach(function (k) { if (k.indexOf(PREFIX) === 0) localStorage.removeItem(k); });
      } catch (err) { /* storage blocked */ }
    }
  };

  /* Stepper control: returns { node, set(value) }. Accessible alternative to dragging. */
  function stepper(opts) {
    var out = el('output', { 'aria-live': 'polite', text: String(opts.value) });
    var value = opts.value;
    function set(v, silent) {
      value = clamp(v, opts.min, opts.max);
      out.textContent = String(value);
      if (!silent && opts.onChange) opts.onChange(value);
    }
    var node = el('div', { class: 'stepper', role: 'group', 'aria-label': opts.label }, [
      el('button', { type: 'button', 'aria-label': opts.minusLabel || '−', text: '−', onclick: function () { set(value - 1); } }),
      out,
      el('button', { type: 'button', 'aria-label': opts.plusLabel || '+', text: '+', onclick: function () { set(value + 1); } })
    ]);
    return { node: node, set: function (v) { set(v, true); } };
  }

  function toast(msg, ms) {
    var node = document.getElementById('toast');
    node.textContent = msg;
    node.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { node.hidden = true; }, ms || 2600);
  }

  Sutra.util = {
    el: el, svg: svg, clear: clear, append: append,
    clamp: clamp, lerp: lerp, easeOut: easeOut, easeInOut: easeInOut,
    reducedMotion: reducedMotion, svgPoint: svgPoint, drag: drag, tween: tween, drawStroke: drawStroke,
    store: store, stepper: stepper, toast: toast
  };
})();
