/**
 * Interactive Regrouping workbench screen for Knot A1.
 * Models columnar place-value houses, unbundling across zeroes in subtraction,
 * and carry bundling in multi-digit addition.
 */

import {
  subtractWithRegrouping,
  addWithRegrouping,
  verifyConservation,
} from '../../../domain/math/regroup';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

export function createRegroupScreen(): ScreenMeta {
  return {
    id: 'regroup',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'regroup.title',
    render(view, state, params = {}) {
      enterThread('A1', 'regroup', params);

      let stepNum = readStep(params.step, state.step, 3);

      // Houses for unbundling step 1
      let hundreds = typeof state.hundreds === 'number' ? state.hundreds : 5;
      let tens = typeof state.tens === 'number' ? state.tens : 0;
      let ones = typeof state.ones === 'number' ? state.ones : 0;
      let done = Boolean(state.done);

      state.step = stepNum;
      state.hundreds = hundreds;
      state.tens = tens;
      state.ones = ones;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('regroup.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      // Step switcher tabs
      const stepTabs = el('div', {
        class: 'step-tabs',
        style: { display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: 'center' },
      });

      [1, 2, 3].forEach((s) => {
        const tabBtn = el('button', {
          class: `btn-choice ${stepNum === s ? 'active' : ''}`,
          text: t('regroup.stepTab', { n: String(s) }),
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

      function renderAbacusSvg(h: number, tCount: number, oCount: number): SVGElement {
        const s = svg('svg', {
          viewBox: '0 0 340 180',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('regroup.art'),
        });

        // Frame
        s.appendChild(
          svg('rect', {
            x: 10,
            y: 10,
            width: 320,
            height: 160,
            rx: 10,
            fill: 'var(--warm-bg, #fbf7ee)',
            stroke: 'var(--border, #d8d0c0)',
            'stroke-width': 2,
          })
        );

        const cols = [
          { name: t('regroup.colH'), count: h, x: 70 },
          { name: t('regroup.colT'), count: tCount, x: 170 },
          { name: t('regroup.colO'), count: oCount, x: 270 },
        ];

        cols.forEach((col) => {
          // Column rod
          s.appendChild(
            svg('line', {
              x1: col.x,
              y1: 30,
              x2: col.x,
              y2: 130,
              stroke: 'var(--border, #d8d0c0)',
              'stroke-width': 4,
            })
          );

          // Bead count display box
          s.appendChild(
            svg('rect', {
              x: col.x - 24,
              y: 50,
              width: 48,
              height: 40,
              rx: 8,
              fill: 'var(--accent, #a66a38)',
            })
          );

          const countTxt = svg('text', {
            x: col.x,
            y: 76,
            'text-anchor': 'middle',
            'font-size': '20',
            'font-weight': 'bold',
            fill: '#fff',
          });
          countTxt.textContent = String(col.count);
          s.appendChild(countTxt);

          // Column title
          const nameTxt = svg('text', {
            x: col.x,
            y: 152,
            'text-anchor': 'middle',
            'font-size': '12',
            fill: 'var(--ink, #2d261e)',
          });
          nameTxt.textContent = col.name;
          s.appendChild(nameTxt);
        });

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
          modelCard.appendChild(renderAbacusSvg(hundreds, tens, ones));
          const totalVal = verifyConservation({ hundreds, tens, ones });
          equationCard.textContent = t('regroup.conservationEq', {
            h: String(hundreds * 100),
            t: String(tens * 10),
            o: String(ones),
            total: String(totalVal),
          });

          if (hundreds === 4 && tens === 9 && ones === 10) {
            say.textContent = t('regroup.s1done');
          } else {
            say.textContent = t('regroup.s1');
          }

          const ctrlRow = el('div', {
            class: 'ctrl-row',
            style: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' },
          });

          const unbundleHundredBtn = el('button', {
            class: 'btn-choice',
            text: t('regroup.unbundleH'),
            style: { minHeight: '44px', padding: '8px 14px' },
            onClick: () => {
              if (hundreds > 0) {
                hundreds--;
                tens += 10;
                state.hundreds = hundreds;
                state.tens = tens;
                paint();
              }
            },
          });

          const unbundleTenBtn = el('button', {
            class: 'btn-choice',
            text: t('regroup.unbundleT'),
            style: { minHeight: '44px', padding: '8px 14px' },
            onClick: () => {
              if (tens > 0) {
                tens--;
                ones += 10;
                state.tens = tens;
                state.ones = ones;
                paint();
              }
            },
          });

          const resetBtn = el('button', {
            class: 'btn-choice',
            text: t('regroup.reset500'),
            style: { minHeight: '44px', padding: '8px 14px' },
            onClick: () => {
              hundreds = 5;
              tens = 0;
              ones = 0;
              state.hundreds = 5;
              state.tens = 0;
              state.ones = 0;
              paint();
            },
          });

          ctrlRow.appendChild(unbundleHundredBtn);
          ctrlRow.appendChild(unbundleTenBtn);
          ctrlRow.appendChild(resetBtn);
          actionsCard.appendChild(ctrlRow);

          const nextStepBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('regroup.nextSubtract'),
            style: { marginTop: '16px', minHeight: '44px', padding: '10px 20px' },
            onClick: () => {
              stepNum = 2;
              state.step = 2;
              paint();
            },
          });
          actionsCard.appendChild(nextStepBtn);
        } else if (stepNum === 2) {
          const res = subtractWithRegrouping(500, 247);
          modelCard.appendChild(renderAbacusSvg(2, 5, 3));
          equationCard.textContent = t('regroup.subtractEq', { result: String(res.difference) });
          say.textContent = t('regroup.s2done');

          const explanationBox = el('div', {
            style: {
              background: 'var(--warm-bg, #fbf7ee)',
              padding: '12px',
              borderRadius: '8px',
              maxWidth: '360px',
              margin: '8px auto',
              textAlign: 'left',
              fontSize: '14px',
            },
          });

          res.steps.forEach((st) => {
            const line = el('div', {
              text: t('regroup.columnStep', {
                place: st.placeName.toUpperCase(),
                top: String(st.topDigit),
                bottom: String(st.bottomDigit),
                result: String(st.resultDigit),
                extra: st.unbundled ? t('regroup.unbundledTag') : '',
              }),
            });
            explanationBox.appendChild(line);
          });
          actionsCard.appendChild(explanationBox);

          const nextStepBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('regroup.nextAdd'),
            style: { marginTop: '16px', minHeight: '44px', padding: '10px 20px' },
            onClick: () => {
              stepNum = 3;
              state.step = 3;
              paint();
            },
          });
          actionsCard.appendChild(nextStepBtn);
        } else if (stepNum === 3) {
          const res = addWithRegrouping(678, 456);
          modelCard.appendChild(renderAbacusSvg(1, 3, 4));
          equationCard.textContent = t('regroup.addEq', { sum: String(res.sum) });
          say.textContent = t('regroup.s3done');
          done = true;
          state.done = true;

          actionsCard.appendChild(toMistakeButton('A1'));
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
