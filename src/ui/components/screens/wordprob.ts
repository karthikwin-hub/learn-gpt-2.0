/**
 * Interactive Word Problem Action Detective workbench screen for Knot A3.
 * Models physical root actions (Combine, Compare, Replicate, Partition),
 * visualizes tape diagrams, and busts misleading keyword heuristics.
 */

import {
  classifyRootAction,
  evaluateProblemModel,
  buildComparisonGap,
  type RootAction,
} from '../../../domain/math/wordprob';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { readStep } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createWordprobScreen(): ScreenMeta {
  return {
    id: 'wordprob',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'wordprob.title',
    render(view, state, params = {}) {
      enterThread('A3', 'wordprob', params);

      let stepNum = readStep(params.step, state.step, 3);

      let selectedAction = state.selectedAction ? String(state.selectedAction) : '';
      let comparisonRevealed = Boolean(state.comparisonRevealed);
      let equationAssembled = Boolean(state.equationAssembled);

      state.step = stepNum;
      state.selectedAction = selectedAction;
      state.comparisonRevealed = comparisonRevealed;
      state.equationAssembled = equationAssembled;

      const titleEl = el('h2', { class: 'screen-title', text: t('wordprob.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      // Step tabs
      const stepTabs = el('div', {
        class: 'step-tabs',
        style: { display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: 'center' },
      });

      const tab1 = el('button', {
        class: `step-tab ${stepNum === 1 ? 'active' : ''}`,
        text: t('wordprob.tab1'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab2 = el('button', {
        class: `step-tab ${stepNum === 2 ? 'active' : ''}`,
        text: t('wordprob.tab2'),
        style: { minHeight: '44px', padding: '8px 12px' },
      });
      const tab3 = el('button', {
        class: `step-tab ${stepNum === 3 ? 'active' : ''}`,
        text: t('wordprob.tab3'),
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
        class: 'wordprob-stage',
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

      // --- STEP 1: Action Detective (Replicate Equal Groups) ---
      function renderStep1() {
        clear(stageContainer);

        const isCorrect = selectedAction === 'replicate';
        say.textContent = isCorrect ? t('wordprob.s1done') : t('wordprob.s1');

        const card = el('div', {
          class: 'card info-card',
          style: { width: '100%', padding: '16px', textAlign: 'center' },
        });

        const storyCard = el('div', {
          class: 'story-card',
          style: {
            background: 'var(--color-surface-soft, #f7f2ea)',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid var(--color-accent, #c2410c)',
            marginBottom: '16px',
            textAlign: 'left',
          },
        });

        storyCard.appendChild(
          el('div', {
            style: {
              fontWeight: 'bold',
              marginBottom: '6px',
              color: 'var(--color-accent, #c2410c)',
            },
            text: t('wordprob.story1Title'),
          })
        );
        storyCard.appendChild(
          el('div', {
            style: { fontSize: '1.1rem', lineHeight: '1.5' },
            text: t('wordprob.story1'),
          })
        );
        card.appendChild(storyCard);

        // Action badge choices
        const badgeTitle = el('div', {
          style: { fontWeight: 'bold', marginBottom: '8px' },
          text: t('wordprob.actionPrompt'),
        });
        card.appendChild(badgeTitle);

        const badgesGrid = el('div', {
          class: 'action-badges-grid',
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
            marginBottom: '16px',
          },
        });

        const actions: { id: RootAction; label: string }[] = [
          { id: 'combine', label: t('wordprob.actionJoin') },
          { id: 'compare', label: t('wordprob.actionCompare') },
          { id: 'replicate', label: t('wordprob.actionReplicate') },
          { id: 'partition', label: t('wordprob.actionPartition') },
        ];

        actions.forEach((act) => {
          const opSymbol = classifyRootAction(act.id);
          const btn = el('button', {
            class: `btn action-badge ${selectedAction === act.id ? 'btn-primary' : 'btn-secondary'}`,
            style: { minHeight: '48px', padding: '10px 8px', fontSize: '0.95rem' },
            text: `${act.label} (${opSymbol})`,
          });

          btn.addEventListener('click', () => {
            selectedAction = act.id;
            state.selectedAction = act.id;
            renderStep1();
          });

          badgesGrid.appendChild(btn);
        });

        card.appendChild(badgesGrid);

        // Tape Diagram reveal
        if (isCorrect) {
          const diagramBox = el('div', {
            class: 'tape-diagram-box',
            style: {
              background: '#f0fdf4',
              border: '2px solid #16a34a',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '12px',
            },
          });

          const diagTitle = el('div', {
            style: { fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' },
            text: t('wordprob.tapeReplicate'),
          });
          diagramBox.appendChild(diagTitle);

          const tape = el('div', {
            style: { display: 'flex', gap: '4px', justifyContent: 'center' },
          });

          for (let i = 1; i <= 6; i++) {
            const block = el('div', {
              style: {
                background: '#bbf7d0',
                border: '1px solid #16a34a',
                borderRadius: '4px',
                padding: '6px',
                minWidth: '38px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '0.9rem',
              },
              text: '24',
            });
            tape.appendChild(block);
          }
          diagramBox.appendChild(tape);
          card.appendChild(diagramBox);
        }

        stageContainer.appendChild(card);
      }

      // --- STEP 2: Comparison Gap (The "More" Trap) ---
      function renderStep2() {
        clear(stageContainer);

        say.textContent = comparisonRevealed ? t('wordprob.s2done') : t('wordprob.s2');

        const card = el('div', {
          class: 'card info-card',
          style: { width: '100%', padding: '16px', textAlign: 'center' },
        });

        const storyCard = el('div', {
          class: 'story-card',
          style: {
            background: 'var(--color-surface-soft, #f7f2ea)',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #b45309',
            marginBottom: '16px',
            textAlign: 'left',
          },
        });

        storyCard.appendChild(
          el('div', {
            style: { fontWeight: 'bold', marginBottom: '6px', color: '#b45309' },
            text: t('wordprob.story2Title'),
          })
        );
        storyCard.appendChild(
          el('div', {
            style: { fontSize: '1.1rem', lineHeight: '1.5' },
            text: t('wordprob.story2'),
          })
        );
        card.appendChild(storyCard);

        const gapData = buildComparisonGap(40, 15);

        // Visual Tape Diagram comparison
        const barsContainer = el('div', {
          class: 'comparison-bars',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            margin: '16px 0',
            textAlign: 'left',
          },
        });

        const bar1 = el('div', {
          style: {
            width: '100%',
            background: 'var(--color-accent, #c2410c)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px',
            fontWeight: 'bold',
          },
          text: t('wordprob.flagpole'),
        });

        const bar2Wrap = el('div', {
          style: { display: 'flex', width: '100%', gap: '4px' },
        });

        const bar2 = el('div', {
          style: {
            width: `${(15 / 40) * 100}%`,
            background: '#0284c7',
            color: '#fff',
            padding: '8px',
            borderRadius: '6px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          },
          text: t('wordprob.lamppost'),
        });

        const gapBar = el('div', {
          class: 'gap-bar',
          style: {
            flex: '1',
            background: comparisonRevealed ? '#fef3c7' : '#eee',
            border: comparisonRevealed ? '2px dashed #b45309' : '1px dashed #aaa',
            color: '#b45309',
            padding: '8px',
            borderRadius: '6px',
            fontWeight: 'bold',
            textAlign: 'center',
          },
          text: comparisonRevealed
            ? t('wordprob.gapReveal', { eq: gapData.equation })
            : t('wordprob.gapHidden'),
        });

        bar2Wrap.appendChild(bar2);
        bar2Wrap.appendChild(gapBar);

        barsContainer.appendChild(bar1);
        barsContainer.appendChild(bar2Wrap);
        card.appendChild(barsContainer);

        const btnReveal = el('button', {
          class: 'btn btn-primary',
          text: comparisonRevealed ? t('wordprob.gapDone') : t('wordprob.gapBtn'),
          style: { minHeight: '44px', padding: '10px 18px' },
        });

        btnReveal.addEventListener('click', () => {
          comparisonRevealed = true;
          state.comparisonRevealed = true;
          renderStep2();
        });

        card.appendChild(btnReveal);
        stageContainer.appendChild(card);
      }

      // --- STEP 3: Equation Assembler (Equal Shares) ---
      function renderStep3() {
        clear(stageContainer);

        say.textContent = equationAssembled ? t('wordprob.s3done') : t('wordprob.s3');

        const card = el('div', {
          class: 'card info-card',
          style: { width: '100%', padding: '16px', textAlign: 'center' },
        });

        const storyCard = el('div', {
          class: 'story-card',
          style: {
            background: 'var(--color-surface-soft, #f7f2ea)',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #16a34a',
            marginBottom: '16px',
            textAlign: 'left',
          },
        });

        storyCard.appendChild(
          el('div', {
            style: { fontWeight: 'bold', marginBottom: '6px', color: '#16a34a' },
            text: t('wordprob.story3Title'),
          })
        );
        storyCard.appendChild(
          el('div', {
            style: { fontSize: '1.1rem', lineHeight: '1.5' },
            text: t('wordprob.story3'),
          })
        );
        card.appendChild(storyCard);

        const resultVal = evaluateProblemModel(30, 5, '÷');
        const assembledEquation = el('div', {
          class: 'math-banner',
          style: {
            fontSize: '1.4rem',
            fontWeight: 'bold',
            padding: '12px',
            background: equationAssembled ? '#f0fdf4' : 'var(--color-surface-soft, #f7f2ea)',
            border: equationAssembled ? '2px solid #16a34a' : '1px solid var(--color-border, #ccc)',
            borderRadius: '8px',
            margin: '16px 0',
          },
          text: equationAssembled
            ? t('wordprob.equationDone', { n: String(resultVal) })
            : t('wordprob.equationPending'),
        });
        card.appendChild(assembledEquation);

        const assembleBtn = el('button', {
          class: 'btn btn-primary',
          text: equationAssembled ? t('wordprob.assembleDone') : t('wordprob.assembleBtn'),
          style: { minHeight: '44px', padding: '10px 18px' },
        });

        assembleBtn.addEventListener('click', () => {
          equationAssembled = true;
          state.equationAssembled = true;
          renderStep3();
        });

        card.appendChild(assembleBtn);
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
        router.go('bodha', { k: 'A3' });
      });

      const mistakeBtn = el('button', {
        class: 'btn btn-primary',
        text: t('number.forwardMistake'),
        style: { minHeight: '44px', padding: '10px 16px' },
      });
      mistakeBtn.addEventListener('click', () => {
        router.go('mistake', { k: 'A3' });
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
