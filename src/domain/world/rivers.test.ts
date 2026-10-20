import { describe, expect, it } from 'vitest';
import {
  DRY_MONTH,
  GANGA_PLACES,
  PLACE_HEIGHT,
  flowsIn,
  isDownstreamOrder,
  waterLevel,
} from './rivers';

describe('rivers of India', () => {
  it('runs the Ganga downhill from source to mouth', () => {
    const heights = GANGA_PLACES.map((p) => PLACE_HEIGHT[p]);
    for (let i = 1; i < heights.length; i++) expect(heights[i]).toBeLessThan(heights[i - 1] ?? 0);
    expect(PLACE_HEIGHT.gangotri).toBe(4000);
    expect(PLACE_HEIGHT.sundarbans).toBe(0);
  });

  it('keeps a snow-fed river flowing all year, a rain-fed one only after the rains', () => {
    for (let m = 1; m <= 12; m++) expect(flowsIn('snow', m)).toBe(true);
    expect(flowsIn('rain', DRY_MONTH)).toBe(false);
    expect(flowsIn('rain', 8)).toBe(true);
    expect(waterLevel('snow', 8)).toBe(3);
    expect(waterLevel('rain', 8)).toBe(3);
    expect(waterLevel('snow', 1)).toBe(1);
  });

  it('checks the order the water passes the places', () => {
    expect(isDownstreamOrder(['gangotri', 'haridwar'])).toBe(true);
    expect(isDownstreamOrder(['gangotri', 'patna'])).toBe(false);
  });

  it('fails fast outside the year', () => {
    expect(() => waterLevel('rain', 13)).toThrow();
  });
});
