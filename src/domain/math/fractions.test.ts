import { describe, it, expect } from 'vitest';
import { gcd } from './multiply';
import {
  simplifyFraction,
  areFractionsEquivalent,
  generateStripRows,
  findEquivalentSegments,
} from './fractions';

describe('fractions domain module (N3 Folding Fraction Strips)', () => {
  describe('gcd', () => {
    it('computes greatest common divisor correctly', () => {
      expect(gcd(12, 8)).toBe(4);
      expect(gcd(7, 13)).toBe(1);
      expect(gcd(24, 6)).toBe(6);
    });
  });

  describe('simplifyFraction', () => {
    it('simplifies fractions to lowest terms', () => {
      expect(simplifyFraction({ numerator: 2, denominator: 4 })).toEqual({
        numerator: 1,
        denominator: 2,
      });
      expect(simplifyFraction({ numerator: 4, denominator: 8 })).toEqual({
        numerator: 1,
        denominator: 2,
      });
      expect(simplifyFraction({ numerator: 6, denominator: 8 })).toEqual({
        numerator: 3,
        denominator: 4,
      });
    });

    it('throws when denominator is 0', () => {
      expect(() => simplifyFraction({ numerator: 1, denominator: 0 })).toThrow();
    });
  });

  describe('areFractionsEquivalent', () => {
    it('identifies equivalent fractions accurately', () => {
      expect(
        areFractionsEquivalent({ numerator: 1, denominator: 2 }, { numerator: 2, denominator: 4 })
      ).toBe(true);
      expect(
        areFractionsEquivalent({ numerator: 2, denominator: 4 }, { numerator: 4, denominator: 8 })
      ).toBe(true);
      expect(
        areFractionsEquivalent({ numerator: 1, denominator: 2 }, { numerator: 3, denominator: 4 })
      ).toBe(false);
    });
  });

  describe('generateStripRows', () => {
    it('creates accurate strip rows and segment ratios', () => {
      const rows = generateStripRows([1, 2, 4, 8]);
      expect(rows).toHaveLength(4);
      expect(rows[0]!.segments).toHaveLength(1);
      expect(rows[1]!.segments).toHaveLength(2);
      expect(rows[2]!.segments).toHaveLength(4);
      expect(rows[3]!.segments).toHaveLength(8);

      expect(rows[1]!.segments[0]!.startRatio).toBe(0);
      expect(rows[1]!.segments[0]!.endRatio).toBe(0.5);
    });
  });

  describe('findEquivalentSegments', () => {
    it('finds matching segment counts across denominators', () => {
      const equivalents = findEquivalentSegments({ numerator: 1, denominator: 2 }, [1, 2, 4, 8]);
      expect(equivalents).toEqual([
        { denominator: 2, count: 1 },
        { denominator: 4, count: 2 },
        { denominator: 8, count: 4 },
      ]);
    });
  });
});
