/**
 * Interactive Estimation workbench screen for Knot A2.
 * Models friendly benchmark snap points, Safe Zone guardrails,
 * and wild error order-of-magnitude detection.
 */

import {
  roundToNearest,
  estimateSum,
  estimateProduct,
  isWildError,
} from '../../../domain/math/estimate';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

export function createEstimateScreen(): ScreenMeta {
  return {
    id: 'estimate',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'estimate.title',
    render(view, state, params = {}) {
      enterThread('A2', 'estimate', params);

      let stepNum = readStep(params.step, state.step, 3);

      let snapped48 = Boolean(state.snapped48);
      let snapped392 = Boolean(state.snapped392);
      let done = Boolean(state.done);

      state.step = stepNum;
      state.snapped48 = snapped48;
      state.snapped392 = snapped392;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('estimate.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      // Step tabs
      const stepTabs = el('div', {
        class: 'step-tabs',
        style: { display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: 'center' },
      });

      [1, 2, 3].forEach((s) => {
        const tabBtn = el('button', {
          class: `btn-choice ${stepNum === s ? 'active' : ''}`,
          text: t('estimate.stepTab', { n: String(s) }),
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

      function renderStep1Svg(): SVGElement {
        const s = svg('svg', {
          viewBox: '0 0 360 160',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('estimate.art'),
        });

        s.appendChild(
          svg('rect', {
            x: 10,
            y: 10,
            width: 340,
            height: 140,
            rx: 10,
            fill: 'var(--warm-bg, #fbf7ee)',
            stroke: 'var(--border, #d8d0c0)',
            'stroke-width': 2,
          })
        );

        // Number line 40 to 60
        s.appendChild(
          svg('line', {
            x1: 40,
            y1: 80,
            x2: 320,
            y2: 80,
            stroke: 'var(--border, #d8d0c0)',
            'stroke-width': 4,
          })
        );

        // Benchmarks 40 and 50 and 60
        [
          { val: 40, x: 50 },
          { val: 50, x: 190 },
          { val: 60, x: 310 },
        ].forEach((bm) => {
          s.appendChild(
            svg('circle', {
              cx: bm.x,
              cy: 80,
              r: 7,
              fill: '#5a8260',
            })
          );
          const tNode = svg('text', {
            x: bm.x,
            y: 110,
            'text-anchor': 'middle',
            'font-size': '13',
            'font-weight': 'bold',
            fill: 'var(--ink, #2d261e)',
          });
          tNode.textContent = String(bm.val);
          s.appendChild(tNode);
        });

        // 48 marker
        const markerX = snapped48 ? 190 : 162;
        s.appendChild(
          svg('circle', {
            cx: markerX,
            cy: 80,
            r: 10,
            fill: 'var(--accent, #a66a38)',
          })
        );

        const mText = svg('text', {
          x: markerX,
          y: 54,
          'text-anchor': 'middle',
          'font-size': '13',
          'font-weight': 'bold',
          fill: 'var(--accent, #a66a38)',
        });
        mText.textContent = snapped48 ? t('estimate.snapArrow') : '48';
        s.appendChild(mText);

        return s;
      }

      function renderStep2Svg(): SVGElement {
        const s = svg('svg', {
          viewBox: '0 0 360 160',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('estimate.safeZoneAria'),
        });

        s.appendChild(
          svg('rect', {
            x: 10,
            y: 10,
            width: 340,
            height: 140,
            rx: 10,
            fill: 'var(--warm-bg, #fbf7ee)',
            stroke: 'var(--border, #d8d0c0)',
            'stroke-width': 2,
          })
        );

        // Safe zone green band [1000 - 1400]
        s.appendChild(
          svg('rect', {
            x: 110,
            y: 65,
            width: 140,
            height: 30,
            rx: 6,
            fill: '#d2e4d5',
            stroke: '#5a8260',
            'stroke-width': 2,
          })
        );

        const safeTxt = svg('text', {
          x: 180,
          y: 85,
          'text-anchor': 'middle',
          'font-size': '12',
          'font-weight': 'bold',
          fill: '#2e6b38',
        });
        safeTxt.textContent = t('estimate.safeZoneLabel');
        s.appendChild(safeTxt);

        // Center 1200 marker
        s.appendChild(
          svg('circle', {
            cx: 180,
            cy: 80,
            r: 5,
            fill: 'var(--accent, #a66a38)',
          })
        );

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
          modelCard.appendChild(renderStep1Svg());
          const r48 = roundToNearest(48, 10);
          const r392 = roundToNearest(392, 100);

          if (snapped48 && snapped392) {
            equationCard.textContent = t('estimate.snapLine', {
              r48: String(r48),
              r392: String(r392),
            });
            say.textContent = t('estimate.s1done');
          } else {
            equationCard.textContent = t('estimate.snapPrompt');
            say.textContent = t('estimate.s1');
          }

          const ctrlRow = el('div', {
            class: 'ctrl-row',
            style: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' },
          });

          const snap48Btn = el('button', {
            class: `btn-choice ${snapped48 ? 'active' : ''}`,
            text: t('estimate.snap48'),
            style: { minHeight: '44px', padding: '8px 16px' },
            onClick: () => {
              snapped48 = true;
              state.snapped48 = true;
              paint();
            },
          });

          const snap392Btn = el('button', {
            class: `btn-choice ${snapped392 ? 'active' : ''}`,
            text: t('estimate.snap392'),
            style: { minHeight: '44px', padding: '8px 16px' },
            onClick: () => {
              snapped392 = true;
              state.snapped392 = true;
              paint();
            },
          });

          ctrlRow.appendChild(snap48Btn);
          ctrlRow.appendChild(snap392Btn);
          actionsCard.appendChild(ctrlRow);

          const nextStepBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('estimate.nextSafe'),
            style: { marginTop: '16px', minHeight: '44px', padding: '10px 20px' },
            onClick: () => {
              stepNum = 2;
              state.step = 2;
              paint();
            },
          });
          actionsCard.appendChild(nextStepBtn);
        } else if (stepNum === 2) {
          const res = estimateProduct(29, 41, 10);
          modelCard.appendChild(renderStep2Svg());
          equationCard.textContent = t('estimate.productEq', {
            a: String(res.roundA),
            b: String(res.roundB),
            est: String(res.estimate),
          });
          say.textContent = t('estimate.s2done');

          const nextStepBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('estimate.nextWild'),
            style: { marginTop: '16px', minHeight: '44px', padding: '10px 20px' },
            onClick: () => {
              stepNum = 3;
              state.step = 3;
              paint();
            },
          });
          actionsCard.appendChild(nextStepBtn);
        } else if (stepNum === 3) {
          modelCard.appendChild(renderStep2Svg());
          const est = estimateSum(392, 514, 100);
          estimateProduct(21, 39, 10);
          equationCard.textContent = t('estimate.checkPrompt');

          const choicesRow = el('div', {
            class: 'choices-row',
            style: { display: 'flex', gap: '12px', justifyContent: 'center' },
          });

          const wildBtn = el('button', {
            class: 'btn-choice',
            text: '8190',
            style: { minHeight: '44px', minWidth: '60px', padding: '8px 16px' },
            onClick: () => {
              isWildError(8190, 800);
              say.textContent = t('estimate.s3done');
            },
          });

          const safeBtn = el('button', {
            class: 'btn-choice',
            text: '819',
            style: { minHeight: '44px', minWidth: '60px', padding: '8px 16px' },
            onClick: () => {
              done = true;
              state.done = true;
              say.textContent = t('estimate.inZone', { diff: String(est.diff) });
              paint();
            },
          });

          choicesRow.appendChild(wildBtn);
          choicesRow.appendChild(safeBtn);
          actionsCard.appendChild(choicesRow);

          if (done) {
            actionsCard.appendChild(toMistakeButton('A2'));
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
