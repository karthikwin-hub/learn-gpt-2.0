/**
 * Folding fraction strips workbench screen (Knot N3).
 * Interactive strip folding demonstrating equivalent fractions without formulas.
 */

import {
  generateStripRows,
  findEquivalentSegments,
  type FractionStripRow,
} from '../../../domain/math/fractions';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import type { ScreenMeta } from '../app/router';

export function createFractionsScreen(): ScreenMeta {
  return {
    id: 'fractions',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'frac.title',
    render(view, state, params = {}) {
      enterThread('N3', 'fractions', params);

      // Selected fraction: numerator and denominator
      let selDenom = typeof state.denom === 'number' ? state.denom : 2;
      let selCount = typeof state.count === 'number' ? state.count : 1;

      state.denom = selDenom;
      state.count = selCount;

      const titleEl = el('h2', { class: 'screen-title', text: t('frac.title') });
      const subEl = el('p', {
        class: 'screen-sub',
        text: t('frac.s1'),
      });

      const displayCard = el('section', { class: 'card frac-display', 'aria-live': 'polite' });
      const fracReadout = el('div', {
        class: 'frac-readout',
        style: { fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' },
      });
      const eqReadout = el('div', {
        class: 'frac-equivalents',
        style: { color: 'var(--muted)', fontSize: '14px' },
      });
      displayCard.appendChild(fracReadout);
      displayCard.appendChild(eqReadout);

      const stripsContainer = el('div', {
        class: 'fraction-strips',
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          margin: '16px 0',
        },
      });

      const supportedDenominators = [1, 2, 4, 8];
      const rows: FractionStripRow[] = generateStripRows(supportedDenominators);

      function update(): void {
        state.denom = selDenom;
        state.count = selCount;

        const equivalents = findEquivalentSegments(
          { numerator: selCount, denominator: selDenom },
          supportedDenominators
        );

        fracReadout.textContent = `${selCount}/${selDenom}`;
        const eqStrings = equivalents.map((eq) => `${eq.count}/${eq.denominator}`);
        eqReadout.textContent = `${t('frac.same')}: ${eqStrings.join(' = ')}`;

        clear(stripsContainer);
        for (const row of rows) {
          const rowWrap = el('div', {
            class: `strip-row strip-${row.denominator}`,
            style: { display: 'flex', alignItems: 'center', gap: '8px' },
          });

          rowWrap.appendChild(
            el('span', {
              class: 'strip-label',
              style: { minWidth: '36px', fontSize: '13px', fontWeight: '600' },
              text: row.denominator === 1 ? '1' : `1/${row.denominator}`,
            })
          );

          const stripTrack = el('div', {
            class: 'strip-track',
            style: {
              flex: '1',
              display: 'flex',
              height: '42px',
              border: '2px solid var(--border)',
              borderRadius: '8px',
              overflow: 'hidden',
              background: 'var(--card-bg, #fff)',
            },
          });

          // Check how many parts are active in this row based on equivalent fraction
          const matchingEq = equivalents.find((e) => e.denominator === row.denominator);
          const activeParts = matchingEq ? matchingEq.count : 0;

          for (let i = 0; i < row.segments.length; i++) {
            const seg = row.segments[i];
            if (!seg) continue;
            const isActive = i < activeParts;

            const segBtn = el('button', {
              class: `strip-segment${isActive ? ' active' : ''}`,
              type: 'button',
              'aria-label': `${row.denominator === 1 ? 'Whole' : `Part ${i + 1} of ${row.denominator}`}`,
              style: {
                flex: '1',
                border: 'none',
                borderRight:
                  i < row.segments.length - 1 ? '1px dashed var(--border-dark, #cbd5e1)' : 'none',
                background: isActive ? 'var(--thread-ganita, #8b5cf6)' : 'transparent',
                color: isActive ? '#fff' : 'var(--ink)',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                transition: 'background 0.2s',
              },
              text: seg.label,
              onclick: () => {
                selDenom = row.denominator;
                selCount = i + 1;
                update();
              },
            });

            stripTrack.appendChild(segBtn);
          }

          rowWrap.appendChild(stripTrack);
          stripsContainer.appendChild(rowWrap);
        }
      }

      // Quick example chips
      const chipsRow = el('div', {
        class: 'chips-row',
        style: { display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '12px 0' },
      });

      const examples = [
        { label: t('frac.chipHalf'), denom: 2, count: 1 },
        { label: t('frac.chipTwoFourths'), denom: 4, count: 2 },
        { label: t('frac.chipThreeFourths'), denom: 4, count: 3 },
        { label: t('frac.chipFourEighths'), denom: 8, count: 4 },
      ];

      for (const ex of examples) {
        chipsRow.appendChild(
          el('button', {
            class: 'btn chip',
            type: 'button',
            text: ex.label,
            onclick: () => {
              selDenom = ex.denom;
              selCount = ex.count;
              update();
            },
          })
        );
      }

      const actionsRow = el('div', {
        class: 'actions-row',
        style: { display: 'flex', gap: '12px', marginTop: '16px' },
      });

      const resetBtn = el('button', {
        class: 'btn ghost',
        id: 'btn-reset',
        type: 'button',
        text: t('common.reset'),
        onclick: () => {
          selDenom = 2;
          selCount = 1;
          update();
        },
      });

      actionsRow.appendChild(resetBtn);

      view.appendChild(titleEl);
      view.appendChild(subEl);
      view.appendChild(displayCard);
      view.appendChild(stripsContainer);
      view.appendChild(chipsRow);
      view.appendChild(actionsRow);

      update();
    },
  };
}
