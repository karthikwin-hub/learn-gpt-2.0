/**
 * Lesson pictures for the Loka bharata knots (feature 047): Prashna art, card figures and mistake pictures.
 */

import { t } from '../../domain/i18n/core';
import { BIGGEST_CITY_EXAMPLE, EXAMPLE_REGION, regionOf } from '../../domain/world/states';
import { FIELDS } from '../../domain/world/farming';
import type { SettlementSize } from '../../domain/world/settlements';
import { renderLand } from '../diagrams/loka/cities';
import { renderYear } from '../diagrams/loka/farms';
import { renderClimb } from '../diagrams/loka/himalaya';
import { renderDay } from '../diagrams/loka/desert';
import type { DesertSeason } from '../../domain/world/desert';
import { renderPlain } from '../diagrams/loka/plains';
import type { HimalayanRange } from '../../domain/world/himalaya';
import { renderIndia } from '../diagrams/loka/states';
import type { VisualsTable } from './types';

const C1_NEIGHBOURS = regionOf(EXAMPLE_REGION).neighbours;
const c1Example = (step: number) => {
  if (step === 0) return renderIndia();
  const caption =
    step === 1
      ? t('states.capIs', { capital: t(`states.cap.${EXAMPLE_REGION}`) })
      : step === 2
        ? t('states.factLang', { language: t(`states.lang.${regionOf(EXAMPLE_REGION).language}`) })
        : t(`states.n.${EXAMPLE_REGION}`);
  return renderIndia({
    chosen: EXAMPLE_REGION,
    found: step === 3 ? C1_NEIGHBOURS : [],
    caption,
  });
};

/** The worked example's field through one year: nothing yet, then rice, wheat and watermelon. */
const C2_STEPS = [null, ...FIELDS] as const;

const C3_GROWTH: readonly (SettlementSize | null)[] = [null, 'village', 'town', 'city'];

/** The worked example's climb: the plains, then one stop on each range. */
const C4_STOPS: readonly (readonly [number | null, HimalayanRange | null])[] = [
  [null, null],
  [1000, 'shivalik'],
  [4000, 'himachal'],
  [6000, 'himadri'],
];

/** The worked example: one summer day, then the same dawn in winter. */
const C6_STEPS: readonly (readonly [DesertSeason, number])[] = [
  ['summer', 12],
  ['summer', 6],
  ['summer', 15],
  ['winter', 6],
];

export const LOKA_BHARATA: VisualsTable = {
  C6: {
    prashna: () => renderDay({ season: 'summer', hour: 15 }),
    cards: {
      what: () => renderDay({ season: 'summer', hour: 15 }),
      idea: () => renderDay({ season: 'summer', hour: 6, swing: true }),
      why: () => renderDay({ season: 'winter', hour: 0 }),
      example: (step) => {
        const [season, hour] = C6_STEPS[step] ?? ['summer', 12];
        return renderDay({ season, hour, swing: step === 3 });
      },
      where: () => renderDay({ season: 'winter', hour: 15 }),
    },
    mistake: (reveal) => renderDay({ season: 'winter', hour: reveal ? 6 : 12 }),
  },
  C5: {
    prashna: () => renderPlain({ layers: 4 }),
    cards: {
      what: () => renderPlain({ layers: 4, crops: true }),
      idea: () => renderPlain({ layers: 2 }),
      why: () => renderPlain({ layers: 4, crops: true }),
      example: (step) =>
        step === 1 ? renderPlain({ silt: 0.4 }) : renderPlain({ layers: step === 3 ? 4 : 3 }),
      where: () => renderPlain({ layers: 4, crops: true }),
    },
    mistake: (reveal) =>
      reveal ? renderPlain({ layers: 4, crops: true }) : renderPlain({ silt: 0.7 }),
  },
  C4: {
    prashna: () => renderClimb(),
    cards: {
      what: () => renderClimb(),
      idea: () => renderClimb({ height: 5000 }),
      why: () => renderClimb({ height: 2000, highlight: 'himachal' }),
      example: (step) => {
        const [height, highlight] = C4_STOPS[step] ?? [null, null];
        return renderClimb({ height, highlight });
      },
      where: () => renderClimb({ height: 6000, highlight: 'himadri' }),
    },
    mistake: (reveal) => renderClimb({ height: reveal ? 4000 : 0 }),
  },
  C3: {
    prashna: () => renderLand({ grown: { riverbank: 'city' } }),
    cards: {
      what: () =>
        renderLand({ grown: { valley: 'village', crossroads: 'town', riverbank: 'city' } }),
      idea: () => renderLand({ grown: { riverbank: 'city' }, chosen: 'riverbank' }),
      why: () => renderLand({ grown: { hilltop: 'none', riverbank: 'city' }, chosen: 'hilltop' }),
      example: (step) => {
        const size = C3_GROWTH[step] ?? null;
        return renderLand({ grown: size ? { riverbank: size } : {}, chosen: 'riverbank' });
      },
      where: () =>
        renderLand({ grown: { crossroads: 'town', lakeside: 'town', riverbank: 'city' } }),
    },
    mistake: (reveal) =>
      reveal
        ? renderLand({ grown: { hilltop: 'none', riverbank: 'city' }, chosen: 'riverbank' })
        : renderLand({ grown: { hilltop: 'none' }, chosen: 'hilltop' }),
  },
  C2: {
    prashna: () => renderYear({ month: 6 }),
    cards: {
      what: () => renderYear(),
      idea: () => renderYear({ highlight: 'kharif' }),
      why: () => renderYear({ highlight: 'rabi' }),
      example: (step) => {
        const s = C2_STEPS[step] ?? null;
        return s ? renderYear({ month: s.month, crop: s.crop }) : renderYear();
      },
      where: () => renderYear({ highlight: 'zaid' }),
    },
    mistake: (reveal) =>
      reveal ? renderYear({ month: 6, crop: 'rice' }) : renderYear({ month: 6, crop: 'wheat' }),
  },
  C1: {
    prashna: () =>
      renderIndia({
        chosen: BIGGEST_CITY_EXAMPLE,
        caption: t('states.biggest', { city: t('states.ahmedabad') }),
      }),
    cards: {
      what: () => renderIndia(),
      idea: () =>
        renderIndia({
          chosen: EXAMPLE_REGION,
          caption: t('states.capIs', { capital: t(`states.cap.${EXAMPLE_REGION}`) }),
        }),
      why: () =>
        renderIndia({
          chosen: EXAMPLE_REGION,
          found: C1_NEIGHBOURS,
          caption: t(`states.n.${EXAMPLE_REGION}`),
        }),
      example: c1Example,
      where: () =>
        renderIndia({ chosen: EXAMPLE_REGION, caption: t(`states.n.${EXAMPLE_REGION}`) }),
    },
    mistake: (reveal) =>
      renderIndia({
        chosen: BIGGEST_CITY_EXAMPLE,
        caption: reveal
          ? t('states.capIs', { capital: t(`states.cap.${BIGGEST_CITY_EXAMPLE}`) })
          : t('states.biggest', { city: t('states.ahmedabad') }),
      }),
  },
};
