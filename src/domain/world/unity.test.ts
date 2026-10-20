import { describe, expect, it } from 'vitest';
import { regionOf } from './states';
import {
  FESTIVALS,
  FESTIVAL_REGION,
  GREETINGS,
  SCHEDULED_LANGUAGES,
  isFestivalOf,
  isGreetingIn,
} from './unity';

describe('unity in diversity', () => {
  it('places each harvest festival in a real state', () => {
    for (const f of FESTIVALS) expect(regionOf(FESTIVAL_REGION[f]).kind).toBe('state');
    expect(isFestivalOf('pongal', 'tn')).toBe(true);
    expect(isFestivalOf('lohri', 'assam')).toBe(false);
  });

  it('greets in five languages, each in its own script', () => {
    expect(new Set(GREETINGS.map((g) => g.language)).size).toBe(5);
    expect(isGreetingIn('tamil', 'tamil')).toBe(true);
    expect(isGreetingIn('tamil', 'hindi')).toBe(false);
  });

  it('counts the 22 scheduled languages', () => {
    expect(SCHEDULED_LANGUAGES).toBe(22);
  });
});
