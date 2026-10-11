/**
 * Marble Machine manipulative (L2).
 * Physical logic gates with doors A and B. Dropping a marble routes it through
 * the gate structure into the YES or NO basin.
 */

import { type GateType, getRouteKey } from '../../domain/math/logic';
import { clear, svg, tween } from '../util/dom';
import { voice } from '../components/voice/voice';

const W = 360;
const H = 360;
const HOP = { x: 180, y: 26 };
const YES = { x: 86, y: 318 };
const NO = { x: 274, y: 318 };

export interface Point {
  x: number;
  y: number;
}

export interface GateGeometry {
  doors: Record<string, Point>;
  routes: Record<string, Point[]>;
}

export const GATE_GEOMETRY: Record<GateType, GateGeometry> = {
  and: {
    doors: {
      A: { x: 180, y: 100 },
      B: { x: 180, y: 186 },
    },
    routes: {
      'A,no': [HOP, { x: 180, y: 100 }, { x: 250, y: 140 }, { x: 274, y: 290 }, NO],
      'A,B,no': [
        HOP,
        { x: 180, y: 100 },
        { x: 180, y: 186 },
        { x: 250, y: 226 },
        { x: 274, y: 290 },
        NO,
      ],
      'A,B,yes': [
        HOP,
        { x: 180, y: 100 },
        { x: 180, y: 186 },
        { x: 150, y: 246 },
        { x: 86, y: 290 },
        YES,
      ],
    },
  },
  or: {
    doors: {
      A: { x: 180, y: 100 },
      B: { x: 272, y: 150 },
    },
    routes: {
      'A,yes': [HOP, { x: 180, y: 100 }, { x: 120, y: 190 }, { x: 86, y: 290 }, YES],
      'A,B,yes': [
        HOP,
        { x: 180, y: 100 },
        { x: 272, y: 150 },
        { x: 214, y: 214 },
        { x: 120, y: 250 },
        { x: 86, y: 290 },
        YES,
      ],
      'A,B,no': [
        HOP,
        { x: 180, y: 100 },
        { x: 272, y: 150 },
        { x: 300, y: 220 },
        { x: 274, y: 290 },
        NO,
      ],
    },
  },
  not: {
    doors: {
      A: { x: 180, y: 120 },
    },
    routes: {
      'A,no': [HOP, { x: 180, y: 120 }, { x: 230, y: 200 }, { x: 274, y: 290 }, NO],
      'A,yes': [HOP, { x: 180, y: 120 }, { x: 130, y: 200 }, { x: 86, y: 290 }, YES],
    },
  },
};

function polyD(pts: Point[]): string {
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ');
}

export interface MarblesOptions {
  type: GateType;
  a: boolean;
  b?: boolean;
  yesLabel: string;
  noLabel: string;
  describe?: (type: GateType, a: boolean, b: boolean) => string;
}

export interface MarblesManipulative {
  node: SVGSVGElement;
  setType: (t: GateType) => void;
  setInputs: (a: boolean, b: boolean) => void;
  setHidden: (on: boolean) => void;
  drop: (done?: (yes: boolean) => void) => void;
  busy: () => boolean;
  destroy: () => void;
}

export function createMarbles(opts: MarblesOptions): MarblesManipulative {
  let type: GateType = opts.type;
  let a: boolean = opts.a;
  let b: boolean = opts.b ?? false;
  let landed: { yes: number; no: number } = { yes: 0, no: 0 };
  let cancelRun: (() => void) | null = null;

  const root = svg('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'img',
    class: 'marbles-manipulative',
  }) as SVGSVGElement;

  const trackLayer = svg('g', { class: 'track-layer' }) as SVGGElement;
  const residueLayer = svg('g', { class: 'residue-layer' }) as SVGGElement;
  const basinLayer = svg('g', { class: 'basin-layer' }) as SVGGElement;
  const doorLayer = svg('g', { class: 'door-layer' }) as SVGGElement;
  const marble = svg('circle', {
    class: 'marble-runner',
    r: 9,
    fill: 'var(--ink)',
    opacity: 0,
  }) as SVGCircleElement;

  const cover = svg('g', { class: 'mystery-cover', style: { display: 'none' } }, [
    svg('rect', {
      x: 40,
      y: 54,
      width: 280,
      height: 226,
      rx: 18,
      fill: 'var(--paper-sunk)',
      stroke: 'var(--ghost)',
      'stroke-width': 1.5,
      'stroke-dasharray': '6 5',
    }),
    svg('text', {
      x: 180,
      y: 170,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      'font-size': 64,
      'font-weight': 600,
      fill: 'var(--ink-soft)',
      'font-family': 'var(--font)',
      text: '?',
    }),
  ]) as SVGGElement;

  [trackLayer, residueLayer, basinLayer, doorLayer, marble, cover].forEach((n) =>
    root.appendChild(n)
  );

  function text(x: number, y: number, s: string, size: number, colour?: string): SVGTextElement {
    return svg('text', {
      x,
      y,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      'font-size': size,
      'font-weight': 600,
      fill: colour || 'var(--ink)',
      'font-family': 'var(--font)',
      text: s,
    }) as SVGTextElement;
  }

  function paintBasins() {
    clear(basinLayer);
    const configs: [Point, 'yes' | 'no', string, string][] = [
      [YES, 'yes', opts.yesLabel, 'var(--leaf)'],
      [NO, 'no', opts.noLabel, 'var(--ink-soft)'],
    ];

    configs.forEach(([p, key, label, strokeColour]) => {
      basinLayer.appendChild(
        svg('path', {
          d: `M${p.x - 46} ${p.y - 22} Q${p.x - 46} ${p.y + 26} ${p.x} ${p.y + 26} Q${p.x + 46} ${p.y + 26} ${p.x + 46} ${p.y - 22}`,
          fill: 'var(--paper-sunk)',
          stroke: strokeColour,
          'stroke-width': 3,
        })
      );
      basinLayer.appendChild(text(p.x, p.y + 42, label, 14, strokeColour));

      for (let i = 0; i < landed[key]; i++) {
        basinLayer.appendChild(
          svg('circle', {
            cx: p.x - 30 + (i % 6) * 12,
            cy: p.y + 14 - Math.floor(i / 6) * 11,
            r: 5.5,
            fill: 'var(--ink)',
            opacity: 0.8,
          })
        );
      }
    });
  }

  function paintDoors() {
    clear(doorLayer);
    const doors = GATE_GEOMETRY[type].doors;
    Object.keys(doors).forEach((k) => {
      const d = doors[k]!;
      const open = k === 'A' ? a : b;
      const colour = k === 'A' ? 'var(--indigo)' : 'var(--teal)';

      doorLayer.appendChild(
        svg('circle', {
          cx: d.x,
          cy: d.y,
          r: 22,
          fill: 'var(--paper-raised)',
          stroke: colour,
          'stroke-width': 2,
        })
      );

      if (open) {
        doorLayer.appendChild(
          svg('line', {
            x1: d.x - 18,
            y1: d.y - 14,
            x2: d.x - 18,
            y2: d.y + 14,
            stroke: colour,
            'stroke-width': 5,
            'stroke-linecap': 'round',
          })
        );
        doorLayer.appendChild(
          svg('line', {
            x1: d.x + 18,
            y1: d.y - 14,
            x2: d.x + 18,
            y2: d.y + 14,
            stroke: colour,
            'stroke-width': 5,
            'stroke-linecap': 'round',
          })
        );
      } else {
        doorLayer.appendChild(
          svg('line', {
            x1: d.x - 16,
            y1: d.y + 6,
            x2: d.x + 16,
            y2: d.y - 6,
            stroke: colour,
            'stroke-width': 6,
            'stroke-linecap': 'round',
          })
        );
      }
      doorLayer.appendChild(text(d.x + (d.x > 230 ? 40 : -40), d.y, k, 22, colour));
    });

    if (opts.describe) {
      root.setAttribute('aria-label', opts.describe(type, a, b));
    }
  }

  function paintTracks() {
    clear(trackLayer);
    clear(residueLayer);
    trackLayer.appendChild(
      svg('path', {
        d: `M${HOP.x - 22} ${HOP.y - 14} L${HOP.x} ${HOP.y + 8} L${HOP.x + 22} ${HOP.y - 14}`,
        fill: 'none',
        stroke: 'var(--ink)',
        'stroke-width': 3,
        'stroke-linejoin': 'round',
      })
    );
    const routes = GATE_GEOMETRY[type].routes;
    Object.keys(routes).forEach((k) => {
      trackLayer.appendChild(
        svg('path', {
          d: polyD(routes[k]!),
          fill: 'none',
          stroke: 'var(--hair)',
          'stroke-width': 12,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        })
      );
    });
  }

  function paintAll() {
    paintTracks();
    paintDoors();
    paintBasins();
  }

  function drop(done?: (yes: boolean) => void) {
    if (cancelRun) return;
    const key = getRouteKey(type, a, b);
    const pts = GATE_GEOMETRY[type].routes[key];
    if (!pts) return;

    const path = svg('path', {
      d: polyD(pts),
      fill: 'none',
      stroke: 'var(--thread)',
      'stroke-width': 4,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      opacity: 0.85,
    }) as SVGPathElement;

    clear(residueLayer);
    residueLayer.appendChild(path);
    const len = path.getTotalLength();
    marble.setAttribute('opacity', '1');

    cancelRun = tween(
      Math.max(900, len * 3.2),
      (p) => {
        const pt = path.getPointAtLength(len * (p * p * 0.6 + p * 0.4));
        marble.setAttribute('cx', String(pt.x));
        marble.setAttribute('cy', String(pt.y));
      },
      () => {
        cancelRun = null;
        marble.setAttribute('opacity', '0');
        const out = key.endsWith('yes') ? 'yes' : 'no';
        landed[out]++;
        paintBasins();
        voice.tone('tick');
        if (done) done(out === 'yes');
      }
    );
  }

  paintAll();

  return {
    node: root,
    setType(t: GateType) {
      type = t;
      landed = { yes: 0, no: 0 };
      paintAll();
    },
    setInputs(na: boolean, nb: boolean) {
      a = na;
      b = nb;
      paintDoors();
    },
    setHidden(on: boolean) {
      cover.style.display = on ? '' : 'none';
    },
    drop,
    busy() {
      return !!cancelRun;
    },
    destroy() {
      if (cancelRun) cancelRun();
    },
  };
}
