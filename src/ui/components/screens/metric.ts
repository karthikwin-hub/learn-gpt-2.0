/**
 * Interactive Manipulative Workbench for Knot U2: Metres, Grams and Litres (Metric Conversion Ladder).
 *
 * Explores:
 * - Metric prefix scaling (kilo = 1000, base = 1, centi = 1/100, milli = 1/1000).
 * - Shifting the decimal dot left (division) or right (multiplication) along the ladder.
 * - Mixed notation traps (e.g. 4 m 5 cm = 4.05 m != 4.5 m).
 * - Dual balance comparator for equating quantities across different units.
 */

import {
  convertLength,
  convertMass,
  convertCapacity,
  type LengthUnit,
  type MassUnit,
  type CapacityUnit,
} from '../../../domain/math/metric';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import type { ScreenMeta } from '../app/router';

export function createMetricScreen(): ScreenMeta {
  return {
    id: 'metric',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'metric.title',
    render(view, state, params = {}) {
      enterThread('U2', 'metric', params);

      let stepNum = readStep(params.step, state.step, 3);

      let lengthVal = typeof state.lengthVal === 'number' ? state.lengthVal : 2.5;
      let lengthUnit = (state.lengthUnit as LengthUnit) || 'm';

      let subMode = (state.subMode as 'mass' | 'capacity') || 'mass';
      let massVal = typeof state.massVal === 'number' ? state.massVal : 1500;
      let massUnit = (state.massUnit as MassUnit) || 'g';

      let capVal = typeof state.capVal === 'number' ? state.capVal : 500;
      let capUnit = (state.capUnit as CapacityUnit) || 'mL';

      let compMode = (state.compMode as 'length' | 'mass' | 'capacity') || 'length';
      let leftVal = typeof state.leftVal === 'number' ? state.leftVal : 250;
      let leftUnit = typeof state.leftUnit === 'string' ? state.leftUnit : 'cm';
      let rightVal = typeof state.rightVal === 'number' ? state.rightVal : 2;
      let rightUnit = typeof state.rightUnit === 'string' ? state.rightUnit : 'm';

      state.step = stepNum;
      state.lengthVal = lengthVal;
      state.lengthUnit = lengthUnit;
      state.subMode = subMode;
      state.massVal = massVal;
      state.massUnit = massUnit;
      state.capVal = capVal;
      state.capUnit = capUnit;
      state.compMode = compMode;
      state.leftVal = leftVal;
      state.leftUnit = leftUnit;
      state.rightVal = rightVal;
      state.rightUnit = rightUnit;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('metric.title'),
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
        { num: 1, label: t('metric.tab1') },
        { num: 2, label: t('metric.tab2') },
        { num: 3, label: t('metric.tab3') },
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
            renderWorkspace();
          },
        });
        stepTabs.appendChild(btn);
      });

      const workspaceContainer = el('div', {
        class: 'metric-workspace',
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '560px',
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
          renderLengthLadder();
        } else if (stepNum === 2) {
          renderMassCapacity();
        } else {
          renderComparator();
        }
      }

      function renderLengthLadder() {
        feedbackEl.textContent = t('metric.lengthFeedback', {
          val: String(lengthVal),
          unit: lengthUnit,
        });

        // Controls
        const controlPanel = el('div', {
          class: 'ladder-controls',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            padding: '12px',
            border: '1px solid var(--paper-sunk)',
            borderRadius: '8px',
            background: 'var(--paper-raised)',
          },
        });

        const rowVal = el('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            flexWrap: 'wrap',
          },
        });

        const valLabel = el('span', {
          text: t('metric.valueLabel', { val: String(lengthVal) }),
          style: { fontWeight: '600', fontSize: '1.1rem' },
        });

        const valBtnGroup = el('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' },
        });

        const deltas = [-1, -0.1, 0.1, 1];
        deltas.forEach((d) => {
          const b = el('button', {
            class: 'btn',
            text: d > 0 ? `+${d}` : `${d}`,
            style: { minHeight: '44px', minWidth: '44px', padding: '6px 10px' },
            onClick() {
              lengthVal = Math.max(0.1, Math.round((lengthVal + d) * 10) / 10);
              state.lengthVal = lengthVal;
              renderWorkspace();
            },
          });
          valBtnGroup.appendChild(b);
        });

        rowVal.appendChild(valLabel);
        rowVal.appendChild(valBtnGroup);
        controlPanel.appendChild(rowVal);

        // Unit selector
        const rowUnit = el('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          },
        });
        rowUnit.appendChild(
          el('span', { text: t('metric.baseUnit'), style: { fontWeight: '500' } })
        );

        const units: LengthUnit[] = ['km', 'm', 'cm', 'mm'];
        units.forEach((u) => {
          const uBtn = el('button', {
            class: `btn ${lengthUnit === u ? 'active' : ''}`,
            text: u,
            style: {
              minHeight: '44px',
              minWidth: '48px',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: lengthUnit === u ? 'bold' : 'normal',
              background: lengthUnit === u ? 'var(--paper-sunk)' : 'transparent',
              border: '1px solid var(--paper-sunk)',
            },
            onClick() {
              lengthUnit = u;
              state.lengthUnit = lengthUnit;
              renderWorkspace();
            },
          });
          rowUnit.appendChild(uBtn);
        });
        controlPanel.appendChild(rowUnit);
        workspaceContainer.appendChild(controlPanel);

        // Ladder display
        const ladderView = el('div', {
          class: 'ladder-view',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
          },
        });

        const ladderSteps: { unit: LengthUnit; nameKey: string; multKey: string }[] = [
          { unit: 'km', nameKey: 'metric.unit_km', multKey: 'metric.ladder_km_mult' },
          { unit: 'm', nameKey: 'metric.unit_m', multKey: 'metric.ladder_m_mult' },
          { unit: 'cm', nameKey: 'metric.unit_cm', multKey: 'metric.ladder_cm_mult' },
          { unit: 'mm', nameKey: 'metric.unit_mm', multKey: 'metric.ladder_mm_mult' },
        ];

        ladderSteps.forEach((st) => {
          const conv = convertLength(lengthVal, lengthUnit, st.unit);
          const isCurrent = lengthUnit === st.unit;
          const rung = el('div', {
            class: 'ladder-rung',
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              borderRadius: '8px',
              border: isCurrent ? '2px solid var(--thread)' : '1px solid var(--paper-sunk)',
              background: isCurrent ? 'rgba(59, 130, 246, 0.08)' : 'var(--paper-raised)',
              minHeight: '48px',
            },
          });

          const leftInfo = el('div', { style: { display: 'flex', flexDirection: 'column' } });
          leftInfo.appendChild(
            el('span', {
              text: t(st.nameKey),
              style: { fontWeight: isCurrent ? 'bold' : '600' },
            })
          );
          leftInfo.appendChild(
            el('small', {
              text: t(st.multKey),
              style: { color: 'var(--ink-soft)' },
            })
          );

          const rightInfo = el('div', {
            class: 'stat-pill',
            text: t('metric.convReadout', { conv: String(conv), unit: st.unit }),
            style: {
              fontWeight: '700',
              fontSize: '1.1rem',
              padding: '4px 10px',
              borderRadius: '6px',
              background: isCurrent ? 'var(--indigo)' : 'var(--paper-sunk)',
              color: isCurrent ? 'var(--paper-raised)' : 'var(--ink)',
            },
          });

          rung.appendChild(leftInfo);
          rung.appendChild(rightInfo);
          ladderView.appendChild(rung);
        });

        workspaceContainer.appendChild(ladderView);

        // Key insight callout
        const insight = el('div', {
          class: 'callout-box',
          style: {
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.08)',
            borderLeft: '4px solid #10b981',
            width: '100%',
          },
        });
        insight.appendChild(
          el('p', {
            style: { margin: '0' },
            text: t('metric.ladderRule'),
          })
        );
        workspaceContainer.appendChild(insight);
      }

      function renderMassCapacity() {
        feedbackEl.textContent = t('metric.massCapacityFeedback');

        // Toggle submode
        const modeRow = el('div', {
          style: { display: 'flex', gap: '8px', width: '100%', justifyContent: 'center' },
        });

        const massToggle = el('button', {
          class: `btn ${subMode === 'mass' ? 'active' : ''}`,
          text: t('metric.massToggle'),
          style: {
            padding: '8px 14px',
            minHeight: '44px',
            borderRadius: '6px',
            border:
              subMode === 'mass' ? '2px solid var(--ink, #1f2937)' : '1px solid var(--paper-sunk)',
            fontWeight: subMode === 'mass' ? 'bold' : 'normal',
          },
          onClick() {
            subMode = 'mass';
            state.subMode = subMode;
            renderWorkspace();
          },
        });

        const capToggle = el('button', {
          class: `btn ${subMode === 'capacity' ? 'active' : ''}`,
          text: t('metric.capacityToggle'),
          style: {
            padding: '8px 14px',
            minHeight: '44px',
            borderRadius: '6px',
            border:
              subMode === 'capacity'
                ? '2px solid var(--ink, #1f2937)'
                : '1px solid var(--paper-sunk)',
            fontWeight: subMode === 'capacity' ? 'bold' : 'normal',
          },
          onClick() {
            subMode = 'capacity';
            state.subMode = subMode;
            renderWorkspace();
          },
        });

        modeRow.appendChild(massToggle);
        modeRow.appendChild(capToggle);
        workspaceContainer.appendChild(modeRow);

        if (subMode === 'mass') {
          // Mass view
          const massLadder = el('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: '100%',
            },
          });

          // Mass buttons
          const massControls = el('div', {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid var(--paper-sunk)',
              borderRadius: '8px',
              flexWrap: 'wrap',
              gap: '8px',
            },
          });

          massControls.appendChild(
            el('span', {
              text: t('metric.massLabel', { val: String(massVal), unit: massUnit }),
              style: { fontWeight: '600' },
            })
          );

          const massBtns = el('div', { style: { display: 'flex', gap: '6px' } });
          const massDeltas = [-500, -100, 100, 500];
          massDeltas.forEach((d) => {
            const b = el('button', {
              class: 'btn',
              text: d > 0 ? `+${d}` : `${d}`,
              style: { minHeight: '44px', padding: '6px 10px' },
              onClick() {
                massVal = Math.max(10, massVal + d);
                state.massVal = massVal;
                renderWorkspace();
              },
            });
            massBtns.appendChild(b);
          });
          massControls.appendChild(massBtns);
          workspaceContainer.appendChild(massControls);

          const massSteps: { unit: MassUnit; nameKey: string }[] = [
            { unit: 'kg', nameKey: 'metric.unit_kg' },
            { unit: 'g', nameKey: 'metric.unit_g' },
            { unit: 'mg', nameKey: 'metric.unit_mg' },
          ];

          massSteps.forEach((st) => {
            const conv = convertMass(massVal, massUnit, st.unit);
            const isCurr = massUnit === st.unit;
            const r = el('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '8px',
                border: isCurr ? '2px solid var(--thread)' : '1px solid var(--paper-sunk)',
                background: isCurr ? 'rgba(59, 130, 246, 0.08)' : 'var(--paper-raised)',
              },
            });
            r.appendChild(el('span', { text: t(st.nameKey), style: { fontWeight: '600' } }));
            r.appendChild(
              el('span', {
                class: 'stat-pill',
                text: t('metric.convReadout', { conv: String(conv), unit: st.unit }),
                style: { fontWeight: '700', fontSize: '1.1rem' },
              })
            );
            massLadder.appendChild(r);
          });
          workspaceContainer.appendChild(massLadder);
        } else {
          // Capacity view
          const capControls = el('div', {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid var(--paper-sunk)',
              borderRadius: '8px',
              flexWrap: 'wrap',
              gap: '8px',
            },
          });

          capControls.appendChild(
            el('span', {
              text: t('metric.capacityLabel', { val: String(capVal), unit: capUnit }),
              style: { fontWeight: '600' },
            })
          );

          const capBtns = el('div', { style: { display: 'flex', gap: '6px' } });
          const capDeltas = [-250, -50, 50, 250];
          capDeltas.forEach((d) => {
            const b = el('button', {
              class: 'btn',
              text: d > 0 ? `+${d}` : `${d}`,
              style: { minHeight: '44px', padding: '6px 10px' },
              onClick() {
                capVal = Math.max(10, capVal + d);
                state.capVal = capVal;
                renderWorkspace();
              },
            });
            capBtns.appendChild(b);
          });
          capControls.appendChild(capBtns);
          workspaceContainer.appendChild(capControls);

          const capLadder = el('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: '100%',
            },
          });

          const capSteps: { unit: CapacityUnit; nameKey: string }[] = [
            { unit: 'kL', nameKey: 'metric.unit_kL' },
            { unit: 'L', nameKey: 'metric.unit_L' },
            { unit: 'mL', nameKey: 'metric.unit_mL' },
          ];

          capSteps.forEach((st) => {
            const conv = convertCapacity(capVal, capUnit, st.unit);
            const isCurr = capUnit === st.unit;
            const r = el('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '8px',
                border: isCurr ? '2px solid var(--thread)' : '1px solid var(--paper-sunk)',
                background: isCurr ? 'rgba(59, 130, 246, 0.08)' : 'var(--paper-raised)',
              },
            });
            r.appendChild(el('span', { text: t(st.nameKey), style: { fontWeight: '600' } }));
            r.appendChild(
              el('span', {
                class: 'stat-pill',
                text: t('metric.convReadout', { conv: String(conv), unit: st.unit }),
                style: { fontWeight: '700', fontSize: '1.1rem' },
              })
            );
            capLadder.appendChild(r);
          });
          workspaceContainer.appendChild(capLadder);
        }
      }

      function renderComparator() {
        // Preset shortcuts
        const presetContainer = el('div', {
          style: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          },
        });

        const presets = [
          {
            label: t('metric.preset_cm_m'),
            mode: 'length' as const,
            lv: 250,
            lu: 'cm',
            rv: 2,
            ru: 'm',
          },
          {
            label: t('metric.preset_m_decimal'),
            mode: 'length' as const,
            lv: 4.05,
            lu: 'm',
            rv: 4.05,
            ru: 'm',
          },
          {
            label: t('metric.preset_kg_g'),
            mode: 'mass' as const,
            lv: 1.5,
            lu: 'kg',
            rv: 1500,
            ru: 'g',
          },
          {
            label: t('metric.preset_mL_L'),
            mode: 'capacity' as const,
            lv: 750,
            lu: 'mL',
            rv: 0.75,
            ru: 'L',
          },
        ];

        presets.forEach((p) => {
          const btn = el('button', {
            class: 'btn preset-btn',
            text: p.label,
            style: {
              minHeight: '44px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--paper-sunk)',
              background: 'var(--paper-raised)',
            },
            onClick() {
              compMode = p.mode;
              leftVal = p.lv;
              leftUnit = p.lu;
              rightVal = p.rv;
              rightUnit = p.ru;
              state.compMode = compMode;
              state.leftVal = leftVal;
              state.leftUnit = leftUnit;
              state.rightVal = rightVal;
              state.rightUnit = rightUnit;
              renderWorkspace();
            },
          });
          presetContainer.appendChild(btn);
        });

        workspaceContainer.appendChild(presetContainer);

        // Convert both to base unit to compare
        let leftBase = 0;
        let rightBase = 0;
        let baseUnitName = '';

        if (compMode === 'length') {
          leftBase = convertLength(leftVal, leftUnit as LengthUnit, 'm');
          rightBase = convertLength(rightVal, rightUnit as LengthUnit, 'm');
          baseUnitName = t('metric.base_metres');
        } else if (compMode === 'mass') {
          leftBase = convertMass(leftVal, leftUnit as MassUnit, 'g');
          rightBase = convertMass(rightVal, rightUnit as MassUnit, 'g');
          baseUnitName = t('metric.base_grams');
        } else {
          leftBase = convertCapacity(leftVal, leftUnit as CapacityUnit, 'L');
          rightBase = convertCapacity(rightVal, rightUnit as CapacityUnit, 'L');
          baseUnitName = t('metric.base_litres');
        }

        const diff = Math.round((leftBase - rightBase) * 10000) / 10000;
        const isEqual = Math.abs(diff) < 0.0001;
        const isLeftGreater = diff > 0.0001;

        if (isEqual) {
          feedbackEl.textContent = t('metric.compareBalanced', {
            leftVal: String(leftVal),
            leftUnit,
            rightVal: String(rightVal),
            rightUnit,
            leftBase: String(leftBase),
            base: baseUnitName,
          });
        } else if (isLeftGreater) {
          feedbackEl.textContent = t('metric.compareLeftGreater', {
            leftVal: String(leftVal),
            leftUnit,
            rightVal: String(rightVal),
            rightUnit,
            leftBase: String(leftBase),
            rightBase: String(rightBase),
            base: baseUnitName,
          });
        } else {
          feedbackEl.textContent = t('metric.compareRightGreater', {
            leftVal: String(leftVal),
            leftUnit,
            rightVal: String(rightVal),
            rightUnit,
            leftBase: String(leftBase),
            rightBase: String(rightBase),
            base: baseUnitName,
          });
        }

        // Dual balance visual representation
        const balanceCard = el('div', {
          class: 'balance-card',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid var(--paper-sunk)',
            background: 'var(--paper-raised)',
          },
        });

        // Scales representation
        const tilt = isEqual ? 0 : isLeftGreater ? -12 : 12;
        const beamSvg = svg(
          'svg',
          {
            width: '240',
            height: '90',
            viewBox: '0 0 240 90',
            'aria-hidden': 'true',
          },
          [
            svg('polygon', { points: '120,40 105,75 135,75', fill: '#64748b' }),
            svg('line', {
              x1: '90',
              y1: '75',
              x2: '150',
              y2: '75',
              stroke: '#475569',
              'stroke-width': '3',
            }),
            svg('g', { transform: `rotate(${tilt} 120 40)` }, [
              svg('line', {
                x1: '20',
                y1: '40',
                x2: '220',
                y2: '40',
                stroke: '#334155',
                'stroke-width': '4',
                'stroke-linecap': 'round',
              }),
              svg('line', {
                x1: '30',
                y1: '40',
                x2: '30',
                y2: '65',
                stroke: '#94a3b8',
                'stroke-width': '1.5',
              }),
              svg('path', {
                d: 'M 15 65 Q 30 75 45 65 Z',
                fill: '#cbd5e1',
                stroke: '#64748b',
              }),
              svg('line', {
                x1: '210',
                y1: '40',
                x2: '210',
                y2: '65',
                stroke: '#94a3b8',
                'stroke-width': '1.5',
              }),
              svg('path', {
                d: 'M 195 65 Q 210 75 225 65 Z',
                fill: '#cbd5e1',
                stroke: '#64748b',
              }),
            ]),
          ]
        );

        const svgWrapper = el('div', {
          style: { display: 'flex', justifyContent: 'center' },
        });
        svgWrapper.appendChild(beamSvg);
        balanceCard.appendChild(svgWrapper);

        // Pans readout
        const readoutRow = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: '12px',
          },
        });

        const leftPan = el('div', {
          class: 'stat-pill',
          style: {
            flex: '1',
            textAlign: 'center',
            padding: '10px',
            borderRadius: '8px',
            background: isLeftGreater ? 'rgba(59, 130, 246, 0.12)' : 'var(--paper-sunk)',
            border: isLeftGreater ? '1px solid #3b82f6' : '1px solid #e5e7eb',
          },
        });
        leftPan.appendChild(
          el('div', {
            text: `${leftVal} ${leftUnit}`,
            style: { fontWeight: 'bold', fontSize: '1.2rem' },
          })
        );
        leftPan.appendChild(
          el('small', {
            text: t('metric.convReadout', { conv: String(leftBase), unit: baseUnitName }),
            style: { color: 'var(--ink-soft)' },
          })
        );

        const statusPill = el('div', {
          class: 'stat-pill',
          text: isEqual ? '=' : isLeftGreater ? '>' : '<',
          style: {
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            padding: '8px 14px',
            borderRadius: '50%',
            background: isEqual ? '#10b981' : '#f59e0b',
            color: '#fff',
          },
        });

        const rightPan = el('div', {
          class: 'stat-pill',
          style: {
            flex: '1',
            textAlign: 'center',
            padding: '10px',
            borderRadius: '8px',
            background:
              !isEqual && !isLeftGreater ? 'rgba(59, 130, 246, 0.12)' : 'var(--paper-sunk)',
            border: !isEqual && !isLeftGreater ? '1px solid #3b82f6' : '1px solid #e5e7eb',
          },
        });
        rightPan.appendChild(
          el('div', {
            text: `${rightVal} ${rightUnit}`,
            style: { fontWeight: 'bold', fontSize: '1.2rem' },
          })
        );
        rightPan.appendChild(
          el('small', {
            text: t('metric.convReadout', { conv: String(rightBase), unit: baseUnitName }),
            style: { color: 'var(--ink-soft)' },
          })
        );

        readoutRow.appendChild(leftPan);
        readoutRow.appendChild(statusPill);
        readoutRow.appendChild(rightPan);
        balanceCard.appendChild(readoutRow);
        workspaceContainer.appendChild(balanceCard);

        // Sonia's insight reminder
        const soniaBox = el('div', {
          style: {
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.08)',
            borderLeft: '4px solid #ef4444',
            width: '100%',
          },
        });
        soniaBox.appendChild(
          el('p', {
            style: { margin: '0', fontSize: '0.95rem' },
            text: t('metric.decimalTrap'),
          })
        );
        workspaceContainer.appendChild(soniaBox);
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
          maxWidth: '560px',
        },
      });

      const resetBtn = el('button', {
        class: 'btn',
        text: t('metric.reset'),
        style: { minHeight: '44px', padding: '10px 16px', borderRadius: '6px' },
        onClick() {
          lengthVal = 2.5;
          lengthUnit = 'm';
          massVal = 1500;
          massUnit = 'g';
          capVal = 500;
          capUnit = 'mL';
          leftVal = 250;
          leftUnit = 'cm';
          rightVal = 2;
          rightUnit = 'm';
          state.lengthVal = lengthVal;
          state.lengthUnit = lengthUnit;
          state.massVal = massVal;
          state.capVal = capVal;
          state.leftVal = leftVal;
          state.leftUnit = leftUnit;
          state.rightVal = rightVal;
          state.rightUnit = rightUnit;
          renderWorkspace();
        },
      });

      const nextBtn = toMistakeButton('U2');
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
