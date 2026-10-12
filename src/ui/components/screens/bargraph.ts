/**
 * Interactive Manipulative Workbench for Knot H2: Bar Graphs (Axes, Scale Intervals & Jaal B1 <-> H2).
 *
 * Explores:
 * - Scaled axis intervals (1, 2, 5, 10) and grid lines.
 * - Value calculation: value = gridMark * stepInterval.
 * - Horizontal vs vertical bar orientations with uniform bar width.
 * - Vikram's misconception trap (reading grid line index instead of axis value).
 * - Jaal Link B1 <-> H2 connecting food nutrient categories to bar charts.
 */

import {
  readBarValue,
  generateAxisTicks,
  FOOD_INTAKE_DATASET,
} from '../../../domain/math/bargraph';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

interface BarData {
  category: string;
  gridUnits: number;
  color: string;
}

export function createBargraphScreen(): ScreenMeta {
  return {
    id: 'bargraph',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'bargraph.title',
    render(view, state, params = {}) {
      enterThread('H2', 'bargraph', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;

      let stepInterval = typeof state.stepInterval === 'number' ? state.stepInterval : 5;

      const defaultBars: BarData[] = [
        { category: 'Footballs', gridUnits: 3, color: '#3b82f6' },
        { category: 'Cricket Bats', gridUnits: 4, color: '#10b981' },
        { category: 'Rackets', gridUnits: 2, color: '#f59e0b' },
        { category: 'Helmets', gridUnits: 5, color: '#8b5cf6' },
      ];

      let bars: BarData[] = Array.isArray(state.bars) ? (state.bars as BarData[]) : defaultBars;

      let expMark = typeof state.expMark === 'number' ? state.expMark : 4;
      let expStep = typeof state.expStep === 'number' ? state.expStep : 10;

      let jaalOrientation = (state.jaalOrientation as 'vertical' | 'horizontal') || 'vertical';

      state.step = stepNum;
      state.stepInterval = stepInterval;
      state.bars = bars;
      state.expMark = expMark;
      state.expStep = expStep;
      state.jaalOrientation = jaalOrientation;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('bargraph.title'),
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
        { num: 1, label: t('bargraph.tab1') },
        { num: 2, label: t('bargraph.tab2') },
        { num: 3, label: t('bargraph.tab3') },
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
        class: 'bargraph-workspace',
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
          renderStandardGraph();
        } else if (stepNum === 2) {
          renderScaleMultipliers();
        } else {
          renderJaalFoodIntake();
        }
      }

      function renderStandardGraph() {
        feedbackEl.textContent = t('bargraph.axisFeedback', { step: String(stepInterval) });

        // Scale Selector Bar
        const scaleBar = el('div', {
          class: 'axis-scale-bar',
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

        scaleBar.appendChild(
          el('span', {
            text: t('bargraph.axisStepLabel', { step: String(stepInterval) }),
            style: { fontWeight: 'bold', fontSize: '1.05rem', color: '#1d4ed8' },
          })
        );

        const scaleBtns = el('div', { style: { display: 'flex', gap: '6px' } });
        [1, 2, 5, 10].forEach((st) => {
          const b = el('button', {
            class: `btn scale-step-btn ${stepInterval === st ? 'active' : ''}`,
            text: t('bargraph.stepBtn', { st: String(st) }),
            style: {
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: stepInterval === st ? 'bold' : 'normal',
              background: stepInterval === st ? '#2563eb' : 'var(--card-bg, #fff)',
              color: stepInterval === st ? '#fff' : 'var(--ink, #1f2937)',
              border: '1px solid var(--sand, #d1d5db)',
            },
            onClick() {
              stepInterval = st;
              state.stepInterval = stepInterval;
              renderWorkspace();
            },
          });
          scaleBtns.appendChild(b);
        });
        scaleBar.appendChild(scaleBtns);
        workspaceContainer.appendChild(scaleBar);

        // SVG Bar Graph
        const graphCard = el('div', {
          class: 'bargraph-card',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid var(--sand, #e5e7eb)',
            background: 'var(--card-bg, #fff)',
          },
        });

        // SVG dimensions
        const svgW = 440;
        const svgH = 240;
        const padL = 50;
        const padR = 20;
        const padT = 20;
        const padB = 40;
        const plotW = svgW - padL - padR;
        const plotH = svgH - padT - padB;

        const maxUnits = 6;
        const ticks = generateAxisTicks(maxUnits * stepInterval, stepInterval);

        const barSlotW = plotW / bars.length;
        const barWidth = Math.min(48, barSlotW * 0.6);

        const chartSvg = svg('svg', {
          width: '100%',
          height: String(svgH),
          viewBox: `0 0 ${svgW} ${svgH}`,
          'aria-hidden': 'true',
        });

        ticks.forEach((val) => {
          const u = val / stepInterval;
          const y = padT + plotH - (u / maxUnits) * plotH;
          chartSvg.appendChild(
            svg('line', {
              x1: String(padL),
              y1: String(y),
              x2: String(padL + plotW),
              y2: String(y),
              stroke: '#e2e8f0',
              'stroke-width': '1',
              'stroke-dasharray': '2,2',
            })
          );
          chartSvg.appendChild(
            svg('text', {
              x: String(padL - 8),
              y: String(y + 4),
              'font-size': '11',
              'font-weight': '600',
              'text-anchor': 'end',
              fill: '#64748b',
              text: String(val),
            })
          );
        });

        chartSvg.appendChild(
          svg('line', {
            x1: String(padL),
            y1: String(padT),
            x2: String(padL),
            y2: String(padT + plotH),
            stroke: '#334155',
            'stroke-width': '2',
          })
        );
        chartSvg.appendChild(
          svg('line', {
            x1: String(padL),
            y1: String(padT + plotH),
            x2: String(padL + plotW),
            y2: String(padT + plotH),
            stroke: '#334155',
            'stroke-width': '2',
          })
        );

        bars.forEach((b, idx) => {
          const x = padL + idx * barSlotW + (barSlotW - barWidth) / 2;
          const hRatio = Math.min(1, b.gridUnits / maxUnits);
          const barH = hRatio * plotH;
          const y = padT + plotH - barH;
          const trueVal = readBarValue(b.gridUnits, stepInterval);

          chartSvg.appendChild(
            svg('rect', {
              class: 'bar-rect',
              x: String(x),
              y: String(y),
              width: String(barWidth),
              height: String(barH),
              fill: b.color,
              rx: '3',
            })
          );
          chartSvg.appendChild(
            svg('text', {
              class: 'bar-value-label',
              x: String(x + barWidth / 2),
              y: String(Math.max(padT + 12, y - 6)),
              'font-size': '11',
              'font-weight': 'bold',
              'text-anchor': 'middle',
              fill: '#1e293b',
              text: String(trueVal),
            })
          );
          chartSvg.appendChild(
            svg('text', {
              class: 'bar-category-label',
              x: String(x + barWidth / 2),
              y: String(padT + plotH + 20),
              'font-size': '11',
              'font-weight': '500',
              'text-anchor': 'middle',
              fill: '#475569',
              text: b.category.split(' ')[0] ?? '',
            })
          );
        });

        const svgWrap = el('div', {
          style: { width: '100%', overflowX: 'auto' },
        });
        svgWrap.appendChild(chartSvg);
        graphCard.appendChild(svgWrap);
        workspaceContainer.appendChild(graphCard);

        // Interactive Steppers for Bar Heights
        const steppersCard = el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--sand, #e5e7eb)',
            background: 'var(--card-bg, #fafafa)',
          },
        });

        bars.forEach((b) => {
          const row = el('div', {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 10px',
              borderRadius: '6px',
              background: '#fff',
              border: '1px solid #f1f5f9',
            },
          });

          const label = el('span', {
            text: t('bargraph.barLabel', {
              category: b.category,
              value: String(readBarValue(b.gridUnits, stepInterval)),
              grid: String(b.gridUnits),
            }),
            style: { fontWeight: '600' },
          });

          const btnGrp = el('div', { style: { display: 'flex', gap: '6px' } });
          const decBtn = el('button', {
            class: 'btn',
            text: t('bargraph.lineDown'),
            style: { minHeight: '44px', padding: '4px 10px' },
            onClick() {
              b.gridUnits = Math.max(0, b.gridUnits - 1);
              state.bars = bars;
              renderWorkspace();
            },
          });
          const incBtn = el('button', {
            class: 'btn',
            text: t('bargraph.lineUp'),
            style: { minHeight: '44px', padding: '4px 10px' },
            onClick() {
              b.gridUnits = Math.min(maxUnits, b.gridUnits + 1);
              state.bars = bars;
              renderWorkspace();
            },
          });

          btnGrp.appendChild(decBtn);
          btnGrp.appendChild(incBtn);
          row.appendChild(label);
          row.appendChild(btnGrp);
          steppersCard.appendChild(row);
        });

        workspaceContainer.appendChild(steppersCard);
      }

      function renderScaleMultipliers() {
        const val = readBarValue(expMark, expStep);

        feedbackEl.textContent = t('bargraph.readFeedbackEq', {
          mark: String(expMark),
          step: String(expStep),
          val: String(val),
        });

        const expCard = el('div', {
          class: 'multiplier-card',
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

        // Readout
        const readout = el('div', {
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

        readout.appendChild(
          el('span', {
            text: t('bargraph.lineMark', { mark: String(expMark), step: String(expStep) }),
            style: { fontWeight: '600', fontSize: '1.1rem', color: '#1d4ed8' },
          })
        );

        readout.appendChild(
          el('span', {
            class: 'stat-pill multiplier-total-pill',
            text: t('bargraph.unitsVal', { val: String(val) }),
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
        expCard.appendChild(readout);

        // Vikram's trap callout
        const vikramBox = el('div', {
          style: {
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.08)',
            borderLeft: '4px solid #ef4444',
            borderRadius: '6px',
          },
        });
        vikramBox.appendChild(
          el('p', {
            style: { margin: '0', fontSize: '0.95rem' },
            text: t('bargraph.vikramTrapLong'),
          })
        );
        expCard.appendChild(vikramBox);

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

        // Mark buttons
        const markGrp = el('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' },
        });
        markGrp.appendChild(
          el('span', { text: t('bargraph.lineMarkLabel'), style: { fontWeight: '600' } })
        );
        [1, 2, 3, 4, 5].forEach((m) => {
          const b = el('button', {
            class: `btn ${expMark === m ? 'active' : ''}`,
            text: t('bargraph.lineN', { m: String(m) }),
            style: { minHeight: '44px', padding: '6px 10px' },
            onClick() {
              expMark = m;
              state.expMark = expMark;
              renderWorkspace();
            },
          });
          markGrp.appendChild(b);
        });

        // Step buttons
        const stepGrp = el('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' },
        });
        stepGrp.appendChild(
          el('span', { text: t('bargraph.axisStepShort'), style: { fontWeight: '600' } })
        );
        [1, 2, 5, 10].forEach((st) => {
          const b = el('button', {
            class: `btn ${expStep === st ? 'active' : ''}`,
            text: t('bargraph.stepBtn', { st: String(st) }),
            style: { minHeight: '44px', padding: '6px 10px' },
            onClick() {
              expStep = st;
              state.expStep = expStep;
              renderWorkspace();
            },
          });
          stepGrp.appendChild(b);
        });

        ctrlRow.appendChild(markGrp);
        ctrlRow.appendChild(stepGrp);
        expCard.appendChild(ctrlRow);

        workspaceContainer.appendChild(expCard);
      }

      function renderJaalFoodIntake() {
        feedbackEl.textContent = t('bargraph.jaalFeedbackShort');

        const jaalCard = el('div', {
          class: 'jaal-food-card',
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

        // Orientation toggle
        const toggleRow = el('div', {
          style: { display: 'flex', gap: '8px', justifyContent: 'center' },
        });
        const vertBtn = el('button', {
          class: `btn ${jaalOrientation === 'vertical' ? 'active' : ''}`,
          text: t('bargraph.verticalBars'),
          style: {
            minHeight: '44px',
            padding: '6px 14px',
            fontWeight: jaalOrientation === 'vertical' ? 'bold' : 'normal',
          },
          onClick() {
            jaalOrientation = 'vertical';
            state.jaalOrientation = jaalOrientation;
            renderWorkspace();
          },
        });
        const horizBtn = el('button', {
          class: `btn ${jaalOrientation === 'horizontal' ? 'active' : ''}`,
          text: t('bargraph.horizontalBars'),
          style: {
            minHeight: '44px',
            padding: '6px 14px',
            fontWeight: jaalOrientation === 'horizontal' ? 'bold' : 'normal',
          },
          onClick() {
            jaalOrientation = 'horizontal';
            state.jaalOrientation = jaalOrientation;
            renderWorkspace();
          },
        });
        toggleRow.appendChild(vertBtn);
        toggleRow.appendChild(horizBtn);
        jaalCard.appendChild(toggleRow);

        // Nutrition bars display
        const listContainer = el('div', {
          style: { display: 'flex', flexDirection: 'column', gap: '10px' },
        });

        FOOD_INTAKE_DATASET.forEach((item) => {
          const itemBox = el('div', {
            class: 'food-bar-item',
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
            },
          });

          const titleRow = el('div', {
            style: { display: 'flex', justifyContent: 'space-between' },
          });
          titleRow.appendChild(
            el('span', {
              text: t('bargraph.foodRow', { category: item.category, nutrient: item.nutrient }),
              style: { fontWeight: '600' },
            })
          );
          titleRow.appendChild(
            el('span', {
              class: 'stat-pill food-amount-pill',
              text: t('bargraph.foodCount', { count: String(item.count) }),
              style: { fontWeight: 'bold' },
            })
          );
          itemBox.appendChild(titleRow);

          // Horizontal bar visual
          const barTrack = el('div', {
            style: {
              height: '14px',
              width: '100%',
              background: '#e2e8f0',
              borderRadius: '7px',
              overflow: 'hidden',
            },
          });
          const fillW = Math.min(100, (item.count / 40) * 100);
          barTrack.appendChild(
            el('div', {
              style: {
                height: '100%',
                width: `${fillW}%`,
                background: '#10b981',
                borderRadius: '7px',
              },
            })
          );
          itemBox.appendChild(barTrack);

          listContainer.appendChild(itemBox);
        });

        jaalCard.appendChild(listContainer);

        // Insight
        const insight = el('div', {
          style: {
            padding: '12px 14px',
            background: 'rgba(16, 185, 129, 0.08)',
            borderLeft: '4px solid #10b981',
            borderRadius: '6px',
          },
        });
        insight.appendChild(
          el('p', {
            style: { margin: '0', fontSize: '0.95rem' },
            text: t('bargraph.jaalNoteLong'),
          })
        );
        jaalCard.appendChild(insight);

        workspaceContainer.appendChild(jaalCard);
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
        text: t('bargraph.reset'),
        style: { minHeight: '44px', padding: '10px 16px', borderRadius: '6px' },
        onClick() {
          stepInterval = 5;
          bars = [
            { category: 'Footballs', gridUnits: 3, color: '#3b82f6' },
            { category: 'Cricket Bats', gridUnits: 4, color: '#10b981' },
            { category: 'Rackets', gridUnits: 2, color: '#f59e0b' },
            { category: 'Helmets', gridUnits: 5, color: '#8b5cf6' },
          ];
          expMark = 4;
          expStep = 10;
          jaalOrientation = 'vertical';
          state.stepInterval = stepInterval;
          state.bars = bars;
          state.expMark = expMark;
          state.expStep = expStep;
          state.jaalOrientation = jaalOrientation;
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
          router.go('mistake', { k: 'H2' });
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
