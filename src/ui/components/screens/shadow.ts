/**
 * Light and shadow workbench screen (Knot R1).
 * Explores straight-line rays, shadow geometry, and material transparency.
 */

import {
  STICK_HEIGHT,
  MATERIALS,
  shadowLength,
  shadowDarkness,
  type MaterialId,
} from '../../../domain/science/shadow';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createShadowScreen(): ScreenMeta {
  return {
    id: 'shadow',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'light.title',
    render(view, state, params = {}) {
      enterThread('R1', 'shadow', params);

      let lampH = typeof state.lampH === 'number' ? state.lampH : 2.5;
      const dist = typeof state.dist === 'number' ? state.dist : 3;
      let material: MaterialId = (state.material as MaterialId) || 'cardboard';
      let done = Boolean(state.done);

      state.lampH = lampH;
      state.dist = dist;
      state.material = material;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('light.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      const modelCard = el('section', { class: 'card model-card', style: { textAlign: 'center' } });
      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '16px' },
      });

      function paint(): void {
        state.lampH = lampH;
        state.dist = dist;
        state.material = material;
        state.done = done;

        clear(modelCard);

        const k = 36;
        const ground = 230;
        const stickX = 150;
        const lampX = stickX - dist * k;
        const lampY = ground - lampH * k;
        const topY = ground - STICK_HEIGHT * k;
        const len = shadowLength(STICK_HEIGHT, lampH, dist);
        const endX = Number.isFinite(len) ? Math.min(358, stickX + len * k) : 358;
        const dark = shadowDarkness(material);

        const svgEl = svg('svg', {
          viewBox: '0 0 360 250',
          style: {
            width: '100%',
            maxWidth: '360px',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          },
        });

        // Ground line
        svgEl.appendChild(
          svg('line', {
            x1: '0',
            y1: String(ground),
            x2: '360',
            y2: String(ground),
            stroke: 'var(--ink-soft, #94a3b8)',
            'stroke-width': '2',
          })
        );

        // Shadow on the ground
        const shadowWidth = Math.max(8, endX - stickX);
        svgEl.appendChild(
          svg('rect', {
            x: String(stickX),
            y: String(ground - 4),
            width: String(shadowWidth),
            height: '8',
            rx: '2',
            class: 'ground-shadow',
            fill: '#0f172a',
            opacity: String(0.12 + 0.75 * dark),
          })
        );

        // Lamp post and bulb
        svgEl.appendChild(
          svg('line', {
            x1: String(lampX),
            y1: String(lampY),
            x2: String(lampX),
            y2: String(ground),
            stroke: 'var(--ink-soft, #94a3b8)',
            'stroke-width': '2',
          })
        );
        svgEl.appendChild(
          svg('circle', {
            cx: String(lampX),
            cy: String(lampY),
            r: '10',
            fill: '#f59e0b',
            stroke: '#0f172a',
            'stroke-width': '1.5',
          })
        );

        // Light ray past top of stick
        const rayEnd = Number.isFinite(len) ? [endX, ground] : [358, topY];
        svgEl.appendChild(
          svg('line', {
            x1: String(lampX),
            y1: String(lampY),
            x2: String(rayEnd[0]),
            y2: String(rayEnd[1]),
            stroke: '#8b5cf6',
            'stroke-width': '2',
            'stroke-dasharray': '6 4',
          })
        );

        // Stick obstacle
        const stickFill =
          material === 'glass' ? '#e2e8f0' : material === 'wax' ? '#fde68a' : '#0f172a';
        svgEl.appendChild(
          svg('rect', {
            x: String(stickX - 4),
            y: String(topY),
            width: '8',
            height: String(STICK_HEIGHT * k),
            fill: stickFill,
            stroke: '#0f172a',
            'stroke-width': '1',
          })
        );

        // Length text
        if (Number.isFinite(len)) {
          const txt = svg('text', {
            x: String((stickX + endX) / 2),
            y: String(ground + 14),
            'font-size': '12',
            fill: 'var(--ink, #0f172a)',
            'text-anchor': 'middle',
          });
          txt.textContent = `${Math.round(len * 10) / 10}m`;
          svgEl.appendChild(txt);
        }

        modelCard.appendChild(svgEl);

        // Readout
        const lenDisplay = Number.isFinite(len) ? `${Math.round(len * 10) / 10}m` : '∞';
        const readout = el('div', {
          class: 'shadow-readout',
          style: { marginTop: '8px', fontSize: '16px', fontWeight: 'bold' },
          text: t('light.shadowLen', { n: lenDisplay }),
        });
        modelCard.appendChild(readout);

        // Actions
        clear(actionsCard);

        const controlsRow = el('div', {
          style: { display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '16px' },
        });

        const lampCol = el('div', { style: { textAlign: 'center' } }, [
          el('span', {
            style: { fontSize: '13px', display: 'block', marginBottom: '4px' },
            text: t('light.lampHeight'),
          }),
          el('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
            el('button', {
              class: 'btn icon mini',
              type: 'button',
              text: '−',
              onclick: () => {
                lampH = Math.max(1.8, Math.round((lampH - 0.5) * 10) / 10);
                paint();
              },
            }),
            el('span', { style: { minWidth: '36px', fontWeight: 'bold' }, text: `${lampH}m` }),
            el('button', {
              class: 'btn icon mini',
              type: 'button',
              text: '+',
              onclick: () => {
                lampH = Math.min(6.0, Math.round((lampH + 0.5) * 10) / 10);
                paint();
              },
            }),
          ]),
        ]);

        controlsRow.appendChild(lampCol);
        actionsCard.appendChild(controlsRow);

        // Materials chips
        const matLabel = el('h4', {
          style: { margin: '0 0 8px 0' },
          text: t('light.material'),
        });
        actionsCard.appendChild(matLabel);

        const matChips = el('div', {
          class: 'material-chips',
          style: { display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' },
        });

        for (const m of Object.keys(MATERIALS) as MaterialId[]) {
          matChips.appendChild(
            el('button', {
              class: `btn chip${material === m ? ' active' : ''}`,
              type: 'button',
              text: t(`light.m.${m}`),
              onclick: () => {
                material = m;
                if (m === 'cardboard') done = true;
                paint();
              },
            })
          );
        }
        actionsCard.appendChild(matChips);

        if (done) {
          const nextBtn = el('button', {
            class: 'btn ghost block',
            type: 'button',
            text: t('bench.toMistake'),
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
