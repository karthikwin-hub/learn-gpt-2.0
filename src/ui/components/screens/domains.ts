/**
 * E2 "Land, water, air and life" bench: fill a 100-square Earth, sort eight things into the four
 * domains, then pour the salty and frozen water out of a 100-drop jug to see how little is left to use.
 */

import {
  SPHERES,
  SPHERE_THINGS,
  SURFACE_PARTS,
  WATER_DROPS,
  dropsLeft,
  sphereOf,
  type Sphere,
  type SphereThing,
  type WaterStore,
} from '../../../domain/world/spheres';
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
import { renderJug, renderSpheres, renderSurface } from '../../diagrams/loka/spheres';
import type { ScreenMeta } from '../app/router';

/** Answers offered for the drops left; the first two are the usual slips. */
const LEFT_OPTIONS = [71, 10, 1] as const;

export function createDomainsScreen(): ScreenMeta {
  return {
    id: 'domains',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'domains.title',
    render(view, state, params = {}) {
      enterThread('E2', 'domains', params);
      let step = readStep(params.step, state.step, 3);
      let filled = step > 1 ? SURFACE_PARTS : 0;
      const sorted = (state.sorted as Partial<Record<SphereThing, Sphere>>) || {};
      const poured = (state.poured as WaterStore[]) || [];
      let answered = state.answered === true;
      let selected: string | null = null;
      let lastSphere: Sphere | null = null;
      let playing = false;
      state.sorted = sorted;
      state.poured = poured;

      const f = lokaFrame(view, 'domains.title');
      const thingText = (x: SphereThing) => t(`domains.t.${x}`);

      function pour(store: WaterStore): void {
        if (!poured.includes(store)) poured.push(store);
        f.setSay(t(`domains.poured.${store}`, { n: WATER_DROPS[store], left: dropsLeft(poured) }));
        paint();
      }

      function paint(): void {
        state.step = step;
        state.answered = answered;
        f.setGuide(step, t(`domains.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderSurface(filled));
            f.actions.appendChild(
              filled === SURFACE_PARTS
                ? actionButton(t('domains.toSort'), () => {
                    step = 2;
                    paint();
                  })
                : actionButton(t('domains.showMe'), play)
            );
          } else if (step === 2) {
            f.model.appendChild(renderSpheres(lastSphere));
            const placed: Record<string, Choice[]> = {};
            for (const sp of SPHERES) {
              placed[sp] = SPHERE_THINGS.filter((x) => sorted[x] === sp).map((x) => ({
                id: x,
                text: thingText(x),
              }));
            }
            f.actions.appendChild(
              pairPad({
                label: t('domains.s2'),
                items: SPHERE_THINGS.filter((x) => !sorted[x]).map((x) => ({
                  id: x,
                  text: thingText(x),
                })),
                places: SPHERES.map((sp) => ({ id: sp, text: t(`domains.n.${sp}`) })),
                placed,
                selected,
                onSelect(id) {
                  selected = id;
                  paint();
                },
                onPlace(item, place) {
                  const thing = item as SphereThing;
                  f.setSay(t(`domains.t.${thing}.why`));
                  if (sphereOf(thing) !== place) return;
                  sorted[thing] = place as Sphere;
                  lastSphere = place as Sphere;
                  selected = null;
                  if (SPHERE_THINGS.every((x) => sorted[x])) {
                    f.setSay(t('domains.s2done'));
                    step = 3;
                  }
                  paint();
                },
              })
            );
          } else {
            const ready = poured.includes('salt') && poured.includes('ice');
            f.model.appendChild(renderJug({ poured, highlight: answered ? 'fresh' : null }));
            if (!poured.includes('salt')) {
              f.actions.appendChild(
                actionButton(t('domains.pourSalt', { n: WATER_DROPS.salt }), () => pour('salt'))
              );
            }
            if (!poured.includes('ice')) {
              f.actions.appendChild(
                actionButton(t('domains.pourIce', { n: WATER_DROPS.ice }), () => pour('ice'))
              );
            }
            if (ready && !answered) {
              f.actions.appendChild(
                el('p', { class: 'loka-question', text: t('domains.howMany') })
              );
              f.actions.appendChild(
                choiceRow(
                  t('domains.howMany'),
                  LEFT_OPTIONS.map((n) => ({ id: String(n), text: String(n) })),
                  (id) => {
                    if (Number(id) !== dropsLeft(poured)) {
                      f.setSay(t(`domains.left${id}`));
                      return;
                    }
                    answered = true;
                    f.setSay(t('domains.s3done'));
                    paint();
                  }
                )
              );
            }
            if (answered) f.actions.appendChild(mistakeRow('E2'));
          }
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        tween(
          2400,
          (p) => {
            const next = Math.min(SURFACE_PARTS, Math.round(p * SURFACE_PARTS));
            if (next !== filled) {
              filled = next;
              f.model.replaceChildren(renderSurface(filled));
            }
          },
          () => {
            playing = false;
            filled = SURFACE_PARTS;
            f.setSay(t('domains.s1done'));
            paint();
          }
        );
      }

      paint();
    },
  };
}
