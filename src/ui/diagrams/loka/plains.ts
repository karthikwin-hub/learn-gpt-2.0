/**
 * C5 drawing: the side of the Himalaya and the low land below, cut open. Rain falls on the mountains,
 * silt rides the river down, and each flood leaves a layer until the low land is a flat plain.
 */

import { FLOODS_TO_FILL } from '../../../domain/world/plains';
import { t } from '../../../domain/i18n/core';
import { figCircle, figLine, figPath, figRect, figSvg, figText } from '../fig';
import { house } from './parts';

const ROCK = '#B89B72';
const WATER = '#7DB9D8';
const SILT = ['#C9A46A', '#D8B57C', '#C49A5C', '#DDBE8A'] as const;
const TOP = 112;
const BED = 196;
const LEFT = 120;
const LAYER = (BED - TOP) / FLOODS_TO_FILL;

export interface PlainOptions {
  /** Rain on the mountains, with silt this far (0 to 1) down the river. */
  silt?: number | null;
  layers?: number;
  crops?: boolean;
}

export function renderPlain(o: PlainOptions = {}): SVGSVGElement {
  const layers = o.layers ?? 0;
  const label = o.crops
    ? t('plains.flat')
    : o.silt !== undefined && o.silt !== null
      ? t('plains.moving')
      : t('plains.layers', { n: layers });
  const s = figSvg(360, 210, label);
  s.appendChild(figRect(0, 0, 360, 210, { fill: 'var(--teal-soft)', stroke: 'none', rx: 12 }));
  s.appendChild(
    figPath(
      `M0 ${BED + 14} L0 60 L40 18 L80 52 L${LEFT} ${TOP} L${LEFT} ${BED} L360 ${BED} L360 ${BED + 14} Z`,
      {
        fill: ROCK,
        sw: 1,
      }
    )
  );
  s.appendChild(
    figPath('M28 30 L40 18 L54 30 L46 28 L40 32 Z', { fill: 'var(--paper-raised)', stroke: 'none' })
  );
  s.appendChild(figText(46, 72, t('plains.mountains'), { size: 11, weight: 700 }));
  for (let i = 0; i < layers; i++) {
    s.appendChild(
      figRect(LEFT, BED - (i + 1) * LAYER, 240, LAYER, {
        fill: SILT[i % SILT.length],
        stroke: 'var(--ink-soft)',
        sw: 0.5,
        rx: 0,
      })
    );
  }
  const surface = BED - layers * LAYER;
  s.appendChild(
    figPath(
      `M44 26 Q70 60 ${LEFT - 4} ${TOP - 4} L${LEFT + 8} ${surface - 3} L352 ${surface - 3}`,
      {
        stroke: WATER,
        sw: 5,
      }
    )
  );
  if (layers < FLOODS_TO_FILL)
    s.appendChild(figText(240, surface - 16, t('plains.low'), { size: 11, weight: 700 }));
  if (o.silt !== undefined && o.silt !== null) {
    for (let i = 0; i < 6; i++)
      s.appendChild(figLine(14 + i * 14, 4, 8 + i * 14, 14, { stroke: WATER, sw: 2 }));
    for (let i = 0; i < 4; i++) {
      const p = Math.max(0, Math.min(1, o.silt - i * 0.12));
      const down = Math.min(p * 2, 1);
      const along = Math.max(p * 2 - 1, 0);
      const x = p < 0.5 ? 44 + down * (LEFT - 48) : LEFT + 8 + along * 200;
      const y = p < 0.5 ? 26 + down * (TOP - 30) : surface - 3;
      s.appendChild(figCircle(x, y, 3, { fill: '#8A5A2B' }));
    }
    s.appendChild(figText(84, 108, t('plains.silt'), { size: 11, weight: 700, color: '#8A5A2B' }));
  }
  if (o.crops) {
    for (let i = 0; i < 9; i++) {
      const x = 140 + i * 18;
      s.appendChild(
        figPath(`M${x} ${TOP} l-4 -10 M${x} ${TOP} l0 -12 M${x} ${TOP} l4 -10`, {
          stroke: '#5E8C31',
          sw: 2,
        })
      );
    }
    s.appendChild(house(310, TOP - 22, 0.8));
  }
  return s;
}
