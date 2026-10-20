/**
 * Q3 "Pollution and us" bench: watch a river village's day switch five causes on, switch them off
 * until air, water, land and noise are clean, then sort waste into the green and blue bins.
 */

import {
  POLLUTION_CAUSES,
  WASTE_BINS,
  WASTE_ITEMS,
  binFor,
  isAllClean,
  type PollutionCause,
  type WasteBin,
  type WasteItem,
} from '../../../domain/world/pollution';
import { t } from '../../../domain/i18n/core';
import { el, tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import { actionButton, lokaFrame, mistakeRow, pairPad, type Choice } from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { renderBins, renderVillage } from '../../diagrams/loka/river';
import type { ScreenMeta } from '../app/router';

export function createRiverScreen(): ScreenMeta {
  return {
    id: 'river',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'river.title',
    render(view, state, params = {}) {
      enterThread('Q3', 'river', params);
      let step = readStep(params.step, state.step, 3);
      const saved = state.active as PollutionCause[] | undefined;
      let active: PollutionCause[] =
        step === 1 ? [] : saved && !isAllClean(saved) ? saved : [...POLLUTION_CAUSES];
      const sorted = (state.sorted as Partial<Record<WasteItem, WasteBin>>) || {};
      let selected: string | null = null;
      let playing = false;
      state.sorted = sorted;

      const f = lokaFrame(view, 'river.title');
      const wasteText = (w: WasteItem) => t(`river.w.${w}`);

      function toggle(c: PollutionCause): void {
        const on = active.includes(c);
        active = on ? active.filter((x) => x !== c) : [...active, c];
        if (isAllClean(active)) {
          f.setSay(t('river.s2done'));
          step = 3;
        } else {
          f.setSay(t(on ? `river.off.${c}` : 'river.onAgain'));
        }
        paint();
      }

      function paint(): void {
        state.step = step;
        if (step > 1) state.active = active;
        f.setGuide(step, t(`river.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderVillage({ active }));
            f.actions.appendChild(actionButton(t('river.showMe'), play));
          } else if (step === 2) {
            f.model.appendChild(renderVillage({ active }));
            f.actions.appendChild(
              el(
                'div',
                { class: 'loka-choices', role: 'group', 'aria-label': t('river.s2') },
                POLLUTION_CAUSES.map((c) =>
                  el('button', {
                    class: 'chip loka-chip',
                    type: 'button',
                    'data-focus': `cause:${c}`,
                    'aria-pressed': String(active.includes(c)),
                    text: t(`river.c.${c}`),
                    onclick: () => toggle(c),
                  })
                )
              )
            );
          } else {
            const placed: Record<string, Choice[]> = {};
            const inBins: Partial<Record<WasteBin, WasteItem[]>> = {};
            for (const b of WASTE_BINS) {
              const items = WASTE_ITEMS.filter((w) => sorted[w] === b);
              inBins[b] = items;
              placed[b] = items.map((w) => ({ id: w, text: wasteText(w) }));
            }
            f.model.appendChild(renderBins(inBins));
            const all = WASTE_ITEMS.every((w) => sorted[w]);
            if (!all) {
              f.actions.appendChild(
                pairPad({
                  label: t('river.s3'),
                  items: WASTE_ITEMS.filter((w) => !sorted[w]).map((w) => ({
                    id: w,
                    text: wasteText(w),
                  })),
                  places: WASTE_BINS.map((b) => ({ id: b, text: t(`river.bin.${b}`) })),
                  placed,
                  selected,
                  onSelect(id) {
                    selected = id;
                    paint();
                  },
                  onPlace(item, place) {
                    const w = item as WasteItem;
                    f.setSay(t(`river.w.${w}.why`));
                    if (binFor(w) !== place) return;
                    sorted[w] = place as WasteBin;
                    selected = null;
                    if (WASTE_ITEMS.every((x) => sorted[x])) f.setSay(t('river.s3done'));
                    paint();
                  },
                })
              );
            } else {
              f.actions.appendChild(mistakeRow('Q3'));
            }
          }
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        const n = POLLUTION_CAUSES.length;
        tween(
          2600,
          (p) => {
            const count = Math.min(n, Math.floor(p * n + 0.999));
            if (count !== active.length) {
              active = POLLUTION_CAUSES.slice(0, count);
              f.model.replaceChildren(renderVillage({ active, highlight: active[count - 1] }));
            }
          },
          () => {
            playing = false;
            active = [...POLLUTION_CAUSES];
            f.setSay(t('river.s1done'));
            step = 2;
            paint();
          }
        );
      }

      paint();
    },
  };
}
