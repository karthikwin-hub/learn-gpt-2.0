/**
 * Interactive Earth Workbench screen for Knot E1 ("Spin and travel").
 * Demonstrates 24h planetary rotation, day/night cycles, and 23.5° axial tilt seasons.
 */

import { hourAt, isDay, northernSeason } from '../../../domain/world/earth';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

const ORBIT_MONTHS = [2, 5, 8, 11] as const;

export function createEarthScreen(): ScreenMeta {
  return {
    id: 'earth',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'earth.title',
    render(view, state, params = {}) {
      enterThread('E1', 'earth', params);

      let stepNum = typeof state.step === 'number' ? state.step : 1;
      let spin = typeof state.spin === 'number' ? state.spin : 0;
      let month = typeof state.month === 'number' ? state.month : 5;
      let done = Boolean(state.done);

      state.step = stepNum;
      state.spin = spin;
      state.month = month;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('earth.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      const modelCard = el('section', {
        class: 'card model-card',
        style: { textAlign: 'center', overflowX: 'auto' },
      });
      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '16px' },
      });

      function renderSpinSvg(): SVGElement {
        const cx = 220;
        const cy = 120;
        const r = 74;
        const th = (spin * Math.PI) / 180;
        const hour = hourAt(spin);
        const dayStatus = isDay(hour);

        const s = svg('svg', {
          viewBox: '0 0 360 240',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('earth.spinArt', { h: String(hour) }),
        });

        // Sun on the left
        s.appendChild(
          svg('circle', {
            cx: 30,
            cy,
            r: 22,
            fill: 'var(--thread, #f59e0b)',
          })
        );

        // Sunlight arrows pointing eastward
        for (let i = -2; i <= 2; i++) {
          s.appendChild(
            svg('line', {
              x1: 58,
              y1: cy + i * 28,
              x2: 120,
              y2: cy + i * 28,
              stroke: 'var(--thread, #f59e0b)',
              'stroke-width': 2,
            })
          );
        }

        // Earth globe
        s.appendChild(
          svg('circle', {
            cx,
            cy,
            r,
            fill: 'var(--teal-soft, #ccfbf1)',
            stroke: 'var(--ink-soft, #64748b)',
            'stroke-width': 1.5,
          })
        );

        // Night shade (half away from Sun)
        s.appendChild(
          svg('path', {
            d: `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`,
            fill: 'var(--ink, #0f172a)',
            opacity: 0.55,
          })
        );

        // North pole dot
        s.appendChild(
          svg('circle', {
            cx,
            cy,
            r: 4,
            fill: 'var(--ink, #0f172a)',
          })
        );

        // India marker
        const mx = cx - r * Math.cos(th);
        const my = cy + r * Math.sin(th);

        s.appendChild(
          svg('circle', {
            cx: mx,
            cy: my,
            r: 8,
            fill: 'var(--kumkum, #b91c1c)',
            stroke: 'var(--paper-raised, #ffffff)',
            'stroke-width': 2,
          })
        );

        const indiaTxt = svg('text', {
          x: mx + (mx < cx ? -12 : 12),
          y: my + 4,
          'text-anchor': mx < cx ? 'end' : 'start',
          fill: 'var(--ink, #0f172a)',
          'font-size': '12px',
          'font-weight': 'bold',
        });
        indiaTxt.textContent = t('earth.india');
        s.appendChild(indiaTxt);

        // Hour and day/night status text
        const hourStr = `${String(hour).padStart(2, '0')}:00`;
        const dayWord = t(dayStatus ? 'earth.day' : 'earth.night');
        const statusTxt = svg('text', {
          x: cx,
          y: 230,
          'text-anchor': 'middle',
          fill: 'var(--ink, #0f172a)',
          'font-size': '13px',
          'font-weight': '600',
        });
        statusTxt.textContent = t('earth.hourLine', { h: hourStr, d: dayWord });
        s.appendChild(statusTxt);

        return s;
      }

      function renderOrbitSvg(): SVGElement {
        const cx = 180;
        const cy = 116;
        const R = 120;
        const ry = 70;
        const phi = Math.PI + ((month - 5.5) / 12) * 2 * Math.PI;
        const ex = cx + R * Math.cos(phi);
        const ey = cy + ry * Math.sin(phi);
        const season = northernSeason(month);

        const s = svg('svg', {
          viewBox: '0 0 360 240',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('earth.orbitArt', {
            m: t(`earth.m${month}`),
            s: t(`earth.season.${season}`),
          }),
        });

        // Orbit path ellipse
        s.appendChild(
          svg('ellipse', {
            cx,
            cy,
            rx: R,
            ry,
            fill: 'none',
            stroke: 'var(--hair, #cbd5e1)',
            'stroke-width': 1.5,
            'stroke-dasharray': '4 4',
          })
        );

        // Sun in center
        s.appendChild(
          svg('circle', {
            cx,
            cy,
            r: 20,
            fill: 'var(--thread, #f59e0b)',
          })
        );

        // Month labels along orbit
        [0, 2, 5, 8, 11].forEach((m) => {
          const p = Math.PI + ((m - 5.5) / 12) * 2 * Math.PI;
          const mx = cx + (R + 22) * Math.cos(p);
          const my = cy + (ry + 18) * Math.sin(p);
          const mTxt = svg('text', {
            x: mx,
            y: my,
            'text-anchor': 'middle',
            fill: 'var(--ink-soft, #64748b)',
            'font-size': '10px',
          });
          mTxt.textContent = t(`earth.m${m}`);
          s.appendChild(mTxt);
        });

        // Earth in orbit
        s.appendChild(
          svg('circle', {
            cx: ex,
            cy: ey,
            r: 18,
            fill: 'var(--teal-soft, #ccfbf1)',
            stroke: 'var(--ink-soft, #64748b)',
            'stroke-width': 1.5,
          })
        );

        // 23.5 degree axial tilt
        const tilt = (23.5 * Math.PI) / 180;
        s.appendChild(
          svg('line', {
            x1: ex - 28 * Math.sin(tilt),
            y1: ey + 28 * Math.cos(tilt),
            x2: ex + 28 * Math.sin(tilt),
            y2: ey - 28 * Math.cos(tilt),
            stroke: 'var(--ink, #0f172a)',
            'stroke-width': 2,
          })
        );

        const nTxt = svg('text', {
          x: ex + 30 * Math.sin(tilt),
          y: ey - 32,
          'text-anchor': 'middle',
          fill: 'var(--ink, #0f172a)',
          'font-size': '11px',
          'font-weight': 'bold',
        });
        nTxt.textContent = 'N';
        s.appendChild(nTxt);

        // Status text
        const statusTxt = svg('text', {
          x: cx,
          y: 228,
          'text-anchor': 'middle',
          fill: 'var(--ink, #0f172a)',
          'font-size': '13px',
          'font-weight': '600',
        });
        statusTxt.textContent = t('earth.orbitLine', {
          m: t(`earth.m${month}`),
          s: t(`earth.season.${season}`),
        });
        s.appendChild(statusTxt);

        return s;
      }

      function paint(): void {
        state.step = stepNum;
        state.spin = spin;
        state.month = month;
        state.done = done;

        clear(modelCard);
        modelCard.appendChild(stepNum === 3 ? renderOrbitSvg() : renderSpinSvg());

        clear(actionsCard);

        const guideEl = el('p', {
          class: 'guide-text',
          text: t(`earth.s${stepNum}`),
          style: { fontWeight: '600', marginBottom: '12px' },
        });
        actionsCard.appendChild(guideEl);

        if (stepNum === 1) {
          const spinBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('earth.showMe'),
            onClick: () => {
              spin = 0;
              stepNum = 2;
              say.textContent = t('earth.s1done');
              paint();
            },
          });
          actionsCard.appendChild(spinBtn);
        } else if (stepNum === 2) {
          const btnRow = el('div', {
            class: 'spin-btn-row',
            style: { display: 'flex', gap: '12px', justifyContent: 'center' },
          });

          const turnBackBtn = el('button', {
            class: 'btn-action btn-quiet',
            text: t('earth.turnBack'),
            onClick: () => {
              spin = (spin - 30 + 360) % 360;
              checkNight();
            },
          });

          const turnBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('earth.turn'),
            onClick: () => {
              spin = (spin + 30) % 360;
              checkNight();
            },
          });

          btnRow.appendChild(turnBackBtn);
          btnRow.appendChild(turnBtn);
          actionsCard.appendChild(btnRow);
        } else if (stepNum === 3) {
          const chipsContainer = el('div', {
            class: 'month-chips-container',
            style: { display: 'flex', gap: '8px', justifyContent: 'center' },
          });

          ORBIT_MONTHS.forEach((m) => {
            const btn = el('button', {
              class: `btn-choice ${month === m ? 'active' : ''}`,
              text: t(`earth.m${m}`),
              onClick: () => {
                month = m;
                if (northernSeason(m) === 'winter') {
                  done = true;
                  say.textContent = t('earth.s3done');
                } else {
                  say.textContent = t('earth.tryAgain', {
                    m: t(`earth.m${m}`),
                    s: t(`earth.season.${northernSeason(m)}`),
                  });
                }
                paint();
              },
            });
            chipsContainer.appendChild(btn);
          });

          actionsCard.appendChild(chipsContainer);
        }

        if (done) {
          const nextBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('bench.toMistake'),
            style: { marginTop: '16px' },
            onClick: () => router.go('mistake', { knot: 'E1' }),
          });
          actionsCard.appendChild(nextBtn);
        }
      }

      function checkNight(): void {
        const hour = hourAt(spin);
        if (!isDay(hour)) {
          stepNum = 3;
          month = 5;
          say.textContent = t('earth.s2done', {
            h: `${String(hour).padStart(2, '0')}:00`,
          });
        }
        paint();
      }

      view.appendChild(titleEl);
      view.appendChild(modelCard);
      view.appendChild(say);
      view.appendChild(actionsCard);

      paint();
    },
  };
}
