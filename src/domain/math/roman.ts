/**
 * Pure domain module: Roman Numerals (Knot N2)
 * Follows Class 5 NCERT/CBSE rules (I, V, X, L, C, D, M, 3-repetition limit, subtractive rules).
 */

export type RomanSymbol = 'I' | 'V' | 'X' | 'L' | 'C' | 'D' | 'M';

export const ROMAN_VALUES: Record<RomanSymbol, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const NUM_TO_ROMAN: readonly (readonly [number, string])[] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
] as const;

/**
 * Validates whether a string is a strictly well-formed standard Roman numeral.
 * Invariants:
 * - Only I, X, C, M repeat (up to 3 times).
 * - V, L, D never repeat.
 * - Only I can precede V or X; only X can precede L or C; only C can precede D or M.
 * - V, L, D are never subtracted.
 */
export function isValidRoman(s: string): boolean {
  if (!s || typeof s !== 'string') return false;
  const standardPattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  return standardPattern.test(s) && s.length > 0;
}

/**
 * Converts a positive integer into its standard Roman numeral string representation.
 */
export function toRoman(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 3999) {
    throw new Error('Roman numerals supported from 1 to 3999: ' + n);
  }
  let rem = n;
  let result = '';
  for (const [val, sym] of NUM_TO_ROMAN) {
    while (rem >= val) {
      result += sym;
      rem -= val;
    }
  }
  return result;
}

/**
 * Evaluates a valid Roman numeral string into its integer value.
 */
export function fromRoman(s: string): number {
  if (!isValidRoman(s)) {
    throw new Error('Invalid Roman numeral: ' + s);
  }
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const curVal = ROMAN_VALUES[s[i] as RomanSymbol];
    const nextVal = i + 1 < s.length ? ROMAN_VALUES[s[i + 1] as RomanSymbol] : 0;
    if (nextVal > curVal) {
      total += nextVal - curVal;
      i++;
    } else {
      total += curVal;
    }
  }
  return total;
}

export interface RomanToken {
  text: string;
  value: number;
  type: 'additive' | 'subtractive';
}

/**
 * Breaks down a Roman numeral into pedagogical additive and subtractive chunks.
 * e.g., XXIV -> [{ text: 'X', value: 10 }, { text: 'X', value: 10 }, { text: 'IV', value: 4 }]
 */
export function parseRomanTokens(s: string): RomanToken[] {
  if (!isValidRoman(s)) {
    throw new Error('Invalid Roman numeral: ' + s);
  }
  const tokens: RomanToken[] = [];
  for (let i = 0; i < s.length; i++) {
    const curSym = s[i] as RomanSymbol;
    const curVal = ROMAN_VALUES[curSym];
    const nextSym = i + 1 < s.length ? (s[i + 1] as RomanSymbol) : undefined;
    const nextVal = nextSym ? ROMAN_VALUES[nextSym] : 0;

    if (nextVal > curVal) {
      tokens.push({
        text: curSym + nextSym,
        value: nextVal - curVal,
        type: 'subtractive',
      });
      i++;
    } else {
      tokens.push({
        text: curSym,
        value: curVal,
        type: 'additive',
      });
    }
  }
  return tokens;
}
