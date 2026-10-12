/**
 * Pure domain logic for Knot N5: Tenths and Hundredths (Decimals).
 * Models base-ten decimal place values, decomposition into tenths and hundredths,
 * hundred-grid representations, and place-value comparisons.
 */

export interface DecimalDecomposition {
  whole: number;
  tenths: number;
  hundredths: number;
}

/**
 * Decomposes a decimal number up to 2 decimal places into whole, tenths, and hundredths.
 */
export function decomposeDecimal(val: number): DecimalDecomposition {
  if (isNaN(val) || !isFinite(val) || val < 0) {
    throw new Error('Value must be a non-negative finite number');
  }
  const rounded = Math.round(val * 100);
  const whole = Math.floor(rounded / 100);
  const remaining = rounded % 100;
  const tenths = Math.floor(remaining / 10);
  const hundredths = remaining % 10;
  return { whole, tenths, hundredths };
}

/**
 * Returns the count of hundredths squares (0 to 100+) represented by a decimal.
 * e.g. 0.5 -> 50, 0.15 -> 15, 0.09 -> 9, 0.4 -> 40.
 */
export function decimalToHundredths(val: number): number {
  if (isNaN(val) || !isFinite(val) || val < 0) {
    throw new Error('Value must be a non-negative finite number');
  }
  return Math.round(val * 100);
}

/**
 * Compares two decimal numbers using place-value magnitude.
 * Returns 1 if a > b, -1 if a < b, 0 if a == b.
 */
export function compareDecimals(a: number, b: number): number {
  const diff = Math.round((a - b) * 1000);
  if (diff > 0) return 1;
  if (diff < 0) return -1;
  return 0;
}

/**
 * Checks if two decimal representations have the same mathematical value
 * despite trailing zeroes (e.g. "0.5" and "0.50").
 */
export function areEquivalentDecimals(a: string | number, b: string | number): boolean {
  const numA = typeof a === 'string' ? parseFloat(a) : a;
  const numB = typeof b === 'string' ? parseFloat(b) : b;
  return compareDecimals(numA, numB) === 0;
}
