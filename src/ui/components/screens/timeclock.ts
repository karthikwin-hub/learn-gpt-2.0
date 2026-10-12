/**
 * Interactive Manipulative Workbench for Knot U3: Time: 24-Hour Clock & Duration (Railway Time).
 *
 * Explores:
 * - Concentric dual-dial clock (outer 24-hr railway ring, inner 12-hr standard ring).
 * - Base-60 minute roll: minutes roll at 60 into a full hour, never base-10 digits like :75.
 * - Hour-bridging timeline: calculating duration between departure and arrival by hopping
 *   to the next whole hour, leaping across hours, and adding remaining minutes.
 */

import {
  to12Hour,
  addMinutes,
  calculateDuration,
  formatTime24,
} from '../../../domain/math/timeclock';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createTimeclockScreen(): ScreenMeta {
  return {
    id: 'timeclock',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'timeclock.title',
    render(view, state, params = {}) {
      enterThread('U3', 'timeclock', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;

      let hour24 = typeof state.hour24 === 'number' ? state.hour24 : 21;
      let minute24 = typeof state.minute24 === 'number' ? state.minute24 : 30;

      let rollStartH = typeof state.rollStartH === 'number' ? state.rollStartH : 14;
      let rollStartM = typeof state.rollStartM === 'number' ? state.rollStartM : 50;
      let rollAddM = typeof state.rollAddM === 'number' ? state.rollAddM : 25;

      let bridgeStartH = typeof state.bridgeStartH === 'number' ? state.bridgeStartH : 9;
      let bridgeStartM = typeof state.bridgeStartM === 'number' ? state.bridgeStartM : 45;
      let bridgeEndH = typeof state.bridgeEndH === 'number' ? state.bridgeEndH : 12;
      let bridgeEndM = typeof state.bridgeEndM === 'number' ? state.bridgeEndM : 15;

      state.step = stepNum;
      state.hour24 = hour24;
      state.minute24 = minute24;
      state.rollStartH = rollStartH;
      state.rollStartM = rollStartM;
      state.rollAddM = rollAddM;
      state.bridgeStartH = bridgeStartH;
      state.bridgeStartM = bridgeStartM;
      state.bridgeEndH = bridgeEndH;
      state.bridgeEndM = bridgeEndM;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('timeclock.title'),
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
        { num: 1, label: '1. Dual Clock Dial' },
        { num: 2, label: '2. Base-60 Minute Roll' },
        { num: 3, label: '3. Hour Bridging Timeline' },
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
        class: 'timeclock-workspace',
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
            : '1px solid var(--sand, #d1d5db)';
          (b as HTMLElement).style.background = isActive ? 'var(--parchment, #fff)' : 'transparent';
        });

        clear(workspaceContainer);

        if (stepNum === 1) {
          renderDualDial();
        } else if (stepNum === 2) {
          renderMinuteRoll();
        } else {
          renderHourBridging();
        }
      }

      function renderClockSvg(h24: number, m: number, size = 220): HTMLElement {
        const radius = size / 2;
        const cx = radius;
        const cy = radius;

        // Angles
        const minuteAngle = m * 6; // 360 / 60
        const hourAngle = (h24 % 12) * 30 + m * 0.5; // 360 / 12

        // Inner 12-hour ring & outer 24-hour ring
        let numbersSvg = '';
        for (let i = 1; i <= 12; i++) {
          const angleRad = ((i * 30 - 90) * Math.PI) / 180;
          // Inner 12-hr number
          const ix = cx + (radius - 48) * Math.cos(angleRad);
          const iy = cy + (radius - 48) * Math.sin(angleRad);
          numbersSvg += `<text x="${ix}" y="${iy + 4}" font-size="11" font-weight="600" text-anchor="middle" fill="#1e293b">${i}</text>`;

          // Outer 24-hr number
          const h24Num = i === 12 ? (h24 >= 12 ? 24 : 12) : i + 12;
          const ox = cx + (radius - 20) * Math.cos(angleRad);
          const oy = cy + (radius - 20) * Math.sin(angleRad);
          numbersSvg += `<text x="${ox}" y="${oy + 3}" font-size="9" font-weight="500" text-anchor="middle" fill="#64748b">${h24Num === 24 ? '00' : h24Num}</text>`;
        }

        const svgHtml = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-label="Dual Dial Clock">
          <!-- Outer dial circle -->
          <circle cx="${cx}" cy="${cy}" r="${radius - 6}" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
          <!-- Inner dial separator -->
          <circle cx="${cx}" cy="${cy}" r="${radius - 34}" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="3,3"/>
          
          <!-- Number markings -->
          ${numbersSvg}

          <!-- Hour hand -->
          <line x1="${cx}" y1="${cy}" x2="${cx + (radius - 58) * Math.cos(((hourAngle - 90) * Math.PI) / 180)}" y2="${cy + (radius - 58) * Math.sin(((hourAngle - 90) * Math.PI) / 180)}" stroke="#0f172a" stroke-width="4.5" stroke-linecap="round"/>
          
          <!-- Minute hand -->
          <line x1="${cx}" y1="${cy}" x2="${cx + (radius - 30) * Math.cos(((minuteAngle - 90) * Math.PI) / 180)}" y2="${cy + (radius - 30) * Math.sin(((minuteAngle - 90) * Math.PI) / 180)}" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>
          
          <!-- Centre pin -->
          <circle cx="${cx}" cy="${cy}" r="5" fill="#0f172a"/>
        </svg>`;

        const wrapper = el('div', {
          class: 'clock-dial-wrapper',
          style: { display: 'flex', justifyContent: 'center' },
        });
        wrapper.innerHTML = svgHtml;
        return wrapper;
      }

      function renderDualDial() {
        const t12 = to12Hour(hour24, minute24);
        const t24Str = formatTime24(hour24, minute24);

        feedbackEl.textContent = `24-Hour Railway Time: ${t24Str} is equivalent to Standard Clock: ${t12.formatted}.`;

        const clockCard = el('div', {
          class: 'clock-card',
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

        // Clock SVG
        clockCard.appendChild(renderClockSvg(hour24, minute24));

        // Readout pills
        const readoutRow = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            flexWrap: 'wrap',
          },
        });

        const pill24 = el('div', {
          class: 'stat-pill railway-time-pill',
          style: {
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#0f172a',
            color: '#fff',
            textAlign: 'center',
          },
        });
        pill24.appendChild(
          el('div', { text: 'Railway Time (24h)', style: { fontSize: '0.8rem' } })
        );
        pill24.appendChild(
          el('div', { text: t24Str, style: { fontWeight: 'bold', fontSize: '1.3rem' } })
        );

        const pill12 = el('div', {
          class: 'stat-pill standard-time-pill',
          style: {
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#2563eb',
            color: '#fff',
            textAlign: 'center',
          },
        });
        pill12.appendChild(el('div', { text: '12-Hour Clock', style: { fontSize: '0.8rem' } }));
        pill12.appendChild(
          el('div', { text: t12.formatted, style: { fontWeight: 'bold', fontSize: '1.3rem' } })
        );

        readoutRow.appendChild(pill24);
        readoutRow.appendChild(pill12);
        clockCard.appendChild(readoutRow);
        workspaceContainer.appendChild(clockCard);

        // Interactive Steppers
        const controlCard = el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--sand, #e5e7eb)',
            background: 'var(--card-bg, #fafafa)',
          },
        });

        // Hour control
        const hourRow = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '6px',
          },
        });
        hourRow.appendChild(
          el('span', { text: `Hour (0-23): ${hour24}`, style: { fontWeight: '600' } })
        );
        const hBtnGroup = el('div', { style: { display: 'flex', gap: '6px' } });
        [-6, -1, 1, 6].forEach((dh) => {
          const b = el('button', {
            class: 'btn',
            text: dh > 0 ? `+${dh}h` : `${dh}h`,
            style: { minHeight: '44px', minWidth: '44px', padding: '6px 10px' },
            onClick() {
              hour24 = (hour24 + dh + 24) % 24;
              state.hour24 = hour24;
              renderWorkspace();
            },
          });
          hBtnGroup.appendChild(b);
        });
        hourRow.appendChild(hBtnGroup);
        controlCard.appendChild(hourRow);

        // Minute control
        const minRow = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '6px',
          },
        });
        minRow.appendChild(
          el('span', { text: `Minute (0-59): ${minute24}`, style: { fontWeight: '600' } })
        );
        const mBtnGroup = el('div', { style: { display: 'flex', gap: '6px' } });
        [-15, -5, 5, 15].forEach((dm) => {
          const b = el('button', {
            class: 'btn',
            text: dm > 0 ? `+${dm}m` : `${dm}m`,
            style: { minHeight: '44px', minWidth: '44px', padding: '6px 10px' },
            onClick() {
              minute24 = (minute24 + dm + 60) % 60;
              state.minute24 = minute24;
              renderWorkspace();
            },
          });
          mBtnGroup.appendChild(b);
        });
        minRow.appendChild(mBtnGroup);
        controlCard.appendChild(minRow);

        // Quick Preset Shortcuts
        const presetRow = el('div', {
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' },
        });
        [
          { label: 'Train Ticket (21:30)', h: 21, m: 30 },
          { label: 'Morning School (08:30)', h: 8, m: 30 },
          { label: 'Noon (12:00)', h: 12, m: 0 },
          { label: 'Midnight (00:00)', h: 0, m: 0 },
        ].forEach((pr) => {
          const pBtn = el('button', {
            class: 'btn',
            text: pr.label,
            style: { minHeight: '44px', padding: '6px 10px' },
            onClick() {
              hour24 = pr.h;
              minute24 = pr.m;
              state.hour24 = hour24;
              state.minute24 = minute24;
              renderWorkspace();
            },
          });
          presetRow.appendChild(pBtn);
        });
        controlCard.appendChild(presetRow);
        workspaceContainer.appendChild(controlCard);
      }

      function renderMinuteRoll() {
        const added = addMinutes(rollStartH, rollStartM, rollAddM);
        const rawMins = rollStartM + rollAddM;

        feedbackEl.textContent = `Adding ${rollAddM} minutes to ${formatTime24(rollStartH, rollStartM)}: Time rolls in base 60!`;

        const rollCard = el('div', {
          class: 'minute-roll-card',
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

        // Calculation breakdown
        const step1 = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 14px',
            background: 'var(--sand, #f8fafc)',
            borderRadius: '8px',
          },
        });
        step1.appendChild(
          el('span', { text: '1. Direct minute addition:', style: { fontWeight: '600' } })
        );
        step1.appendChild(
          el('span', {
            text: `${rollStartM} min + ${rollAddM} min = ${rawMins} min`,
            class: 'stat-pill',
            style: { fontWeight: 'bold' },
          })
        );
        rollCard.appendChild(step1);

        // Step 2: Base-60 roll demonstration
        const step2 = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 14px',
            background: 'rgba(59, 130, 246, 0.08)',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          },
        });
        step2.appendChild(
          el('span', {
            text: '2. Roll at 60 (Base 60):',
            style: { fontWeight: '600', color: '#1d4ed8' },
          })
        );
        const rollH = Math.floor(rawMins / 60);
        const remM = rawMins % 60;
        step2.appendChild(
          el('span', {
            text: `${rawMins} min = +${rollH} hr and ${remM} min remaining`,
            class: 'stat-pill',
            style: { fontWeight: 'bold', color: '#1d4ed8' },
          })
        );
        rollCard.appendChild(step2);

        // Step 3: Result
        const step3 = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 14px',
            background: '#10b981',
            color: '#fff',
            borderRadius: '8px',
          },
        });
        step3.appendChild(
          el('span', { text: '3. Correct Clock Time:', style: { fontWeight: 'bold' } })
        );
        step3.appendChild(
          el('span', {
            text: added.formatted,
            class: 'stat-pill',
            style: {
              fontWeight: 'bold',
              fontSize: '1.25rem',
              background: '#047857',
              color: '#fff',
            },
          })
        );
        rollCard.appendChild(step3);

        // Rohan trap warning
        const trapWarning = el('div', {
          style: {
            padding: '12px 14px',
            background: 'rgba(239, 68, 68, 0.08)',
            borderLeft: '4px solid #ef4444',
            borderRadius: '6px',
          },
        });
        trapWarning.appendChild(
          el('p', {
            style: { margin: '0', fontSize: '0.95rem' },
            text: `Rohan's Mistake Trap: Adding digits base-10 gives 14:75. But minutes stop at 59! There is NO such time as 14:75. The true time is ${added.formatted}.`,
          })
        );
        rollCard.appendChild(trapWarning);

        // Add Minute Buttons
        const btnRow = el('div', {
          style: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '8px',
          },
        });
        [
          { label: 'Rohan Trap (+25 min)', m: 25 },
          { label: '+10 min', m: 10 },
          { label: '+30 min', m: 30 },
          { label: '+45 min', m: 45 },
          { label: '+60 min', m: 60 },
        ].forEach((bCfg) => {
          const btn = el('button', {
            class: 'btn',
            text: bCfg.label,
            style: { minHeight: '44px', padding: '6px 12px' },
            onClick() {
              rollAddM = bCfg.m;
              state.rollAddM = rollAddM;
              renderWorkspace();
            },
          });
          btnRow.appendChild(btn);
        });
        rollCard.appendChild(btnRow);

        workspaceContainer.appendChild(rollCard);
      }

      function renderHourBridging() {
        const dur = calculateDuration(bridgeStartH, bridgeStartM, bridgeEndH, bridgeEndM);

        feedbackEl.textContent = `Elapsed duration from ${formatTime24(bridgeStartH, bridgeStartM)} to ${formatTime24(bridgeEndH, bridgeEndM)} is ${dur.formatted}.`;

        const bridgeCard = el('div', {
          class: 'hour-bridging-card',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid var(--sand, #e5e7eb)',
            background: 'var(--card-bg, #fff)',
          },
        });

        // Summary Bar
        const summaryBar = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: 'var(--sand, #f8fafc)',
            borderRadius: '8px',
            border: '1px solid var(--sand, #e2e8f0)',
          },
        });
        summaryBar.appendChild(
          el('span', {
            text: `${formatTime24(bridgeStartH, bridgeStartM)} ➔ ${formatTime24(bridgeEndH, bridgeEndM)}`,
            style: { fontWeight: '600', fontSize: '1.1rem' },
          })
        );
        summaryBar.appendChild(
          el('span', {
            class: 'stat-pill total-duration-pill',
            text: dur.formatted,
            style: {
              fontWeight: 'bold',
              fontSize: '1.2rem',
              background: '#2563eb',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '6px',
            },
          })
        );
        bridgeCard.appendChild(summaryBar);

        // Timeline Hops
        const hopsList = el('div', {
          class: 'timeline-hops',
          style: { display: 'flex', flexDirection: 'column', gap: '8px' },
        });

        dur.hops.forEach((hop, idx) => {
          const hopItem = el('div', {
            class: 'timeline-hop-item',
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              background: idx % 2 === 0 ? '#f1f5f9' : '#e2e8f0',
              borderRadius: '6px',
            },
          });
          const leftText = el('div', { style: { display: 'flex', flexDirection: 'column' } });
          leftText.appendChild(
            el('span', {
              text: `Hop ${idx + 1}: ${hop.from} ➔ ${hop.to}`,
              style: { fontWeight: '600' },
            })
          );
          leftText.appendChild(
            el('small', { text: hop.description, style: { color: 'var(--muted, #64748b)' } })
          );

          const rightTime = el('span', {
            class: 'stat-pill',
            text: `+${hop.minutes} min`,
            style: { fontWeight: 'bold' },
          });

          hopItem.appendChild(leftText);
          hopItem.appendChild(rightTime);
          hopsList.appendChild(hopItem);
        });

        bridgeCard.appendChild(hopsList);

        // Presets
        const presetsTitle = el('span', {
          text: 'Journey Timetable Presets:',
          style: { fontWeight: '600', fontSize: '0.9rem', color: 'var(--muted, #64748b)' },
        });
        bridgeCard.appendChild(presetsTitle);

        const presetRow = el('div', {
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
        });
        [
          { label: '09:45 to 12:15 (Morning Intercity)', sh: 9, sm: 45, eh: 12, em: 15 },
          { label: '14:50 to 18:20 (Express)', sh: 14, sm: 50, eh: 18, em: 20 },
          { label: '21:30 to 06:15 (Overnight Sleeper)', sh: 21, sm: 30, eh: 6, em: 15 },
        ].forEach((p) => {
          const pBtn = el('button', {
            class: 'btn timetable-preset-btn',
            text: p.label,
            style: { minHeight: '44px', padding: '6px 12px' },
            onClick() {
              bridgeStartH = p.sh;
              bridgeStartM = p.sm;
              bridgeEndH = p.eh;
              bridgeEndM = p.em;
              state.bridgeStartH = bridgeStartH;
              state.bridgeStartM = bridgeStartM;
              state.bridgeEndH = bridgeEndH;
              state.bridgeEndM = bridgeEndM;
              renderWorkspace();
            },
          });
          presetRow.appendChild(pBtn);
        });
        bridgeCard.appendChild(presetRow);

        workspaceContainer.appendChild(bridgeCard);
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
        text: t('timeclock.reset'),
        style: { minHeight: '44px', padding: '10px 16px', borderRadius: '6px' },
        onClick() {
          hour24 = 21;
          minute24 = 30;
          rollStartH = 14;
          rollStartM = 50;
          rollAddM = 25;
          bridgeStartH = 9;
          bridgeStartM = 45;
          bridgeEndH = 12;
          bridgeEndM = 15;
          state.hour24 = hour24;
          state.minute24 = minute24;
          state.rollStartH = rollStartH;
          state.rollStartM = rollStartM;
          state.rollAddM = rollAddM;
          state.bridgeStartH = bridgeStartH;
          state.bridgeStartM = bridgeStartM;
          state.bridgeEndH = bridgeEndH;
          state.bridgeEndM = bridgeEndM;
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
          router.go('mistake', { k: 'U3' });
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
