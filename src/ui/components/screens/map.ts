/**
 * Interactive Courtyard Map Workbench screen for Knot E4 ("Courtyard from above").
 * Investigates top-down cartographic projection, cardinal directions, obstacle collisions, and scale factors.
 */

import {
  COURTYARD,
  isBlocked,
  realDistance,
  step as stepCoord,
  type CompassDir,
} from '../../../domain/world/map';
import { t } from '../../../domain/i18n/core';
import { clear, el, svg } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';

const SCALE_METRES = 5;
const CELL_SIZE = 38;

export function createMapScreen(): ScreenMeta {
  return {
    id: 'map',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'map.title',
    render(view, state, params = {}) {
      enterThread('E4', 'map', params);

      const gatePos: [number, number] = [COURTYARD.places.gate[0], COURTYARD.places.gate[1]];
      const wellPos: [number, number] = [COURTYARD.places.well[0], COURTYARD.places.well[1]];

      let stepNum = typeof state.step === 'number' ? state.step : 1;
      let flat = typeof state.flat === 'number' ? state.flat : 0.3;
      const path: [number, number][] =
        Array.isArray(state.path) && state.path.length > 0 ? [...state.path] : [gatePos];
      let done = Boolean(state.done);

      state.step = stepNum;
      state.flat = flat;
      state.path = path;
      state.done = done;

      const titleEl = el('h2', { class: 'screen-title', text: t('map.title') });
      const say = el('p', { class: 'say workbench-feedback', 'aria-live': 'polite' });

      const modelCard = el('section', {
        class: 'card model-card',
        style: { textAlign: 'center', overflowX: 'auto' },
      });
      const actionsCard = el('section', {
        class: 'card actions-card',
        style: { marginTop: '16px' },
      });

      function renderCourtyardSvg(): SVGElement {
        const s = svg('svg', {
          viewBox: '0 0 360 300',
          width: '100%',
          style: 'max-width:440px; display:inline-block; height:auto;',
          role: 'img',
          'aria-label': t('map.art'),
        });

        const y0 = 26;
        const sx = 1 - (1 - flat) * 0.25;
        const shear = -(1 - flat) * 0.5;
        const sy = 0.45 + 0.55 * flat;
        const e = 180 - (shear * COURTYARD.rows * CELL_SIZE + sx * COURTYARD.cols * CELL_SIZE) / 2;

        const g = svg('g', {
          transform: `translate(${e} ${y0 + (1 - flat) * 70}) matrix(${sx} 0 ${shear} ${sy} 0 0)`,
        });

        // Courtyard ground
        g.appendChild(
          svg('rect', {
            x: 0,
            y: 0,
            width: COURTYARD.cols * CELL_SIZE,
            height: COURTYARD.rows * CELL_SIZE,
            fill: 'var(--paper-sunk, #f8fafc)',
            stroke: 'var(--ink, #0f172a)',
            'stroke-width': 3,
          })
        );

        // Grid lines
        for (let c = 1; c < COURTYARD.cols; c++) {
          g.appendChild(
            svg('line', {
              x1: c * CELL_SIZE,
              y1: 0,
              x2: c * CELL_SIZE,
              y2: COURTYARD.rows * CELL_SIZE,
              stroke: 'var(--hair, #cbd5e1)',
              'stroke-width': 1,
            })
          );
        }
        for (let r = 1; r < COURTYARD.rows; r++) {
          g.appendChild(
            svg('line', {
              x1: 0,
              y1: r * CELL_SIZE,
              x2: COURTYARD.cols * CELL_SIZE,
              y2: r * CELL_SIZE,
              stroke: 'var(--hair, #cbd5e1)',
              'stroke-width': 1,
            })
          );
        }

        // House obstacle blocks
        COURTYARD.places.house.forEach(([hc, hr]) => {
          g.appendChild(
            svg('rect', {
              x: hc * CELL_SIZE + 2,
              y: hr * CELL_SIZE + 2,
              width: CELL_SIZE - 4,
              height: CELL_SIZE - 4,
              fill: '#b35c4a',
              rx: 2,
            })
          );
        });

        const centerOf = (p: readonly [number, number]): [number, number] => [
          p[0] * CELL_SIZE + CELL_SIZE / 2,
          p[1] * CELL_SIZE + CELL_SIZE / 2,
        ];

        // Well
        const wc = centerOf(COURTYARD.places.well);
        g.appendChild(
          svg('circle', {
            cx: wc[0],
            cy: wc[1],
            r: 13,
            fill: 'var(--teal-soft, #ccfbf1)',
            stroke: 'var(--teal, #0f766e)',
            'stroke-width': 3,
          })
        );

        // Tree
        const tc = centerOf(COURTYARD.places.tree);
        g.appendChild(
          svg('circle', {
            cx: tc[0],
            cy: tc[1],
            r: 15,
            fill: 'var(--leaf-soft, #dcfce7)',
            stroke: 'var(--leaf, #15803d)',
            'stroke-width': 2,
          })
        );

        // Tulsi plant
        const tuc = centerOf(COURTYARD.places.tulsi);
        g.appendChild(
          svg('rect', {
            x: tuc[0] - 8,
            y: tuc[1] - 8,
            width: 16,
            height: 16,
            fill: 'var(--leaf, #15803d)',
            rx: 2,
          })
        );

        // Gate
        const gc = centerOf(COURTYARD.places.gate);
        g.appendChild(
          svg('rect', {
            x: gc[0] - 15,
            y: COURTYARD.rows * CELL_SIZE - 4,
            width: 30,
            height: 8,
            fill: 'var(--paper-raised, #ffffff)',
          })
        );

        // Walk path trace
        if (stepNum > 1 && path.length > 1) {
          const pathPoints = path
            .map((p, i) => {
              const cp = centerOf(p);
              return `${i === 0 ? 'M' : 'L'} ${cp[0]} ${cp[1]}`;
            })
            .join(' ');

          g.appendChild(
            svg('path', {
              d: pathPoints,
              fill: 'none',
              stroke: 'var(--thread, #c2410c)',
              'stroke-width': 4,
              'stroke-dasharray': '2 4',
            })
          );
        }

        // Child walker marker
        if (stepNum > 1 && path.length > 0) {
          const last = path[path.length - 1];
          if (last) {
            const current = centerOf(last);
            g.appendChild(
              svg('circle', {
                cx: current[0],
                cy: current[1],
                r: 8,
                fill: 'var(--kumkum, #b91c1c)',
                stroke: 'var(--paper-raised, #ffffff)',
                'stroke-width': 2,
              })
            );
          }
        }

        s.appendChild(g);

        // Compass and legend when flattened
        if (flat >= 1) {
          // North Arrow
          const nTxt = svg('text', {
            x: 338,
            y: 16,
            'text-anchor': 'middle',
            fill: 'var(--ink, #0f172a)',
            'font-size': '13px',
            'font-weight': 'bold',
          });
          nTxt.textContent = 'N';
          s.appendChild(nTxt);

          s.appendChild(
            svg('line', {
              x1: 338,
              y1: 44,
              x2: 338,
              y2: 22,
              stroke: 'var(--ink, #0f172a)',
              'stroke-width': 2,
            })
          );

          // Legend along bottom
          const ly = y0 + COURTYARD.rows * CELL_SIZE + 18;

          // Well legend
          s.appendChild(
            svg('circle', {
              cx: 30,
              cy: ly,
              r: 6,
              fill: 'var(--teal-soft, #ccfbf1)',
              stroke: 'var(--teal, #0f766e)',
              'stroke-width': 2,
            })
          );
          const wellTxt = svg('text', {
            x: 42,
            y: ly + 4,
            fill: 'var(--ink, #0f172a)',
            'font-size': '11px',
          });
          wellTxt.textContent = t('map.well');
          s.appendChild(wellTxt);

          // Tree legend
          s.appendChild(
            svg('circle', {
              cx: 110,
              cy: ly,
              r: 6,
              fill: 'var(--leaf-soft, #dcfce7)',
              stroke: 'var(--leaf, #15803d)',
              'stroke-width': 2,
            })
          );
          const treeTxt = svg('text', {
            x: 122,
            y: ly + 4,
            fill: 'var(--ink, #0f172a)',
            'font-size': '11px',
          });
          treeTxt.textContent = t('map.tree');
          s.appendChild(treeTxt);

          // House legend
          s.appendChild(
            svg('rect', {
              x: 184,
              y: ly - 6,
              width: 12,
              height: 12,
              fill: '#b35c4a',
            })
          );
          const houseTxt = svg('text', {
            x: 202,
            y: ly + 4,
            fill: 'var(--ink, #0f172a)',
            'font-size': '11px',
          });
          houseTxt.textContent = t('map.house');
          s.appendChild(houseTxt);

          // Scale
          const scaleTxt = svg('text', {
            x: 340,
            y: ly + 4,
            'text-anchor': 'end',
            fill: 'var(--ink, #0f172a)',
            'font-size': '11px',
            'font-weight': '600',
          });
          scaleTxt.textContent = t('map.scale', { m: String(SCALE_METRES) });
          s.appendChild(scaleTxt);
        }

        return s;
      }

      function paint(): void {
        state.step = stepNum;
        state.flat = flat;
        state.path = path;
        state.done = done;

        clear(modelCard);
        modelCard.appendChild(renderCourtyardSvg());

        clear(actionsCard);

        const guideEl = el('p', {
          class: 'guide-text',
          text: t(`map.s${stepNum}`),
          style: { fontWeight: '600', marginBottom: '12px' },
        });
        actionsCard.appendChild(guideEl);

        if (stepNum === 1) {
          const showMeBtn = el('button', {
            class: 'btn-action btn-primary',
            text: t('map.showMe'),
            onClick: () => {
              flat = 1;
              stepNum = 2;
              say.textContent = t('map.s1done', { s: String(SCALE_METRES) });
              paint();
            },
          });
          actionsCard.appendChild(showMeBtn);
        } else if (stepNum === 2) {
          const compassContainer = el('div', {
            class: 'compass-pad',
            role: 'group',
            'aria-label': t('map.s2'),
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 60px)',
              gap: '6px',
              justifyContent: 'center',
              margin: '0 auto',
            },
          });

          const makeDirBtn = (dir: CompassDir, label: string) =>
            el('button', {
              class: 'btn-action btn-quiet',
              text: label,
              onClick: () => move(dir),
            });

          // Empty cell (top-left)
          compassContainer.appendChild(el('div'));
          // North
          compassContainer.appendChild(makeDirBtn('N', t('map.dir.N')));
          // Empty cell (top-right)
          compassContainer.appendChild(el('div'));

          // West
          compassContainer.appendChild(makeDirBtn('W', t('map.dir.W')));
          // Center empty
          compassContainer.appendChild(el('div'));
          // East
          compassContainer.appendChild(makeDirBtn('E', t('map.dir.E')));

          // Empty cell (bottom-left)
          compassContainer.appendChild(el('div'));
          // South
          compassContainer.appendChild(makeDirBtn('S', t('map.dir.S')));
          // Empty cell (bottom-right)
          compassContainer.appendChild(el('div'));

          actionsCard.appendChild(compassContainer);

          const undoRow = el('div', {
            class: 'btn-row',
            style: { marginTop: '12px', display: 'flex', justifyContent: 'center' },
          });
          const undoBtn = el('button', {
            class: 'btn-action btn-quiet',
            text: t('common.undo'),
            onClick: () => {
              if (path.length > 1) {
                path.pop();
                say.textContent = '';
                paint();
              }
            },
          });
          undoRow.appendChild(undoBtn);
          actionsCard.appendChild(undoRow);
        } else if (stepNum === 3 && !done) {
          const squaresWalked = path.length - 1;
          const correctMetres = realDistance(squaresWalked, SCALE_METRES);

          const walkedEl = el('p', {
            class: 'muted small',
            text: t('map.walked', { n: String(squaresWalked) }),
            style: { marginBottom: '10px' },
          });
          actionsCard.appendChild(walkedEl);

          const choices = [squaresWalked + SCALE_METRES, correctMetres, squaresWalked];
          const choiceContainer = el('div', {
            class: 'scale-chips-container',
            style: { display: 'flex', gap: '10px', justifyContent: 'center' },
          });

          choices.forEach((v) => {
            const btn = el('button', {
              class: 'btn-choice',
              text: `${v} m`,
              onClick: () => {
                if (v === correctMetres) {
                  done = true;
                  say.textContent = t('map.s3done', {
                    n: String(squaresWalked),
                    m: String(correctMetres),
                    s: String(SCALE_METRES),
                  });
                  paint();
                } else if (v === squaresWalked + SCALE_METRES) {
                  say.textContent = t('map.s3tryAdd');
                } else {
                  say.textContent = t('map.s3try');
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
            onClick: () => router.go('mistake', { knot: 'E4' }),
          });
          actionsCard.appendChild(nextBtn);
        }
      }

      function move(dir: CompassDir): void {
        const current = path[path.length - 1];
        if (!current) return;
        const next = stepCoord(current, dir);

        if (isBlocked(next[0], next[1])) {
          say.textContent = t('map.blocked');
          return;
        }

        path.push(next);
        if (next[0] === wellPos[0] && next[1] === wellPos[1]) {
          stepNum = 3;
          say.textContent = t('map.s2done');
        } else {
          say.textContent = '';
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
