/**
 * Q1 drawings: the three nested levels of government, and a village lane with its streetlight.
 */

import type { GovLevel } from '../../../domain/world/civics';
import { t } from '../../../domain/i18n/core';
import { svg } from '../../util/dom';
import { figCircle, figLine, figPath, figRect, figSvg, figText } from '../fig';

export type CivicIcon = 'streetlight' | 'road' | 'coin';

function house(x: number, y: number, s = 1): SVGGElement {
  const g = svg('g') as SVGGElement;
  g.appendChild(
    figRect(x, y, 22 * s, 16 * s, { fill: 'var(--paper-raised)', stroke: 'var(--ink-soft)', rx: 1 })
  );
  g.appendChild(
    figPath(`M${x - 3 * s} ${y} L${x + 11 * s} ${y - 11 * s} L${x + 25 * s} ${y} Z`, {
      fill: '#B35C4A',
      stroke: 'var(--ink-soft)',
      sw: 1,
    })
  );
  return g;
}

export function streetlight(x: number, y: number, lit: boolean, h = 60): SVGGElement {
  const g = svg('g') as SVGGElement;
  if (lit) g.appendChild(figCircle(x + 14, y - h + 6, 16, { fill: 'var(--thread-soft)' }));
  g.appendChild(figLine(x, y, x, y - h, { stroke: 'var(--ink)', sw: 3 }));
  g.appendChild(figLine(x, y - h, x + 14, y - h, { stroke: 'var(--ink)', sw: 3 }));
  g.appendChild(
    figCircle(x + 14, y - h + 6, 6, {
      fill: lit ? 'var(--thread)' : 'var(--ink-soft)',
      stroke: 'var(--ink)',
      sw: 1.5,
    })
  );
  if (!lit) {
    g.appendChild(
      figPath(`M${x + 10} ${y - h + 2} l8 8 M${x + 18} ${y - h + 2} l-8 8`, {
        stroke: 'var(--kumkum)',
        sw: 1.5,
      })
    );
  }
  return g;
}

function icon(kind: CivicIcon, x: number, y: number): SVGGElement {
  if (kind === 'streetlight') return streetlight(x, y + 16, false, 32);
  const g = svg('g') as SVGGElement;
  if (kind === 'road') {
    g.appendChild(
      figRect(x - 22, y - 8, 44, 16, { fill: 'var(--ink-soft)', stroke: 'none', rx: 2 })
    );
    g.appendChild(
      figLine(x - 18, y, x + 18, y, { stroke: 'var(--paper-raised)', sw: 2, dash: '5 4' })
    );
  } else {
    g.appendChild(figCircle(x, y, 13, { fill: 'var(--thread)', stroke: 'var(--ink)', sw: 1.5 }));
    g.appendChild(figText(x, y + 1, '₹', { size: 14 }));
  }
  return g;
}

const BOX: Record<GovLevel, [number, number, number, number, string]> = {
  union: [8, 8, 344, 214, 'var(--indigo-soft)'],
  state: [36, 62, 288, 152, 'var(--teal-soft)'],
  local: [64, 116, 232, 90, 'var(--leaf-soft)'],
};

export interface LevelsOptions {
  /** How many levels to show, from the local one outward (0..3). */
  shown: number;
  highlight?: GovLevel | null;
  /** Show who leads each level. */
  leaders?: boolean;
  icons?: Partial<Record<GovLevel, CivicIcon>>;
}

export function renderLevels(o: LevelsOptions): SVGSVGElement {
  const order: GovLevel[] = ['union', 'state', 'local'];
  const visible = order.filter((l) => 3 - order.indexOf(l) <= o.shown);
  const s = figSvg(
    360,
    230,
    visible.length ? visible.map((l) => t(`govern.n.${l}`)).join(', ') : t('govern.art')
  );
  for (const level of order) {
    if (!visible.includes(level)) continue;
    const [x, y, w, h, fill] = BOX[level];
    const hot = o.highlight === level;
    s.appendChild(
      figRect(x, y, w, h, {
        fill,
        stroke: hot ? 'var(--kumkum)' : 'var(--ink-soft)',
        sw: hot ? 3 : 1.2,
        rx: 14,
      })
    );
    s.appendChild(
      figText(x + 12, y + 16, t(`govern.n.${level}`), { size: 13, anchor: 'start', weight: 700 })
    );
    if (o.leaders) {
      s.appendChild(
        figText(x + 12, y + 34, t(`govern.lead.${level}`), {
          size: 11,
          anchor: 'start',
          weight: 500,
          color: 'var(--ink-soft)',
        })
      );
    }
    const kind = o.icons?.[level];
    if (kind) s.appendChild(icon(kind, x + w - 34, y + 26));
  }
  if (visible.includes('local')) {
    for (const [hx, hy] of [
      [110, 176],
      [146, 182],
      [184, 174],
    ] as const) {
      s.appendChild(house(hx, hy, 0.9));
    }
  }
  return s;
}

/** A village lane at dusk; `lit` says whether its streetlight works. */
export function renderLane(lit: boolean): SVGSVGElement {
  const s = figSvg(360, 150, t(lit ? 'govern.laneLit' : 'govern.laneDark'));
  s.appendChild(figRect(0, 0, 360, 150, { fill: 'var(--indigo-soft)', stroke: 'none', rx: 12 }));
  s.appendChild(figRect(0, 118, 360, 32, { fill: 'var(--paper-sunk)', stroke: 'none', rx: 0 }));
  s.appendChild(house(30, 92, 1.4));
  s.appendChild(house(250, 96, 1.2));
  s.appendChild(house(300, 90, 1.4));
  s.appendChild(streetlight(180, 122, lit, 80));
  return s;
}
