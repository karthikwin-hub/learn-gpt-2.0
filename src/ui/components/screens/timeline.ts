/**
 * Interactive Timeline screen for Knot I2 ("Thread of time").
 * Investigates BCE/CE chronology, centuries, and zero-year prohibition.
 */

import {
  EVENTS,
  chronological,
  isEarlier,
  signed,
  yearsBetween,
} from '../../../domain/world/timeline';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

const SHUFFLED_EVENTS = ['taj', 'ashoka', 'chandrayaan', 'harappa', 'independence', 'aryabhata'];

export function createTimelineScreen(): ScreenMeta {
  return {
    id: 'timeline',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'time.title',
    render(view, state, params = {}) {
      enterThread('I2', 'timeline', params);

      let stepNum = typeof state.step === 'number' ? state.step : 1;
      let hung: string[] = Array.isArray(state.hung) ? [...state.hung] : [];
      let reveal = typeof state.reveal === 'number' ? state.reveal : 0;
      let done = Boolean(state.done);

      state.step = stepNum;
      state.hung = hung;
      state.reveal = reveal;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('time.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      const modelCard = el('section', {
        class: 'card model-card',
        style: { textAlign: 'center', overflowX: 'auto' },
      });
      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '16px' },
      });

      function yearLabel(y: number): string {
        return y < 0 ? t('time.bce', { y: String(-y) }) : t('time.ce', { y: String(y) });
      }

      function renderTimelineSvg(span?: [number, number] | null): SVGElement {
        const from = -3000;
        const to = 2100;
        const x0 = 20;
        const x1 = 340;
        const axisY = 70;

        const X = (y: number) => x0 + ((y - from) / (to - from)) * (x1 - x0);

        const s = svg('svg', {
          viewBox: '0 0 360 210',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('time.art'),
        });

        // Background / thread axis
        const axisLength = (x1 - x0) * reveal;
        s.appendChild(
          svg('line', {
            x1: x0,
            y1: axisY,
            x2: x0 + axisLength,
            y2: axisY,
            stroke: 'var(--thread, #c2410c)',
            'stroke-width': 4,
            'stroke-linecap': 'round',
          })
        );

        // Major century ticks
        [-3000, -2000, -1000, 1000, 2000].forEach((y) => {
          const tx = X(y);
          if (tx > x0 + axisLength) return;
          s.appendChild(
            svg('line', {
              x1: tx,
              y1: axisY - 6,
              x2: tx,
              y2: axisY + 6,
              stroke: 'var(--ink-soft, #64748b)',
              'stroke-width': 1.5,
            })
          );
          const txt = svg('text', {
            x: tx,
            y: axisY - 14,
            'text-anchor': 'middle',
            fill: 'var(--ink-soft, #64748b)',
            'font-size': '10px',
          });
          txt.textContent = yearLabel(y);
          s.appendChild(txt);
        });

        // The knot at 1 BCE | 1 CE (no year 0)
        if (reveal >= 0.6) {
          const zx = X(0);
          s.appendChild(
            svg('circle', {
              cx: zx,
              cy: axisY,
              r: 7,
              fill: 'var(--paper-raised, #ffffff)',
              stroke: 'var(--kumkum, #b91c1c)',
              'stroke-width': 2.5,
            })
          );

          const joinTxt = svg('text', {
            x: zx,
            y: axisY - 32,
            'text-anchor': 'middle',
            fill: 'var(--kumkum, #b91c1c)',
            'font-size': '11px',
            'font-weight': 'bold',
          });
          joinTxt.textContent = t('time.join');
          s.appendChild(joinTxt);

          // BCE & CE arrows
          s.appendChild(
            svg('line', {
              x1: zx - 10,
              y1: axisY + 18,
              x2: zx - 45,
              y2: axisY + 18,
              stroke: 'var(--indigo, #4338ca)',
              'stroke-width': 2,
            })
          );
          s.appendChild(
            svg('line', {
              x1: zx + 10,
              y1: axisY + 18,
              x2: zx + 45,
              y2: axisY + 18,
              stroke: 'var(--teal, #0f766e)',
              'stroke-width': 2,
            })
          );
        }

        // Span arc
        if (span) {
          const sa = X(span[0]);
          const sb = X(span[1]);
          s.appendChild(
            svg('path', {
              d: `M ${sa} ${axisY - 4} Q ${(sa + sb) / 2} ${axisY - 44} ${sb} ${axisY - 4}`,
              fill: 'none',
              stroke: 'var(--leaf, #15803d)',
              'stroke-width': 2.5,
            })
          );
        }

        // Hung events
        const slotW = (x1 - x0) / 6;
        hung.forEach((id, i) => {
          const ev = EVENTS.find((e) => e.id === id);
          if (!ev) return;
          const ex = X(ev.year);
          const sx = x0 + slotW * (i + 0.5);
          const ly = i % 2 ? 176 : 140;

          s.appendChild(
            svg('line', {
              x1: ex,
              y1: axisY + 4,
              x2: sx,
              y2: ly - 14,
              stroke: 'var(--ink-soft, #64748b)',
              'stroke-width': 1,
              'stroke-dasharray': '2 2',
            })
          );
          s.appendChild(
            svg('circle', {
              cx: ex,
              cy: axisY,
              r: 5,
              fill: 'var(--leaf, #15803d)',
            })
          );

          const evName = svg('text', {
            x: sx,
            y: ly - 4,
            'text-anchor': 'middle',
            fill: 'var(--ink, #0f172a)',
            'font-size': '10px',
            'font-weight': '600',
          });
          evName.textContent = t(`time.e.${id}`);
          s.appendChild(evName);

          const evYear = svg('text', {
            x: sx,
            y: ly + 10,
            'text-anchor': 'middle',
            fill: 'var(--ink-soft, #64748b)',
            'font-size': '9px',
          });
          evYear.textContent = `${ev.about ? `${t('time.about')} ` : ''}${yearLabel(ev.year)}`;
          s.appendChild(evYear);
        });

        return s;
      }

      function paint(): void {
        state.step = stepNum;
        state.hung = hung;
        state.reveal = reveal;
        state.done = done;

        clear(modelCard);
        modelCard.appendChild(renderTimelineSvg(done ? [-250, 499] : null));

        clear(actionsCard);

        const guideEl = el('p', {
          class: 'guide-text',
          text: t(`time.s${stepNum}`),
          style: { fontWeight: '600', marginBottom: '12px' },
        });
        actionsCard.appendChild(guideEl);

        if (stepNum === 1) {
          const unrollBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('time.showMe'),
            onClick: () => {
              reveal = 1;
              stepNum = 2;
              say.textContent = t('time.s1done');
              paint();
            },
          });
          actionsCard.appendChild(unrollBtn);
        } else if (stepNum === 2) {
          const unhungIds = SHUFFLED_EVENTS.filter((id) => !hung.includes(id));
          const chipsContainer = el('div', {
            class: 'event-chips-container',
            style: { display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' },
          });

          unhungIds.forEach((id) => {
            const chip = el('button', {
              class: 'btn-choice',
              text: t(`time.e.${id}`),
              onClick: () => {
                const trial = [...hung, id];
                const remaining = EVENTS.filter((e) => !trial.includes(e.id));
                const targetEvent = EVENTS.find((e) => e.id === id);
                if (!targetEvent) return;

                const isOldestRemaining = remaining.every((e) =>
                  isEarlier(targetEvent.year, e.year)
                );

                if (isOldestRemaining && chronological(trial)) {
                  hung = trial;
                  if (hung.length === EVENTS.length) {
                    stepNum = 3;
                    say.textContent = t('time.s2done');
                  } else {
                    say.textContent = '';
                  }
                  paint();
                } else {
                  say.textContent = t('time.notYet');
                }
              },
            });
            chipsContainer.appendChild(chip);
          });

          actionsCard.appendChild(chipsContainer);
        } else if (stepNum === 3 && !done) {
          const correctSpan = yearsBetween(signed(250, 'BCE'), signed(499, 'CE'));
          const choices = [correctSpan + 1, correctSpan, 249];

          const choiceContainer = el('div', {
            class: 'calc-chips-container',
            style: { display: 'flex', gap: '10px', justifyContent: 'center' },
          });

          choices.forEach((ans) => {
            const btn = el('button', {
              class: 'btn-choice',
              text: t('time.years', { n: String(ans) }),
              onClick: () => {
                if (ans === correctSpan) {
                  done = true;
                  say.textContent = t('time.s3done', { n: String(correctSpan) });
                  paint();
                } else if (ans === correctSpan + 1) {
                  say.textContent = t('time.s3tryZero');
                } else {
                  say.textContent = t('time.s3try');
                }
              },
            });
            choiceContainer.appendChild(btn);
          });

          actionsCard.appendChild(choiceContainer);
        }

        if (done) {
          const nextBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('bench.toMistake'),
            style: { marginTop: '16px' },
            onClick: () => router.go('mistake', { knot: 'I2' }),
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
