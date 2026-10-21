/**
 * I1 "Clues from the past" bench: dig down through the layers, sort the clues into archaeological and
 * literary sources, then put the finds in order of age.
 */

import {
  CLUES,
  DIG_LAYERS,
  DUG,
  SOURCE_KINDS,
  kindOf,
  oldestOf,
  type ClueId,
  type SourceKind,
} from '../../../domain/world/sources';
import { t } from '../../../domain/i18n/core';
import { tween } from '../../util/dom';
import { readStep } from '../../util/bench';
import { actionButton, lokaFrame, mistakeRow, orderPad, pairPad } from '../../util/loka-bench';
import { enterThread } from '../../util/thread';
import { renderDig } from '../../diagrams/loka/dig';
import type { ScreenMeta } from '../app/router';

/** The finds in the order the child sees them for step 3 (not the answer). */
const ORDER_SHOWN: ClueId[] = ['coin', 'pot', 'seal', 'inscription'];

const clueChoice = (id: ClueId) => ({ id, text: t(`clues.c.${id}`) });

export function createDigScreen(): ScreenMeta {
  return {
    id: 'dig',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'clues.title',
    render(view, state, params = {}) {
      enterThread('I1', 'dig', params);
      let step = readStep(params.step, state.step, 3);
      let revealed = step > 1 ? DIG_LAYERS : 0;
      const sorted = (state.sorted as Partial<Record<ClueId, SourceKind>>) || {};
      const ordered = (state.ordered as ClueId[]) || [];
      let selected: ClueId | null = null;
      let digging = false;
      state.sorted = sorted;
      state.ordered = ordered;

      const f = lokaFrame(view, 'clues.title');

      function paint(): void {
        state.step = step;
        f.setGuide(step, t(`clues.s${step}`));
        f.repaint(() => {
          f.model.appendChild(
            renderDig({
              revealed,
              ages: step === 1 && revealed >= DIG_LAYERS,
              highlight: step === 2 ? selected : null,
              order: step === 3 ? ordered : undefined,
            })
          );
          if (step === 1) {
            f.actions.appendChild(actionButton(t('clues.showMe'), dig));
          } else if (step === 2) {
            const left = CLUES.filter((c) => !sorted[c.id]).map((c) => clueChoice(c.id));
            const placed: Record<string, { id: string; text: string }[]> = {};
            for (const k of SOURCE_KINDS) {
              placed[k] = CLUES.filter((c) => sorted[c.id] === k).map((c) => clueChoice(c.id));
            }
            f.actions.appendChild(
              pairPad({
                label: t('clues.s2'),
                items: left,
                places: SOURCE_KINDS.map((k) => ({ id: k, text: t(`clues.k.${k}`) })),
                placed,
                selected,
                onSelect(id) {
                  selected = id as ClueId | null;
                  paint();
                },
                onPlace(item, place) {
                  place2(item as ClueId, place as SourceKind);
                },
              })
            );
          } else {
            const remaining = ORDER_SHOWN.filter((id) => !ordered.includes(id));
            f.actions.appendChild(
              orderPad(t('clues.s3'), remaining.map(clueChoice), ordered.map(clueChoice), (id) =>
                pickOldest(id as ClueId)
              )
            );
            if (remaining.length === 0) f.actions.appendChild(mistakeRow('I1'));
          }
        });
      }

      function dig(): void {
        if (digging) return;
        digging = true;
        tween(
          2400,
          (p) => {
            const next = Math.min(DIG_LAYERS, Math.floor(p * DIG_LAYERS + 0.999));
            if (next !== revealed) {
              revealed = next;
              f.model.replaceChildren(renderDig({ revealed }));
            }
          },
          () => {
            digging = false;
            revealed = DIG_LAYERS;
            f.setSay(t('clues.s1done'));
            step = 2;
            paint();
          }
        );
      }

      function place2(id: ClueId, kind: SourceKind): void {
        if (kindOf(id) !== kind) {
          f.setSay(t(id === 'inscription' ? 'clues.missInscription' : 'clues.miss'));
          return;
        }
        sorted[id] = kind;
        selected = null;
        const allSorted = CLUES.every((c) => sorted[c.id]);
        f.setSay(allSorted ? t('clues.s2done') : t(`clues.fit.${id}`));
        if (allSorted) step = 3;
        paint();
      }

      function pickOldest(id: ClueId): void {
        const left = DUG.filter((d) => !ordered.includes(d));
        if (id !== oldestOf(left)) {
          f.setSay(t('clues.notYet'));
          return;
        }
        ordered.push(id);
        f.setSay(ordered.length === DUG.length ? t('clues.s3done') : '');
        paint();
      }

      paint();
    },
  };
}
