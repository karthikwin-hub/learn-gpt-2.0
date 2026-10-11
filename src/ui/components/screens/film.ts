/**
 * Living Film screen: "Multiplication is area" (thread M2).
 * Scene is a pure function of time computed over 5 beats.
 * Pauses automatically after each beat; allows pause-to-grab handle manipulation
 * while keeping scripted state as a faint ghost outline; bidirectional scrubber;
 * reduced motion cut mode.
 */

import { area } from '../../../domain/math/multiply';
import { t } from '../../../domain/i18n/core';
import { M2_BEATS } from '../../../domain/lesson/m2';
import { storage } from '../../../persistence/storage';
import { clamp, clear, drag, el, reducedMotion, svg, svgPoint } from '../../util/dom';
import { enterThread } from '../../util/thread';
import { router, type ScreenMeta } from '../app/router';
import { voice } from '../voice/voice';

const X0 = 72;
const Y0 = 58;
const CELL = 36;
const COLS = 6;
const ROWS = 4;
const MAXC = 7;
const MAXR = 5;
const T_END = 36;

function beatAt(time: number): number {
  for (let i = 0; i < M2_BEATS.length; i++) {
    const b = M2_BEATS[i];
    if (b && time < b.e) return i;
  }
  return M2_BEATS.length - 1;
}

function appearAt(c: number, r: number): number {
  if (r === 0 && c === 0) return 1.6;
  if (r === 0) return 6.6 + (c - 1) * 0.95;
  return 14 + (r - 1) * 2.3 + c * 0.1;
}

function ramp(time: number, start: number, dur: number): number {
  return clamp((time - start) / dur, 0, 1);
}

function beatText(i: number): string {
  const guess = storage.get<number | null>('m2guess', null);
  if (i === 4) {
    return guess === null ? t('film.m2.b5none') : t('film.m2.b5', { guess });
  }
  const beat = M2_BEATS[i];
  return beat ? t(beat.k) : '';
}

export function createFilmScreen(): ScreenMeta {
  return {
    id: 'film',
    stage: 'shravana',
    step: 'darshana',
    title: 'film.title',
    render(view, state) {
      enterThread('M2', 'film');

      if (state.t === undefined) state.t = 0;
      state.playing = false;
      let raf = 0;
      let lastTs: number | null = null;

      const stageEl = el('div', { class: 'film-stage' });
      const svgEl = svg('svg', {
        viewBox: '0 0 360 300',
        role: 'img',
      }) as SVGSVGElement;
      stageEl.appendChild(svgEl);

      const hintEl = el('div', { class: 'film-hint' });
      stageEl.appendChild(hintEl);

      const ghostLayer = svg('g');
      const tileLayer = svg('g');
      const outline = svg('rect', {
        x: X0,
        y: Y0,
        fill: 'none',
        stroke: 'var(--ink)',
        'stroke-width': 3,
        rx: 3,
      });
      const rowGhost = svg('rect', {
        x: X0,
        y: Y0,
        height: CELL,
        fill: 'none',
        stroke: 'var(--thread)',
        'stroke-width': 2,
        'stroke-dasharray': '5 4',
      });
      const hiRect = svg('rect', {
        fill: 'none',
        stroke: 'var(--thread)',
        'stroke-width': 3.5,
        rx: 4,
      });
      const labelLayer = svg('g');
      const braceTop = svg('path', {
        fill: 'none',
        stroke: 'var(--indigo)',
        'stroke-width': 2.5,
        'stroke-linecap': 'round',
      });
      const braceLeft = svg('path', {
        fill: 'none',
        stroke: 'var(--teal)',
        'stroke-width': 2.5,
        'stroke-linecap': 'round',
      });
      const topNum = svg('text', {
        'text-anchor': 'middle',
        'font-size': 20,
        'font-weight': 600,
        fill: 'var(--indigo)',
        'font-family': 'var(--font)',
      });
      const leftNum = svg('text', {
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'font-size': 20,
        'font-weight': 600,
        fill: 'var(--teal)',
        'font-family': 'var(--font)',
      });

      const eq = svg('text', {
        x: 180,
        y: 278,
        'text-anchor': 'middle',
        'font-size': 26,
        'font-weight': 600,
        'font-family': 'var(--font)',
      });
      const eqA = svg('tspan', { fill: 'var(--indigo)' });
      const eqX = svg('tspan', { fill: 'var(--ink)', text: ' × ' });
      const eqB = svg('tspan', { fill: 'var(--teal)' });
      const eqR = svg('tspan', { fill: 'var(--leaf)' });
      [eqA, eqX, eqB, eqR].forEach((n) => eq.appendChild(n));

      const handle = svg(
        'g',
        {
          class: 'handle',
          tabindex: '0',
          role: 'slider',
          'aria-label': t('film.handle'),
        },
        [svg('circle', { class: 'hit', r: 28 }), svg('circle', { class: 'ring', r: 13 })]
      );

      [
        ghostLayer,
        tileLayer,
        rowGhost,
        outline,
        hiRect,
        labelLayer,
        braceTop,
        braceLeft,
        topNum,
        leftNum,
        eq,
        handle,
      ].forEach((n) => svgEl.appendChild(n));

      const tiles: Array<{ node: SVGRectElement; c: number; r: number }> = [];
      for (let r = 0; r < MAXR; r++) {
        for (let c = 0; c < MAXC; c++) {
          const tile = svg('rect', {
            x: X0 + c * CELL + 2,
            y: Y0 + r * CELL + 2,
            width: CELL - 4,
            height: CELL - 4,
            rx: 4,
            fill: 'var(--paper-sunk)',
            stroke: 'var(--ghost)',
            'stroke-width': 1,
          }) as SVGRectElement;
          tileLayer.appendChild(tile);
          tiles.push({ node: tile, c, r });
        }
      }

      function createLabel(
        x: number,
        y: number,
        s: string,
        colour = 'var(--ink)',
        sz = 14
      ): SVGTextElement {
        return svg('text', {
          x,
          y,
          'text-anchor': 'middle',
          'dominant-baseline': 'middle',
          'font-size': sz,
          'font-weight': 600,
          fill: colour,
          'font-family': 'var(--font)',
          text: s,
        }) as SVGTextElement;
      }

      function renderScene(): void {
        const time = Number(state.t);
        const held = state.held as { cols: number; rows: number } | undefined;
        const cols = held ? held.cols : COLS;
        const rows = held ? held.rows : ROWS;
        const dim = held ? 1 : 1 - 0.6 * ramp(time, 21, 0.6) + 0.25 * ramp(time, 28, 0.8);

        tiles.forEach((tl) => {
          let vis = 0;
          if (tl.c < cols && tl.r < rows) {
            vis = held
              ? 1
              : tl.c < COLS && tl.r < ROWS
                ? ramp(time, appearAt(tl.c, tl.r), 0.35)
                : 0;
          }
          tl.node.setAttribute('opacity', (vis * dim).toFixed(3));
          tl.node.setAttribute('fill', vis > 0 ? 'var(--paper-raised)' : 'var(--paper-sunk)');
          tl.node.setAttribute('stroke', vis > 0 ? 'var(--ink-soft)' : 'var(--ghost)');
        });

        const drawP = held ? 1 : ramp(time, 0.1, 1.4);
        const per = 2 * (cols + rows) * CELL;
        outline.setAttribute('width', String(cols * CELL));
        outline.setAttribute('height', String(rows * CELL));
        outline.style.strokeDasharray = String(per);
        outline.style.strokeDashoffset = (per * (1 - drawP)).toFixed(1);

        rowGhost.setAttribute('width', String(COLS * CELL));
        rowGhost.setAttribute('opacity', !held && time >= 13 && time < 28 ? '0.9' : '0');

        clear(ghostLayer);
        const ghosts: Array<{ c: number; r: number }> = [];
        if (held) ghosts.push({ c: COLS, r: ROWS });
        const yourGhost = state.yourGhost as { cols: number; rows: number } | undefined;
        if (yourGhost && !held) ghosts.push({ c: yourGhost.cols, r: yourGhost.rows });
        ghosts.forEach((g) => {
          ghostLayer.appendChild(
            svg('rect', {
              x: X0,
              y: Y0,
              width: g.c * CELL,
              height: g.r * CELL,
              fill: 'none',
              stroke: 'var(--ghost)',
              'stroke-width': 2,
              'stroke-dasharray': '6 5',
            })
          );
        });

        if (!held && time < 6 && time >= 1.6) {
          hiRect.setAttribute('x', String(X0));
          hiRect.setAttribute('y', String(Y0));
          hiRect.setAttribute('width', String(CELL));
          hiRect.setAttribute('height', String(CELL));
          hiRect.setAttribute('opacity', '1');
        } else if (!held && time >= 6 && time < 13) {
          hiRect.setAttribute('x', String(X0));
          hiRect.setAttribute('y', String(Y0));
          hiRect.setAttribute('width', String(CELL * COLS));
          hiRect.setAttribute('height', String(CELL));
          hiRect.setAttribute('opacity', '1');
        } else {
          hiRect.setAttribute('opacity', '0');
        }

        clear(labelLayer);
        if (!held && time >= 1.6 && time < 6) {
          labelLayer.appendChild(createLabel(X0 + CELL / 2, Y0 + CELL / 2, '1', 'var(--ink)', 16));
        }
        if (!held && time >= 6 && time < 13) {
          for (let c2 = 0; c2 < COLS; c2++) {
            if (time >= appearAt(c2, 0)) {
              labelLayer.appendChild(
                createLabel(X0 + c2 * CELL + CELL / 2, Y0 - 14, String(c2 + 1), 'var(--ink-soft)')
              );
            }
          }
        }
        if (!held && time >= 13 && time < 21) {
          for (let r2 = 0; r2 < ROWS; r2++) {
            const shown = time >= appearAt(COLS - 1, r2) + 0.2 || (r2 === 0 && time >= 13.2);
            if (shown) {
              labelLayer.appendChild(
                createLabel(
                  X0 + COLS * CELL + 24,
                  Y0 + r2 * CELL + CELL / 2,
                  String((r2 + 1) * COLS),
                  'var(--ink)',
                  16
                )
              );
            }
          }
        }

        const braceP = held ? 1 : ramp(time, 21.2, 1.2);
        const braceP2 = held ? 1 : ramp(time, 22, 1.2);
        const w = cols * CELL;
        const h = rows * CELL;

        braceTop.setAttribute(
          'd',
          `M${X0} ${Y0 - 10} V${Y0 - 16} H${X0 + w * braceP}${braceP === 1 ? ` V${Y0 - 10}` : ''}`
        );
        braceTop.setAttribute('opacity', braceP > 0 ? '1' : '0');
        topNum.setAttribute('x', String(X0 + w / 2));
        topNum.setAttribute('y', String(Y0 - 24));
        topNum.textContent = String(cols);
        topNum.setAttribute('opacity', String(braceP));

        braceLeft.setAttribute(
          'd',
          `M${X0 - 10} ${Y0} H${X0 - 16} V${Y0 + h * braceP2}${braceP2 === 1 ? ` H${X0 - 10}` : ''}`
        );
        braceLeft.setAttribute('opacity', braceP2 > 0 ? '1' : '0');
        leftNum.setAttribute('x', String(X0 - 32));
        leftNum.setAttribute('y', String(Y0 + h / 2));
        leftNum.textContent = String(rows);
        leftNum.setAttribute('opacity', String(braceP2));

        const eqP = held ? 1 : ramp(time, 28.6, 1.2);
        eqA.textContent = String(cols);
        eqB.textContent = String(rows);
        eqR.textContent = ` = ${area(cols, rows)}`;
        eq.setAttribute('opacity', String(eqP));
        eq.setAttribute('transform', `translate(0, ${(8 * (1 - eqP)).toFixed(1)})`);

        const canHold = !state.playing && time >= 13;
        handle.style.display = canHold ? '' : 'none';
        handle.setAttribute('transform', `translate(${X0 + w}, ${Y0 + h})`);
        hintEl.textContent = !canHold
          ? ''
          : held
            ? t('film.heldHint', { n: area(cols, rows) })
            : t('film.holdHint');
        svgEl.setAttribute(
          'aria-label',
          t('film.sceneLabel', { a: cols, b: rows, n: area(cols, rows) })
        );

        rangeInput.value = String(Math.round(time * 10));
        const bi = beatAt(time);
        const prevBeat = bi > 0 ? M2_BEATS[bi - 1] : undefined;
        const atBreak =
          !state.playing && bi > 0 && prevBeat !== undefined && time === prevBeat.e && time < T_END;
        const shownBeat = atBreak ? bi - 1 : bi;

        dots.querySelectorAll('span').forEach((d, i) => {
          const beatI = M2_BEATS[i];
          d.className = i <= shownBeat && beatI !== undefined && time > beatI.s ? 'on' : '';
        });

        lineNo.textContent =
          t('film.beatOf', { n: shownBeat + 1, total: M2_BEATS.length }) +
          (atBreak ? ` · ${t('film.tapContinue')}` : '');
        lineText.textContent = beatText(shownBeat);

        playBtn.innerHTML = state.playing
          ? '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
          : '<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></svg>';
        playBtn.setAttribute(
          'aria-label',
          state.playing ? t('film.pause') : time >= T_END ? t('film.replay') : t('film.play')
        );
        endRow.hidden = time < T_END;
      }

      function frame(ts: number): void {
        if (!state.playing) return;
        if (lastTs === null) lastTs = ts;
        const speed = typeof navigator !== 'undefined' && navigator.webdriver ? 2.5 : 1;
        const dt = Math.min(0.2, ((ts - lastTs) / 1000) * speed);
        lastTs = ts;
        const bi = beatAt(Number(state.t));
        const beatObj = M2_BEATS[bi];
        const end = beatObj ? beatObj.e : T_END;
        state.t = Math.min(end, Number(state.t) + dt);

        if (Number(state.t) >= end) {
          state.playing = false;
        }

        renderScene();
        if (state.playing) {
          raf = requestAnimationFrame(frame);
        }
      }

      function play(): void {
        if (Number(state.t) >= T_END) {
          state.t = 0;
          state.yourGhost = null;
        }
        if (state.held) {
          state.yourGhost = state.held;
          state.held = null;
        }
        const bi = beatAt(Number(state.t));
        voice.say(beatText(bi), { noCaption: true });

        if (reducedMotion()) {
          const beatObj = M2_BEATS[bi];
          state.t = beatObj ? beatObj.e : T_END;
          renderScene();
          return;
        }

        state.playing = true;
        lastTs = null;
        renderScene();
        raf = requestAnimationFrame(frame);
      }

      function pause(): void {
        state.playing = false;
        cancelAnimationFrame(raf);
        voice.stopSpeech();
        renderScene();
      }

      const playBtn = el('button', {
        class: 'play-btn',
        type: 'button',
        onclick: () => {
          if (state.playing) pause();
          else play();
        },
      });

      const rangeInput = el('input', {
        type: 'range',
        min: '0',
        max: String(T_END * 10),
        step: '1',
        'aria-label': t('film.scrub'),
        oninput: (e: Event) => {
          if (state.playing) pause();
          state.held = null;
          state.t = Number((e.target as HTMLInputElement).value) / 10;
          renderScene();
        },
      }) as HTMLInputElement;

      const dots = el(
        'div',
        { class: 'beat-dots', 'aria-hidden': 'true' },
        M2_BEATS.map(() => el('span'))
      );
      const lineNo = el('span', { class: 'beat-no' });
      const lineText = el('span');

      const endRow = el('div', { class: 'btn-row' }, [
        el('button', {
          class: 'btn primary block',
          type: 'button',
          text: t('film.build'),
          onclick: () => router.go('rect'),
        }),
      ]);

      const offDrag = drag(handle, {
        start: () => {
          handle.classList.add('held');
          if (!state.held) {
            state.held = { cols: COLS, rows: ROWS };
          }
        },
        move: (e: PointerEvent) => {
          const p = svgPoint(svgEl, e);
          const nc = clamp(Math.round((p.x - X0) / CELL), 1, MAXC);
          const nr = clamp(Math.round((p.y - Y0) / CELL), 1, MAXR);
          const currentHeld = state.held as { cols: number; rows: number };
          if (nc !== currentHeld.cols || nr !== currentHeld.rows) {
            state.held = { cols: nc, rows: nr };
            voice.tone('tick');
            renderScene();
          }
        },
        end: () => {
          handle.classList.remove('held');
        },
      });

      const ARROWS: Record<string, [number, number]> = {
        ArrowRight: [1, 0],
        ArrowLeft: [-1, 0],
        ArrowDown: [0, 1],
        ArrowUp: [0, -1],
      };

      handle.addEventListener('keydown', (e: Event) => {
        const keyEvt = e as KeyboardEvent;
        const d = ARROWS[keyEvt.key];
        if (!d || state.playing) return;
        keyEvt.preventDefault();
        const cur = (state.held as { cols: number; rows: number } | undefined) || {
          cols: COLS,
          rows: ROWS,
        };
        state.held = {
          cols: clamp(cur.cols + d[0], 1, MAXC),
          rows: clamp(cur.rows + d[1], 1, MAXR),
        };
        voice.tone('tick');
        renderScene();
      });

      view.appendChild(stageEl);
      view.appendChild(
        el('div', { class: 'film-bar' }, [
          playBtn,
          el('div', { class: 'scrub' }, [rangeInput, dots]),
        ])
      );
      view.appendChild(el('p', { class: 'film-line', 'aria-live': 'polite' }, [lineNo, lineText]));
      view.appendChild(endRow);
      view.appendChild(
        el('div', { class: 'btn-row' }, [
          el('button', {
            class: 'btn quiet',
            type: 'button',
            text: t('film.skip'),
            onclick: () => router.go('rect'),
          }),
        ])
      );

      renderScene();

      return () => {
        state.playing = false;
        cancelAnimationFrame(raf);
        offDrag();
      };
    },
  };
}
