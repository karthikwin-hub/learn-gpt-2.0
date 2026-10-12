/**
 * Seed anatomy and germination workbench screen (Knot J2).
 */

import {
  SEED_PARTS,
  canGerminate,
  getGerminationStage,
  type GerminationConditions,
  type SeedPartId,
} from '../../../domain/science/seed';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import type { ScreenMeta } from '../app/router';

export function createSeedScreen(): ScreenMeta {
  return {
    id: 'seed',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'seed.title',
    render(view, state, params = {}) {
      enterThread('J2', 'seed', params);

      const conditions: GerminationConditions =
        state.conditions && typeof state.conditions === 'object'
          ? (state.conditions as GerminationConditions)
          : { water: true, air: true, warmth: true };
      let day = typeof state.day === 'number' ? state.day : 3;

      state.conditions = conditions;
      state.day = day;

      const titleEl = el('h2', { class: 'screen-title', text: t('seed.title') });
      const displayCard = el('section', {
        class: 'card seed-display',
        style: { textAlign: 'center' },
      });
      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '16px' },
      });

      function paint(): void {
        state.conditions = conditions;
        state.day = day;

        clear(displayCard);

        const stage = getGerminationStage(day, conditions);
        const stageLabel = el('h3', {
          class: 'seed-stage-title',
          style: {
            textTransform: 'capitalize',
            color: 'var(--thread-ganita, #8b5cf6)',
            margin: '0 0 10px 0',
          },
          text: t('seed.stage', { stage }),
        });

        const statusNotice = el('p', {
          class: 'seed-status-notice',
          style: { fontSize: '14px', color: 'var(--muted)' },
          text: canGerminate(conditions) ? t('seed.statusReady', { n: day }) : t('seed.statusHalt'),
        });

        displayCard.appendChild(stageLabel);
        displayCard.appendChild(statusNotice);

        // Anatomical parts grid
        const partsGrid = el('div', {
          class: 'seed-parts-grid',
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '8px',
            marginTop: '16px',
          },
        });

        for (const key of Object.keys(SEED_PARTS) as SeedPartId[]) {
          const p = SEED_PARTS[key];
          const partBox = el('div', {
            class: `card part-${p.id}`,
            style: { padding: '8px', border: '1px solid var(--border)', borderRadius: '8px' },
          });
          partBox.appendChild(
            el('strong', { style: { display: 'block', fontSize: '13px' }, text: p.name })
          );
          partBox.appendChild(
            el('span', { style: { fontSize: '11px', color: 'var(--muted)' }, text: p.role })
          );
          partsGrid.appendChild(partBox);
        }
        displayCard.appendChild(partsGrid);

        // Actions
        clear(actionsCard);

        const condTitle = el('h4', {
          style: { margin: '0 0 8px 0' },
          text: t('seed.conditionsTitle'),
        });
        actionsCard.appendChild(condTitle);

        const togglesRow = el('div', {
          style: { display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' },
        });

        const toggles: { key: keyof GerminationConditions; label: string }[] = [
          { key: 'water', label: t('seed.water') },
          { key: 'air', label: t('seed.air') },
          { key: 'warmth', label: t('seed.warmth') },
        ];

        for (const tg of toggles) {
          togglesRow.appendChild(
            el('button', {
              class: `btn chip${conditions[tg.key] ? ' active' : ''}`,
              type: 'button',
              text: tg.label,
              onclick: () => {
                conditions[tg.key] = !conditions[tg.key];
                paint();
              },
            })
          );
        }
        actionsCard.appendChild(togglesRow);

        // Days stepper
        const dayRow = el(
          'div',
          {
            style: { display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' },
          },
          [
            el('span', { text: t('seed.timeLabel') }),
            el('button', {
              class: 'btn icon mini',
              type: 'button',
              text: '−',
              onclick: () => {
                day = Math.max(0, day - 1);
                paint();
              },
            }),
            el('span', { style: { fontWeight: 'bold' }, text: t('seed.day', { n: day }) }),
            el('button', {
              class: 'btn icon mini',
              type: 'button',
              text: '+',
              onclick: () => {
                day = Math.min(10, day + 1);
                paint();
              },
            }),
          ]
        );
        actionsCard.appendChild(dayRow);
      }

      view.appendChild(titleEl);
      view.appendChild(displayCard);
      view.appendChild(actionsCard);

      paint();
    },
  };
}
