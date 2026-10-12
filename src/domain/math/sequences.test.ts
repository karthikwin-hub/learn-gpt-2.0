import { describe, it, expect } from 'vitest';
import {
  findFirstDifferences,
  isArithmeticSequence,
  isGeometricSequence,
  predictNextTerm,
  predictNthTerm,
  SEQUENCE_PRESETS,
} from './sequences';

describe('sequences domain logic (Sequence Rules & Difference Ladders)', () => {
  describe('findFirstDifferences', () => {
    it('returns empty array for fewer than 2 elements', () => {
      expect(findFirstDifferences([])).toEqual([]);
      expect(findFirstDifferences([42])).toEqual([]);
    });

    it('calculates differences between consecutive terms', () => {
      expect(findFirstDifferences([3, 7, 11, 15])).toEqual([4, 4, 4]);
      expect(findFirstDifferences([2, 4, 8, 16])).toEqual([2, 4, 8]);
      expect(findFirstDifferences([30, 27, 24, 21])).toEqual([-3, -3, -3]);
    });
  });

  describe('isArithmeticSequence', () => {
    it('detects valid constant difference sequences', () => {
      expect(isArithmeticSequence([3, 7, 11, 15])).toEqual({
        valid: true,
        commonDifference: 4,
      });
      expect(isArithmeticSequence([5, 10, 15, 20])).toEqual({
        valid: true,
        commonDifference: 5,
      });
      expect(isArithmeticSequence([30, 27, 24])).toEqual({
        valid: true,
        commonDifference: -3,
      });
    });

    it('rejects non-arithmetic sequences', () => {
      expect(isArithmeticSequence([2, 4, 8, 16])).toEqual({ valid: false });
      expect(isArithmeticSequence([1])).toEqual({ valid: false });
    });
  });

  describe('isGeometricSequence', () => {
    it('detects doubling sequence', () => {
      expect(isGeometricSequence([2, 4, 8, 16])).toEqual({
        valid: true,
        commonRatio: 2,
      });
      expect(isGeometricSequence([3, 9, 27])).toEqual({
        valid: true,
        commonRatio: 3,
      });
    });

    it('rejects sequences with zeros or inconsistent ratios', () => {
      expect(isGeometricSequence([0, 0, 0])).toEqual({ valid: false });
      expect(isGeometricSequence([2, 4, 7, 14])).toEqual({ valid: false });
      expect(isGeometricSequence([5])).toEqual({ valid: false });
    });
  });

  describe('predictNextTerm', () => {
    it('predicts next term for Prashna sequence 3, 7, 11, 15 -> 19', () => {
      expect(predictNextTerm([3, 7, 11, 15])).toBe(19);
    });

    it('predicts next term for doubling sequence 2, 4, 8, 16 -> 32', () => {
      expect(predictNextTerm([2, 4, 8, 16])).toBe(32);
    });

    it('predicts next term for decreasing sequence', () => {
      expect(predictNextTerm([30, 27, 24, 21])).toBe(18);
    });

    it('handles edge cases', () => {
      expect(predictNextTerm([])).toBe(0);
      expect(predictNextTerm([10])).toBe(10);
    });
  });

  describe('predictNthTerm', () => {
    it('calculates distant terms correctly', () => {
      // 3, 7, 11, 15... 10th term: 3 + 9 * 4 = 39
      expect(predictNthTerm(3, 4, 10)).toBe(39);
      // 5, 10, 15... 5th term: 5 + 4 * 5 = 25
      expect(predictNthTerm(5, 5, 5)).toBe(25);
      // 1st term returns firstTerm
      expect(predictNthTerm(7, 3, 1)).toBe(7);
      expect(predictNthTerm(7, 3, 0)).toBe(7);
    });
  });

  describe('SEQUENCE_PRESETS', () => {
    it('provides valid presets', () => {
      expect(SEQUENCE_PRESETS.length).toBeGreaterThanOrEqual(3);
      SEQUENCE_PRESETS.forEach((preset) => {
        expect(preset.terms.length).toBeGreaterThanOrEqual(3);
      });
    });
  });
});
