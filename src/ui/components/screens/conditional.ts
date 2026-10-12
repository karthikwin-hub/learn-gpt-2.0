/**
 * Conditional statements and converse fallacy workbench (#conditional).
 * Implements interactive implication testing (P ⟹ Q), converse fallacy verification (Q ⟹ P),
 * nested concentric Venn subsets (P ⊆ Q), and counterexample inspection.
 */

import { t } from '../../../domain/i18n/core';
import {
  PRESET_CONDITIONALS,
  getConditionalStatement,
  type ConditionalStatement,
} from '../../../domain/math/conditional';
import { clear, el } from '../../util/dom';
import { toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

function cond(id: string, field: string): string {
  return t(`conditional.data.${id}.${field}`);
}

const INNER_ITEM_KEYS: Record<string, string[]> = {
  'dogs-legs': ['innerItems.lab', 'innerItems.beagle', 'innerItems.poodle'],
  'squares-4sides': ['innerItems.s2', 'innerItems.s5'],
  'div-10-ends-0': ['innerItems.10', 'innerItems.20', 'innerItems.50', 'innerItems.100'],
  'rain-wet': ['innerItems.rain'],
};

const OUTER_ITEM_KEYS: Record<string, string[]> = {
  'dogs-legs': ['outerItems.cat', 'outerItems.cow', 'outerItems.tiger', 'outerItems.horse'],
  'squares-4sides': ['outerItems.rect', 'outerItems.trap', 'outerItems.rhombus', 'outerItems.kite'],
  'div-10-ends-0': [],
  'rain-wet': [],
};

const COUNTER_KEYS: Record<string, string[]> = {
  'dogs-legs': ['counter.cat', 'counter.cow', 'counter.tiger', 'counter.horse'],
  'squares-4sides': ['counter.rect', 'counter.trap', 'counter.rhombus', 'counter.kite'],
  'div-10-ends-0': [],
  'rain-wet': ['counter.hose', 'counter.sprinkler', 'counter.bucket'],
};

export function createConditionalScreen(): ScreenMeta {
  return {
    id: 'conditional',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title() {
      return 'conditional.title';
    },
    render(view, state) {
      enterThread('L3', 'conditional');

      // Initialize state
      if (!state.statementId) {
        state.statementId = 'dogs-legs';
        state.mode = 'forward'; // 'forward' | 'reverse'
      }

      const activeStatementId = (state.statementId as string) || 'dogs-legs';
      let currentStatement: ConditionalStatement = getConditionalStatement(activeStatementId);
      let currentMode: 'forward' | 'reverse' = (state.mode as 'forward' | 'reverse') || 'forward';

      // Header
      const header = el('h2', {
        class: 'screen-title',
        text: t('conditional.title'),
        style: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: 'var(--ink, #1f2937)',
        },
      });

      const lead = el('p', {
        class: 'screen-lead',
        text: t('conditional.lead'),
        style: {
          fontSize: '0.9rem',
          color: 'var(--muted, #4b5563)',
          marginBottom: '1rem',
        },
      });

      // Preset Selector Chips
      const chipContainer = el('div', {
        class: 'preset-chips-scroll',
        role: 'group',
        'aria-label': t('conditional.presetGroup'),
        style: {
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '1rem',
        },
      });

      // Work courtyard container
      const workspace = el('div', {
        class: 'conditional-workspace',
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        },
      });

      function renderWorkspace() {
        clear(workspace);

        // Statement Card
        const statementCard = el('section', {
          class: 'card statement-card',
          style: {
            padding: '1rem',
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '8px',
            border: '1px solid var(--border, #e5e7eb)',
          },
        });

        // Direction Toggle Buttons
        const modeBtnRow = el('div', {
          class: 'mode-button-row',
          style: {
            display: 'flex',
            gap: '8px',
            marginBottom: '1rem',
          },
        });

        const forwardBtn = el('button', {
          type: 'button',
          class: `btn ${currentMode === 'forward' ? 'primary' : ''}`,
          style: {
            minHeight: '44px',
            flex: '1',
            borderRadius: '6px',
            border: '1px solid var(--border, #cbd5e1)',
            fontWeight: currentMode === 'forward' ? 'bold' : 'normal',
            background: currentMode === 'forward' ? 'var(--ink, #1f2937)' : 'transparent',
            color: currentMode === 'forward' ? '#fff' : 'inherit',
          },
          text: t('conditional.forward_button'),
          onClick() {
            currentMode = 'forward';
            state.mode = 'forward';
            renderWorkspace();
          },
        });

        const reverseBtn = el('button', {
          type: 'button',
          class: `btn ${currentMode === 'reverse' ? 'primary' : ''}`,
          style: {
            minHeight: '44px',
            flex: '1',
            borderRadius: '6px',
            border: '1px solid var(--border, #cbd5e1)',
            fontWeight: currentMode === 'reverse' ? 'bold' : 'normal',
            background: currentMode === 'reverse' ? 'var(--ink, #1f2937)' : 'transparent',
            color: currentMode === 'reverse' ? '#fff' : 'inherit',
          },
          text: t('conditional.reverse_button'),
          onClick() {
            currentMode = 'reverse';
            state.mode = 'reverse';
            renderWorkspace();
          },
        });

        modeBtnRow.appendChild(forwardBtn);
        modeBtnRow.appendChild(reverseBtn);
        statementCard.appendChild(modeBtnRow);

        // Active Statement Display
        const formulaBox = el('div', {
          class: 'formula-box',
          style: {
            padding: '1rem',
            borderRadius: '6px',
            background: 'var(--canvas, #f8fafc)',
            borderLeft: `4px solid ${
              currentMode === 'forward' || currentStatement.converseTrue
                ? 'var(--emerald, #10b981)'
                : 'var(--kumkum, #b91c1c)'
            }`,
            marginBottom: '1rem',
          },
        });

        if (currentMode === 'forward') {
          formulaBox.appendChild(
            el('p', {
              class: 'statement-text',
              style: { fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.25rem' },
              text: t('conditional.ifThenForward', {
                premise: cond(activeStatementId, 'premise'),
                conclusion: cond(activeStatementId, 'conclusion'),
              }),
            })
          );
          formulaBox.appendChild(
            el('div', {
              class: 'stat-pill forward-pill',
              style: {
                display: 'inline-block',
                padding: '4px 8px',
                borderRadius: '4px',
                background: '#dcfce7',
                color: '#166534',
                fontSize: '0.85rem',
                fontWeight: '600',
              },
              text: t('conditional.valid_forward'),
            })
          );
        } else {
          formulaBox.appendChild(
            el('p', {
              class: 'statement-text',
              style: { fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.25rem' },
              text: t('conditional.ifThenConverse', {
                premise: cond(activeStatementId, 'conversePremise'),
                conclusion: cond(activeStatementId, 'converseConclusion'),
              }),
            })
          );
          if (currentStatement.converseTrue) {
            formulaBox.appendChild(
              el('div', {
                class: 'stat-pill converse-valid-pill',
                style: {
                  display: 'inline-block',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: '#dcfce7',
                  color: '#166534',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                },
                text: t('conditional.valid_biconditional'),
              })
            );
          } else {
            formulaBox.appendChild(
              el('div', {
                class: 'stat-pill converse-fallacy-pill',
                style: {
                  display: 'inline-block',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: '#fee2e2',
                  color: '#991b1b',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                },
                text: t('conditional.invalid_converse'),
              })
            );
          }
        }

        statementCard.appendChild(formulaBox);

        // Counterexample Callout Box if converse is invalid and in reverse mode
        if (currentMode === 'reverse' && !currentStatement.converseTrue) {
          const counterBox = el('div', {
            class: 'counterexample-callout-box',
            style: {
              padding: '0.85rem',
              borderRadius: '6px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              marginBottom: '1rem',
            },
          });

          counterBox.appendChild(
            el('h4', {
              style: { color: 'var(--kumkum, #b91c1c)', margin: '0 0 0.5rem 0' },
              text: t('conditional.counterexamples'),
            })
          );

          const itemsWrap = el('div', {
            style: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
          });
          (COUNTER_KEYS[activeStatementId] ?? []).forEach((key) => {
            itemsWrap.appendChild(
              el('span', {
                class: 'stat-pill counter-pill',
                style: {
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: '#fee2e2',
                  color: '#b91c1c',
                  border: '1px solid #fca5a5',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                },
                text: t('conditional.counterMark', { item: cond(activeStatementId, key) }),
              })
            );
          });
          counterBox.appendChild(itemsWrap);
          statementCard.appendChild(counterBox);
        }

        // Farhan's Mistake Trap Special Callout
        if (currentStatement.id === 'squares-4sides') {
          const farhanBox = el('div', {
            class: 'farhan-trap-box',
            style: {
              padding: '0.75rem',
              borderRadius: '6px',
              background: '#fffbeb',
              border: '1px solid #fde68a',
              marginBottom: '1rem',
            },
          });
          farhanBox.appendChild(
            el('strong', {
              style: { color: '#92400e', display: 'block', marginBottom: '4px' },
              text: t('conditional.farhanTitle'),
            })
          );
          farhanBox.appendChild(
            el('p', {
              style: { fontSize: '0.85rem', color: '#78350f', margin: '0' },
              text: t('conditional.farhanBody'),
            })
          );
          statementCard.appendChild(farhanBox);
        }

        workspace.appendChild(statementCard);

        // Nested Venn Subset Visualizer (P ⊆ Q)
        const diagramCard = el('section', {
          class: 'card diagram-card',
          style: {
            padding: '1rem',
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '8px',
            border: '1px solid var(--border, #e5e7eb)',
          },
        });

        diagramCard.appendChild(
          el('h3', {
            class: 'pane-title',
            style: { fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' },
            text: t('conditional.nested_subsets'),
          })
        );

        // Nested Venn Rings Diagram Container
        const vennContainer = el('div', {
          class: 'nested-venn-container',
          style: {
            position: 'relative',
            margin: '1rem auto',
            maxWidth: '340px',
            minHeight: '220px',
            borderRadius: '12px',
            background: '#f1f5f9',
            border: '2px solid #94a3b8',
            padding: '12px',
            boxSizing: 'border-box',
          },
        });

        const outerLabel = el('div', {
          class: 'outer-label',
          style: {
            fontWeight: 'bold',
            color: '#1e293b',
            fontSize: '0.85rem',
            marginBottom: '4px',
          },
          text: t('conditional.outerRingLabel', {
            label: cond(activeStatementId, 'outerRingLabel'),
          }),
        });
        vennContainer.appendChild(outerLabel);

        // Outer items (counterexamples)
        const outerKeys = OUTER_ITEM_KEYS[activeStatementId] ?? [];
        if (outerKeys.length > 0) {
          const outerList = el('div', {
            class: 'outer-items-row',
            style: { display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' },
          });
          outerKeys.forEach((key) => {
            outerList.appendChild(
              el('span', {
                class: 'stat-pill item-pill',
                style: {
                  fontSize: '0.75rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: '#e2e8f0',
                  color: '#334155',
                },
                text: cond(activeStatementId, key),
              })
            );
          });
          vennContainer.appendChild(outerList);
        }

        // Inner nested ring
        const innerRing = el('div', {
          class: 'inner-ring',
          style: {
            marginTop: '8px',
            borderRadius: '8px',
            background: '#dbeafe',
            border: '2px solid #3b82f6',
            padding: '10px',
          },
        });

        innerRing.appendChild(
          el('div', {
            class: 'inner-label',
            style: {
              fontWeight: 'bold',
              color: '#1d4ed8',
              fontSize: '0.85rem',
              marginBottom: '4px',
            },
            text: t('conditional.innerRingLabel', {
              label: cond(activeStatementId, 'innerRingLabel'),
            }),
          })
        );

        const innerList = el('div', {
          class: 'inner-items-row',
          style: { display: 'flex', flexWrap: 'wrap', gap: '4px' },
        });
        (INNER_ITEM_KEYS[activeStatementId] ?? []).forEach((key) => {
          innerList.appendChild(
            el('span', {
              class: 'stat-pill inner-item-pill',
              style: {
                fontSize: '0.75rem',
                padding: '2px 6px',
                borderRadius: '4px',
                background: '#bfdbfe',
                color: '#1e40af',
                fontWeight: '600',
              },
              text: cond(activeStatementId, key),
            })
          );
        });
        innerRing.appendChild(innerList);
        vennContainer.appendChild(innerRing);

        diagramCard.appendChild(vennContainer);
        workspace.appendChild(diagramCard);

        // Action Buttons Row
        const actionRow = el('div', {
          class: 'action-row',
          style: {
            display: 'flex',
            gap: '8px',
            marginTop: '1rem',
          },
        });

        const resetBtn = el('button', {
          class: 'btn',
          text: t('conditional.reset'),
          style: {
            minHeight: '44px',
            padding: '10px 16px',
            borderRadius: '6px',
            border: '1px solid var(--border, #cbd5e1)',
            background: 'transparent',
          },
          onClick() {
            state.statementId = 'dogs-legs';
            state.mode = 'forward';
            currentStatement = getConditionalStatement('dogs-legs');
            currentMode = 'forward';
            renderChips();
            renderWorkspace();
          },
        });

        actionRow.appendChild(resetBtn);
        const mistakeBtn = toMistakeButton('L3');
        mistakeBtn.style.flex = '1';
        actionRow.appendChild(mistakeBtn);
        workspace.appendChild(actionRow);
      }

      function renderChips() {
        clear(chipContainer);
        PRESET_CONDITIONALS.forEach((preset) => {
          const isSelected = preset.id === currentStatement.id;
          const chipBtn = el('button', {
            type: 'button',
            class: `chip ${isSelected ? 'on' : ''}`,
            'aria-pressed': isSelected ? 'true' : 'false',
            style: {
              minHeight: '44px',
              padding: '8px 14px',
              borderRadius: '9999px',
              border: isSelected
                ? '2px solid var(--indigo, #4f46e5)'
                : '1px solid var(--border, #cbd5e1)',
              background: isSelected ? 'var(--lavender, #e0e7ff)' : 'var(--card-bg, #ffffff)',
              color: isSelected ? 'var(--indigo, #4f46e5)' : 'inherit',
              fontWeight: isSelected ? 'bold' : 'normal',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: '0',
            },
            text: t(`conditional.preset.${preset.id}`),
            onClick() {
              currentStatement = preset;
              state.statementId = preset.id;
              renderChips();
              renderWorkspace();
            },
          });
          chipContainer.appendChild(chipBtn);
        });
      }

      // Initial assembly
      view.appendChild(header);
      view.appendChild(lead);
      view.appendChild(chipContainer);
      view.appendChild(workspace);

      renderChips();
      renderWorkspace();

      return () => {
        // Cleanup if needed
      };
    },
  };
}
