/**
 * The peninsular plateau (C7): water flows downhill, not to the nearest sea. The Deccan is high at the
 * Western Ghats and tilts down to the east, so the Godavari, Krishna and Kaveri start near the Arabian
 * Sea yet reach the Bay of Bengal. The Narmada and Tapi flow west, in rift valleys that slope west.
 */

export type Sea = 'arabian' | 'bengal';
export type PlateauRiver = 'godavari' | 'krishna' | 'kaveri' | 'narmada' | 'tapi';

export const SEAS: readonly Sea[] = ['arabian', 'bengal'];
/** Start near the west coast, follow the tilt east. */
export const EAST_FLOWING: readonly PlateauRiver[] = ['godavari', 'krishna', 'kaveri'];
/** Run west in rift valleys. */
export const WEST_FLOWING: readonly PlateauRiver[] = ['narmada', 'tapi'];
/** Roughly how far the Godavari's source is from the Arabian Sea, in kilometres. */
export const GODAVARI_SOURCE_TO_WEST_COAST = 80;

export function flowsInRiftValley(river: PlateauRiver): boolean {
  return WEST_FLOWING.includes(river);
}

/** The sea a river reaches: downhill along the tilt, or west along its rift valley. */
export function seaOf(river: PlateauRiver): Sea {
  return flowsInRiftValley(river) ? 'arabian' : 'bengal';
}
