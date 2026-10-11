import { describe, expect, it } from 'vitest';
import { COURTYARD, isBlocked, realDistance, step, walk } from './map';

describe('domain/world/map (E4)', () => {
  it('steps correctly in cardinal directions', () => {
    expect(step([1, 1], 'N')).toEqual([1, 0]);
    expect(step([1, 1], 'E')).toEqual([2, 1]);
    expect(step([1, 1], 'S')).toEqual([1, 2]);
    expect(step([1, 1], 'W')).toEqual([0, 1]);
  });

  it('detects boundary walls and house obstacles accurately', () => {
    // Known values from WORLD_RULES.md & DEV_HANDOFF.md §8.2
    expect(isBlocked(4, 3)).toBe(true); // house
    expect(isBlocked(5, 3)).toBe(true); // house
    expect(isBlocked(4, 4)).toBe(true); // house
    expect(isBlocked(5, 4)).toBe(true); // house
    expect(isBlocked(0, 0)).toBe(false); // empty courtyard cell
    expect(isBlocked(8, 0)).toBe(true); // outside right boundary
    expect(isBlocked(-1, 0)).toBe(true); // outside left boundary
    expect(isBlocked(0, -1)).toBe(true); // outside top boundary
    expect(isBlocked(0, 6)).toBe(true); // outside bottom boundary
  });

  it('multiplies steps by linear scale to get real distance', () => {
    // Known values from WORLD_RULES.md & DEV_HANDOFF.md §8.2
    expect(realDistance(9, 5)).toBe(45);
    expect(realDistance(3, 10)).toBe(30);
    expect(realDistance(0, 5)).toBe(0);
  });

  it('reproduces the gate-to-well walk without colliding with obstacles', () => {
    const gate = COURTYARD.places.gate;
    const well = COURTYARD.places.well;
    const moves: readonly ('N' | 'E' | 'S' | 'W')[] = ['N', 'N', 'N', 'E', 'N', 'E', 'E', 'E', 'E'];
    const path = walk(gate, moves);

    expect(path.length).toBe(10); // start + 9 steps
    expect(path[0]).toEqual([1, 5]); // gate
    expect(path[path.length - 1]).toEqual([6, 1]); // well
    expect(path[path.length - 1]).toEqual([well[0], well[1]]);

    // Confirm no step in the walk intersects any blocked cell
    for (const point of path) {
      expect(isBlocked(point[0], point[1])).toBe(false);
    }
  });
});
