/**
 * Accessible modal bottom sheet for switching language anywhere.
 */

import { t, LANGS, getLang, setLang, type LanguageCode } from '../../../domain/i18n/core';
import { storage } from '../../../persistence/storage';
import { clear, el } from '../../util/dom';
import { router } from '../app/router';

let sheetBackdrop: HTMLElement | null = null;

export function initLanguageSheet(): void {
  const container = document.getElementById('modal-container');
  if (!container) return;

  sheetBackdrop = el('div', {
    class: 'sheet-backdrop',
    id: 'lang-sheet-backdrop',
    hidden: true,
    onclick: (e: MouseEvent) => {
      if (e.target === sheetBackdrop) {
        closeLanguageSheet();
      }
    },
  });

  const sheet = el('div', {
    class: 'sheet',
    role: 'dialog',
    id: 'lang-sheet',
    'aria-modal': 'true',
    'aria-labelledby': 'lang-sheet-title',
  });

  const heading = el('h2', { id: 'lang-sheet-title', text: t('chrome.chooseLanguage') });
  const list = el('div', {
    class: 'lang-list',
    id: 'lang-list',
    role: 'menu',
    'aria-label': t('chrome.chooseLanguage'),
  });

  sheet.appendChild(heading);
  sheet.appendChild(list);
  sheetBackdrop.appendChild(sheet);
  container.appendChild(sheetBackdrop);

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sheetBackdrop && !sheetBackdrop.hidden) {
      closeLanguageSheet();
    }
  });
}

export function openLanguageSheet(): void {
  if (!sheetBackdrop) initLanguageSheet();
  if (!sheetBackdrop) return;

  const list = document.getElementById('lang-list');
  const heading = document.getElementById('lang-sheet-title');
  if (heading) heading.textContent = t('chrome.chooseLanguage');

  if (list) {
    clear(list);
    const active = getLang();

    for (const [codeStr, meta] of Object.entries(LANGS)) {
      const code = codeStr as LanguageCode;
      const isCurrent = code === active;

      const option = el(
        'button',
        {
          class: 'lang-option',
          role: 'menuitemradio',
          type: 'button',
          lang: code,
          'aria-checked': String(isCurrent),
          onclick: () => {
            closeLanguageSheet();
            setLang(code);
            storage.set('lang', code);
            router.rerender();
          },
        },
        [
          el('span', { class: 'glyph', text: meta.glyph }),
          el('span', {}, [
            el('span', { class: 'native', text: meta.native }),
            el('br'),
            el('span', { class: 'english', lang: 'en', text: meta.english }),
          ]),
        ]
      );

      list.appendChild(option);
    }
  }

  sheetBackdrop.hidden = false;
  const activeOption = list?.querySelector<HTMLButtonElement>('[aria-checked="true"]');
  if (activeOption) {
    activeOption.focus();
  }
}

export function closeLanguageSheet(): void {
  if (sheetBackdrop) {
    sheetBackdrop.hidden = true;
  }
}
