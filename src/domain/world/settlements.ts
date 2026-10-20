/**
 * Cities of India (C3): a settlement grows where people find three things together: water, flat land,
 * and ways to travel and trade. All three make a city, two a town, one a village, none no one at all,
 * so cities do not grow just anywhere.
 */

export type SiteNeed = 'water' | 'flat' | 'travel';
export type SettlementSize = 'none' | 'village' | 'town' | 'city';
export type SiteId = 'riverbank' | 'hilltop' | 'valley' | 'crossroads' | 'lakeside' | 'sandy';

export const SITE_NEEDS: readonly SiteNeed[] = ['water', 'flat', 'travel'];

const SITES: Record<SiteId, readonly SiteNeed[]> = {
  riverbank: ['water', 'flat', 'travel'],
  hilltop: [],
  valley: ['water'],
  crossroads: ['flat', 'travel'],
  lakeside: ['water', 'flat'],
  sandy: ['flat'],
};

export const SITE_IDS: readonly SiteId[] = [
  'hilltop',
  'valley',
  'lakeside',
  'crossroads',
  'riverbank',
  'sandy',
];

const SIZE_BY_COUNT: readonly SettlementSize[] = ['none', 'village', 'town', 'city'];

export function siteHas(site: SiteId): readonly SiteNeed[] {
  return SITES[site];
}

export function siteLacks(site: SiteId): SiteNeed[] {
  return SITE_NEEDS.filter((n) => !SITES[site].includes(n));
}

export function growsInto(site: SiteId): SettlementSize {
  const size = SIZE_BY_COUNT[SITES[site].length];
  if (!size) throw new Error(`Site ${site} has more needs than there are`);
  return size;
}

/** How the river-bank settlement grows as time passes, 0 to 1. */
export function sizeOverTime(p: number): SettlementSize {
  if (p < 1 / 3) return 'village';
  if (p < 2 / 3) return 'town';
  return 'city';
}

export type BigCity = 'kolkata' | 'mumbai' | 'delhi' | 'bengaluru';

/** Four cities and why each grew; the reason ids match the city ids one to one. */
export const BIG_CITIES: readonly BigCity[] = ['kolkata', 'mumbai', 'delhi', 'bengaluru'];

export function grewBecause(city: BigCity, reason: string): boolean {
  return city === reason;
}
