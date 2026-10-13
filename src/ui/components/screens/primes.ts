/**
 * Interactive Primes & Composites workbench screen for Knot F2.
 * Models stubborn primes via single-line rigidity, Sieve of Eratosthenes (1-50),
 * and prime factor tree decomposition.
 */

import { isPrime, sievePrimesUpTo, primeFactorize } from '../../../domain/math/primes';
import { arrangeTiles } from '../../../domain/math/factors';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

export function createPrimesScreen(): ScreenMeta {
  return {
    id: 'primes',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'primes.title',
    render(view, state, params = {}) {
      enterThread('F2', 'primes', params);

      let stepNum = readStep(params.step, state.step, 3);

      let testNumber = typeof state.testNumber === 'number' ? state.testNumber : 7;
      let testRows = typeof state.testRows === 'number' ? state.testRows : 2;
      let sieveFiltered = Array.isArray(state.sieveFiltered)
        ? (state.sieveFiltered as number[])
        : [];
      let treeNumber = typeof state.treeNumber === 'number' ? state.treeNumber : 24;

      state.step = stepNum;
      state.testNumber = testNumber;
      state.testRows = testRows;
      state.sieveFiltered = sieveFiltered;
      state.treeNumber = treeNumber;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('primes.title'),
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
        text: t('primes.tab1'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab2 = el('button', {
        class: `step-tab ${stepNum === 2 ? 'active' : ''}`,
        text: t('primes.tab2'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab3 = el('button', {
        class: `step-tab ${stepNum === 3 ? 'active' : ''}`,
        text: t('primes.tab3'),
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

      // --- STEP 1: Stubborn Prime Test ---
      function renderStep1() {
        say.textContent = t('primes.s1');

        const card = el('div', {
          class: 'primes-card-step1',
          style: {
            width: '100%',
            maxWidth: '420px',
            backgroundColor: 'var(--paper-raised)',
            border: '1px solid var(--hair)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          },
        });

        // Number switcher: 7 (prime), 6 (composite), 11 (prime), 12 (composite)
        const numberSelector = el('div', {
          class: 'number-selector-wrap',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          },
        });

        const selectorLabel = el('span', {
          text: t('primes.chooseTiles'),
          style: { fontSize: '13px', color: '#555' },
        });

        const numButtons = el('div', {
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
        });

        [6, 7, 11, 12].forEach((n) => {
          const btn = el('button', {
            class: `btn-test-num ${testNumber === n ? 'active' : ''}`,
            text: t('primes.tilesChoice', { n }),
            style: {
              minHeight: '44px',
              padding: '8px 12px',
              borderRadius: '8px',
              fontWeight: testNumber === n ? '700' : '500',
              backgroundColor: testNumber === n ? '#e8f5e9' : 'transparent',
              border: testNumber === n ? '2px solid #2e7d32' : '1px solid #cccccc',
              cursor: 'pointer',
            },
          });
          btn.onclick = () => {
            testNumber = n;
            testRows = 2;
            state.testNumber = n;
            state.testRows = 2;
            renderWorkbench();
          };
          numButtons.appendChild(btn);
        });

        numberSelector.append(selectorLabel, numButtons);

        const isNPrime = isPrime(testNumber);
        const arrangement = arrangeTiles(testNumber, testRows);

        const statusBanner = el('div', {
          class: `prime-status-banner ${arrangement.isValid ? 'valid' : 'invalid'}`,
          text: arrangement.isValid
            ? t('primes.statusSolid', {
                rows: testRows,
                cols: arrangement.columns,
                total: testNumber,
              })
            : t('primes.statusBroken', { rows: testRows, rem: arrangement.remainder }),
          style: {
            padding: '8px 14px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '14px',
            backgroundColor: arrangement.isValid ? '#e8f5e9' : '#ffebee',
            color: arrangement.isValid ? '#2e7d32' : '#c62828',
            border: `1px solid ${arrangement.isValid ? '#a5d6a7' : '#ef9a9a'}`,
            textAlign: 'center',
          },
        });

        // Row choice buttons for current number
        const rowSelector = el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          },
        });

        const rowLabel = el('span', {
          text: t('primes.foldLabel', { n: testNumber }),
          style: { fontSize: '14px', fontWeight: '600' },
        });

        const rowBtns = el('div', {
          style: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
        });

        for (let r = 1; r <= 4; r++) {
          const btn = el('button', {
            class: `btn-fold-row ${testRows === r ? 'active' : ''}`,
            text: t('primes.rowChoice', { n: r }),
            style: {
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: testRows === r ? '700' : '500',
              backgroundColor: testRows === r ? '#c8e6c9' : '#f5f5f5',
              border: testRows === r ? '2px solid #388e3c' : '1px solid #d0d0d0',
              cursor: 'pointer',
            },
          });
          btn.onclick = () => {
            testRows = r;
            state.testRows = r;
            renderWorkbench();
          };
          rowBtns.appendChild(btn);
        }

        rowSelector.append(rowLabel, rowBtns);

        // Tile layout grid
        const gridBox = el('div', {
          class: 'prime-tiles-grid',
          style: {
            padding: '16px',
            backgroundColor: '#fafafa',
            borderRadius: '8px',
            border: '2px dashed #bdbdbd',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box',
          },
        });

        for (let r = 0; r < testRows; r++) {
          const rowEl = el('div', {
            style: { display: 'flex', gap: '6px' },
          });
          for (let c = 0; c < arrangement.columns; c++) {
            const tile = el('div', {
              class: 'prime-tile-item solid',
              style: {
                width: '26px',
                height: '26px',
                backgroundColor: isNPrime ? '#ff9800' : '#4caf50',
                borderRadius: '4px',
              },
            });
            rowEl.appendChild(tile);
          }
          gridBox.appendChild(rowEl);
        }

        if (arrangement.remainder > 0) {
          const remRow = el('div', {
            class: 'prime-leftover-row',
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
              class: 'prime-tile-item leftover',
              style: {
                width: '26px',
                height: '26px',
                backgroundColor: '#ef5350',
                borderRadius: '4px',
              },
            });
            remRow.appendChild(remTile);
          }
          gridBox.appendChild(remRow);
        }

        const verdictBox = el('div', {
          class: 'verdict-box',
          text: isNPrime
            ? t('primes.verdictPrime', { n: testNumber })
            : t('primes.verdictComposite', { n: testNumber }),
          style: {
            fontSize: '13px',
            fontWeight: '600',
            color: isNPrime ? '#e65100' : '#1b5e20',
            textAlign: 'center',
          },
        });

        const nextBtn = el('button', {
          class: 'btn-next-step primary-button',
          text: t('primes.toSieve'),
          style: { minHeight: '44px', padding: '10px 16px', marginTop: '8px' },
        });
        nextBtn.onclick = () => switchStep(2);

        card.append(numberSelector, statusBanner, rowSelector, gridBox, verdictBox, nextBtn);
        contentBox.appendChild(card);
      }

      // --- STEP 2: Sieve of Eratosthenes (1–50) ---
      function renderStep2() {
        say.textContent = t('primes.s2');

        const card = el('div', {
          class: 'primes-card-step2',
          style: {
            width: '100%',
            maxWidth: '460px',
            backgroundColor: 'var(--paper-raised)',
            border: '1px solid var(--hair)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          },
        });

        // Sieve Filter Action Buttons
        const filterControls = el('div', {
          class: 'sieve-filter-controls',
          style: {
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        });

        const btnCross1 = el('button', {
          class: `btn-filter-sieve ${sieveFiltered.includes(1) ? 'active' : ''}`,
          text: t('primes.sieveCross1'),
          style: { minHeight: '44px', padding: '6px 10px', borderRadius: '8px' },
        });
        btnCross1.onclick = () => {
          if (!sieveFiltered.includes(1)) {
            sieveFiltered = [...sieveFiltered, 1];
            state.sieveFiltered = sieveFiltered;
            renderWorkbench();
          }
        };

        const btnFilter2 = el('button', {
          class: `btn-filter-sieve ${sieveFiltered.includes(2) ? 'active' : ''}`,
          text: t('primes.sieveFilter2'),
          style: { minHeight: '44px', padding: '6px 10px', borderRadius: '8px' },
        });
        btnFilter2.onclick = () => {
          if (!sieveFiltered.includes(2)) {
            sieveFiltered = [...sieveFiltered, 2];
            state.sieveFiltered = sieveFiltered;
            renderWorkbench();
          }
        };

        const btnFilter3 = el('button', {
          class: `btn-filter-sieve ${sieveFiltered.includes(3) ? 'active' : ''}`,
          text: t('primes.sieveFilter3'),
          style: { minHeight: '44px', padding: '6px 10px', borderRadius: '8px' },
        });
        btnFilter3.onclick = () => {
          if (!sieveFiltered.includes(3)) {
            sieveFiltered = [...sieveFiltered, 3];
            state.sieveFiltered = sieveFiltered;
            renderWorkbench();
          }
        };

        const btnFilter5 = el('button', {
          class: `btn-filter-sieve ${sieveFiltered.includes(5) ? 'active' : ''}`,
          text: t('primes.sieveFilter5'),
          style: { minHeight: '44px', padding: '6px 10px', borderRadius: '8px' },
        });
        btnFilter5.onclick = () => {
          if (!sieveFiltered.includes(5)) {
            sieveFiltered = [...sieveFiltered, 5];
            state.sieveFiltered = sieveFiltered;
            renderWorkbench();
          }
        };

        const btnFilterAll = el('button', {
          class: 'btn-filter-sieve primary-action',
          text: t('primes.sieveReveal'),
          style: {
            minHeight: '44px',
            padding: '6px 12px',
            borderRadius: '8px',
            fontWeight: '700',
          },
        });
        btnFilterAll.onclick = () => {
          sieveFiltered = [1, 2, 3, 5, 7];
          state.sieveFiltered = sieveFiltered;
          renderWorkbench();
        };

        filterControls.append(btnCross1, btnFilter2, btnFilter3, btnFilter5, btnFilterAll);

        // 1 to 50 Grid Display
        const grid50 = el('div', {
          class: 'sieve-grid-50',
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gap: '4px',
            width: '100%',
          },
        });

        const allPrimes50 = sievePrimesUpTo(50); // 15 primes

        for (let num = 1; num <= 50; num++) {
          let isStruck = false;
          let isGlowingPrime = false;

          if (num === 1 && sieveFiltered.includes(1)) {
            isStruck = true;
          }
          if (sieveFiltered.includes(2) && num > 2 && num % 2 === 0) {
            isStruck = true;
          }
          if (sieveFiltered.includes(3) && num > 3 && num % 3 === 0) {
            isStruck = true;
          }
          if (sieveFiltered.includes(5) && num > 5 && num % 5 === 0) {
            isStruck = true;
          }
          if (sieveFiltered.includes(7) && num > 7 && num % 7 === 0) {
            isStruck = true;
          }

          if (
            allPrimes50.includes(num) &&
            (sieveFiltered.length >= 3 || sieveFiltered.includes(7))
          ) {
            isGlowingPrime = true;
          }

          const cell = el('div', {
            class: `sieve-cell ${isStruck ? 'struck' : ''} ${isGlowingPrime ? 'prime-glow' : ''}`,
            text: `${num}`,
            'data-number': `${num}`,
            style: {
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: isGlowingPrime ? '700' : '500',
              backgroundColor: isStruck ? '#eeeeee' : isGlowingPrime ? '#ffecb3' : '#ffffff',
              color: isStruck ? '#9e9e9e' : isGlowingPrime ? '#ff6f00' : '#212121',
              border: isGlowingPrime ? '1.5px solid #ffa000' : '1px solid #e0e0e0',
              textDecoration: isStruck ? 'line-through' : 'none',
            },
          });
          grid50.appendChild(cell);
        }

        const sieveSummary = el('div', {
          class: 'sieve-summary-banner',
          text: t('primes.sieveSummary'),
          style: {
            fontSize: '13px',
            fontWeight: '600',
            textAlign: 'center',
            color: '#e65100',
            backgroundColor: '#fff3e0',
            padding: '8px',
            borderRadius: '8px',
            width: '100%',
            boxSizing: 'border-box',
          },
        });

        const nextBtn = el('button', {
          class: 'btn-next-step primary-button',
          text: t('primes.toTree'),
          style: { minHeight: '44px', padding: '10px 16px', marginTop: '8px' },
        });
        nextBtn.onclick = () => switchStep(3);

        card.append(filterControls, grid50, sieveSummary, nextBtn);
        contentBox.appendChild(card);
      }

      // --- STEP 3: Prime Factor Tree Dissector ---
      function renderStep3() {
        say.textContent = t('primes.s3');

        const card = el('div', {
          class: 'primes-card-step3',
          style: {
            width: '100%',
            maxWidth: '420px',
            backgroundColor: 'var(--paper-raised)',
            border: '1px solid var(--hair)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          },
        });

        // Tree Number Selector: 12, 18, 24, 30
        const treeSelector = el('div', {
          style: { display: 'flex', gap: '8px', justifyContent: 'center' },
        });

        [12, 18, 24, 30].forEach((n) => {
          const btn = el('button', {
            class: `btn-tree-select ${treeNumber === n ? 'active' : ''}`,
            text: `${n}`,
            style: {
              minWidth: '44px',
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontWeight: treeNumber === n ? '700' : '500',
              backgroundColor: treeNumber === n ? '#e1f5fe' : 'transparent',
              border: treeNumber === n ? '2px solid #0288d1' : '1px solid #cccccc',
            },
          });
          btn.onclick = () => {
            treeNumber = n;
            state.treeNumber = n;
            renderWorkbench();
          };
          treeSelector.appendChild(btn);
        });

        const primeLeaves = primeFactorize(treeNumber);

        // Visual Tree Display
        const treeBox = el('div', {
          class: 'prime-tree-box',
          style: {
            padding: '16px',
            backgroundColor: '#f1f8e9',
            borderRadius: '10px',
            border: '1px solid #c8e6c9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            boxSizing: 'border-box',
          },
        });

        const rootNode = el('div', {
          class: 'tree-node root-node',
          text: `${treeNumber}`,
          style: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#37474f',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '700',
          },
        });

        const branchConnect = el('div', {
          text: t('primes.treeBranch'),
          style: { fontSize: '12px', color: '#555', fontStyle: 'italic' },
        });

        const leavesRow = el('div', {
          class: 'prime-leaves-row',
          style: {
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center',
          },
        });

        primeLeaves.forEach((leaf, idx) => {
          const leafNode = el('div', {
            class: 'tree-node prime-leaf',
            text: `${leaf}`,
            style: {
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#4caf50',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '700',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            },
          });
          leavesRow.appendChild(leafNode);

          if (idx < primeLeaves.length - 1) {
            const multSign = el('span', {
              text: '×',
              style: { fontSize: '18px', fontWeight: '700', color: '#2e7d32' },
            });
            leavesRow.appendChild(multSign);
          }
        });

        treeBox.append(rootNode, branchConnect, leavesRow);

        // Equation Decomposition Banner
        const equationBanner = el('div', {
          class: 'prime-factors-banner',
          text: t('primes.factorization', { n: treeNumber, parts: primeLeaves.join(' × ') }),
          style: {
            padding: '10px 16px',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '15px',
            backgroundColor: '#e8f5e9',
            color: '#1b5e20',
            border: '1px solid #81c784',
            textAlign: 'center',
          },
        });

        const doneBtn = toMistakeButton('F2');
        doneBtn.classList.add('btn-primes-done', 'primary-button');

        card.append(treeSelector, treeBox, equationBanner, doneBtn);
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
