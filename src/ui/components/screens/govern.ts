/**
 * Q1 "What is civics?" bench: see the three levels of government nest, sort everyday jobs to the level
 * that does them, then match whom grown-ups elect to each level.
 */

import {
  CIVIC_JOBS,
  GOV_LEVELS,
  REPRESENTATIVES,
  levelForJob,
  levelOfRepresentative,
  type CivicJob,
  type GovLevel,
  type Representative,
} from '../../../domain/world/civics';
import { t } from '../../../domain/i18n/core';
import { tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import { actionButton, lokaFrame, mistakeRow, pairPad, type Choice } from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { renderLevels } from '../../diagrams/loka/govern';
import type { ScreenMeta } from '../app/router';

const levelChoice = (l: GovLevel): Choice => ({ id: l, text: t(`govern.l.${l}`) });

export function createGovernScreen(): ScreenMeta {
  return {
    id: 'govern',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'govern.title',
    render(view, state, params = {}) {
      enterThread('Q1', 'govern', params);
      let step = readStep(params.step, state.step, 3);
      let shown = step > 1 ? 3 : 0;
      const jobs = (state.jobs as Partial<Record<CivicJob, GovLevel>>) || {};
      const reps = (state.reps as Partial<Record<Representative, GovLevel>>) || {};
      let selected: string | null = null;
      let playing = false;
      state.jobs = jobs;
      state.reps = reps;

      const f = lokaFrame(view, 'govern.title');

      function placedBy<K extends string>(
        done: Partial<Record<K, GovLevel>>,
        keys: readonly K[],
        label: (k: K) => string
      ): Record<string, Choice[]> {
        const out: Record<string, Choice[]> = {};
        for (const l of GOV_LEVELS) {
          out[l] = keys.filter((k) => done[k] === l).map((k) => ({ id: k, text: label(k) }));
        }
        return out;
      }

      const jobText = (j: CivicJob) => t(`govern.j.${j}`);
      const repText = (r: Representative) => t(`govern.r.${r}`);

      function paint(): void {
        state.step = step;
        f.setGuide(step, t(`govern.s${step}`));
        f.repaint(() => {
          f.model.appendChild(renderLevels({ shown, leaders: step === 3, highlight: null }));
          if (step === 1) {
            f.actions.appendChild(actionButton(t('govern.showMe'), play));
          } else if (step === 2) {
            f.actions.appendChild(
              pairPad({
                label: t('govern.s2'),
                items: CIVIC_JOBS.filter((j) => !jobs[j]).map((j) => ({ id: j, text: jobText(j) })),
                places: GOV_LEVELS.map(levelChoice),
                placed: placedBy(jobs, CIVIC_JOBS, jobText),
                selected,
                onSelect(id) {
                  selected = id;
                  paint();
                },
                onPlace(item, place) {
                  const job = item as CivicJob;
                  if (levelForJob(job) !== place) {
                    f.setSay(t('govern.miss'));
                    return;
                  }
                  jobs[job] = place as GovLevel;
                  selected = null;
                  const all = CIVIC_JOBS.every((j) => jobs[j]);
                  f.setSay(all ? t('govern.s2done') : t(`govern.j.${job}.why`));
                  if (all) step = 3;
                  paint();
                },
              })
            );
          } else {
            f.actions.appendChild(
              pairPad({
                label: t('govern.s3'),
                items: REPRESENTATIVES.filter((r) => !reps[r]).map((r) => ({
                  id: r,
                  text: repText(r),
                })),
                places: GOV_LEVELS.map(levelChoice),
                placed: placedBy(reps, REPRESENTATIVES, repText),
                selected,
                onSelect(id) {
                  selected = id;
                  paint();
                },
                onPlace(item, place) {
                  const rep = item as Representative;
                  if (levelOfRepresentative(rep) !== place) {
                    f.setSay(t('govern.missRep'));
                    return;
                  }
                  reps[rep] = place as GovLevel;
                  selected = null;
                  const all = REPRESENTATIVES.every((r) => reps[r]);
                  f.setSay(all ? t('govern.s3done') : t(`govern.r.${rep}.why`));
                  paint();
                },
              })
            );
            if (REPRESENTATIVES.every((r) => reps[r])) f.actions.appendChild(mistakeRow('Q1'));
          }
        });
      }

      function play(): void {
        if (playing) return;
        playing = true;
        tween(
          2100,
          (p) => {
            const next = Math.min(3, Math.floor(p * 3 + 0.999));
            if (next !== shown) {
              shown = next;
              f.model.replaceChildren(renderLevels({ shown }));
            }
          },
          () => {
            playing = false;
            shown = 3;
            f.setSay(t('govern.s1done'));
            step = 2;
            paint();
          }
        );
      }

      paint();
    },
  };
}
