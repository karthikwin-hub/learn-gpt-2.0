import { describe, expect, it } from 'vitest';
import {
  GRID_COLUMNS,
  GRID_ROWS,
  REGIONS,
  STATE_COUNT,
  UT_COUNT,
  hasNeighbours,
  isNeighbour,
  nearButNotTouching,
  regionOf,
} from './states';

describe('states of India', () => {
  it('has 28 states and 8 union territories', () => {
    expect(REGIONS.filter((r) => r.kind === 'state')).toHaveLength(STATE_COUNT);
    expect(REGIONS.filter((r) => r.kind === 'ut')).toHaveLength(UT_COUNT);
    expect(new Set(REGIONS.map((r) => r.id)).size).toBe(REGIONS.length);
  });

  it('borders are shared both ways and name known regions', () => {
    for (const r of REGIONS) {
      for (const n of r.neighbours) {
        expect(isNeighbour(n, r.id), `${n} should border ${r.id}`).toBe(true);
      }
      expect(r.neighbours).not.toContain(r.id);
    }
  });

  it('gives every region its own tile on the grid', () => {
    const tiles = new Set(REGIONS.map((r) => r.tile.join(',')));
    expect(tiles.size).toBe(REGIONS.length);
    for (const r of REGIONS) {
      expect(r.tile[0]).toBeLessThan(GRID_COLUMNS);
      expect(r.tile[1]).toBeLessThan(GRID_ROWS);
    }
  });

  it('Telangana touches Maharashtra, Chhattisgarh, Andhra Pradesh and Karnataka', () => {
    expect([...regionOf('telangana').neighbours].sort()).toEqual(
      ['ap', 'cg', 'karnataka', 'maharashtra'].sort()
    );
    expect(regionOf('telangana').language).toBe('telugu');
  });

  it('island territories touch no state', () => {
    expect(hasNeighbours('lakshadweep')).toBe(false);
    expect(hasNeighbours('andaman')).toBe(false);
    expect(hasNeighbours('telangana')).toBe(true);
  });

  it('offers near regions that share no border', () => {
    const near = nearButNotTouching('telangana', 3);
    expect(near).toHaveLength(3);
    for (const id of near) expect(isNeighbour('telangana', id)).toBe(false);
    expect(near).not.toContain('telangana');
  });

  it('fails fast on an unknown region', () => {
    expect(() => regionOf('atlantis')).toThrow();
  });
});
