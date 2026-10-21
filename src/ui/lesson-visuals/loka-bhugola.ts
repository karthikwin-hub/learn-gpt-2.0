/**
 * Lesson pictures for the Loka bhugola knots (feature 047): Prashna art, card figures and mistake pictures.
 */

import { t } from '../../domain/i18n/core';
import { renderIndiaMap } from '../diagrams/loka/india-map';
import type { Landform } from '../../domain/world/landforms';
import type { WaterStore } from '../../domain/world/spheres';
import { renderSection, renderShape } from '../diagrams/loka/landforms';
import { renderGlobe, renderJug, renderSpheres, renderSurface } from '../diagrams/loka/spheres';
import type { VisualsTable } from './types';

const E3_RING: readonly (Landform | null)[] = [null, 'mountain', 'plateau', 'plain'];

/** What the worked example pours out at each step, and what it rings. */
const E2_POURS: readonly (readonly WaterStore[])[] = [[], [], ['salt'], ['salt', 'ice']];
const E2_RING: readonly (WaterStore | null)[] = [null, 'salt', 'ice', 'fresh'];

export const LOKA_BHUGOLA: VisualsTable = {
  E2: {
    prashna: () => renderGlobe(),
    cards: {
      what: () => renderSpheres(),
      idea: () => renderSurface(100),
      why: () => renderSpheres('bio'),
      example: (step) =>
        renderJug({
          poured: E2_POURS[step] ?? [],
          highlight: E2_RING[step] ?? null,
        }),
      where: () => renderJug({ poured: ['salt', 'ice'], highlight: 'fresh' }),
    },
    mistake: (reveal) =>
      reveal ? renderJug({ poured: ['salt', 'ice'], highlight: 'fresh' }) : renderSurface(100),
  },
  E3: {
    prashna: () => renderShape('high', 'flat', { label: t('landforms.table') }),
    cards: {
      what: () => renderSection({ rise: 1 }),
      idea: () => renderSection({ rise: 1, highlight: 'plateau' }),
      why: () => renderSection({ rise: 1, highlight: 'plain' }),
      example: (step) => renderSection({ rise: 1, highlight: E3_RING[step] ?? null }),
      where: () => renderIndiaMap({ zones: ['himalaya', 'plains', 'deccan'] }),
    },
    mistake: (reveal) =>
      reveal
        ? renderShape('high', 'flat')
        : renderShape('high', 'flat', { caption: t('landforms.deccan') }),
  },
};
