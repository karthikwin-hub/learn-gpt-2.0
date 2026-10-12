/**
 * Interactive Manipulative Workbench for Knot P1: Growing Patterns (Figurate & Triangular Numbers).
 *
 * Explores:
 * - Triangular dot patterns T_n = n(n+1)/2 (adding bottom row of n dots).
 * - Square grid patterns S_n = n^2 (adding L-shaped gnomon of 2n - 1 tiles).
 * - Growth tables contrasting quadratic growth with Amit's linear misconception (5x2 vs 5x5).
 */

import {
  triangularNumber,
  squareNumber,
  gnomonSize,
  triangularLayerSize,
  generateTriangularDots,
  generateSquareGrid,
} from '../../../domain/math/growing';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createGrowingScreen(): ScreenMeta {
  return {
    id: 'growing',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'growing.title',
    render(view, state, params = {}) {
      enterThread('P1', 'growing', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;

      let triStage = typeof state.triStage === 'number' ? state.triStage : 4;
      let sqStage = typeof state.sqStage === 'number' ? state.sqStage : 3;

      state.step = stepNum;
      state.triStage = triStage;
      state.sqStage = sqStage;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('growing.title'),
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
        { num: 1, label: '1. Dot Triangle Layers' },
        { num: 2, label: '2. Square Gnomon Grid' },
        { num: 3, label: '3. Growth Table & Lab' },
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
        class: 'growing-workspace',
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
          renderTriangleWorkshop();
        } else if (stepNum === 2) {
          renderSquareWorkshop();
        } else {
          renderGrowthTable();
        }
      }

      function renderTriangleWorkshop() {
        const totalDots = triangularNumber(triStage);
        const addedRow = triangularLayerSize(triStage);
        const formulaParts: string[] = [];
        for (let r = 1; r <= triStage; r++) {
          formulaParts.push(String(r));
        }

        feedbackEl.textContent = `Stage ${triStage} adds a bottom row of ${addedRow} dots! Total dots = ${formulaParts.join(' + ')} = ${totalDots}!`;

        const triCard = el('div', {
          class: 'triangular-card',
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

        // Stage stepper
        const stageControls = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
          },
        });
        const decBtn = el('button', {
          class: 'btn',
          text: '-1 Stage',
          style: { minHeight: '44px', padding: '6px 14px' },
          onClick() {
            triStage = Math.max(1, triStage - 1);
            state.triStage = triStage;
            renderWorkspace();
          },
        });
        const stagePill = el('span', {
          class: 'stat-pill tri-stage-pill',
          text: `Stage ${triStage} Triangle`,
          style: {
            fontWeight: 'bold',
            fontSize: '1.15rem',
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#e0e7ff',
            color: '#3730a3',
          },
        });
        const incBtn = el('button', {
          class: 'btn',
          text: '+1 Stage',
          style: { minHeight: '44px', padding: '6px 14px' },
          onClick() {
            triStage = Math.min(6, triStage + 1);
            state.triStage = triStage;
            renderWorkspace();
          },
        });
        stageControls.appendChild(decBtn);
        stageControls.appendChild(stagePill);
        stageControls.appendChild(incBtn);
        triCard.appendChild(stageControls);

        // Visual Dot Triangle Pyramid
        const pyramidContainer = el('div', {
          class: 'dot-pyramid',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '8px',
            width: '100%',
            minHeight: '180px',
            justifyContent: 'center',
          },
        });

        const dots = generateTriangularDots(triStage);
        for (let r = 1; r <= triStage; r++) {
          const rowEl = el('div', {
            style: { display: 'flex', gap: '8px', justifyContent: 'center' },
          });
          const rowDots = dots.filter((d) => d.row === r);
          const isNewLayer = r === triStage;

          rowDots.forEach(() => {
            const dot = el('div', {
              class: `pyramid-dot ${isNewLayer ? 'new-layer-dot' : 'base-dot'}`,
              style: {
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: isNewLayer ? '#0d9488' : '#4f46e5',
                border: isNewLayer ? '2px solid #14b8a6' : '2px solid #4338ca',
                boxShadow: isNewLayer ? '0 0 8px rgba(20, 184, 166, 0.5)' : 'none',
              },
            });
            rowEl.appendChild(dot);
          });
          pyramidContainer.appendChild(rowEl);
        }
        triCard.appendChild(pyramidContainer);

        // Readout Bar
        const readout = el('div', {
          class: 'tri-readout',
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(13, 148, 136, 0.08)',
            border: '1px solid rgba(13, 148, 136, 0.2)',
          },
        });
        readout.appendChild(
          el('span', {
            text: `Bottom Row Added: +${addedRow} dots`,
            style: { fontWeight: '600', color: '#0f766e' },
          })
        );
        readout.appendChild(
          el('span', {
            class: 'stat-pill tri-total-pill',
            text: `Total: ${totalDots} Dots`,
            style: {
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: '#0f766e',
              background: '#ccfbf1',
              padding: '6px 14px',
              borderRadius: '6px',
            },
          })
        );
        triCard.appendChild(readout);

        workspaceContainer.appendChild(triCard);
      }

      function renderSquareWorkshop() {
        const totalTiles = squareNumber(sqStage);
        const gnomon = gnomonSize(sqStage);

        feedbackEl.textContent = `A square of side ${sqStage} has ${sqStage} × ${sqStage} = ${totalTiles} tiles! The added outer L-shaped border has ${gnomon} tiles!`;

        const sqCard = el('div', {
          class: 'square-card',
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

        // Controls
        const stageControls = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
          },
        });
        const decBtn = el('button', {
          class: 'btn',
          text: '-1 Side',
          style: { minHeight: '44px', padding: '6px 14px' },
          onClick() {
            sqStage = Math.max(1, sqStage - 1);
            state.sqStage = sqStage;
            renderWorkspace();
          },
        });
        const stagePill = el('span', {
          class: 'stat-pill sq-stage-pill',
          text: `Side ${sqStage} Square (${sqStage} × ${sqStage})`,
          style: {
            fontWeight: 'bold',
            fontSize: '1.15rem',
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#fef3c7',
            color: '#92400e',
          },
        });
        const incBtn = el('button', {
          class: 'btn',
          text: '+1 Side',
          style: { minHeight: '44px', padding: '6px 14px' },
          onClick() {
            sqStage = Math.min(6, sqStage + 1);
            state.sqStage = sqStage;
            renderWorkspace();
          },
        });
        stageControls.appendChild(decBtn);
        stageControls.appendChild(stagePill);
        stageControls.appendChild(incBtn);
        sqCard.appendChild(stageControls);

        // Square grid visual
        const gridContainer = el('div', {
          class: 'square-grid-container',
          style: {
            display: 'grid',
            gridTemplateColumns: `repeat(${sqStage}, 36px)`,
            gap: '6px',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '8px',
            justifyContent: 'center',
          },
        });

        const tiles = generateSquareGrid(sqStage);
        tiles.forEach((tData) => {
          const isGnomon = tData.layer === sqStage;
          const tile = el('div', {
            class: `square-tile ${isGnomon ? 'gnomon-tile' : 'inner-tile'}`,
            style: {
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              background: isGnomon ? '#f59e0b' : '#3b82f6',
              border: isGnomon ? '2px solid #d97706' : '1px solid #2563eb',
              boxShadow: isGnomon ? '0 0 6px rgba(245, 158, 11, 0.4)' : 'none',
            },
          });
          gridContainer.appendChild(tile);
        });
        sqCard.appendChild(gridContainer);

        // Readout Bar
        const readout = el('div', {
          class: 'sq-readout',
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
          },
        });
        readout.appendChild(
          el('span', {
            text: `Added L-Gnomon: +${gnomon} tiles`,
            style: { fontWeight: '600', color: '#b45309' },
          })
        );
        readout.appendChild(
          el('span', {
            class: 'stat-pill sq-total-pill',
            text: `Total: ${totalTiles} Tiles`,
            style: {
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: '#b45309',
              background: '#fef3c7',
              padding: '6px 14px',
              borderRadius: '6px',
            },
          })
        );
        sqCard.appendChild(readout);

        workspaceContainer.appendChild(sqCard);
      }

      function renderGrowthTable() {
        feedbackEl.textContent = `Contrast: Triangular numbers grow by +n; Square numbers grow quadratically (n × n). Don't confuse side × 2 with side × side!`;

        const tableCard = el('div', {
          class: 'growth-table-card',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            background: 'var(--card-bg, #fff)',
          },
        });

        // Table
        const table = el('table', {
          class: 'growth-table',
          style: {
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'center',
          },
        });

        const thead = el('thead');
        thead.innerHTML = `
          <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
            <th style="padding: 10px 8px;">Stage (n)</th>
            <th style="padding: 10px 8px; color: #0f766e;">Triangle T_n</th>
            <th style="padding: 10px 8px; color: #b45309;">Square n²</th>
            <th style="padding: 10px 8px; color: #ef4444;">Amit's Guess (2n)</th>
          </tr>
        `;
        table.appendChild(thead);

        const tbody = el('tbody');
        [1, 2, 3, 4, 5].forEach((n) => {
          const tN = triangularNumber(n);
          const sN = squareNumber(n);
          const amit = n * 2;
          const isTrapRow = n === 5;

          const tr = el('tr', {
            style: {
              borderBottom: '1px solid #e2e8f0',
              background: isTrapRow ? 'rgba(239, 68, 68, 0.08)' : 'transparent',
              fontWeight: isTrapRow ? 'bold' : 'normal',
            },
          });
          tr.innerHTML = `
            <td style="padding: 10px 8px;">Stage ${n}</td>
            <td style="padding: 10px 8px; color: #0f766e;">${tN}</td>
            <td style="padding: 10px 8px; color: #b45309;">${sN}</td>
            <td style="padding: 10px 8px; color: #dc2626;">${amit}</td>
          `;
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        tableCard.appendChild(table);

        // Amit's trap callout
        const trapBox = el('div', {
          class: 'amit-trap-box',
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
            text: `Amit's Mistake Trap: Amit looked at Stage 5 and computed 5 × 2 = 10! But a square is a 2D shape with 5 rows and 5 columns: 5 × 5 = 25 tiles, not 10!`,
          })
        );
        tableCard.appendChild(trapBox);

        workspaceContainer.appendChild(tableCard);
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
        text: t('growing.reset'),
        style: { minHeight: '44px', padding: '10px 16px', borderRadius: '6px' },
        onClick() {
          triStage = 4;
          sqStage = 3;
          state.triStage = triStage;
          state.sqStage = sqStage;
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
          router.go('mistake', { k: 'P1' });
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
