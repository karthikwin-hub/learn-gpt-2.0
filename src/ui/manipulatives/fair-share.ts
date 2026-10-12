/**
 * Fair Share Table manipulative (D1, D3).
 * Laddoos dealt round-and-round from a central pile onto plates.
 * Leftovers that cannot complete a full round wait in the remainder tray,
 * and can be sliced into equal fractional wedges per plate.
 */

import { dealSequence } from '../../domain/math/divide';
import { voice } from '../components/voice/voice';
import { clear, svg } from '../util/dom';

const W = 360;
const H = 360;
const PLATE_R = 50;
const TRAY = { x: 60, y: 318, w: 240, h: 34 };

export interface FairShareCounts {
  perPlate: number[];
  leftover: number;
  dealt: number;
  total: number;
  plates: number;
  done: boolean;
  cut: boolean;
}

export interface FairShareOptions {
  total: number;
  plates: number;
  initialDealt?: number;
  initialCut?: boolean;
  trayLabel?: string;
  onChange?: (counts: FairShareCounts) => void;
}

export interface FairShareManipulative {
  node: SVGSVGElement;
  setTotal: (n: number) => void;
  setPlates: (n: number) => void;
  dealRound: () => void;
  dealAll: () => void;
  cutLeftovers: () => void;
  reset: () => void;
  counts: () => FairShareCounts;
  destroy: () => void;
}

function platePos(i: number, n: number): { x: number; y: number } {
  const perRow = n <= 3 ? n : Math.ceil(n / 2);
  const row = Math.floor(i / perRow);
  const inRow = row === 0 ? Math.min(perRow, n) : n - perRow;
  const col = i - row * perRow;
  const gap = W / inRow;
  const y = n <= 3 ? 196 : 152 + row * 112;
  return { x: gap * col + gap / 2, y };
}

function slotInPlate(k: number): { dx: number; dy: number } {
  const perRow = 4;
  const r = Math.floor(k / perRow);
  const c = k % perRow;
  return { dx: (c - 1.5) * 19, dy: (r - 1.5) * 19 };
}

function pilePos(i: number): { x: number; y: number } {
  return { x: 36 + (i % 10) * 32, y: 26 + Math.floor(i / 10) * 24 };
}

function createLaddoo(): SVGGElement {
  return svg('g', { class: 'laddoo' }, [
    svg('circle', {
      r: 8.5,
      fill: 'var(--thread)',
      stroke: '#B57A18',
      'stroke-width': 1,
    }),
    svg('circle', { cx: -2.5, cy: -2, r: 1.1, fill: '#B57A18' }),
    svg('circle', { cx: 2.5, cy: 1.5, r: 1.1, fill: '#B57A18' }),
    svg('circle', { cx: -0.5, cy: 3.5, r: 1, fill: '#B57A18' }),
  ]);
}

function createWedge(k: number, n: number): SVGGElement {
  const a0 = (2 * Math.PI * k) / n - Math.PI / 2;
  const a1 = (2 * Math.PI * (k + 1)) / n - Math.PI / 2;
  const r = 8.5;
  const d = `M0 0 L${(r * Math.cos(a0)).toFixed(2)} ${(r * Math.sin(a0)).toFixed(2)} A${r} ${r} 0 ${
    a1 - a0 > Math.PI ? 1 : 0
  } 1 ${(r * Math.cos(a1)).toFixed(2)} ${(r * Math.sin(a1)).toFixed(2)} Z`;
  return svg('g', { class: 'laddoo wedge' }, [
    svg('path', { d, fill: 'var(--thread)', stroke: '#B57A18', 'stroke-width': 1 }),
  ]);
}

function place(node: SVGElement, x: number, y: number, instant = false): void {
  node.style.transition = instant ? 'none' : 'transform 480ms cubic-bezier(.3,.7,.2,1)';
  node.style.transform = `translate(${x}px,${y}px)`;
}

export function createFairShare(opts: FairShareOptions): FairShareManipulative {
  let total = opts.total;
  let plates = opts.plates;
  let seq: number[] = [];
  let dealt = 0;
  let cut = false;
  let timers: ReturnType<typeof setTimeout>[] = [];
  let nodes: SVGGElement[] = [];

  const root = svg('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'img',
    class: 'fair-share-svg',
  });

  const plateLayer = svg('g', { class: 'plate-layer' });
  const trayLayer = svg('g', { class: 'tray-layer' });
  const itemLayer = svg('g', { class: 'item-layer' });

  root.appendChild(
    svg('rect', {
      x: 8,
      y: 6,
      width: W - 16,
      height: 72,
      rx: 14,
      fill: 'var(--paper-sunk)',
    })
  );
  root.appendChild(plateLayer);
  root.appendChild(trayLayer);
  root.appendChild(itemLayer);

  function stopTimers(): void {
    timers.forEach((t) => clearTimeout(t));
    timers = [];
  }

  function getCounts(): FairShareCounts {
    const per: number[] = [];
    for (let i = 0; i < plates; i++) per.push(0);
    let left = 0;
    for (let k = 0; k < dealt; k++) {
      const targetPlate = seq[k] ?? -1;
      if (targetPlate >= 0 && targetPlate < plates) {
        per[targetPlate] = (per[targetPlate] ?? 0) + 1;
      } else {
        left++;
      }
    }
    return {
      perPlate: per,
      leftover: left,
      dealt,
      total,
      plates,
      done: dealt === total,
      cut,
    };
  }

  function emit(): void {
    if (opts.onChange) {
      opts.onChange(getCounts());
    }
  }

  function targetFor(k: number): { x: number; y: number } {
    const plate = seq[k] ?? -1;
    if (plate < 0) {
      let leftIndex = 0;
      for (let j = 0; j < k; j++) {
        if ((seq[j] ?? -1) < 0) leftIndex++;
      }
      return { x: TRAY.x + 26 + leftIndex * 26, y: TRAY.y + TRAY.h / 2 };
    }
    let onPlate = 0;
    for (let i = 0; i < k; i++) {
      if ((seq[i] ?? -1) === plate) onPlate++;
    }
    const p = platePos(plate, plates);
    const s = slotInPlate(onPlate);
    return { x: p.x + s.dx, y: p.y + s.dy };
  }

  function dealNext(): boolean {
    if (dealt >= total) return false;
    const k = total - 1 - dealt;
    const node = nodes[k];
    if (!node) return false;
    const tgt = targetFor(dealt);
    place(node, tgt.x, tgt.y);
    dealt++;
    voice.tone('tick');
    emit();
    return true;
  }

  let isInitial = true;

  function build(preserveState = false): void {
    stopTimers();
    root.setAttribute('aria-label', `${total} ÷ ${plates}`);
    seq = dealSequence(total, plates);
    if (!preserveState) {
      dealt = isInitial && opts.initialDealt !== undefined ? Math.min(total, opts.initialDealt) : 0;
      cut = isInitial && opts.initialCut !== undefined ? opts.initialCut : false;
      isInitial = false;
    }
    clear(plateLayer);
    clear(trayLayer);
    clear(itemLayer);

    for (let i = 0; i < plates; i++) {
      const p = platePos(i, plates);
      plateLayer.appendChild(
        svg('circle', {
          cx: p.x,
          cy: p.y,
          r: PLATE_R,
          fill: 'var(--paper-raised)',
          stroke: 'var(--hair)',
          'stroke-width': 2,
        })
      );
      plateLayer.appendChild(
        svg('circle', {
          cx: p.x,
          cy: p.y,
          r: PLATE_R - 8,
          fill: 'none',
          stroke: 'var(--hair)',
          'stroke-width': 1,
        })
      );
    }

    trayLayer.appendChild(
      svg('rect', {
        x: TRAY.x,
        y: TRAY.y,
        width: TRAY.w,
        height: TRAY.h,
        rx: 17,
        fill: 'none',
        stroke: 'var(--ghost)',
        'stroke-width': 1.5,
        'stroke-dasharray': '5 4',
      })
    );
    trayLayer.appendChild(
      svg('text', {
        x: TRAY.x + TRAY.w + 8,
        y: TRAY.y + TRAY.h / 2,
        'dominant-baseline': 'middle',
        'font-size': 12,
        fill: 'var(--ink-soft)',
        'font-family': 'var(--font)',
        text: opts.trayLabel || '',
      })
    );

    nodes = [];
    for (let k = 0; k < total; k++) {
      const n = createLaddoo();
      nodes.push(n);
      itemLayer.appendChild(n);
    }

    for (let d = 0; d < dealt; d++) {
      const k = total - 1 - d;
      const tgt = targetFor(d);
      if (nodes[k]) {
        place(nodes[k]!, tgt.x, tgt.y, true);
      }
    }

    for (let u = dealt; u < total; u++) {
      const k = total - 1 - u;
      const pp = pilePos(k);
      if (nodes[k]) {
        place(nodes[k]!, pp.x, pp.y, true);
      }
    }

    if (cut && dealt === total) {
      let leftIdx = 0;
      for (let k = 0; k < total; k++) {
        if ((seq[k] ?? -1) >= 0) continue;
        const node = nodes[total - 1 - k];
        if (node) node.style.opacity = '0';
        for (let p = 0; p < plates; p++) {
          const w = createWedge(p, plates);
          const pp = platePos(p, plates);
          place(w, pp.x - PLATE_R + 18 + leftIdx * 20, pp.y + PLATE_R - 16, true);
          itemLayer.appendChild(w);
        }
        leftIdx++;
      }
    }

    emit();
  }

  function dealRound(): void {
    stopTimers();
    let n = Math.min(plates, total - dealt);
    if (total - dealt < plates) n = total - dealt;
    for (let i = 0; i < n; i++) {
      timers.push(setTimeout(dealNext, i * 170));
    }
  }

  function dealAll(): void {
    stopTimers();
    const remaining = total - dealt;
    for (let i = 0; i < remaining; i++) {
      timers.push(setTimeout(dealNext, i * 150));
    }
  }

  function cutLeftovers(): void {
    const c = getCounts();
    if (!c.done || c.leftover === 0 || cut) return;
    cut = true;
    let leftIdx = 0;
    for (let k = 0; k < total; k++) {
      if ((seq[k] ?? -1) >= 0) continue;
      const node = nodes[total - 1 - k];
      const from = targetFor(k);
      if (node) {
        node.style.opacity = '0';
      }
      for (let p = 0; p < plates; p++) {
        const curP = p;
        const curFrom = from;
        const curLi = leftIdx;
        const w = createWedge(curP, plates);
        place(w, curFrom.x, curFrom.y, true);
        itemLayer.appendChild(w);
        timers.push(
          setTimeout(
            () => {
              const pp = platePos(curP, plates);
              place(w, pp.x - PLATE_R + 18 + curLi * 20, pp.y + PLATE_R - 16);
            },
            120 + curP * 90 + curLi * 200
          )
        );
      }
      leftIdx++;
    }
    emit();
  }

  build();

  return {
    node: root,
    setTotal(n: number) {
      total = n;
      dealt = 0;
      cut = false;
      build(true);
    },
    setPlates(n: number) {
      plates = n;
      dealt = 0;
      cut = false;
      build(true);
    },
    dealRound,
    dealAll,
    cutLeftovers,
    reset() {
      dealt = 0;
      cut = false;
      build(true);
    },
    counts: getCounts,
    destroy: stopTimers,
  };
}
