/**
 * Interactive Angles as Turns workbench screen for Knot G1.
 * Models angular aperture as amount of turn, arm length invariance,
 * angle classification (acute, right, obtuse, straight), and dual clock comparison.
 */

import {
  getAngleInfo,
  isArmLengthInvariant,
  arcCoordinates,
  type AngleInfo,
} from '../../../domain/math/angles';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createAnglesScreen(): ScreenMeta {
  return {
    id: 'angles',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'angles.title',
    render(view, state, params = {}) {
      enterThread('G1', 'angles', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;

      let angleDeg = typeof state.angleDeg === 'number' ? state.angleDeg : 45;
      let armLength = typeof state.armLength === 'number' ? state.armLength : 100;
      const clockAngle = typeof state.clockAngle === 'number' ? state.clockAngle : 90;

      state.step = stepNum;
      state.angleDeg = angleDeg;
      state.armLength = armLength;
      state.clockAngle = clockAngle;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('angles.title'),
      });
      const say = el('p', {
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
        { num: 1, label: '1. Turn the ray' },
        { num: 2, label: '2. Arm length' },
        { num: 3, label: '3. Clock hands' },
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
            renderWorkbenchContent();
          },
        });
        stepTabs.appendChild(tabBtn);
      });

      const contentBox = el('div', {
        class: 'angles-content-box',
        style: {
          maxWidth: '560px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        },
      });

      function renderWorkbenchContent() {
        clear(contentBox);

        // Update active step tab
        Array.from(stepTabs.children).forEach((child, i) => {
          if (i + 1 === stepNum) {
            child.classList.add('btn-active');
            child.setAttribute('aria-current', 'step');
          } else {
            child.classList.remove('btn-active');
            child.setAttribute('aria-current', 'false');
          }
        });

        if (stepNum === 1) {
          renderStep1();
        } else if (stepNum === 2) {
          renderStep2();
        } else {
          renderStep3();
        }
      }

      // STEP 1: Turn the ray to discover angle categories and quarter turn
      function renderStep1() {
        say.textContent = t('angles.s1');

        const angleInfo: AngleInfo = getAngleInfo(angleDeg);

        // SVG Canvas
        const svgBox = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgBox.setAttribute('viewBox', '0 0 280 240');
        svgBox.setAttribute('class', 'angles-canvas');
        svgBox.style.width = '100%';
        svgBox.style.maxWidth = '280px';
        svgBox.style.height = '240px';
        svgBox.style.background = 'var(--bg-card, #f8fafc)';
        svgBox.style.borderRadius = '12px';
        svgBox.style.border = '1px solid var(--border, #cbd5e1)';

        const cx = 140;
        const cy = 150;
        const r = armLength;

        // Base horizontal ray (fixed pointing right)
        const baseLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        baseLine.setAttribute('x1', String(cx));
        baseLine.setAttribute('y1', String(cy));
        baseLine.setAttribute('x2', String(cx + r));
        baseLine.setAttribute('y2', String(cy));
        baseLine.setAttribute('stroke', '#64748b');
        baseLine.setAttribute('stroke-width', '3');
        baseLine.setAttribute('stroke-linecap', 'round');
        svgBox.appendChild(baseLine);

        // Angle arc wedge
        const arcPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const arcD = arcCoordinates(cx, cy, Math.min(36, r * 0.4), angleDeg);
        if (arcD) {
          arcPath.setAttribute('d', `${arcD} L ${cx} ${cy} Z`);
          arcPath.setAttribute('fill', 'rgba(99, 102, 241, 0.2)');
          arcPath.setAttribute('stroke', '#6366f1');
          arcPath.setAttribute('stroke-width', '2');
          svgBox.appendChild(arcPath);
        }

        // Terminal ray (swept angle)
        const rad = (angleDeg * Math.PI) / 180;
        const endX = cx + r * Math.cos(rad);
        const endY = cy - r * Math.sin(rad);

        const terminalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        terminalLine.setAttribute('x1', String(cx));
        terminalLine.setAttribute('y1', String(cy));
        terminalLine.setAttribute('x2', String(endX));
        terminalLine.setAttribute('y2', String(endY));
        terminalLine.setAttribute('stroke', '#4338ca');
        terminalLine.setAttribute('stroke-width', '4');
        terminalLine.setAttribute('stroke-linecap', 'round');
        svgBox.appendChild(terminalLine);

        // Center Vertex dot
        const vertexDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        vertexDot.setAttribute('cx', String(cx));
        vertexDot.setAttribute('cy', String(cy));
        vertexDot.setAttribute('r', '6');
        vertexDot.setAttribute('fill', '#1e1b4b');
        svgBox.appendChild(vertexDot);

        // End knob
        const endDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        endDot.setAttribute('cx', String(endX));
        endDot.setAttribute('cy', String(endY));
        endDot.setAttribute('r', '10');
        endDot.setAttribute('fill', '#4f46e5');
        endDot.setAttribute('id', 'vertex-knob');
        endDot.style.cursor = 'pointer';
        svgBox.appendChild(endDot);

        contentBox.appendChild(svgBox);

        // Angle Readout Card
        const readoutCard = el('div', {
          class: 'angle-readout card',
          style: {
            width: '100%',
            textAlign: 'center',
            padding: '12px',
            background: 'var(--bg-card, #f8fafc)',
            borderRadius: '8px',
          },
        });

        const degreesText = el('div', {
          class: 'angle-degrees',
          style: { fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary, #4338ca)' },
          text: `${angleDeg}°`,
        });

        const typeBadge = el('div', {
          class: 'angle-type-badge',
          style: { fontSize: '1rem', marginTop: '4px' },
          text: angleInfo.typeLabel,
        });

        const turnFractionText = el('div', {
          class: 'angle-turn-fraction',
          style: { fontSize: '0.9rem', color: '#64748b', marginTop: '2px' },
          text: angleInfo.turnFraction.label,
        });

        readoutCard.appendChild(degreesText);
        readoutCard.appendChild(typeBadge);
        readoutCard.appendChild(turnFractionText);
        contentBox.appendChild(readoutCard);

        // Angle Stepper Controls
        const controlRow = el('div', {
          class: 'angle-controls',
          style: {
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap',
          },
        });

        const decBtn = el('button', {
          class: 'btn btn-outline',
          id: 'btn-dec-angle',
          text: '- 15°',
          style: { minHeight: '44px', minWidth: '44px' },
          onclick: () => {
            angleDeg = Math.max(0, angleDeg - 15);
            state.angleDeg = angleDeg;
            renderWorkbenchContent();
          },
        });

        const slider = el('input', {
          type: 'range',
          min: '0',
          max: '360',
          step: '5',
          value: String(angleDeg),
          id: 'angle-slider',
          style: { flex: '1', minWidth: '140px', minHeight: '44px' },
          oninput: (e: Event) => {
            angleDeg = Number((e.target as HTMLInputElement).value);
            state.angleDeg = angleDeg;
            renderWorkbenchContent();
          },
          onchange: (e: Event) => {
            angleDeg = Number((e.target as HTMLInputElement).value);
            state.angleDeg = angleDeg;
            renderWorkbenchContent();
          },
        });

        const incBtn = el('button', {
          class: 'btn btn-outline',
          id: 'btn-inc-angle',
          text: '+ 15°',
          style: { minHeight: '44px', minWidth: '44px' },
          onclick: () => {
            angleDeg = Math.min(360, angleDeg + 15);
            state.angleDeg = angleDeg;
            renderWorkbenchContent();
          },
        });

        controlRow.appendChild(decBtn);
        controlRow.appendChild(slider);
        controlRow.appendChild(incBtn);
        contentBox.appendChild(controlRow);

        // Snap preset buttons
        const presetRow = el('div', {
          class: 'preset-buttons',
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' },
        });

        [
          { label: '45° (Half right)', deg: 45 },
          { label: '90° (Quarter)', deg: 90 },
          { label: '180° (Straight)', deg: 180 },
          { label: '360° (Full)', deg: 360 },
        ].forEach((p) => {
          const btn = el('button', {
            class: `btn ${angleDeg === p.deg ? 'btn-active' : 'btn-outline'}`,
            text: p.label,
            style: { minHeight: '44px', minWidth: '44px' },
            onclick: () => {
              angleDeg = p.deg;
              state.angleDeg = angleDeg;
              renderWorkbenchContent();
            },
          });
          presetRow.appendChild(btn);
        });
        contentBox.appendChild(presetRow);

        if (angleDeg === 90) {
          say.textContent = t('angles.s1done');
          const nextBtn = el('button', {
            class: 'btn btn-primary',
            id: 'btn-step1-next',
            text: 'Next: Test Arm Length →',
            style: { minHeight: '44px', marginTop: '12px' },
            onclick: () => {
              stepNum = 2;
              state.step = 2;
              renderWorkbenchContent();
            },
          });
          contentBox.appendChild(nextBtn);
        }
      }

      // STEP 2: Arm length stretcher demonstrating invariance
      function renderStep2() {
        say.textContent = t('angles.s2');

        const svgBox = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgBox.setAttribute('viewBox', '0 0 280 240');
        svgBox.setAttribute('class', 'angles-canvas-stretcher');
        svgBox.style.width = '100%';
        svgBox.style.maxWidth = '280px';
        svgBox.style.height = '240px';
        svgBox.style.background = 'var(--bg-card, #f8fafc)';
        svgBox.style.borderRadius = '12px';
        svgBox.style.border = '1px solid var(--border, #cbd5e1)';

        const cx = 80;
        const cy = 180;
        const r = armLength;

        // Base ray
        const baseLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        baseLine.setAttribute('x1', String(cx));
        baseLine.setAttribute('y1', String(cy));
        baseLine.setAttribute('x2', String(cx + r));
        baseLine.setAttribute('y2', String(cy));
        baseLine.setAttribute('stroke', '#64748b');
        baseLine.setAttribute('stroke-width', '4');
        baseLine.setAttribute('stroke-linecap', 'round');
        svgBox.appendChild(baseLine);

        // Vertical ray (90°)
        const vertLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        vertLine.setAttribute('x1', String(cx));
        vertLine.setAttribute('y1', String(cy));
        vertLine.setAttribute('x2', String(cx));
        vertLine.setAttribute('y2', String(cy - r));
        vertLine.setAttribute('stroke', '#4338ca');
        vertLine.setAttribute('stroke-width', '4');
        vertLine.setAttribute('stroke-linecap', 'round');
        svgBox.appendChild(vertLine);

        // Fixed angle square corner mark (right angle marker)
        const cornerMark = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        cornerMark.setAttribute(
          'd',
          `M ${cx + 20} ${cy} L ${cx + 20} ${cy - 20} L ${cx} ${cy - 20}`
        );
        cornerMark.setAttribute('fill', 'none');
        cornerMark.setAttribute('stroke', '#6366f1');
        cornerMark.setAttribute('stroke-width', '2');
        svgBox.appendChild(cornerMark);

        // Vertex
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', String(cx));
        dot.setAttribute('cy', String(cy));
        dot.setAttribute('r', '6');
        dot.setAttribute('fill', '#1e1b4b');
        svgBox.appendChild(dot);

        contentBox.appendChild(svgBox);

        // Invariance Info Card
        const card = el('div', {
          class: 'arm-length-card card',
          style: {
            width: '100%',
            textAlign: 'center',
            padding: '12px',
            background: 'var(--bg-card, #f8fafc)',
            borderRadius: '8px',
          },
        });

        const statusText = el('div', {
          class: 'invariance-status',
          style: { fontSize: '1.2rem', fontWeight: 'bold', color: '#16a34a' },
          text: `Arm Length: ${armLength}px  |  Angle: 90° (Constant!)`,
        });

        const proofText = el('p', {
          class: 'invariance-proof',
          style: { fontSize: '0.9rem', color: '#64748b', marginTop: '6px' },
          text: isArmLengthInvariant(90, armLength, 90, 60)
            ? 'Stretching or shortening the arms does NOT change the turn.'
            : '',
        });

        card.appendChild(statusText);
        card.appendChild(proofText);
        contentBox.appendChild(card);

        // Arm Stretcher Slider
        const sliderRow = el('div', {
          class: 'stretcher-controls',
          style: { display: 'flex', gap: '8px', width: '100%', alignItems: 'center' },
        });

        const shortLabel = el('span', { text: 'Short (60px)' });
        const armSlider = el('input', {
          type: 'range',
          min: '60',
          max: '160',
          step: '10',
          value: String(armLength),
          id: 'arm-slider',
          style: { flex: '1', minHeight: '44px' },
          oninput: (e: Event) => {
            armLength = Number((e.target as HTMLInputElement).value);
            state.armLength = armLength;
            renderWorkbenchContent();
          },
          onchange: (e: Event) => {
            armLength = Number((e.target as HTMLInputElement).value);
            state.armLength = armLength;
            renderWorkbenchContent();
          },
        });
        const longLabel = el('span', { text: 'Long (160px)' });

        sliderRow.appendChild(shortLabel);
        sliderRow.appendChild(armSlider);
        sliderRow.appendChild(longLabel);
        contentBox.appendChild(sliderRow);

        if (armLength >= 140) {
          say.textContent = t('angles.s2done');
        }

        const nextBtn = el('button', {
          class: 'btn btn-primary',
          id: 'btn-step2-next',
          text: 'Next: Compare Clock Hands →',
          style: { minHeight: '44px', marginTop: '12px' },
          onclick: () => {
            stepNum = 3;
            state.step = 3;
            renderWorkbenchContent();
          },
        });
        contentBox.appendChild(nextBtn);
      }

      // STEP 3: Clock comparison (Giant tower clock vs wristwatch)
      function renderStep3() {
        say.textContent = t('angles.s3');

        const clockContainer = el('div', {
          class: 'clock-comparison-container',
          style: {
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '100%',
            flexWrap: 'wrap',
          },
        });

        // Giant Tower Clock
        const towerClockCard = el('div', {
          class: 'clock-card tower-clock card',
          style: { textAlign: 'center', padding: '12px' },
        });
        const towerSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        towerSvg.setAttribute('viewBox', '0 0 160 160');
        towerSvg.style.width = '140px';
        towerSvg.style.height = '140px';

        const tCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        tCircle.setAttribute('cx', '80');
        tCircle.setAttribute('cy', '80');
        tCircle.setAttribute('r', '70');
        tCircle.setAttribute('fill', '#ffffff');
        tCircle.setAttribute('stroke', '#334155');
        tCircle.setAttribute('stroke-width', '4');
        towerSvg.appendChild(tCircle);

        // 12 and 3 hands (90° quarter turn)
        const tHand12 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tHand12.setAttribute('x1', '80');
        tHand12.setAttribute('y1', '80');
        tHand12.setAttribute('x2', '80');
        tHand12.setAttribute('y2', '20'); // long hand (60px)
        tHand12.setAttribute('stroke', '#4338ca');
        tHand12.setAttribute('stroke-width', '4');
        towerSvg.appendChild(tHand12);

        const tHand3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tHand3.setAttribute('x1', '80');
        tHand3.setAttribute('y1', '80');
        tHand3.setAttribute('x2', '140'); // long hand (60px)
        tHand3.setAttribute('y2', '80');
        tHand3.setAttribute('stroke', '#4338ca');
        tHand3.setAttribute('stroke-width', '4');
        towerSvg.appendChild(tHand3);

        const tDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        tDot.setAttribute('cx', '80');
        tDot.setAttribute('cy', '80');
        tDot.setAttribute('r', '5');
        tDot.setAttribute('fill', '#1e1b4b');
        towerSvg.appendChild(tDot);

        towerClockCard.appendChild(towerSvg);
        towerClockCard.appendChild(
          el('div', { text: 'Giant Tower Clock', style: { fontWeight: 'bold' } })
        );
        towerClockCard.appendChild(
          el('div', { text: 'Hands: 60 cm | Angle: 90°', style: { color: '#64748b' } })
        );
        clockContainer.appendChild(towerClockCard);

        // Tiny Wristwatch
        const watchCard = el('div', {
          class: 'clock-card wrist-watch card',
          style: { textAlign: 'center', padding: '12px' },
        });
        const watchSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        watchSvg.setAttribute('viewBox', '0 0 100 100');
        watchSvg.style.width = '90px';
        watchSvg.style.height = '90px';

        const wCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        wCircle.setAttribute('cx', '50');
        wCircle.setAttribute('cy', '50');
        wCircle.setAttribute('r', '40');
        wCircle.setAttribute('fill', '#ffffff');
        wCircle.setAttribute('stroke', '#334155');
        wCircle.setAttribute('stroke-width', '3');
        watchSvg.appendChild(wCircle);

        // Hands (25px)
        const wHand12 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        wHand12.setAttribute('x1', '50');
        wHand12.setAttribute('y1', '50');
        wHand12.setAttribute('x2', '50');
        wHand12.setAttribute('y2', '25');
        wHand12.setAttribute('stroke', '#4338ca');
        wHand12.setAttribute('stroke-width', '3');
        watchSvg.appendChild(wHand12);

        const wHand3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        wHand3.setAttribute('x1', '50');
        wHand3.setAttribute('y1', '50');
        wHand3.setAttribute('x2', '75');
        wHand3.setAttribute('y2', '50');
        wHand3.setAttribute('stroke', '#4338ca');
        wHand3.setAttribute('stroke-width', '3');
        watchSvg.appendChild(wHand3);

        const wDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        wDot.setAttribute('cx', '50');
        wDot.setAttribute('cy', '50');
        wDot.setAttribute('r', '4');
        wDot.setAttribute('fill', '#1e1b4b');
        watchSvg.appendChild(wDot);

        watchCard.appendChild(watchSvg);
        watchCard.appendChild(
          el('div', { text: 'Tiny Wristwatch', style: { fontWeight: 'bold' } })
        );
        watchCard.appendChild(
          el('div', { text: 'Hands: 1 cm | Angle: 90°', style: { color: '#64748b' } })
        );
        clockContainer.appendChild(watchCard);

        contentBox.appendChild(clockContainer);

        const compareConclusion = el('div', {
          class: 'clock-conclusion-box card',
          style: {
            padding: '12px',
            textAlign: 'center',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid #6366f1',
            borderRadius: '8px',
            width: '100%',
          },
          text: t('angles.s3done'),
        });
        contentBox.appendChild(compareConclusion);

        const mistakeBtn = el('button', {
          class: 'btn btn-primary',
          id: 'btn-to-mistake',
          text: 'Spot the mistake →',
          style: { minHeight: '44px', marginTop: '12px' },
          onclick: () => {
            router.go('mistake', { k: 'G1' });
          },
        });
        contentBox.appendChild(mistakeBtn);
      }

      view.appendChild(titleEl);
      view.appendChild(say);
      view.appendChild(stepTabs);
      view.appendChild(contentBox);

      renderWorkbenchContent();
    },
  };
}
