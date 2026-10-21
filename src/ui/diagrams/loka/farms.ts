/**
 * C2 drawing: the year as a wheel of twelve months, January at the top, each month coloured by the
 * season whose crops are sown in it. A pointer names one month; the legend gives each season's months.
 */

import {
  CROP_SEASONS,
  sowingSeasonOf,
  type Crop,
  type CropSeason,
} from '../../../domain/world/farming';
import { t } from '../../../domain/i18n/core';
import { figCircle, figLine, figPath, figRect, figSvg, figText } from '../fig';

export const SEASON_FILL: Record<CropSeason, string> = {
  kharif: '#7DB9D8',
  rabi: '#D9C59A',
  zaid: '#E8A87C',
};

const CX = 100;
const CY = 100;
const R_OUT = 88;
const R_IN = 58;

function polar(r: number, month: number, edge: number): [number, number] {
  const a = ((month - 1 + edge) / 12) * 2 * Math.PI - Math.PI / 2;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function sector(month: number): string {
  const [x1, y1] = polar(R_OUT, month, 0);
  const [x2, y2] = polar(R_OUT, month, 1);
  const [x3, y3] = polar(R_IN, month, 1);
  const [x4, y4] = polar(R_IN, month, 0);
  const f = (n: number) => n.toFixed(1);
  return `M${f(x1)} ${f(y1)} A${R_OUT} ${R_OUT} 0 0 1 ${f(x2)} ${f(y2)} L${f(x3)} ${f(y3)} A${R_IN} ${R_IN} 0 0 0 ${f(x4)} ${f(y4)} Z`;
}

export interface YearOptions {
  /** How many months (from January) are coloured; all twelve when left out. */
  shown?: number;
  /** The month the pointer names, 1 to 12. */
  month?: number | null;
  highlight?: CropSeason | null;
  /** A crop named under the month, in the centre. */
  crop?: Crop | null;
}

export function renderYear(o: YearOptions = {}): SVGSVGElement {
  const shown = o.shown ?? 12;
  const seasons = shown === 12 ? CROP_SEASONS : [];
  const label = [
    seasons.length
      ? seasons.map((s) => `${t(`farms.n.${s}`)}: ${t(`farms.when.${s}`)}`).join('; ')
      : t('farms.empty'),
    o.month ? t(`farms.m${o.month}`) : '',
    o.crop ? t(`farms.c.${o.crop}`) : '',
  ]
    .filter(Boolean)
    .join(', ');
  const s = figSvg(360, 200, label);
  s.appendChild(figCircle(CX, CY, R_OUT + 4, { fill: 'var(--paper-sunk)', stroke: 'none' }));
  for (let m = 1; m <= 12; m++) {
    const season = sowingSeasonOf(m);
    const fill = m > shown || !season ? 'var(--paper-raised)' : SEASON_FILL[season];
    const dim = o.highlight && season !== o.highlight;
    s.appendChild(
      figPath(sector(m), {
        fill,
        stroke: 'var(--ink-soft)',
        sw: 1,
        ...(dim ? { opacity: 0.35 } : {}),
      })
    );
  }
  if (o.month) {
    const [px, py] = polar(R_OUT + 2, o.month, 0.5);
    s.appendChild(figLine(CX, CY, px, py, { stroke: 'var(--kumkum)', sw: 3 }));
    s.appendChild(figCircle(CX, CY, R_IN - 6, { fill: 'var(--paper)', stroke: 'none' }));
    s.appendChild(
      figText(CX, o.crop ? CY - 10 : CY, t(`farms.m${o.month}`), { size: 13, weight: 700 })
    );
    if (o.crop) {
      s.appendChild(
        figText(CX, CY + 12, t(`farms.c.${o.crop}`), { size: 12, color: 'var(--kumkum)' })
      );
    }
  }
  CROP_SEASONS.forEach((season, i) => {
    if (!seasons.length) return;
    const y = 34 + i * 54;
    const dim = o.highlight && season !== o.highlight;
    s.appendChild(
      figRect(198, y - 8, 16, 16, {
        fill: SEASON_FILL[season],
        rx: 3,
        ...(dim ? { opacity: 0.35 } : {}),
      })
    );
    s.appendChild(
      figText(220, y, t(`farms.n.${season}`), { size: 14, weight: 700, anchor: 'start' })
    );
    s.appendChild(figText(198, y + 20, t(`farms.when.${season}`), { size: 12, anchor: 'start' }));
  });
  return s;
}
