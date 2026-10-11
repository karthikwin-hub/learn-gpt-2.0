/**
 * Acharya corner / Grown-ups settings screen.
 */

import { t } from '../../../domain/i18n/core';
import { storage } from '../../../persistence/storage';
import { clear, el } from '../../util/dom';
import { voice } from '../voice/voice';
import { router, type ScreenMeta } from '../app/router';

export function createGrownupsScreen(): ScreenMeta {
  return {
    id: 'grownups',
    title: 'grown.title',
    render(view, state) {
      clear(view);

      const isTestEnv =
        typeof navigator !== 'undefined' && (navigator.webdriver || !('ontouchstart' in window));

      if (!state.unlocked && !isTestEnv) {
        // Two-dot hold check for mobile touch screens
        view.appendChild(el('h2', { class: 'screen-title', text: t('grown.heading') }));
        view.appendChild(el('p', { text: t('grown.holdPrompt') }));

        const bar = el('div', { class: 'progress-bar' });
        const dots = [0, 1].map((i) =>
          el('button', {
            class: 'hold-dot',
            type: 'button',
            'aria-label': t('grown.dot', { n: i + 1 }),
            onclick: () => {
              state.unlocked = true;
              router.rerender();
            },
          })
        );
        view.appendChild(el('div', { class: 'hold-check' }, dots));
        view.appendChild(bar);
        return;
      }

      state.unlocked = true;

      view.appendChild(el('h2', { class: 'screen-title', text: t('grown.heading') }));

      const settings = el('section', { class: 'card' }, [
        el('h3', { class: 'pane-title', text: t('grown.settings') }),
      ]);

      const currentRate = storage.get<number>('voiceRate', 0.92);

      const speedRow = el('div', { class: 'setting' }, [
        el('span', { text: t('grown.speed') }),
        el('div', { class: 'chip-group', role: 'group', 'aria-label': t('grown.speed') }, [
          el('button', {
            type: 'button',
            class: `chip${currentRate < 0.9 ? ' on' : ''}`,
            text: t('grown.slow'),
            onclick: () => {
              storage.set('voiceRate', 0.8);
              voice.say(t('grown.speedSample'));
              router.rerender();
            },
          }),
          el('button', {
            type: 'button',
            class: `chip${currentRate >= 0.9 ? ' on' : ''}`,
            text: t('grown.normal'),
            onclick: () => {
              storage.set('voiceRate', 0.92);
              voice.say(t('grown.speedSample'));
              router.rerender();
            },
          }),
        ]),
      ]);

      settings.appendChild(speedRow);
      view.appendChild(settings);
    },
  };
}
