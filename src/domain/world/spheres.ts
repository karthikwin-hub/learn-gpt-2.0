/**
 * The Earth's four domains (E2 "Land, water, air and life"): how much of the surface is water, which
 * domain everyday things belong to, and how little of the Earth's water is fresh and ready to use.
 * Figures are rounded to whole parts in 100, as taught at this age.
 */

/** Of 100 equal parts of the Earth's surface, about this many are covered by water. */
export const SURFACE_WATER_PARTS = 71;
export const SURFACE_PARTS = 100;
export const SURFACE_LAND_PARTS = SURFACE_PARTS - SURFACE_WATER_PARTS;

export type Sphere = 'litho' | 'hydro' | 'atmo' | 'bio';
export const SPHERES: readonly Sphere[] = ['litho', 'hydro', 'atmo', 'bio'];

export type SphereThing =
  'mountain' | 'soil' | 'ocean' | 'river' | 'oxygen' | 'wind' | 'tree' | 'fish';

const SPHERE_OF: Record<SphereThing, Sphere> = {
  mountain: 'litho',
  soil: 'litho',
  ocean: 'hydro',
  river: 'hydro',
  oxygen: 'atmo',
  wind: 'atmo',
  tree: 'bio',
  fish: 'bio',
};

export const SPHERE_THINGS: readonly SphereThing[] = [
  'fish',
  'mountain',
  'wind',
  'river',
  'tree',
  'soil',
  'oxygen',
  'ocean',
];

export function sphereOf(thing: SphereThing): Sphere {
  return SPHERE_OF[thing];
}

export type WaterStore = 'salt' | 'ice' | 'fresh';
export const WATER_STORES: readonly WaterStore[] = ['salt', 'ice', 'fresh'];

/** All the Earth's water shared out as 100 drops. */
export const WATER_DROPS: Record<WaterStore, number> = { salt: 97, ice: 2, fresh: 1 };
export const TOTAL_DROPS = WATER_DROPS.salt + WATER_DROPS.ice + WATER_DROPS.fresh;

/** Drops left in the jug after pouring out the given stores. */
export function dropsLeft(poured: readonly WaterStore[]): number {
  const out = new Set(poured);
  return WATER_STORES.filter((s) => !out.has(s)).reduce((n, s) => n + WATER_DROPS[s], 0);
}
