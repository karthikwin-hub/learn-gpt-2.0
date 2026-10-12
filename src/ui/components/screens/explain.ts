/**
 * Explain It Back screen: The child builds one sentence from word tiles,
 * then keeps it as a notebook page (Nididhyasana movement).
 * If the sentence does not match the model, a gentle hint points back to the idea once;
 * the child can still keep their own sentence (US3-AS2).
 */

import { findKnot } from '../../../domain/curriculum/curriculum';
import { t } from '../../../domain/i18n/core';
import { getLesson } from '../../../domain/lesson/registry';
import { pothi } from '../../../persistence/pothi';
import { storage } from '../../../persistence/storage';
import { createStepGuide } from '../../util/bench';
import { clear, el } from '../../util/dom';
import { enterThread, getCurrentThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';
import { renderLessonMissing } from './lesson-missing';

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
    render(view, state, params: Record<string, string> = {}) {
      const thread = params.k || params.knot || getCurrentThread() || 'M4';
      const lessonTpl = getLesson(thread)?.explain;
      if (!lessonTpl) {
        renderLessonMissing(view, thread, 'explain');
        return;
      }
      const tpl = lessonTpl;
      enterThread(thread, 'explain', { k: thread });

      if (state.thread !== thread) {
        state.thread = thread;
        state.fills = [];
        state.active = 0;
        state.hinted = false;
      }

      const holder = el('div');
      const tilesContainer = el('div', { class: 'tiles' });
      const hint = el('p', { class: 'say explain-hint', hidden: true, 'aria-live': 'polite' });
      const actions = el('div', { class: 'btn-row explain-actions' });
      const fills = (): string[] => (state.fills as string[]) || [];

      const isComplete = () => tpl.every((_, i) => !!fills()[i]);
      const matches = () => tpl.every((blank, i) => fills()[i] === blank.expect);

      function clearHint(): void {
        state.hinted = false;
        hint.hidden = true;
      }

      function paint(): void {
        clear(holder);
        holder.appendChild(
          renderSentence(thread, fills(), {
            interactive: true,
            active: Number(state.active || 0),
            onBlank: (i) => {
              state.active = i;
              clearHint();
              paint();
            },
          })
        );

        clear(tilesContainer);
        const activeBlankIdx = Number(state.active || 0);
        const currentBlank = tpl[activeBlankIdx];
        currentBlank?.tiles.forEach((tileKey) => {
          tilesContainer.appendChild(
            el('button', {
              type: 'button',
              class: 'chip',
              'aria-pressed': String(fills()[activeBlankIdx] === tileKey),
              text: t(`explain.${thread}.${tileKey}`),
              onclick: () => {
                const next = [...fills()];
                next[activeBlankIdx] = tileKey;
                state.fills = next;
                clearHint();
                const nextUnfilled = tpl.findIndex((_, idx) => !next[idx]);
                if (nextUnfilled >= 0) state.active = nextUnfilled;
                paint();
              },
            })
          );
        });

        clear(actions);
        if (isComplete()) {
          actions.appendChild(
            el('button', {
              class: 'btn quiet',
              type: 'button',
              text: t('explain.hear'),
              onclick: () => voice.say(sentenceText(thread, fills())),
            })
          );
          actions.appendChild(
            el('button', {
              class: 'btn primary block',
              type: 'button',
              text: state.hinted ? t('explain.keepAnyway') : t('explain.keep'),
              onclick: keep,
            })
          );
        }
      }

      function keep(): void {
        if (!matches() && !state.hinted) {
          state.hinted = true;
          hint.textContent = `${t(`explain.${thread}.hint`)} ${t('explain.hintTail')}`;
          hint.hidden = false;
          voice.say(hint.textContent, { noCaption: true });
          paint();
          return;
        }
        const bench = findKnot(thread)?.bench;
        const saved = pothi.savePage({
          thread,
          fills: fills(),
          route: bench?.route,
          params: bench?.params,
        });
        const done = storage.get<string[]>('done', []);
        if (!done.includes(thread)) storage.set('done', [...done, thread]);
        state.thread = null;
        router.go('stop', { page: saved.id });
      }

      view.appendChild(createStepGuide(1, t('explain.intro')));
      view.appendChild(el('p', { class: 'muted small explain-knot', text: t(`knot.${thread}.t`) }));
      view.appendChild(holder);
      view.appendChild(tilesContainer);
      view.appendChild(hint);
      view.appendChild(actions);

      paint();
    },
  };
}
