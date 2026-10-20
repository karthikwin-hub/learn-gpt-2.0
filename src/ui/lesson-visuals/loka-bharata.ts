/**
 * Lesson pictures for the Loka bharata knots (feature 047): Prashna art, card figures and mistake pictures.
 */

import { t } from '../../domain/i18n/core';
import { BIGGEST_CITY_EXAMPLE, EXAMPLE_REGION, regionOf } from '../../domain/world/states';
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

export const LOKA_BHARATA: VisualsTable = {
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
