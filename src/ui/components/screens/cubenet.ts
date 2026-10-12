/**
 * Interactive Manipulative Workbench for Knot G5: Fold a Box (Cube Nets & Spatial Visualization).
 * Interactive 2D grid hexomino editor, folding 3D spatial simulation,
 * face collision detection, and opposite-face analysis.
 */

import {
  detectFaceCollisions,
  type GridSquare,
  type CubeNetAnalysis,
} from '../../../domain/math/cubenet';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

const PRESET_T_NET: GridSquare[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 1, y: 2 },
];

const PRESET_2X3: GridSquare[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
];

const PRESET_STAIRS: GridSquare[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
];

export function createCubenetScreen(): ScreenMeta {
  return {
    id: 'cubenet',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'cubenet.title',
    render(view, state, params = {}) {
      enterThread('G5', 'cubenet', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;

      let squares: GridSquare[] =
        Array.isArray(state.squares) && state.squares.length > 0
          ? [...state.squares]
          : [...PRESET_T_NET];

      let foldAngle = typeof state.foldAngle === 'number' ? state.foldAngle : 0;

      state.step = stepNum;
      state.squares = squares;
      state.foldAngle = foldAngle;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('cubenet.title'),
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
        { num: 1, label: '1. Arrange 6 squares' },
        { num: 2, label: '2. Fold 3D Box' },
        { num: 3, label: '3. Find 11 Nets' },
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
            if (stepNum === 2 && foldAngle === 0) {
              foldAngle = 90;
              state.foldAngle = foldAngle;
            }
            renderContent();
          },
        });
        stepTabs.appendChild(tabBtn);
      });

      const contentBox = el('div', {
        class: 'cubenet-content-box',
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

        // Update active step tab
        stepTabs.querySelectorAll('.step-tab').forEach((b, idx) => {
          if (idx + 1 === stepNum) {
            b.classList.add('btn-active');
            b.setAttribute('aria-current', 'step');
          } else {
            b.classList.remove('btn-active');
            b.setAttribute('aria-current', 'false');
          }
        });

        const analysis: CubeNetAnalysis = detectFaceCollisions(squares);

        // Update feedback
        if (squares.length < 6) {
          feedbackEl.textContent = t('cubenet.need6');
        } else if (analysis.valid) {
          feedbackEl.textContent = t('cubenet.valid');
        } else {
          feedbackEl.textContent = t('cubenet.invalid');
        }

        // Canvas container (shows 2D grid or 3D isometric box based on foldAngle)
        const canvasCard = el('div', {
          class: 'card cubenet-canvas-card',
          style: {
            width: '100%',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '12px',
            border: '1px solid var(--border, #e5e7eb)',
          },
        });

        // Status badge
        const badgeEl = el('div', {
          class: 'status-badge',
          style: {
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '12px',
            background:
              squares.length !== 6
                ? 'rgba(234, 179, 8, 0.15)'
                : analysis.valid
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
            color:
              squares.length !== 6
                ? '#b45309'
                : analysis.valid
                  ? '#047857'
                  : 'var(--kumkum, #b91c1c)',
          },
          text:
            squares.length !== 6
              ? `Selected: ${squares.length} of 6 squares`
              : analysis.valid
                ? '✓ Valid Cube Net (Closed 3D Box)'
                : '✗ Faces Collide / Open Holes',
        });
        canvasCard.appendChild(badgeEl);

        const svgW = 340;
        const svgH = 220;

        if (foldAngle < 45) {
          // 2D Grid Mode (4 rows x 5 cols)
          const cols = 5;
          const rows = 4;
          const cellSize = 38;
          const xOffset = (svgW - cols * cellSize) / 2;
          const yOffset = (svgH - rows * cellSize) / 2;

          let svgHtml = `
            <svg viewBox="0 0 ${svgW} ${svgH}" width="100%" height="220" role="img" aria-label="Interactive 2D hexomino grid editor">
              <g transform="translate(${xOffset}, ${yOffset})">
          `;

          // Grid cells
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const sqIdx = squares.findIndex((s) => s.x === c && s.y === r);
              const isSelected = sqIdx !== -1;
              const isOverlapping = isSelected && analysis.overlaps.includes(sqIdx);

              const fillColor = isSelected
                ? isOverlapping
                  ? 'rgba(239, 68, 68, 0.4)'
                  : 'rgba(99, 102, 241, 0.35)'
                : 'var(--bg, #f8fafc)';

              const strokeColor = isSelected
                ? isOverlapping
                  ? 'var(--kumkum, #dc2626)'
                  : 'var(--accent, #6366f1)'
                : 'var(--border, #cbd5e1)';

              svgHtml += `
                <rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}"
                      class="grid-cell" data-col="${c}" data-row="${r}"
                      fill="${fillColor}" stroke="${strokeColor}" stroke-width="${isSelected ? '2.5' : '1'}"
                      rx="4" ry="4" style="cursor: pointer;" />
              `;

              if (isSelected) {
                const faceName = analysis.faceAssignments[sqIdx] || '';
                svgHtml += `
                  <text x="${c * cellSize + cellSize / 2}" y="${r * cellSize + cellSize / 2 + 4}"
                        text-anchor="middle" font-size="10" font-weight="bold"
                        fill="${isOverlapping ? '#b91c1c' : '#4338ca'}">${faceName.substring(0, 3)}</text>
                `;
              }
            }
          }

          svgHtml += `</g></svg>`;

          const svgWrap = el('div', {
            style: { width: '100%', display: 'flex', justifyContent: 'center' },
          });
          svgWrap.innerHTML = svgHtml;

          // Attach grid toggle click handlers
          svgWrap.querySelectorAll('.grid-cell').forEach((rect) => {
            const col = Number(rect.getAttribute('data-col'));
            const row = Number(rect.getAttribute('data-row'));
            rect.addEventListener('click', () => {
              const foundIdx = squares.findIndex((s) => s.x === col && s.y === row);
              if (foundIdx !== -1) {
                squares.splice(foundIdx, 1);
              } else if (squares.length < 6) {
                squares.push({ x: col, y: row });
              }
              state.squares = squares;
              renderContent();
            });
          });

          canvasCard.appendChild(svgWrap);
        } else {
          // 3D Isometric Folding Representation
          const cx = svgW / 2;
          const cy = svgH / 2;
          const s = 50; // cube size

          let svgHtml = `
            <svg viewBox="0 0 ${svgW} ${svgH}" width="100%" height="220" role="img" aria-label="3D Isometric folded cube visualization">
          `;

          if (analysis.valid) {
            // Isometric cube faces
            // Top face
            svgHtml += `
              <polygon points="${cx},${cy - s} ${cx + s * 0.866},${cy - s * 0.5} ${cx},${cy} ${cx - s * 0.866},${cy - s * 0.5}"
                       fill="rgba(99, 102, 241, 0.45)" stroke="var(--ink, #1e293b)" stroke-width="2" />
              <!-- Front-Right face -->
              <polygon points="${cx},${cy} ${cx + s * 0.866},${cy - s * 0.5} ${cx + s * 0.866},${cy + s * 0.5} ${cx},${cy + s}"
                       fill="rgba(99, 102, 241, 0.3)" stroke="var(--ink, #1e293b)" stroke-width="2" />
              <!-- Front-Left face -->
              <polygon points="${cx - s * 0.866},${cy - s * 0.5} ${cx},${cy} ${cx},${cy + s} ${cx - s * 0.866},${cy + s * 0.5}"
                       fill="rgba(99, 102, 241, 0.2)" stroke="var(--ink, #1e293b)" stroke-width="2" />
              <text x="${cx}" y="${cy + s + 22}" text-anchor="middle" font-size="13" font-weight="bold" fill="#047857">
                Closed 3D Cube (0 Collisions, 6 Faces Sealed)
              </text>
            `;
          } else {
            // Broken cube with collision warning & open gap
            svgHtml += `
              <!-- Colliding overlapping faces in Kumkum -->
              <polygon points="${cx},${cy - s} ${cx + s * 0.866},${cy - s * 0.5} ${cx},${cy} ${cx - s * 0.866},${cy - s * 0.5}"
                       fill="rgba(239, 68, 68, 0.5)" stroke="var(--kumkum, #b91c1c)" stroke-width="2.5" />
              <!-- Open void gap (dashed line) -->
              <polygon points="${cx},${cy} ${cx + s * 0.866},${cy - s * 0.5} ${cx + s * 0.866},${cy + s * 0.5} ${cx},${cy + s}"
                       fill="none" stroke="var(--kumkum, #b91c1c)" stroke-width="2" stroke-dasharray="4 4" />
              <polygon points="${cx - s * 0.866},${cy - s * 0.5} ${cx},${cy} ${cx},${cy + s} ${cx - s * 0.866},${cy + s * 0.5}"
                       fill="rgba(239, 68, 68, 0.3)" stroke="var(--kumkum, #b91c1c)" stroke-width="2" />
              <text x="${cx}" y="${cy + s + 22}" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--kumkum, #b91c1c)">
                Collision! Faces Overlap &amp; Leaves Hole
              </text>
            `;
          }

          svgHtml += `</svg>`;
          const svgWrap = el('div', {
            style: { width: '100%', display: 'flex', justifyContent: 'center' },
          });
          svgWrap.innerHTML = svgHtml;
          canvasCard.appendChild(svgWrap);
        }

        contentBox.appendChild(canvasCard);

        // Control Panel
        const controlPanel = el('div', {
          class: 'card cubenet-controls',
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

        // Fold 3D Scrubber Slider
        const foldRow = el('div', {
          class: 'control-row',
          style: { display: 'flex', flexDirection: 'column', gap: '6px' },
        });
        const foldLabel = el('label', {
          for: 'fold-slider',
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: '600',
            fontSize: '14px',
          },
        });
        foldLabel.innerHTML = `<span>${t('cubenet.foldSlider')} (0° Flat → 90° Closed Box)</span> <span>${foldAngle}°</span>`;

        const foldSlider = el('input', {
          id: 'fold-slider',
          type: 'range',
          min: '0',
          max: '90',
          step: '15',
          value: String(foldAngle),
          'aria-label': t('cubenet.foldSlider'),
          style: { width: '100%', minHeight: '44px', cursor: 'pointer' },
          oninput: (e: Event) => {
            const target = e.target as HTMLInputElement;
            foldAngle = parseInt(target.value, 10);
            state.foldAngle = foldAngle;
            renderContent();
          },
        });
        foldRow.appendChild(foldLabel);
        foldRow.appendChild(foldSlider);
        controlPanel.appendChild(foldRow);

        // Presets row
        const presetBox = el('div', {
          style: { display: 'flex', flexDirection: 'column', gap: '6px' },
        });
        presetBox.appendChild(el('span', { class: 'small muted', text: 'Quick Test Presets:' }));

        const presetBtns = el('div', {
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
        });

        const btnT = el('button', {
          class: 'chip',
          type: 'button',
          text: t('cubenet.presetT'),
          style: { minHeight: '44px' },
          onclick: () => {
            squares = [...PRESET_T_NET];
            state.squares = squares;
            renderContent();
          },
        });

        const btn2x3 = el('button', {
          class: 'chip',
          type: 'button',
          text: t('cubenet.preset2x3'),
          style: { minHeight: '44px' },
          onclick: () => {
            squares = [...PRESET_2X3];
            state.squares = squares;
            renderContent();
          },
        });

        const btnStairs = el('button', {
          class: 'chip',
          type: 'button',
          text: t('cubenet.presetStairs'),
          style: { minHeight: '44px' },
          onclick: () => {
            squares = [...PRESET_STAIRS];
            state.squares = squares;
            renderContent();
          },
        });

        const btnClear = el('button', {
          class: 'btn quiet',
          type: 'button',
          text: t('cubenet.clear'),
          style: { minHeight: '44px' },
          onclick: () => {
            squares = [];
            state.squares = [];
            renderContent();
          },
        });

        presetBtns.appendChild(btnT);
        presetBtns.appendChild(btn2x3);
        presetBtns.appendChild(btnStairs);
        presetBtns.appendChild(btnClear);
        presetBox.appendChild(presetBtns);
        controlPanel.appendChild(presetBox);

        contentBox.appendChild(controlPanel);

        // Navigation forward to Spot the Mistake
        const navRow = el('div', {
          class: 'nav-row',
          style: { width: '100%', marginTop: '8px' },
        });
        const mistakeBtn = el('button', {
          id: 'btn-to-mistake',
          class: 'btn primary block',
          type: 'button',
          text: 'Next: Spot the Mistake →',
          style: { minHeight: '44px' },
          onclick: () => {
            router.go('mistake', { k: 'G5' });
          },
        });
        navRow.appendChild(mistakeBtn);
        contentBox.appendChild(navRow);
      }

      view.appendChild(titleEl);
      view.appendChild(feedbackEl);
      view.appendChild(stepTabs);
      view.appendChild(contentBox);

      renderContent();
    },
  };
}
