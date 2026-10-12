/**
 * Interactive Long Division workbench screen for Knot D4.
 * Models the four-beat rhythm (Divide, Multiply, Subtract, Bring down),
 * the Zero Gate quotient rule, and inverse multiplication verification.
 */

import { executeLongDivisionSteps, verifyLongDivision } from '../../../domain/math/longdiv';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { readStep } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createLongdivScreen(): ScreenMeta {
  return {
    id: 'longdiv',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'longdiv.title',
    render(view, state, params = {}) {
      enterThread('D4', 'longdiv', params);

      let stepNum = readStep(params.step, state.step, 3);

      let subStep1 = typeof state.subStep1 === 'number' ? state.subStep1 : 0;
      let zeroGateAnswer = state.zeroGateAnswer !== undefined ? String(state.zeroGateAnswer) : '';
      let verifiedStep3 = Boolean(state.verifiedStep3);

      state.step = stepNum;
      state.subStep1 = subStep1;
      state.zeroGateAnswer = zeroGateAnswer;
      state.verifiedStep3 = verifiedStep3;

      const titleEl = el('h2', { class: 'screen-title', text: t('longdiv.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      // Step tabs
      const stepTabs = el('div', {
        class: 'step-tabs',
        style: { display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: 'center' },
      });

      const tab1 = el('button', {
        class: `step-tab ${stepNum === 1 ? 'active' : ''}`,
        text: t('longdiv.tab1'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab2 = el('button', {
        class: `step-tab ${stepNum === 2 ? 'active' : ''}`,
        text: t('longdiv.tab2'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab3 = el('button', {
        class: `step-tab ${stepNum === 3 ? 'active' : ''}`,
        text: t('longdiv.tab3'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });

      tab1.addEventListener('click', () => {
        stepNum = 1;
        state.step = 1;
        renderActiveStep();
      });
      tab2.addEventListener('click', () => {
        stepNum = 2;
        state.step = 2;
        renderActiveStep();
      });
      tab3.addEventListener('click', () => {
        stepNum = 3;
        state.step = 3;
        renderActiveStep();
      });

      stepTabs.appendChild(tab1);
      stepTabs.appendChild(tab2);
      stepTabs.appendChild(tab3);

      const stageContainer = el('div', {
        class: 'longdiv-stage',
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '540px',
          margin: '0 auto',
        },
      });

      function renderActiveStep() {
        tab1.classList.toggle('active', stepNum === 1);
        tab2.classList.toggle('active', stepNum === 2);
        tab3.classList.toggle('active', stepNum === 3);
        clear(stageContainer);

        if (stepNum === 1) {
          renderStep1();
        } else if (stepNum === 2) {
          renderStep2();
        } else {
          renderStep3();
        }
      }

      // --- STEP 1: Four-Beat Rhythm (824 ÷ 4) ---
      function renderStep1() {
        clear(stageContainer);

        const trace = executeLongDivisionSteps(824, 4);
        const maxSubSteps = trace.steps.length;
        const isComplete = subStep1 >= maxSubSteps;
        say.textContent = isComplete ? t('longdiv.s1done') : t('longdiv.s1');

        const card = el('div', {
          class: 'card info-card',
          style: { width: '100%', padding: '16px', textAlign: 'center' },
        });

        const mathBanner = el('div', {
          class: 'math-banner',
          style: { fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px' },
          text: isComplete
            ? t('longdiv.rhythmDone')
            : t('longdiv.rhythmProgress', { col: String(subStep1 + 1) }),
        });
        card.appendChild(mathBanner);

        // Long division bracket visualization
        const bracketBox = el('div', {
          class: 'longdiv-bracket-box',
          style: {
            fontFamily: 'monospace',
            fontSize: '1.3rem',
            lineHeight: '1.6',
            display: 'inline-block',
            textAlign: 'left',
            background: 'var(--color-surface-soft, #f7f2ea)',
            padding: '16px 24px',
            borderRadius: '8px',
            border: '1px solid var(--color-border, #d1c7bd)',
            marginBottom: '16px',
          },
        });

        // Quotient line
        let quotientDisplay = '';
        if (subStep1 >= 1) quotientDisplay += '2';
        if (subStep1 >= 2) quotientDisplay += '0';
        if (subStep1 >= 3) quotientDisplay += '6';

        bracketBox.appendChild(
          el('div', {
            style: {
              color: 'var(--color-accent, #c2410c)',
              fontWeight: 'bold',
              marginLeft: '45px',
            },
            text: quotientDisplay || ' ',
          })
        );
        bracketBox.appendChild(
          el(
            'div',
            {
              style: { borderTop: '2px solid currentColor', marginLeft: '30px' },
            },
            [
              el('span', {
                style: {
                  borderRight: '2px solid currentColor',
                  paddingRight: '8px',
                  marginLeft: '-30px',
                },
                text: '4',
              }),
              el('span', { style: { letterSpacing: '4px' }, text: '824' }),
            ]
          )
        );
        if (subStep1 >= 1) {
          bracketBox.appendChild(
            el('div', { style: { marginLeft: '34px', color: '#666' }, text: t('longdiv.sub8') })
          );
          bracketBox.appendChild(
            el('div', {
              style: { marginLeft: '34px', borderTop: '1px solid #aaa' },
              text: t('longdiv.bring2'),
            })
          );
        }
        if (subStep1 >= 2) {
          bracketBox.appendChild(
            el('div', { style: { marginLeft: '42px', color: '#666' }, text: t('longdiv.sub0') })
          );
          bracketBox.appendChild(
            el('div', {
              style: { marginLeft: '42px', borderTop: '1px solid #aaa' },
              text: t('longdiv.bring4'),
            })
          );
        }
        if (subStep1 >= 3) {
          bracketBox.appendChild(
            el('div', { style: { marginLeft: '42px', color: '#666' }, text: t('longdiv.sub24') })
          );
          bracketBox.appendChild(
            el('div', {
              style: { marginLeft: '42px', borderTop: '1px solid #aaa', fontWeight: 'bold' },
              text: t('longdiv.rem0'),
            })
          );
        }

        card.appendChild(bracketBox);

        // Four-beat badge chips
        const beatChips = el('div', {
          style: { display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' },
        });

        const beats = [
          t('longdiv.beat1'),
          t('longdiv.beat2'),
          t('longdiv.beat3'),
          t('longdiv.beat4'),
        ];
        beats.forEach((b) => {
          const chip = el('span', {
            class: 'beat-chip',
            style: {
              background: '#fff',
              border: '1px solid var(--color-border, #ccc)',
              borderRadius: '12px',
              padding: '4px 8px',
              fontSize: '0.85rem',
            },
            text: b,
          });
          beatChips.appendChild(chip);
        });

        card.appendChild(beatChips);

        const btnGroup = el('div', {
          style: { display: 'flex', gap: '8px', justifyContent: 'center' },
        });

        const nextStepBtn = el('button', {
          class: 'btn btn-primary',
          text: isComplete ? t('longdiv.resetRhythm') : t('longdiv.nextColumn'),
          style: { minHeight: '44px', padding: '10px 18px' },
        });

        nextStepBtn.addEventListener('click', () => {
          if (isComplete) {
            subStep1 = 0;
            state.subStep1 = 0;
          } else {
            subStep1++;
            state.subStep1 = subStep1;
          }
          renderStep1();
        });

        btnGroup.appendChild(nextStepBtn);
        card.appendChild(btnGroup);
        stageContainer.appendChild(card);
      }

      // --- STEP 2: The Zero Gate (612 ÷ 3) ---
      function renderStep2() {
        clear(stageContainer);

        const isCorrectZero = zeroGateAnswer === '0';
        say.textContent = isCorrectZero ? t('longdiv.s2done') : t('longdiv.s2');

        const card = el('div', {
          class: 'card info-card',
          style: { width: '100%', padding: '16px', textAlign: 'center' },
        });

        const mathBanner = el('div', {
          class: 'math-banner',
          style: { fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px' },
          text: isCorrectZero ? t('longdiv.zeroDone') : t('longdiv.zeroPrompt'),
        });
        card.appendChild(mathBanner);

        // Bracket display
        const bracketBox = el('div', {
          class: 'longdiv-bracket-box',
          style: {
            fontFamily: 'monospace',
            fontSize: '1.3rem',
            lineHeight: '1.6',
            display: 'inline-block',
            textAlign: 'left',
            background: 'var(--color-surface-soft, #f7f2ea)',
            padding: '16px 24px',
            borderRadius: '8px',
            border: '1px solid var(--color-border, #d1c7bd)',
            marginBottom: '16px',
          },
        });

        bracketBox.appendChild(
          el('div', {
            style: {
              color: 'var(--color-accent, #c2410c)',
              fontWeight: 'bold',
              marginLeft: '45px',
            },
            text: isCorrectZero ? '204' : '2?',
          })
        );
        bracketBox.appendChild(
          el('div', { style: { borderTop: '2px solid currentColor', marginLeft: '30px' } }, [
            el('span', {
              style: {
                borderRight: '2px solid currentColor',
                paddingRight: '8px',
                marginLeft: '-30px',
              },
              text: '3',
            }),
            el('span', { style: { letterSpacing: '4px' }, text: '612' }),
          ])
        );
        bracketBox.appendChild(
          el('div', { style: { marginLeft: '34px', color: '#666' }, text: t('longdiv.sub6') })
        );
        bracketBox.appendChild(
          el('div', {
            style: { marginLeft: '34px', borderTop: '1px solid #aaa' },
            text: t('longdiv.bring1'),
          })
        );
        card.appendChild(bracketBox);

        // Prompt question
        const promptEl = el('div', {
          class: 'gate-prompt',
          style: {
            margin: '12px 0',
            fontWeight: 'bold',
            color: isCorrectZero ? '#15803d' : '#b45309',
          },
          text: isCorrectZero ? t('longdiv.zeroExplain') : t('longdiv.zeroAsk'),
        });
        card.appendChild(promptEl);

        const choiceGroup = el('div', {
          style: { display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '12px' },
        });

        const btnZero = el('button', {
          class: `btn ${isCorrectZero ? 'btn-primary' : 'btn-secondary'}`,
          text: t('longdiv.writeZero'),
          style: { minHeight: '44px', padding: '10px 20px', minWidth: '100px' },
        });

        const btnSkip = el('button', {
          class: 'btn btn-secondary',
          text: t('longdiv.skipZero'),
          style: { minHeight: '44px', padding: '10px 16px' },
        });

        btnZero.addEventListener('click', () => {
          zeroGateAnswer = '0';
          state.zeroGateAnswer = '0';
          renderStep2();
        });

        btnSkip.addEventListener('click', () => {
          zeroGateAnswer = 'skip';
          state.zeroGateAnswer = 'skip';
          say.textContent = t('longdiv.skipWarn');
          promptEl.textContent = t('longdiv.omitWarn');
        });

        choiceGroup.appendChild(btnZero);
        choiceGroup.appendChild(btnSkip);
        card.appendChild(choiceGroup);
        stageContainer.appendChild(card);
      }

      // --- STEP 3: Inverse Check ---
      function renderStep3() {
        clear(stageContainer);

        say.textContent = verifiedStep3 ? t('longdiv.s3done') : t('longdiv.s3');

        const card = el('div', {
          class: 'card info-card',
          style: { width: '100%', padding: '16px', textAlign: 'center' },
        });

        const mathBanner = el('div', {
          class: 'math-banner',
          style: { fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px' },
          text: verifiedStep3 ? t('longdiv.verifyDone') : t('longdiv.verifyPrompt'),
        });
        card.appendChild(mathBanner);

        const formulaCard = el('div', {
          class: 'formula-card',
          style: {
            background: 'var(--color-surface-soft, #f7f2ea)',
            padding: '16px',
            borderRadius: '8px',
            margin: '12px 0',
            fontFamily: 'monospace',
            fontSize: '1.1rem',
          },
          text: t('longdiv.inverseFormula'),
        });
        card.appendChild(formulaCard);

        const calculationDisplay = el('div', {
          class: 'calc-display',
          style: { fontSize: '1.2rem', margin: '16px 0', fontWeight: 'bold' },
          text: verifiedStep3 ? t('longdiv.verifyCalcDone') : t('longdiv.verifyCalc'),
        });
        card.appendChild(calculationDisplay);

        const verifyBtn = el('button', {
          class: 'btn btn-primary',
          text: verifiedStep3 ? t('longdiv.checkAgain') : t('longdiv.verifyBtn'),
          style: { minHeight: '44px', padding: '10px 20px' },
        });

        verifyBtn.addEventListener('click', () => {
          verifiedStep3 = verifyLongDivision(612, 3, 204, 0);
          state.verifiedStep3 = verifiedStep3;
          renderStep3();
        });

        card.appendChild(verifyBtn);
        stageContainer.appendChild(card);
      }

      // Initial render
      renderActiveStep();

      // Navigation footer
      const navFooter = el('div', {
        class: 'nav-footer',
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '540px',
          marginTop: '20px',
        },
      });

      const bodhaBtn = el('button', {
        class: 'btn btn-subtle',
        text: t('number.backBodha'),
        style: { minHeight: '44px', padding: '10px 16px' },
      });
      bodhaBtn.addEventListener('click', () => {
        router.go('bodha', { k: 'D4' });
      });

      const mistakeBtn = el('button', {
        class: 'btn btn-primary',
        text: t('number.forwardMistake'),
        style: { minHeight: '44px', padding: '10px 16px' },
      });
      mistakeBtn.addEventListener('click', () => {
        router.go('mistake', { k: 'D4' });
      });

      navFooter.appendChild(bodhaBtn);
      navFooter.appendChild(mistakeBtn);

      view.appendChild(titleEl);
      view.appendChild(say);
      view.appendChild(stepTabs);
      view.appendChild(stageContainer);
      view.appendChild(navFooter);
    },
  };
}
