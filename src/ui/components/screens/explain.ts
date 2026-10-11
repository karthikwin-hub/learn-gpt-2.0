/**
 * Explain It Back screen: The child builds one sentence from word tiles,
 * then keeps it as a notebook page (Nididhyasana movement).
 */

import { t } from '../../../domain/i18n/core';
import { getLesson } from '../../../domain/lesson/registry';
import type { ExplainTemplate } from '../../../domain/lesson/types';
import { pothi } from '../../../persistence/pothi';
import { clear, el } from '../../util/dom';
import { enterThread, getCurrentThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

const FALLBACK_M4: ExplainTemplate = [
  { tiles: ['rows', 'tens', 'halves'], expect: 'tens' },
  { tiles: ['room', 'digit', 'row'], expect: 'room' },
  { tiles: ['multiply', 'subtract', 'add'], expect: 'add' },
];

const DEFAULT_TEMPLATES: Record<string, ExplainTemplate> = {
  M4: FALLBACK_M4,
  M2: [
    { tiles: ['rows', 'tens', 'halves'], expect: 'rows' },
    { tiles: ['tiles', 'dots', 'lines'], expect: 'tiles' },
    { tiles: ['area', 'perimeter', 'shape'], expect: 'area' },
  ],
};

export function sentenceText(thread: string, fills: string[]): string {
  let s = t(`explain.${thread}.s`);
  (fills || []).forEach((f, i) => {
    s = s.replace(`{${i}}`, t(`explain.${thread}.${f}`));
  });
  return s;
}

export function renderSentence(
  thread: string,
  fills: string[],
  opts: {
    interactive?: boolean;
    active?: number;
    onBlank?: (i: number) => void;
  } = {}
): HTMLElement {
  const p = el('p', { class: 'sentence' });
  const src = t(`explain.${thread}.s`);
  const parts = src
    .split(/(\{\d\})/)
    .filter(Boolean)
    .map((part) => {
      const m = /^\{(\d)\}$/.exec(part);
      return m ? { blank: Number(m[1]) } : { text: part };
    });

  parts.forEach((part) => {
    if (part.text !== undefined) {
      p.appendChild(document.createTextNode(part.text));
      return;
    }

    const f = fills[part.blank];
    const tileText = f ? t(`explain.${thread}.${f}`) : '…';

    if (opts.interactive && opts.onBlank) {
      p.appendChild(
        el('button', {
          type: 'button',
          class: `blank${f ? ' filled' : ''}${opts.active === part.blank ? ' active' : ''}`,
          'aria-label': f ? tileText : t('explain.blankLabel', { n: part.blank + 1 }),
          text: tileText,
          onclick: () => opts.onBlank?.(part.blank),
        })
      );
    } else {
      p.appendChild(el('span', { class: 'blank filled', text: tileText }));
    }
  });

  return p;
}

export function createExplainScreen(): ScreenMeta {
  return {
    id: 'explain',
    stage: 'nididhyasana',
    step: 'explain',
    title: 'explain.title',
    render(view, state) {
      const thread = getCurrentThread() || 'M4';
      enterThread(thread, 'explain');

      const lesson = getLesson(thread);
      const tpl: ExplainTemplate = lesson?.explain || DEFAULT_TEMPLATES[thread] || FALLBACK_M4;

      if (state.thread !== thread) {
        state.thread = thread;
        state.fills = [];
        state.active = 0;
      }

      const holder = el('div');
      const tilesContainer = el('div', { class: 'tiles' });
      const actions = el('div', { class: 'btn-row' });

      function isComplete(): boolean {
        const fills = (state.fills as string[]) || [];
        return tpl.every((_, i) => !!fills[i]);
      }

      function paint(): void {
        clear(holder);
        const fills = (state.fills as string[]) || [];
        holder.appendChild(
          renderSentence(thread, fills, {
            interactive: true,
            active: Number(state.active || 0),
            onBlank: (i) => {
              state.active = i;
              paint();
            },
          })
        );

        clear(tilesContainer);
        const activeBlankIdx = Number(state.active || 0);
        const currentBlank = tpl[activeBlankIdx];

        if (currentBlank) {
          currentBlank.tiles.forEach((tileKey) => {
            const isUsed = fills[activeBlankIdx] === tileKey;
            tilesContainer.appendChild(
              el('button', {
                type: 'button',
                class: `chip${isUsed ? ' used' : ''}`,
                text: t(`explain.${thread}.${tileKey}`),
                onclick: () => {
                  fills[activeBlankIdx] = tileKey;
                  state.fills = fills;
                  // Advance to next unfilled blank
                  const nextUnfilled = tpl.findIndex((_, idx) => !fills[idx]);
                  if (nextUnfilled >= 0) {
                    state.active = nextUnfilled;
                  }
                  paint();
                },
              })
            );
          });
        }

        clear(actions);
        if (isComplete()) {
          actions.appendChild(
            el('button', {
              class: 'btn primary block',
              type: 'button',
              text: t('explain.keep'),
              onclick: () => {
                const saved = pothi.savePage({
                  thread,
                  fills: (state.fills as string[]) || [],
                  time: Date.now(),
                  date: new Date().toISOString(),
                });
                router.go('stop', { page: saved.id });
              },
            })
          );
        }
      }

      view.appendChild(holder);
      view.appendChild(tilesContainer);
      view.appendChild(actions);

      paint();
    },
  };
}
