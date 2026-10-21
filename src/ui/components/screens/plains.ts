/**
 * C5 "The northern plains" bench: let it rain and watch the river carry silt down, send floods until
 * the low land is a flat plain, then put the five links of the chain in order.
 */

import {
  FLOODS_TO_FILL,
  SILT_CHAIN,
  isChainOrder,
  isFlatPlain,
  layersAfter,
  type SiltLink,
} from '../../../domain/world/plains';
import { t } from '../../../domain/i18n/core';
import { tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import { actionButton, lokaFrame, mistakeRow, orderPad, type Choice } from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { renderPlain } from '../../diagrams/loka/plains';
import type { ScreenMeta } from '../app/router';

/** Shown out of order so the child has to think about cause and effect. */
const SHUFFLED: readonly SiltLink[] = ['flood', 'crops', 'rain', 'layer', 'pickup'];

export function createPlainsScreen(): ScreenMeta {
  return {
    id: 'plains',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'plains.title',
    render(view, state, params = {}) {
      enterThread('C5', 'plains', params);
      let step = readStep(params.step, state.step, 3);
      let floods =
        typeof state.floods === 'number' ? state.floods : step === 3 ? FLOODS_TO_FILL : 0;
      let silt: number | null = null;
      let rained = false;
      const ordered = (state.ordered as SiltLink[]) || [];
      let playing = false;
      state.ordered = ordered;

      const f = lokaFrame(view, 'plains.title');
      const linkChoice = (l: SiltLink): Choice => ({ id: l, text: t(`plains.link.${l}`) });

      function flood(): void {
        floods += 1;
        state.floods = floods;
        if (isFlatPlain(floods)) {
          f.setSay(t('plains.s2done'));
          step = 3;
        } else {
          f.setSay(t('plains.layered', { n: layersAfter(floods) }));
        }
        paint();
      }

      function place(id: string): void {
        const l = id as SiltLink;
        if (!isChainOrder([...ordered, l])) {
          f.setSay(t('plains.chainHint'));
          return;
        }
        ordered.push(l);
        f.setSay(ordered.length === SILT_CHAIN.length ? t('plains.s3done') : t(`plains.link.${l}`));
        paint();
      }

      function paint(): void {
        state.step = step;
        f.setGuide(step, t(`plains.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderPlain({ silt }));
            f.actions.appendChild(
              rained
                ? actionButton(t('plains.toFloods'), () => {
                    step = 2;
                    floods = 0;
                    state.floods = 0;
                    paint();
                  })
                : actionButton(t('plains.showMe'), play)
            );
          } else if (step === 2) {
            f.model.appendChild(renderPlain({ layers: layersAfter(floods) }));
            f.actions.appendChild(actionButton(t('plains.flood'), flood));
          } else {
            const done = ordered.length === SILT_CHAIN.length;
            f.model.appendChild(renderPlain({ layers: FLOODS_TO_FILL, crops: done }));
            if (done) {
              f.actions.appendChild(mistakeRow('C5'));
              return;
            }
            f.actions.appendChild(
              orderPad(
                t('plains.s3'),
                SHUFFLED.filter((l) => !ordered.includes(l)).map(linkChoice),
                ordered.map(linkChoice),
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
          2600,
          (p) => {
            silt = p;
            f.model.replaceChildren(renderPlain({ silt }));
          },
          () => {
            playing = false;
            rained = true;
            silt = 1;
            f.setSay(t('plains.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
