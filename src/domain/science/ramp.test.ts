import { describe, it, expect } from 'vitest';
import { rollDistance, changedVariables, isFairTest, surfacesByFriction } from './ramp';

describe('ramp domain module (K2 Friction Ramp)', () => {
  it('calculates roll distances matching exact invariant values (SCIENCE_RULES.md §2)', () => {
    // Height 1m
    expect(rollDistance(1, 'tile')).toBe(6.0);
    expect(rollDistance(1, 'wood')).toBe(3.8);
    expect(rollDistance(1, 'rug')).toBe(1.9);
    expect(rollDistance(1, 'sand')).toBe(1.2);
  });

  it('validates fair tests: exactly one variable change', () => {
    const run1 = { height: 1, surface: 'tile' as const, car: 'red' };
    const run2 = { height: 1, surface: 'wood' as const, car: 'red' };
    const run3 = { height: 2, surface: 'wood' as const, car: 'red' };

    expect(changedVariables(run1, run2)).toEqual(['surface']);
    expect(isFairTest(run1, run2)).toBe(true);

    // Height AND surface changed -> not a fair test
    expect(changedVariables(run1, run3)).toEqual(['height', 'surface']);
    expect(isFairTest(run1, run3)).toBe(false);
  });

  it('sorts surfaces by friction (highest grip first)', () => {
    expect(surfacesByFriction()).toEqual(['sand', 'rug', 'wood', 'tile']);
  });
});
