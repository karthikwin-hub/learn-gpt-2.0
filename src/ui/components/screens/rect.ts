/**
 * Rubber Rectangle workbench screen (threads M1, M2, M3, M4).
 * Combines unit tile grid manipulative, synchronized equations (W × H = P),
 * steppers, column method folding, and fading scaffold (Step 1 demo -> Step 2 cut/fold -> Step 3 independent).
 */

import { area, columnMethod, partialProducts } from '../../../domain/math/multiply';
import { t } from '../../../domain/i18n/core';
import { append, clear, createStepper, el } from '../../util/dom';
import { createStepGuide, toMistakeButton } from '../../util/bench';
import { createAreaGrid, type AreaGridInstance } from '../../manipulatives/area-grid';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';

function paintEq(node: HTMLElement, cols: number, rows: number, product: number): void {
  clear(node);
  append(node, [
    el('span', { class: 'a', text: String(cols) }),
    ' × ',
    el('span', { class: 'b', text: String(rows) }),
    ' = ',
    el('span', { class: 'r', text: String(product) }),
  ]);
}

export function createRectScreen(): ScreenMeta {
  return {
    id: 'rect',
    stage: 'manana',
    step: 'abhyasa',
    bench: true,
    title: 'rect.title',
    render(view, state, params = {}) {
      const knotId = params.k || (state.knot as string) || 'M4';
      state.knot = knotId;
      enterThread(knotId, 'rect', params);

      if (params.c) {
        state.cols = parseInt(params.c, 10);
      }
      if (params.r) {
        state.rows = parseInt(params.r, 10);
      }
      if (params.step) {
        state.step = parseInt(params.step, 10);
      }
      if (params.cut === 'true' || params.cut === '1') {
        state.cut = true;
      }

      if (!state.cols) {
        if (knotId === 'M1') {
          state.cols = 4;
          state.rows = 7;
        } else if (knotId === 'M3') {
          state.cols = 8;
          state.rows = 3;
        } else {
          state.cols = 6;
          state.rows = 4;
        }
        state.step = 1;
        state.cut = false;
        state.folded = 0;
      }

      if (Number(state.cols) === 17 && Number(state.rows) === 12) {
        state.step = 3;
        state.cut = true;
        state.step3done = true;
      }

      let cancelDemo: (() => void) | null = null;
      let cleanTimers = () => {};

      const guide = el('div');
      const eq = el('div', { class: 'eq', 'aria-live': 'polite' });
      const partsCard = el('section', { class: 'card' });
      const actionRow = el('div', { class: 'btn-row' });
      const say = el('p', {
        class: 'say workbench-feedback',
        text: t('rect.describe', {
          a: Number(state.cols),
          b: Number(state.rows),
          n: area(Number(state.cols), Number(state.rows)),
        }),
      });

      const grid: AreaGridInstance = createAreaGrid({
        cols: Number(state.cols),
        rows: Number(state.rows),
        handleLabel: t('rect.handle'),
        describe: (c, r) => t('rect.describe', { a: c, b: r, n: area(c, r) }),
        onChange: (c, r) => {
          state.cols = c;
          state.rows = r;
          colStep.set(c);
          rowStep.set(r);
          paint();
        },
        onRelease: () => {
          checkStep3();
        },
      });

      if (state.cut) {
        grid.setCut(true);
      }

      const colStep = createStepper({
        value: Number(state.cols),
        min: 1,
        max: 30,
        label: t('rect.across'),
        onChange: (v) => {
          state.cols = v;
          grid.set(v, Number(state.rows));
          paint();
          checkStep3();
        },
      });

      const rowStep = createStepper({
        value: Number(state.rows),
        min: 1,
        max: 20,
        label: t('rect.down'),
        onChange: (v) => {
          state.rows = v;
          grid.set(Number(state.cols), v);
          paint();
          checkStep3();
        },
      });

      function createColumnBlock(): HTMLElement {
        const c = Number(state.cols);
        const r = Number(state.rows);
        const cm = columnMethod(c, r);
        const col = el('div', {
          class: 'column',
          'aria-label': t('rect.columnLabel'),
        });

        col.appendChild(
          el('div', { class: 'row on' }, [el('span', { class: 'a-txt', text: String(c) })])
        );
        col.appendChild(
          el('div', { class: 'row on' }, [
            document.createTextNode('× '),
            el('span', { class: 'b-txt', text: String(r) }),
          ])
        );
        col.appendChild(el('div', { class: 'rule' }));

        const foldedLevel = Number(state.folded);
        cm.lines.forEach((line, i) => {
          col.appendChild(
            el('div', { class: `row${foldedLevel > i ? ' on' : ''}` }, [
              String(line.value),
              el('span', {
                class: 'note',
                text: `(${c} × ${line.by})`,
              }),
            ])
          );
        });

        col.appendChild(el('div', { class: 'rule' }));
        col.appendChild(
          el(
            'div',
            {
              class: `row${foldedLevel > cm.lines.length ? ' on' : ''}`,
            },
            [el('span', { class: 'r-txt', text: String(cm.total) })]
          )
        );

        return col;
      }

      function updateFeedback(text: string, speak = false): void {
        if (!text) {
          say.hidden = true;
          say.textContent = '';
          return;
        }
        say.textContent = text;
        say.hidden = false;
        if (speak) {
          voice.say(text);
        }
      }

      function paint(): void {
        const c = Number(state.cols);
        const r = Number(state.rows);
        paintEq(eq, c, r, area(c, r));

        clear(partsCard);
        partsCard.hidden = !state.cut;

        if (state.cut) {
          partsCard.appendChild(el('h3', { class: 'pane-title', text: t('rect.parts') }));
          const rooms = partialProducts(c, r);
          partsCard.appendChild(
            el(
              'div',
              { class: 'parts' },
              rooms.map((rm) => el('div', { text: `${rm.w} × ${rm.h} = ${rm.product}` }))
            )
          );
          partsCard.appendChild(
            el('p', {
              class: 'small muted',
              style: { marginTop: '8px' },
              text: `${rooms.map((rm) => rm.product).join(' + ')} = ${area(c, r)}`,
            })
          );

          if (Number(state.folded) > 0) {
            partsCard.appendChild(
              el('div', { class: 'column-wrap' }, [
                createColumnBlock(),
                el('p', {
                  class: 'small muted',
                  style: { flex: '1', minWidth: '140px' },
                  text: t('rect.foldNote'),
                }),
              ])
            );
          }
        }

        paintGuide();
      }

      function paintGuide(): void {
        clear(guide);
        clear(actionRow);

        const currentStep = Number(state.step);

        const rotateArray = () => {
          const prevC = Number(state.cols);
          const prevR = Number(state.rows);
          state.cols = prevR;
          state.rows = prevC;
          grid.set(Number(state.cols), Number(state.rows));
          colStep.set(Number(state.cols));
          rowStep.set(Number(state.rows));
          paint();
          const total = area(Number(state.cols), Number(state.rows));
          const sayKey = knotId === 'M3' ? 'rect.M3.rotateSay' : 'rect.M1.rotateSay';
          updateFeedback(t(sayKey, { a: prevC, b: prevR, c: prevR, d: prevC, n: total }), true);
        };

        if (knotId === 'M3') {
          actionRow.appendChild(
            el('button', {
              class: 'btn thread block',
              type: 'button',
              text: t('rect.turn'),
              'aria-label': t('rect.turn'),
              onclick: rotateArray,
            })
          );
        } else if (knotId === 'M1') {
          guide.appendChild(createStepGuide(1, t('rect.M1.guide')));
          actionRow.appendChild(
            el('button', {
              class: 'btn thread block',
              type: 'button',
              text: t('rect.rotate'),
              'aria-label': t('rect.rotate'),
              onclick: rotateArray,
            })
          );
          const nextM1 = toMistakeButton('M1');
          nextM1.classList.add('btn', 'primary', 'block');
          actionRow.appendChild(nextM1);
        } else if (currentStep === 1) {
          guide.appendChild(createStepGuide(1, t('rect.s1')));
          actionRow.appendChild(
            el('button', {
              class: 'btn thread block',
              type: 'button',
              text: t('rect.showMe'),
              onclick: () => {
                const finishDemo = () => {
                  cancelDemo = null;
                  state.cols = 23;
                  state.rows = 14;
                  grid.set(23, 14);
                  colStep.set(23);
                  rowStep.set(14);
                  state.step = 2;
                  state.cut = true;
                  grid.setCut(true);
                  paint();
                  updateFeedback(t('rect.s1done'), true);
                };

                if (cancelDemo) {
                  cancelDemo();
                  finishDemo();
                  return;
                }
                cancelDemo = grid.demo(23, 14, finishDemo);
              },
            })
          );
        } else if (currentStep === 2) {
          guide.appendChild(createStepGuide(2, t('rect.s2')));
          if (!state.cut) {
            actionRow.appendChild(
              el('button', {
                class: 'btn thread block',
                type: 'button',
                text: t('rect.cut'),
                onclick: () => {
                  state.cut = true;
                  grid.setCut(true);
                  paint();
                  updateFeedback(t('rect.cutSay'), true);
                },
              })
            );
          } else if (Number(state.folded) === 0) {
            actionRow.appendChild(
              el('button', {
                class: 'btn thread block',
                type: 'button',
                text: t('rect.fold'),
                onclick: foldColumns,
              })
            );
          } else {
            actionRow.appendChild(
              el('button', {
                class: 'btn primary block',
                type: 'button',
                text: t('rect.yourTurn'),
                onclick: () => {
                  state.step = 3;
                  grid.focusStrip(null);
                  paint();
                  updateFeedback('', false);
                },
              })
            );
          }
        } else {
          guide.appendChild(createStepGuide(3, t('rect.s3')));
          if (state.step3done) {
            actionRow.appendChild(
              el('button', {
                class: 'btn primary block',
                type: 'button',
                text: t('rect.next'),
                onclick: () => router.go('mistake', { k: 'M4' }),
              })
            );
          }
        }
      }

      function foldColumns(): void {
        const c = Number(state.cols);
        const r = Number(state.rows);
        const lines = columnMethod(c, r).lines;
        const line0 = lines[0];
        if (!line0) return;
        state.folded = 1;
        grid.focusStrip(line0.strip);
        paint();
        updateFeedback(t('rect.foldSay1', { a: c, b: line0.by, n: line0.value }), true);

        const timers: Array<ReturnType<typeof setTimeout>> = [];
        const line1 = lines[1];
        if (line1) {
          timers.push(
            setTimeout(() => {
              state.folded = 2;
              grid.focusStrip(line1.strip);
              paint();
              updateFeedback(t('rect.foldSay2', { a: c, b: line1.by, n: line1.value }), true);
            }, 3600)
          );
        }

        timers.push(
          setTimeout(
            () => {
              state.folded = lines.length + 1;
              grid.focusStrip(null);
              paint();
              updateFeedback(t('rect.foldSay3', { n: area(c, r) }), true);
            },
            lines[1] ? 7200 : 3600
          )
        );

        cleanTimers = () => timers.forEach(clearTimeout);
      }

      function checkStep3(): void {
        if (Number(state.step) !== 3 || state.step3done) return;
        if (Number(state.cols) === 17 && Number(state.rows) === 12) {
          state.step3done = true;
          if (!state.cut) {
            state.cut = true;
            grid.setCut(true);
          }
          paint();
          const rooms = partialProducts(17, 12).map((rm) => rm.product);
          updateFeedback(t('rect.s3done', { parts: rooms.join(' + '), n: 204 }), true);
        }
      }

      const title = el('h2', {
        class: 'screen-title',
        text: t('rect.title'),
        style: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: 'var(--ink, #1f2937)',
        },
      });

      const controlRow = el('div', { class: 'control-row' }, [colStep.node, rowStep.node]);

      view.appendChild(title);
      view.appendChild(grid.node);
      view.appendChild(controlRow);
      view.appendChild(eq);
      view.appendChild(partsCard);
      view.appendChild(guide);
      view.appendChild(say);
      view.appendChild(actionRow);

      paint();

      return () => {
        if (cancelDemo) cancelDemo();
        cleanTimers();
        grid.destroy();
      };
    },
  };
}
