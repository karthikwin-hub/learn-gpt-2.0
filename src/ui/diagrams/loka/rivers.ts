/**
 * C8 drawings: the Ganga on a schematic map from the Gangotri glacier east to the Sundarbans, with
 * each place's height; and two rivers through one year, one fed by snow and one only by rain.
 */

import {
  GANGA_PLACES,
  PLACE_HEIGHT,
  RIVER_FEEDS,
  waterLevel,
  type GangaPlace,
} from '../../../domain/world/rivers';
import { t } from '../../../domain/i18n/core';
import { figArrow, figCircle, figPath, figRect, figSvg, figText } from '../fig';
import { formatHeight } from './parts';

const LAND = '#E4D3A8';
const HILLS = '#B89B72';
const WATER = '#2F7FB0';
const SEA = '#BFDDEB';
const AT: Record<GangaPlace, readonly [number, number, 'up' | 'down']> = {
  gangotri: [44, 34, 'down'],
  haridwar: [86, 74, 'down'],
  prayagraj: [168, 112, 'down'],
  varanasi: [212, 120, 'up'],
  patna: [262, 108, 'up'],
  sundarbans: [312, 176, 'up'],
};
const COURSE =
  'M44 34 Q60 60 86 74 Q130 96 168 112 Q190 122 212 120 Q240 116 262 108 Q300 120 312 176';

export const placeText = (p: GangaPlace) =>
  t('rivers.at', { place: t(`rivers.p.${p}`), h: formatHeight(PLACE_HEIGHT[p]) });

export interface GangaOptions {
  /** How much of the river is drawn, 0 to 1. */
  drawn?: number;
  /** Places to name with their heights. */
  shown?: readonly GangaPlace[];
  highlight?: GangaPlace | null;
}

export function renderGanga(o: GangaOptions = {}): SVGSVGElement {
  const shown = o.shown ?? [];
  const label = shown.length
    ? `${t('rivers.map')} ${shown.map(placeText).join('; ')}.`
    : t('rivers.map');
  const s = figSvg(360, 210, label);
  s.appendChild(figRect(0, 0, 360, 210, { fill: LAND, stroke: 'none', rx: 12 }));
  s.appendChild(
    figPath('M0 0 L360 0 L360 30 Q200 60 120 40 Q60 28 0 70 Z', { fill: HILLS, stroke: 'none' })
  );
  s.appendChild(figPath('M250 210 Q290 170 360 160 L360 210 Z', { fill: SEA, stroke: 'none' }));
  s.appendChild(figText(330, 200, t('rivers.sea'), { size: 10, weight: 700 }));
  s.appendChild(figArrow(336, 54, 336, 26));
  s.appendChild(figText(336, 66, t('rivers.north'), { size: 11, weight: 700 }));
  s.appendChild(figPath(COURSE, { stroke: WATER, sw: 1, dash: '2 3', opacity: 0.6 }));
  const p = Math.max(0, Math.min(1, o.drawn ?? 0));
  if (p > 0) {
    const line = figPath(COURSE, { stroke: WATER, sw: 4 });
    line.setAttribute('pathLength', '1');
    line.setAttribute('stroke-dasharray', `${p} 1`);
    s.appendChild(line);
  }
  for (const place of GANGA_PLACES) {
    const [x, y, side] = AT[place];
    const named = shown.includes(place);
    const hit = o.highlight === place;
    s.appendChild(
      figCircle(x, y, hit ? 7 : 4, {
        fill: named ? 'var(--kumkum)' : 'var(--paper-raised)',
        stroke: 'var(--ink-soft)',
        sw: 1,
      })
    );
    if (named) {
      const dy = side === 'up' ? -12 : 18;
      s.appendChild(figText(x, y + dy, t(`rivers.p.${place}`), { size: 10, weight: 700 }));
      s.appendChild(
        figText(x, y + dy + (side === 'up' ? -11 : 11), `${formatHeight(PLACE_HEIGHT[place])} m`, {
          size: 9,
          color: 'var(--ink-soft)',
        })
      );
    }
  }
  return s;
}

export interface FlowOptions {
  month?: number | null;
}

export function renderFlow(o: FlowOptions = {}): SVGSVGElement {
  const s = figSvg(360, 170, t('rivers.flowMap'));
  s.appendChild(figRect(0, 0, 360, 170, { fill: 'var(--teal-soft)', stroke: 'none', rx: 12 }));
  RIVER_FEEDS.forEach((feed, row) => {
    const base = 70 + row * 76;
    s.appendChild(
      figText(10, base - 50, t(`rivers.feed.${feed}`), { size: 11, weight: 700, anchor: 'start' })
    );
    for (let m = 1; m <= 12; m++) {
      const x = 14 + (m - 1) * 28;
      const level = waterLevel(feed, m);
      const hit = o.month === m;
      s.appendChild(
        figRect(x, base - 36, 22, 36, {
          fill: 'var(--paper-raised)',
          stroke: hit ? 'var(--kumkum)' : 'none',
          sw: 2,
          rx: 3,
        })
      );
      if (level > 0)
        s.appendChild(
          figRect(x, base - level * 12, 22, level * 12, { fill: WATER, stroke: 'none', rx: 3 })
        );
    }
  });
  if (o.month) {
    const x = 14 + (o.month - 1) * 28 + 11;
    s.appendChild(
      figText(x, 166, t(`farms.m${o.month}`), { size: 10, weight: 700, color: 'var(--kumkum)' })
    );
  }
  return s;
}
