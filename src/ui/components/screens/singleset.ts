/**
 * Interactive Manipulative Workbench for Knot S1: Sort by a Rule (Single Set & Universe of Discourse).
 *
 * Explores:
 * - A single ring partitioning the universe of discourse into inside (satisfies rule) and outside.
 * - Testable membership: every element either belongs inside or outside (no in-between).
 * - Kunal's misconception: inventing extra exclusions (15 ends in 5, so belongs inside regardless of divisibility by 3).
 */

import {
  partitionSet,
  SINGLE_SET_RULES,
  DEFAULT_UNIVERSE_ITEMS,
  type SetItem,
} from '../../../domain/math/singleset';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createSinglesetScreen(): ScreenMeta {
  return {
    id: 'singleset',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'singleset.title',
    render(view, state, params = {}) {
      enterThread('S1', 'singleset', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;

      let activeRuleId =
        typeof state.ruleId === 'string'
          ? state.ruleId
          : stepNum === 1
            ? 'multiples-of-5'
            : stepNum === 2
              ? 'ends-in-5'
              : 'four-sides';

      let items: SetItem[] = Array.isArray(state.items)
        ? (state.items as SetItem[])
        : [...DEFAULT_UNIVERSE_ITEMS];

      state.step = stepNum;
      state.ruleId = activeRuleId;
      state.items = items;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('singleset.title'),
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
        { num: 1, label: '1. Multiples of 5 Ring', rule: 'multiples-of-5' },
        { num: 2, label: "2. Ending in 5 (Kunal's Trap)", rule: 'ends-in-5' },
        { num: 3, label: '3. Four-Sided Shapes', rule: 'four-sides' },
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
              stepNum === cfg.num
                ? '2px solid var(--ink, #1f2937)'
                : '1px solid var(--sand, #d1d5db)',
            background: stepNum === cfg.num ? 'var(--parchment, #fff)' : 'transparent',
            fontWeight: stepNum === cfg.num ? 'bold' : 'normal',
            cursor: 'pointer',
          },
          onClick() {
            stepNum = cfg.num;
            activeRuleId = cfg.rule;
            state.step = stepNum;
            state.ruleId = activeRuleId;
            renderWorkspace();
          },
        });
        stepTabs.appendChild(btn);
      });

      const workspaceContainer = el('div', {
        class: 'singleset-workspace',
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
            : '1px solid var(--sand, #d1d5db)';
          (b as HTMLElement).style.background = isActive ? 'var(--parchment, #fff)' : 'transparent';
        });

        clear(workspaceContainer);

        const currentRuleDef =
          SINGLE_SET_RULES[activeRuleId] ?? SINGLE_SET_RULES['multiples-of-5']!;

        const relevantItems =
          stepNum === 3
            ? items.filter((i) => i.kind === 'shape')
            : items.filter((i) => i.kind === 'number');

        const { inside, outside } = partitionSet(relevantItems, activeRuleId);

        feedbackEl.textContent = `Rule: "${currentRuleDef.name}". ${inside.length} items belong INSIDE the ring; ${outside.length} stay OUTSIDE in Universe U.`;

        // Card container
        const setCard = el('div', {
          class: 'singleset-card',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            background: 'var(--card-bg, #fff)',
          },
        });

        // Rule banner
        const ruleBanner = el('div', {
          class: 'rule-banner',
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
          },
        });
        ruleBanner.appendChild(
          el('span', {
            text: `Active Rule: ${currentRuleDef.name}`,
            style: { fontWeight: 'bold', fontSize: '1.05rem', color: '#1e40af' },
          })
        );
        ruleBanner.appendChild(
          el('span', {
            class: 'stat-pill rule-desc-pill',
            text: currentRuleDef.description,
            style: { fontSize: '0.85rem', color: '#475569' },
          })
        );
        setCard.appendChild(ruleBanner);

        // Sorting Ring Canvas (Courtyard)
        const courtyard = el('div', {
          class: 'sorting-courtyard',
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
            minHeight: '260px',
            position: 'relative',
          },
        });

        // Universe Header
        const uHeader = el('div', {
          style: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            color: '#64748b',
            fontWeight: '600',
          },
        });
        uHeader.appendChild(el('span', { text: 'Universe of Discourse (U)' }));
        uHeader.appendChild(
          el('span', {
            class: 'stat-pill partition-stat-pill',
            text: `${inside.length} In / ${outside.length} Out`,
          })
        );
        courtyard.appendChild(uHeader);

        // Circular Set Ring
        const ring = el('div', {
          class: 'sorting-ring',
          style: {
            width: '90%',
            maxWidth: '380px',
            minHeight: '140px',
            borderRadius: '80px',
            border: '3px solid #2563eb',
            background: 'rgba(37, 99, 235, 0.06)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          },
        });

        const ringLabel = el('span', {
          class: 'ring-label',
          text: `● Inside: ${currentRuleDef.name}`,
          style: {
            fontWeight: 'bold',
            color: '#1d4ed8',
            fontSize: '0.95rem',
          },
        });
        ring.appendChild(ringLabel);

        const insideItemsWrap = el('div', {
          class: 'inside-items',
          style: {
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        });

        inside.forEach((item) => {
          const itemChip = el('div', {
            class: 'set-item-chip inside-chip',
            text: item.label,
            style: {
              minWidth: '44px',
              minHeight: '44px',
              padding: '8px 14px',
              borderRadius: '22px',
              background: '#2563eb',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
            },
          });
          insideItemsWrap.appendChild(itemChip);
        });
        ring.appendChild(insideItemsWrap);
        courtyard.appendChild(ring);

        // Outside Items Area
        const outsideWrap = el('div', {
          class: 'outside-items-area',
          style: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginTop: '8px',
          },
        });
        outsideWrap.appendChild(
          el('span', {
            text: '○ Outside the Ring (Fails the Rule):',
            style: { fontSize: '0.9rem', color: '#64748b', fontWeight: '600' },
          })
        );

        const outsideItemsList = el('div', {
          class: 'outside-items',
          style: {
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        });
        outside.forEach((item) => {
          const itemChip = el('div', {
            class: 'set-item-chip outside-chip',
            text: item.label,
            style: {
              minWidth: '44px',
              minHeight: '44px',
              padding: '8px 14px',
              borderRadius: '22px',
              background: '#e2e8f0',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              fontSize: '1.05rem',
              border: '1px solid #cbd5e1',
            },
          });
          outsideItemsList.appendChild(itemChip);
        });
        outsideWrap.appendChild(outsideItemsList);
        courtyard.appendChild(outsideWrap);

        setCard.appendChild(courtyard);

        // Step 2 Kunal's Misconception Trap Callout
        if (stepNum === 2) {
          const kunalBox = el('div', {
            class: 'kunal-trap-box',
            style: {
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.08)',
              borderLeft: '4px solid #ef4444',
              borderRadius: '6px',
            },
          });
          kunalBox.appendChild(
            el('p', {
              style: { margin: '0', fontSize: '0.95rem', color: '#991b1b' },
              text: `Kunal's Mistake Trap: Kunal saw 15 and left it outside because 15 is divisible by 3! But the rule is only: "Numbers ending in 5". 15 ends in 5, so it MUST go inside! Don't invent extra exclusion rules.`,
            })
          );
          setCard.appendChild(kunalBox);
        }

        // Test Custom Item Input
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
        testBar.appendChild(el('span', { text: 'Test an item: ', style: { fontWeight: '600' } }));

        const sampleTestValues =
          stepNum === 3
            ? [
                { id: 'rhombus', label: 'Rhombus', kind: 'shape' as const, sides: 4 },
                { id: 'pentagon', label: 'Pentagon', kind: 'shape' as const, sides: 5 },
              ]
            : [
                { id: 'num-35', label: '35', kind: 'number' as const, value: 35 },
                { id: 'num-49', label: '49', kind: 'number' as const, value: 49 },
              ];

        sampleTestValues.forEach((candidate) => {
          const testBtn = el('button', {
            class: 'btn test-item-btn',
            text: `+ Add ${candidate.label}`,
            style: { minHeight: '44px', padding: '6px 14px' },
            onClick() {
              if (!items.some((i) => i.label === candidate.label)) {
                items.push(candidate);
                state.items = items;
                renderWorkspace();
              }
            },
          });
          testBar.appendChild(testBtn);
        });
        setCard.appendChild(testBar);

        workspaceContainer.appendChild(setCard);
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
        text: t('singleset.reset'),
        style: { minHeight: '44px', padding: '10px 16px', borderRadius: '6px' },
        onClick() {
          items = [...DEFAULT_UNIVERSE_ITEMS];
          state.items = items;
          renderWorkspace();
        },
      });

      const nextBtn = el('button', {
        class: 'btn btn-primary',
        text: 'Spot the Mistake →',
        style: {
          minHeight: '44px',
          padding: '10px 20px',
          borderRadius: '6px',
          background: 'var(--ink, #1f2937)',
          color: '#fff',
          fontWeight: 'bold',
        },
        onClick() {
          router.go('mistake', { k: 'S1' });
        },
      });

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
