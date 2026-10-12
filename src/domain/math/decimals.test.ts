import { describe, it, expect } from 'vitest';
import {
  decomposeDecimal,
  decimalToHundredths,
  compareDecimals,
  areEquivalentDecimals,
} from './decimals';

describe('domain/math/decimals', () => {
  describe('decomposeDecimal', () => {
    it('decomposes decimals into whole, tenths, and hundredths', () => {
      expect(decomposeDecimal(0.34)).toEqual({ whole: 0, tenths: 3, hundredths: 4 });
      expect(decomposeDecimal(1.35)).toEqual({ whole: 1, tenths: 3, hundredths: 5 });
      expect(decomposeDecimal(0.5)).toEqual({ whole: 0, tenths: 5, hundredths: 0 });
      expect(decomposeDecimal(0.09)).toEqual({ whole: 0, tenths: 0, hundredths: 9 });
    });

    it('throws on negative or invalid numbers', () => {
      expect(() => decomposeDecimal(-0.5)).toThrow();
      expect(() => decomposeDecimal(NaN)).toThrow();
      expect(() => decomposeDecimal(Infinity)).toThrow();
    });
  });

  describe('decimalToHundredths', () => {
    it('calculates the number of hundredth squares correctly', () => {
      expect(decimalToHundredths(0.5)).toBe(50);
      expect(decimalToHundredths(0.15)).toBe(15);
      expect(decimalToHundredths(0.09)).toBe(9);
      expect(decimalToHundredths(0.4)).toBe(40);
      expect(decimalToHundredths(1.0)).toBe(100);
    });
  });

  describe('compareDecimals', () => {
    it('correctly compares decimals using place value instead of length', () => {
      // 0.5 > 0.15 despite 15 > 5 in whole numbers
      expect(compareDecimals(0.5, 0.15)).toBe(1);
      expect(compareDecimals(0.15, 0.5)).toBe(-1);

      // 0.4 > 0.09 despite 9 > 4
      expect(compareDecimals(0.4, 0.09)).toBe(1);
      expect(compareDecimals(0.09, 0.4)).toBe(-1);

      // 0.5 == 0.50
      expect(compareDecimals(0.5, 0.5)).toBe(0);
    });
  });

  describe('areEquivalentDecimals', () => {
    it('recognizes equivalence with trailing zeroes', () => {
      expect(areEquivalentDecimals('0.5', '0.50')).toBe(true);
      expect(areEquivalentDecimals('0.4', '0.40')).toBe(true);
      expect(areEquivalentDecimals('0.09', '0.9')).toBe(false);
      expect(areEquivalentDecimals('0.15', '0.5')).toBe(false);
    });
  });
});
