/**
 * Interactive Manipulative Workbench for Knot G6: Circles (Centre, Radius, Diameter).
 *
 * Explores:
 * - Circle definition: all boundary points are equidistant (radius r) from centre O.
 * - Diameter: maximum chord passing directly through centre O, d = 2 * r.
 * - Chords: straight lines connecting two boundary points; if they miss the centre,
 *   they are strictly shorter than the diameter: chord = 2 * sqrt(r^2 - offset^2) < 2r.
 */

import { compareChordToDiameter } from '../../../domain/math/circle';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

export function createCircleScreen(): ScreenMeta {
  return {
    id: 'circle',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'circle.title',
    render(view, state, params = {}) {
      enterThread('G6', 'circle', params);

      let stepNum = readStep(params.step, state.step, 3);

      let radiusVal = typeof state.radius === 'number' ? state.radius : 5;
      let offsetVal = typeof state.offset === 'number' ? state.offset : 0;

      state.step = stepNum;
      state.radius = radiusVal;
      state.offset = offsetVal;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('circle.title'),
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
        { num: 1, label: t('circle.tab1') },
        { num: 2, label: t('circle.tab2') },
        { num: 3, label: t('circle.tab3') },
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
            if (stepNum === 1) {
              offsetVal = 0;
              state.offset = 0;
            } else if (stepNum === 2 && offsetVal === 0) {
              offsetVal = 3;
              state.offset = 3;
            }
            renderContent();
          },
        });
        stepTabs.appendChild(tabBtn);
      });

      const contentBox = el('div', {
        class: 'circle-content-box',
        style: {
          maxWidth: '560px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        },
      });

      function updateFeedback() {
        const d = radiusVal * 2;
        const comp = compareChordToDiameter(radiusVal, offsetVal);
        if (stepNum === 1) {
          feedbackEl.textContent = t('circle.s1done', { r: radiusVal, d });
        } else if (stepNum === 2) {
          if (comp.isDiameter) {
            feedbackEl.textContent = t('circle.s3done');
          } else {
            feedbackEl.textContent = t('circle.s2done', {
              d,
              c: comp.chordLength.toFixed(1),
            });
          }
        } else {
          feedbackEl.textContent = t('circle.s3done');
        }
      }

      function renderContent() {
        clear(contentBox);
        updateFeedback();

        // Ensure offset <= radius
        if (offsetVal > radiusVal) {
          offsetVal = radiusVal;
          state.offset = offsetVal;
        }

        const comp = compareChordToDiameter(radiusVal, offsetVal);

        // Stats Badges
        const statsRow = el('div', {
          class: 'circle-stats',
          style: {
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          },
        });

        const radiusBadge = el('div', {
          class: 'stat-pill radius-pill',
          id: 'radius-display',
          text: t('circle.radiusReadout', { r: radiusVal }),
          style: {
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            color: 'var(--c-teal, #0284c7)',
            fontWeight: '600',
            fontSize: '0.9rem',
          },
        });

        const diameterBadge = el('div', {
          class: 'stat-pill diameter-pill',
          id: 'diameter-display',
          text: t('circle.diameterReadout', { d: comp.diameter, r: radiusVal }),
          style: {
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            color: 'var(--c-purple, #9333ea)',
            fontWeight: '600',
            fontSize: '0.9rem',
          },
        });

        const chordBadge = el('div', {
          class: 'stat-pill chord-pill',
          id: 'chord-display',
          text: t('circle.chordReadout', { c: comp.chordLength.toFixed(1) }),
          style: {
            padding: '6px 14px',
            borderRadius: '999px',
            background: comp.isDiameter ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            border: comp.isDiameter
              ? '1px solid rgba(34, 197, 94, 0.4)'
              : '1px solid rgba(245, 158, 11, 0.4)',
            color: comp.isDiameter ? 'var(--c-green, #16a34a)' : '#d97706',
            fontWeight: '600',
            fontSize: '0.9rem',
          },
        });

        statsRow.appendChild(radiusBadge);
        statsRow.appendChild(diameterBadge);
        statsRow.appendChild(chordBadge);
        contentBox.appendChild(statsRow);

        // Status Card
        const statusCard = el('div', {
          class: 'card circle-status-card',
          id: 'chord-status',
          style: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: comp.isDiameter
              ? 'rgba(34, 197, 94, 0.08)'
              : 'rgba(239, 68, 68, 0.08)',
            border: comp.isDiameter
              ? '1px solid rgba(34, 197, 94, 0.3)'
              : '1px solid rgba(239, 68, 68, 0.3)',
          },
        });

        statusCard.textContent = comp.isDiameter
          ? t('circle.statusDiameter', { r: radiusVal, d: comp.diameter })
          : t('circle.statusChord', {
              offset: offsetVal,
              c: comp.chordLength.toFixed(1),
              diff: comp.differenceFromDiameter.toFixed(1),
            });
        contentBox.appendChild(statusCard);

        // SVG Canvas
        const svgBox = el('div', {
          class: 'svg-canvas-container',
          style: {
            position: 'relative',
            width: '100%',
            maxWidth: '340px',
            aspectRatio: '1',
            borderRadius: '16px',
            background: 'var(--card-bg, rgba(255, 255, 255, 0.03))',
            border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        });

        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 320 320');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', t('circle.canvasLabel'));

        const cx = 160;
        const cy = 160;
        const pxPerCm = 18;
        const rPx = radiusVal * pxPerCm;
        const offsetPx = offsetVal * pxPerCm;

        // Background guide grid lines
        const gridG = document.createElementNS(svgNS, 'g');
        gridG.setAttribute('opacity', '0.15');
        for (let g = 20; g < 320; g += 36) {
          const l1 = document.createElementNS(svgNS, 'line');
          l1.setAttribute('x1', String(g));
          l1.setAttribute('y1', '0');
          l1.setAttribute('x2', String(g));
          l1.setAttribute('y2', '320');
          l1.setAttribute('stroke', 'currentColor');
          gridG.appendChild(l1);

          const l2 = document.createElementNS(svgNS, 'line');
          l2.setAttribute('x1', '0');
          l2.setAttribute('y1', String(g));
          l2.setAttribute('x2', '320');
          l2.setAttribute('y2', String(g));
          l2.setAttribute('stroke', 'currentColor');
          gridG.appendChild(l2);
        }
        svg.appendChild(gridG);

        // Circle disc fill & boundary
        const circleEl = document.createElementNS(svgNS, 'circle');
        circleEl.setAttribute('cx', String(cx));
        circleEl.setAttribute('cy', String(cy));
        circleEl.setAttribute('r', String(rPx));
        circleEl.setAttribute('fill', 'rgba(56, 189, 248, 0.06)');
        circleEl.setAttribute('stroke', 'var(--c-teal, #0284c7)');
        circleEl.setAttribute('stroke-width', '3');
        circleEl.setAttribute('class', 'boundary-circle');
        svg.appendChild(circleEl);

        // Radius spoke line (from centre (cx, cy) to (cx + rPx, cy))
        const radiusLine = document.createElementNS(svgNS, 'line');
        radiusLine.setAttribute('x1', String(cx));
        radiusLine.setAttribute('y1', String(cy));
        radiusLine.setAttribute('x2', String(cx + rPx));
        radiusLine.setAttribute('y2', String(cy));
        radiusLine.setAttribute('stroke', 'var(--c-teal, #0284c7)');
        radiusLine.setAttribute('stroke-width', '2.5');
        radiusLine.setAttribute('stroke-dasharray', '4,3');
        svg.appendChild(radiusLine);

        // Radius text label
        const radiusText = document.createElementNS(svgNS, 'text');
        radiusText.setAttribute('x', String(cx + rPx / 2));
        radiusText.setAttribute('y', String(cy + 16));
        radiusText.setAttribute('text-anchor', 'middle');
        radiusText.setAttribute('fill', 'var(--c-teal, #0284c7)');
        radiusText.setAttribute('font-size', '12px');
        radiusText.setAttribute('font-weight', 'bold');
        radiusText.textContent = `r = ${radiusVal} cm`;
        svg.appendChild(radiusText);

        // Offset perpendicular line from centre if offsetVal > 0
        if (offsetVal > 0) {
          const perpLine = document.createElementNS(svgNS, 'line');
          perpLine.setAttribute('x1', String(cx));
          perpLine.setAttribute('y1', String(cy));
          perpLine.setAttribute('x2', String(cx));
          perpLine.setAttribute('y2', String(cy - offsetPx));
          perpLine.setAttribute('stroke', 'var(--kumkum, #ef4444)');
          perpLine.setAttribute('stroke-width', '2');
          perpLine.setAttribute('stroke-dasharray', '3,3');
          svg.appendChild(perpLine);

          const perpText = document.createElementNS(svgNS, 'text');
          perpText.setAttribute('x', String(cx - 8));
          perpText.setAttribute('y', String(cy - offsetPx / 2 + 4));
          perpText.setAttribute('text-anchor', 'end');
          perpText.setAttribute('fill', 'var(--kumkum, #ef4444)');
          perpText.setAttribute('font-size', '10px');
          perpText.setAttribute('font-weight', 'bold');
          perpText.textContent = `${offsetVal} cm`;
          svg.appendChild(perpText);
        }

        // Chord Line
        const chordHalfLen = (comp.chordLength / 2) * pxPerCm;
        const chordY = cy - offsetPx;
        const chordLine = document.createElementNS(svgNS, 'line');
        chordLine.setAttribute('x1', String(cx - chordHalfLen));
        chordLine.setAttribute('y1', String(chordY));
        chordLine.setAttribute('x2', String(cx + chordHalfLen));
        chordLine.setAttribute('y2', String(chordY));
        chordLine.setAttribute('stroke', comp.isDiameter ? 'var(--c-green, #16a34a)' : '#d97706');
        chordLine.setAttribute('stroke-width', '4');
        chordLine.setAttribute('stroke-linecap', 'round');
        chordLine.setAttribute('id', 'chord-line');
        svg.appendChild(chordLine);

        // Chord line endpoints (dots)
        const dotA = document.createElementNS(svgNS, 'circle');
        dotA.setAttribute('cx', String(cx - chordHalfLen));
        dotA.setAttribute('cy', String(chordY));
        dotA.setAttribute('r', '4');
        dotA.setAttribute('fill', comp.isDiameter ? 'var(--c-green, #16a34a)' : '#d97706');
        svg.appendChild(dotA);

        const dotB = document.createElementNS(svgNS, 'circle');
        dotB.setAttribute('cx', String(cx + chordHalfLen));
        dotB.setAttribute('cy', String(chordY));
        dotB.setAttribute('r', '4');
        dotB.setAttribute('fill', comp.isDiameter ? 'var(--c-green, #16a34a)' : '#d97706');
        svg.appendChild(dotB);

        // Chord text label above line
        const chordText = document.createElementNS(svgNS, 'text');
        chordText.setAttribute('x', String(cx));
        chordText.setAttribute('y', String(chordY - 8));
        chordText.setAttribute('text-anchor', 'middle');
        chordText.setAttribute('fill', comp.isDiameter ? 'var(--c-green, #16a34a)' : '#d97706');
        chordText.setAttribute('font-size', '12px');
        chordText.setAttribute('font-weight', 'bold');
        chordText.textContent = comp.isDiameter
          ? t('circle.chordSvgDiameter', { d: comp.diameter })
          : t('circle.chordSvgChord', { c: comp.chordLength.toFixed(1) });
        svg.appendChild(chordText);

        // Centre dot & label
        const centreDot = document.createElementNS(svgNS, 'circle');
        centreDot.setAttribute('cx', String(cx));
        centreDot.setAttribute('cy', String(cy));
        centreDot.setAttribute('r', '6');
        centreDot.setAttribute('fill', 'var(--c-gold, #f59e0b)');
        centreDot.setAttribute('stroke', '#ffffff');
        centreDot.setAttribute('stroke-width', '2');
        centreDot.setAttribute('id', 'centre-pin');
        svg.appendChild(centreDot);

        const centreText = document.createElementNS(svgNS, 'text');
        centreText.setAttribute('x', String(cx));
        centreText.setAttribute('y', String(cy - 10));
        centreText.setAttribute('text-anchor', 'middle');
        centreText.setAttribute('fill', 'var(--c-gold, #f59e0b)');
        centreText.setAttribute('font-size', '11px');
        centreText.setAttribute('font-weight', 'bold');
        centreText.textContent = t('circle.centreLabel');
        svg.appendChild(centreText);

        svgBox.appendChild(svg);
        contentBox.appendChild(svgBox);

        // Control Panel
        const controlPanel = el('div', {
          class: 'circle-controls-panel',
          style: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          },
        });

        // Radius Slider Group
        const radiusGroup = el('div', {
          class: 'control-group',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          },
        });

        const radiusLabelRow = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        });

        const radiusTitle = el('label', {
          text: t('circle.radiusSlider'),
          for: 'radius-slider',
          style: { fontWeight: '600', fontSize: '0.9rem' },
        });

        const radiusValue = el('span', {
          text: `${radiusVal} cm`,
          style: { fontWeight: 'bold', color: 'var(--c-teal, #0284c7)' },
        });

        radiusLabelRow.appendChild(radiusTitle);
        radiusLabelRow.appendChild(radiusValue);
        radiusGroup.appendChild(radiusLabelRow);

        const radiusSliderRow = el('div', {
          style: { display: 'flex', gap: '8px', alignItems: 'center' },
        });

        const radiusDecBtn = el('button', {
          class: 'btn btn-icon',
          text: '−',
          'aria-label': t('circle.decRadius'),
          style: { minHeight: '44px', minWidth: '44px', fontSize: '1.2rem' },
          disabled: radiusVal <= 2,
          onclick: () => {
            if (radiusVal > 2) {
              radiusVal -= 1;
              state.radius = radiusVal;
              renderContent();
            }
          },
        });

        const radiusInput = el('input', {
          type: 'range',
          id: 'radius-slider',
          min: '2',
          max: '8',
          step: '1',
          value: String(radiusVal),
          'aria-label': t('circle.radiusAria'),
          style: { flex: '1', minHeight: '44px', cursor: 'pointer' },
          oninput: (e: Event) => {
            radiusVal = Number((e.target as HTMLInputElement).value);
            state.radius = radiusVal;
            renderContent();
          },
        });

        const radiusIncBtn = el('button', {
          class: 'btn btn-icon',
          text: '+',
          'aria-label': t('circle.incRadius'),
          style: { minHeight: '44px', minWidth: '44px', fontSize: '1.2rem' },
          disabled: radiusVal >= 8,
          onclick: () => {
            if (radiusVal < 8) {
              radiusVal += 1;
              state.radius = radiusVal;
              renderContent();
            }
          },
        });

        radiusSliderRow.appendChild(radiusDecBtn);
        radiusSliderRow.appendChild(radiusInput);
        radiusSliderRow.appendChild(radiusIncBtn);
        radiusGroup.appendChild(radiusSliderRow);
        controlPanel.appendChild(radiusGroup);

        // Distance from Centre (Offset) Slider Group
        const offsetGroup = el('div', {
          class: 'control-group',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          },
        });

        const offsetLabelRow = el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        });

        const offsetTitle = el('label', {
          text: t('circle.offsetSlider'),
          for: 'offset-slider',
          style: { fontWeight: '600', fontSize: '0.9rem' },
        });

        const offsetValue = el('span', {
          text: `${offsetVal} cm`,
          style: {
            fontWeight: 'bold',
            color: offsetVal === 0 ? 'var(--c-green, #16a34a)' : '#d97706',
          },
        });

        offsetLabelRow.appendChild(offsetTitle);
        offsetLabelRow.appendChild(offsetValue);
        offsetGroup.appendChild(offsetLabelRow);

        const offsetSliderRow = el('div', {
          style: { display: 'flex', gap: '8px', alignItems: 'center' },
        });

        const offsetDecBtn = el('button', {
          class: 'btn btn-icon',
          text: '−',
          'aria-label': t('circle.decOffset'),
          style: { minHeight: '44px', minWidth: '44px', fontSize: '1.2rem' },
          disabled: offsetVal <= 0,
          onclick: () => {
            if (offsetVal > 0) {
              offsetVal = Math.max(0, offsetVal - 0.5);
              state.offset = offsetVal;
              renderContent();
            }
          },
        });

        const offsetInput = el('input', {
          type: 'range',
          id: 'offset-slider',
          min: '0',
          max: String(radiusVal),
          step: '0.5',
          value: String(offsetVal),
          'aria-label': t('circle.offsetAria'),
          style: { flex: '1', minHeight: '44px', cursor: 'pointer' },
          oninput: (e: Event) => {
            offsetVal = Number((e.target as HTMLInputElement).value);
            state.offset = offsetVal;
            renderContent();
          },
        });

        const offsetIncBtn = el('button', {
          class: 'btn btn-icon',
          text: '+',
          'aria-label': t('circle.incOffset'),
          style: { minHeight: '44px', minWidth: '44px', fontSize: '1.2rem' },
          disabled: offsetVal >= radiusVal,
          onclick: () => {
            if (offsetVal < radiusVal) {
              offsetVal = Math.min(radiusVal, offsetVal + 0.5);
              state.offset = offsetVal;
              renderContent();
            }
          },
        });

        offsetSliderRow.appendChild(offsetDecBtn);
        offsetSliderRow.appendChild(offsetInput);
        offsetSliderRow.appendChild(offsetIncBtn);
        offsetGroup.appendChild(offsetSliderRow);
        controlPanel.appendChild(offsetGroup);

        // Preset Quick Action Buttons
        const presetsRow = el('div', {
          class: 'presets-row',
          style: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        });

        const centreBtn = el('button', {
          class: `btn ${offsetVal === 0 ? 'btn-active' : ''}`,
          id: 'preset-diameter-btn',
          text: t('circle.chipCentre'),
          style: { minHeight: '44px', minWidth: '44px' },
          onclick: () => {
            offsetVal = 0;
            state.offset = 0;
            renderContent();
          },
        });

        const offCentreBtn = el('button', {
          class: `btn ${offsetVal > 0 && offsetVal < radiusVal ? 'btn-active' : ''}`,
          id: 'preset-chord-btn',
          text: t('circle.chipOffCentre'),
          style: { minHeight: '44px', minWidth: '44px' },
          onclick: () => {
            offsetVal = Math.min(3, radiusVal - 0.5);
            state.offset = offsetVal;
            renderContent();
          },
        });

        presetsRow.appendChild(centreBtn);
        presetsRow.appendChild(offCentreBtn);
        controlPanel.appendChild(presetsRow);

        // Next / Finish action button
        const actionRow = el('div', {
          class: 'action-row',
          style: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '8px',
          },
        });

        const continueBtn = toMistakeButton('G6');
        continueBtn.id = 'continue-btn';
        continueBtn.className = 'btn btn-primary';
        continueBtn.style.minHeight = '44px';
        continueBtn.style.padding = '10px 24px';
        actionRow.appendChild(continueBtn);
        controlPanel.appendChild(actionRow);

        contentBox.appendChild(controlPanel);
      }

      clear(view);
      view.appendChild(titleEl);
      view.appendChild(feedbackEl);
      view.appendChild(stepTabs);
      view.appendChild(contentBox);

      renderContent();
    },
  };
}
