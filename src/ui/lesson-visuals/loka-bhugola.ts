/**
 * Lesson pictures for the Loka bhugola knots (feature 047): Prashna art, card figures and mistake pictures.
 */

import type { WaterStore } from '../../domain/world/spheres';
import { renderGlobe, renderJug, renderSpheres, renderSurface } from '../diagrams/loka/spheres';
import type { VisualsTable } from './types';

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
};
