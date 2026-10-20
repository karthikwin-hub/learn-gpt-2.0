/**
 * C3 "Cities of India" bench: let time pass on a river bank, try six places to build and hear what
 * each lacks, then match four big cities to the reason each grew.
 */

import {
  BIG_CITIES,
  SITE_IDS,
  grewBecause,
  growsInto,
  siteLacks,
  sizeOverTime,
  type BigCity,
  type SettlementSize,
  type SiteId,
} from '../../../domain/world/settlements';
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
import { renderLand } from '../../diagrams/loka/cities';
import type { ScreenMeta } from '../app/router';

export function createCitiesScreen(): ScreenMeta {
  return {
    id: 'cities',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'cities.title',
    render(view, state, params = {}) {
      enterThread('C3', 'cities', params);
      let step = readStep(params.step, state.step, 3);
      let river: SettlementSize | null = step > 1 ? 'city' : null;
      const tried = (state.tried as Partial<Record<SiteId, SettlementSize>>) || {};
      const matched = (state.matched as BigCity[]) || [];
      let chosen: SiteId | null = null;
      let selected: string | null = null;
      let playing = false;
      state.tried = tried;
      state.matched = matched;

      const f = lokaFrame(view, 'cities.title');
      const siteText = (id: SiteId) =>
        t('cities.pick', { n: SITE_IDS.indexOf(id) + 1, name: t(`cities.site.${id}`) });

      function tryAt(id: SiteId): void {
        const size = growsInto(id);
        tried[id] = size;
        chosen = id;
        const lacks = siteLacks(id).map((n) => t(`cities.no.${n}`));
        f.setSay([t(`cities.grew.${size}`), ...lacks].join(' '));
        if (size === 'city') {
          f.setSay(t('cities.s2done'));
          step = 3;
        }
        paint();
      }

      function paint(): void {
        state.step = step;
        f.setGuide(step, t(`cities.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderLand({ grown: river ? { riverbank: river } : {} }));
            f.actions.appendChild(
              river === 'city'
                ? actionButton(t('cities.toTry'), () => {
                    step = 2;
                    paint();
                  })
                : actionButton(t('cities.showMe'), play)
            );
          } else if (step === 2) {
            f.model.appendChild(renderLand({ grown: tried, chosen }));
            f.actions.appendChild(el('p', { class: 'loka-question', text: t('cities.where') }));
            f.actions.appendChild(
              choiceRow(
                t('cities.where'),
                SITE_IDS.map((id) => ({ id, text: siteText(id) })),
                (id) => tryAt(id as SiteId),
                chosen ?? ''
              )
            );
          } else {
            f.model.appendChild(
              renderLand({ grown: { ...tried, riverbank: 'city' }, chosen: 'riverbank' })
            );
            if (matched.length === BIG_CITIES.length) {
              f.actions.appendChild(mistakeRow('C3'));
              return;
            }
            const placed: Record<string, Choice[]> = {};
            for (const c of matched) placed[c] = [{ id: c, text: t(`cities.c.${c}`) }];
            f.actions.appendChild(
              pairPad({
                label: t('cities.s3'),
                items: BIG_CITIES.filter((c) => !matched.includes(c)).map((c) => ({
                  id: c,
                  text: t(`cities.c.${c}`),
                })),
                places: BIG_CITIES.map((c) => ({ id: c, text: t(`cities.r.${c}`) })),
                placed,
                selected,
                onSelect(id) {
                  selected = id;
                  paint();
                },
                onPlace(item, place) {
                  const city = item as BigCity;
                  if (!grewBecause(city, place)) {
                    f.setSay(t(`cities.hint.${city}`));
                    return;
                  }
                  matched.push(city);
                  selected = null;
                  f.setSay(
                    matched.length === BIG_CITIES.length
                      ? t('cities.s3done')
                      : t(`cities.hint.${city}`)
                  );
                  paint();
                },
              })
            );
          }
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        tween(
          2400,
          (p) => {
            const next = sizeOverTime(p);
            if (next !== river) {
              river = next;
              f.model.replaceChildren(renderLand({ grown: { riverbank: river } }));
            }
          },
          () => {
            playing = false;
            river = 'city';
            f.setSay(t('cities.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
