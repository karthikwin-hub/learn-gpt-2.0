import { describe, expect, it } from 'vitest';
import {
  COOLEST_HOUR,
  DESERT_HOURS,
  WARMEST_HOUR,
  daySwing,
  helpsWith,
  isColdEnough,
  temperatureAtHour,
} from './desert';

describe('the Thar Desert', () => {
  it('is coolest before sunrise and warmest in mid-afternoon', () => {
    expect(temperatureAtHour('thar', 'summer', COOLEST_HOUR)).toBe(25);
    expect(temperatureAtHour('thar', 'summer', WARMEST_HOUR)).toBe(45);
    expect(temperatureAtHour('thar', 'winter', COOLEST_HOUR)).toBe(5);
  });

  it('swings far more in a day than a seaside town', () => {
    expect(daySwing('thar', 'summer')).toBe(20);
    expect(daySwing('coast', 'summer')).toBe(7);
  });

  it('is cold enough only on a winter morning before sunrise', () => {
    const cold = DESERT_HOURS.filter((h) => isColdEnough('winter', h));
    expect(cold).toEqual([6]);
    expect(DESERT_HOURS.some((h) => isColdEnough('summer', h))).toBe(false);
  });

  it('matches each desert thing to its own help', () => {
    expect(helpsWith('camel', 'camel')).toBe(true);
    expect(helpsWith('camel', 'kund')).toBe(false);
  });

  it('fails fast outside a day', () => {
    expect(() => temperatureAtHour('thar', 'summer', 24)).toThrow();
  });
});
