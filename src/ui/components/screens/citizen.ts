/**
 * Q2 "A good citizen" bench: see a park with and without care, pair each right with its responsibility,
 * then choose the careful action in three everyday situations.
 */

import {
  DUTIES,
  RIGHTS,
  SITUATIONS,
  dutyFor,
  isCareful,
  type CareAction,
  type Duty,
  type Right,
} from '../../../domain/world/citizenship';
import { t } from '../../../domain/i18n/core';
import { el, tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import {
  actionButton,
  choiceRow,
  lokaFrame,
  mistakeRow,
  pairPad,
  type Choice,
} from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { renderPairs, renderParks } from '../../diagrams/loka/citizen';
import type { ScreenMeta } from '../app/router';

export function createCitizenScreen(): ScreenMeta {
  return {
    id: 'citizen',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'citizen.title',
    render(view, state, params = {}) {
      enterThread('Q2', 'citizen', params);
      let step = readStep(params.step, state.step, 3);
      let shown = step > 1 ? 2 : 0;
      const paired = (state.paired as Right[]) || [];
      let solved = typeof state.solved === 'number' ? state.solved : 0;
      let selected: string | null = null;
      let playing = false;
      state.paired = paired;

      const f = lokaFrame(view, 'citizen.title');
      const dutyText = (d: Duty) => t(`citizen.duty.${d}`);

      function paint(): void {
        state.step = step;
        state.solved = solved;
        f.setGuide(step, t(`citizen.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderParks(shown));
            f.actions.appendChild(
              shown === 2
                ? actionButton(t('citizen.toPairs'), () => {
                    step = 2;
                    paint();
                  })
                : actionButton(t('citizen.showMe'), play)
            );
          } else if (step === 2) {
            f.model.appendChild(renderPairs(paired, paired[paired.length - 1]));
            f.actions.appendChild(
              pairPad({
                label: t('citizen.s2'),
                items: DUTIES.filter((d) => !paired.some((r) => dutyFor(r) === d)).map((d) => ({
                  id: d,
                  text: dutyText(d),
                })),
                places: RIGHTS.map((r): Choice => ({ id: r, text: t(`citizen.right.${r}`) })),
                placed: Object.fromEntries(
                  RIGHTS.map((r) => [
                    r,
                    paired.includes(r) ? [{ id: dutyFor(r), text: dutyText(dutyFor(r)) }] : [],
                  ])
                ),
                selected,
                onSelect(id) {
                  selected = id;
                  paint();
                },
                onPlace(item, place) {
                  const right = place as Right;
                  if (paired.includes(right) || dutyFor(right) !== item) {
                    f.setSay(t('citizen.miss'));
                    return;
                  }
                  paired.push(right);
                  selected = null;
                  const all = paired.length === RIGHTS.length;
                  f.setSay(all ? t('citizen.s2done') : t(`citizen.pair.${right}`));
                  if (all) step = 3;
                  paint();
                },
              })
            );
          } else {
            const sit = SITUATIONS[solved];
            f.model.appendChild(renderPairs(RIGHTS, sit ? sit.right : null));
            if (sit) {
              f.actions.appendChild(
                choiceRow(
                  t(`citizen.sit.${sit.id}`),
                  sit.actions.map((a) => ({ id: a, text: t(`citizen.act.${a}`) })),
                  (id) => {
                    const action = id as CareAction;
                    if (!isCareful(sit.id, action)) {
                      f.setSay(t(`citizen.why.${action}`));
                      return;
                    }
                    solved++;
                    f.setSay(
                      solved === SITUATIONS.length
                        ? t('citizen.s3done')
                        : t(`citizen.why.${action}`)
                    );
                    paint();
                  }
                )
              );
              f.actions.prepend(
                el('p', { class: 'loka-question', text: t(`citizen.sit.${sit.id}`) })
              );
            } else {
              f.actions.appendChild(mistakeRow('Q2'));
            }
          }
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        tween(
          1800,
          (p) => {
            const next = Math.min(2, Math.floor(p * 2 + 0.999));
            if (next !== shown) {
              shown = next;
              f.model.replaceChildren(renderParks(shown));
            }
          },
          () => {
            playing = false;
            shown = 2;
            f.setSay(t('citizen.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
