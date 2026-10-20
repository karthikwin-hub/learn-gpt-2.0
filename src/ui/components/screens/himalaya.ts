/**
 * C4 "The Himalaya" bench: climb from the plains to the Himadri and watch the temperature fall, climb
 * again 1,000 metres at a time until water freezes, then put the three ranges in order from the plains.
 */

import {
  CLIMB_STEP,
  RANGES,
  TOP_HEIGHT,
  freezingStep,
  isFreezing,
  isRisingOrder,
  temperatureAt,
  type HimalayanRange,
} from '../../../domain/world/himalaya';
import { t } from '../../../domain/i18n/core';
import { tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import { actionButton, lokaFrame, mistakeRow, orderPad, type Choice } from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { formatHeight, formatTemperature, renderClimb } from '../../diagrams/loka/himalaya';
import type { ScreenMeta } from '../app/router';

/** Shown out of order so the child has to think about height. */
const SHUFFLED: readonly HimalayanRange[] = ['himadri', 'shivalik', 'himachal'];

export function createHimalayaScreen(): ScreenMeta {
  return {
    id: 'himalaya',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'himalaya.title',
    render(view, state, params = {}) {
      enterThread('C4', 'himalaya', params);
      let step = readStep(params.step, state.step, 3);
      let height: number | null =
        step === 1
          ? null
          : typeof state.height === 'number'
            ? state.height
            : step === 3
              ? freezingStep()
              : 0;
      let climbed = false;
      const ordered = (state.ordered as HimalayanRange[]) || [];
      let playing = false;
      state.ordered = ordered;

      const f = lokaFrame(view, 'himalaya.title');
      const rangeChoice = (r: HimalayanRange): Choice => ({ id: r, text: t(`himalaya.r.${r}`) });
      const reading = (h: number) =>
        t('himalaya.at', { h: formatHeight(h), t: formatTemperature(temperatureAt(h)) });

      function climb(): void {
        const h = Math.min((height ?? 0) + CLIMB_STEP, TOP_HEIGHT);
        height = h;
        state.height = h;
        if (isFreezing(h)) {
          f.setSay(`${reading(h)} ${t('himalaya.s2done')}`);
          step = 3;
        } else {
          f.setSay(reading(h));
        }
        paint();
      }

      function place(id: string): void {
        const r = id as HimalayanRange;
        if (!isRisingOrder([...ordered, r])) {
          f.setSay(t('himalaya.orderHint'));
          return;
        }
        ordered.push(r);
        f.setSay(
          ordered.length === RANGES.length ? t('himalaya.s3done') : t(`himalaya.about.${r}`)
        );
        paint();
      }

      function paint(): void {
        state.step = step;
        f.setGuide(step, t(`himalaya.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderClimb({ height }));
            f.actions.appendChild(
              climbed
                ? actionButton(t('himalaya.toSteps'), () => {
                    step = 2;
                    height = 0;
                    state.height = 0;
                    f.setSay(reading(0));
                    paint();
                  })
                : actionButton(t('himalaya.showMe'), play)
            );
          } else if (step === 2) {
            f.model.appendChild(renderClimb({ height }));
            f.actions.appendChild(actionButton(t('himalaya.up'), climb));
          } else {
            const last = ordered[ordered.length - 1] ?? null;
            f.model.appendChild(renderClimb({ height, highlight: last }));
            if (ordered.length === RANGES.length) {
              f.actions.appendChild(mistakeRow('C4'));
              return;
            }
            f.actions.appendChild(
              orderPad(
                t('himalaya.s3'),
                SHUFFLED.filter((r) => !ordered.includes(r)).map(rangeChoice),
                ordered.map(rangeChoice),
                place
              )
            );
          }
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        tween(
          3000,
          (p) => {
            const next = Math.round((p * TOP_HEIGHT) / 500) * 500;
            if (next !== height) {
              height = next;
              f.model.replaceChildren(renderClimb({ height }));
            }
          },
          () => {
            playing = false;
            climbed = true;
            height = TOP_HEIGHT;
            f.setSay(t('himalaya.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
