import { describe, expect, it } from 'vitest';
import { hourAt, isDay, northernSeason } from './earth';

describe('domain/world/earth (E1)', () => {
  it('reproduces solar hours for Earth rotation angles', () => {
    // Known values from WORLD_RULES.md & DEV_HANDOFF.md §8.2
    expect(hourAt(0)).toBe(12);
    expect(hourAt(90)).toBe(18);
    expect(hourAt(180)).toBe(0);
    expect(hourAt(270)).toBe(6);
    expect(hourAt(360)).toBe(12);
    expect(hourAt(-90)).toBe(6);
  });

  it('determines day and night accurately', () => {
    expect(isDay(12)).toBe(true);
    expect(isDay(6)).toBe(true);
    expect(isDay(17)).toBe(true);
    expect(isDay(18)).toBe(false);
    expect(isDay(0)).toBe(false);
    expect(isDay(3)).toBe(false);
  });

  it('determines northern hemisphere seasons from axial tilt orientation', () => {
    // Known values from WORLD_RULES.md: tilt angle 5 (June) -> summer, 11 (December) -> winter
    expect(northernSeason(5)).toBe('summer');
    expect(northernSeason(11)).toBe('winter');
    expect(northernSeason(0)).toBe('winter');
    expect(northernSeason(2)).toBe('spring');
    expect(northernSeason(8)).toBe('autumn');
  });
});
