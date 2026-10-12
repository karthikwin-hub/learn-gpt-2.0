/**
 * Interactive Manipulative Workbench for Knot H1: Pictographs (Scaled Keys & Data Representation).
 *
 * Explores:
 * - Scaled keys (1 icon = 2, 5, or 10 units).
 * - Full icons and half icons (half icon = key / 2).
 * - Tally calculation: total = (fullIcons * key) + (halfIcons * key / 2).
 * - Anti-misconception: Anita's trap (forgetting to multiply icons by key).
 */

import { calculateTotalFromIcons } from '../../../domain/math/pictograph';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

interface SurveyRow {
  id: string;
  name: string;
  symbol: string;
  fullCount: number;
  halfCount: number;
}

export function createPictographScreen(): ScreenMeta {
  return {
    id: 'pictograph',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'pictograph.title',
    render(view, state, params = {}) {
      enterThread('H1', 'pictograph', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;

      let keyScale = typeof state.keyScale === 'number' ? state.keyScale : 5;

      // Default survey rows
      let rows: SurveyRow[] = Array.isArray(state.rows)
        ? (state.rows as SurveyRow[])
        : [
            {
              id: 'mango',
              name: t('pictograph.fruitMango'),
              symbol: '🥭',
              fullCount: 3,
              halfCount: 0,
            },
            {
              id: 'apple',
              name: t('pictograph.fruitApple'),
              symbol: '🍎',
              fullCount: 4,
              halfCount: 1,
            },
            {
              id: 'banana',
              name: t('pictograph.fruitBanana'),
              symbol: '🍌',
              fullCount: 2,
              halfCount: 0,
            },
          ];

      let expIcons = typeof state.expIcons === 'number' ? state.expIcons : 4;
      let expScale = typeof state.expScale === 'number' ? state.expScale : 5;

      let halfFull = typeof state.halfFull === 'number' ? state.halfFull : 3;
      let halfHalf = typeof state.halfHalf === 'number' ? state.halfHalf : 1;
      let halfKey = typeof state.halfKey === 'number' ? state.halfKey : 4;

      state.step = stepNum;
      state.keyScale = keyScale;
      state.rows = rows;
      state.expIcons = expIcons;
      state.expScale = expScale;
      state.halfFull = halfFull;
      state.halfHalf = halfHalf;
      state.halfKey = halfKey;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('pictograph.title'),
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
        { num: 1, label: t('pictograph.tab1') },
        { num: 2, label: t('pictograph.tab2') },
        { num: 3, label: t('pictograph.tab3') },
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
            state.step = stepNum;
            renderWorkspace();
          },
        });
        stepTabs.appendChild(btn);
      });

      const workspaceContainer = el('div', {
        class: 'pictograph-workspace',
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

        if (stepNum === 1) {
          renderSurveyChart();
        } else if (stepNum === 2) {
          renderScaleExplorer();
        } else {
          renderHalfIconTally();
        }
      }

      function renderSurveyChart() {
        feedbackEl.textContent = t('pictograph.keyFeedback', { key: String(keyScale) });

        // Key Scale Header Bar
        const keyBar = el('div', {
          class: 'key-scale-bar',
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '2px solid var(--accent, #3b82f6)',
            background: 'rgba(59, 130, 246, 0.06)',
            flexWrap: 'wrap',
            gap: '8px',
          },
        });

        const keyLabel = el('span', {
          text: t('pictograph.keyBanner', { key: String(keyScale) }),
          style: { fontWeight: 'bold', fontSize: '1.1rem', color: '#1d4ed8' },
        });

        const scaleButtons = el('div', { style: { display: 'flex', gap: '6px' } });
        [2, 5, 10].forEach((sc) => {
          const scBtn = el('button', {
            class: `btn scale-btn ${keyScale === sc ? 'active' : ''}`,
            text: t('pictograph.scaleBtn', { sc: String(sc) }),
            style: {
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: keyScale === sc ? 'bold' : 'normal',
              background: keyScale === sc ? '#2563eb' : 'var(--card-bg, #fff)',
              color: keyScale === sc ? '#fff' : 'var(--ink, #1f2937)',
              border: '1px solid var(--sand, #d1d5db)',
            },
            onClick() {
              keyScale = sc;
              state.keyScale = keyScale;
              renderWorkspace();
            },
          });
          scaleButtons.appendChild(scBtn);
        });

        keyBar.appendChild(keyLabel);
        keyBar.appendChild(scaleButtons);
        workspaceContainer.appendChild(keyBar);

        // Chart Table
        const chartTable = el('div', {
          class: 'pictograph-table',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
          },
        });

        let grandTotal = 0;

        rows.forEach((row) => {
          const rowTotal = calculateTotalFromIcons(row.fullCount, row.halfCount, keyScale);
          grandTotal += rowTotal;

          const rowCard = el('div', {
            class: 'survey-row-card',
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid var(--sand, #e5e7eb)',
              background: 'var(--card-bg, #fff)',
            },
          });

          // Row header
          const rowHeader = el('div', {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          });

          rowHeader.appendChild(
            el('span', {
              text: `${row.name} (${row.symbol})`,
              style: { fontWeight: 'bold', fontSize: '1.05rem' },
            })
          );

          rowHeader.appendChild(
            el('span', {
              class: 'stat-pill row-total-pill',
              text: t('pictograph.rowTotal', { total: String(rowTotal) }),
              style: {
                fontWeight: 'bold',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#065f46',
                fontSize: '1rem',
              },
            })
          );
          rowCard.appendChild(rowHeader);

          // Symbols display container
          const symbolsBox = el('div', {
            class: 'symbols-box',
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              background: '#f8fafc',
              borderRadius: '6px',
              minHeight: '44px',
              flexWrap: 'wrap',
            },
          });

          if (row.fullCount === 0 && row.halfCount === 0) {
            symbolsBox.appendChild(
              el('span', {
                text: t('pictograph.noSymbols'),
                style: { color: 'var(--muted, #94a3b8)', fontStyle: 'italic' },
              })
            );
          } else {
            // Render full symbols
            for (let i = 0; i < row.fullCount; i++) {
              symbolsBox.appendChild(
                el('span', {
                  text: row.symbol,
                  class: 'symbol-icon full-icon',
                  style: { fontSize: '1.6rem', lineHeight: '1' },
                })
              );
            }
            // Render half symbol if present
            if (row.halfCount > 0) {
              const halfWrapper = el('span', {
                class: 'symbol-icon half-icon',
                style: {
                  fontSize: '1.6rem',
                  lineHeight: '1',
                  opacity: '0.6',
                  display: 'inline-block',
                  filter: 'contrast(120%)',
                },
                text: `½${row.symbol}`,
              });
              symbolsBox.appendChild(halfWrapper);
            }
          }
          rowCard.appendChild(symbolsBox);

          // Row controls (+ full, + half, clear)
          const btnRow = el('div', {
            style: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
          });

          const addFullBtn = el('button', {
            class: 'btn add-full-btn',
            text: `+ 1 ${row.symbol} (+${keyScale})`,
            style: { minHeight: '44px', padding: '6px 10px', borderRadius: '6px' },
            onClick() {
              row.fullCount += 1;
              state.rows = rows;
              renderWorkspace();
            },
          });

          const addHalfBtn = el('button', {
            class: 'btn add-half-btn',
            text: `+ ½ ${row.symbol} (+${keyScale / 2})`,
            style: { minHeight: '44px', padding: '6px 10px', borderRadius: '6px' },
            onClick() {
              if (row.halfCount === 0) {
                row.halfCount = 1;
              } else {
                row.fullCount += 1;
                row.halfCount = 0;
              }
              state.rows = rows;
              renderWorkspace();
            },
          });

          const clearBtn = el('button', {
            class: 'btn',
            text: t('pictograph.clear'),
            style: { minHeight: '44px', padding: '6px 10px', borderRadius: '6px' },
            onClick() {
              row.fullCount = 0;
              row.halfCount = 0;
              state.rows = rows;
              renderWorkspace();
            },
          });

          btnRow.appendChild(addFullBtn);
          btnRow.appendChild(addHalfBtn);
          btnRow.appendChild(clearBtn);
          rowCard.appendChild(btnRow);

          chartTable.appendChild(rowCard);
        });

        workspaceContainer.appendChild(chartTable);

        // Grand total bar
        const totalBar = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            background: '#0f172a',
            color: '#fff',
          },
        });
        totalBar.appendChild(
          el('span', { text: t('pictograph.grandTotal'), style: { fontWeight: 'bold' } })
        );
        totalBar.appendChild(
          el('span', {
            class: 'stat-pill grand-total-pill',
            text: t('pictograph.grandTotalVal', { total: String(grandTotal) }),
            style: { fontWeight: 'bold', fontSize: '1.25rem' },
          })
        );
        workspaceContainer.appendChild(totalBar);
      }

      function renderScaleExplorer() {
        const total = calculateTotalFromIcons(expIcons, 0, expScale);

        feedbackEl.textContent = t('pictograph.scaleFeedback', {
          icons: String(expIcons),
          key: String(expScale),
          total: String(total),
        });

        const expCard = el('div', {
          class: 'scale-explorer-card',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid var(--sand, #e5e7eb)',
            background: 'var(--card-bg, #fff)',
          },
        });

        // Symbols row
        const symRow = el('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            padding: '12px',
            background: '#f8fafc',
            borderRadius: '8px',
            flexWrap: 'wrap',
          },
        });

        for (let i = 0; i < expIcons; i++) {
          symRow.appendChild(
            el('span', {
              text: '🚲',
              style: { fontSize: '2rem', lineHeight: '1' },
            })
          );
        }
        expCard.appendChild(symRow);

        // Multiplier breakdown
        const mathRow = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          },
        });
        mathRow.appendChild(
          el('span', {
            text: t('pictograph.scaleEq', { icons: String(expIcons), key: String(expScale) }),
            style: { fontWeight: '600', fontSize: '1.1rem', color: '#1d4ed8' },
          })
        );
        mathRow.appendChild(
          el('span', {
            class: 'stat-pill explorer-total-pill',
            text: t('pictograph.scaleResult', { total: String(total) }),
            style: {
              fontWeight: 'bold',
              fontSize: '1.3rem',
              color: '#1d4ed8',
              background: '#fff',
              padding: '6px 14px',
              borderRadius: '6px',
            },
          })
        );
        expCard.appendChild(mathRow);

        // Anita's trap callout
        const anitaBox = el('div', {
          style: {
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.08)',
            borderLeft: '4px solid #ef4444',
            borderRadius: '6px',
          },
        });
        anitaBox.appendChild(
          el('p', {
            style: { margin: '0', fontSize: '0.95rem' },
            text: t('pictograph.anitaTrap'),
          })
        );
        expCard.appendChild(anitaBox);

        // Controls
        const ctrlRow = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '8px',
          },
        });

        // Icon count buttons
        const iconGrp = el('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' },
        });
        iconGrp.appendChild(
          el('span', { text: t('pictograph.iconsLabel'), style: { fontWeight: '600' } })
        );
        [1, 2, 3, 4, 5].forEach((n) => {
          const b = el('button', {
            class: `btn ${expIcons === n ? 'active' : ''}`,
            text: `${n}`,
            style: { minHeight: '44px', minWidth: '40px', padding: '6px 10px' },
            onClick() {
              expIcons = n;
              state.expIcons = expIcons;
              renderWorkspace();
            },
          });
          iconGrp.appendChild(b);
        });

        // Scale factor buttons
        const scaleGrp = el('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' },
        });
        scaleGrp.appendChild(
          el('span', { text: t('pictograph.keyShort'), style: { fontWeight: '600' } })
        );
        [2, 5, 10].forEach((sc) => {
          const b = el('button', {
            class: `btn ${expScale === sc ? 'active' : ''}`,
            text: t('pictograph.keyOneEquals', { sc: String(sc) }),
            style: { minHeight: '44px', padding: '6px 10px' },
            onClick() {
              expScale = sc;
              state.expScale = expScale;
              renderWorkspace();
            },
          });
          scaleGrp.appendChild(b);
        });

        ctrlRow.appendChild(iconGrp);
        ctrlRow.appendChild(scaleGrp);
        expCard.appendChild(ctrlRow);

        workspaceContainer.appendChild(expCard);
      }

      function renderHalfIconTally() {
        const fullTotal = halfFull * halfKey;
        const halfVal = halfKey / 2;
        const halfTotal = halfHalf * halfVal;
        const total = fullTotal + halfTotal;

        feedbackEl.textContent = t('pictograph.halfKeyFeedback', {
          key: String(halfKey),
          half: String(halfVal),
          total: String(total),
        });

        const halfCard = el('div', {
          class: 'half-icon-card',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid var(--sand, #e5e7eb)',
            background: 'var(--card-bg, #fff)',
          },
        });

        // Star icons representation
        const starBox = el('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'center',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '8px',
          },
        });

        for (let i = 0; i < halfFull; i++) {
          starBox.appendChild(
            el('span', {
              text: t('pictograph.fullIconChar'),
              class: 'book-icon full-star',
              style: { fontSize: '2.2rem', color: '#f59e0b', lineHeight: '1' },
            })
          );
        }

        if (halfHalf > 0) {
          starBox.appendChild(
            el('span', {
              text: t('pictograph.halfIconChar'),
              class: 'book-icon half-star',
              style: {
                fontSize: '1.8rem',
                color: '#f59e0b',
                lineHeight: '1',
                opacity: '0.7',
              },
            })
          );
        }

        halfCard.appendChild(starBox);

        // Step by step breakdown
        const breakdownBox = el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '12px 14px',
            background: '#f1f5f9',
            borderRadius: '8px',
          },
        });

        breakdownBox.appendChild(
          el('div', {
            text: t('pictograph.halfStep1', { key: String(halfKey), half: String(halfVal) }),
            style: { fontWeight: '600' },
          })
        );
        breakdownBox.appendChild(
          el('div', {
            text: t('pictograph.halfStep2', {
              full: String(halfFull),
              key: String(halfKey),
              fullTotal: String(fullTotal),
            }),
          })
        );
        breakdownBox.appendChild(
          el('div', {
            text: t('pictograph.halfStep3', {
              halfCount: String(halfHalf),
              halfTotal: String(halfTotal),
            }),
          })
        );
        breakdownBox.appendChild(
          el('div', {
            class: 'stat-pill half-tally-pill',
            text: t('pictograph.halfStepTotal', {
              full: String(halfFull),
              fullTotal: String(fullTotal),
              halfTotal: String(halfTotal),
              total: String(total),
            }),
            style: {
              fontWeight: 'bold',
              fontSize: '1.1rem',
              color: '#065f46',
              background: '#d1fae5',
              padding: '6px 12px',
              borderRadius: '6px',
              alignSelf: 'flex-start',
            },
          })
        );

        halfCard.appendChild(breakdownBox);

        // Preset tests
        const prRow = el('div', {
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' },
        });

        [
          { label: t('pictograph.presetHalf1'), f: 3, h: 1, k: 4 },
          { label: t('pictograph.presetHalf2'), f: 2, h: 1, k: 10 },
          { label: t('pictograph.presetHalf3'), f: 4, h: 0, k: 5 },
        ].forEach((pr) => {
          const prBtn = el('button', {
            class: 'btn preset-tally-btn',
            text: pr.label,
            style: { minHeight: '44px', padding: '6px 12px' },
            onClick() {
              halfFull = pr.f;
              halfHalf = pr.h;
              halfKey = pr.k;
              state.halfFull = halfFull;
              state.halfHalf = halfHalf;
              state.halfKey = halfKey;
              renderWorkspace();
            },
          });
          prRow.appendChild(prBtn);
        });

        halfCard.appendChild(prRow);
        workspaceContainer.appendChild(halfCard);
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
        text: t('pictograph.reset'),
        style: { minHeight: '44px', padding: '10px 16px', borderRadius: '6px' },
        onClick() {
          keyScale = 5;
          rows = [
            {
              id: 'mango',
              name: t('pictograph.fruitMango'),
              symbol: '🥭',
              fullCount: 3,
              halfCount: 0,
            },
            {
              id: 'apple',
              name: t('pictograph.fruitApple'),
              symbol: '🍎',
              fullCount: 4,
              halfCount: 1,
            },
            {
              id: 'banana',
              name: t('pictograph.fruitBanana'),
              symbol: '🍌',
              fullCount: 2,
              halfCount: 0,
            },
          ];
          expIcons = 4;
          expScale = 5;
          halfFull = 3;
          halfHalf = 1;
          halfKey = 4;
          state.keyScale = keyScale;
          state.rows = rows;
          state.expIcons = expIcons;
          state.expScale = expScale;
          state.halfFull = halfFull;
          state.halfHalf = halfHalf;
          state.halfKey = halfKey;
          renderWorkspace();
        },
      });

      const nextBtn = el('button', {
        class: 'btn btn-primary',
        text: t('bench.toMistake'),
        style: {
          minHeight: '44px',
          padding: '10px 20px',
          borderRadius: '6px',
          background: 'var(--ink, #1f2937)',
          color: '#fff',
          fontWeight: 'bold',
        },
        onClick() {
          router.go('mistake', { k: 'H1' });
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
