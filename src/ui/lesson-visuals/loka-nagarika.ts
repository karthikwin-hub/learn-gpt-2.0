/**
 * Lesson pictures for the Loka nagarika knots (feature 047): Prashna art, card figures and mistake pictures.
 */

import { RIGHTS } from '../../domain/world/citizenship';
import { renderPairs, renderPark, renderParks } from '../diagrams/loka/citizen';
import { renderLane, renderLevels } from '../diagrams/loka/govern';
import type { VisualsTable } from './types';

export const LOKA_NAGARIKA: VisualsTable = {
  Q1: {
    prashna: () => renderLane(false),
    cards: {
      what: () => renderLevels({ shown: 3 }),
      idea: () => renderLevels({ shown: 3, leaders: true }),
      why: () => renderLevels({ shown: 3, icons: { local: 'streetlight', union: 'coin' } }),
      example: (step) =>
        renderLevels({
          shown: 3,
          highlight: ([null, 'local', 'state', 'union'] as const)[step] ?? null,
          icons: {
            ...(step >= 1 ? { local: 'streetlight' as const } : {}),
            ...(step >= 2 ? { state: 'road' as const } : {}),
            ...(step >= 3 ? { union: 'coin' as const } : {}),
          },
        }),
      where: () =>
        renderLevels({
          shown: 3,
          leaders: true,
          icons: { local: 'streetlight', state: 'road', union: 'coin' },
        }),
    },
    mistake: (reveal) =>
      renderLevels({
        shown: 3,
        highlight: reveal ? 'local' : 'union',
        icons: reveal ? { local: 'streetlight' } : { union: 'streetlight' },
      }),
  },
  Q2: {
    prashna: () => renderPark(true),
    cards: {
      what: () => renderParks(2),
      idea: () => renderPairs(RIGHTS),
      why: () => renderPark(false),
      example: (step) => renderPairs(RIGHTS.slice(0, step), RIGHTS[step - 1] ?? null),
      where: () => renderPairs(RIGHTS, 'vote'),
    },
    mistake: (reveal) => (reveal ? renderPark(true) : renderPark(false, true)),
  },
};
