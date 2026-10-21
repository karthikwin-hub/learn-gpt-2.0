/**
 * C7 "The peninsular plateau" bench: pour rain on the Western Ghats and watch it run east, choose the
 * sea for each east-flowing river, then for the two rivers that flow west through rift valleys.
 */

import {
  EAST_FLOWING,
  SEAS,
  WEST_FLOWING,
  seaOf,
  type PlateauRiver,
  type Sea,
} from '../../../domain/world/plateau';
import { t } from '../../../domain/i18n/core';
import { el, tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import { actionButton, choiceRow, lokaFrame, mistakeRow } from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { renderPlateau } from '../../diagrams/loka/plateau';
import type { ScreenMeta } from '../app/router';

export function createPlateauScreen(): ScreenMeta {
  return {
    id: 'plateau',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'plateau.title',
    render(view, state, params = {}) {
      enterThread('C7', 'plateau', params);
      let step = readStep(params.step, state.step, 3);
      const solved = (state.solved as PlateauRiver[]) || [];
      let pour: number | null = null;
      let poured = false;
      let playing = false;
      state.solved = solved;

      const f = lokaFrame(view, 'plateau.title');
      const riverName = (r: PlateauRiver) => t(`plateau.r.${r}`);

      function runOf(): Partial<Record<PlateauRiver, number>> {
        const run: Partial<Record<PlateauRiver, number>> = {};
        if (step > 1)
          for (const r of EAST_FLOWING) run[r] = solved.includes(r) || step === 3 ? 1 : 0;
        for (const r of WEST_FLOWING) if (solved.includes(r)) run[r] = 1;
        if (step === 1 && pour !== null) for (const r of EAST_FLOWING) run[r] = pour;
        return run;
      }

      function choose(river: PlateauRiver, sea: Sea): void {
        if (seaOf(river) !== sea) {
          f.setSay(t(`plateau.why.${seaOf(river)}`, { river: riverName(river) }));
          return;
        }
        solved.push(river);
        const list = step === 2 ? EAST_FLOWING : WEST_FLOWING;
        if (list.every((r) => solved.includes(r))) {
          f.setSay(t(`plateau.s${step}done`));
          if (step === 2) step = 3;
        } else {
          f.setSay(t('plateau.ran', { river: riverName(river), sea: t(`plateau.sea.${sea}`) }));
        }
        paint();
      }

      function paint(): void {
        state.step = step;
        f.setGuide(step, t(`plateau.s${step}`));
        f.repaint(() => {
          const list = step === 2 ? EAST_FLOWING : WEST_FLOWING;
          const next = step === 1 ? null : (list.find((r) => !solved.includes(r)) ?? null);
          f.model.appendChild(
            renderPlateau({ run: runOf(), rain: step === 1, rifts: step === 3, highlight: next })
          );
          if (step === 1) {
            f.actions.appendChild(
              poured
                ? actionButton(t('plateau.toSeas'), () => {
                    step = 2;
                    paint();
                  })
                : actionButton(t('plateau.showMe'), play)
            );
            return;
          }
          if (next === null) {
            f.actions.appendChild(mistakeRow('C7'));
            return;
          }
          const question = t('plateau.which', { river: riverName(next) });
          f.actions.appendChild(el('p', { class: 'loka-question', text: question }));
          f.actions.appendChild(
            choiceRow(
              question,
              SEAS.map((s) => ({ id: s, text: t(`plateau.sea.${s}`) })),
              (id) => choose(next, id as Sea)
            )
          );
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        tween(
          2400,
          (p) => {
            pour = p;
            f.model.replaceChildren(renderPlateau({ run: runOf(), rain: true }));
          },
          () => {
            playing = false;
            poured = true;
            pour = 1;
            f.setSay(t('plateau.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
