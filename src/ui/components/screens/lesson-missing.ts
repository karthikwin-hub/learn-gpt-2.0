/**
 * What a lesson screen shows when its knot has no lesson data (FR-003): a calm note and a way home,
 * plus a console error so the sweep fails instead of showing another knot's content.
 */

import { t } from '../../../domain/i18n/core';
import { el } from '../../util/dom';
import { router } from '../app/router';

export function renderLessonMissing(view: HTMLElement, knotId: string, screen: string): void {
  console.error(`No lesson data for knot "${knotId}" on the ${screen} screen`);
  view.appendChild(el('p', { class: 'say', text: t('lesson.missing') }));
  view.appendChild(
    el('div', { class: 'btn-row' }, [
      el('button', {
        class: 'btn primary block',
        type: 'button',
        text: t('stop.loom'),
        onclick: () => router.go('home'),
      }),
    ])
  );
}
