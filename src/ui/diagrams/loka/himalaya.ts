/**
 * C4 drawing: the Himalaya from the side, rising from the plains through the Shivalik, Himachal and
 * Himadri. A dashed line marks how high the climber is, with the temperature there and a thermometer.
 */

import {
  RANGES,
  RANGE_HEIGHT,
  TOP_HEIGHT,
  temperatureAt,
  type HimalayanRange,
} from '../../../domain/world/himalaya';
import { t } from '../../../domain/i18n/core';
import { figLine, figPath, figRect, figSvg, figText } from '../fig';
import { renderIndiaInset } from './india-map';
import { formatHeight, formatTemperature } from './parts';

const GROUND = 186;
const PER_M = 150 / TOP_HEIGHT;
const ROCK = '#B89B72';
const GREEN = '#A8B86A';
const PEAK_X: Record<HimalayanRange, number> = { shivalik: 110, himachal: 196, himadri: 282 };

const yOf = (h: number) => GROUND - h * PER_M;

export interface ClimbOptions {
  /** Height of the climber in metres; no line when left out. */
  height?: number | null;
  highlight?: HimalayanRange | null;
}

export function renderClimb(o: ClimbOptions = {}): SVGSVGElement {
  const names = RANGES.map((r) => t(`himalaya.r.${r}`)).join(', ');
  const h = o.height ?? null;
  const label =
    h === null
      ? names
      : `${names}. ${t('himalaya.at', { h: formatHeight(h), t: formatTemperature(temperatureAt(h)) })}`;
  const s = figSvg(360, 210, label);
  s.appendChild(figRect(0, 0, 360, 210, { fill: 'var(--teal-soft)', stroke: 'none', rx: 12 }));
  const sh = yOf(RANGE_HEIGHT.shivalik);
  const hc = yOf(RANGE_HEIGHT.himachal);
  const hd = yOf(RANGE_HEIGHT.himadri);
  s.appendChild(
    figPath(
      `M0 ${GROUND} L60 ${GROUND} L${PEAK_X.shivalik} ${sh} L140 ${yOf(600)} L${PEAK_X.himachal} ${hc} L232 ${yOf(2600)} L${PEAK_X.himadri} ${hd} L330 ${yOf(4200)} L330 210 L0 210 Z`,
      { fill: ROCK, stroke: 'var(--ink-soft)', sw: 1 }
    )
  );
  s.appendChild(figRect(0, GROUND, 60, 24, { fill: GREEN, stroke: 'none', rx: 0 }));
  s.appendChild(
    figPath(
      `M262 ${yOf(5200)} L${PEAK_X.himadri} ${hd} L304 ${yOf(5100)} L292 ${yOf(5300)} L278 ${yOf(5000)} Z`,
      {
        fill: 'var(--paper-raised)',
        stroke: 'none',
      }
    )
  );
  for (const r of RANGES) {
    const hit = o.highlight === r;
    s.appendChild(
      figText(PEAK_X[r], yOf(RANGE_HEIGHT[r]) - 10, t(`himalaya.r.${r}`), {
        size: 12,
        weight: 700,
        color: hit ? 'var(--kumkum)' : 'var(--ink)',
      })
    );
  }
  s.appendChild(figText(30, GROUND + 12, t('himalaya.plains'), { size: 11 }));
  s.appendChild(renderIndiaInset({ zones: ['himalaya'] }, 150, 8, 50));
  if (h !== null) {
    const y = yOf(h);
    const c = temperatureAt(h);
    s.appendChild(figLine(0, y, 330, y, { stroke: 'var(--kumkum)', sw: 2, dash: '6 4' }));
    s.appendChild(
      figText(6, y - 9, `${formatHeight(h)} m · ${formatTemperature(c)}`, {
        size: 12,
        weight: 700,
        anchor: 'start',
        color: 'var(--kumkum)',
      })
    );
    const top = 24;
    const bottom = 186;
    const level = bottom - ((c + 10) / 45) * (bottom - top);
    s.appendChild(figRect(340, top, 10, bottom - top, { fill: 'var(--paper-raised)', rx: 5 }));
    s.appendChild(
      figRect(341, level, 8, bottom - level, {
        fill: c <= 0 ? '#7DB9D8' : 'var(--kumkum)',
        stroke: 'none',
        rx: 4,
      })
    );
  }
  return s;
}
