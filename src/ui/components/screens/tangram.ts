/**
 * Interactive Manipulative Workbench for Knot G7: Tangrams (Dissection & Area Conservation).
 *
 * Explores:
 * - 7-piece tangram dissection of a base square:
 *   2 large triangles (4+4), 1 medium triangle (2), 2 small triangles (1+1),
 *   1 square (2), 1 parallelogram (2) = 16 standard units.
 * - Conservation of area across diverse silhouettes (Square, Candle, Boat, Swan):
 *   Height / outline variations do NOT alter total surface area.
 * - Sub-unit composition: Two small triangles compose the square, parallelogram, or medium triangle.
 */

import {
  TANGRAM_PIECES,
  SILHOUETTES,
  totalTangramUnits,
  calculateSilhouetteArea,
  type TangramPieceType,
} from '../../../domain/math/tangram';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

// SVG polygon coordinates for standard 200x200 canvas
const SILHOUETTE_PATHS: Record<string, Record<TangramPieceType, string>> = {
  square: {
    large_triangle_1: '0,0 200,0 100,100',
    large_triangle_2: '0,0 0,200 100,100',
    medium_triangle: '200,0 200,200 100,200',
    small_triangle_1: '100,100 150,50 150,150',
    small_triangle_2: '0,200 100,200 50,150',
    square: '100,100 150,150 100,200 50,150',
    parallelogram: '150,50 200,0 200,100 150,150',
  },
  candle: {
    large_triangle_1: '60,140 140,140 100,180',
    large_triangle_2: '60,180 140,180 100,220',
    medium_triangle: '70,60 130,60 100,100',
    small_triangle_1: '85,30 115,30 100,50',
    small_triangle_2: '85,10 115,10 100,30',
    square: '80,100 120,100 120,140 80,140',
    parallelogram: '70,220 130,220 120,260 60,260',
  },
  boat: {
    large_triangle_1: '40,120 160,120 100,60',
    large_triangle_2: '100,60 180,60 140,20',
    medium_triangle: '10,140 60,140 35,180',
    small_triangle_1: '60,140 110,140 85,180',
    small_triangle_2: '110,140 160,140 135,180',
    square: '85,180 135,180 135,220 85,220',
    parallelogram: '160,140 210,140 185,180 135,180',
  },
  swan: {
    large_triangle_1: '50,130 150,130 100,180',
    large_triangle_2: '80,180 180,180 130,230',
    medium_triangle: '100,60 160,60 130,110',
    small_triangle_1: '130,10 170,10 150,40',
    small_triangle_2: '140,40 180,40 160,70',
    square: '90,90 130,90 130,130 90,130',
    parallelogram: '30,160 80,160 70,200 20,200',
  },
};

const PIECE_COLORS: Record<TangramPieceType, string> = {
  large_triangle_1: '#3b82f6',
  large_triangle_2: '#10b981',
  medium_triangle: '#f59e0b',
  small_triangle_1: '#f43f5e',
  small_triangle_2: '#8b5cf6',
  square: '#d97706',
  parallelogram: '#06b6d4',
};

export function createTangramScreen(): ScreenMeta {
  return {
    id: 'tangram',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'tangram.title',
    render(view, state, params = {}) {
      enterThread('G7', 'tangram', params);

      let stepNum = params.step
        ? Number(params.step)
        : typeof state.step === 'number'
          ? state.step
          : 1;

      let currentSilhouette = typeof state.silhouette === 'string' ? state.silhouette : 'square';
      let eqMode = Boolean(state.eqMode);

      state.step = stepNum;
      state.silhouette = currentSilhouette;
      state.eqMode = eqMode;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('tangram.title'),
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
        { num: 1, label: '1. Square Dissection' },
        { num: 2, label: '2. Silhouettes & Balance' },
        { num: 3, label: '3. Small Triangle Equivalence' },
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
              currentSilhouette = 'square';
              state.silhouette = 'square';
              eqMode = false;
              state.eqMode = false;
            } else if (stepNum === 2) {
              if (currentSilhouette === 'square') {
                currentSilhouette = 'swan';
                state.silhouette = 'swan';
              }
              eqMode = false;
              state.eqMode = false;
            } else if (stepNum === 3) {
              eqMode = true;
              state.eqMode = true;
            }
            renderContent();
          },
        });
        stepTabs.appendChild(tabBtn);
      });

      const contentBox = el('div', {
        class: 'tangram-content-box',
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
        if (stepNum === 1) {
          feedbackEl.textContent = t('tangram.s1done');
        } else if (stepNum === 2) {
          const sil = SILHOUETTES.find((s) => s.id === currentSilhouette);
          feedbackEl.textContent = t('tangram.s2done', {
            name: sil ? sil.name : currentSilhouette,
          });
        } else {
          feedbackEl.textContent = t('tangram.s3done');
        }
      }

      function renderContent() {
        clear(contentBox);
        updateFeedback();

        const units = totalTangramUnits();
        const areaCm2 = calculateSilhouetteArea();

        // Area Conservation Badge Row
        const statsRow = el('div', {
          class: 'tangram-stats-row',
          style: {
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          },
        });

        const piecesBadge = el('div', {
          class: 'stat-pill pieces-pill',
          id: 'pieces-count',
          text: 'Pieces: 7 of 7',
          style: {
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            color: 'var(--c-teal, #0284c7)',
            fontWeight: '600',
            fontSize: '0.9rem',
          },
        });

        const unitsBadge = el('div', {
          class: 'stat-pill units-pill',
          id: 'units-count',
          text: `Total Units: ${units} / 16 (100%)`,
          style: {
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            color: 'var(--c-green, #16a34a)',
            fontWeight: '600',
            fontSize: '0.9rem',
          },
        });

        const areaBadge = el('div', {
          class: 'stat-pill area-pill',
          id: 'area-display',
          text: `Total Area: ${areaCm2} cm²`,
          style: {
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#d97706',
            fontWeight: '600',
            fontSize: '0.9rem',
          },
        });

        statsRow.appendChild(piecesBadge);
        statsRow.appendChild(unitsBadge);
        statsRow.appendChild(areaBadge);
        contentBox.appendChild(statsRow);

        // Status Card
        const statusCard = el('div', {
          class: 'card tangram-status-card',
          id: 'conservation-status',
          style: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
          },
        });

        const curSil = SILHOUETTES.find((s) => s.id === currentSilhouette);
        const silName = curSil ? curSil.name : 'Silhouette';

        if (stepNum === 3) {
          statusCard.innerHTML = `<strong>Piece Decomposition Equivalence</strong>: 2 Small Triangles (1 + 1 = 2 units) exactly equal 1 Square, 1 Parallelogram, or 1 Medium Triangle!`;
        } else {
          statusCard.innerHTML = `<strong>Area Strictly Conserved (${silName})</strong>: Rearranging 7 pieces creates a new silhouette, but the total area is still <strong>16 units (100 cm²)</strong> with zero change!`;
        }
        contentBox.appendChild(statusCard);

        // SVG Canvas
        const svgBox = el('div', {
          class: 'tangram-canvas-container',
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
        svg.setAttribute('viewBox', '0 0 240 280');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', `Tangram silhouette ${silName}`);

        if (stepNum === 3) {
          // Equivalence Demonstration Canvas
          // Row 1: 2 small triangles side by side = square
          const gEq = document.createElementNS(svgNS, 'g');
          gEq.setAttribute('transform', 'translate(20, 20)');

          // Small triangle 1
          const st1 = document.createElementNS(svgNS, 'polygon');
          st1.setAttribute('points', '20,40 60,40 20,80');
          st1.setAttribute('fill', PIECE_COLORS.small_triangle_1);
          st1.setAttribute('stroke', '#ffffff');
          st1.setAttribute('stroke-width', '1.5');
          gEq.appendChild(st1);

          // Small triangle 2
          const st2 = document.createElementNS(svgNS, 'polygon');
          st2.setAttribute('points', '60,40 60,80 20,80');
          st2.setAttribute('fill', PIECE_COLORS.small_triangle_2);
          st2.setAttribute('stroke', '#ffffff');
          st2.setAttribute('stroke-width', '1.5');
          gEq.appendChild(st2);

          // Equals text
          const eqText = document.createElementNS(svgNS, 'text');
          eqText.setAttribute('x', '95');
          eqText.setAttribute('y', '65');
          eqText.setAttribute('fill', 'currentColor');
          eqText.setAttribute('font-size', '20px');
          eqText.setAttribute('font-weight', 'bold');
          eqText.textContent = '=';
          gEq.appendChild(eqText);

          // Target Square (40x40 = 2 units)
          const sqEq = document.createElementNS(svgNS, 'rect');
          sqEq.setAttribute('x', '130');
          sqEq.setAttribute('y', '40');
          sqEq.setAttribute('width', '40');
          sqEq.setAttribute('height', '40');
          sqEq.setAttribute('fill', PIECE_COLORS.square);
          sqEq.setAttribute('stroke', '#ffffff');
          sqEq.setAttribute('stroke-width', '1.5');
          gEq.appendChild(sqEq);

          // Label
          const lbl1 = document.createElementNS(svgNS, 'text');
          lbl1.setAttribute('x', '100');
          lbl1.setAttribute('y', '105');
          lbl1.setAttribute('text-anchor', 'middle');
          lbl1.setAttribute('font-size', '11px');
          lbl1.setAttribute('fill', 'currentColor');
          lbl1.textContent = '2 Small Triangles (1 + 1) = 1 Square (2)';
          gEq.appendChild(lbl1);

          // Row 2: Medium triangle
          const st3 = document.createElementNS(svgNS, 'polygon');
          st3.setAttribute('points', '40,150 40,190 0,190');
          st3.setAttribute('fill', PIECE_COLORS.small_triangle_1);
          st3.setAttribute('stroke', '#ffffff');
          st3.setAttribute('stroke-width', '1.5');
          gEq.appendChild(st3);

          const st4 = document.createElementNS(svgNS, 'polygon');
          st4.setAttribute('points', '40,150 80,190 40,190');
          st4.setAttribute('fill', PIECE_COLORS.small_triangle_2);
          st4.setAttribute('stroke', '#ffffff');
          st4.setAttribute('stroke-width', '1.5');
          gEq.appendChild(st4);

          const eqText2 = document.createElementNS(svgNS, 'text');
          eqText2.setAttribute('x', '95');
          eqText2.setAttribute('y', '175');
          eqText2.setAttribute('fill', 'currentColor');
          eqText2.setAttribute('font-size', '20px');
          eqText2.setAttribute('font-weight', 'bold');
          eqText2.textContent = '=';
          gEq.appendChild(eqText2);

          const medEq = document.createElementNS(svgNS, 'polygon');
          medEq.setAttribute('points', '150,150 190,190 110,190');
          medEq.setAttribute('fill', PIECE_COLORS.medium_triangle);
          medEq.setAttribute('stroke', '#ffffff');
          medEq.setAttribute('stroke-width', '1.5');
          gEq.appendChild(medEq);

          const lbl2 = document.createElementNS(svgNS, 'text');
          lbl2.setAttribute('x', '100');
          lbl2.setAttribute('y', '215');
          lbl2.setAttribute('text-anchor', 'middle');
          lbl2.setAttribute('font-size', '11px');
          lbl2.setAttribute('fill', 'currentColor');
          lbl2.textContent = '2 Small Triangles (1 + 1) = 1 Medium Triangle (2)';
          gEq.appendChild(lbl2);

          svg.appendChild(gEq);
        } else {
          const paths = SILHOUETTE_PATHS[currentSilhouette] || SILHOUETTE_PATHS.square;
          const gPieces = document.createElementNS(svgNS, 'g');
          gPieces.setAttribute('transform', 'translate(20, 20)');

          TANGRAM_PIECES.forEach((p) => {
            const poly = document.createElementNS(svgNS, 'polygon');
            poly.setAttribute('points', (paths && paths[p.id]) || '');
            poly.setAttribute('fill', PIECE_COLORS[p.id]);
            poly.setAttribute('stroke', '#ffffff');
            poly.setAttribute('stroke-width', '2');
            poly.setAttribute('data-piece', p.id);
            gPieces.appendChild(poly);
          });

          svg.appendChild(gPieces);
        }

        svgBox.appendChild(svg);
        contentBox.appendChild(svgBox);

        // Silhouette Selector Buttons
        const presetContainer = el('div', {
          class: 'silhouette-presets-group',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            alignItems: 'center',
          },
        });

        const presetsLabel = el('label', {
          text: 'Choose Silhouette Preset:',
          style: { fontWeight: '600', fontSize: '0.9rem' },
        });
        presetContainer.appendChild(presetsLabel);

        const presetsRow = el('div', {
          class: 'presets-row',
          style: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        });

        SILHOUETTES.forEach((sil) => {
          const btn = el('button', {
            class: `btn ${currentSilhouette === sil.id && stepNum !== 3 ? 'btn-active' : ''}`,
            id: `preset-${sil.id}-btn`,
            text: sil.name,
            style: { minHeight: '44px', minWidth: '44px' },
            onclick: () => {
              currentSilhouette = sil.id;
              state.silhouette = currentSilhouette;
              if (stepNum === 3) {
                stepNum = 2;
                state.step = 2;
              }
              renderContent();
            },
          });
          presetsRow.appendChild(btn);
        });

        presetContainer.appendChild(presetsRow);
        contentBox.appendChild(presetContainer);

        // Piece Breakdown Legend
        const legendCard = el('div', {
          class: 'card tangram-legend-card',
          id: 'piece-breakdown',
          style: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            lineHeight: '1.5',
            backgroundColor: 'var(--card-bg, rgba(255, 255, 255, 0.02))',
            border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
          },
        });

        legendCard.innerHTML = `
          <strong>7 Dissection Pieces (Total = 16 units)</strong>:
          <ul style="margin: 6px 0 0 16px; padding: 0;">
            <li>2 Large Triangles: 4 units each (8 units total, 50% of square)</li>
            <li>1 Medium Triangle: 2 units (12.5% of square)</li>
            <li>2 Small Triangles: 1 unit each (2 units total)</li>
            <li>1 Square: 2 units (12.5% of square)</li>
            <li>1 Parallelogram: 2 units (12.5% of square)</li>
          </ul>
        `;
        contentBox.appendChild(legendCard);

        // Continue Button
        const actionRow = el('div', {
          class: 'action-row',
          style: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '8px',
          },
        });

        const continueBtn = el('button', {
          class: 'btn btn-primary',
          id: 'continue-btn',
          text: 'Continue to Spot Mistake',
          style: {
            minHeight: '44px',
            padding: '10px 24px',
            fontWeight: '600',
          },
          onclick: () => {
            router.go('mistake', { k: 'G7' });
          },
        });

        actionRow.appendChild(continueBtn);
        contentBox.appendChild(actionRow);
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
