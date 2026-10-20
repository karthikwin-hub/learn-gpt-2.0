/**
 * C1 "The states of India" bench: watch the 36 tiles appear, choose "my state" to see its capital,
 * main language and how many it touches, then tap each of its neighbours.
 */

import {
  EXAMPLE_REGION,
  REGIONS,
  STATE_COUNT,
  UT_COUNT,
  hasNeighbours,
  isNeighbour,
  nearButNotTouching,
  regionOf,
} from '../../../domain/world/states';
import { getLang, t } from '../../../domain/i18n/core';
import { el, tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import { actionButton, choiceRow, lokaFrame, mistakeRow } from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { renderIndia } from '../../diagrams/loka/states';
import type { ScreenMeta } from '../app/router';

/** Wrong choices offered beside the real neighbours. */
const NOT_NEIGHBOURS = 3;

const nameOf = (id: string) => t(`states.n.${id}`);

function byName(ids: readonly string[]): string[] {
  const lang = getLang();
  return [...ids].sort((a, b) => nameOf(a).localeCompare(nameOf(b), lang));
}

function factsOf(id: string): string {
  const r = regionOf(id);
  const vars = {
    name: nameOf(id),
    capital: t(`states.cap.${id}`),
    language: r.language ? t(`states.lang.${r.language}`) : '',
    n: r.neighbours.length,
  };
  const lang = r.language ? t('states.factLang', vars) : t('states.factMany', vars);
  const touch = !hasNeighbours(id)
    ? t('states.island', vars)
    : vars.n === 1
      ? t('states.factTouch1', vars)
      : t('states.factTouch', vars);
  return `${t('states.factCapital', vars)} ${lang} ${touch}`;
}

export function createStatesScreen(): ScreenMeta {
  return {
    id: 'states',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'states.title',
    render(view, state, params = {}) {
      enterThread('C1', 'states', params);
      let step = readStep(params.step, state.step, 3);
      let shown = step > 1 ? REGIONS.length : 0;
      let chosen = typeof state.chosen === 'string' ? state.chosen : null;
      if (chosen && !REGIONS.some((r) => r.id === chosen)) chosen = null;
      if (step === 3 && !chosen) chosen = EXAMPLE_REGION;
      let found = Array.isArray(state.found) ? (state.found as string[]) : [];
      let playing = false;

      const f = lokaFrame(view, 'states.title');

      function choose(id: string): void {
        chosen = id;
        found = [];
        f.setSay(factsOf(id));
        paint();
      }

      function tap(id: string): void {
        if (!chosen) return;
        const vars = { a: nameOf(id), b: nameOf(chosen) };
        if (!isNeighbour(chosen, id)) {
          f.setSay(t('states.no', vars));
        } else {
          if (!found.includes(id)) found.push(id);
          f.setSay(
            found.length === regionOf(chosen).neighbours.length
              ? t('states.s3done', { name: vars.b, n: found.length })
              : t('states.yes', vars)
          );
        }
        paint();
      }

      function paint(): void {
        state.step = step;
        state.chosen = chosen;
        state.found = found;
        f.setGuide(step, t(`states.s${step}`));
        f.repaint(() => {
          if (step === 1) {
            f.model.appendChild(renderIndia({ shown }));
            f.actions.appendChild(
              shown === REGIONS.length
                ? actionButton(t('states.toPick'), () => {
                    step = 2;
                    paint();
                  })
                : actionButton(t('states.showMe'), play)
            );
          } else if (step === 2) {
            f.model.appendChild(
              renderIndia({ chosen, caption: chosen ? nameOf(chosen) : undefined })
            );
            const select = el(
              'select',
              {
                id: 'states-mine',
                class: 'loka-select',
                'data-focus': 'states:mine',
                onchange: (e: Event) => {
                  const v = (e.target as HTMLSelectElement).value;
                  if (v) choose(v);
                },
              },
              [
                el('option', { value: '', text: t('states.pick'), selected: !chosen }),
                ...byName(REGIONS.map((r) => r.id)).map((id) =>
                  el('option', { value: id, text: nameOf(id), selected: id === chosen })
                ),
              ]
            );
            f.actions.appendChild(
              el('label', { class: 'loka-label', for: 'states-mine', text: t('states.mine') })
            );
            f.actions.appendChild(select);
            if (chosen) {
              f.actions.appendChild(
                actionButton(t('states.toFind'), () => {
                  step = 3;
                  found = [];
                  f.setSay('');
                  paint();
                })
              );
            }
          } else {
            const home = chosen ?? EXAMPLE_REGION;
            const all = regionOf(home).neighbours;
            f.model.appendChild(renderIndia({ chosen: home, found, caption: nameOf(home) }));
            if (!hasNeighbours(home)) {
              f.setSay(t('states.island', { name: nameOf(home) }));
              f.actions.appendChild(mistakeRow('C1'));
            } else if (found.length === all.length) {
              f.actions.appendChild(mistakeRow('C1'));
            } else {
              f.actions.appendChild(
                el('p', { class: 'loka-question', text: t('states.which', { name: nameOf(home) }) })
              );
              const left = byName([
                ...all.filter((id) => !found.includes(id)),
                ...nearButNotTouching(home, NOT_NEIGHBOURS),
              ]);
              f.actions.appendChild(
                choiceRow(
                  t('states.which', { name: nameOf(home) }),
                  left.map((id) => ({ id, text: nameOf(id) })),
                  tap
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
          2000,
          (p) => {
            shown = Math.round(p * REGIONS.length);
            f.model.replaceChildren(renderIndia({ shown }));
          },
          () => {
            playing = false;
            shown = REGIONS.length;
            f.setSay(t('states.s1done', { states: STATE_COUNT, uts: UT_COUNT }));
            paint();
          }
        );
      }

      paint();
    },
  };
}
