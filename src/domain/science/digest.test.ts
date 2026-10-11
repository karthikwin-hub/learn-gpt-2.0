import { describe, it, expect } from 'vitest';
import {
  DIGESTIVE_TRACT_ORDER,
  isValidDigestiveSequence,
  getNextOrgan,
  isMainNutrientAbsorptionSite,
  isMainWaterAbsorptionSite,
} from './digest';

describe('digest domain module (B3 Digestion Journey)', () => {
  it('enforces exact invariant digestive tract sequence (SCIENCE_RULES.md §2)', () => {
    expect(DIGESTIVE_TRACT_ORDER).toEqual(['mouth', 'pipe', 'stomach', 'small', 'large']);
    expect(isValidDigestiveSequence(['mouth', 'pipe', 'stomach', 'small', 'large'])).toBe(true);
    expect(isValidDigestiveSequence(['mouth', 'stomach', 'pipe', 'small', 'large'])).toBe(false);
  });

  it('determines next organ along the tract', () => {
    expect(getNextOrgan('mouth')).toBe('pipe');
    expect(getNextOrgan('pipe')).toBe('stomach');
    expect(getNextOrgan('stomach')).toBe('small');
    expect(getNextOrgan('small')).toBe('large');
    expect(getNextOrgan('large')).toBeNull();
  });

  it('identifies nutrient and water absorption sites accurately', () => {
    expect(isMainNutrientAbsorptionSite('small')).toBe(true);
    expect(isMainNutrientAbsorptionSite('stomach')).toBe(false);
    expect(isMainNutrientAbsorptionSite('mouth')).toBe(false);

    expect(isMainWaterAbsorptionSite('large')).toBe(true);
    expect(isMainWaterAbsorptionSite('small')).toBe(false);
  });
});
