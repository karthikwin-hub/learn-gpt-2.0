/**
 * Interactive Common Factors & HCF workbench screen for Knot F4.
 * Models shared factors via Venn diagram intersection, dual-beam tile fitting,
 * and one-step fraction simplification using HCF.
 */

import { classifyVennFactors, testTileFit, simplifyFractionByHCF } from '../../../domain/math/hcf';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

export function createHcfScreen(): ScreenMeta {
  return {
    id: 'hcf',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'hcf.title',
    render(view, state, params = {}) {
      enterThread('F4', 'hcf', params);

      let stepNum = readStep(params.step, state.step, 3);

      let pairNumA = typeof state.pairNumA === 'number' ? state.pairNumA : 12;
      let pairNumB = typeof state.pairNumB === 'number' ? state.pairNumB : 18;
      let selectedTileSize =
        typeof state.selectedTileSize === 'number' ? state.selectedTileSize : 6;
      let fractionReduced = Boolean(state.fractionReduced);

      state.step = stepNum;
      state.pairNumA = pairNumA;
      state.pairNumB = pairNumB;
      state.selectedTileSize = selectedTileSize;
      state.fractionReduced = fractionReduced;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('hcf.title'),
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
        text: t('hcf.tab1'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab2 = el('button', {
        class: `step-tab ${stepNum === 2 ? 'active' : ''}`,
        text: t('hcf.tab2'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab3 = el('button', {
        class: `step-tab ${stepNum === 3 ? 'active' : ''}`,
        text: t('hcf.tab3'),
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

      // --- STEP 1: Venn Factor Rings ---
      function renderStep1() {
        say.textContent = t('hcf.s1');

        const card = el('div', {
          class: 'hcf-card-step1',
          style: {
            width: '100%',
            maxWidth: '440px',
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

        // Pair presets: 12 & 18, 16 & 24, 8 & 12
        const presetsBox = el('div', {
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' },
        });

        const pairs: [number, number][] = [
          [12, 18],
          [16, 24],
          [8, 12],
        ];

        pairs.forEach(([a, b]) => {
          const isCurrent = pairNumA === a && pairNumB === b;
          const btn = el('button', {
            class: `btn-pair-preset ${isCurrent ? 'active' : ''}`,
            text: `${a} & ${b}`,
            style: {
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontWeight: isCurrent ? '700' : '500',
              backgroundColor: isCurrent ? '#e3f2fd' : 'transparent',
              border: isCurrent ? '2px solid #1976d2' : '1px solid #cccccc',
            },
          });
          btn.onclick = () => {
            pairNumA = a;
            pairNumB = b;
            state.pairNumA = a;
            state.pairNumB = b;
            renderWorkbench();
          };
          presetsBox.appendChild(btn);
        });

        const venn = classifyVennFactors(pairNumA, pairNumB);

        // Venn Diagram Representation
        const vennContainer = el('div', {
          class: 'venn-diagram-container',
          style: {
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            width: '100%',
            gap: '4px',
            marginTop: '6px',
          },
        });

        // Left Ring (Only A)
        const leftWing = el('div', {
          class: 'venn-wing venn-only-a',
          style: {
            flex: '1',
            backgroundColor: '#e3f2fd',
            border: '2px solid #90caf9',
            borderRadius: '16px 0 0 16px',
            padding: '10px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          },
        });
        const leftHeader = el('span', {
          text: t('hcf.onlyA', { n: pairNumA }),
          style: { fontSize: '12px', fontWeight: '700', color: '#1565c0' },
        });
        const leftTokens = el('div', {
          style: { display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' },
        });
        venn.onlyA.forEach((f) => {
          const tEl = el('span', {
            class: 'factor-chip only-a',
            text: `${f}`,
            style: {
              padding: '2px 6px',
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: '600',
              border: '1px solid #bbdefb',
            },
          });
          leftTokens.appendChild(tEl);
        });
        leftWing.append(leftHeader, leftTokens);

        // Center Lens (Common Factors Intersection)
        const centerLens = el('div', {
          class: 'venn-lens venn-intersection',
          style: {
            flex: '1.4',
            backgroundColor: '#fff9c4',
            border: '2px solid #fbc02d',
            borderRadius: '16px',
            padding: '10px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            zIndex: '1',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          },
        });
        const centerHeader = el('span', {
          class: 'intersection-title',
          text: t('hcf.commonTitle'),
          style: { fontSize: '13px', fontWeight: '700', color: 'var(--kumkum)' },
        });
        const centerTokens = el('div', {
          style: { display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' },
        });
        venn.common.forEach((f) => {
          const isHcfVal = f === venn.hcf;
          const tEl = el('span', {
            class: `factor-chip common ${isHcfVal ? 'hcf-highlight' : ''}`,
            text: `${f}`,
            style: {
              padding: isHcfVal ? '4px 8px' : '2px 6px',
              backgroundColor: isHcfVal ? '#ff6f00' : '#ffffff',
              color: isHcfVal ? '#ffffff' : '#f57f17',
              borderRadius: '6px',
              fontSize: isHcfVal ? '15px' : '13px',
              fontWeight: '700',
              border: isHcfVal ? '2px solid #e65100' : '1px solid #fff59d',
            },
          });
          centerTokens.appendChild(tEl);
        });
        centerLens.append(centerHeader, centerTokens);

        // Right Ring (Only B)
        const rightWing = el('div', {
          class: 'venn-wing venn-only-b',
          style: {
            flex: '1',
            backgroundColor: '#f3e5f5',
            border: '2px solid #ce93d8',
            borderRadius: '0 16px 16px 0',
            padding: '10px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          },
        });
        const rightHeader = el('span', {
          text: t('hcf.onlyA', { n: pairNumB }),
          style: { fontSize: '12px', fontWeight: '700', color: '#7b1fa2' },
        });
        const rightTokens = el('div', {
          style: { display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' },
        });
        venn.onlyB.forEach((f) => {
          const tEl = el('span', {
            class: 'factor-chip only-b',
            text: `${f}`,
            style: {
              padding: '2px 6px',
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: '600',
              border: '1px solid #e1bee7',
            },
          });
          rightTokens.appendChild(tEl);
        });
        rightWing.append(rightHeader, rightTokens);

        vennContainer.append(leftWing, centerLens, rightWing);

        // Result Banner
        const resultBanner = el('div', {
          class: 'hcf-result-banner',
          text: t('hcf.resultBanner', {
            list: `{${venn.common.join(', ')}}`,
            hcf: venn.hcf,
          }),
          style: {
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'var(--thread-soft)',
            border: '1px solid #ffe082',
            fontWeight: '700',
            fontSize: '14px',
            color: 'var(--ink)',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          },
        });

        const nextBtn = el('button', {
          class: 'btn-next-step primary-button',
          text: t('hcf.toTiles'),
          style: { minHeight: '44px', padding: '10px 16px', marginTop: '8px' },
        });
        nextBtn.onclick = () => switchStep(2);

        card.append(presetsBox, vennContainer, resultBanner, nextBtn);
        contentBox.appendChild(card);
      }

      // --- STEP 2: Dual-Beam Tile Fitting ---
      function renderStep2() {
        say.textContent = t('hcf.s2');

        const card = el('div', {
          class: 'hcf-card-step2',
          style: {
            width: '100%',
            maxWidth: '440px',
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

        // Tile size options: 2, 3, 4, 6
        const tileSelector = el('div', {
          style: { display: 'flex', gap: '8px', justifyContent: 'center' },
        });

        [2, 3, 4, 6].forEach((sz) => {
          const btn = el('button', {
            class: `btn-tile-size ${selectedTileSize === sz ? 'active' : ''}`,
            text: t('hcf.tileChoice', { n: sz }),
            style: {
              minWidth: '44px',
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontWeight: selectedTileSize === sz ? '700' : '500',
              backgroundColor: selectedTileSize === sz ? '#c8e6c9' : 'transparent',
              border: selectedTileSize === sz ? '2px solid #2e7d32' : '1px solid #cccccc',
            },
          });
          btn.onclick = () => {
            selectedTileSize = sz;
            state.selectedTileSize = sz;
            renderWorkbench();
          };
          tileSelector.appendChild(btn);
        });

        const fit = testTileFit(12, 18, selectedTileSize);

        // Visual Rods Comparison
        const rodsBox = el('div', {
          class: 'rods-container',
          style: {
            width: '100%',
            backgroundColor: '#fafafa',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxSizing: 'border-box',
          },
        });

        // Beam 12
        const beam12Row = el('div', {
          style: { display: 'flex', flexDirection: 'column', gap: '4px' },
        });
        const beam12Label = el('span', {
          text: t('hcf.beamA'),
          style: { fontSize: '13px', fontWeight: '600' },
        });
        const tiles12Row = el('div', {
          class: 'tiles-row-12',
          style: { display: 'flex', gap: '3px', flexWrap: 'wrap' },
        });
        const count12 = Math.floor(12 / selectedTileSize);
        const rem12 = 12 % selectedTileSize;
        for (let i = 0; i < count12; i++) {
          const tPiece = el('div', {
            text: `${selectedTileSize}`,
            style: {
              padding: '6px 8px',
              backgroundColor: '#81c784',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#ffffff',
            },
          });
          tiles12Row.appendChild(tPiece);
        }
        if (rem12 > 0) {
          const remPiece = el('div', {
            text: t('hcf.remainderPiece', { rem: rem12 }),
            style: {
              padding: '6px 8px',
              backgroundColor: '#ef5350',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#ffffff',
            },
          });
          tiles12Row.appendChild(remPiece);
        }
        beam12Row.append(beam12Label, tiles12Row);

        // Beam 18
        const beam18Row = el('div', {
          style: { display: 'flex', flexDirection: 'column', gap: '4px' },
        });
        const beam18Label = el('span', {
          text: t('hcf.beamB'),
          style: { fontSize: '13px', fontWeight: '600' },
        });
        const tiles18Row = el('div', {
          class: 'tiles-row-18',
          style: { display: 'flex', gap: '3px', flexWrap: 'wrap' },
        });
        const count18 = Math.floor(18 / selectedTileSize);
        const rem18 = 18 % selectedTileSize;
        for (let i = 0; i < count18; i++) {
          const tPiece = el('div', {
            text: `${selectedTileSize}`,
            style: {
              padding: '6px 8px',
              backgroundColor: '#81c784',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#ffffff',
            },
          });
          tiles18Row.appendChild(tPiece);
        }
        if (rem18 > 0) {
          const remPiece = el('div', {
            text: t('hcf.remainderPiece', { rem: rem18 }),
            style: {
              padding: '6px 8px',
              backgroundColor: '#ef5350',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#ffffff',
            },
          });
          tiles18Row.appendChild(remPiece);
        }
        beam18Row.append(beam18Label, tiles18Row);

        rodsBox.append(beam12Row, beam18Row);

        const fitStatus = el('div', {
          class: `fit-status-banner ${fit.isHCF ? 'is-hcf' : fit.isCommonFactor ? 'common-factor' : 'invalid-factor'}`,
          text: fit.isHCF
            ? t('hcf.fitHcf', { t: selectedTileSize })
            : fit.isCommonFactor
              ? t('hcf.fitCommon', { t: selectedTileSize })
              : t('hcf.fitBad', { t: selectedTileSize, rem: rem18 }),
          style: {
            padding: '10px 14px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '13px',
            textAlign: 'center',
            backgroundColor: fit.isHCF ? '#e8f5e9' : fit.isCommonFactor ? '#fff8e1' : '#ffebee',
            color: fit.isHCF ? '#1b5e20' : '#8d6e63',
            border: `1px solid ${fit.isHCF ? '#81c784' : fit.isCommonFactor ? '#ffe082' : '#ef9a9a'}`,
            width: '100%',
            boxSizing: 'border-box',
          },
        });

        const nextBtn = el('button', {
          class: 'btn-next-step primary-button',
          text: t('hcf.toFraction'),
          style: { minHeight: '44px', padding: '10px 16px', marginTop: '8px' },
        });
        nextBtn.onclick = () => switchStep(3);

        card.append(tileSelector, rodsBox, fitStatus, nextBtn);
        contentBox.appendChild(card);
      }

      // --- STEP 3: One-Step Fraction Reducer ---
      function renderStep3() {
        say.textContent = t('hcf.s3');

        const card = el('div', {
          class: 'hcf-card-step3',
          style: {
            width: '100%',
            maxWidth: '440px',
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

        const simp = simplifyFractionByHCF(12, 18);

        // Visual Fraction Container
        const fracBox = el('div', {
          class: 'fraction-reduction-box',
          style: {
            padding: '16px',
            backgroundColor: '#e8f5e9',
            borderRadius: '10px',
            border: '1px solid #81c784',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            width: '100%',
            boxSizing: 'border-box',
          },
        });

        // Original 12/18
        const origFrac = el('div', {
          class: 'frac-block orig',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '20px',
            fontWeight: '700',
          },
        });
        const num12 = el('span', { text: '12' });
        const bar1 = el('div', {
          style: { width: '32px', height: '2px', backgroundColor: '#333' },
        });
        const den18 = el('span', { text: '18' });
        origFrac.append(num12, bar1, den18);

        const opSymbol = el('span', {
          text: fractionReduced ? t('hcf.fracOpDone') : t('hcf.fracOpAsk'),
          style: { fontSize: '16px', fontWeight: '700', color: '#2e7d32' },
        });

        // Simplified 2/3
        const finalFrac = el('div', {
          class: 'frac-block final',
          style: {
            display: fractionReduced ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '22px',
            fontWeight: '700',
            color: '#1b5e20',
          },
        });
        const num2 = el('span', { text: `${simp.simplifiedNum}` });
        const bar2 = el('div', {
          style: { width: '32px', height: '2px', backgroundColor: '#1b5e20' },
        });
        const den3 = el('span', { text: `${simp.simplifiedDen}` });
        finalFrac.append(num2, bar2, den3);

        fracBox.append(origFrac, opSymbol, finalFrac);

        // Action button to reduce fraction
        const reduceBtn = el('button', {
          class: 'btn-reduce-fraction primary-button',
          text: t('hcf.reduceBtn'),
          style: {
            minHeight: '44px',
            padding: '10px 18px',
            backgroundColor: '#1976d2',
            color: '#ffffff',
            borderRadius: '8px',
            fontWeight: '700',
            cursor: 'pointer',
          },
        });
        reduceBtn.onclick = () => {
          fractionReduced = true;
          state.fractionReduced = true;
          renderWorkbench();
        };

        const explanationBanner = el('p', {
          class: 'fraction-reduction-explanation',
          text: fractionReduced ? t('hcf.fracDone') : t('hcf.fracHint'),
          style: { fontSize: '13px', textAlign: 'center', margin: '0', color: '#333' },
        });

        const doneBtn = toMistakeButton('F4');
        doneBtn.classList.add('btn-hcf-done', 'primary-button');

        card.append(fracBox, reduceBtn, explanationBanner, doneBtn);
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
