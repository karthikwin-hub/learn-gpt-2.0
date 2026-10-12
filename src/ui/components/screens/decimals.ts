/**
 * Interactive Decimals workbench screen for Knot N5.
 * Explores 10x10 hundred-grids, tenths strips vs hundredths tiles,
 * side-by-side place-value comparison, and trailing zero conservation.
 */

import {
  decomposeDecimal,
  decimalToHundredths,
  compareDecimals,
  areEquivalentDecimals,
} from '../../../domain/math/decimals';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createDecimalsScreen(): ScreenMeta {
  return {
    id: 'decimals',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'decimals.title',
    render(view, state, params = {}) {
      enterThread('N5', 'decimals', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;
      let hundredthsCount = typeof state.hundredthsCount === 'number' ? state.hundredthsCount : 0;
      let showTrailingZero = Boolean(state.showTrailingZero);
      let done = Boolean(state.done);

      state.step = stepNum;
      state.hundredthsCount = hundredthsCount;
      state.showTrailingZero = showTrailingZero;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('decimals.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      // Step switcher tabs
      const stepTabs = el('div', {
        class: 'step-tabs',
        style: { display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: 'center' },
      });

      [1, 2, 3].forEach((s) => {
        const tabBtn = el('button', {
          class: `btn-choice ${stepNum === s ? 'active' : ''}`,
          text: `Step ${s}`,
          style: { minHeight: '44px', minWidth: '44px', padding: '6px 14px' },
          onClick: () => {
            stepNum = s;
            state.step = s;
            paint();
          },
        });
        stepTabs.appendChild(tabBtn);
      });

      const modelCard = el('section', {
        class: 'card model-card',
        style: { textAlign: 'center', overflowX: 'auto', padding: '16px' },
      });

      const equationCard = el('section', {
        class: 'card equation-card',
        style: {
          marginTop: '12px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: '600',
          padding: '12px',
        },
      });

      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '12px', textAlign: 'center' },
      });

      function renderGrid(shaded: number, size = 200, label = ''): SVGElement {
        const s = svg('svg', {
          viewBox: '0 0 220 230',
          width: String(size),
          height: String(size + 10),
          style: 'display:inline-block; margin: 4px;',
          role: 'img',
          'aria-label': `${label || 'Hundred grid'}: ${shaded} hundredths shaded`,
        });

        // Grid border
        s.appendChild(
          svg('rect', {
            x: 10,
            y: 10,
            width: 200,
            height: 200,
            fill: 'var(--paper, #fff)',
            stroke: 'var(--ink, #2d261e)',
            'stroke-width': 2,
          })
        );

        // 10x10 squares (columns: 0..9, rows: 0..9)
        // Filled column-first: index = col * 10 + row
        for (let col = 0; col < 10; col++) {
          for (let row = 0; row < 10; row++) {
            const idx = col * 10 + row;
            const isShaded = idx < shaded;
            s.appendChild(
              svg('rect', {
                x: 10 + col * 20,
                y: 10 + row * 20,
                width: 20,
                height: 20,
                fill: isShaded ? '#5a8260' : 'rgba(255,255,255,0.7)',
                stroke: 'var(--border, #d8d0c0)',
                'stroke-width': 1,
              })
            );
          }
        }

        if (label) {
          const lbl = svg('text', {
            x: 110,
            y: 224,
            'text-anchor': 'middle',
            'font-size': '13',
            'font-weight': 'bold',
            fill: 'var(--ink, #2d261e)',
          });
          lbl.textContent = label;
          s.appendChild(lbl);
        }

        return s;
      }

      function paint(): void {
        clear(modelCard);
        clear(equationCard);
        clear(actionsCard);

        Array.from(stepTabs.children).forEach((child, idx) => {
          if (idx + 1 === stepNum) {
            child.classList.add('active');
          } else {
            child.classList.remove('active');
          }
        });

        if (stepNum === 1) {
          modelCard.appendChild(renderGrid(hundredthsCount, 220));

          const val = (hundredthsCount / 100).toFixed(2);
          const decomp = decomposeDecimal(hundredthsCount / 100);
          equationCard.textContent = `${val} = ${hundredthsCount}/100 = ${decomp.tenths} tenths + ${decomp.hundredths} hundredths`;
          say.textContent = t('decimals.s1done', {
            val,
            hundredths: String(hundredthsCount),
            tenths: String(decomp.tenths),
            h: String(decomp.hundredths),
          });

          const ctrlRow = el('div', {
            class: 'ctrl-row',
            style: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' },
          });

          const addTenthBtn = el('button', {
            class: 'btn-choice',
            text: '+0.1',
            style: { minHeight: '44px', minWidth: '60px', padding: '8px 16px' },
            onClick: () => {
              hundredthsCount = Math.min(100, hundredthsCount + 10);
              state.hundredthsCount = hundredthsCount;
              paint();
            },
          });

          const addHundredthBtn = el('button', {
            class: 'btn-choice',
            text: '+0.01',
            style: { minHeight: '44px', minWidth: '60px', padding: '8px 16px' },
            onClick: () => {
              hundredthsCount = Math.min(100, hundredthsCount + 1);
              state.hundredthsCount = hundredthsCount;
              paint();
            },
          });

          const resetBtn = el('button', {
            class: 'btn-choice',
            text: 'Reset',
            style: { minHeight: '44px', minWidth: '60px', padding: '8px 16px' },
            onClick: () => {
              hundredthsCount = 0;
              state.hundredthsCount = 0;
              paint();
            },
          });

          ctrlRow.appendChild(addTenthBtn);
          ctrlRow.appendChild(addHundredthBtn);
          ctrlRow.appendChild(resetBtn);
          actionsCard.appendChild(ctrlRow);

          const nextStepBtn = el('button', {
            class: 'btn-action btn-primary',
            text: 'Next: Compare decimals',
            style: { marginTop: '16px', minHeight: '44px', padding: '10px 20px' },
            onClick: () => {
              stepNum = 2;
              state.step = 2;
              paint();
            },
          });
          actionsCard.appendChild(nextStepBtn);
        } else if (stepNum === 2) {
          // Compare 0.5 vs 0.15
          const gridWrapper = el('div', {
            style: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
          });
          const hA = decimalToHundredths(0.5);
          const hB = decimalToHundredths(0.15);
          const cmp = compareDecimals(0.5, 0.15);

          gridWrapper.appendChild(renderGrid(hA, 160, '0.5 (50 hundredths)'));
          gridWrapper.appendChild(renderGrid(hB, 160, '0.15 (15 hundredths)'));
          modelCard.appendChild(gridWrapper);

          equationCard.textContent = cmp > 0 ? '0.5 > 0.15' : '0.5 < 0.15';
          say.textContent = t('decimals.s2done');

          const nextStepBtn = el('button', {
            class: 'btn-action btn-primary',
            text: 'Next: Trailing zeroes',
            style: { marginTop: '16px', minHeight: '44px', padding: '10px 20px' },
            onClick: () => {
              stepNum = 3;
              state.step = 3;
              paint();
            },
          });
          actionsCard.appendChild(nextStepBtn);
        } else if (stepNum === 3) {
          // Trailing zero conservation (0.5 vs 0.50)
          const h = decimalToHundredths(0.5);
          const displayStr = showTrailingZero ? '0.50' : '0.5';

          modelCard.appendChild(renderGrid(h, 200, `${displayStr} (50 hundredths)`));
          equationCard.textContent = `${displayStr} = 5/10 = 50/100`;

          const toggleBtn = el('button', {
            class: 'btn-choice active',
            text: showTrailingZero ? 'Show 0.5' : 'Add trailing zero (0.50)',
            style: { minHeight: '44px', padding: '8px 18px' },
            onClick: () => {
              showTrailingZero = !showTrailingZero;
              state.showTrailingZero = showTrailingZero;
              done = true;
              state.done = true;
              paint();
            },
          });
          actionsCard.appendChild(toggleBtn);

          if (showTrailingZero || done) {
            areEquivalentDecimals('0.5', '0.50');
            say.textContent = t('decimals.s3done');
            const toMistakeBtn = el('button', {
              class: 'btn-action btn-primary',
              text: t('bench.toMistake') || 'Next: Spot the mistake',
              style: { marginTop: '16px', minHeight: '44px', padding: '10px 20px' },
              onClick: () => router.go('mistake', { knot: 'N5' }),
            });
            actionsCard.appendChild(toMistakeBtn);
          }
        }
      }

      view.appendChild(titleEl);
      view.appendChild(stepTabs);
      view.appendChild(modelCard);
      view.appendChild(equationCard);
      view.appendChild(say);
      view.appendChild(actionsCard);

      paint();
    },
  };
}
