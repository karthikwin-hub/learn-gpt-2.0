/**
 * Spot the Mistake screen: Error-finding in someone else's working.
 * Reinforces conceptual understanding without penalty or punitive red (US5-AS2).
 * Kumkum red is reserved strictly as a focal pointer ("look here") on the omitted steps.
 */

import { t } from '../../../domain/i18n/core';
import { getLesson } from '../../../domain/lesson/registry';
import { clear, el } from '../../util/dom';
import { markupLine } from '../../util/markup';
import { enterThread, getCurrentThread } from '../../util/thread';
import { getVisuals } from '../../lesson-visuals';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';
import { renderLessonMissing } from './lesson-missing';

export function createMistakeScreen(): ScreenMeta {
  return {
    id: 'mistake',
    stage: 'manana',
    step: 'mistake',
    title: 'mistake.title',
    render(view, state, params: Record<string, string> = {}) {
      const knotId = params.k || params.knot || getCurrentThread() || 'M4';
      const mistakeData = getLesson(knotId)?.mistake;
      if (!mistakeData) {
        renderLessonMissing(view, knotId, 'mistake');
        return;
      }

      enterThread(knotId, 'mistake', { k: knotId });

      if (state.knot !== knotId) {
        state.knot = knotId;
        state.found = false;
        state.fine = [];
      }

      const key = (k: string) => `mistake.${knotId}.${k}`;
      const picture = getVisuals(knotId).mistake;
      if (!picture) console.error(`No Spot-the-mistake picture for ${knotId}`);

      const say = el('p', { class: 'say', hidden: true });
      const pictureHolder = el('div', { class: 'model' });
      const after = el('div', { class: 'after' });
      const list = el('div', { class: 'work-steps' });

      function paint(): void {
        clear(list);
        for (let n = 0; n < mistakeData!.steps; n++) list.appendChild(createStepButton(n));

        clear(pictureHolder);
        clear(after);
        if (!state.found) return;

        if (picture) pictureHolder.appendChild(picture(true));
        after.appendChild(markupLine(t(key('eq'))));
        after.appendChild(
          el('div', { class: 'btn-row' }, [
            el('button', {
              class: 'btn primary block',
              type: 'button',
              text: t('common.explain'),
              onclick: () => router.go('explain', { k: knotId }),
            }),
          ])
        );
      }

      function createStepButton(i: number): HTMLElement {
        const fineList = (state.fine as number[]) || [];
        const isFound = state.found && i === mistakeData!.wrong;
        const isFine = fineList.includes(i);
        const cls = isFound ? 'found' : isFine ? 'fine' : '';

        return el(
          'button',
          {
            class: cls,
            type: 'button',
            onclick: () => {
              if (state.found) return;
              if (i === mistakeData!.wrong) {
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
        if (speak) voice.say(text);
      }

      view.appendChild(el('p', { class: 'muted small', text: t(`knot.${knotId}.t`) }));
      view.appendChild(el('p', { text: t(key('intro')) }));
      view.appendChild(list);
      view.appendChild(say);
      view.appendChild(pictureHolder);
      view.appendChild(after);

      paint();

      if (state.found) updateSay(t(key('found')), false);
    },
  };
}
