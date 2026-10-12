/**
 * Sorting Courtyard manipulative (S2, S3).
 * Twelve attribute blocks (shape × colour × size) and two rope rings with rules.
 * Blocks walk to their classified region (both, A only, B only, outside both).
 * Rings can be moved, pulled apart (producing homeless blocks outlined in kumkum), or placed inside.
 */

import { t } from '../../domain/i18n/core';
import {
  createBlocks,
  getRegion,
  getRegionCounts,
  sameSort,
  type AttributeBlock,
  type RegionCounts,
  type SetRule,
  type VennRegion,
} from '../../domain/math/sets';
import { clear, drag, svg, svgPoint } from '../util/dom';

const W = 360;
const H = 384;
const YARD = { x: 6, y: 44, w: 348, h: 334 };

const COLOURS: Record<string, string> = {
  yellow: 'var(--thread)',
  green: 'var(--leaf)',
  black: 'var(--ink)',
};

export interface RingGeometry {
  x: number;
  y: number;
  r: number;
}

export const COURTYARD_LAYOUTS: Record<string, [RingGeometry, RingGeometry]> = {
  overlap: [
    { x: 128, y: 214, r: 92 },
    { x: 232, y: 214, r: 92 },
  ],
  apart: [
    { x: 92, y: 214, r: 80 },
    { x: 268, y: 214, r: 80 },
  ],
  inside: [
    { x: 180, y: 214, r: 136 },
    { x: 196, y: 238, r: 66 },
  ],
};

export interface CourtyardOptions {
  ruleA: SetRule;
  ruleB: SetRule;
  rings?: [RingGeometry, RingGeometry];
  hidden?: boolean;
  ruleLabel: (rule: SetRule) => string;
  describe?: (counts: RegionCounts) => string;
  onChipTap?: (ringIndex: number) => void;
  onMove?: (rings: [RingGeometry, RingGeometry]) => void;
  onChange?: (info: {
    counts: RegionCounts;
    homeless: number;
    rings: [RingGeometry, RingGeometry];
  }) => void;
}

export interface CourtyardManipulative {
  node: SVGSVGElement;
  setRules: (ruleA: SetRule, ruleB: SetRule) => void;
  arrange: (layoutName: 'overlap' | 'apart' | 'inside') => void;
  highlight: (h: 'and' | 'or' | 'not' | null) => void;
  setGuess: (ga: SetRule | null, gb: SetRule | null) => boolean;
  rules: () => [SetRule, SetRule];
  destroy: () => void;
}

interface BlockNode {
  g: SVGGElement;
  outline: SVGCircleElement;
  pos: { x: number; y: number };
  homeless?: boolean;
}

function createShapeNode(it: AttributeBlock): {
  g: SVGGElement;
  outline: SVGCircleElement;
} {
  const s = it.size === 'big' ? 13 : 8;
  const fill = COLOURS[it.colour] || 'var(--ink)';
  const g = svg('g', { class: 'block' }) as SVGGElement;
  const outline = svg('circle', {
    r: s + 7,
    fill: 'none',
    stroke: 'var(--kumkum)',
    'stroke-width': 2.5,
    opacity: 0,
  }) as SVGCircleElement;
  g.appendChild(outline);

  if (it.shape === 'circle') {
    g.appendChild(svg('circle', { r: s, fill }));
  } else if (it.shape === 'square') {
    g.appendChild(
      svg('rect', {
        x: -s * 0.9,
        y: -s * 0.9,
        width: s * 1.8,
        height: s * 1.8,
        rx: 2,
        fill,
      })
    );
  } else {
    g.appendChild(
      svg('path', {
        d: `M0 ${-s * 1.1} L${s * 1.05} ${s * 0.8} L${-s * 1.05} ${s * 0.8} Z`,
        fill,
        'stroke-linejoin': 'round',
      })
    );
  }
  g.style.pointerEvents = 'none';
  return { g, outline };
}

export function createCourtyard(opts: CourtyardOptions): CourtyardManipulative {
  const items = createBlocks();
  let ruleA = opts.ruleA;
  let ruleB = opts.ruleB;
  let rings: [RingGeometry, RingGeometry] = opts.rings
    ? [{ ...opts.rings[0] }, { ...opts.rings[1] }]
    : [{ ...COURTYARD_LAYOUTS.overlap![0]! }, { ...COURTYARD_LAYOUTS.overlap![1]! }];
  const hidden = !!opts.hidden;
  let guess: [SetRule, SetRule] | null = null;
  let highlight: 'and' | 'or' | 'not' | null = null;
  const uid = 'cy' + Math.random().toString(36).slice(2, 7);

  const root = svg('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'img',
    class: 'courtyard-manipulative',
  }) as SVGSVGElement;

  const defs = svg('defs');
  const clipB = svg('clipPath', { id: `${uid}-cb` }, [svg('circle')]);
  const mask = svg('mask', { id: `${uid}-out` }, [
    svg('rect', {
      x: YARD.x,
      y: YARD.y,
      width: YARD.w,
      height: YARD.h,
      fill: 'white',
    }),
    svg('circle', { fill: 'black' }),
    svg('circle', { fill: 'black' }),
  ]);
  defs.appendChild(clipB);
  defs.appendChild(mask);
  root.appendChild(defs);

  // Yard background
  root.appendChild(
    svg('rect', {
      x: YARD.x,
      y: YARD.y,
      width: YARD.w,
      height: YARD.h,
      rx: 16,
      fill: 'var(--paper-sunk)',
    })
  );
  root.appendChild(
    svg('text', {
      x: YARD.x + 14,
      y: YARD.y + 22,
      'font-size': 14,
      'font-weight': 600,
      fill: 'var(--ink-soft)',
      'font-family': 'var(--font)',
      text: 'U',
    })
  );

  const hiLayer = svg('g', { 'pointer-events': 'none' });
  const ringLayer = svg('g', { class: 'ring-layer' });
  const itemLayer = svg('g', { class: 'item-layer' });
  const chipLayer = svg('g', { class: 'chip-layer' });
  root.appendChild(hiLayer);
  root.appendChild(ringLayer);
  root.appendChild(itemLayer);
  root.appendChild(chipLayer);

  const nodes: BlockNode[] = items.map((it) => {
    const n = createShapeNode(it);
    const node: BlockNode = {
      ...n,
      pos: { x: 180, y: 70 },
    };
    node.g.style.transform = 'translate(180px, 70px)';
    itemLayer.appendChild(node.g);
    return node;
  });

  const cleanupFns: (() => void)[] = [];

  const ringNodes = rings.map((_r, idx) => {
    const colour = idx === 0 ? 'var(--indigo)' : 'var(--teal)';
    const g = svg('g', {
      class: 'handle',
      style: { cursor: 'grab' },
      role: 'group',
      'aria-label': t('sets.ringLabel', { name: idx === 0 ? 'A' : 'B' }),
    }) as SVGGElement;
    const disk = svg('circle', { fill: 'transparent' }) as SVGCircleElement;
    const ropeA = svg('circle', {
      fill: 'none',
      stroke: colour,
      'stroke-width': 5,
    }) as SVGCircleElement;
    const ropeB = svg('circle', {
      fill: 'none',
      stroke: 'var(--paper)',
      'stroke-width': 1.2,
      'stroke-dasharray': '3 6',
      opacity: 0.8,
    }) as SVGCircleElement;
    g.appendChild(disk);
    g.appendChild(ropeA);
    g.appendChild(ropeB);
    ringLayer.appendChild(g);

    const chip = svg('g', {
      class: 'ring-chip-button',
      style: { cursor: 'pointer' },
      tabindex: 0,
      role: 'button',
    }) as SVGGElement;
    const chipBg = svg('rect', {
      height: 30,
      rx: 15,
      fill: colour,
    }) as SVGRectElement;
    const chipText = svg('text', {
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      'font-size': 14,
      'font-weight': 600,
      fill: '#FFFBF3',
      'font-family': 'var(--font)',
    }) as SVGTextElement;
    chip.appendChild(chipBg);
    chip.appendChild(chipText);
    chipLayer.appendChild(chip);

    const onChipClick = () => {
      if (opts.onChipTap) opts.onChipTap(idx);
    };
    const onChipKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (opts.onChipTap) opts.onChipTap(idx);
      }
    };
    chip.addEventListener('click', onChipClick as EventListener);
    chip.addEventListener('keydown', onChipKey as EventListener);
    cleanupFns.push(() => {
      chip.removeEventListener('click', onChipClick as EventListener);
      chip.removeEventListener('keydown', onChipKey as EventListener);
    });

    let start: { px: number; py: number; x: number; y: number } | null = null;
    const offDrag = drag(g, {
      start: (e) => {
        const p = svgPoint(root, e);
        start = {
          px: p.x,
          py: p.y,
          x: rings[idx]!.x,
          y: rings[idx]!.y,
        };
      },
      move: (e) => {
        if (!start) return;
        const p = svgPoint(root, e);
        const cur = rings[idx]!;
        cur.x = Math.max(
          YARD.x + cur.r * 0.6,
          Math.min(YARD.x + YARD.w - cur.r * 0.6, start.x + p.x - start.px)
        );
        cur.y = Math.max(
          YARD.y + cur.r * 0.6,
          Math.min(YARD.y + YARD.h - cur.r * 0.6, start.y + p.y - start.py)
        );
        paintRings();
        placeItems(false);
      },
      end: () => {
        if (opts.onMove) opts.onMove(rings);
      },
    });
    cleanupFns.push(offDrag);

    return { g, disk, ropeA, ropeB, chip, chipBg, chipText };
  });

  function inRing(p: { x: number; y: number }, r: RingGeometry, margin: number): boolean {
    return Math.hypot(p.x - r.x, p.y - r.y) < r.r - margin;
  }

  function outRing(p: { x: number; y: number }, r: RingGeometry, margin: number): boolean {
    return Math.hypot(p.x - r.x, p.y - r.y) > r.r + margin;
  }

  function classify(p: { x: number; y: number }): VennRegion | null {
    const a = rings[0]!;
    const b = rings[1]!;
    const m = 15;
    const inA = inRing(p, a, m);
    const inB = inRing(p, b, m);
    const outA = outRing(p, a, m);
    const outB = outRing(p, b, m);
    if (inA && inB) return 'both';
    if (inA && outB) return 'a';
    if (inB && outA) return 'b';
    if (outA && outB) return 'none';
    return null;
  }

  let homelessCount = 0;

  function placeItems(stagger: boolean): void {
    const pts: { x: number; y: number; c: VennRegion; used: boolean }[] = [];
    for (let x = YARD.x + 22; x < YARD.x + YARD.w - 12; x += 25) {
      for (let y = YARD.y + 40; y < YARD.y + YARD.h - 12; y += 25) {
        const off = (Math.round((x - YARD.x) / 25) % 2) * 12;
        const p = {
          x,
          y: y + off > YARD.y + YARD.h - 14 ? y : y + off,
        };
        const c = classify(p);
        if (c) pts.push({ x: p.x, y: p.y, c, used: false });
      }
    }

    homelessCount = 0;
    items.forEach((it, i) => {
      const target = getRegion(it, ruleA, ruleB);
      const n = nodes[i]!;
      let best: { x: number; y: number; used: boolean } | null = null;
      let bestD = Infinity;

      for (const p of pts) {
        if (p.used || p.c !== target) continue;
        const d = Math.hypot(p.x - n.pos.x, p.y - n.pos.y);
        if (d < bestD) {
          bestD = d;
          best = p;
        }
      }

      let dest: { x: number; y: number };
      if (best) {
        best.used = true;
        dest = { x: best.x, y: best.y };
      } else {
        homelessCount++;
        const a = rings[0]!;
        const b = rings[1]!;
        dest = {
          x: (a.x + b.x) / 2 + (homelessCount - 1.5) * 26,
          y: Math.min(a.y, b.y) - Math.max(a.r, b.r) * 0.2 + 30,
        };
      }
      n.pos = dest;
      n.homeless = !best;
      n.g.style.transition = `transform 620ms cubic-bezier(.3,.7,.2,1) ${stagger ? i * 60 : 0}ms`;
      n.g.style.transform = `translate(${dest.x}px,${dest.y}px)`;
    });

    paintOutlines();

    if (opts.onChange) {
      opts.onChange({
        counts: getRegionCounts(items, ruleA, ruleB),
        homeless: homelessCount,
        rings,
      });
    }
  }

  function paintOutlines(): void {
    items.forEach((it, i) => {
      const moved = guess && getRegion(it, guess[0], guess[1]) !== getRegion(it, ruleA, ruleB);
      nodes[i]!.outline.setAttribute('opacity', nodes[i]!.homeless || moved ? '1' : '0');
    });
  }

  function paintRings(): void {
    rings.forEach((r, idx) => {
      const n = ringNodes[idx]!;
      [n.disk, n.ropeA, n.ropeB].forEach((c) => {
        c.setAttribute('cx', String(r.x));
        c.setAttribute('cy', String(r.y));
        c.setAttribute('r', String(r.r));
      });

      const label =
        hidden && !(guess && guessMatches()) ? '?' : opts.ruleLabel(idx === 0 ? ruleA : ruleB);
      n.chipText.textContent = label;
      const w = Math.max(44, label.length * 8.5 + 28);
      let cy =
        idx === 1 &&
        rings[1]!.r < rings[0]!.r &&
        Math.hypot(rings[0]!.x - rings[1]!.x, rings[0]!.y - rings[1]!.y) < rings[0]!.r
          ? r.y + r.r - 2
          : r.y - r.r - 2;
      cy = Math.max(16, Math.min(H - 16, cy));
      n.chipBg.setAttribute('x', String(r.x - w / 2));
      n.chipBg.setAttribute('y', String(cy - 15));
      n.chipBg.setAttribute('width', String(w));
      n.chipText.setAttribute('x', String(r.x));
      n.chipText.setAttribute('y', String(cy + 1));
    });

    const clipCircle = clipB.firstChild as SVGCircleElement | null;
    if (clipCircle) {
      clipCircle.setAttribute('cx', String(rings[1]!.x));
      clipCircle.setAttribute('cy', String(rings[1]!.y));
      clipCircle.setAttribute('r', String(rings[1]!.r));
    }

    [1, 2].forEach((k) => {
      const c = mask.childNodes[k] as SVGCircleElement | undefined;
      const r = rings[k - 1]!;
      if (c) {
        c.setAttribute('cx', String(r.x));
        c.setAttribute('cy', String(r.y));
        c.setAttribute('r', String(r.r));
      }
    });

    paintHighlight();

    if (opts.describe) {
      root.setAttribute('aria-label', opts.describe(getRegionCounts(items, ruleA, ruleB)));
    }
  }

  function paintHighlight(): void {
    clear(hiLayer);
    if (!highlight) return;
    const g = svg('g', { opacity: 0.3 });
    const fill = 'var(--thread)';
    if (highlight === 'and') {
      g.appendChild(
        svg('circle', {
          cx: rings[0]!.x,
          cy: rings[0]!.y,
          r: rings[0]!.r,
          fill,
          'clip-path': `url(#${uid}-cb)`,
        })
      );
    } else if (highlight === 'or') {
      g.appendChild(
        svg('circle', {
          cx: rings[0]!.x,
          cy: rings[0]!.y,
          r: rings[0]!.r,
          fill,
        })
      );
      g.appendChild(
        svg('circle', {
          cx: rings[1]!.x,
          cy: rings[1]!.y,
          r: rings[1]!.r,
          fill,
        })
      );
    } else if (highlight === 'not') {
      g.appendChild(
        svg('rect', {
          x: YARD.x,
          y: YARD.y,
          width: YARD.w,
          height: YARD.h,
          rx: 16,
          fill,
          mask: `url(#${uid}-out)`,
        })
      );
    }
    hiLayer.appendChild(g);
  }

  function guessMatches(): boolean {
    return !!guess && sameSort(items, guess[0], guess[1], ruleA, ruleB);
  }

  paintRings();
  placeItems(true);

  return {
    node: root,
    setRules: (a: SetRule, b: SetRule) => {
      ruleA = a;
      ruleB = b;
      paintRings();
      placeItems(true);
    },
    arrange: (name: 'overlap' | 'apart' | 'inside') => {
      const layout = COURTYARD_LAYOUTS[name];
      if (layout) {
        rings = [{ ...layout[0] }, { ...layout[1] }];
        paintRings();
        placeItems(true);
        if (opts.onMove) opts.onMove(rings);
      }
    },
    highlight: (h: 'and' | 'or' | 'not' | null) => {
      highlight = h;
      paintHighlight();
    },
    setGuess: (ga: SetRule | null, gb: SetRule | null) => {
      guess = ga && gb ? [ga, gb] : null;
      paintRings();
      paintOutlines();
      return guessMatches();
    },
    rules: () => [ruleA, ruleB],
    destroy: () => {
      cleanupFns.forEach((fn) => fn());
    },
  };
}
