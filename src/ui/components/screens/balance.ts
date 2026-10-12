/**
 * Two-pan balance workbench screen (Knot K1).
 */

import { calculateBalanceTilt, isBalanced } from '../../../domain/science/balance';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import type { ScreenMeta } from '../app/router';

export function createBalanceScreen(): ScreenMeta {
  return {
    id: 'balance',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'balance.title',
    render(view, state, params = {}) {
      enterThread('K1', 'balance', params);

      let leftGrams = typeof state.left === 'number' ? state.left : 10;
      let rightGrams = typeof state.right === 'number' ? state.right : 10;
      let tare = typeof state.tare === 'number' ? state.tare : 0;

      state.left = leftGrams;
      state.right = rightGrams;
      state.tare = tare;

      const titleEl = el('h2', { class: 'screen-title', text: t('balance.title') });
      const displayCard = el('section', {
        class: 'card balance-display',
        style: { textAlign: 'center' },
      });
      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '16px' },
      });

      function paint(): void {
        state.left = leftGrams;
        state.right = rightGrams;
        state.tare = tare;

        clear(displayCard);

        const tilt = calculateBalanceTilt(leftGrams, rightGrams, tare);
        const balanced = isBalanced(leftGrams, rightGrams, tare);

        const statusNotice = el('div', {
          class: 'balance-status',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: balanced ? 'var(--leaf, #10b981)' : 'var(--thread-ganita, #8b5cf6)',
          },
          text: balanced
            ? t('balance.equilibrium')
            : leftGrams + tare > rightGrams
              ? t('balance.leftHeavier')
              : t('balance.rightHeavier'),
        });
        displayCard.appendChild(statusNotice);

        // SVG beam balance representation
        const svgEl = svg('svg', {
          viewBox: '0 0 320 180',
          style: {
            width: '100%',
            maxWidth: '320px',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          },
        });

        // Stand base & vertical pillar
        svgEl.appendChild(
          svg('line', {
            x1: '160',
            y1: '60',
            x2: '160',
            y2: '160',
            stroke: 'var(--ink, #0f172a)',
            'stroke-width': '4',
          })
        );
        svgEl.appendChild(
          svg('path', {
            d: 'M130 160 L190 160 L160 140 Z',
            fill: 'var(--ink, #0f172a)',
          })
        );
        svgEl.appendChild(
          svg('circle', {
            cx: '160',
            cy: '60',
            r: '6',
            fill: 'var(--thread-ganita, #8b5cf6)',
          })
        );

        // Tilted beam
        const rad = (tilt * Math.PI) / 180;
        const beamHalf = 90;
        const lx = 160 - Math.cos(rad) * beamHalf;
        const ly = 60 - Math.sin(rad) * beamHalf;
        const rx = 160 + Math.cos(rad) * beamHalf;
        const ry = 60 + Math.sin(rad) * beamHalf;

        svgEl.appendChild(
          svg('line', {
            x1: String(lx),
            y1: String(ly),
            x2: String(rx),
            y2: String(ry),
            stroke: 'var(--ink, #0f172a)',
            'stroke-width': '3',
          })
        );

        // Left Pan
        svgEl.appendChild(
          svg('line', {
            x1: String(lx),
            y1: String(ly),
            x2: String(lx),
            y2: String(ly + 40),
            stroke: '#64748b',
            'stroke-width': '1.5',
          })
        );
        svgEl.appendChild(
          svg('path', {
            d: `M${lx - 25} ${ly + 40} Q${lx} ${ly + 55} ${lx + 25} ${ly + 40} Z`,
            fill: '#94a3b8',
          })
        );

        // Right Pan
        svgEl.appendChild(
          svg('line', {
            x1: String(rx),
            y1: String(ry),
            x2: String(rx),
            y2: String(ry + 40),
            stroke: '#64748b',
            'stroke-width': '1.5',
          })
        );
        svgEl.appendChild(
          svg('path', {
            d: `M${rx - 25} ${ry + 40} Q${rx} ${ry + 55} ${rx + 25} ${ry + 40} Z`,
            fill: '#94a3b8',
          })
        );

        displayCard.appendChild(svgEl);

        // Mass readout
        const readout = el('div', {
          class: 'balance-readout',
          style: { marginTop: '8px', fontSize: '15px' },
          text: t('balance.readout', {
            left: leftGrams,
            tare: tare ? t('balance.readoutTare', { tare }) : '',
            right: rightGrams,
          }),
        });
        displayCard.appendChild(readout);

        // Actions
        clear(actionsCard);

        const panCols = el('div', {
          style: { display: 'flex', justifyContent: 'space-around', marginBottom: '16px' },
        });

        // Left Pan Controls
        const leftBox = el('div', { style: { textAlign: 'center' } }, [
          el('h4', { style: { margin: '0 0 6px 0' }, text: t('balance.leftPan') }),
          el('div', { style: { display: 'flex', gap: '6px', justifyContent: 'center' } }, [
            el('button', {
              class: 'btn icon mini',
              type: 'button',
              text: '−',
              onclick: () => {
                leftGrams = Math.max(0, leftGrams - 1);
                paint();
              },
            }),
            el('span', { style: { minWidth: '32px', fontWeight: 'bold' }, text: `${leftGrams}g` }),
            el('button', {
              class: 'btn icon mini',
              type: 'button',
              text: '+',
              onclick: () => {
                leftGrams += 1;
                paint();
              },
            }),
          ]),
        ]);

        // Right Pan Controls
        const rightBox = el('div', { style: { textAlign: 'center' } }, [
          el('h4', { style: { margin: '0 0 6px 0' }, text: t('balance.rightPan') }),
          el('div', { style: { display: 'flex', gap: '6px', justifyContent: 'center' } }, [
            el('button', {
              class: 'btn icon mini',
              type: 'button',
              text: '−',
              onclick: () => {
                rightGrams = Math.max(0, rightGrams - 1);
                paint();
              },
            }),
            el('span', { style: { minWidth: '32px', fontWeight: 'bold' }, text: `${rightGrams}g` }),
            el('button', {
              class: 'btn icon mini',
              type: 'button',
              text: '+',
              onclick: () => {
                rightGrams += 1;
                paint();
              },
            }),
          ]),
        ]);

        panCols.appendChild(leftBox);
        panCols.appendChild(rightBox);
        actionsCard.appendChild(panCols);

        // Reset and Tare button
        const btnRow = el('div', {
          style: { display: 'flex', gap: '12px', justifyContent: 'center' },
        });
        btnRow.appendChild(
          el('button', {
            class: 'btn ghost',
            type: 'button',
            text: t('balance.tareZero'),
            onclick: () => {
              tare = rightGrams - leftGrams;
              paint();
            },
          })
        );
        btnRow.appendChild(
          el('button', {
            class: 'btn ghost',
            type: 'button',
            text: t('balance.reset'),
            onclick: () => {
              leftGrams = 10;
              rightGrams = 10;
              tare = 0;
              paint();
            },
          })
        );
        actionsCard.appendChild(btnRow);
      }

      view.appendChild(titleEl);
      view.appendChild(displayCard);
      view.appendChild(actionsCard);

      paint();
    },
  };
}
