import { describe, expect, it } from 'vitest';
import {
  RANGES,
  RANGE_HEIGHT,
  freezingStep,
  isFreezing,
  isRisingOrder,
  temperatureAt,
} from './himalaya';

describe('the Himalaya', () => {
  it('gets about 6.5 °C colder for every 1,000 metres', () => {
    expect(temperatureAt(0)).toBe(32);
    expect(temperatureAt(1000)).toBe(25.5);
    expect(temperatureAt(4000)).toBe(6);
    expect(temperatureAt(6000)).toBe(-7);
  });

  it('freezes at about 5,000 metres from a 32 °C plain', () => {
    expect(isFreezing(4000)).toBe(false);
    expect(freezingStep()).toBe(5000);
    expect(temperatureAt(5000)).toBe(-0.5);
  });

  it('rises from the Shivalik to the Himachal to the Himadri', () => {
    expect(RANGES).toEqual(['shivalik', 'himachal', 'himadri']);
    expect(RANGE_HEIGHT.shivalik).toBeLessThan(RANGE_HEIGHT.himachal);
    expect(RANGE_HEIGHT.himachal).toBeLessThan(RANGE_HEIGHT.himadri);
    expect(isRisingOrder(['shivalik', 'himachal'])).toBe(true);
    expect(isRisingOrder(['himadri'])).toBe(false);
  });

  it('fails fast below the plains', () => {
    expect(() => temperatureAt(-1)).toThrow();
  });
});
