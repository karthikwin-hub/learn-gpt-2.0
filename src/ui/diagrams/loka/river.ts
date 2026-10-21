/**
 * Q3 drawings: a river village whose air, water, land and noise readings follow the causes switched on,
 * a clear stream seen under a microscope, and the green (wet) and blue (dry) bins.
 */

import {
  MAX_READING,
  POLLUTION_KINDS,
  pollutionReadings,
  type PollutionCause,
  type WasteBin,
  type WasteItem,
} from '../../../domain/world/pollution';
import { t } from '../../../domain/i18n/core';
import { svg } from '../../util/dom';
import { figCircle, figLine, figPath, figRect, figSvg, figText } from '../fig';
import { house } from './parts';

const WATER = '#7DB9D8';
const MUD = '#8A6A4A';
const SMOKE = 'var(--ink-soft)';

const AREA: Record<PollutionCause, [number, number, number, number]> = {
  factory: [10, 14, 76, 150],
  sewage: [94, 74, 66, 90],
  burning: [168, 70, 62, 72],
  dumping: [236, 100, 56, 70],
  traffic: [292, 70, 64, 66],
};

function puff(g: SVGGElement, pts: readonly (readonly [number, number, number])[]): void {
  for (const [x, y, r] of pts) g.appendChild(figCircle(x, y, r, { fill: SMOKE, opacity: 0.45 }));
}

function cause(c: PollutionCause, on: boolean): SVGGElement {
  const g = svg('g') as SVGGElement;
  if (c === 'factory') {
    g.appendChild(
      figRect(18, 80, 56, 40, { fill: 'var(--paper-sunk)', stroke: 'var(--ink-soft)' })
    );
    g.appendChild(
      figRect(56, 48, 10, 32, { fill: 'var(--paper-sunk)', stroke: 'var(--ink-soft)' })
    );
    g.appendChild(figRect(26, 92, 10, 10, { fill: 'var(--ink-soft)', stroke: 'none', rx: 1 }));
    g.appendChild(figRect(44, 92, 10, 10, { fill: 'var(--ink-soft)', stroke: 'none', rx: 1 }));
    if (on) {
      puff(g, [
        [61, 40, 7],
        [69, 30, 9],
        [80, 20, 10],
      ]);
      g.appendChild(figLine(30, 120, 30, 152, { stroke: MUD, sw: 4 }));
      g.appendChild(
        figPath('M14 160 Q30 152 46 160 Q30 168 14 160 Z', { fill: MUD, stroke: 'none' })
      );
    }
  } else if (c === 'sewage') {
    g.appendChild(house(100, 100));
    g.appendChild(house(132, 104));
    if (on) {
      g.appendChild(figPath('M122 120 Q124 136 128 152', { stroke: MUD, sw: 3 }));
      g.appendChild(
        figPath('M110 160 Q128 152 146 160 Q128 168 110 160 Z', { fill: MUD, stroke: 'none' })
      );
    }
  } else if (c === 'burning') {
    g.appendChild(figPath('M180 132 Q199 118 218 132 Z', { fill: '#7A8B3A', stroke: 'none' }));
    if (on) {
      g.appendChild(
        figPath('M186 132 L192 112 L198 124 L203 104 L208 124 L213 114 L216 132 Z', {
          fill: 'var(--thread)',
          stroke: '#D9822B',
          sw: 1.5,
        })
      );
      puff(g, [
        [200, 94, 8],
        [208, 84, 10],
        [218, 76, 9],
      ]);
    }
  } else if (c === 'dumping') {
    if (on) {
      g.appendChild(
        figPath('M240 140 L252 120 L270 116 L284 140 Z', {
          fill: '#9A9A8A',
          stroke: 'var(--ink-soft)',
        })
      );
      for (const [x, y] of [
        [248, 158],
        [262, 164],
        [278, 156],
      ] as const) {
        g.appendChild(
          figRect(x, y, 8, 5, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)' })
        );
      }
    } else {
      g.appendChild(
        figRect(256, 120, 16, 20, { fill: 'var(--leaf)', stroke: 'var(--ink-soft)', rx: 2 })
      );
    }
  } else {
    if (on) {
      g.appendChild(figRect(300, 98, 34, 18, { fill: 'var(--indigo)', stroke: 'none', rx: 2 }));
      g.appendChild(figRect(334, 104, 14, 12, { fill: 'var(--indigo)', stroke: 'none', rx: 2 }));
      g.appendChild(figCircle(310, 118, 4, { fill: 'var(--ink)' }));
      g.appendChild(figCircle(340, 118, 4, { fill: 'var(--ink)' }));
      for (const r of [6, 11]) {
        g.appendChild(
          figPath(`M${350 + r * 0.3} ${102 - r} Q${352 + r} 102 ${350 + r * 0.3} ${102 + r}`, {
            stroke: 'var(--ink)',
            sw: 1.5,
          })
        );
      }
      puff(g, [
        [296, 110, 4],
        [290, 104, 5],
      ]);
    }
  }
  return g;
}

export interface VillageOptions {
  active: readonly PollutionCause[];
  highlight?: PollutionCause | null;
}

/** The river village with a reading under it for air, water, land and noise. */
export function renderVillage(o: VillageOptions): SVGSVGElement {
  const r = pollutionReadings(o.active);
  const label = POLLUTION_KINDS.map(
    (k) => `${t(`river.k.${k}`)}: ${t(`river.level${Math.min(r[k], 3)}`)}`
  ).join(', ');
  const s = figSvg(360, 252, label);
  s.appendChild(figRect(0, 0, 360, 200, { fill: 'var(--teal-soft)', stroke: 'none', rx: 12 }));
  if (r.air)
    s.appendChild(
      figRect(0, 0, 360, 120, { fill: SMOKE, stroke: 'none', rx: 12, opacity: 0.12 * r.air })
    );
  s.appendChild(figRect(0, 120, 360, 80, { fill: 'var(--leaf-soft)', stroke: 'none', rx: 0 }));
  s.appendChild(figRect(290, 120, 70, 8, { fill: 'var(--ink-soft)', stroke: 'none', rx: 0 }));
  s.appendChild(figRect(0, 150, 360, 26, { fill: WATER, stroke: 'none', rx: 0 }));
  if (r.water) {
    s.appendChild(
      figRect(0, 150, 360, 26, { fill: MUD, stroke: 'none', rx: 0, opacity: 0.18 * r.water })
    );
  }
  for (const c of Object.keys(AREA) as PollutionCause[])
    s.appendChild(cause(c, o.active.includes(c)));
  if (o.highlight) {
    const [x, y, w, h] = AREA[o.highlight];
    s.appendChild(figRect(x, y, w, h, { stroke: 'var(--kumkum)', sw: 2.5, rx: 10 }));
  }
  POLLUTION_KINDS.forEach((k, i) => {
    const x = 6 + i * 88;
    s.appendChild(figText(x + 40, 214, t(`river.k.${k}`), { size: 12, weight: 700 }));
    for (let j = 0; j < MAX_READING; j++) {
      s.appendChild(
        figRect(x + 8 + j * 25, 228, 22, 14, {
          fill: j < r[k] ? 'var(--thread)' : 'var(--paper-sunk)',
          stroke: 'var(--hair)',
          rx: 3,
        })
      );
    }
  });
  return s;
}

/** A clear stream; `magnified` adds the microscope view of the germs in the same water. */
export function renderStream(magnified: boolean): SVGSVGElement {
  const s = figSvg(360, 200, t(magnified ? 'river.streamMagnified' : 'river.stream'));
  s.appendChild(figRect(0, 0, 360, 200, { fill: 'var(--leaf-soft)', stroke: 'none', rx: 12 }));
  s.appendChild(
    figPath('M0 120 Q90 90 180 120 T360 110 L360 160 Q270 180 180 156 T0 168 Z', {
      fill: WATER,
      stroke: 'none',
    })
  );
  for (const [x, y, rr] of [
    [40, 150, 5],
    [120, 136, 4],
    [210, 146, 6],
    [300, 138, 4],
  ] as const) {
    s.appendChild(
      figCircle(x, y, rr, { fill: 'var(--paper-sunk)', stroke: 'var(--ink-soft)', sw: 1 })
    );
  }
  if (magnified) {
    s.appendChild(figLine(160, 132, 236, 92, { stroke: 'var(--ink-soft)', sw: 1.5, dash: '4 4' }));
    s.appendChild(figCircle(160, 132, 8, { stroke: 'var(--kumkum)', sw: 2 }));
    s.appendChild(figCircle(276, 70, 58, { fill: '#D6EBF5', stroke: 'var(--ink)', sw: 3 }));
    for (const [x, y, rot] of [
      [250, 52, 20],
      [282, 44, -30],
      [304, 70, 60],
      [264, 84, 0],
      [292, 98, 40],
      [246, 76, -50],
      [280, 66, 80],
    ] as const) {
      const germ = figPath(
        `M${x - 6} ${y} Q${x} ${y - 5} ${x + 6} ${y} Q${x} ${y + 5} ${x - 6} ${y} Z`,
        {
          fill: 'var(--leaf)',
          stroke: 'var(--ink-soft)',
          sw: 1,
        }
      );
      germ.setAttribute('transform', `rotate(${rot} ${x} ${y})`);
      s.appendChild(germ);
    }
  }
  return s;
}

function wasteIcon(item: WasteItem, x: number, y: number): SVGGElement {
  const g = svg('g') as SVGGElement;
  if (item === 'peel') {
    g.appendChild(
      figPath(
        `M${x - 10} ${y - 4} Q${x} ${y + 12} ${x + 10} ${y - 4} Q${x} ${y + 4} ${x - 10} ${y - 4} Z`,
        {
          fill: 'var(--thread)',
          stroke: 'var(--ink-soft)',
          sw: 1,
        }
      )
    );
  } else if (item === 'leaves') {
    for (const dx of [-6, 4]) {
      g.appendChild(
        figPath(
          `M${x + dx - 6} ${y} Q${x + dx} ${y - 8} ${x + dx + 6} ${y} Q${x + dx} ${y + 8} ${x + dx - 6} ${y} Z`,
          {
            fill: 'var(--leaf)',
            stroke: 'var(--ink-soft)',
            sw: 1,
          }
        )
      );
    }
  } else if (item === 'tea') {
    for (const [dx, dy] of [
      [-5, 2],
      [0, -2],
      [5, 2],
      [0, 4],
    ] as const) {
      g.appendChild(figCircle(x + dx, y + dy, 3, { fill: MUD }));
    }
  } else if (item === 'bottle') {
    g.appendChild(
      figRect(x - 5, y - 8, 10, 18, { fill: '#D6EBF5', stroke: 'var(--ink-soft)', rx: 3 })
    );
    g.appendChild(figRect(x - 2, y - 13, 4, 5, { fill: 'var(--indigo)', stroke: 'none', rx: 1 }));
  } else if (item === 'paper') {
    g.appendChild(
      figRect(x - 9, y - 9, 18, 18, {
        fill: 'var(--paper-raised)',
        stroke: 'var(--ink-soft)',
        rx: 1,
      })
    );
    for (const dy of [-4, 0, 4])
      g.appendChild(figLine(x - 5, y + dy, x + 5, y + dy, { stroke: 'var(--ink-soft)', sw: 1 }));
  } else {
    g.appendChild(
      figRect(x - 7, y - 9, 14, 18, { fill: '#B8B8B0', stroke: 'var(--ink-soft)', rx: 2 })
    );
    g.appendChild(figLine(x - 7, y - 5, x + 7, y - 5, { stroke: 'var(--ink-soft)', sw: 1 }));
  }
  return g;
}

const BIN_X: Record<WasteBin, number> = { wet: 40, dry: 200 };
const BIN_FILL: Record<WasteBin, string> = { wet: 'var(--leaf)', dry: 'var(--indigo)' };

/** The green and blue bins with the items already placed in them. */
export function renderBins(
  placed: Partial<Record<WasteBin, readonly WasteItem[]>>,
  highlight?: WasteItem | null
): SVGSVGElement {
  const label = (['wet', 'dry'] as const)
    .map((b) => {
      const items = placed[b] || [];
      return items.length
        ? `${t(`river.bin.${b}`)}: ${items.map((i) => t(`river.w.${i}`)).join(', ')}`
        : t(`river.bin.${b}`);
    })
    .join('; ');
  const s = figSvg(360, 176, label);
  for (const b of ['wet', 'dry'] as const) {
    const x = BIN_X[b];
    s.appendChild(
      figRect(x - 6, 26, 132, 12, { fill: BIN_FILL[b], stroke: 'var(--ink-soft)', rx: 4 })
    );
    s.appendChild(
      figPath(`M${x} 40 L${x + 120} 40 L${x + 110} 146 L${x + 10} 146 Z`, {
        fill: BIN_FILL[b],
        stroke: 'var(--ink-soft)',
        sw: 1.2,
        opacity: 0.85,
      })
    );
    s.appendChild(figText(x + 60, 162, t(`river.bin.${b}`), { size: 13, weight: 700 }));
    (placed[b] || []).forEach((item, i) => {
      const cx = x + 30 + (i % 3) * 30;
      const cy = 70 + Math.floor(i / 3) * 34;
      s.appendChild(figCircle(cx, cy, 14, { fill: 'var(--paper-raised)', stroke: 'none' }));
      s.appendChild(wasteIcon(item, cx, cy));
      if (item === highlight)
        s.appendChild(figCircle(cx, cy, 16, { stroke: 'var(--kumkum)', sw: 2.5 }));
    });
  }
  return s;
}
