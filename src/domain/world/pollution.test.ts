import { describe, expect, it } from 'vitest';
import {
  MAX_READING,
  POLLUTION_CAUSES,
  POLLUTION_KINDS,
  WASTE_ITEMS,
  binFor,
  effectsOf,
  isAllClean,
  pollutionReadings,
} from './pollution';

describe('pollution', () => {
  it('is clean with no cause on, and every part is dirtied when all are on', () => {
    expect(isAllClean([])).toBe(true);
    const all = pollutionReadings(POLLUTION_CAUSES);
    for (const k of POLLUTION_KINDS) expect(all[k]).toBeGreaterThan(0);
    expect(all).toEqual({ air: 3, water: 3, land: 1, noise: 1 });
    expect(MAX_READING).toBe(3);
  });

  it('turning one cause off lowers exactly the parts it dirties', () => {
    const without = pollutionReadings(POLLUTION_CAUSES.filter((c) => c !== 'burning'));
    expect(without.air).toBe(2);
    expect(without.water).toBe(3);
    expect(effectsOf('burning')).toEqual(['air']);
  });

  it('counts a repeated cause once', () => {
    expect(pollutionReadings(['sewage', 'sewage']).water).toBe(1);
    expect(isAllClean(['traffic'])).toBe(false);
  });

  it('sorts three wet and three dry items', () => {
    expect(WASTE_ITEMS.filter((i) => binFor(i) === 'wet').sort()).toEqual([
      'leaves',
      'peel',
      'tea',
    ]);
    expect(WASTE_ITEMS.filter((i) => binFor(i) === 'dry').sort()).toEqual([
      'bottle',
      'can',
      'paper',
    ]);
  });
});
