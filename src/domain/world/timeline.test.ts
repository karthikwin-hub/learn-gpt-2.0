import { describe, expect, it } from 'vitest';
import { EVENTS, centuryCE, chronological, isEarlier, signed, yearsBetween } from './timeline';

describe('domain/world/timeline (I2)', () => {
  it('throws on year zero or non-positive year', () => {
    expect(() => signed(0, 'BCE')).toThrow('Years start at 1: 0');
    expect(() => signed(0, 'CE')).toThrow('Years start at 1: 0');
    expect(() => signed(-5, 'CE')).toThrow();
  });

  it('correctly maps BCE to negative and CE to positive', () => {
    expect(signed(250, 'BCE')).toBe(-250);
    expect(signed(499, 'CE')).toBe(499);
  });

  it('calculates historical intervals without year zero', () => {
    // Known values from WORLD_RULES.md and DEV_HANDOFF.md §8.2
    expect(yearsBetween(-250, 499)).toBe(748);
    expect(yearsBetween(-100, 100)).toBe(199);
    expect(yearsBetween(-50, 50)).toBe(99);
    expect(yearsBetween(499, -250)).toBe(748);
    expect(yearsBetween(1, 100)).toBe(99);
    expect(yearsBetween(-100, -1)).toBe(99);
    expect(yearsBetween(-1, 1)).toBe(1);
  });

  it('evaluates whether a year is earlier', () => {
    expect(isEarlier(-2500, -250)).toBe(true);
    expect(isEarlier(-250, 499)).toBe(true);
    expect(isEarlier(1947, 499)).toBe(false);
  });

  it('maps CE years to ordinal centuries', () => {
    expect(centuryCE(100)).toBe(1);
    expect(centuryCE(101)).toBe(2);
    expect(centuryCE(1947)).toBe(20);
    expect(centuryCE(2000)).toBe(20);
    expect(centuryCE(2023)).toBe(21);
  });

  it('validates chronological order of historical events', () => {
    const sortedIds = ['harappa', 'ashoka', 'aryabhata', 'taj', 'independence', 'chandrayaan'];
    expect(chronological(sortedIds)).toBe(true);
    expect(chronological(['ashoka', 'harappa'])).toBe(false);
    expect(chronological(['taj', 'chandrayaan', 'independence'])).toBe(false);
  });

  it('contains the 6 canonical Class 5 anchor events', () => {
    expect(EVENTS.length).toBe(6);
    expect(EVENTS.map((e) => e.id)).toEqual([
      'harappa',
      'ashoka',
      'aryabhata',
      'taj',
      'independence',
      'chandrayaan',
    ]);
  });
});
