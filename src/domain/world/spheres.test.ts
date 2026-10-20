import { describe, expect, it } from 'vitest';
import {
  SPHERES,
  SPHERE_THINGS,
  SURFACE_LAND_PARTS,
  SURFACE_WATER_PARTS,
  TOTAL_DROPS,
  WATER_DROPS,
  dropsLeft,
  sphereOf,
} from './spheres';

describe('spheres', () => {
  it('splits the surface into about 71 parts water and 29 land', () => {
    expect(SURFACE_WATER_PARTS).toBe(71);
    expect(SURFACE_LAND_PARTS).toBe(29);
  });

  it('puts two of the eight things in each domain', () => {
    for (const s of SPHERES) expect(SPHERE_THINGS.filter((t) => sphereOf(t) === s)).toHaveLength(2);
    expect(sphereOf('river')).toBe('hydro');
    expect(sphereOf('tree')).toBe('bio');
  });

  it('shares the Earth’s water as 100 drops, about 1 fresh', () => {
    expect(TOTAL_DROPS).toBe(100);
    expect(WATER_DROPS).toEqual({ salt: 97, ice: 2, fresh: 1 });
    expect(dropsLeft([])).toBe(100);
    expect(dropsLeft(['salt'])).toBe(3);
    expect(dropsLeft(['salt', 'ice'])).toBe(1);
    expect(dropsLeft(['salt', 'salt'])).toBe(3);
  });
});
