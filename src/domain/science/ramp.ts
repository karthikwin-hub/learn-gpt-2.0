/**
 * Pure domain module for Friction Ramp and Fair Testing (K2).
 * Governed by docs/rules/SCIENCE_RULES.md §1 & §2.
 */

export type SurfaceId = 'tile' | 'wood' | 'rug' | 'sand';

export interface RampRun {
  height: number;
  surface: SurfaceId;
  car: string;
}

export const SURFACES: Record<SurfaceId, number> = {
  tile: 1,
  wood: 1.6,
  rug: 3.2,
  sand: 5,
};

export const SURFACE_ORDER: readonly SurfaceId[] = ['tile', 'wood', 'rug', 'sand'] as const;

/**
 * Calculates model rolling distance in pretend metres.
 * Formula: Math.round((height * 60) / SURFACES[surface]) / 10.
 */
export function rollDistance(height: number, surface: SurfaceId): number {
  const grip = SURFACES[surface];
  if (!grip) throw new Error(`Unknown surface: ${surface}`);
  return Math.round((height * 60) / grip) / 10;
}

/**
 * Returns array of variable names that changed between two runs.
 */
export function changedVariables(a: RampRun, b: RampRun): ('height' | 'surface' | 'car')[] {
  const keys: ('height' | 'surface' | 'car')[] = ['height', 'surface', 'car'];
  return keys.filter((k) => a[k] !== b[k]);
}

/**
 * In a fair test, exactly one variable changes at a time.
 */
export function isFairTest(a: RampRun, b: RampRun): boolean {
  return changedVariables(a, b).length === 1;
}

/**
 * Returns surfaces sorted by friction (highest grip first).
 */
export function surfacesByFriction(): SurfaceId[] {
  return [...SURFACE_ORDER].sort((x, y) => SURFACES[y] - SURFACES[x]);
}
