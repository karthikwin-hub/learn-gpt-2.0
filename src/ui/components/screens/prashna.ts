/**
 * Prashna prediction screen: Under a minute, one question, three choices.
 * Commits to a prediction before BodhaDirect teaching confirms or refutes it.
 */

import { t } from '../../../domain/i18n/core';
import { storage } from '../../../persistence/storage';
import { el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';

export function createPrashnaScreen(): ScreenMeta {
  return {
    id: 'prashna',
    stage: 'shravana',
    step: 'prashna',
    title: 'prashna.title',
    render(view, state, params) {
      const knotId = params.k || 'N1';
      enterThread(knotId, 'prashna', { k: knotId });

      const storedGuess = storage.get<number | null>(`guess:${knotId}`, null);

      view.appendChild(el('p', { class: 'muted small', text: t(`knot.${knotId}.t`) }));
      view.appendChild(el('h2', { class: 'screen-title', text: t(`prashna.${knotId}.q`) }));
      view.appendChild(el('p', { class: 'muted', text: t('prashna.sub') }));

      const choices = el('div', {
        class: 'prashna-choices',
        role: 'group',
        'aria-label': t('prashna.myGuess'),
      });

      [0, 1, 2].forEach((i) => {
        choices.appendChild(
          el('button', {
            class: 'choice',
            type: 'button',
            'aria-pressed': String(storedGuess === i),
            text: t(`prashna.${knotId}.c${i + 1}`),
            onclick: () => {
              storage.set(`guess:${knotId}`, i);
              router.rerender();
            },
          })
        );
      });
      view.appendChild(choices);

      const goBtn = el('button', {
        class: 'btn primary block',
        type: 'button',
        text: t('prashna.go'),
        disabled: storedGuess === null,
        onclick: () => {
          router.go('bodha', { k: knotId });
        },
      });
      view.appendChild(el('div', { class: 'btn-row' }, [goBtn]));

      if (!state.spoken) {
        state.spoken = true;
        setTimeout(() => {
          voice.say(t(`prashna.${knotId}.q`));
        }, 350);
      }
    },
  };
}
