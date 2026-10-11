/**
 * Pure domain module for Human Digestion (B3).
 * Governed by docs/rules/SCIENCE_RULES.md §1 & §2.
 */

export type OrganId = 'mouth' | 'pipe' | 'stomach' | 'small' | 'large';

export interface OrganInfo {
  id: OrganId;
  name: string;
  action: string;
  duration: string;
  absorbs: 'nutrients' | 'water' | 'none';
}

export const DIGESTIVE_TRACT_ORDER: readonly OrganId[] = [
  'mouth',
  'pipe',
  'stomach',
  'small',
  'large',
] as const;

export const ORGANS: Record<OrganId, OrganInfo> = {
  mouth: {
    id: 'mouth',
    name: 'Mouth',
    action: 'Teeth chew the food and saliva starts breaking down starch.',
    duration: '10–30 seconds',
    absorbs: 'none',
  },
  pipe: {
    id: 'pipe',
    name: 'Food pipe (Oesophagus)',
    action: 'Muscles squeeze the food bolus down into the stomach.',
    duration: 'a few seconds',
    absorbs: 'none',
  },
  stomach: {
    id: 'stomach',
    name: 'Stomach',
    action: 'Churns and mixes food with gastric juices.',
    duration: '2 to 4 hours',
    absorbs: 'none',
  },
  small: {
    id: 'small',
    name: 'Small intestine',
    action: 'Digestion finishes; long folded walls absorb tiny nutrients into the blood.',
    duration: '3 to 5 hours',
    absorbs: 'nutrients',
  },
  large: {
    id: 'large',
    name: 'Large intestine',
    action: 'Takes back water; unused waste moves toward removal.',
    duration: '10 to 20 hours',
    absorbs: 'water',
  },
};

/**
 * Checks if a provided list of organs matches the true biological sequence.
 */
export function isValidDigestiveSequence(sequence: string[]): boolean {
  if (sequence.length !== DIGESTIVE_TRACT_ORDER.length) return false;
  return sequence.every((organ, idx) => organ === DIGESTIVE_TRACT_ORDER[idx]);
}

/**
 * Returns the next organ in the tract or null if at the end.
 */
export function getNextOrgan(current: OrganId): OrganId | null {
  const idx = DIGESTIVE_TRACT_ORDER.indexOf(current);
  if (idx < 0 || idx >= DIGESTIVE_TRACT_ORDER.length - 1) return null;
  return DIGESTIVE_TRACT_ORDER[idx + 1] ?? null;
}

/**
 * Identifies where nutrients vs water are primarily absorbed.
 */
export function isMainNutrientAbsorptionSite(organ: string): boolean {
  return organ === 'small';
}

export function isMainWaterAbsorptionSite(organ: string): boolean {
  return organ === 'large';
}
