/**
 * Interactive Manipulative Workbench for Knot L4: Sequences & Difference Ladders.
 *
 * Explores:
 * - Arithmetic difference ladders (constant addition/subtraction).
 * - Geometric sequences vs adding traps (Gita's mistake: doubling vs adding +8).
 * - Distant nth-term calculation without guessing.
 */

import {
  findFirstDifferences,
  isArithmeticSequence,
  predictNextTerm,
  predictNthTerm,
  SEQUENCE_PRESETS,
} from '../../../domain/math/sequences';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import type { ScreenMeta } from '../app/router';

export function createSequencesScreen(): ScreenMeta {
  return {
    id: 'sequences',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'sequences.title',
    render(view, state, params = {}) {
      enterThread('L4', 'sequences', params);

      let stepNum = readStep(params.step, state.step, 3);

      let currentTerms: number[] = Array.isArray(state.terms)
        ? (state.terms as number[])
        : [3, 7, 11, 15];

      let targetN = typeof state.targetN === 'number' ? state.targetN : 10;

      state.step = stepNum;
      state.terms = currentTerms;
      state.targetN = targetN;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('sequences.title'),
      });

      const feedbackEl = el('p', {
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

      const stepsConfig = [
        { num: 1, label: t('sequences.tab1') },
        { num: 2, label: t('sequences.tab2') },
        { num: 3, label: t('sequences.tab3') },
      ];

      stepsConfig.forEach((cfg) => {
        const btn = el('button', {
          class: `btn step-tab ${stepNum === cfg.num ? 'active' : ''}`,
          text: cfg.label,
          'aria-current': stepNum === cfg.num ? 'step' : undefined,
          style: {
            padding: '8px 14px',
            minHeight: '44px',
            borderRadius: '6px',
            border:
              stepNum === cfg.num ? '2px solid var(--ink, #1f2937)' : '1px solid var(--paper-sunk)',
            background: stepNum === cfg.num ? 'var(--paper)' : 'transparent',
            fontWeight: stepNum === cfg.num ? 'bold' : 'normal',
            cursor: 'pointer',
          },
          onClick() {
            stepNum = cfg.num;
            state.step = stepNum;
            if (stepNum === 2) {
              currentTerms = [2, 4, 8, 16];
            } else if (stepNum === 1) {
              currentTerms = [3, 7, 11, 15];
            }
            state.terms = currentTerms;
            renderWorkspace();
          },
        });
        stepTabs.appendChild(btn);
      });

      const workspaceContainer = el('div', {
        class: 'sequences-workspace',
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '580px',
          margin: '0 auto',
        },
      });

      function renderWorkspace() {
        stepTabs.querySelectorAll('.step-tab').forEach((b, i) => {
          const isActive = i + 1 === stepNum;
          (b as HTMLElement).style.fontWeight = isActive ? 'bold' : 'normal';
          (b as HTMLElement).style.border = isActive
            ? '2px solid var(--ink, #1f2937)'
            : '1px solid var(--paper-sunk)';
          (b as HTMLElement).style.background = isActive ? 'var(--paper)' : 'transparent';
        });

        clear(workspaceContainer);

        if (stepNum === 1) {
          renderArithmeticLadders();
        } else if (stepNum === 2) {
          renderDoublingTrap();
        } else {
          renderDistantPredictor();
        }
      }

      function renderArithmeticLadders() {
        const diffs = findFirstDifferences(currentTerms);
        const arith = isArithmeticSequence(currentTerms);
        const next = predictNextTerm(currentTerms);

        feedbackEl.textContent = arith.valid
          ? t('sequences.arithFeedback', {
              diff: `${arith.commonDifference! >= 0 ? '+' : ''}${arith.commonDifference}`,
              last: String(currentTerms[currentTerms.length - 1]),
              next: String(next),
            })
          : t('sequences.nonArithFeedback');

        // Preset buttons
        const presetBar = el('div', {
          class: 'preset-bar',
          style: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          },
        });

        SEQUENCE_PRESETS.filter((p) => p.id !== 'doubling-geom').forEach((preset) => {
          const isSel =
            currentTerms.length === preset.terms.length &&
            currentTerms.every((val, idx) => val === preset.terms[idx]);

          const pBtn = el('button', {
            class: `btn preset-btn ${isSel ? 'active' : ''}`,
            text: `${preset.name} (${preset.ruleName})`,
            style: {
              minHeight: '44px',
              padding: '6px 14px',
              borderRadius: '6px',
              fontWeight: isSel ? 'bold' : 'normal',
              background: isSel ? '#2563eb' : '#fff',
              color: isSel ? '#fff' : '#1f2937',
              border: '1px solid #d1d5db',
            },
            onClick() {
              currentTerms = [...preset.terms];
              state.terms = currentTerms;
              renderWorkspace();
            },
          });
          presetBar.appendChild(pBtn);
        });
        workspaceContainer.appendChild(presetBar);

        // Sequence train card
        const card = el('div', {
          class: 'sequence-card',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            background: 'var(--paper-raised)',
          },
        });

        // Term train row
        const trainRow = el('div', {
          class: 'terms-train',
          style: {
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
            padding: '10px 0',
          },
        });

        currentTerms.forEach((val, idx) => {
          const circle = el('div', {
            class: 'term-bubble',
            text: String(val),
            style: {
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: '#3b82f6',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            },
          });
          trainRow.appendChild(circle);

          if (idx < currentTerms.length - 1) {
            const jump = diffs[idx] ?? 0;
            const jumpPill = el('div', {
              class: 'stat-pill jump-indicator',
              text: `${jump >= 0 ? '+' : ''}${jump}`,
              style: {
                padding: '4px 8px',
                borderRadius: '12px',
                background: '#e0e7ff',
                color: '#3730a3',
                fontSize: '0.9rem',
                fontWeight: 'bold',
              },
            });
            trainRow.appendChild(jumpPill);
          }
        });

        // Next term preview bubble
        const arrow = el('span', {
          text: '→',
          style: { fontSize: '1.4rem', color: 'var(--ink-soft)', fontWeight: 'bold' },
        });
        const nextCircle = el('div', {
          class: 'term-bubble next-bubble',
          text: String(next),
          style: {
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'var(--teal)',
            color: 'var(--paper)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            border: '2px dashed #059669',
          },
        });
        trainRow.appendChild(arrow);
        trainRow.appendChild(nextCircle);

        card.appendChild(trainRow);

        // Difference Ladder Summary
        const ladderBox = el('div', {
          class: 'ladder-summary',
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          },
        });
        ladderBox.appendChild(
          el('span', {
            text: t('sequences.diffJumps', {
              jumps: diffs.map((d) => (d >= 0 ? `+${d}` : `${d}`)).join(', '),
            }),
            style: { fontWeight: '600', color: '#1e40af' },
          })
        );
        ladderBox.appendChild(
          el('span', {
            class: 'stat-pill sequence-next-pill',
            text: t('sequences.nextLabel', { next: String(next) }),
            style: {
              fontWeight: 'bold',
              fontSize: '1.1rem',
              color: '#065f46',
              background: '#d1fae5',
              padding: '6px 12px',
              borderRadius: '6px',
            },
          })
        );
        card.appendChild(ladderBox);

        // Train controls
        const ctrlRow = el('div', {
          style: { display: 'flex', gap: '8px', marginTop: '6px' },
        });
        const addBtn = el('button', {
          class: 'btn',
          text: t('sequences.appendStep'),
          style: { minHeight: '44px', padding: '6px 12px' },
          onClick() {
            if (currentTerms.length < 7) {
              currentTerms.push(next);
              state.terms = currentTerms;
              renderWorkspace();
            }
          },
        });
        const popBtn = el('button', {
          class: 'btn',
          text: t('sequences.removeStep'),
          style: { minHeight: '44px', padding: '6px 12px' },
          onClick() {
            if (currentTerms.length > 2) {
              currentTerms.pop();
              state.terms = currentTerms;
              renderWorkspace();
            }
          },
        });
        ctrlRow.appendChild(addBtn);
        ctrlRow.appendChild(popBtn);
        card.appendChild(ctrlRow);

        workspaceContainer.appendChild(card);
      }

      function renderDoublingTrap() {
        const terms = [2, 4, 8, 16];
        const diffs = findFirstDifferences(terms);
        const next = predictNextTerm(terms);

        feedbackEl.textContent = t('sequences.doublingFeedback', { next: String(next) });

        const geomCard = el('div', {
          class: 'doubling-card',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            background: 'var(--paper-raised)',
          },
        });

        // Train row
        const trainRow = el('div', {
          class: 'terms-train',
          style: {
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
          },
        });

        terms.forEach((val, idx) => {
          const bubble = el('div', {
            class: 'term-bubble',
            text: String(val),
            style: {
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: '#8b5cf6',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.25rem',
            },
          });
          trainRow.appendChild(bubble);

          if (idx < terms.length - 1) {
            const ratioPill = el('div', {
              class: 'stat-pill ratio-pill',
              text: '×2',
              style: {
                padding: '4px 8px',
                borderRadius: '12px',
                background: '#ede9fe',
                color: '#5b21b6',
                fontWeight: 'bold',
              },
            });
            trainRow.appendChild(ratioPill);
          }
        });

        const nextBubble = el('div', {
          class: 'term-bubble next-bubble doubling-next-bubble',
          text: String(next),
          style: {
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--teal)',
            color: 'var(--paper)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem',
          },
        });
        trainRow.appendChild(el('span', { text: '→', style: { fontSize: '1.4rem' } }));
        trainRow.appendChild(nextBubble);

        geomCard.appendChild(trainRow);

        // Comparison readouts
        const compBox = el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '8px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
          },
        });
        compBox.appendChild(
          el('div', {
            text: t('sequences.diffLadderNotArith', {
              d1: String(diffs[0] ?? 2),
              d2: String(diffs[1] ?? 4),
              d3: String(diffs[2] ?? 8),
            }),
            style: { color: 'var(--ink-soft)', fontSize: '0.95rem' },
          })
        );
        compBox.appendChild(
          el('div', {
            text: t('sequences.multLadderInvariant'),
            style: { color: '#5b21b6', fontWeight: 'bold' },
          })
        );
        geomCard.appendChild(compBox);

        // Gita's trap warning
        const trapBox = el('div', {
          class: 'gita-trap-box',
          style: {
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.08)',
            borderLeft: '4px solid #ef4444',
            borderRadius: '6px',
          },
        });
        trapBox.appendChild(
          el('p', {
            style: { margin: '0', fontSize: '0.95rem', color: '#991b1b' },
            text: t('sequences.gitaTrapLong'),
          })
        );
        geomCard.appendChild(trapBox);

        workspaceContainer.appendChild(geomCard);
      }

      function renderDistantPredictor() {
        const firstTerm = 3;
        const diff = 4;
        const predictedVal = predictNthTerm(firstTerm, diff, targetN);

        feedbackEl.textContent = t('sequences.distantFeedback', {
          n: String(targetN),
          formula: `${firstTerm} + (${targetN} - 1) × ${diff} = ${predictedVal}`,
        });

        const distCard = el('div', {
          class: 'distant-card',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            background: 'var(--paper-raised)',
          },
        });

        // Sequence header
        distCard.appendChild(
          el('div', {
            text: t('sequences.baseSequence'),
            style: {
              fontWeight: '600',
              fontSize: '1.05rem',
              color: '#1e40af',
              textAlign: 'center',
            },
          })
        );

        // Stepper for targetN
        const stepperRow = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
          },
        });
        const decBtn = el('button', {
          class: 'btn',
          text: t('sequences.termDown'),
          style: { minHeight: '44px', padding: '6px 14px' },
          onClick() {
            targetN = Math.max(1, targetN - 1);
            state.targetN = targetN;
            renderWorkspace();
          },
        });
        const nDisplay = el('span', {
          class: 'stat-pill target-n-pill',
          text: t('sequences.termLabel', { n: String(targetN) }),
          style: {
            fontWeight: 'bold',
            fontSize: '1.25rem',
            padding: '8px 18px',
            borderRadius: '8px',
            background: '#e0e7ff',
            color: '#3730a3',
          },
        });
        const incBtn = el('button', {
          class: 'btn',
          text: t('sequences.termUp'),
          style: { minHeight: '44px', padding: '6px 14px' },
          onClick() {
            targetN = Math.min(50, targetN + 1);
            state.targetN = targetN;
            renderWorkspace();
          },
        });
        stepperRow.appendChild(decBtn);
        stepperRow.appendChild(nDisplay);
        stepperRow.appendChild(incBtn);
        distCard.appendChild(stepperRow);

        // Direct Formula Readout
        const formulaBox = el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          },
        });
        formulaBox.appendChild(
          el('div', {
            text: t('sequences.formulaLine', { n: String(targetN), nm1: String(targetN - 1) }),
            style: { fontSize: '1rem', color: '#065f46', fontWeight: '500' },
          })
        );
        formulaBox.appendChild(
          el('div', {
            class: 'stat-pill distant-result-pill',
            text: t('sequences.termResult', { n: String(targetN), val: String(predictedVal) }),
            style: {
              fontSize: '1.35rem',
              fontWeight: 'bold',
              color: '#065f46',
              background: '#fff',
              padding: '6px 18px',
              borderRadius: '8px',
              border: '1px solid #10b981',
            },
          })
        );
        distCard.appendChild(formulaBox);

        workspaceContainer.appendChild(distCard);
      }

      // Action navigation row
      const actionRow = el('div', {
        class: 'action-row',
        style: {
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginTop: '16px',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '580px',
        },
      });

      const resetBtn = el('button', {
        class: 'btn',
        text: t('sequences.reset'),
        style: { minHeight: '44px', padding: '10px 16px', borderRadius: '6px' },
        onClick() {
          currentTerms = [3, 7, 11, 15];
          targetN = 10;
          state.terms = currentTerms;
          state.targetN = targetN;
          renderWorkspace();
        },
      });

      const nextBtn = toMistakeButton('L4');
      nextBtn.classList.add('btn-primary');
      nextBtn.style.minHeight = '44px';
      nextBtn.style.padding = '10px 20px';

      actionRow.appendChild(resetBtn);
      actionRow.appendChild(nextBtn);

      // Render root view
      clear(view);
      view.appendChild(titleEl);
      view.appendChild(feedbackEl);
      view.appendChild(stepTabs);
      view.appendChild(workspaceContainer);
      view.appendChild(actionRow);

      renderWorkspace();
    },
  };
}
