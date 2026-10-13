/**
 * The Notebook (Pothi): One page per idea the child explained,
 * with a tiny picture of the manipulative model they built.
 * Replaces badges, points, and score pressure.
 */

import { t } from '../../../domain/i18n/core';
import { pothi, type NotebookPage } from '../../../persistence/pothi';
import { clear, el } from '../../util/dom';
import { plainText } from '../../util/markup';
import { router, type ScreenMeta } from '../app/router';
import { renderSentence } from './explain';
import { renderThumbnail } from '../notebook/thumbs';

function dateLabel(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(document.documentElement.lang || 'en', {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return '';
  }
}

export function routeForThread(thread: string): {
  route: string;
  params?: Record<string, string>;
} {
  switch (thread) {
    case 'M4':
      return { route: 'rect' };
    case 'M5':
      return { route: 'drums' };
    case 'D1':
      return { route: 'share', params: { mode: 'share' } };
    case 'D3':
      return { route: 'share', params: { mode: 'leftover' } };
    case 'G2':
      return { route: 'rope' };
    case 'G4':
      return { route: 'kolam' };
    case 'S1':
    case 'S2':
      return { route: 'sets', params: { mode: 'sort' } };
    case 'S3':
      return { route: 'sets', params: { mode: 'guess' } };
    case 'L2':
      return { route: 'logic' };
    default:
      return { route: 'bodha', params: { k: thread } };
  }
}

export function createNotebookScreen(): ScreenMeta {
  return {
    id: 'notebook',
    title: 'notebook.title',
    render(view) {
      clear(view);

      const pages = pothi.getPages().slice().reverse();

      view.appendChild(el('h2', { class: 'screen-title', text: t('notebook.title') }));
      view.appendChild(el('p', { class: 'muted', text: t('notebook.intro') }));

      const keptSutras = pothi.getSutras();
      if (keptSutras.length > 0) {
        view.appendChild(el('h2', { class: 'pane-title', text: t('notebook.sutras') }));
        keptSutras.forEach((id) => {
          view.appendChild(
            el(
              'button',
              {
                class: 'page sutra-card',
                type: 'button',
                onclick: () => router.go('bodha', { k: id }),
              },
              [
                el('span', {}, [
                  el('span', { class: 'meta', text: t(`knot.${id}.t`) }),
                  el('span', { class: 'sutra-line', text: plainText(t(`bodha.${id}.sutra`)) }),
                ]),
              ]
            )
          );
        });

        if (pages.length > 0) {
          view.appendChild(el('h2', { class: 'pane-title', text: t('notebook.pages') }));
        }
      }

      if (pages.length === 0) {
        const samplePage: Partial<NotebookPage> = {
          thread: 'M4',
          fills: ['tens', 'room', 'add'],
          model: { cols: 23, rows: 14 },
        };

        const sampleSentence = renderSentence('M4', ['tens', 'room', 'add']);
        sampleSentence.classList.add('sutra');

        view.appendChild(
          el('div', { class: 'page sample', 'aria-hidden': 'true' }, [
            el('span', { class: 'thumb' }, [renderThumbnail(samplePage)]),
            el('span', {}, [el('span', { class: 'meta', text: t('knot.M4.t') }), sampleSentence]),
          ])
        );

        view.appendChild(el('p', { class: 'say', text: t('notebook.empty') }));
        view.appendChild(
          el('button', {
            class: 'btn primary block',
            type: 'button',
            text: t('notebook.toLoom'),
            onclick: () => router.go('home'),
          })
        );
        return;
      }

      pages.forEach((p) => {
        const sentenceEl = renderSentence(p.thread, p.fills);
        sentenceEl.classList.add('sutra');

        const dateStr = p.date ? dateLabel(p.date) : '';
        const metaText = dateStr
          ? `${t(`knot.${p.thread}.t`)} · ${dateStr}`
          : t(`knot.${p.thread}.t`);

        view.appendChild(
          el(
            'button',
            {
              class: 'page',
              type: 'button',
              onclick: () => {
                const nav = routeForThread(p.thread);
                router.go(p.route || nav.route, p.params || nav.params);
              },
            },
            [
              el('span', { class: 'thumb' }, [renderThumbnail(p)]),
              el('span', {}, [el('span', { class: 'meta', text: metaText }), sentenceEl]),
            ]
          )
        );
      });
    },
  };
}
