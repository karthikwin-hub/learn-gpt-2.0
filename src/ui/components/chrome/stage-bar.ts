/**
 * The three movements of a lesson (Shravana, Manana, Nididhyasana) and current step.
 * On a workbench it also offers "What am I learning?", which reopens Bodha.
 */

import { t } from '../../../domain/i18n/core';
import type { LessonStage } from '../../../domain/lesson/types';
import { el } from '../../util/dom';
import { router } from '../app/router';
import { getCurrentThread } from '../../util/thread';

export function createStageBar(stage: LessonStage, step: string, isBench = false): HTMLElement {
  const stages: LessonStage[] = ['shravana', 'manana', 'nididhyasana'];
  const at = stages.indexOf(stage);

  const bar = el('nav', { class: 'stage-bar', 'aria-label': t('stage.label') }, [
    el(
      'ol',
      {},
      stages.map((s, i) =>
        el(
          'li',
          {
            class: i < at ? 'past' : i === at ? 'now' : '',
            'aria-current': i === at ? 'step' : null,
          },
          [
            el('span', { class: 'bead', 'aria-hidden': 'true' }),
            el('span', { text: t(`stage.${s}`) }),
          ]
        )
      )
    ),
  ]);

  const row = el('div', { class: 'stage-step' }, [el('span', { text: t(`step.${step}`) })]);

  const knot = getCurrentThread();
  if (isBench && knot) {
    const learnLink = el('button', {
      class: 'learn-link',
      type: 'button',
      text: t('stage.whatLearning'),
      onclick: () => {
        router.go('bodha', { k: knot });
      },
    });
    row.appendChild(learnLink);
  }

  bar.appendChild(row);
  return bar;
}
