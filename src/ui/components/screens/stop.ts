/**
 * Stop screen: "A good place to stop".
 * Ends the learning session calmly without scores, streaks, or timer pressure.
 * Names what was understood in plain words, displays child's own sentence,
 * model thumbnail, and offers a quiet return to the Loom or Notebook.
 */

import { t } from '../../../domain/i18n/core';
import { pothi, type NotebookPage } from '../../../persistence/pothi';
import { clear, el } from '../../util/dom';
import { clearThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';
import { renderSentence } from './explain';
import { renderThumbnail } from '../notebook/thumbs';

export function createStopScreen(): ScreenMeta {
  return {
    id: 'stop',
    stage: 'nididhyasana',
    step: 'stop',
    title: 'stop.title',
    hideBack: true,
    render(view, state, params) {
      clear(view);
      clearThread();

      const pages = pothi.getPages();
      const page: NotebookPage | undefined =
        pages.find((p) => String(p.id) === String(params.page)) || pages[pages.length - 1];

      const wrap = el('div', { class: 'stop' });

      if (page) {
        const thumbWrap = el('div', { class: 'thumb' }, [renderThumbnail(page)]);
        wrap.appendChild(thumbWrap);

        wrap.appendChild(el('h2', { class: 'screen-title', text: t('stop.heading') }));
        wrap.appendChild(el('p', { class: 'say', text: t(`know.${page.thread}`) }));
        wrap.appendChild(el('p', { class: 'muted small', text: t('stop.yourWords') }));

        const sentenceEl = renderSentence(page.thread, page.fills);
        sentenceEl.classList.add('sutra');
        wrap.appendChild(sentenceEl);

        wrap.appendChild(el('p', { class: 'muted small', text: t('stop.sutra') }));
        wrap.appendChild(
          el('p', {
            class: 'sutra-line',
            text: t(`bodha.${page.thread}.sutra`),
          })
        );
      } else {
        wrap.appendChild(el('h2', { class: 'screen-title', text: t('stop.heading') }));
      }

      wrap.appendChild(el('p', { class: 'muted', text: t('stop.later') }));
      view.appendChild(wrap);

      view.appendChild(
        el('div', { class: 'btn-row' }, [
          el('button', {
            class: 'btn primary',
            type: 'button',
            text: t('stop.loom'),
            onclick: () => router.go('home'),
          }),
          el('button', {
            class: 'btn quiet',
            type: 'button',
            text: t('stop.notebook'),
            onclick: () => router.go('notebook'),
          }),
        ])
      );

      if (page && state.spoken !== page.id) {
        state.spoken = page.id;
        voice.say(t(`know.${page.thread}`), { noCaption: true });
      }
    },
  };
}
