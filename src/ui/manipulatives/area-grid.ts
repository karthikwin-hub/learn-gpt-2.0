/**
 * Rubber Rectangle manipulative: a grid of unit tiles whose corner the child drags,
 * steps with buttons, or manipulates with keyboard arrow keys.
 * Cut at tens reveals the four rooms of the distributive law.
 */

import { area, partialProducts, splitTensOnes } from '../../domain/math/multiply';
import { clamp, clear, drag, reducedMotion, svg, svgPoint } from '../util/dom';
import { voice } from '../components/voice/voice';

export interface AreaGridOptions {
  cols: number;
  rows: number;
  maxCols?: number;
  maxRows?: number;
  cell?: number;
  handleLabel?: string;
  describe?: (c: number, r: number) => string;
  onChange?: (c: number, r: number) => void;
  onRelease?: (c: number, r: number) => void;
}

export interface AreaGridInstance {
  node: SVGSVGElement;
  set: (c: number, r: number) => void;
  get: () => { cols: number; rows: number };
  setCut: (on: boolean) => void;
  isCut: () => boolean;
  focusStrip: (strip: string | null) => void;
  clearGhosts: () => void;
  demo: (tc: number, tr: number, done?: () => void) => () => void;
  destroy: () => void;
}

export function createAreaGrid(opts: AreaGridOptions): AreaGridInstance {
  const maxCols = opts.maxCols || 30;
  const maxRows = opts.maxRows || 20;
  const cell = opts.cell || 11;
  const padL = 34;
  const padT = 34;
  const padR = 22;
  const padB = 22;
  const W = padL + maxCols * cell + padR;
  const H = padT + maxRows * cell + padB;
  let cols = opts.cols;
  let rows = opts.rows;
  let cut = false;
  let focus: string | null = null;
  const ghosts: Array<{ c: number; r: number }> = [];
  const uid = 'ag' + Math.random().toString(36).slice(2, 7);

  const root = svg('svg', {
    class: 'area-grid manip-grid',
    viewBox: `0 0 ${W} ${H}`,
    role: 'group',
  }) as SVGSVGElement;

  const defs = svg('defs');
  const pattern = svg(
    'pattern',
    {
      id: `${uid}-tile`,
      width: cell,
      height: cell,
      patternUnits: 'userSpaceOnUse',
    },
    [
      svg('rect', {
        x: 0.9,
        y: 0.9,
        width: cell - 1.8,
        height: cell - 1.8,
        rx: 1.8,
        fill: 'var(--paper-raised)',
        stroke: 'var(--ghost)',
        'stroke-width': 0.8,
      }),
    ]
  );
  defs.appendChild(pattern);
  root.appendChild(defs);

  const field = svg('g', { transform: `translate(${padL},${padT})` });
  root.appendChild(field);

  const dotLayer = svg('g', { opacity: 0.5 });
  for (let i = 0; i <= maxCols; i += 5) {
    for (let j = 0; j <= maxRows; j += 5) {
      dotLayer.appendChild(
        svg('circle', {
          cx: i * cell,
          cy: j * cell,
          r: 1.2,
          fill: 'var(--ink-soft)',
        })
      );
    }
  }
  field.appendChild(dotLayer);

  const ghostLayer = svg('g');
  const tiles = svg('rect', { x: 0, y: 0, fill: `url(#${uid}-tile)` });
  const roomLayer = svg('g');
  const edge = svg('rect', {
    x: 0,
    y: 0,
    fill: 'none',
    stroke: 'var(--thread)',
    'stroke-width': 3,
    rx: 2,
  });
  const cutLayer = svg('g');
  const labelLayer = svg('g');

  field.appendChild(ghostLayer);
  field.appendChild(tiles);
  field.appendChild(roomLayer);
  field.appendChild(edge);
  field.appendChild(cutLayer);
  field.appendChild(labelLayer);

  const handle = svg(
    'g',
    {
      class: 'handle',
      tabindex: '0',
      role: 'slider',
      'aria-label': opts.handleLabel || '',
    },
    [svg('circle', { class: 'hit', r: 28 }), svg('circle', { class: 'ring', r: 13 })]
  );
  const finger = svg('circle', {
    r: 20,
    fill: 'var(--ink)',
    opacity: 0,
    'pointer-events': 'none',
  });
  field.appendChild(handle);
  field.appendChild(finger);

  const ROOM_FILL = [
    'var(--indigo-soft)',
    'var(--teal-soft)',
    'var(--leaf-soft)',
    'var(--thread-soft)',
  ];

  function createText(
    x: number,
    y: number,
    s: string,
    cls: 'big' | 'small',
    anchor = 'middle',
    color = 'var(--ink)'
  ): SVGTextElement {
    return svg('text', {
      x,
      y,
      'text-anchor': anchor,
      'dominant-baseline': 'middle',
      'font-size': cls === 'big' ? 14 : 12,
      'font-weight': 600,
      fill: color,
      'font-family': 'var(--font)',
      text: s,
    }) as SVGTextElement;
  }

  function paint(): void {
    const w = cols * cell;
    const h = rows * cell;
    tiles.setAttribute('width', String(w));
    tiles.setAttribute('height', String(h));
    edge.setAttribute('width', String(w));
    edge.setAttribute('height', String(h));
    handle.setAttribute('transform', `translate(${w},${h})`);
    handle.setAttribute('aria-valuetext', `${cols} × ${rows} = ${area(cols, rows)}`);
    root.setAttribute(
      'aria-label',
      opts.describe ? opts.describe(cols, rows) : `${cols} × ${rows}`
    );

    clear(labelLayer);
    labelLayer.appendChild(
      svg('path', {
        d: `M0 -12 V-17 H${w} V-12`,
        fill: 'none',
        stroke: 'var(--indigo)',
        'stroke-width': 2,
      })
    );
    labelLayer.appendChild(createText(w / 2, -26, String(cols), 'big', 'middle', 'var(--indigo)'));
    labelLayer.appendChild(
      svg('path', {
        d: `M-12 0 H-17 V${h} H-12`,
        fill: 'none',
        stroke: 'var(--teal)',
        'stroke-width': 2,
      })
    );
    labelLayer.appendChild(createText(-25, h / 2, String(rows), 'big', 'middle', 'var(--teal)'));

    clear(roomLayer);
    clear(cutLayer);

    if (cut) {
      const rooms = partialProducts(cols, rows);
      const rowTens = splitTensOnes(rows).tens;

      rooms.forEach((r, idx) => {
        const strip = rowTens > 0 && r.y === 0 ? 'tens' : 'ones';
        const isFocus = focus === null || focus === strip;

        roomLayer.appendChild(
          svg('rect', {
            x: r.x * cell,
            y: r.y * cell,
            width: r.w * cell,
            height: r.h * cell,
            fill: ROOM_FILL[idx % 4],
            opacity: isFocus ? 1 : 0.25,
          })
        );

        const cx = (r.x + r.w / 2) * cell;
        const cy = (r.y + r.h / 2) * cell;
        const fits = r.w * cell >= 30 && r.h * cell >= 22;
        const labelEl = createText(cx, cy, String(r.product), fits ? 'big' : 'small');

        if (!fits) {
          labelEl.setAttribute('x', String(r.x * cell + r.w * cell + 4));
          labelEl.setAttribute('text-anchor', 'start');
          if (r.x * cell + r.w * cell + 30 > maxCols * cell) {
            labelEl.setAttribute('x', String(cx));
            labelEl.setAttribute('y', String((r.y + r.h) * cell + 10));
            labelEl.setAttribute('text-anchor', 'middle');
          }
        }
        labelEl.setAttribute('opacity', isFocus ? '1' : '0.35');
        roomLayer.appendChild(labelEl);
      });

      const c = splitTensOnes(cols);
      const rr = splitTensOnes(rows);

      if (c.tens > 0 && c.ones > 0) {
        cutLayer.appendChild(
          svg('line', {
            x1: c.tens * cell,
            y1: -4,
            x2: c.tens * cell,
            y2: h + 4,
            stroke: 'var(--thread)',
            'stroke-width': 2.5,
            'stroke-linecap': 'round',
          })
        );
      }
      if (rr.tens > 0 && rr.ones > 0) {
        cutLayer.appendChild(
          svg('line', {
            x1: -4,
            y1: rr.tens * cell,
            x2: w + 4,
            y2: rr.tens * cell,
            stroke: 'var(--thread)',
            'stroke-width': 2.5,
            'stroke-linecap': 'round',
          })
        );
      }
    }
  }

  function setDimensions(c: number, r: number, silent = false): void {
    const nextC = clamp(Math.round(c), 1, maxCols);
    const nextR = clamp(Math.round(r), 1, maxRows);
    if (nextC === cols && nextR === rows) return;
    cols = nextC;
    rows = nextR;
    paint();
    if (!silent) {
      voice.tone('tick');
      if (opts.onChange) opts.onChange(cols, rows);
    }
  }

  function addGhost(): void {
    ghosts.push({ c: cols, r: rows });
    if (ghosts.length > 6) ghosts.shift();
    clear(ghostLayer);
    ghosts.forEach((g) => {
      ghostLayer.appendChild(
        svg('rect', {
          x: 0,
          y: 0,
          width: g.c * cell,
          height: g.r * cell,
          fill: 'none',
          stroke: 'var(--ghost)',
          'stroke-width': 1.5,
          'stroke-dasharray': '4 3',
        })
      );
    });
  }

  let startDims: { c: number; r: number } | null = null;
  const offDrag = drag(handle, {
    start: () => {
      handle.classList.add('held');
      startDims = { c: cols, r: rows };
    },
    move: (e: PointerEvent) => {
      const p = svgPoint(root, e);
      setDimensions((p.x - padL) / cell, (p.y - padT) / cell);
    },
    end: () => {
      handle.classList.remove('held');
      if (startDims && (startDims.c !== cols || startDims.r !== rows)) {
        const keep = { c: cols, r: rows };
        cols = startDims.c;
        rows = startDims.r;
        addGhost();
        cols = keep.c;
        rows = keep.r;
        if (opts.onRelease) opts.onRelease(cols, rows);
      }
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
    const diff = ARROWS[keyEvt.key];
    if (diff) {
      keyEvt.preventDefault();
      setDimensions(cols + diff[0], rows + diff[1]);
    }
  });

  function demo(tc: number, tr: number, done?: () => void): () => void {
    const fc = cols;
    const fr = rows;
    finger.setAttribute('opacity', '0.18');
    let cancelled = false;
    let animId = 0;
    const duration = reducedMotion() ? 10 : 1600;
    let startTime: number | null = null;

    function frame(ts: number) {
      if (cancelled) return;
      if (startTime === null) startTime = ts;
      const progress = clamp((ts - startTime) / duration, 0, 1);
      // easeInOut cubic
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const curC = fc + (tc - fc) * ease;
      const curR = fr + (tr - fr) * ease;
      finger.setAttribute('cx', String(curC * cell));
      finger.setAttribute('cy', String(curR * cell));
      setDimensions(curC, curR, true);

      if (progress < 1) {
        animId = requestAnimationFrame(frame);
      } else {
        finger.setAttribute('opacity', '0');
        setDimensions(tc, tr, true);
        if (opts.onChange) opts.onChange(cols, rows);
        if (done) done();
      }
    }

    animId = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      finger.setAttribute('opacity', '0');
    };
  }

  paint();

  return {
    node: root,
    set: (c: number, r: number) => setDimensions(c, r, true),
    get: () => ({ cols, rows }),
    setCut: (on: boolean) => {
      cut = on;
      paint();
    },
    isCut: () => cut,
    focusStrip: (strip: string | null) => {
      focus = strip;
      paint();
    },
    clearGhosts: () => {
      ghosts.length = 0;
      clear(ghostLayer);
    },
    demo,
    destroy: offDrag,
  };
}
