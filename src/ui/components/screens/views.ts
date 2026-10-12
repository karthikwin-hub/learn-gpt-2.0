/**
 * Interactive Manipulative Workbench for Knot G8: Views from Above (Top, Front, Side Views & Jaal E4 <-> G8).
 *
 * Explores:
 * - 3D block structures projected onto 3 orthographic planes:
 *   - Top View (Plan / Map): Looking straight down along Z axis. Collapses vertical heights.
 *   - Front View (Elevation): Looking from front along Y axis. Shows width (X) and height (Z).
 *   - Side View (Profile): Looking from side along X axis. Shows depth (Y) and height (Z).
 * - Pedagogical insight: Top view is a 2D map of the ground footprint (Jaal link to E4 Maps).
 */

import {
  STRUCTURE_PRESETS,
  projectOrthographicViews,
  countBlocks,
} from '../../../domain/math/views';
import { t } from '../../../domain/i18n/core';
import { clear, el } from '../../util/dom';
import { readStep, toMistakeButton } from '../../util/bench';
import { enterThread } from '../../util/thread';
import { type ScreenMeta } from '../app/router';

export function createViewsScreen(): ScreenMeta {
  return {
    id: 'views',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'views.title',
    render(view, state, params = {}) {
      enterThread('G8', 'views', params);

      let stepNum = readStep(params.step, state.step, 3);

      let currentPresetId = typeof state.preset === 'string' ? state.preset : 'staircase';
      let jaalActive = Boolean(state.jaal);

      state.step = stepNum;
      state.preset = currentPresetId;
      state.jaal = jaalActive;

      const titleEl = el('h2', {
        class: 'screen-title',
        text: t('views.title'),
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
        { num: 1, label: t('views.tab1') },
        { num: 2, label: t('views.tab2') },
        { num: 3, label: t('views.tab3') },
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
              currentPresetId = 'staircase';
              state.preset = 'staircase';
              jaalActive = false;
              state.jaal = false;
            } else if (stepNum === 3) {
              jaalActive = true;
              state.jaal = true;
            }
            renderContent();
          },
        });
        stepTabs.appendChild(tabBtn);
      });

      const contentBox = el('div', {
        class: 'views-content-box',
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
        const preset =
          STRUCTURE_PRESETS.find((p) => p.id === currentPresetId) ?? STRUCTURE_PRESETS[0]!;
        if (stepNum === 1) {
          feedbackEl.textContent = t('views.s1done');
        } else if (stepNum === 2) {
          feedbackEl.textContent = t('views.s2done', { name: preset.name });
        } else {
          feedbackEl.textContent = t('views.s3done');
        }
      }

      function renderContent() {
        clear(contentBox);
        updateFeedback();

        const preset =
          STRUCTURE_PRESETS.find((p) => p.id === currentPresetId) ?? STRUCTURE_PRESETS[0]!;

        const views = projectOrthographicViews(preset.blocks, 3, 3, 3);
        const blockCount = countBlocks(preset.blocks);

        // Stats Badges Row
        const statsRow = el('div', {
          class: 'views-stats-row',
          style: {
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          },
        });

        const structureBadge = el('div', {
          class: 'stat-pill structure-pill',
          id: 'structure-name',
          text: t('views.structureLabel', { name: preset.name }),
          style: {
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'var(--teal-soft)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            color: 'var(--teal)',
            fontWeight: '600',
            fontSize: '0.9rem',
          },
        });

        const countBadge = el('div', {
          class: 'stat-pill blocks-pill',
          id: 'blocks-count',
          text: t('views.blocks', { count: blockCount }),
          style: {
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            color: 'var(--indigo)',
            fontWeight: '600',
            fontSize: '0.9rem',
          },
        });

        statsRow.appendChild(structureBadge);
        statsRow.appendChild(countBadge);
        contentBox.appendChild(statsRow);

        // Status Card
        const statusCard = el('div', {
          class: 'card views-status-card',
          id: 'perspective-status',
          style: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
          },
        });

        statusCard.textContent =
          stepNum === 3 || jaalActive
            ? t('views.statusJaal')
            : preset.id === 'staircase'
              ? t('views.statusStairTop')
              : t('views.statusOrtho', { name: preset.name });
        contentBox.appendChild(statusCard);

        // 3 Viewports Grid Container
        const viewportsContainer = el('div', {
          class: 'viewports-container',
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            width: '100%',
          },
        });

        // Helper to build an SVG 3x3 orthographic projection card
        function createViewportCard(
          title: string,
          grid: boolean[][],
          id: string,
          color: string,
          subtitle: string
        ) {
          const card = el('div', {
            class: 'card viewport-card',
            id,
            style: {
              padding: '12px',
              borderRadius: '12px',
              background: 'var(--paper-raised)',
              border: `1px solid ${color}40`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            },
          });

          const cardTitle = el('div', {
            text: title,
            style: {
              fontWeight: 'bold',
              fontSize: '0.85rem',
              color,
              textAlign: 'center',
            },
          });

          const svgNS = 'http://www.w3.org/2000/svg';
          const svg = document.createElementNS(svgNS, 'svg');
          svg.setAttribute('viewBox', '0 0 96 96');
          svg.setAttribute('width', '96');
          svg.setAttribute('height', '96');
          svg.setAttribute('role', 'img');
          svg.setAttribute('aria-label', title);

          // Render 3x3 cells (30x30 px each with 2px gap)
          const rows = grid.length;
          const cols = grid[0]?.length ?? 0;

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              // Note: for Front and Side views, row 0 is z=0 (bottom), so inverted vertically for drawing
              const displayRow = id === 'top-view-card' ? r : rows - 1 - r;
              const isOccupied = Boolean(grid[r]?.[c]);

              const rect = document.createElementNS(svgNS, 'rect');
              rect.setAttribute('x', String(c * 32 + 2));
              rect.setAttribute('y', String(displayRow * 32 + 2));
              rect.setAttribute('width', '28');
              rect.setAttribute('height', '28');
              rect.setAttribute('rx', '4');
              rect.setAttribute('fill', isOccupied ? color : 'rgba(255, 255, 255, 0.05)');
              rect.setAttribute('stroke', isOccupied ? '#ffffff' : 'rgba(255, 255, 255, 0.15)');
              rect.setAttribute('stroke-width', isOccupied ? '1.5' : '1');
              svg.appendChild(rect);
            }
          }

          const cardSub = el('div', {
            text: subtitle,
            style: {
              fontSize: '0.75rem',
              color: 'var(--ink-soft)',
              textAlign: 'center',
            },
          });

          card.appendChild(cardTitle);
          card.appendChild(svg);
          card.appendChild(cardSub);
          return card;
        }

        // Top View Card (Plan)
        const topCard = createViewportCard(
          'Top View (Plan)',
          views.top,
          'top-view-card',
          'var(--teal)',
          "Bird's Eye (Map)"
        );

        // Front View Card (Elevation)
        const frontCard = createViewportCard(
          'Front View (Elevation)',
          views.front,
          'front-view-card',
          'var(--leaf)',
          'Width × Height'
        );

        // Side View Card (Profile)
        const sideCard = createViewportCard(
          'Side View (Profile)',
          views.side,
          'side-view-card',
          '#d97706',
          'Depth × Height'
        );

        viewportsContainer.appendChild(topCard);
        viewportsContainer.appendChild(frontCard);
        viewportsContainer.appendChild(sideCard);
        contentBox.appendChild(viewportsContainer);

        // Structure Preset Buttons
        const presetGroup = el('div', {
          class: 'structure-presets-group',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            alignItems: 'center',
          },
        });

        const presetLabel = el('label', {
          text: t('views.presetsLabel'),
          style: { fontWeight: '600', fontSize: '0.9rem' },
        });
        presetGroup.appendChild(presetLabel);

        const presetsRow = el('div', {
          class: 'presets-row',
          style: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        });

        STRUCTURE_PRESETS.forEach((p) => {
          const btn = el('button', {
            class: `btn ${currentPresetId === p.id ? 'btn-active' : ''}`,
            id: `preset-${p.id}-btn`,
            text: p.name,
            style: { minHeight: '44px', minWidth: '44px' },
            onclick: () => {
              currentPresetId = p.id;
              state.preset = currentPresetId;
              renderContent();
            },
          });
          presetsRow.appendChild(btn);
        });

        presetGroup.appendChild(presetsRow);
        contentBox.appendChild(presetGroup);

        // Continue Button
        const actionRow = el('div', {
          class: 'action-row',
          style: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '8px',
          },
        });

        const continueBtn = toMistakeButton('G8');
        continueBtn.id = 'continue-btn';
        continueBtn.className = 'btn btn-primary';
        continueBtn.style.minHeight = '44px';
        continueBtn.style.padding = '10px 24px';
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
