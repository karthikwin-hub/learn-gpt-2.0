/**
 * Interactive Factors workbench screen for Knot F1.
 * Models factors as rectangular tile grid arrangements, rainbow factor pair arcs,
 * and square number symmetry.
 */

import { findAllFactors, findFactorPairs, arrangeTiles } from '../../../domain/math/factors';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createFactorsScreen(): ScreenMeta {
  return {
    id: 'factors',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'factors.title',
    render(view, state, params = {}) {
      enterThread('F1', 'factors', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;

      let currentRowsStep1 =
        typeof state.currentRowsStep1 === 'number' ? state.currentRowsStep1 : 3;
      let activeRainbowPair =
        typeof state.activeRainbowPair === 'number' ? state.activeRainbowPair : 0;
      let squareRows = typeof state.squareRows === 'number' ? state.squareRows : 4;

      state.step = stepNum;
      state.currentRowsStep1 = currentRowsStep1;
      state.activeRainbowPair = activeRainbowPair;
      state.squareRows = squareRows;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('factors.title'),
      });
      const say = el('p', {
        class: 'say workbench-feedback',
        'aria-live': 'polite',
      });

      // Step tabs
      const stepTabs = el('div', {
        class: 'step-tabs',
        style: {
          display: 'flex',
          gap: '8px',
          marginBottom: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        },
      });

      const tab1 = el('button', {
        class: `step-tab ${stepNum === 1 ? 'active' : ''}`,
        text: '1. Tile Snapper (N=12)',
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab2 = el('button', {
        class: `step-tab ${stepNum === 2 ? 'active' : ''}`,
        text: '2. Rainbow Pairs',
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab3 = el('button', {
        class: `step-tab ${stepNum === 3 ? 'active' : ''}`,
        text: '3. Square Symmetry (N=16)',
        style: { minHeight: '44px', padding: '8px 12px' },
      });

      function switchStep(newStep: number) {
        stepNum = newStep;
        state.step = newStep;
        tab1.classList.toggle('active', newStep === 1);
        tab2.classList.toggle('active', newStep === 2);
        tab3.classList.toggle('active', newStep === 3);
        renderWorkbench();
      }

      tab1.onclick = () => switchStep(1);
      tab2.onclick = () => switchStep(2);
      tab3.onclick = () => switchStep(3);
      stepTabs.append(tab1, tab2, tab3);

      const contentBox = el('div', {
        class: 'workbench-content',
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
        },
      });

      function renderWorkbench() {
        clear(contentBox);

        if (stepNum === 1) {
          renderStep1();
        } else if (stepNum === 2) {
          renderStep2();
        } else {
          renderStep3();
        }
      }

      // --- STEP 1: Tile Snapper (N = 12) ---
      function renderStep1() {
        say.textContent = t('factors.s1');

        const total = 12;
        const arrangement = arrangeTiles(total, currentRowsStep1);

        const card = el('div', {
          class: 'factors-card-step1',
          style: {
            width: '100%',
            maxWidth: '420px',
            backgroundColor: 'var(--bg-surface, #ffffff)',
            border: '1px solid var(--border-subtle, #e0e0e0)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          },
        });

        const statusBadge = el('div', {
          class: `rect-status ${arrangement.isValid ? 'valid' : 'invalid'}`,
          text: arrangement.isValid
            ? `Solid Rectangle! ${currentRowsStep1} × ${arrangement.columns} = 12`
            : `${currentRowsStep1} rows leaves ${arrangement.remainder} loose tile(s) — Not a rectangle!`,
          style: {
            padding: '6px 12px',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
            backgroundColor: arrangement.isValid ? '#e8f5e9' : '#ffebee',
            color: arrangement.isValid ? '#2e7d32' : '#c62828',
            border: `1px solid ${arrangement.isValid ? '#81c784' : '#ef9a9a'}`,
            textAlign: 'center',
          },
        });

        // Row Selector Stepper & Buttons
        const selectorContainer = el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
          },
        });

        const rowLabel = el('div', {
          class: 'row-counter-label',
          text: `Rows: ${currentRowsStep1}`,
          style: { fontWeight: '700', fontSize: '16px' },
        });

        const rowButtonGrid = el('div', {
          class: 'row-buttons-grid',
          style: {
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        });

        for (let r = 1; r <= 6; r++) {
          const btn = el('button', {
            class: `btn-row-select ${currentRowsStep1 === r ? 'active' : ''}`,
            text: `${r}`,
            'aria-label': `${r} rows`,
            style: {
              minWidth: '44px',
              minHeight: '44px',
              padding: '8px',
              borderRadius: '8px',
              border: currentRowsStep1 === r ? '2px solid #2e7d32' : '1px solid #cccccc',
              backgroundColor: currentRowsStep1 === r ? '#c8e6c9' : 'transparent',
              fontWeight: currentRowsStep1 === r ? '700' : '500',
              cursor: 'pointer',
            },
          });
          btn.onclick = () => {
            currentRowsStep1 = r;
            state.currentRowsStep1 = r;
            renderWorkbench();
          };
          rowButtonGrid.appendChild(btn);
        }

        selectorContainer.append(rowLabel, rowButtonGrid);

        // Grid Display
        const gridBox = el('div', {
          class: 'tiles-grid-container',
          style: {
            padding: '16px',
            backgroundColor: arrangement.isValid ? '#f1f8e9' : '#fafafa',
            borderRadius: '8px',
            border: `2px dashed ${arrangement.isValid ? '#4caf50' : '#bdbdbd'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box',
          },
        });

        for (let r = 0; r < currentRowsStep1; r++) {
          const rowEl = el('div', {
            class: 'tile-row',
            style: { display: 'flex', gap: '6px' },
          });

          for (let c = 0; c < arrangement.columns; c++) {
            const tile = el('div', {
              class: 'tile-item solid',
              style: {
                width: '28px',
                height: '28px',
                backgroundColor: arrangement.isValid ? '#4caf50' : '#90a4ae',
                borderRadius: '4px',
                border: '1px solid rgba(0,0,0,0.15)',
              },
            });
            rowEl.appendChild(tile);
          }
          gridBox.appendChild(rowEl);
        }

        // Leftover / Remainder Tiles
        if (arrangement.remainder > 0) {
          const leftoverRow = el('div', {
            class: 'leftover-row',
            style: {
              display: 'flex',
              gap: '6px',
              marginTop: '4px',
              paddingTop: '6px',
              borderTop: '1px dashed #ef5350',
            },
          });
          for (let rem = 0; rem < arrangement.remainder; rem++) {
            const remTile = el('div', {
              class: 'tile-item leftover',
              style: {
                width: '28px',
                height: '28px',
                backgroundColor: '#ef5350',
                borderRadius: '4px',
                border: '1px solid #b71c1c',
                opacity: '0.85',
              },
            });
            leftoverRow.appendChild(remTile);
          }
          gridBox.appendChild(leftoverRow);
        }

        // Discovered Factor Pairs
        const discoveredBox = el('div', {
          class: 'discovered-pairs-box',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            width: '100%',
          },
        });

        const pairsHeading = el('div', {
          class: 'pairs-heading',
          text: 'Factors of 12 discovered so far:',
          style: { fontSize: '13px', color: '#555' },
        });

        const pairsList = el('div', {
          class: 'pairs-list',
          style: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        });

        const knownPairs = [
          [1, 12],
          [2, 6],
          [3, 4],
        ];
        knownPairs.forEach(([r, c]) => {
          const isCurrent =
            (currentRowsStep1 === r && arrangement.columns === c) ||
            (currentRowsStep1 === c && arrangement.columns === r);
          const pairPill = el('span', {
            class: `pair-pill ${isCurrent ? 'active' : ''}`,
            text: `${r} × ${c}`,
            style: {
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: isCurrent ? '700' : '500',
              backgroundColor: isCurrent ? '#c8e6c9' : '#f5f5f5',
              border: isCurrent ? '1px solid #4caf50' : '1px solid #e0e0e0',
            },
          });
          pairsList.appendChild(pairPill);
        });

        discoveredBox.append(pairsHeading, pairsList);

        const nextStepBtn = el('button', {
          class: 'btn-next-step primary-button',
          text: 'Go to Rainbow Pairs →',
          style: { minHeight: '44px', padding: '10px 16px', marginTop: '8px' },
        });
        nextStepBtn.onclick = () => switchStep(2);

        card.append(statusBadge, selectorContainer, gridBox, discoveredBox, nextStepBtn);
        contentBox.appendChild(card);
      }

      // --- STEP 2: Rainbow Pair Map ---
      function renderStep2() {
        say.textContent = t('factors.s2');

        const card = el('div', {
          class: 'factors-card-step2',
          style: {
            width: '100%',
            maxWidth: '420px',
            backgroundColor: 'var(--bg-surface, #ffffff)',
            border: '1px solid var(--border-subtle, #e0e0e0)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          },
        });

        const factors12 = findAllFactors(12); // [1, 2, 3, 4, 6, 12]
        const pairs12 = findFactorPairs(12); // [[1, 12], [2, 6], [3, 4]]

        const explanationText = el('p', {
          class: 'rainbow-explanation',
          text: 'Every factor connects to its partner across the center! Click a pair to illuminate its rainbow link:',
          style: { fontSize: '14px', textAlign: 'center', margin: '0' },
        });

        // Rainbow SVG Visualization
        const svgContainer = el('div', {
          class: 'rainbow-svg-wrap',
          style: { width: '100%', display: 'flex', justifyContent: 'center' },
        });

        const arcSvg = svg('svg', {
          viewBox: '0 0 320 120',
          style: { width: '100%', maxWidth: '320px', height: '120px' },
        });

        const xCoords = [25, 75, 125, 195, 245, 295];
        const colors = ['#e91e63', '#9c27b0', '#2196f3'];

        pairs12.forEach(([r, c], i) => {
          const idx1 = factors12.indexOf(r);
          const idx2 = factors12.indexOf(c);
          const x1 = xCoords[idx1] ?? 0;
          const x2 = xCoords[idx2] ?? 0;
          const height = 90 - i * 25;
          const stroke = colors[i % colors.length];
          const isActive = activeRainbowPair === 0 || activeRainbowPair === r;

          const arcPath = svg('path', {
            d: `M ${x1} 100 Q ${(x1 + x2) / 2} ${100 - height} ${x2} 100`,
            fill: 'none',
            stroke: isActive ? stroke : '#e0e0e0',
            'stroke-width': isActive ? '3.5' : '1.5',
            'stroke-linecap': 'round',
          });
          arcSvg.appendChild(arcPath);
        });

        svgContainer.appendChild(arcSvg);

        // Factor Tokens Row
        const tokensRow = el('div', {
          class: 'factors-tokens-row',
          style: {
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            width: '100%',
          },
        });

        factors12.forEach((fact) => {
          const partner = 12 / fact;
          const pairKey = Math.min(fact, partner);
          const isHighlighted = activeRainbowPair === 0 || activeRainbowPair === pairKey;

          const tokenBtn = el('button', {
            class: `factor-token ${isHighlighted ? 'highlighted' : ''}`,
            text: `${fact}`,
            'aria-label': `Factor ${fact}`,
            style: {
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: isHighlighted ? '#e3f2fd' : '#f5f5f5',
              border: isHighlighted ? '2px solid #1976d2' : '1px solid #cccccc',
              color: isHighlighted ? '#0d47a1' : '#333333',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          });
          tokenBtn.onclick = () => {
            activeRainbowPair = pairKey;
            state.activeRainbowPair = pairKey;
            renderWorkbench();
          };
          tokensRow.appendChild(tokenBtn);
        });

        // Pair Buttons
        const pairControls = el('div', {
          class: 'pair-controls',
          style: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        });

        const showAllBtn = el('button', {
          class: `btn-pair-select ${activeRainbowPair === 0 ? 'active' : ''}`,
          text: 'Show All Pairs',
          style: { minHeight: '44px', padding: '6px 12px', borderRadius: '8px' },
        });
        showAllBtn.onclick = () => {
          activeRainbowPair = 0;
          state.activeRainbowPair = 0;
          renderWorkbench();
        };
        pairControls.appendChild(showAllBtn);

        pairs12.forEach(([r, c]) => {
          const btn = el('button', {
            class: `btn-pair-select ${activeRainbowPair === r ? 'active' : ''}`,
            text: `${r} × ${c}`,
            style: {
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontWeight: activeRainbowPair === r ? '700' : '500',
            },
          });
          btn.onclick = () => {
            activeRainbowPair = r;
            state.activeRainbowPair = r;
            renderWorkbench();
          };
          pairControls.appendChild(btn);
        });

        const nextStepBtn = el('button', {
          class: 'btn-next-step primary-button',
          text: 'Go to Square Symmetry →',
          style: { minHeight: '44px', padding: '10px 16px', marginTop: '8px' },
        });
        nextStepBtn.onclick = () => switchStep(3);

        card.append(explanationText, svgContainer, tokensRow, pairControls, nextStepBtn);
        contentBox.appendChild(card);
      }

      // --- STEP 3: Square Number Symmetry (N = 16) ---
      function renderStep3() {
        say.textContent = t('factors.s3');

        const total = 16;
        const arrangement = arrangeTiles(total, squareRows);
        const factors16 = findAllFactors(16); // [1, 2, 4, 8, 16] (5 factors)
        const isSquare = squareRows === 4;

        const card = el('div', {
          class: 'factors-card-step3',
          style: {
            width: '100%',
            maxWidth: '420px',
            backgroundColor: 'var(--bg-surface, #ffffff)',
            border: '1px solid var(--border-subtle, #e0e0e0)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          },
        });

        const symmetryBanner = el('div', {
          class: 'symmetry-banner',
          text: isSquare
            ? '4 × 4 = 16: A Perfect Square Mat! 4 pairs with itself.'
            : `${squareRows} × ${arrangement.columns} = 16`,
          style: {
            padding: '8px 14px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '700',
            backgroundColor: isSquare ? '#ede7f6' : '#f5f5f5',
            color: isSquare ? '#4a148c' : '#333333',
            border: isSquare ? '2px solid #7e57c2' : '1px solid #e0e0e0',
            textAlign: 'center',
          },
        });

        // Stepper for N=16 rows (1, 2, 4, 8)
        const rowsGrid = el('div', {
          style: {
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          },
        });

        [1, 2, 4, 8].forEach((r) => {
          const btn = el('button', {
            class: `btn-square-row ${squareRows === r ? 'active' : ''}`,
            text: `${r} rows`,
            style: {
              minWidth: '44px',
              minHeight: '44px',
              padding: '8px 12px',
              borderRadius: '8px',
              fontWeight: squareRows === r ? '700' : '500',
              backgroundColor: squareRows === r ? '#d1c4e9' : 'transparent',
              border: squareRows === r ? '2px solid #673ab7' : '1px solid #cccccc',
            },
          });
          btn.onclick = () => {
            squareRows = r;
            state.squareRows = r;
            renderWorkbench();
          };
          rowsGrid.appendChild(btn);
        });

        // Grid Display for 16
        const gridBox = el('div', {
          class: 'tiles-square-grid',
          style: {
            padding: '16px',
            backgroundColor: isSquare ? '#f3e5f5' : '#fafafa',
            borderRadius: '8px',
            border: `2px dashed ${isSquare ? '#7e57c2' : '#bdbdbd'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            alignItems: 'center',
          },
        });

        for (let r = 0; r < squareRows; r++) {
          const rowEl = el('div', {
            style: { display: 'flex', gap: '6px' },
          });
          for (let c = 0; c < arrangement.columns; c++) {
            const tile = el('div', {
              class: 'tile-item square-tile',
              style: {
                width: '26px',
                height: '26px',
                backgroundColor: isSquare ? '#9c27b0' : '#78909c',
                borderRadius: '4px',
              },
            });
            rowEl.appendChild(tile);
          }
          gridBox.appendChild(rowEl);
        }

        // Odd Factor Count Explanation
        const factorListContainer = el('div', {
          class: 'odd-factors-container',
          style: {
            backgroundColor: '#fff8e1',
            border: '1px solid #ffe082',
            borderRadius: '8px',
            padding: '10px',
            width: '100%',
            boxSizing: 'border-box',
            textAlign: 'center',
          },
        });

        const listTitle = el('div', {
          text: `All Factors of 16: [${factors16.join(', ')}]`,
          style: { fontWeight: '700', color: '#ff6f00', fontSize: '15px' },
        });

        const oddExpl = el('p', {
          class: 'odd-factor-rule',
          text: 'Notice: 16 has exactly 5 factors (an ODD number) because the middle partner 4 is not counted twice!',
          style: {
            fontSize: '13px',
            margin: '4px 0 0 0',
            color: '#5d4037',
          },
        });

        factorListContainer.append(listTitle, oddExpl);

        // Completion & Done Button
        const doneBtn = el('button', {
          class: 'btn-factors-done primary-button',
          text: 'Complete & Continue →',
          style: {
            minHeight: '44px',
            padding: '10px 18px',
            backgroundColor: '#2e7d32',
            color: '#ffffff',
            borderRadius: '8px',
            fontWeight: '700',
            cursor: 'pointer',
          },
        });
        doneBtn.onclick = () => {
          router.go('mistake', { k: 'F1' });
        };

        card.append(symmetryBanner, rowsGrid, gridBox, factorListContainer, doneBtn);
        contentBox.appendChild(card);
      }

      renderWorkbench();

      view.appendChild(titleEl);
      view.appendChild(say);
      view.appendChild(stepTabs);
      view.appendChild(contentBox);
    },
  };
}
