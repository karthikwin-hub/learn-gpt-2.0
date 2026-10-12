/**
 * Interactive Long Division workbench screen for Knot D4.
 * Models the four-beat rhythm (Divide, Multiply, Subtract, Bring down),
 * the Zero Gate quotient rule, and inverse multiplication verification.
 */

import { executeLongDivisionSteps, verifyLongDivision } from '../../../domain/math/longdiv';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
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

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;

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
        text: '1. Four-Beat Rhythm (824 ÷ 4)',
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab2 = el('button', {
        class: `step-tab ${stepNum === 2 ? 'active' : ''}`,
        text: '2. The Zero Gate (612 ÷ 3)',
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab3 = el('button', {
        class: `step-tab ${stepNum === 3 ? 'active' : ''}`,
        text: '3. Inverse Check',
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
            ? '824 ÷ 4 = 206 (Complete!)'
            : `Dividing 824 by 4 · Column ${subStep1 + 1} of 3`,
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

        bracketBox.innerHTML = `
          <div style="color: var(--color-accent, #c2410c); font-weight: bold; margin-left: 45px;">
            ${quotientDisplay || '&nbsp;'}
          </div>
          <div style="border-top: 2px solid currentColor; margin-left: 30px;">
            <span style="border-right: 2px solid currentColor; padding-right: 8px; margin-left: -30px;">4</span>
            <span style="letter-spacing: 4px;">824</span>
          </div>
          ${
            subStep1 >= 1
              ? '<div style="margin-left: 34px; color: #666;">- 8 (2 × 4)</div><div style="margin-left: 34px; border-top: 1px solid #aaa;">&nbsp; 02 (bring down 2)</div>'
              : ''
          }
          ${
            subStep1 >= 2
              ? '<div style="margin-left: 42px; color: #666;">- 0 (0 × 4)</div><div style="margin-left: 42px; border-top: 1px solid #aaa;">&nbsp; 24 (bring down 4)</div>'
              : ''
          }
          ${
            subStep1 >= 3
              ? '<div style="margin-left: 42px; color: #666;">- 24 (6 × 4)</div><div style="margin-left: 42px; border-top: 1px solid #aaa; font-weight: bold;">&nbsp; 00 (remainder)</div>'
              : ''
          }
        `;

        card.appendChild(bracketBox);

        // Four-beat badge chips
        const beatChips = el('div', {
          style: { display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' },
        });

        const beats = ['1. Divide', '2. Multiply', '3. Subtract', '4. Bring down'];
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
          text: isComplete ? 'Reset Rhythm' : 'Next Column House →',
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
          text: isCorrectZero
            ? '612 ÷ 3 = 204 (Zero Gate Guarded!)'
            : 'Tens House Gate: 3 does not fit into 1 ten!',
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

        bracketBox.innerHTML = `
          <div style="color: var(--color-accent, #c2410c); font-weight: bold; margin-left: 45px;">
            2${isCorrectZero ? '04' : '<span style="color:#b45309;">?</span>'}
          </div>
          <div style="border-top: 2px solid currentColor; margin-left: 30px;">
            <span style="border-right: 2px solid currentColor; padding-right: 8px; margin-left: -30px;">3</span>
            <span style="letter-spacing: 4px;">612</span>
          </div>
          <div style="margin-left: 34px; color: #666;">- 6 (2 × 3)</div>
          <div style="margin-left: 34px; border-top: 1px solid #aaa;">&nbsp; 01 (brought down 1)</div>
        `;
        card.appendChild(bracketBox);

        // Prompt question
        const promptEl = el('div', {
          class: 'gate-prompt',
          style: {
            margin: '12px 0',
            fontWeight: 'bold',
            color: isCorrectZero ? '#15803d' : '#b45309',
          },
          text: isCorrectZero
            ? '3 fits into 1 zero times! Wrote 0, brought down 2 ones to make 12 ÷ 3 = 4.'
            : 'Can 3 divide 1 ten? What digit must you write in the tens quotient house?',
        });
        card.appendChild(promptEl);

        const choiceGroup = el('div', {
          style: { display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '12px' },
        });

        const btnZero = el('button', {
          class: `btn ${isCorrectZero ? 'btn-primary' : 'btn-secondary'}`,
          text: 'Write 0',
          style: { minHeight: '44px', padding: '10px 20px', minWidth: '100px' },
        });

        const btnSkip = el('button', {
          class: 'btn btn-secondary',
          text: 'Skip & pull down 2 directly (write nothing)',
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
          say.textContent =
            'Every house must share! If 3 cannot divide 1, write 0 before opening the next door!';
          promptEl.textContent =
            'Omitting 0 turns 204 into 24! You must write 0 in the tens house.';
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
          text: verifiedStep3
            ? 'Verified: 204 × 3 = 612 (Inverse Multiplication)'
            : 'Check quotient using inverse multiplication',
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
          text: '(Quotient × Divisor) + Remainder = Dividend',
        });
        card.appendChild(formulaCard);

        const calculationDisplay = el('div', {
          class: 'calc-display',
          style: { fontSize: '1.2rem', margin: '16px 0', fontWeight: 'bold' },
          text: verifiedStep3
            ? '(204 × 3) + 0 = 612 + 0 = 612 ✓'
            : '204 × 3 = ? (Does it equal 612?)',
        });
        card.appendChild(calculationDisplay);

        const verifyBtn = el('button', {
          class: 'btn btn-primary',
          text: verifiedStep3 ? 'Check Again' : 'Verify (204 × 3)',
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
        text: '← Back to Bodha',
        style: { minHeight: '44px', padding: '10px 16px' },
      });
      bodhaBtn.addEventListener('click', () => {
        router.go('bodha', { k: 'D4' });
      });

      const mistakeBtn = el('button', {
        class: 'btn btn-primary',
        text: 'Spot the Mistake →',
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
