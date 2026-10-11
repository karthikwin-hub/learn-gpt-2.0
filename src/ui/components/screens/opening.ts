/**
 * Opening screen: 3x4 dot kolam line drawing, wordmark, tagline, and Begin button.
 */

import { t } from '../../../domain/i18n/core';
import { storage } from '../../../persistence/storage';
import { renderKolamLine } from '../../diagrams/kolam-curve';
import { el } from '../../util/dom';
import { router, type ScreenMeta } from '../app/router';

export function createOpeningScreen(): ScreenMeta {
  return {
    id: 'opening',
    hideTopbar: true,
    full: true,
    render(view) {
      let done = false;
      const wrap = el('div', { class: 'opening' });

      function afterOpening(): void {
        const hasLang = storage.get<string | null>('lang', null);
        if (hasLang) {
          router.go('home');
        } else {
          router.go('language');
        }
      }

      const begin = el('button', {
        class: 'btn primary',
        type: 'button',
        text: t('opening.begin'),
        onclick: (e: Event) => {
          e.stopPropagation();
          afterOpening();
        },
      });

      function finish(): void {
        if (done) return;
        done = true;
        wrap.classList.add('done');
        begin.focus({ preventScroll: true });
      }

      const art = renderKolamLine({
        m: 3,
        n: 4,
        animate: 2600,
        label: t('opening.artLabel'),
        onDone: finish,
      });

      wrap.appendChild(art);
      wrap.appendChild(el('h1', { class: 'wordmark app-title', text: t('app.name') }));
      wrap.appendChild(el('p', { class: 'tagline', text: t('app.tagline') }));
      wrap.appendChild(begin);

      wrap.addEventListener('click', () => {
        if (!done) {
          art.querySelectorAll('path, circle').forEach((n) => {
            const elNode = n as HTMLElement | SVGElement;
            elNode.style.transition = 'none';
            if ('strokeDashoffset' in elNode.style) {
              (elNode.style as CSSStyleDeclaration).strokeDashoffset = '0';
            }
            elNode.style.opacity = '1';
          });
          finish();
        }
      });

      view.appendChild(wrap);
    },
  };
}
