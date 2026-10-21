/**
 * C1 drawing: India as a schematic grid of 36 tiles, one per state or union territory. It is not to
 * scale and traces no border; it only shows roughly where each lies, which is chosen and which of its
 * neighbours have been found.
 */

import { GRID_ROWS, REGIONS, STATE_COUNT, UT_COUNT } from '../../../domain/world/states';
import { t } from '../../../domain/i18n/core';
import { figRect, figSvg, figText } from '../fig';

const STATE = '#D9C59A';
const UT = 'var(--teal-soft)';
const FOUND = '#A8B86A';
const TILE_W = 40;
const TILE_H = 24;
const STEP_X = 44;
const STEP_Y = 28;
const X0 = 4;
const Y0 = 4;

export interface IndiaOptions {
  /** How many tiles have appeared, in the order of `REGIONS`; all of them when left out. */
  shown?: number;
  chosen?: string | null;
  found?: readonly string[];
  /** One short line drawn under the legend. */
  caption?: string;
}

export function renderIndia(o: IndiaOptions = {}): SVGSVGElement {
  const shown = o.shown ?? REGIONS.length;
  const found = o.found ?? [];
  const label = [
    shown ? t('states.map', { states: STATE_COUNT, uts: UT_COUNT }) : t('states.empty'),
    o.chosen ? t(`states.n.${o.chosen}`) : '',
    ...found.map((id) => t(`states.n.${id}`)),
    o.caption ?? '',
  ]
    .filter(Boolean)
    .join(', ');
  const legendY = Y0 + GRID_ROWS * STEP_Y + 6;
  const s = figSvg(360, legendY + (o.caption ? 64 : 44), label);
  REGIONS.slice(0, shown).forEach((r) => {
    const fill =
      r.id === o.chosen
        ? 'var(--kumkum)'
        : found.includes(r.id)
          ? FOUND
          : r.kind === 'ut'
            ? UT
            : STATE;
    s.appendChild(
      figRect(X0 + r.tile[0] * STEP_X, Y0 + r.tile[1] * STEP_Y, TILE_W, TILE_H, {
        fill,
        stroke: 'var(--ink-soft)',
        sw: r.id === o.chosen ? 2 : 1,
        rx: 6,
        ...(r.kind === 'ut' ? { dash: '4 3' } : {}),
      })
    );
  });
  s.appendChild(figRect(8, legendY, 16, 16, { fill: STATE, rx: 3 }));
  s.appendChild(figText(30, legendY + 8, t('states.state'), { size: 13, anchor: 'start' }));
  s.appendChild(figRect(180, legendY, 16, 16, { fill: UT, rx: 3, dash: '4 3' }));
  s.appendChild(figText(202, legendY + 8, t('states.ut'), { size: 13, anchor: 'start' }));
  s.appendChild(
    figText(8, legendY + 32, t('states.notToScale'), {
      size: 12,
      anchor: 'start',
      color: 'var(--ink-soft)',
    })
  );
  if (o.caption) {
    s.appendChild(figText(180, legendY + 54, o.caption, { size: 14, weight: 700 }));
  }
  return s;
}
