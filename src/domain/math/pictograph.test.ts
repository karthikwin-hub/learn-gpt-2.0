import { describe, it, expect } from 'vitest';
import {
  calculateTotalFromIcons,
  iconsRequiredForCount,
  validatePictographScale,
} from './pictograph';

describe('pictograph domain logic (Scaled Keys & Data Representation)', () => {
  it('calculates total count correctly from icons and key scale', () => {
    // 4 book symbols where 1 symbol = 5 books -> 20 books (Prashna wonder)
    expect(calculateTotalFromIcons(4, 0, 5)).toBe(20);

    // 3 bicycle icons where 1 icon = 10 bicycles -> 30 bicycles (Anita's trap debunked)
    expect(calculateTotalFromIcons(3, 0, 10)).toBe(30);

    // 3 stars + 1 half star where 1 star = 4 students -> 12 + 2 = 14 students (Worked example)
    expect(calculateTotalFromIcons(3, 1, 4)).toBe(14);

    // Zero icons -> 0
    expect(calculateTotalFromIcons(0, 0, 5)).toBe(0);
  });

  it('determines icons required for a given count', () => {
    // 25 items with key scale 10 -> 2 full icons, 1 half icon, 0 remainder
    const r1 = iconsRequiredForCount(25, 10);
    expect(r1.full).toBe(2);
    expect(r1.half).toBe(1);
    expect(r1.remainder).toBe(0);

    // 20 items with key scale 5 -> 4 full icons
    const r2 = iconsRequiredForCount(20, 5);
    expect(r2.full).toBe(4);
    expect(r2.half).toBe(0);
    expect(r2.remainder).toBe(0);

    // 14 items with key scale 4 -> 3 full (12), 1 half (2), 0 remainder
    const r3 = iconsRequiredForCount(14, 4);
    expect(r3.full).toBe(3);
    expect(r3.half).toBe(1);
    expect(r3.remainder).toBe(0);
  });

  it('validates whether a scale cleanly represents dataset counts', () => {
    // Scale 10 cleanly divides [20, 30, 25, 15] (all multiples of 5, which is 10/2)
    expect(validatePictographScale([20, 30, 25, 15], 10)).toBe(true);

    // Scale 10 cannot represent 23 cleanly
    expect(validatePictographScale([20, 23], 10)).toBe(false);

    // Scale 5 cleanly divides [10, 15, 20]
    expect(validatePictographScale([10, 15, 20], 5)).toBe(true);
  });
});
