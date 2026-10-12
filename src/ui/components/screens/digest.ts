/**
 * Journey of a Roti digestion workbench screen (Knot B3).
 * Traces the 5-stop digestive tract and identifies nutrient absorption.
 */

import {
  DIGESTIVE_TRACT_ORDER,
  isValidDigestiveSequence,
  isMainNutrientAbsorptionSite,
  type OrganId,
} from '../../../domain/science/digest';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

export function createDigestScreen(): ScreenMeta {
  return {
    id: 'digest',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'dig.title',
    render(view, state, params = {}) {
      enterThread('B3', 'digest', params);

      const parsedStep = params.step ? parseInt(params.step, 10) : NaN;
      let currentStep =
        !isNaN(parsedStep) && parsedStep >= 1
          ? parsedStep
          : typeof state.step === 'number'
            ? state.step
            : 1;
      const placed: OrganId[] = Array.isArray(state.placed) ? [...state.placed] : [];
      let currentAt: OrganId | null = (state.at as OrganId) || null;
      let done = Boolean(state.done);

      state.step = currentStep;
      state.placed = placed;
      state.at = currentAt;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('dig.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      const modelCard = el('section', { class: 'card model-card', style: { textAlign: 'center' } });
      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '16px' },
      });

      const ORGAN_SHAPES: Record<
        OrganId,
        { d: string; food: [number, number]; label: [number, number] }
      > = {
        mouth: { d: 'M150 46 Q180 62 210 46', food: [180, 52], label: [262, 48] },
        pipe: { d: 'M180 62 L180 128', food: [180, 96], label: [262, 96] },
        stomach: {
          d: 'M180 128 C 230 118, 250 160, 222 182 C 200 198, 170 178, 176 160',
          food: [214, 158],
          label: [292, 150],
        },
        small: {
          d: 'M176 196 q 20 -10 40 0 q 20 10 0 20 q -20 10 -40 0 q -20 -10 0 -20 M176 216 q 20 10 40 0 q 20 -10 0 20 q -20 10 -40 0',
          food: [196, 222],
          label: [292, 226],
        },
        large: {
          d: 'M128 270 L128 196 Q128 186 140 186 L150 186 M246 186 L258 186 Q268 186 268 196 L268 270 L200 270 L200 300',
          food: [262, 240],
          label: [62, 250],
        },
      };

      function paint(): void {
        state.step = currentStep;
        state.placed = placed;
        state.at = currentAt;
        state.done = done;

        clear(modelCard);

        const svgEl = svg('svg', {
          viewBox: '0 0 360 320',
          style: {
            width: '100%',
            maxWidth: '360px',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          },
        });

        // Body silhouette
        svgEl.appendChild(
          svg('path', {
            d: 'M180 6 C 140 6, 130 40, 150 60 L 112 90 C 96 140, 100 240, 116 300 L 244 300 C 260 240, 264 140, 248 90 L 210 60 C 230 40, 220 6, 180 6 Z',
            stroke: 'var(--border, #cbd5e1)',
            'stroke-width': '2',
            fill: 'var(--card-bg, #f8fafc)',
          })
        );

        // Organs
        for (const id of DIGESTIVE_TRACT_ORDER) {
          const sh = ORGAN_SHAPES[id];
          const isHigh = currentAt === id;
          const isDone = placed.includes(id);

          const organPath = svg('path', {
            d: sh.d,
            class: `organ-path organ-${id}`,
            stroke: isHigh
              ? 'var(--thread-ganita, #8b5cf6)'
              : isDone
                ? 'var(--leaf, #10b981)'
                : 'var(--ink-soft, #94a3b8)',
            'stroke-width': isHigh ? '7' : '5',
            fill: 'none',
            style: { cursor: 'pointer' },
            onclick: () => handleTap(id),
          });
          svgEl.appendChild(organPath);

          // Label
          const labelText = svg('text', {
            x: String(sh.label[0]),
            y: String(sh.label[1]),
            'font-size': '12',
            fill: isHigh ? 'var(--ink, #0f172a)' : 'var(--muted, #64748b)',
            'text-anchor': 'middle',
            'font-weight': isHigh ? 'bold' : 'normal',
          });
          labelText.textContent = t(`dig.o.${id}`);
          svgEl.appendChild(labelText);
        }

        // Blood capillary line when done
        if (done) {
          svgEl.appendChild(
            svg('path', {
              d: 'M150 214 C 120 200, 110 160, 120 120',
              stroke: '#ef4444',
              'stroke-width': '3',
              'stroke-dasharray': '2 5',
              fill: 'none',
            })
          );
        }

        // Food bolus marker
        if (currentAt) {
          const p = ORGAN_SHAPES[currentAt].food;
          svgEl.appendChild(
            svg('circle', {
              cx: String(p[0]),
              cy: String(p[1]),
              r: currentAt === 'large' ? '4' : '8',
              fill: 'var(--thread-ganita, #8b5cf6)',
              stroke: 'var(--ink, #0f172a)',
              'stroke-width': '1.5',
            })
          );
        }

        modelCard.appendChild(svgEl);

        // Instructions and actions
        clear(actionsCard);
        const guideText = el('p', {
          class: 'guide-text',
          style: { fontSize: '15px', fontWeight: '500', marginBottom: '12px' },
          text: t(`dig.s${currentStep}`),
        });
        actionsCard.appendChild(guideText);

        if (currentStep === 1) {
          const demoBtn = el('button', {
            class: 'btn primary block btn-follow',
            type: 'button',
            text: t('dig.showMe'),
            onclick: runDemo,
          });
          actionsCard.appendChild(demoBtn);
        } else if (currentStep === 2) {
          const organButtons = el('div', {
            class: 'organ-buttons',
            style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' },
          });
          for (const id of DIGESTIVE_TRACT_ORDER) {
            organButtons.appendChild(
              el('button', {
                class: `btn chip${placed.includes(id) ? ' active' : ''}`,
                type: 'button',
                text: t(`dig.o.${id}`),
                onclick: () => handleTap(id),
              })
            );
          }
          actionsCard.appendChild(organButtons);

          if (placed.length > 0) {
            const list = el('ol', { class: 'placed-list', style: { paddingLeft: '20px' } });
            for (const id of placed) {
              list.appendChild(el('li', { text: t(`dig.o.${id}`) }));
            }
            actionsCard.appendChild(list);
          }
        } else if (currentStep === 3) {
          const choiceNotice = el('p', {
            class: 'muted small',
            text: t('dig.s3'),
          });
          actionsCard.appendChild(choiceNotice);

          const organButtons = el('div', {
            class: 'organ-buttons step3-buttons',
            style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' },
          });
          for (const id of DIGESTIVE_TRACT_ORDER) {
            organButtons.appendChild(
              el('button', {
                class: `btn chip btn-organ-${id}`,
                type: 'button',
                text: t(`dig.o.${id}`),
                onclick: () => handleTap(id),
              })
            );
          }
          actionsCard.appendChild(organButtons);
        }

        if (done) {
          const nextBtn = el('button', {
            class: 'btn primary block btn-next',
            type: 'button',
            text: t('bench.toMistake'),
            onclick: () => router.go('mistake'),
          });
          actionsCard.appendChild(nextBtn);
        }
      }

      let interval: ReturnType<typeof setInterval> | undefined;

      function runDemo(): void {
        clearInterval(interval);
        let idx = 0;
        interval = setInterval(() => {
          if (idx < DIGESTIVE_TRACT_ORDER.length) {
            const organId = DIGESTIVE_TRACT_ORDER[idx]!;
            currentAt = organId;
            say.textContent = t(`dig.say.${organId}`);
            paint();
            idx++;
          } else {
            clearInterval(interval);
            currentAt = null;
            currentStep = 2;
            say.textContent = t('dig.s1done');
            paint();
          }
        }, 1200);
      }

      function handleTap(id: OrganId): void {
        if (currentStep === 2) {
          const expected = DIGESTIVE_TRACT_ORDER[placed.length];
          if (id === expected) {
            placed.push(id);
            currentAt = id;
            if (isValidDigestiveSequence(placed)) {
              currentStep = 3;
              say.textContent = t('dig.s2done');
            } else {
              say.textContent = t(`dig.say.${id}`);
            }
            paint();
          } else if (!placed.includes(id)) {
            say.textContent =
              placed.length > 0
                ? t('dig.notYet', { last: t(`dig.o.${placed[placed.length - 1]}`) })
                : t('dig.notFirst');
          }
        } else if (currentStep === 3) {
          if (isMainNutrientAbsorptionSite(id)) {
            done = true;
            currentAt = id;
            say.textContent = t('dig.s3done');
            paint();
          } else {
            say.textContent = t('dig.s3try', { o: t(`dig.o.${id}`) });
          }
        }
      }

      view.appendChild(titleEl);
      view.appendChild(modelCard);
      view.appendChild(say);
      view.appendChild(actionsCard);

      paint();
      return () => clearInterval(interval);
    },
  };
}
