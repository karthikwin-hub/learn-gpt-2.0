import { describe, it, expect } from 'vitest';
import { STICK_HEIGHT, shadowLength, shadowDarkness } from './shadow';

describe('shadow domain module (R1 Shadow and Light)', () => {
  it('calculates shadow length using exact invariant values (SCIENCE_RULES.md §2)', () => {
    // stickH = 1.5, lampH = 2.5, dist = 3.0 -> length = 4.5
    expect(shadowLength(1.5, 2.5, 3.0)).toBe(4.5);
  });

  it('returns Infinity when lamp is lower than or equal to stick height', () => {
    expect(shadowLength(STICK_HEIGHT, 1.5, 3)).toBe(Infinity);
    expect(shadowLength(STICK_HEIGHT, 1.0, 3)).toBe(Infinity);
  });

  it('evaluates material darkness ordering correctly', () => {
    expect(shadowDarkness('cardboard')).toBe(1);
    expect(shadowDarkness('wax')).toBe(0.4);
    expect(shadowDarkness('glass')).toBe(0.05);

    expect(shadowDarkness('cardboard')).toBeGreaterThan(shadowDarkness('wax'));
    expect(shadowDarkness('wax')).toBeGreaterThan(shadowDarkness('glass'));
  });
});
