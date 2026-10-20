/**
 * C9 "Unity in diversity" bench: light up the mid-January harvest festivals across India, match four
 * festivals to their states, then five greetings, each in its own script, to their languages.
 */

import {
  FESTIVALS,
  FESTIVAL_REGION,
  GREETINGS,
  isFestivalOf,
  isGreetingIn,
  type HarvestFestival,
} from '../../../domain/world/unity';
import type { MainLanguage } from '../../../domain/world/states';
import { t } from '../../../domain/i18n/core';
import { tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import { actionButton, lokaFrame, mistakeRow, pairPad, type Choice } from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { renderIndia } from '../../diagrams/loka/states';
import { renderGreetings } from '../../diagrams/loka/unity';
import type { ScreenMeta } from '../app/router';

/** States in another order than the festivals, so the match is not read off the layout. */
const STATE_ORDER: readonly HarvestFestival[] = ['lohri', 'uttarayan', 'pongal', 'bihu'];
const LANGUAGE_ORDER: readonly MainLanguage[] = ['telugu', 'punjabi', 'hindi', 'bengali', 'tamil'];

export function createUnityScreen(): ScreenMeta {
  return {
    id: 'unity',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'unity.title',
    render(view, state, params = {}) {
      enterThread('C9', 'unity', params);
      let step = readStep(params.step, state.step, 3);
      const festivals = (state.festivals as HarvestFestival[]) || [];
      const greetings = (state.greetings as MainLanguage[]) || [];
      let lit = 0;
      let lighted = false;
      let selected: string | null = null;
      let playing = false;
      state.festivals = festivals;
      state.greetings = greetings;

      const f = lokaFrame(view, 'unity.title');
      const festivalChoice = (x: HarvestFestival): Choice => ({ id: x, text: t(`unity.f.${x}`) });
      const greetingChoice = (l: MainLanguage): Choice => {
        const g = GREETINGS.find((x) => x.language === l);
        if (!g) throw new Error(`No greeting for ${l}`);
        return { id: l, text: g.text, lang: g.tag };
      };
      const january = () => t('unity.january');

      function paint(): void {
        state.step = step;
        f.setGuide(step, t(`unity.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            const shownFestivals = FESTIVALS.slice(0, lighted ? FESTIVALS.length : lit);
            f.model.appendChild(
              renderIndia({
                found: shownFestivals.map((x) => FESTIVAL_REGION[x]),
                caption: january(),
              })
            );
            f.actions.appendChild(
              lighted
                ? actionButton(t('unity.toMatch'), () => {
                    step = 2;
                    paint();
                  })
                : actionButton(t('unity.showMe'), play)
            );
            return;
          }
          if (step === 2) {
            f.model.appendChild(
              renderIndia({ found: festivals.map((x) => FESTIVAL_REGION[x]), caption: january() })
            );
            const placed: Record<string, Choice[]> = {};
            for (const x of festivals) placed[FESTIVAL_REGION[x]] = [festivalChoice(x)];
            f.actions.appendChild(
              pairPad({
                label: t('unity.s2'),
                items: FESTIVALS.filter((x) => !festivals.includes(x)).map(festivalChoice),
                places: STATE_ORDER.map((x) => ({
                  id: FESTIVAL_REGION[x],
                  text: t(`states.n.${FESTIVAL_REGION[x]}`),
                })),
                placed,
                selected,
                onSelect(id) {
                  selected = id;
                  paint();
                },
                onPlace(item, place) {
                  const festival = item as HarvestFestival;
                  f.setSay(t(`unity.hint.${festival}`));
                  if (!isFestivalOf(festival, place)) return;
                  festivals.push(festival);
                  selected = null;
                  if (festivals.length === FESTIVALS.length) {
                    f.setSay(t('unity.s2done'));
                    step = 3;
                  }
                  paint();
                },
              })
            );
            return;
          }
          f.model.appendChild(renderGreetings({ matched: greetings }));
          if (greetings.length === GREETINGS.length) {
            f.actions.appendChild(mistakeRow('C9'));
            return;
          }
          const placed: Record<string, Choice[]> = {};
          for (const l of greetings) placed[l] = [greetingChoice(l)];
          f.actions.appendChild(
            pairPad({
              label: t('unity.s3'),
              items: GREETINGS.filter((g) => !greetings.includes(g.language)).map((g) =>
                greetingChoice(g.language)
              ),
              places: LANGUAGE_ORDER.map((l) => ({ id: l, text: t(`states.lang.${l}`) })),
              placed,
              selected,
              onSelect(id) {
                selected = id;
                paint();
              },
              onPlace(item, place) {
                const language = item as MainLanguage;
                if (!isGreetingIn(language, place)) {
                  f.setSay(t('unity.greetHint'));
                  return;
                }
                greetings.push(language);
                selected = null;
                f.setSay(
                  greetings.length === GREETINGS.length
                    ? t('unity.s3done')
                    : t('unity.greeted', { language: t(`states.lang.${language}`) })
                );
                paint();
              },
            })
          );
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        tween(
          2400,
          (p) => {
            const next = Math.min(FESTIVALS.length, Math.floor(p * (FESTIVALS.length + 1)));
            if (next !== lit) {
              lit = next;
              paint();
            }
          },
          () => {
            playing = false;
            lighted = true;
            f.setSay(t('unity.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
