import { describe, it, expect } from 'vitest';
import {
  partitionSet,
  fractionOfSet,
  addLikeFractions,
  isLikeFractionSum,
  formatFraction,
} from './collection';

describe('domain/math/collection', () => {
  describe('partitionSet', () => {
    it('partitions a discrete collection into equal groups', () => {
      const res = partitionSet(12, 3);
      expect(res.itemsPerPart).toBe(4);
      expect(res.remainder).toBe(0);
    });

    it('identifies remainders when set does not divide evenly', () => {
      const res = partitionSet(14, 4);
      expect(res.itemsPerPart).toBe(3);
      expect(res.remainder).toBe(2);
    });

    it('throws on non-positive or non-integer arguments', () => {
      expect(() => partitionSet(0, 3)).toThrow();
      expect(() => partitionSet(12, 0)).toThrow();
      expect(() => partitionSet(-5, 2)).toThrow();
    });
  });

  describe('fractionOfSet', () => {
    it('calculates unit and non-unit fractions of a collection', () => {
      expect(fractionOfSet(12, 1, 3)).toBe(4);
      expect(fractionOfSet(12, 2, 3)).toBe(8);
      expect(fractionOfSet(16, 3, 4)).toBe(12);
      expect(fractionOfSet(18, 2, 3)).toBe(12);
    });

    it('throws if the total cannot be evenly partitioned by the denominator', () => {
      expect(() => fractionOfSet(10, 1, 3)).toThrow();
    });

    it('throws on invalid inputs', () => {
      expect(() => fractionOfSet(-10, 1, 2)).toThrow();
      expect(() => fractionOfSet(10, -1, 2)).toThrow();
      expect(() => fractionOfSet(10, 1, 0)).toThrow();
    });
  });

  describe('addLikeFractions', () => {
    it('adds numerators while keeping denominator constant', () => {
      expect(addLikeFractions({ num: 1, den: 5 }, { num: 2, den: 5 })).toEqual({
        num: 3,
        den: 5,
      });
      expect(addLikeFractions({ num: 2, den: 8 }, { num: 3, den: 8 })).toEqual({
        num: 5,
        den: 8,
      });
    });

    it('throws when attempting to add unlike fractions', () => {
      expect(() => addLikeFractions({ num: 1, den: 4 }, { num: 1, den: 5 })).toThrow();
    });
  });

  describe('isLikeFractionSum', () => {
    it('validates correct like fraction sums and rejects denominator addition misconception', () => {
      const a = { num: 2, den: 5 };
      const b = { num: 1, den: 5 };

      // Correct sum (2/5 + 1/5 = 3/5)
      expect(isLikeFractionSum(a, b, { num: 3, den: 5 })).toBe(true);

      // Misconception: adding denominators (2/5 + 1/5 = 3/10)
      expect(isLikeFractionSum(a, b, { num: 3, den: 10 })).toBe(false);

      // Incorrect numerator
      expect(isLikeFractionSum(a, b, { num: 4, den: 5 })).toBe(false);
    });
  });

  describe('formatFraction', () => {
    it('formats fraction into string', () => {
      expect(formatFraction({ num: 3, den: 5 })).toBe('3/5');
    });
  });
});
