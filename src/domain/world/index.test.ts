import { describe, expect, it } from 'vitest';
import {
  COURTYARD,
  DOMAIN_WORLD,
  EVENTS,
  centuryCE,
  chronological,
  hourAt,
  isBlocked,
  isDay,
  isEarlier,
  northernSeason,
  realDistance,
  signed,
  step,
  walk,
  yearsBetween,
} from './index';

describe('src/domain/world', () => {
  it('exports world domain identifier', () => {
    expect(DOMAIN_WORLD).toBe('world');
  });

  it('re-exports timeline, earth, and map domain modules', () => {
    expect(typeof signed).toBe('function');
    expect(typeof yearsBetween).toBe('function');
    expect(typeof isEarlier).toBe('function');
    expect(typeof centuryCE).toBe('function');
    expect(Array.isArray(EVENTS)).toBe(true);
    expect(typeof chronological).toBe('function');

    expect(typeof hourAt).toBe('function');
    expect(typeof isDay).toBe('function');
    expect(typeof northernSeason).toBe('function');

    expect(typeof step).toBe('function');
    expect(typeof walk).toBe('function');
    expect(typeof isBlocked).toBe('function');
    expect(typeof realDistance).toBe('function');
    expect(COURTYARD.cols).toBe(8);
  });
});
