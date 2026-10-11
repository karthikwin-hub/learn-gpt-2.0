/**
 * Spot the Mistake screen: Error-finding in someone else's working.
 * Reinforces conceptual understanding without penalty or punitive red (US5-AS2).
 * Kumkum red is reserved strictly as a focal pointer ("look here") on the omitted steps.
 */

import { t } from '../../../domain/i18n/core';
import { getLesson } from '../../../domain/lesson/registry';
import { clear, el } from '../../util/dom';
import { enterThread, getCurrentThread } from '../../util/thread';
import { renderM4MistakeRooms } from '../../diagrams/tiles';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';

export function createMistakeScreen(): ScreenMeta {
  return {
    id: 'mistake',
    stage: 'manana',
    step: 'mistake',
    title: 'mistake.title',
    render(view, state, params: Record<string, string> = {}) {
      const threadKnot = params.knot || params.k || getCurrentThread() || 'M4';
      const threadLesson = getLesson(threadKnot);
      const knotId = threadLesson?.mistake ? threadKnot : 'M4';
      const lesson = getLesson(knotId) || getLesson('M4');
      const mistakeData = lesson?.mistake;

      enterThread(knotId, 'mistake');

      if (state.knot !== knotId) {
        state.knot = knotId;
        state.found = false;
        state.fine = [];
      }

      const key = (k: string) => {
        const upper = `mistake.${knotId}.${k}`;
        const lower = `mistake.${knotId.toLowerCase()}.${k}`;
        return t(upper) !== upper ? upper : lower;
      };

      const say = el('p', { class: 'say', hidden: true });
      const picture = el('div', { class: 'model' });
      const after = el('div');
      const list = el('div', { class: 'work-steps' });

      function paint(): void {
        clear(list);
        const stepsCount = mistakeData ? mistakeData.steps : 4;
        for (let n = 0; n < stepsCount; n++) {
          list.appendChild(createStepButton(n));
        }

        clear(picture);
        clear(after);

        if (state.found) {
          const pic =
            (mistakeData?.picture ? (mistakeData.picture(true) as SVGSVGElement) : null) ||
            renderM4MistakeRooms(true);
          picture.appendChild(pic);
          if (mistakeData?.eq) {
            after.appendChild(el('div', { class: 'eq', html: mistakeData.eq() }));
          }
          after.appendChild(
            el('div', { class: 'btn-row' }, [
              el('button', {
                class: 'btn primary block',
                type: 'button',
                text: t('common.explain'),
                onclick: () => router.go('explain'),
              }),
            ])
          );
        }
      }

      function createStepButton(i: number): HTMLElement {
        const fineList = (state.fine as number[]) || [];
        const isFound = state.found && i === mistakeData?.wrong;
        const isFine = fineList.includes(i);
        const cls = isFound ? 'found' : isFine ? 'fine' : '';

        return el(
          'button',
          {
            class: cls,
            type: 'button',
            onclick: () => {
              if (state.found) return;
              if (i === mistakeData?.wrong) {
                state.found = true;
                paint();
                updateSay(t(key('found')), true);
              } else {
                state.fine = [...fineList, i];
                paint();
                updateSay(t(key(`fine${i + 1}`)), true);
              }
            },
          },
          [
            el('span', { class: 'num', text: String(i + 1) }),
            el('span', { text: t(key(`s${i + 1}`)) }),
          ]
        );
      }

      function updateSay(text: string, speak = false): void {
        say.textContent = text;
        say.hidden = false;
        if (speak) {
          voice.say(text);
        }
      }

      view.appendChild(el('p', { text: t(key('intro')) }));
      view.appendChild(list);
      view.appendChild(say);
      view.appendChild(picture);
      view.appendChild(after);

      paint();

      if (state.found) {
        updateSay(t(key('found')), false);
      }
    },
  };
}
