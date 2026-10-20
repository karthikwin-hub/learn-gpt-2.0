/**
 * C6 drawing: two thermometers side by side, the Thar and a seaside town, at one hour of one season.
 * The sky darkens at night. After a whole day, a band on each shows how far it swung.
 */

import {
  DAY_RANGE,
  daySwing,
  temperatureAtHour,
  type DesertPlace,
  type DesertSeason,
} from '../../../domain/world/desert';
import { t } from '../../../domain/i18n/core';
import { figCircle, figRect, figSvg, figText } from '../fig';
import { formatTemperature } from './parts';

const SAND = '#E9D9A6';
const SEA = '#7DB9D8';
const NIGHT = '#C9D3E0';
const TUBE_TOP = 30;
const TUBE_BOTTOM = 124;
const SCALE_LOW = 0;
const SCALE_HIGH = 50;
const PLACES: readonly (readonly [DesertPlace, number, string])[] = [
  ['thar', 0, SAND],
  ['coast', 180, SEA],
];

const yOf = (c: number) =>
  TUBE_BOTTOM - ((c - SCALE_LOW) / (SCALE_HIGH - SCALE_LOW)) * (TUBE_BOTTOM - TUBE_TOP);

export interface DayOptions {
  season: DesertSeason;
  hour: number;
  /** Show how far each place swings in the whole day. */
  swing?: boolean;
}

export function desertReading(season: DesertSeason, hour: number): string {
  return t('desert.reading', {
    season: t(`desert.season.${season}`),
    hour: t(`desert.h.${Math.floor(hour / 3) * 3}`),
    thar: formatTemperature(temperatureAtHour('thar', season, hour)),
    coast: formatTemperature(temperatureAtHour('coast', season, hour)),
  });
}

export function renderDay(o: DayOptions): SVGSVGElement {
  const night = o.hour < 6 || o.hour >= 18;
  const label = o.swing
    ? `${desertReading(o.season, o.hour)} ${t('desert.swings', {
        thar: daySwing('thar', o.season),
        coast: daySwing('coast', o.season),
      })}`
    : desertReading(o.season, o.hour);
  const s = figSvg(360, 170, label);
  s.appendChild(
    figRect(0, 0, 360, 170, { fill: night ? NIGHT : 'var(--teal-soft)', stroke: 'none', rx: 12 })
  );
  for (const [place, x0, ground] of PLACES) {
    const x = x0 + 90;
    const c = temperatureAtHour(place, o.season, o.hour);
    s.appendChild(figRect(x0 + 4, 150, 172, 16, { fill: ground, stroke: 'none', rx: 8 }));
    s.appendChild(figText(x, 20, t(`desert.place.${place}`), { size: 12, weight: 700 }));
    s.appendChild(
      figRect(x - 7, TUBE_TOP, 14, TUBE_BOTTOM - TUBE_TOP, { fill: 'var(--paper-raised)', rx: 7 })
    );
    s.appendChild(
      figRect(x - 5, yOf(c), 10, TUBE_BOTTOM - yOf(c) + 4, {
        fill: 'var(--kumkum)',
        stroke: 'none',
        rx: 5,
      })
    );
    s.appendChild(figCircle(x, TUBE_BOTTOM + 8, 11, { fill: 'var(--kumkum)' }));
    s.appendChild(
      figText(x + 14, yOf(c) + 4, formatTemperature(c), {
        size: 13,
        weight: 700,
        anchor: 'start',
        color: 'var(--kumkum)',
      })
    );
    if (o.swing) {
      const [low, high] = DAY_RANGE[place][o.season];
      s.appendChild(
        figRect(x - 26, yOf(high), 8, yOf(low) - yOf(high), {
          fill: 'var(--thread)',
          stroke: 'none',
          rx: 3,
          opacity: 0.8,
        })
      );
      s.appendChild(
        figText(x - 32, (yOf(high) + yOf(low)) / 2 + 4, `${daySwing(place, o.season)}°`, {
          size: 12,
          weight: 700,
          anchor: 'end',
        })
      );
    }
  }
  return s;
}
