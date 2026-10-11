/**
 * First-run language selection screen: 5 cards in native scripts and Continue button.
 */

import { t, tIn, LANGS, getLang, setLang, type LanguageCode } from '../../../domain/i18n/core';
import { storage } from '../../../persistence/storage';
import { el } from '../../util/dom';
import { router, type ScreenMeta } from '../app/router';

export function createLanguageScreen(): ScreenMeta {
  return {
    id: 'language',
    title: 'language.title',
    hideBack: true,
    render(view) {
      view.appendChild(el('h2', { class: 'screen-title', text: t('language.heading') }));
      view.appendChild(el('p', { class: 'muted', text: t('language.sub') }));

      const list = el('div', {
        class: 'lang-cards',
        role: 'radiogroup',
        'aria-label': t('language.heading'),
      });

      function updateCards(): void {
        const current = getLang();
        list.querySelectorAll('.lang-card').forEach((card) => {
          const cardLang = card.getAttribute('lang');
          card.setAttribute('aria-checked', String(cardLang === current));
        });
      }

      for (const [codeStr, meta] of Object.entries(LANGS)) {
        const code = codeStr as LanguageCode;
        const card = el(
          'button',
          {
            class: 'lang-card',
            role: 'radio',
            type: 'button',
            lang: code,
            'aria-checked': String(code === getLang()),
            onclick: () => {
              setLang(code);
              updateCards();
              router.rerender();
            },
          },
          [
            el('div', { class: 'native', text: meta.native }),
            el('div', { class: 'sample', text: tIn(code, 'app.tagline') }),
          ]
        );
        list.appendChild(card);
      }

      view.appendChild(list);

      const continueBtn = el('button', {
        class: 'btn primary block',
        type: 'button',
        text: t('language.continue'),
        onclick: () => {
          storage.set('lang', getLang());
          router.replace('home');
        },
      });

      view.appendChild(continueBtn);
    },
  };
}
