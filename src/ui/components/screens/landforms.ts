/**
 * E3 "Mountains, plateaus, plains" bench: raise a cross-section from the sea, build each landform from
 * a height and a top, then choose where most people live and farm.
 */

import {
  LANDFORM_TARGETS,
  LAND_HEIGHTS,
  LAND_TOPS,
  MAIN_LANDFORMS,
  MOST_PEOPLE_LIVE_ON,
  landformOf,
  type LandHeight,
  type LandTop,
  type Landform,
} from '../../../domain/world/landforms';
import { t } from '../../../domain/i18n/core';
import { el, tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import { actionButton, choiceRow, lokaFrame, mistakeRow } from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { renderSection, renderShape } from '../../diagrams/loka/landforms';
import type { ScreenMeta } from '../app/router';

export function createLandformsScreen(): ScreenMeta {
  return {
    id: 'landforms',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'landforms.title',
    render(view, state, params = {}) {
      enterThread('E3', 'landforms', params);
      let step = readStep(params.step, state.step, 3);
      let rise = step > 1 ? 1 : 0;
      let height: LandHeight = (state.height as LandHeight) || 'low';
      let top: LandTop = (state.top as LandTop) || 'flat';
      let made = typeof state.made === 'number' ? state.made : 0;
      let chosen = (state.chosen as Landform | undefined) ?? null;
      let playing = false;

      const f = lokaFrame(view, 'landforms.title');

      function setShape(h: LandHeight, tp: LandTop): void {
        height = h;
        top = tp;
        const form = landformOf(height, top);
        const target = LANDFORM_TARGETS[made];
        if (form === target) {
          made++;
          if (made === LANDFORM_TARGETS.length) {
            f.setSay(t('landforms.s2done'));
            step = 3;
          } else {
            f.setSay(
              `${t(`landforms.is.${form}`)} ${t(`landforms.make.${LANDFORM_TARGETS[made]}`)}`
            );
          }
        } else {
          f.setSay(t(`landforms.is.${form}`));
        }
        paint();
      }

      function paint(): void {
        state.step = step;
        state.height = height;
        state.top = top;
        state.made = made;
        state.chosen = chosen;
        f.setGuide(step, t(`landforms.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderSection({ rise }));
            f.actions.appendChild(
              rise === 1
                ? actionButton(t('landforms.toBuild'), () => {
                    step = 2;
                    f.setSay(t(`landforms.make.${LANDFORM_TARGETS[made]}`));
                    paint();
                  })
                : actionButton(t('landforms.showMe'), play)
            );
          } else if (step === 2) {
            f.model.appendChild(renderShape(height, top));
            f.actions.appendChild(el('p', { class: 'loka-label', text: t('landforms.height') }));
            f.actions.appendChild(
              choiceRow(
                t('landforms.height'),
                LAND_HEIGHTS.map((h) => ({ id: h, text: t(`landforms.h.${h}`) })),
                (id) => setShape(id as LandHeight, top),
                height
              )
            );
            f.actions.appendChild(el('p', { class: 'loka-label', text: t('landforms.top') }));
            f.actions.appendChild(
              choiceRow(
                t('landforms.top'),
                LAND_TOPS.map((tp) => ({ id: tp, text: t(`landforms.t.${tp}`) })),
                (id) => setShape(height, id as LandTop),
                top
              )
            );
          } else {
            const done = chosen === MOST_PEOPLE_LIVE_ON;
            f.model.appendChild(renderSection({ rise: 1, highlight: chosen }));
            if (!done) {
              f.actions.appendChild(
                el('p', { class: 'loka-question', text: t('landforms.where') })
              );
              f.actions.appendChild(
                choiceRow(
                  t('landforms.where'),
                  MAIN_LANDFORMS.map((lf) => ({ id: lf, text: t(`landforms.n.${lf}`) })),
                  (id) => {
                    chosen = id as Landform;
                    f.setSay(
                      chosen === MOST_PEOPLE_LIVE_ON
                        ? t('landforms.s3done')
                        : t(`landforms.live.${chosen}`)
                    );
                    paint();
                  }
                )
              );
            } else {
              f.actions.appendChild(mistakeRow('E3'));
            }
          }
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        tween(
          2000,
          (p) => {
            rise = p;
            f.model.replaceChildren(renderSection({ rise }));
          },
          () => {
            playing = false;
            rise = 1;
            f.setSay(t('landforms.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
