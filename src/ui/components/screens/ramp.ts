/**
 * Friction ramp and fair testing workbench screen (Knot K2).
 * Investigates surface grip, roll distances, and fair testing controls.
 */

import {
  SURFACE_ORDER,
  rollDistance,
  isFairTest,
  type SurfaceId,
  type RampRun,
} from '../../../domain/science/ramp';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createRampScreen(): ScreenMeta {
  return {
    id: 'ramp',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'ramp.title',
    render(view, state, params = {}) {
      enterThread('K2', 'ramp', params);

      const height = typeof state.height === 'number' ? state.height : 1;
      let surface: SurfaceId = (state.surface as SurfaceId) || 'tile';
      const runs: RampRun[] = Array.isArray(state.runs) ? [...state.runs] : [];
      let done = Boolean(state.done);

      state.height = height;
      state.surface = surface;
      state.runs = runs;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('ramp.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      const modelCard = el('section', { class: 'card model-card', style: { textAlign: 'center' } });
      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '16px' },
      });

      const SURFACE_FILLS: Record<SurfaceId, string> = {
        tile: 'var(--paper-raised, #f1f5f9)',
        wood: '#c9a06a',
        rug: '#b35c4a',
        sand: '#e2c98a',
      };

      function paint(): void {
        state.height = height;
        state.surface = surface;
        state.runs = runs;
        state.done = done;

        clear(modelCard);

        const dist = rollDistance(height, surface);
        const k = 11;
        const topY = 120 - height * 22;

        const svgEl = svg('svg', {
          viewBox: '0 0 360 170',
          style: {
            width: '100%',
            maxWidth: '360px',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          },
        });

        // Ramp incline wedge
        svgEl.appendChild(
          svg('path', {
            d: `M10 120 L 10 ${topY} L 70 120 Z`,
            fill: 'var(--paper-sunk, #e2e8f0)',
            stroke: 'var(--ink-soft, #94a3b8)',
            'stroke-width': '2',
          })
        );

        // Floor surface bar
        svgEl.appendChild(
          svg('rect', {
            x: '70',
            y: '120',
            width: '284',
            height: '12',
            fill: SURFACE_FILLS[surface],
            stroke: 'var(--ink-soft, #94a3b8)',
            'stroke-width': '1',
          })
        );

        // Meter ticks
        for (let m = 0; m <= 25; m += 5) {
          svgEl.appendChild(
            svg('line', {
              x1: String(70 + m * k),
              y1: '136',
              x2: String(70 + m * k),
              y2: '142',
              stroke: 'var(--ink-soft, #94a3b8)',
              'stroke-width': '1',
            })
          );
          const txt = svg('text', {
            x: String(70 + m * k),
            y: '152',
            'font-size': '10',
            fill: 'var(--muted, #64748b)',
            'text-anchor': 'middle',
          });
          txt.textContent = `${m}m`;
          svgEl.appendChild(txt);
        }

        // Car placed at resting distance
        const cx = 70 + dist * k;
        const cy = 114;
        svgEl.appendChild(
          svg('rect', {
            x: String(cx - 12),
            y: String(cy - 8),
            width: '24',
            height: '12',
            fill: 'var(--indigo, #4f46e5)',
            stroke: 'var(--ink, #0f172a)',
            'stroke-width': '1',
            rx: '3',
          })
        );
        svgEl.appendChild(
          svg('circle', { cx: String(cx - 6), cy: String(cy + 5), r: '3.5', fill: '#0f172a' })
        );
        svgEl.appendChild(
          svg('circle', { cx: String(cx + 6), cy: String(cy + 5), r: '3.5', fill: '#0f172a' })
        );

        modelCard.appendChild(svgEl);

        // Readout
        const readout = el('div', {
          class: 'ramp-readout',
          style: { marginTop: '8px', fontSize: '16px', fontWeight: 'bold' },
          text: `${t(`ramp.s.${surface}`) || surface}: ${dist}m (${t('ramp.pretend') || 'model metres'})`,
        });
        modelCard.appendChild(readout);

        // Actions
        clear(actionsCard);

        const surfaceLabel = el('h4', {
          style: { margin: '0 0 8px 0' },
          text: t('ramp.surface') || 'Surface texture',
        });
        actionsCard.appendChild(surfaceLabel);

        const surfaceChips = el('div', {
          class: 'surface-chips',
          style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' },
        });

        for (const s of SURFACE_ORDER) {
          surfaceChips.appendChild(
            el('button', {
              class: `btn chip${surface === s ? ' active' : ''}`,
              type: 'button',
              text: t(`ramp.s.${s}`) || s,
              onclick: () => {
                const prevRun: RampRun = { height, surface, car: 'blue' };
                surface = s;
                const nextRun: RampRun = { height, surface, car: 'blue' };
                runs.push(nextRun);

                if (isFairTest(prevRun, nextRun)) {
                  say.textContent = t('ramp.fairSay', { fair: t('ramp.fair') });
                }
                paint();
              },
            })
          );
        }
        actionsCard.appendChild(surfaceChips);

        const rollBtn = el('button', {
          class: 'btn primary block btn-roll',
          type: 'button',
          text: t('ramp.showMe') || 'Roll the car',
          onclick: () => {
            const d = rollDistance(height, surface);
            say.textContent = t('ramp.rolledSay', { d, surface: t(`ramp.s.${surface}`) });
            done = true;
            paint();
          },
        });
        actionsCard.appendChild(rollBtn);

        if (done) {
          const nextBtn = el('button', {
            class: 'btn ghost block',
            type: 'button',
            style: { marginTop: '12px' },
            text: t('bench.toMistake') || 'Spot the mistake',
            onclick: () => router.go('mistake'),
          });
          actionsCard.appendChild(nextBtn);
        }
      }

      view.appendChild(titleEl);
      view.appendChild(modelCard);
      view.appendChild(say);
      view.appendChild(actionsCard);

      paint();
    },
  };
}
