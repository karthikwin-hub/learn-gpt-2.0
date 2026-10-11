/**
 * Pure domain module for Seed Anatomy and Germination (J2).
 */

export type SeedPartId = 'coat' | 'cotyledon' | 'radicle' | 'plumule';

export interface SeedPart {
  id: SeedPartId;
  name: string;
  role: string;
}

export const SEED_PARTS: Record<SeedPartId, SeedPart> = {
  coat: {
    id: 'coat',
    name: 'Seed Coat (Testa)',
    role: 'Protects the delicate seed embryo inside until conditions are right.',
  },
  cotyledon: {
    id: 'cotyledon',
    name: 'Cotyledon',
    role: 'Stored food supply providing energy before the plant grows green leaves.',
  },
  radicle: {
    id: 'radicle',
    name: 'Radicle',
    role: 'First part of the embryo to grow, pushing downward into soil to become the root.',
  },
  plumule: {
    id: 'plumule',
    name: 'Plumule',
    role: 'Embryo shoot that grows upward toward light to become the stem and first true leaves.',
  },
};

export interface GerminationConditions {
  water: boolean;
  air: boolean;
  warmth: boolean;
}

/**
 * Checks whether all necessary living conditions exist for germination.
 */
export function canGerminate(conditions: GerminationConditions): boolean {
  return conditions.water && conditions.air && conditions.warmth;
}

export type GerminationStage = 'dormant' | 'swelling' | 'root' | 'shoot';

/**
 * Computes germination progress based on days and conditions.
 */
export function getGerminationStage(
  day: number,
  conditions: GerminationConditions
): GerminationStage {
  if (!canGerminate(conditions) || day <= 0) return 'dormant';
  if (day <= 2) return 'swelling';
  if (day <= 4) return 'root';
  return 'shoot';
}
