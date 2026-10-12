import { describe, it, expect } from 'vitest';
import { roundToNearest, estimateSum, estimateProduct, isWildError } from './estimate';

describe('domain/math/estimate', () => {
  describe('roundToNearest', () => {
    it('snaps numbers to nearest 10 benchmark', () => {
      expect(roundToNearest(48, 10)).toBe(50);
      expect(roundToNearest(42, 10)).toBe(40);
      expect(roundToNearest(98, 10)).toBe(100);
      expect(roundToNearest(25, 10)).toBe(30);
    });

    it('snaps numbers to nearest 100 benchmark', () => {
      expect(roundToNearest(392, 100)).toBe(400);
      expect(roundToNearest(514, 100)).toBe(500);
      expect(roundToNearest(48, 100)).toBe(0);
      expect(roundToNearest(98, 100)).toBe(100);
    });

    it('throws on invalid input', () => {
      expect(() => roundToNearest(NaN)).toThrow();
      expect(() => roundToNearest(Infinity)).toThrow();
    });
  });

  describe('estimateSum', () => {
    it('calculates friendly sum: 392 + 514 -> 400 + 500 = 900 vs 906', () => {
      const res = estimateSum(392, 514, 100);
      expect(res.roundA).toBe(400);
      expect(res.roundB).toBe(500);
      expect(res.estimate).toBe(900);
      expect(res.exact).toBe(906);
      expect(res.diff).toBe(6);
    });
  });

  describe('estimateProduct', () => {
    it('calculates friendly product: 48 * 98 -> 50 * 100 = 5000', () => {
      const res = estimateProduct(48, 98, 10);
      expect(res.roundA).toBe(50);
      expect(res.roundB).toBe(100);
      expect(res.estimate).toBe(5000);
      expect(res.exact).toBe(4704);
    });
  });

  describe('isWildError', () => {
    it('flags tenfold / order-of-magnitude mistakes', () => {
      // For 20 * 40 = 800 estimate:
      // Candidate 8190 is a wild tenfold error (8190 / 800 > 10)
      expect(isWildError(8190, 800)).toBe(true);
      // Reasonable answer 819 is within tolerance
      expect(isWildError(819, 800)).toBe(false);
      // Wild fraction 80 is too small
      expect(isWildError(80, 800)).toBe(true);
    });
  });
});
