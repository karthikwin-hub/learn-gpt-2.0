/**
 * Rope and Pegs manipulative (G2).
 * A closed rope of fixed length around four pegs.
 * The free corner slides along the diagonal where width + height = half the perimeter,
 * keeping perimeter constant while area changes.
 * Based on Sulba Sutras rope geometry.
 */

import { maxAreaRect, ropeOptions, ropeRect, type RopeRectangle } from '../../domain/math/geometry';
import { voice } from '../components/voice/voice';
import { clear, drag, svg, svgPoint } from '../util/dom';

const CELL = 24;
const X0 = 34;
const Y0 = 30;
const W = 360;
const H = 330;

export interface RopeOptions {
  perimeter: number;
  width?: number;
  initialTried?: Record<number, RopeRectangle>;
  handleLabel: string;
  onChange?: (rect: RopeRectangle, tried: Record<number, RopeRectangle>) => void;
  onRelease?: (rect: RopeRectangle, tried: Record<number, RopeRectangle>) => void;
}

export interface RopeManipulative {
  node: SVGSVGElement;
  set: (w: number, silent?: boolean) => void;
  get: () => RopeRectangle;
  tried: () => Record<number, RopeRectangle>;
  setPerimeter: (p: number) => void;
  destroy: () => void;
}

export function createRopeManipulative(opts: RopeOptions): RopeManipulative {
  let perimeter = opts.perimeter;
  let rect = ropeRect(perimeter, opts.width ?? 1);
  let tried: Record<number, RopeRectangle> = opts.initialTried ? { ...opts.initialTried } : {};
  const uid = 'rp' + Math.random().toString(36).slice(2, 7);

  const root = svg('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'img',
    class: 'rope-manipulative',
  });

  const defs = svg('defs', {}, [
    svg(
      'pattern',
      {
        id: `${uid}-m`,
        width: CELL,
        height: CELL,
        patternUnits: 'userSpaceOnUse',
        x: X0,
        y: Y0,
      },
      [
        svg('rect', {
          x: 1.2,
          y: 1.2,
          width: CELL - 2.4,
          height: CELL - 2.4,
          rx: 3,
          fill: 'var(--leaf-soft)',
        }),
      ]
    ),
  ]);
  root.appendChild(defs);

  // Background 12x12 grid
  const grid = svg('g', { opacity: 0.55 });
  for (let i = 0; i <= 12; i++) {
    grid.appendChild(
      svg('line', {
        x1: X0 + i * CELL,
        y1: Y0,
        x2: X0 + i * CELL,
        y2: Y0 + 12 * CELL,
        stroke: 'var(--hair)',
        'stroke-width': 1,
      })
    );
    grid.appendChild(
      svg('line', {
        x1: X0,
        y1: Y0 + i * CELL,
        x2: X0 + 12 * CELL,
        y2: Y0 + i * CELL,
        stroke: 'var(--hair)',
        'stroke-width': 1,
      })
    );
  }
  root.appendChild(grid);

  const guide = svg('line', {
    stroke: 'var(--thread)',
    'stroke-width': 2,
    'stroke-dasharray': '2 6',
    'stroke-linecap': 'round',
    opacity: 0.7,
  });

  const ghostLayer = svg('g', { class: 'ghost-layer' });
  const fill = svg('rect', { x: X0, y: Y0, fill: `url(#${uid}-m)` });
  const ropeA = svg('rect', {
    x: X0,
    y: Y0,
    fill: 'none',
    stroke: 'var(--thread)',
    'stroke-width': 6,
    rx: 3,
  });
  const ropeB = svg('rect', {
    x: X0,
    y: Y0,
    fill: 'none',
    stroke: '#9A6512',
    'stroke-width': 1.6,
    'stroke-dasharray': '3 5',
    rx: 3,
    opacity: 0.8,
  });
  const pegs = svg('g', { class: 'pegs' });
  const labels = svg('g', { class: 'labels' });
  const handle = svg(
    'g',
    {
      class: 'handle',
      tabindex: 0,
      role: 'slider',
      'aria-label': opts.handleLabel,
    },
    [
      svg('circle', { class: 'hit', r: 30, fill: 'transparent' }),
      svg('circle', {
        class: 'ring',
        r: 13,
        fill: 'var(--paper)',
        stroke: 'var(--thread)',
        'stroke-width': 4,
      }),
    ]
  );

  [guide, ghostLayer, fill, ropeA, ropeB, pegs, labels, handle].forEach((n) => root.appendChild(n));

  function createText(
    x: number,
    y: number,
    text: string,
    color: string,
    size: number = 14
  ): SVGTextElement {
    return svg('text', {
      x,
      y,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      'font-size': size,
      'font-weight': 600,
      fill: color,
      'font-family': 'var(--font)',
      text,
    });
  }

  function paintGhosts(): void {
    clear(ghostLayer);
    Object.values(tried).forEach((r) => {
      if (r.w === rect.w) return;
      ghostLayer.appendChild(
        svg('rect', {
          x: X0,
          y: Y0,
          width: r.w * CELL,
          height: r.h * CELL,
          fill: 'none',
          stroke: 'var(--ghost)',
          'stroke-width': 1.5,
          'stroke-dasharray': '4 3',
        })
      );
    });
  }

  function paint(): void {
    const half = perimeter / 2;
    guide.setAttribute('x1', String(X0 + 1 * CELL));
    guide.setAttribute('y1', String(Y0 + (half - 1) * CELL));
    guide.setAttribute('x2', String(X0 + (half - 1) * CELL));
    guide.setAttribute('y2', String(Y0 + 1 * CELL));

    const w = rect.w * CELL;
    const h = rect.h * CELL;
    [fill, ropeA, ropeB].forEach((n) => {
      n.setAttribute('width', String(w));
      n.setAttribute('height', String(h));
    });

    clear(pegs);
    [
      [0, 0],
      [w, 0],
      [0, h],
    ].forEach((p) => {
      pegs.appendChild(
        svg('circle', {
          cx: X0 + p[0]!,
          cy: Y0 + p[1]!,
          r: 6.5,
          fill: 'var(--ink)',
        })
      );
    });

    handle.setAttribute('transform', `translate(${X0 + w},${Y0 + h})`);
    handle.setAttribute('aria-valuetext', `${rect.w} × ${rect.h}`);

    clear(labels);
    labels.appendChild(createText(X0 + w / 2, Y0 - 14, `${rect.w} m`, 'var(--indigo)'));
    labels.appendChild(createText(X0 - 18, Y0 + h / 2, `${rect.h} m`, 'var(--teal)'));
    if (w >= 40 && h >= 30) {
      labels.appendChild(createText(X0 + w / 2, Y0 + h / 2, String(rect.area), 'var(--leaf)', 22));
    }
    root.setAttribute('aria-label', `${rect.w} × ${rect.h}, ${rect.area}`);
    paintGhosts();
  }

  function set(width: number, silent?: boolean): void {
    const next = ropeRect(perimeter, width);
    if (next.w === rect.w) return;
    rect = next;
    tried[rect.w] = rect;
    paint();
    if (!silent) voice.tone('tick');
    if (opts.onChange) opts.onChange(rect, tried);
  }

  const offDrag = drag(handle, {
    start: () => {
      handle.classList.add('held');
    },
    move: (e) => {
      const p = svgPoint(root, e);
      const half = perimeter / 2;
      const gx = (p.x - X0) / CELL;
      const gy = (p.y - Y0) / CELL;
      set((gx - gy + half) / 2);
    },
    end: () => {
      handle.classList.remove('held');
      if (opts.onRelease) opts.onRelease(rect, tried);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      set(rect.w + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      set(rect.w - 1);
    }
  };
  handle.addEventListener('keydown', onKeyDown as EventListener);

  tried[rect.w] = rect;
  paint();

  return {
    node: root,
    set: (w: number, silent?: boolean) => set(w, silent),
    get: () => rect,
    tried: () => tried,
    setPerimeter: (p: number) => {
      perimeter = p;
      tried = {};
      rect = ropeRect(perimeter, Math.min(rect.w, perimeter / 2 - 1));
      tried[rect.w] = rect;
      paint();
      if (opts.onChange) opts.onChange(rect, tried);
    },
    destroy: () => {
      offDrag();
      handle.removeEventListener('keydown', onKeyDown as EventListener);
    },
  };
}

/**
 * The "area hill": one bar per possible width; bars appear filled only once tried.
 */
export function renderAreaHill(
  perimeter: number,
  tried: Record<number, RopeRectangle>,
  current: RopeRectangle
): SVGSVGElement {
  const options = ropeOptions(perimeter);
  const max = maxAreaRect(perimeter).area;
  const W_HILL = 320;
  const H_HILL = 110;
  const bw = W_HILL / options.length;

  const root = svg('svg', {
    viewBox: `0 0 ${W_HILL} ${H_HILL + 22}`,
    role: 'img',
    class: 'area-hill',
  });

  options.forEach((r, i) => {
    const h = (r.area / max) * (H_HILL - 8);
    const on = !!tried[r.w];

    root.appendChild(
      svg('rect', {
        x: i * bw + 3,
        y: H_HILL - h,
        width: bw - 6,
        height: h,
        rx: 3,
        fill: on ? (r.w === current.w ? 'var(--leaf)' : 'var(--leaf-soft)') : 'none',
        stroke: on ? 'none' : 'var(--ghost)',
        'stroke-dasharray': on ? '0' : '3 3',
      })
    );

    root.appendChild(
      svg('text', {
        x: i * bw + bw / 2,
        y: H_HILL + 14,
        'text-anchor': 'middle',
        'font-size': 11,
        fill: 'var(--ink-soft)',
        'font-family': 'var(--font)',
        text: String(r.w),
      })
    );

    if (on) {
      root.appendChild(
        svg('text', {
          x: i * bw + bw / 2,
          y: H_HILL - h - 6,
          'text-anchor': 'middle',
          'font-size': 11,
          'font-weight': 600,
          fill: 'var(--ink)',
          'font-family': 'var(--font)',
          text: String(r.area),
        })
      );
    }
  });

  return root;
}
