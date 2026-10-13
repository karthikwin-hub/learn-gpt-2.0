/**
 * Interactive Divisibility Tests workbench screen for Knot F3.
 * Models last-digit gates (2, 5, 10), digit-sum balance beam (3, 9),
 * and dual-gate composite filter for 6.
 */

import {
  getDigits,
  getDigitSumSteps,
  testDivisibility,
  type DivisibilityResult,
} from '../../../domain/math/divisibility';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

function reasonText(r: DivisibilityResult): string {
  const { id, last, sum, sumExpression, quotient } = r.reason;
  return t(`divisibility.reason.${id}`, {
    last,
    sum,
    expr: sumExpression,
    d: r.divisor,
    q: quotient,
  });
}

export function createDivisibilityScreen(): ScreenMeta {
  return {
    id: 'divisibility',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'divisibility.title',
    render(view, state, params = {}) {
      enterThread('F3', 'divisibility', params);

      let stepNum = readStep(params.step, state.step, 3);

      let numStep1 = typeof state.numStep1 === 'number' ? state.numStep1 : 5232;
      let activeDivisor1: 2 | 5 | 10 =
        state.activeDivisor1 === 5 || state.activeDivisor1 === 10 ? state.activeDivisor1 : 2;

      let numStep2 = typeof state.numStep2 === 'number' ? state.numStep2 : 5232;
      let numStep3 = typeof state.numStep3 === 'number' ? state.numStep3 : 5232;

      state.step = stepNum;
      state.numStep1 = numStep1;
      state.activeDivisor1 = activeDivisor1;
      state.numStep2 = numStep2;
      state.numStep3 = numStep3;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('divisibility.title'),
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
        text: t('divisibility.tab1'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab2 = el('button', {
        class: `step-tab ${stepNum === 2 ? 'active' : ''}`,
        text: t('divisibility.tab2'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab3 = el('button', {
        class: `step-tab ${stepNum === 3 ? 'active' : ''}`,
        text: t('divisibility.tab3'),
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

      // --- STEP 1: Last-Digit Gate (2, 5, 10) ---
      function renderStep1() {
        say.textContent = t('divisibility.s1');

        const card = el('div', {
          class: 'divisibility-card-step1',
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

        // Test number presets: 5232, 4125, 4120, 43
        const numSelector = el('div', {
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' },
        });

        [5232, 4125, 4120, 43].forEach((val) => {
          const btn = el('button', {
            class: `btn-select-number ${numStep1 === val ? 'active' : ''}`,
            text: `${val}`,
            style: {
              minWidth: '44px',
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontWeight: numStep1 === val ? '700' : '500',
              backgroundColor: numStep1 === val ? '#e3f2fd' : 'transparent',
              border: numStep1 === val ? '2px solid #1976d2' : '1px solid #cccccc',
            },
          });
          btn.onclick = () => {
            numStep1 = val;
            state.numStep1 = val;
            renderWorkbench();
          };
          numSelector.appendChild(btn);
        });

        // Digits visualization highlighting the last digit
        const digits = getDigits(numStep1);
        const digitsBox = el('div', {
          class: 'digits-display-box',
          style: { display: 'flex', gap: '6px', alignItems: 'center' },
        });

        digits.forEach((d, idx) => {
          const isLast = idx === digits.length - 1;
          const dTile = el('div', {
            class: `digit-tile ${isLast ? 'last-digit-highlight' : ''}`,
            text: `${d}`,
            style: {
              width: '40px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '700',
              borderRadius: '6px',
              backgroundColor: isLast ? '#ffe082' : '#f5f5f5',
              border: isLast ? '2px solid #ff8f00' : '1px solid #d0d0d0',
              color: isLast ? '#e65100' : '#333333',
            },
          });
          digitsBox.appendChild(dTile);
        });

        const lastDigitBadge = el('div', {
          class: 'units-badge',
          text: t('divisibility.unitsBadge', { d: digits[digits.length - 1] ?? 0 }),
          style: { fontSize: '13px', fontWeight: '600', color: 'var(--kumkum)' },
        });

        // Divisor selector: 2, 5, 10
        const divisorTabs = el('div', {
          class: 'divisor-tabs',
          style: { display: 'flex', gap: '8px', justifyContent: 'center' },
        });

        ([2, 5, 10] as const).forEach((div) => {
          const btn = el('button', {
            class: `btn-divisor-tab ${activeDivisor1 === div ? 'active' : ''}`,
            text: t('divisibility.testDiv', { d: div }),
            style: {
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontWeight: activeDivisor1 === div ? '700' : '500',
              backgroundColor: activeDivisor1 === div ? '#c8e6c9' : '#f5f5f5',
              border: activeDivisor1 === div ? '2px solid #2e7d32' : '1px solid #cccccc',
            },
          });
          btn.onclick = () => {
            activeDivisor1 = div;
            state.activeDivisor1 = div;
            renderWorkbench();
          };
          divisorTabs.appendChild(btn);
        });

        const testRes = testDivisibility(numStep1, activeDivisor1);

        const verdictBanner = el('div', {
          class: `divisibility-verdict ${testRes.passes ? 'passes' : 'fails'}`,
          text: testRes.passes
            ? t('divisibility.verdictPass', {
                n: numStep1,
                d: activeDivisor1,
                reason: reasonText(testRes),
              })
            : t('divisibility.verdictFail', {
                n: numStep1,
                d: activeDivisor1,
                reason: reasonText(testRes),
              }),
          style: {
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            textAlign: 'center',
            backgroundColor: testRes.passes ? '#e8f5e9' : '#ffebee',
            color: testRes.passes ? '#2e7d32' : '#c62828',
            border: `1px solid ${testRes.passes ? '#81c784' : '#ef9a9a'}`,
          },
        });

        const nextBtn = el('button', {
          class: 'btn-next-step primary-button',
          text: t('divisibility.toSum'),
          style: { minHeight: '44px', padding: '10px 16px', marginTop: '8px' },
        });
        nextBtn.onclick = () => switchStep(2);

        card.append(numSelector, digitsBox, lastDigitBadge, divisorTabs, verdictBanner, nextBtn);
        contentBox.appendChild(card);
      }

      // --- STEP 2: Digit-Sum Beam (3, 9) ---
      function renderStep2() {
        say.textContent = t('divisibility.s2');

        const card = el('div', {
          class: 'divisibility-card-step2',
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

        // Presets: 5232, 729, 43, 819
        const numSelector = el('div', {
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' },
        });

        [5232, 729, 43, 819].forEach((val) => {
          const btn = el('button', {
            class: `btn-select-number-step2 ${numStep2 === val ? 'active' : ''}`,
            text: `${val}`,
            style: {
              minWidth: '44px',
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontWeight: numStep2 === val ? '700' : '500',
              backgroundColor: numStep2 === val ? '#ede7f6' : 'transparent',
              border: numStep2 === val ? '2px solid #673ab7' : '1px solid #cccccc',
            },
          });
          btn.onclick = () => {
            numStep2 = val;
            state.numStep2 = val;
            renderWorkbench();
          };
          numSelector.appendChild(btn);
        });

        const { sum, sumExpression } = getDigitSumSteps(numStep2);

        const sumBox = el('div', {
          class: 'digit-sum-box',
          style: {
            padding: '12px 18px',
            backgroundColor: '#ede7f6',
            borderRadius: '8px',
            border: '1px solid #b39ddb',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            width: '100%',
            boxSizing: 'border-box',
          },
        });

        const formulaText = el('div', {
          class: 'sum-expression-text',
          text: t('divisibility.sumLine', { expr: sumExpression }),
          style: { fontSize: '18px', fontWeight: '700', color: '#4a148c' },
        });

        const whyPlaceValText = el('p', {
          class: 'why-place-value-note',
          text: t('divisibility.placeValueNote'),
          style: { fontSize: '12px', margin: '0', textAlign: 'center', color: '#5e35b1' },
        });

        sumBox.append(formulaText, whyPlaceValText);

        // Test 3 and Test 9 cards
        const res3 = testDivisibility(numStep2, 3);
        const res9 = testDivisibility(numStep2, 9);

        const testsContainer = el('div', {
          style: { display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' },
        });

        const test3Row = el('div', {
          class: `test-rule-row ${res3.passes ? 'passes' : 'fails'}`,
          style: {
            padding: '8px 12px',
            borderRadius: '6px',
            backgroundColor: res3.passes ? '#e8f5e9' : '#ffebee',
            border: `1px solid ${res3.passes ? '#81c784' : '#ef9a9a'}`,
            fontSize: '13px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        });
        const t3Label = el('span', {
          text: t('divisibility.test3', { sum }),
          style: { fontWeight: '700' },
        });
        const t3Verdict = el('span', {
          class: 't3-verdict',
          text: res3.passes ? t('divisibility.yes3') : t('divisibility.no3'),
          style: { color: res3.passes ? '#2e7d32' : '#c62828', fontWeight: '700' },
        });
        test3Row.append(t3Label, t3Verdict);

        const test9Row = el('div', {
          class: `test-rule-row ${res9.passes ? 'passes' : 'fails'}`,
          style: {
            padding: '8px 12px',
            borderRadius: '6px',
            backgroundColor: res9.passes ? '#e8f5e9' : '#ffebee',
            border: `1px solid ${res9.passes ? '#81c784' : '#ef9a9a'}`,
            fontSize: '13px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        });
        const t9Label = el('span', {
          text: t('divisibility.test9', { sum }),
          style: { fontWeight: '700' },
        });
        const t9Verdict = el('span', {
          class: 't9-verdict',
          text: res9.passes ? t('divisibility.yes9') : t('divisibility.no9'),
          style: { color: res9.passes ? '#2e7d32' : '#c62828', fontWeight: '700' },
        });
        test9Row.append(t9Label, t9Verdict);

        testsContainer.append(test3Row, test9Row);

        const nextBtn = el('button', {
          class: 'btn-next-step primary-button',
          text: t('divisibility.toGate6'),
          style: { minHeight: '44px', padding: '10px 16px', marginTop: '8px' },
        });
        nextBtn.onclick = () => switchStep(3);

        card.append(numSelector, sumBox, testsContainer, nextBtn);
        contentBox.appendChild(card);
      }

      // --- STEP 3: Dual-Gate for 6 ---
      function renderStep3() {
        say.textContent = t('divisibility.s3');

        const card = el('div', {
          class: 'divisibility-card-step3',
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

        // Presets: 5232 (both pass), 27 (fails 2), 14 (fails 3), 36 (both pass)
        const numSelector = el('div', {
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' },
        });

        [5232, 27, 14, 36].forEach((val) => {
          const btn = el('button', {
            class: `btn-select-number-step3 ${numStep3 === val ? 'active' : ''}`,
            text: `${val}`,
            style: {
              minWidth: '44px',
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontWeight: numStep3 === val ? '700' : '500',
              backgroundColor: numStep3 === val ? '#e0f2f1' : 'transparent',
              border: numStep3 === val ? '2px solid #00897b' : '1px solid #cccccc',
            },
          });
          btn.onclick = () => {
            numStep3 = val;
            state.numStep3 = val;
            renderWorkbench();
          };
          numSelector.appendChild(btn);
        });

        const isEven = testDivisibility(numStep3, 2).passes;
        const isSumDiv3 = testDivisibility(numStep3, 3).passes;
        const isDiv6 = testDivisibility(numStep3, 6).passes;

        const dualGatesBox = el('div', {
          class: 'dual-gates-box',
          style: {
            display: 'flex',
            gap: '12px',
            width: '100%',
            justifyContent: 'center',
          },
        });

        const gate2 = el('div', {
          class: `gate-indicator gate-2 ${isEven ? 'green' : 'red'}`,
          style: {
            flex: '1',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: isEven ? '#e8f5e9' : '#ffebee',
            border: `2px solid ${isEven ? '#4caf50' : '#f44336'}`,
            textAlign: 'center',
          },
        });
        const g2Title = el('div', {
          text: t('divisibility.gate2Title'),
          style: { fontWeight: '700', fontSize: '14px' },
        });
        const g2State = el('div', {
          class: 'g2-state',
          text: isEven ? t('divisibility.gatePass') : t('divisibility.gateFail'),
          style: { fontWeight: '700', color: isEven ? '#2e7d32' : '#c62828', marginTop: '4px' },
        });
        gate2.append(g2Title, g2State);

        const gate3 = el('div', {
          class: `gate-indicator gate-3 ${isSumDiv3 ? 'green' : 'red'}`,
          style: {
            flex: '1',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: isSumDiv3 ? '#e8f5e9' : '#ffebee',
            border: `2px solid ${isSumDiv3 ? '#4caf50' : '#f44336'}`,
            textAlign: 'center',
          },
        });
        const g3Title = el('div', {
          text: t('divisibility.gate3Title'),
          style: { fontWeight: '700', fontSize: '14px' },
        });
        const g3State = el('div', {
          class: 'g3-state',
          text: isSumDiv3 ? t('divisibility.gatePass') : t('divisibility.gateFail'),
          style: { fontWeight: '700', color: isSumDiv3 ? '#2e7d32' : '#c62828', marginTop: '4px' },
        });
        gate3.append(g3Title, g3State);

        dualGatesBox.append(gate2, gate3);

        const gate6Result = el('div', {
          class: `gate-6-banner ${isDiv6 ? 'unlocked' : 'locked'}`,
          text: isDiv6
            ? t('divisibility.gate6Open', { n: numStep3 })
            : t('divisibility.gate6Shut', { n: numStep3 }),
          style: {
            padding: '12px 16px',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '15px',
            backgroundColor: isDiv6 ? '#e8f5e9' : '#ffebee',
            color: isDiv6 ? '#1b5e20' : '#b71c1c',
            border: `1px solid ${isDiv6 ? '#81c784' : '#ef9a9a'}`,
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          },
        });

        const doneBtn = toMistakeButton('F3');
        doneBtn.classList.add('btn-divisibility-done', 'primary-button');

        card.append(numSelector, dualGatesBox, gate6Result, doneBtn);
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
