/**
 * C2 "Farms of India" bench: turn the year to see the three crop seasons, sow six crops in their
 * seasons, then choose the crop for a field in July, November and April.
 */

import {
  CROPS,
  CROP_SEASONS,
  FIELD_CROPS,
  FIELDS,
  canSow,
  seasonOfCrop,
  type Crop,
  type CropSeason,
} from '../../../domain/world/farming';
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
import { renderYear } from '../../diagrams/loka/farms';
import type { ScreenMeta } from '../app/router';

const cropText = (c: Crop) => t(`farms.c.${c}`);

export function createFarmsScreen(): ScreenMeta {
  return {
    id: 'farms',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'farms.title',
    render(view, state, params = {}) {
      enterThread('C2', 'farms', params);
      let step = readStep(params.step, state.step, 3);
      let shown = step > 1 ? 12 : 0;
      let month: number | null = null;
      const sown = (state.sown as Partial<Record<Crop, CropSeason>>) || {};
      let field = typeof state.field === 'number' ? state.field : 0;
      let selected: string | null = null;
      let lastSeason: CropSeason | null = null;
      let playing = false;
      state.sown = sown;

      const f = lokaFrame(view, 'farms.title');

      function paint(): void {
        state.step = step;
        state.field = field;
        f.setGuide(step, t(`farms.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderYear({ shown, month }));
            f.actions.appendChild(
              shown === 12
                ? actionButton(t('farms.toSow'), () => {
                    step = 2;
                    paint();
                  })
                : actionButton(t('farms.showMe'), play)
            );
          } else if (step === 2) {
            f.model.appendChild(renderYear({ highlight: lastSeason }));
            const placed: Record<string, Choice[]> = {};
            for (const s of CROP_SEASONS) {
              placed[s] = CROPS.filter((c) => sown[c] === s).map((c) => ({
                id: c,
                text: cropText(c),
              }));
            }
            f.actions.appendChild(
              pairPad({
                label: t('farms.s2'),
                items: CROPS.filter((c) => !sown[c]).map((c) => ({ id: c, text: cropText(c) })),
                places: CROP_SEASONS.map((s) => ({
                  id: s,
                  text: t('farms.place', {
                    season: t(`farms.n.${s}`),
                    months: t(`farms.when.${s}`),
                  }),
                })),
                placed,
                selected,
                onSelect(id) {
                  selected = id;
                  paint();
                },
                onPlace(item, place) {
                  const crop = item as Crop;
                  f.setSay(t(`farms.c.${crop}.why`));
                  if (seasonOfCrop(crop) !== place) return;
                  sown[crop] = place as CropSeason;
                  lastSeason = place as CropSeason;
                  selected = null;
                  if (CROPS.every((c) => sown[c])) {
                    f.setSay(t('farms.s2done'));
                    step = 3;
                  }
                  paint();
                },
              })
            );
          } else {
            const done = field >= FIELDS.length;
            const current = FIELDS[Math.min(field, FIELDS.length - 1)];
            if (!current) throw new Error('C2 needs at least one field');
            const m = current.month;
            f.model.appendChild(renderYear({ month: m, crop: done ? current.crop : null }));
            for (const sownField of FIELDS.slice(0, field)) {
              f.actions.appendChild(
                el('p', {
                  class: 'loka-label',
                  text: t('farms.sown', {
                    month: t(`farms.m${sownField.month}`),
                    crop: cropText(sownField.crop),
                  }),
                })
              );
            }
            if (done) {
              f.actions.appendChild(mistakeRow('C2'));
            } else {
              const ask = t('farms.field', { month: t(`farms.m${m}`) });
              f.actions.appendChild(el('p', { class: 'loka-question', text: ask }));
              f.actions.appendChild(
                choiceRow(
                  ask,
                  FIELD_CROPS.map((c) => ({ id: c, text: cropText(c) })),
                  (id) => {
                    const crop = id as Crop;
                    if (!canSow(crop, m)) {
                      f.setSay(t(`farms.c.${crop}.why`));
                      return;
                    }
                    field++;
                    f.setSay(
                      field === FIELDS.length ? t('farms.s3done') : t(`farms.c.${crop}.why`)
                    );
                    paint();
                  }
                )
              );
            }
          }
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        tween(
          3000,
          (p) => {
            const next = Math.max(1, Math.min(12, Math.ceil(p * 12)));
            if (next !== month) {
              month = next;
              shown = next;
              f.model.replaceChildren(renderYear({ shown, month }));
            }
          },
          () => {
            playing = false;
            shown = 12;
            month = null;
            f.setSay(t('farms.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
