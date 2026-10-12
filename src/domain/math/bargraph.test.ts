import { describe, it, expect } from 'vitest';
import {
  readBarValue,
  generateAxisTicks,
  interpolateBarHeight,
  FOOD_INTAKE_DATASET,
} from './bargraph';

describe('bargraph domain logic (Axes, Scale Intervals & Jaal B1 <-> H2)', () => {
  it('reads bar value accurately according to axis step interval', () => {
    // Line 4 on step interval 10 -> 40 (Prashna wonder)
    expect(readBarValue(4, 10)).toBe(40);

    // Line 3 on step interval 5 -> 15 (Vikram's trap debunked)
    expect(readBarValue(3, 5)).toBe(15);

    // Line 5 on step interval 2 -> 10
    expect(readBarValue(5, 2)).toBe(10);

    // Line 2.5 on step interval 10 -> 25
    expect(readBarValue(2.5, 10)).toBe(25);
  });

  it('generates axis ticks spanning from 0 to target max', () => {
    // Max 35 with step interval 10 -> [0, 10, 20, 30, 40]
    expect(generateAxisTicks(35, 10)).toEqual([0, 10, 20, 30, 40]);

    // Max 15 with step interval 5 -> [0, 5, 10, 15]
    expect(generateAxisTicks(15, 5)).toEqual([0, 5, 10, 15]);

    // Max 8 with step interval 2 -> [0, 2, 4, 6, 8]
    expect(generateAxisTicks(8, 2)).toEqual([0, 2, 4, 6, 8]);
  });

  it('interpolates bar height in grid units accurately', () => {
    // Value 25 on step interval 10 -> 2.5 grid units
    expect(interpolateBarHeight(25, 10)).toBe(2.5);

    // Value 15 on step interval 5 -> 3 grid units
    expect(interpolateBarHeight(15, 5)).toBe(3);

    // Value 40 on step interval 10 -> 4 grid units
    expect(interpolateBarHeight(40, 10)).toBe(4);
  });

  it('provides food intake dataset for Jaal B1 <-> H2 integration', () => {
    expect(FOOD_INTAKE_DATASET).toHaveLength(4);
    expect(FOOD_INTAKE_DATASET[0]?.category).toBe('Rice & Roti');
    expect(FOOD_INTAKE_DATASET[1]?.nutrient).toBe('Proteins');
  });
});
