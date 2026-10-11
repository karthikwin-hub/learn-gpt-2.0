import { describe, it, expect } from 'vitest';
import { formatIndianNumeral, decomposePlaceValue, adjustDigit } from './numbers';

describe('numbers domain module (N1 Place Houses)', () => {
  describe('formatIndianNumeral', () => {
    it('formats single digits and small numbers without commas', () => {
      expect(formatIndianNumeral(0)).toBe('0');
      expect(formatIndianNumeral(7)).toBe('7');
      expect(formatIndianNumeral(999)).toBe('999');
    });

    it('formats thousands with 3-digit first group', () => {
      expect(formatIndianNumeral(1000)).toBe('1,000');
      expect(formatIndianNumeral(12345)).toBe('12,345');
    });

    it('formats Lakhs with 2-digit groups after hundreds', () => {
      expect(formatIndianNumeral(100000)).toBe('1,00,000');
      expect(formatIndianNumeral(1234567)).toBe('12,34,567');
    });

    it('formats Crores with multiple 2-digit groups', () => {
      expect(formatIndianNumeral(10000000)).toBe('1,00,00,000');
      expect(formatIndianNumeral(123456789)).toBe('12,34,56,789');
    });
  });

  describe('decomposePlaceValue', () => {
    it('decomposes zero cleanly', () => {
      const dec = decomposePlaceValue(0);
      expect(dec.total).toBe(0);
      expect(dec.formatted).toBe('0');
      expect(dec.expandedTerms).toEqual(['0']);
      expect(dec.houses).toHaveLength(4);
    });

    it('decomposes 1,25,00,000 into Crores and Lakhs', () => {
      const dec = decomposePlaceValue(12500000);
      expect(dec.formatted).toBe('1,25,00,000');
      const crores = dec.houses.find((h) => h.id === 'crores');
      const lakhs = dec.houses.find((h) => h.id === 'lakhs');
      expect(crores?.value).toBe(1);
      expect(lakhs?.value).toBe(25);
      expect(dec.expandedTerms).toEqual(['1,00,00,000', '20,00,000', '5,00,000']);
    });
  });

  describe('adjustDigit', () => {
    it('increments a digit and wraps cleanly modulo 10', () => {
      const initial = 1000;
      // increment 1,000 by 1 in thousands place
      const next = adjustDigit(initial, 1000, 1);
      expect(next).toBe(2000);

      // increment 9 to 0
      const wrap = adjustDigit(9000, 1000, 1);
      expect(wrap).toBe(0);
    });
  });
});
