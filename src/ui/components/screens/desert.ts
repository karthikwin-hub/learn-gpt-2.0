/**
 * C6 "The Thar Desert" bench: run one summer day beside a seaside town, find the coldest Thar time by
 * choosing a season and an hour, then match four desert things to how each helps.
 */

import {
  DESERT_HOURS,
  DESERT_SEASONS,
  DESERT_THINGS,
  COOLEST_HOUR,
  WARMEST_HOUR,
  helpsWith,
  isColdEnough,
  type DesertSeason,
  type DesertThing,
} from '../../../domain/world/desert';
import { t } from '../../../domain/i18n/core';
import { tween } from '../../util/dom';
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
import { desertReading, renderDay } from '../../diagrams/loka/desert';
import type { ScreenMeta } from '../app/router';

export function createDesertScreen(): ScreenMeta {
  return {
    id: 'desert',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'desert.title',
    render(view, state, params = {}) {
      enterThread('C6', 'desert', params);
      let step = readStep(params.step, state.step, 3);
      let season: DesertSeason = (state.season as DesertSeason) || 'summer';
      let hour = typeof state.hour === 'number' ? state.hour : 15;
      let ran = false;
      const matched = (state.matched as DesertThing[]) || [];
      let selected: string | null = null;
      let playing = false;
      state.matched = matched;

      const f = lokaFrame(view, 'desert.title');

      function choose(nextSeason: DesertSeason, nextHour: number): void {
        season = nextSeason;
        hour = nextHour;
        state.season = season;
        state.hour = hour;
        if (isColdEnough(season, hour)) {
          f.setSay(`${desertReading(season, hour)} ${t('desert.s2done')}`);
          step = 3;
        } else {
          f.setSay(desertReading(season, hour));
        }
        paint();
      }

      function paint(): void {
        state.step = step;
        f.setGuide(step, t(`desert.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderDay({ season: 'summer', hour, swing: ran }));
            f.actions.appendChild(
              ran
                ? actionButton(t('desert.toFind'), () => {
                    step = 2;
                    hour = WARMEST_HOUR;
                    state.hour = hour;
                    paint();
                  })
                : actionButton(t('desert.showMe'), play)
            );
          } else if (step === 2) {
            f.model.appendChild(renderDay({ season, hour }));
            f.actions.appendChild(
              choiceRow(
                t('desert.season'),
                DESERT_SEASONS.map((s) => ({ id: s, text: t(`desert.season.${s}`) })),
                (id) => choose(id as DesertSeason, hour),
                season
              )
            );
            f.actions.appendChild(
              choiceRow(
                t('desert.hour'),
                DESERT_HOURS.map((h) => ({ id: String(h), text: t(`desert.h.${h}`) })),
                (id) => choose(season, Number(id)),
                String(hour)
              )
            );
          } else {
            f.model.appendChild(renderDay({ season: 'winter', hour: COOLEST_HOUR }));
            if (matched.length === DESERT_THINGS.length) {
              f.actions.appendChild(mistakeRow('C6'));
              return;
            }
            const placed: Record<string, Choice[]> = {};
            for (const m of matched) placed[m] = [{ id: m, text: t(`desert.thing.${m}`) }];
            f.actions.appendChild(
              pairPad({
                label: t('desert.s3'),
                items: DESERT_THINGS.filter((d) => !matched.includes(d)).map((d) => ({
                  id: d,
                  text: t(`desert.thing.${d}`),
                })),
                places: DESERT_THINGS.map((d) => ({ id: d, text: t(`desert.help.${d}`) })),
                placed,
                selected,
                onSelect(id) {
                  selected = id;
                  paint();
                },
                onPlace(item, place) {
                  const thing = item as DesertThing;
                  if (!helpsWith(thing, place)) {
                    f.setSay(t(`desert.hint.${thing}`));
                    return;
                  }
                  matched.push(thing);
                  selected = null;
                  f.setSay(
                    matched.length === DESERT_THINGS.length
                      ? t('desert.s3done')
                      : t(`desert.why.${thing}`)
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
          3000,
          (p) => {
            const next = Math.floor(COOLEST_HOUR + p * 24) % 24;
            if (next !== hour) {
              hour = next;
              f.model.replaceChildren(renderDay({ season: 'summer', hour }));
            }
          },
          () => {
            playing = false;
            ran = true;
            hour = COOLEST_HOUR;
            f.setSay(t('desert.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
