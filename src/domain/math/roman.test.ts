import { describe, expect, it } from 'vitest';
import { fromRoman, isValidRoman, parseRomanTokens, toRoman, ROMAN_VALUES } from './roman';

describe('domain/math/roman (N2)', () => {
  it('maps fundamental symbols to their exact values', () => {
    expect(ROMAN_VALUES.I).toBe(1);
    expect(ROMAN_VALUES.V).toBe(5);
    expect(ROMAN_VALUES.X).toBe(10);
    expect(ROMAN_VALUES.L).toBe(50);
    expect(ROMAN_VALUES.C).toBe(100);
    expect(ROMAN_VALUES.D).toBe(500);
    expect(ROMAN_VALUES.M).toBe(1000);
  });

  it('converts integers to standard Roman numerals', () => {
    expect(toRoman(1)).toBe('I');
    expect(toRoman(3)).toBe('III');
    expect(toRoman(4)).toBe('IV');
    expect(toRoman(5)).toBe('V');
    expect(toRoman(9)).toBe('IX');
    expect(toRoman(14)).toBe('XIV');
    expect(toRoman(24)).toBe('XXIV');
    expect(toRoman(40)).toBe('XL');
    expect(toRoman(45)).toBe('XLV');
    expect(toRoman(49)).toBe('XLIX');
    expect(toRoman(90)).toBe('XC');
    expect(toRoman(99)).toBe('XCIX');
    expect(toRoman(400)).toBe('CD');
    expect(toRoman(900)).toBe('CM');
    expect(toRoman(2026)).toBe('MMXXVI');
  });

  it('evaluates Roman numerals back to integers', () => {
    expect(fromRoman('IV')).toBe(4);
    expect(fromRoman('IX')).toBe(9);
    expect(fromRoman('XIV')).toBe(14);
    expect(fromRoman('XXIV')).toBe(24);
    expect(fromRoman('XLV')).toBe(45);
    expect(fromRoman('XLIX')).toBe(49);
    expect(fromRoman('XCIX')).toBe(99);
  });

  it('validates strictly correct Roman numerals and rejects common misconceptions', () => {
    // Valid numbers
    expect(isValidRoman('IV')).toBe(true);
    expect(isValidRoman('XIV')).toBe(true);
    expect(isValidRoman('XXIV')).toBe(true);
    expect(isValidRoman('XLV')).toBe(true);

    // Common childhood mistakes:
    // 1. Repeating more than 3 times
    expect(isValidRoman('IIII')).toBe(false);
    expect(isValidRoman('XXXX')).toBe(false);
    expect(isValidRoman('CCCC')).toBe(false);

    // 2. Repeating non-repeatable symbols (V, L, D)
    expect(isValidRoman('VV')).toBe(false);
    expect(isValidRoman('LL')).toBe(false);
    expect(isValidRoman('DD')).toBe(false);

    // 3. Subtracting V, L, D
    expect(isValidRoman('VL')).toBe(false); // Aman's mistake in 45
    expect(isValidRoman('VX')).toBe(false);
    expect(isValidRoman('LC')).toBe(false);

    // 4. Subtracting multiple symbols
    expect(isValidRoman('IIX')).toBe(false);
    expect(isValidRoman('IIV')).toBe(false);

    // 5. Illegal subtraction jumps
    expect(isValidRoman('IC')).toBe(false);
    expect(isValidRoman('IM')).toBe(false);
    expect(isValidRoman('XD')).toBe(false);
  });

  it('parses pedagogical additive and subtractive tokens', () => {
    const tokens24 = parseRomanTokens('XXIV');
    expect(tokens24).toEqual([
      { text: 'X', value: 10, type: 'additive' },
      { text: 'X', value: 10, type: 'additive' },
      { text: 'IV', value: 4, type: 'subtractive' },
    ]);

    const tokens45 = parseRomanTokens('XLV');
    expect(tokens45).toEqual([
      { text: 'XL', value: 40, type: 'subtractive' },
      { text: 'V', value: 5, type: 'additive' },
    ]);
  });
});
