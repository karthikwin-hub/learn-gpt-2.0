/**
 * Interactive Manipulative Workbench for Knot G3: Slide the Top (Shear).
 * Explores conservation of area under horizontal shear ($A = b \times h$),
 * Pythagorean slant side growth, perimeter variation, and cut-and-shift triangular conservation.
 */

import { shearDecomposition } from '../../../domain/math/shear';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

export function createShearScreen(): ScreenMeta {
  return {
    id: 'shear',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'shear.title',
    render(view, state, params = {}) {
      enterThread('G3', 'shear', params);

      let stepNum = readStep(params.step, state.step, 3);

      let baseVal = typeof state.base === 'number' ? state.base : 6;
      let heightVal = typeof state.height === 'number' ? state.height : 4;
      let offsetVal = typeof state.offset === 'number' ? state.offset : 0;
      let isCutShift = Boolean(state.cutShift);

      state.step = stepNum;
      state.base = baseVal;
      state.height = heightVal;
      state.offset = offsetVal;
      state.cutShift = isCutShift;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('shear.title'),
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
        { num: 1, label: t('shear.tab1') },
        { num: 2, label: t('shear.tab2') },
        { num: 3, label: t('shear.tab3') },
      ];

      stepsConfig.forEach((cfg) => {
        const tabBtn = el('button', {
          class: `btn step-tab ${stepNum === cfg.num ? 'btn-active' : ''}`,
          text: cfg.label,
          'aria-current': stepNum === cfg.num ? 'step' : 'false',
          style: { minHeight: '44px', minWidth: '44px' },
          onclick: () => {
            stepNum = cfg.num;
            state.step = stepNum;
            if (stepNum === 2 && offsetVal === 0) {
              offsetVal = 3;
              state.offset = offsetVal;
              isCutShift = true;
              state.cutShift = true;
            }
            renderContent();
          },
        });
        stepTabs.appendChild(tabBtn);
      });

      const contentBox = el('div', {
        class: 'shear-content-box',
        style: {
          maxWidth: '560px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        },
      });

      function renderContent() {
        clear(contentBox);

        // Update active step tab buttons
        stepTabs.querySelectorAll('.step-tab').forEach((b, idx) => {
          if (idx + 1 === stepNum) {
            b.classList.add('btn-active');
            b.setAttribute('aria-current', 'step');
          } else {
            b.classList.remove('btn-active');
            b.setAttribute('aria-current', 'false');
          }
        });

        const decomp = shearDecomposition(baseVal, heightVal, offsetVal);
        const area = decomp.area;
        const perimeter = decomp.perimeter;
        const slant = decomp.slant;

        // Feedback guidance based on current state
        if (isCutShift && offsetVal > 0) {
          feedbackEl.textContent = t('shear.s2done').replace('{area}', `${area} cm²`);
        } else if (offsetVal > 0) {
          feedbackEl.textContent = t('shear.s1done');
        } else {
          feedbackEl.textContent = t(`shear.s${stepNum}`);
        }

        // SVG Canvas
        const svgContainer = el('div', {
          class: 'shear-canvas-wrap card',
          style: {
            width: '100%',
            padding: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '12px',
            border: '1px solid var(--border, #e5e7eb)',
          },
        });

        const svgW = 380;
        const svgH = 220;
        const scale = 24; // 24px per cm
        const yBase = 170;
        const yTop = yBase - heightVal * scale;
        const xOrigin = 60;

        const xBL = xOrigin;
        const xBR = xBL + baseVal * scale;
        const xTL = xBL + offsetVal * scale;
        const xTR = xBR + offsetVal * scale;

        const diagram = svg('svg', {
          viewBox: `0 0 ${svgW} ${svgH}`,
          width: '100%',
          height: '220',
          role: 'img',
          'aria-label': t('shear.title'),
        });
        diagram.appendChild(
          svg('rect', {
            width: String(svgW),
            height: String(svgH),
            fill: 'var(--paper-sunk)',
          })
        );
        diagram.appendChild(
          svg('line', {
            x1: '20',
            y1: String(yTop),
            x2: '360',
            y2: String(yTop),
            stroke: 'var(--ink-soft)',
            'stroke-width': '1.5',
            'stroke-dasharray': '4 4',
          })
        );
        diagram.appendChild(
          svg('line', {
            x1: '20',
            y1: String(yBase),
            x2: '360',
            y2: String(yBase),
            stroke: 'var(--ink)',
            'stroke-width': '2',
          })
        );
        const polyPts =
          !isCutShift || offsetVal === 0
            ? `${xBL},${yBase} ${xBR},${yBase} ${xTR},${yTop} ${xTL},${yTop}`
            : `${xBL},${yBase} ${xBR},${yBase} ${xBR},${yTop} ${xTL},${yTop}`;
        diagram.appendChild(
          svg('polygon', {
            points: polyPts,
            fill: 'rgba(99, 102, 241, 0.2)',
            stroke: 'var(--indigo)',
            'stroke-width': '2.5',
          })
        );
        if (isCutShift && offsetVal > 0) {
          diagram.appendChild(
            svg('polygon', {
              points: `${xBL},${yBase} ${xTL},${yTop} ${xBL},${yTop}`,
              fill: 'rgba(244, 63, 94, 0.3)',
              stroke: 'var(--kumkum)',
              'stroke-width': '2',
            })
          );
        }
        if (offsetVal > 0) {
          diagram.appendChild(
            svg('line', {
              x1: String(xTL),
              y1: String(yTop),
              x2: String(xTL),
              y2: String(yBase),
              stroke: 'var(--ink)',
              'stroke-dasharray': '3 3',
              'stroke-width': '1.5',
            })
          );
          const ht = svg('text', {
            x: String(xTL + 14),
            y: String((yTop + yBase) / 2 + 4),
            'font-size': '12',
            fill: 'var(--ink)',
          });
          ht.textContent = `${heightVal}`;
          diagram.appendChild(ht);
        }
        const baseLbl = svg('text', {
          x: String((xBL + xBR) / 2),
          y: String(yBase + 18),
          'text-anchor': 'middle',
          'font-size': '13',
          fill: 'var(--ink)',
        });
        baseLbl.textContent = `${baseVal}`;
        diagram.appendChild(baseLbl);
        svgContainer.appendChild(diagram);
        svgContainer.appendChild(
          el('p', { class: 'small muted', text: t('shear.guideRail', { h: heightVal }) })
        );
        contentBox.appendChild(svgContainer);

        // Control Panel
        const controlPanel = el('div', {
          class: 'shear-controls card',
          style: {
            width: '100%',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '12px',
            border: '1px solid var(--border, #e5e7eb)',
          },
        });

        // Offset Slider (Slide the top)
        const offsetRow = el('div', {
          class: 'control-row',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          },
        });
        const offsetLabel = el('label', {
          for: 'shear-offset-slider',
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: '600',
            fontSize: '14px',
          },
        });
        offsetLabel.appendChild(
          el('span', { text: `${t('shear.offset')} ${t('shear.offsetHint')}` })
        );
        offsetLabel.appendChild(
          el('span', { text: t('shear.offsetValue', { n: offsetVal.toFixed(1) }) })
        );

        const offsetSlider = el('input', {
          id: 'shear-offset-slider',
          type: 'range',
          min: '0',
          max: '4',
          step: '0.5',
          value: String(offsetVal),
          'aria-label': t('shear.offset'),
          style: {
            width: '100%',
            minHeight: '44px',
            cursor: 'pointer',
          },
          oninput: (e: Event) => {
            const target = e.target as HTMLInputElement;
            offsetVal = parseFloat(target.value);
            state.offset = offsetVal;
            renderContent();
          },
        });
        offsetRow.appendChild(offsetLabel);
        offsetRow.appendChild(offsetSlider);
        controlPanel.appendChild(offsetRow);

        // Base & Height selector row
        const dimsRow = el('div', {
          class: 'dims-row',
          style: {
            display: 'flex',
            gap: '12px',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          },
        });

        // Base stepper
        const baseBox = el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: '1',
            minWidth: '120px',
          },
        });
        baseBox.appendChild(el('span', { class: 'small muted', text: `${t('shear.base')} (cm)` }));
        const baseBtns = el('div', { style: { display: 'flex', gap: '6px' } });
        [5, 6, 7].forEach((b) => {
          baseBtns.appendChild(
            el('button', {
              class: `chip ${baseVal === b ? 'on' : ''}`,
              type: 'button',
              text: `${b}`,
              'aria-pressed': String(baseVal === b),
              style: { minHeight: '44px', minWidth: '44px' },
              onclick: () => {
                baseVal = b;
                state.base = baseVal;
                renderContent();
              },
            })
          );
        });
        baseBox.appendChild(baseBtns);
        dimsRow.appendChild(baseBox);

        // Height stepper
        const heightBox = el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: '1',
            minWidth: '120px',
          },
        });
        heightBox.appendChild(
          el('span', { class: 'small muted', text: `${t('shear.height')} (cm)` })
        );
        const heightBtns = el('div', { style: { display: 'flex', gap: '6px' } });
        [3, 4, 5].forEach((h) => {
          heightBtns.appendChild(
            el('button', {
              class: `chip ${heightVal === h ? 'on' : ''}`,
              type: 'button',
              text: `${h}`,
              'aria-pressed': String(heightVal === h),
              style: { minHeight: '44px', minWidth: '44px' },
              onclick: () => {
                heightVal = h;
                state.height = heightVal;
                renderContent();
              },
            })
          );
        });
        heightBox.appendChild(heightBtns);
        dimsRow.appendChild(heightBox);

        controlPanel.appendChild(dimsRow);

        // Action Buttons: Cut & Shift + Reset
        const btnRow = el('div', {
          style: {
            display: 'flex',
            gap: '10px',
            marginTop: '4px',
            flexWrap: 'wrap',
          },
        });

        const cutShiftBtn = el('button', {
          id: 'btn-cut-shift',
          class: `btn ${isCutShift ? 'primary' : 'outline'}`,
          type: 'button',
          text: t('shear.cutShift'),
          'aria-pressed': String(isCutShift),
          style: { minHeight: '44px', flex: '1' },
          onclick: () => {
            isCutShift = !isCutShift;
            state.cutShift = isCutShift;
            renderContent();
          },
        });

        const resetBtn = el('button', {
          class: 'btn outline',
          type: 'button',
          text: t('shear.reset'),
          style: { minHeight: '44px', minWidth: '80px' },
          onclick: () => {
            offsetVal = 0;
            state.offset = 0;
            isCutShift = false;
            state.cutShift = false;
            renderContent();
          },
        });

        btnRow.appendChild(cutShiftBtn);
        btnRow.appendChild(resetBtn);
        controlPanel.appendChild(btnRow);

        contentBox.appendChild(controlPanel);

        // Live Readout Metric Cards
        const readoutCards = el('div', {
          class: 'shear-readout-grid',
          style: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
          },
        });

        // Area Card (Invariant!)
        const areaCard = el('div', {
          class: 'card readout-card',
          style: {
            padding: '12px',
            textAlign: 'center',
            background: 'rgba(99, 102, 241, 0.08)',
            border: '2px solid var(--accent, #6366f1)',
            borderRadius: '10px',
          },
        });
        areaCard.appendChild(el('div', { class: 'small muted', text: t('shear.area') }));
        areaCard.appendChild(
          el('div', {
            class: 'stat-val',
            style: {
              fontSize: '22px',
              fontWeight: 'bold',
              color: 'var(--accent, #6366f1)',
              margin: '4px 0',
            },
            text: `${area} cm²`,
          })
        );
        areaCard.appendChild(
          el('div', { class: 'small', text: `b × h = ${baseVal} × ${heightVal}` })
        );
        readoutCards.appendChild(areaCard);

        // Perimeter Card (Varying!)
        const perimeterCard = el('div', {
          class: 'card readout-card',
          style: {
            padding: '12px',
            textAlign: 'center',
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--border, #e5e7eb)',
            borderRadius: '10px',
          },
        });
        perimeterCard.appendChild(el('div', { class: 'small muted', text: t('shear.perimeter') }));
        perimeterCard.appendChild(
          el('div', {
            class: 'stat-val',
            style: { fontSize: '20px', fontWeight: 'bold', margin: '4px 0' },
            text: `${perimeter.toFixed(1)} cm`,
          })
        );
        perimeterCard.appendChild(
          el('div', { class: 'small muted', text: `2 × (${baseVal} + ${slant.toFixed(1)})` })
        );
        readoutCards.appendChild(perimeterCard);

        // Slant side card
        const slantCard = el('div', {
          class: 'card readout-card',
          style: {
            padding: '12px',
            textAlign: 'center',
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--border, #e5e7eb)',
            borderRadius: '10px',
          },
        });
        slantCard.appendChild(el('div', { class: 'small muted', text: t('shear.slant') }));
        slantCard.appendChild(
          el('div', {
            class: 'stat-val',
            style: { fontSize: '20px', fontWeight: 'bold', margin: '4px 0' },
            text: `${slant.toFixed(1)} cm`,
          })
        );
        slantCard.appendChild(el('div', { class: 'small muted', text: t('shear.slantFormula') }));
        readoutCards.appendChild(slantCard);

        contentBox.appendChild(readoutCards);

        // Key insight banner
        const insightCard = el('div', {
          class: 'card insight-banner',
          style: {
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            fontSize: '14px',
            lineHeight: '1.4',
          },
        });
        insightCard.textContent = t('shear.insight', {
          area,
          base: baseVal,
          height: heightVal,
        });
        contentBox.appendChild(insightCard);

        const nextBtn = toMistakeButton('G3');
        nextBtn.style.minHeight = '44px';
        nextBtn.style.width = '100%';
        nextBtn.style.marginTop = '8px';
        contentBox.appendChild(nextBtn);
      }

      view.appendChild(titleEl);
      view.appendChild(feedbackEl);
      view.appendChild(stepTabs);
      view.appendChild(contentBox);

      renderContent();
    },
  };
}
