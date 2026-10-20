/**
 * C3 drawing: a schematic land seen from above, with hills, a stream that becomes a river, a lake, two
 * roads and a patch of sand. Six places to build are marked; each shows the settlement it grew into.
 */

import { SITE_IDS, type SettlementSize, type SiteId } from '../../../domain/world/settlements';
import { t } from '../../../domain/i18n/core';
import { figCircle, figLine, figPath, figRect, figSvg, figText } from '../fig';
import { house } from './parts';

const GRASS = '#DCE5C0';
const HILL = '#B89B72';
const WATER = '#7DB9D8';
const SAND = '#E9D9A6';
const ROAD = '#8A7F72';

const AT: Record<SiteId, readonly [number, number]> = {
  hilltop: [70, 34],
  valley: [118, 82],
  lakeside: [280, 74],
  crossroads: [70, 150],
  riverbank: [236, 134],
  sandy: [180, 184],
};

const HOUSES: Record<SettlementSize, number> = { none: 0, village: 1, town: 3, city: 5 };

export interface LandOptions {
  grown?: Partial<Record<SiteId, SettlementSize>>;
  chosen?: SiteId | null;
}

function settlement(s: SVGSVGElement, site: SiteId, size: SettlementSize): void {
  const [x, y] = AT[site];
  const n = HOUSES[size];
  for (let i = 0; i < n; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    s.appendChild(house(x - 24 + col * 16, y - 18 + row * 14, 0.6));
  }
  if (size === 'city') {
    s.appendChild(figRect(x + 22, y - 30, 10, 28, { fill: 'var(--paper-raised)', rx: 1 }));
    s.appendChild(figRect(x + 34, y - 22, 8, 20, { fill: 'var(--paper-raised)', rx: 1 }));
  }
}

export function renderLand(o: LandOptions = {}): SVGSVGElement {
  const grown = o.grown ?? {};
  const shown = SITE_IDS.filter((id) => grown[id] !== undefined);
  const label = shown.length
    ? shown
        .map((id) => `${t(`cities.site.${id}`)}: ${t(`cities.size.${grown[id] ?? 'none'}`)}`)
        .join('; ')
    : t('cities.land');
  const s = figSvg(360, 210, label);
  s.appendChild(figRect(0, 0, 360, 210, { fill: GRASS, stroke: 'none', rx: 12 }));
  s.appendChild(figPath('M14 100 L70 22 L126 100 Z', { fill: HILL, sw: 1 }));
  s.appendChild(figPath('M106 100 L160 40 L214 100 Z', { fill: HILL, sw: 1 }));
  s.appendChild(figRect(140, 166, 90, 40, { fill: SAND, stroke: 'none', rx: 10 }));
  s.appendChild(
    figPath('M118 92 Q160 120 214 124 Q280 130 320 160 Q340 176 360 184', {
      stroke: WATER,
      sw: 7,
    })
  );
  s.appendChild(
    figPath('M294 18 Q340 14 346 36 Q340 58 300 56 Q276 46 294 18 Z', { fill: WATER, sw: 1 })
  );
  s.appendChild(figLine(0, 150, 360, 150, { stroke: ROAD, sw: 4, dash: '10 5' }));
  s.appendChild(figLine(70, 112, 70, 210, { stroke: ROAD, sw: 4, dash: '10 5' }));
  s.appendChild(figRect(296, 142, 18, 16, { fill: 'var(--paper-raised)', rx: 2 }));
  for (const id of SITE_IDS) {
    const [x, y] = AT[id];
    const size = grown[id];
    if (size) settlement(s, id, size);
    s.appendChild(
      figCircle(x, y + 6, id === o.chosen ? 9 : 5, {
        fill: id === o.chosen ? 'none' : 'var(--paper-raised)',
        stroke: id === o.chosen ? 'var(--kumkum)' : 'var(--ink-soft)',
        sw: id === o.chosen ? 3 : 1,
      })
    );
    s.appendChild(
      figText(x, y + 6, SITE_IDS.indexOf(id) + 1, {
        size: 8,
        weight: 700,
        color: 'var(--ink-soft)',
      })
    );
  }
  return s;
}
