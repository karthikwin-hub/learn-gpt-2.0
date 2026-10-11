(function () {
  'use strict';
  var Sutra = window.Sutra;
  var u = Sutra.util;
  var t = Sutra.ui.t;

  Sutra.screens.opening = {
    hideTopbar: true,
    full: true,
    note: 'The whole identity in four seconds: twelve dots, then one unbroken line weaves a kolam around them. It is a real mathematical construction (a mirror curve on a 3 × 4 grid), not clip art. Tap to skip. Later launches would skip it automatically.',
    render: function (view) {
      var done = false;
      var wrap = u.el('div', { class: 'opening' });
      var begin = Sutra.ui.btn(t('opening.begin'), function (e) { e.stopPropagation(); Sutra.app.afterOpening(); }, 'primary');
      function finish() {
        if (done) return;
        done = true;
        wrap.classList.add('done');
        begin.focus({ preventScroll: true });
      }
      var art = Sutra.manip.kolamLine({ m: 3, n: 4, animate: 2600, label: t('opening.artLabel'), onDone: finish });
      wrap.appendChild(art);
      wrap.appendChild(u.el('p', { class: 'wordmark', text: t('app.name') }));
      wrap.appendChild(u.el('p', { class: 'tagline', text: t('app.tagline') }));
      wrap.appendChild(begin);
      wrap.addEventListener('click', function () {
        if (!done) {
          art.querySelectorAll('path, circle').forEach(function (n) { n.style.transition = 'none'; n.style.strokeDashoffset = 0; n.style.opacity = 1; });
          finish();
        }
      });
      view.appendChild(wrap);
    }
  };
})();
