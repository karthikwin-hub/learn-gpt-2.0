import { describe, expect, it } from 'vitest';
import {
  CROPS,
  CROP_SEASONS,
  FIELD_CROPS,
  FIELDS,
  SOWING_MONTHS,
  canSow,
  seasonOfCrop,
  sowingSeasonOf,
} from './farming';

describe('farming seasons', () => {
  it('sows rice with the monsoon and wheat in winter', () => {
    expect(seasonOfCrop('rice')).toBe('kharif');
    expect(seasonOfCrop('wheat')).toBe('rabi');
    expect(seasonOfCrop('watermelon')).toBe('zaid');
    expect(sowingSeasonOf(6)).toBe('kharif');
    expect(sowingSeasonOf(11)).toBe('rabi');
    expect(sowingSeasonOf(4)).toBe('zaid');
  });

  it('has two crops in every season and no month in two seasons', () => {
    for (const s of CROP_SEASONS)
      expect(CROPS.filter((c) => seasonOfCrop(c) === s)).toHaveLength(2);
    const months = CROP_SEASONS.flatMap((s) => SOWING_MONTHS[s]);
    expect(new Set(months).size).toBe(months.length);
  });

  it('wheat sown in June fails, rice sown in June grows', () => {
    expect(canSow('wheat', 6)).toBe(false);
    expect(canSow('rice', 6)).toBe(true);
  });

  it('has months of growing and harvest when nothing new is sown', () => {
    expect(sowingSeasonOf(1)).toBeNull();
    expect(sowingSeasonOf(9)).toBeNull();
  });

  it('gives each bench field exactly one right crop, the one it names', () => {
    for (const f of FIELDS) {
      expect(FIELD_CROPS.filter((c) => canSow(c, f.month))).toEqual([f.crop]);
    }
  });

  it('fails fast on a month that does not exist', () => {
    expect(() => sowingSeasonOf(13)).toThrow();
    expect(() => sowingSeasonOf(0)).toThrow();
  });
});
