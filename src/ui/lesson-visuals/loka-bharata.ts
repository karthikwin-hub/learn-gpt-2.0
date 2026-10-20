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
import { renderGreetings } from '../diagrams/loka/unity';
import { FESTIVALS, FESTIVAL_REGION, GREETINGS } from '../../domain/world/unity';
import { renderFlow, renderGanga } from '../diagrams/loka/rivers';
import { GANGA_PLACES } from '../../domain/world/rivers';
import { renderPlateau } from '../diagrams/loka/plateau';
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

const C7_ALL_EAST = { godavari: 1, krishna: 1, kaveri: 1 } as const;

/** The worked example: the source, the edge of the plains, then all the way to the sea. */
const C8_REACHED = [0, 1, 2, 6] as const;

const C9_FESTIVAL_STATES = FESTIVALS.map((f) => FESTIVAL_REGION[f]);
const C9_LANGUAGES = GREETINGS.map((g) => g.language);
/** The worked example lights Punjab, then Tamil Nadu, then Gujarat and Assam. */
const C9_EXAMPLE: readonly (readonly string[])[] = [
  [],
  [FESTIVAL_REGION.lohri],
  [FESTIVAL_REGION.lohri, FESTIVAL_REGION.pongal],
  C9_FESTIVAL_STATES,
];

export const LOKA_BHARATA: VisualsTable = {
  C9: {
    prashna: () => renderIndia({ found: C9_FESTIVAL_STATES, caption: t('unity.january') }),
    cards: {
      what: () => renderGreetings(),
      idea: () => renderIndia({ found: C9_FESTIVAL_STATES, caption: t('unity.january') }),
      why: () => renderGreetings({ matched: C9_LANGUAGES }),
      example: (step) =>
        renderIndia({ found: C9_EXAMPLE[step] ?? [], caption: t('unity.january') }),
      where: () => renderGreetings({ matched: C9_LANGUAGES }),
    },
    mistake: (reveal) =>
      renderIndia({
        found: [FESTIVAL_REGION.pongal, FESTIVAL_REGION.lohri],
        caption: reveal ? t('unity.january') : undefined,
      }),
  },
  C8: {
    prashna: () => renderGanga({ drawn: 1 }),
    cards: {
      what: () => renderGanga({ drawn: 1, shown: ['gangotri', 'sundarbans'] }),
      idea: () => renderFlow({ month: 4 }),
      why: () => renderFlow({ month: 5 }),
      example: (step) => {
        const n = C8_REACHED[step] ?? 0;
        const shown = GANGA_PLACES.slice(0, n);
        return renderGanga({
          drawn: n <= 1 ? 0 : (n - 1) / (GANGA_PLACES.length - 1),
          shown,
          highlight: shown[shown.length - 1] ?? null,
        });
      },
      where: () => renderGanga({ drawn: 1, shown: ['prayagraj', 'varanasi', 'patna'] }),
    },
    mistake: (reveal) =>
      reveal
        ? renderGanga({ drawn: 1, shown: ['gangotri', 'sundarbans'], highlight: 'sundarbans' })
        : renderGanga({ shown: ['gangotri'], highlight: 'gangotri' }),
  },
  C7: {
    prashna: () => renderPlateau({ highlight: 'godavari' }),
    cards: {
      what: () => renderPlateau({ rain: true }),
      idea: () => renderPlateau({ run: { ...C7_ALL_EAST, narmada: 1, tapi: 1 }, rifts: true }),
      why: () => renderPlateau({ run: C7_ALL_EAST }),
      example: (step) =>
        renderPlateau({
          run: { krishna: step === 0 ? 0 : step === 1 ? 0.1 : step === 2 ? 0.6 : 1 },
          highlight: 'krishna',
        }),
      where: () => renderPlateau({ run: { ...C7_ALL_EAST, narmada: 1 }, highlight: 'narmada' }),
    },
    mistake: (reveal) =>
      renderPlateau({ run: { godavari: reveal ? 1 : 0.1 }, highlight: 'godavari' }),
  },
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
