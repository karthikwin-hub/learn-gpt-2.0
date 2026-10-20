/**
 * C8 "Rivers of India" bench: follow the Ganga from its source to its mouth with the height of each
 * place, tap the places in the order the water passes them, then find which river still flows in April.
 */

import {
  DRY_MONTH,
  GANGA_PLACES,
  RIVER_FEEDS,
  flowsIn,
  isDownstreamOrder,
  type GangaPlace,
  type RiverFeed,
} from '../../../domain/world/rivers';
import { t } from '../../../domain/i18n/core';
import { el, tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import {
  actionButton,
  choiceRow,
  lokaFrame,
  mistakeRow,
  orderPad,
  type Choice,
} from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { placeText, renderFlow, renderGanga } from '../../diagrams/loka/rivers';
import type { ScreenMeta } from '../app/router';

/** Shown out of order so the child has to think about height, not position on the screen. */
const SHUFFLED: readonly GangaPlace[] = [
  'patna',
  'gangotri',
  'varanasi',
  'sundarbans',
  'haridwar',
  'prayagraj',
];

export function createRiversScreen(): ScreenMeta {
  return {
    id: 'rivers',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'rivers.title',
    render(view, state, params = {}) {
      enterThread('C8', 'rivers', params);
      let step = readStep(params.step, state.step, 3);
      const ordered = (state.ordered as GangaPlace[]) || [];
      let drawn = 0;
      let followed = false;
      let answered = state.answered === true;
      let playing = false;
      state.ordered = ordered;

      const f = lokaFrame(view, 'rivers.title');
      const placeChoice = (p: GangaPlace): Choice => ({ id: p, text: t(`rivers.p.${p}`) });

      function place(id: string): void {
        const p = id as GangaPlace;
        if (!isDownstreamOrder([...ordered, p])) {
          f.setSay(t('rivers.downhill'));
          return;
        }
        ordered.push(p);
        if (ordered.length === GANGA_PLACES.length) {
          f.setSay(t('rivers.s2done'));
          step = 3;
        } else {
          f.setSay(placeText(p));
        }
        paint();
      }

      function choose(feed: RiverFeed): void {
        if (!flowsIn(feed, DRY_MONTH)) {
          f.setSay(t('rivers.noRain'));
          return;
        }
        answered = true;
        state.answered = true;
        f.setSay(t('rivers.s3done'));
        paint();
      }

      function paint(): void {
        state.step = step;
        f.setGuide(step, t(`rivers.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderGanga({ drawn, shown: followed ? GANGA_PLACES : [] }));
            f.actions.appendChild(
              followed
                ? actionButton(t('rivers.toOrder'), () => {
                    step = 2;
                    paint();
                  })
                : actionButton(t('rivers.showMe'), play)
            );
          } else if (step === 2) {
            const passed = GANGA_PLACES.indexOf(ordered[ordered.length - 1] ?? 'gangotri');
            f.model.appendChild(
              renderGanga({
                drawn: ordered.length ? passed / (GANGA_PLACES.length - 1) : 0,
                shown: ordered,
                highlight: ordered[ordered.length - 1] ?? null,
              })
            );
            f.actions.appendChild(
              orderPad(
                t('rivers.s2'),
                SHUFFLED.filter((p) => !ordered.includes(p)).map(placeChoice),
                ordered.map(placeChoice),
                place
              )
            );
          } else {
            f.model.appendChild(renderFlow({ month: DRY_MONTH }));
            if (answered) {
              f.actions.appendChild(mistakeRow('C8'));
              return;
            }
            const question = t('rivers.which');
            f.actions.appendChild(el('p', { class: 'loka-question', text: question }));
            f.actions.appendChild(
              choiceRow(
                question,
                RIVER_FEEDS.map((r) => ({ id: r, text: t(`rivers.feed.${r}`) })),
                (id) => choose(id as RiverFeed)
              )
            );
          }
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        tween(
          2800,
          (p) => {
            drawn = p;
            const reached = GANGA_PLACES.slice(0, Math.floor(p * (GANGA_PLACES.length - 1)) + 1);
            f.model.replaceChildren(renderGanga({ drawn, shown: reached }));
          },
          () => {
            playing = false;
            followed = true;
            drawn = 1;
            f.setSay(t('rivers.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
