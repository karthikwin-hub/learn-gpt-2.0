/**
 * Interactive Manipulative Workbench for Knot L1: True for All? (Universal Claims & Counterexamples).
 *
 * Explores:
 * - Universal statements claim a property holds for ALL elements of a domain.
 * - Any number of positive examples cannot prove 'always'.
 * - A single counterexample conclusively disproves the claim.
 * - Rahul's misconception: multiplying numbers always makes a strictly bigger number (ignoring 0 and 1).
 */

import {
  PRESET_CLAIMS,
  findCounterexample,
  type UniversalClaim,
} from '../../../domain/math/counterexample';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

function claimField(id: string, field: 'statement' | 'explanation'): string {
  return t(`counterexample.claim.${id}.${field}`);
}

export function createCounterexampleScreen(): ScreenMeta {
  return {
    id: 'counterexample',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'counterexample.title',
    render(view, state, params = {}) {
      enterThread('L1', 'counterexample', params);

      let activeClaimId = typeof state.claimId === 'string' ? state.claimId : 'ends-in-4-div-4';

      let testedItems: number[] = Array.isArray(state.testedItems)
        ? (state.testedItems as number[])
        : [];

      state.claimId = activeClaimId;
      state.testedItems = testedItems;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('counterexample.title'),
      });

      const feedbackEl = el('p', {
        class: 'say workbench-feedback',
        'aria-live': 'polite',
      });

      // Claim Preset Tabs
      const claimTabs = el('div', {
        class: 'claim-tabs',
        style: {
          display: 'flex',
          gap: '8px',
          marginBottom: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        },
      });

      const presetsConfig = [
        { id: 'ends-in-4-div-4', label: t('counterexample.preset.ends-in-4-div-4') },
        { id: 'primes-are-odd', label: t('counterexample.preset.primes-are-odd') },
        { id: 'mult-makes-bigger', label: t('counterexample.preset.mult-makes-bigger') },
      ];

      presetsConfig.forEach((cfg) => {
        const btn = el('button', {
          class: `btn claim-tab ${activeClaimId === cfg.id ? 'active' : ''}`,
          text: cfg.label,
          'aria-current': activeClaimId === cfg.id ? 'step' : undefined,
          style: {
            padding: '8px 14px',
            minHeight: '44px',
            borderRadius: '6px',
            border:
              activeClaimId === cfg.id
                ? '2px solid var(--ink, #1f2937)'
                : '1px solid var(--paper-sunk)',
            background: activeClaimId === cfg.id ? 'var(--paper)' : 'transparent',
            fontWeight: activeClaimId === cfg.id ? 'bold' : 'normal',
            cursor: 'pointer',
          },
          onClick() {
            activeClaimId = cfg.id;
            state.claimId = activeClaimId;
            testedItems = [];
            state.testedItems = testedItems;
            renderWorkspace();
          },
        });
        claimTabs.appendChild(btn);
      });

      const workspaceContainer = el('div', {
        class: 'counterexample-workspace',
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
        claimTabs.querySelectorAll('.claim-tab').forEach((b, i) => {
          const isActive = presetsConfig[i]?.id === activeClaimId;
          (b as HTMLElement).style.fontWeight = isActive ? 'bold' : 'normal';
          (b as HTMLElement).style.border = isActive
            ? '2px solid var(--ink, #1f2937)'
            : '1px solid var(--paper-sunk)';
          (b as HTMLElement).style.background = isActive ? 'var(--paper)' : 'transparent';
        });

        clear(workspaceContainer);

        const currentClaim: UniversalClaim =
          PRESET_CLAIMS[activeClaimId] ?? PRESET_CLAIMS['ends-in-4-div-4']!;

        // Items tested so far
        const itemsToTest = testedItems.length > 0 ? testedItems : currentClaim.domain;

        const result = findCounterexample(currentClaim, itemsToTest);

        const claimText = claimField(activeClaimId, 'statement');
        feedbackEl.textContent = result.holds
          ? t('counterexample.feedback.holds', { claim: claimText })
          : t('counterexample.feedback.disproved', {
              n: result.counterexample ?? '',
              claim: claimText,
            });

        // Card container
        const claimCard = el('div', {
          class: 'claim-card',
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

        // Claim statement banner
        const statementBanner = el('div', {
          class: 'statement-banner',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
          },
        });
        statementBanner.appendChild(
          el('span', {
            text: t('counterexample.claimLabel', { claim: claimField(activeClaimId, 'statement') }),
            style: { fontWeight: 'bold', fontSize: '1.05rem', color: '#1e40af' },
          })
        );
        statementBanner.appendChild(
          el('span', {
            class: 'stat-pill claim-status-pill',
            text: result.holds
              ? t('counterexample.statusHolds')
              : t('counterexample.statusDisproved'),
            style: {
              fontSize: '0.85rem',
              color: result.holds ? '#15803d' : '#b91c1c',
              fontWeight: '600',
            },
          })
        );
        claimCard.appendChild(statementBanner);

        // Evidence Laboratory (Courtyard testing area)
        const courtyard = el('div', {
          class: 'testing-courtyard',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            width: '100%',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '2px dashed #cbd5e1',
            minHeight: '220px',
          },
        });

        courtyard.appendChild(
          el('span', {
            text: t('counterexample.testedHeading'),
            style: { fontSize: '0.9rem', color: '#64748b', fontWeight: '600' },
          })
        );

        // Chip list of tested items
        const chipsWrap = el('div', {
          class: 'tested-chips-wrap',
          style: {
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        });

        itemsToTest.forEach((val) => {
          const satisfies = currentClaim.predicate(val);
          const chip = el('div', {
            class: `evidence-chip ${satisfies ? 'pass-chip' : 'counterexample-chip'}`,
            text: satisfies
              ? t('counterexample.chipOk', { n: val })
              : t('counterexample.chipFail', { n: val }),
            style: {
              minWidth: '44px',
              minHeight: '44px',
              padding: '8px 14px',
              borderRadius: '22px',
              background: satisfies ? '#dcfce7' : '#fee2e2',
              color: satisfies ? '#166534' : '#991b1b',
              border: satisfies ? '1px solid #86efac' : '2px solid #ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.05rem',
            },
          });
          chipsWrap.appendChild(chip);
        });
        courtyard.appendChild(chipsWrap);

        // Counterexample callout
        if (!result.holds && result.counterexample !== undefined) {
          const callout = el('div', {
            class: 'counterexample-callout-box',
            style: {
              width: '100%',
              padding: '14px 18px',
              background: 'rgba(239, 68, 68, 0.08)',
              borderLeft: '4px solid #ef4444',
              borderRadius: '6px',
              marginTop: '10px',
            },
          });
          callout.appendChild(
            el('p', {
              style: { margin: '0 0 4px', fontWeight: 'bold', color: '#991b1b' },
              text: t('counterexample.found', { n: result.counterexample ?? '' }),
            })
          );
          callout.appendChild(
            el('p', {
              style: { margin: '0', fontSize: '0.9rem', color: '#7f1d1d' },
              text: claimField(activeClaimId, 'explanation'),
            })
          );
          courtyard.appendChild(callout);
        }

        claimCard.appendChild(courtyard);

        // Rahul Misconception Trap Callout for Step 3
        if (activeClaimId === 'mult-makes-bigger') {
          const rahulBox = el('div', {
            class: 'rahul-trap-box',
            style: {
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(245, 158, 11, 0.08)',
              borderLeft: '4px solid #f59e0b',
              borderRadius: '6px',
            },
          });
          rahulBox.appendChild(
            el('p', {
              style: { margin: '0', fontSize: '0.95rem', color: '#92400e' },
              text: t('counterexample.rahulTrap'),
            })
          );
          claimCard.appendChild(rahulBox);
        }

        // Test custom candidate button
        const testBar = el('div', {
          style: {
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap',
          },
        });
        testBar.appendChild(
          el('span', {
            text: t('counterexample.testCandidate'),
            style: { fontWeight: '600' },
          })
        );

        const sampleTestValues =
          activeClaimId === 'ends-in-4-div-4'
            ? [14, 34, 44]
            : activeClaimId === 'primes-are-odd'
              ? [2, 11, 13]
              : [0, 1, 6];

        sampleTestValues.forEach((candidate) => {
          const testBtn = el('button', {
            class: 'btn test-candidate-btn',
            text: t('counterexample.testButton', { n: candidate }),
            style: { minHeight: '44px', padding: '6px 14px' },
            onClick() {
              if (!itemsToTest.includes(candidate)) {
                itemsToTest.push(candidate);
                testedItems = [...itemsToTest];
                state.testedItems = testedItems;
                renderWorkspace();
              }
            },
          });
          testBar.appendChild(testBtn);
        });
        claimCard.appendChild(testBar);

        workspaceContainer.appendChild(claimCard);
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
        text: t('counterexample.reset'),
        style: { minHeight: '44px', padding: '10px 16px', borderRadius: '6px' },
        onClick() {
          testedItems = [];
          state.testedItems = testedItems;
          renderWorkspace();
        },
      });

      actionRow.appendChild(resetBtn);
      actionRow.appendChild(toMistakeButton('L1'));

      // Render root view
      clear(view);
      view.appendChild(titleEl);
      view.appendChild(feedbackEl);
      view.appendChild(claimTabs);
      view.appendChild(workspaceContainer);
      view.appendChild(actionRow);

      renderWorkspace();
    },
  };
}
