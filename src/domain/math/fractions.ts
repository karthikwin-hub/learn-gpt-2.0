/**
 * Pure domain module for fraction folding and equivalence (N3).
 * Represents unit fraction strips and equivalent folding alignments.
 */

import { gcd } from './multiply';

export interface StripFraction {
  numerator: number;
  denominator: number;
}

export interface FractionSegment {
  index: number;
  startRatio: number;
  endRatio: number;
  label: string;
}

export interface FractionStripRow {
  denominator: number;
  segments: FractionSegment[];
}

/**
 * Simplifies a fraction to its lowest terms.
 */
export function simplifyFraction(f: StripFraction): StripFraction {
  if (f.denominator === 0) throw new Error('Denominator cannot be zero');
  if (f.numerator === 0) return { numerator: 0, denominator: 1 };
  const d = gcd(f.numerator, f.denominator);
  const sign = f.denominator < 0 ? -1 : 1;
  return {
    numerator: (f.numerator / d) * sign,
    denominator: Math.abs(f.denominator / d),
  };
}

/**
 * Checks whether two fractions are numerically equivalent.
 */
export function areFractionsEquivalent(a: StripFraction, b: StripFraction): boolean {
  return a.numerator * b.denominator === b.numerator * a.denominator;
}

/**
 * Generates strip rows for given denominators (e.g. 1, 2, 4, 8).
 */
export function generateStripRows(denominators: number[] = [1, 2, 4, 8]): FractionStripRow[] {
  return denominators.map((d) => {
    const segments: FractionSegment[] = [];
    for (let i = 0; i < d; i++) {
      segments.push({
        index: i,
        startRatio: i / d,
        endRatio: (i + 1) / d,
        label: d === 1 ? '1' : `1/${d}`,
      });
    }
    return { denominator: d, segments };
  });
}

/**
 * Finds all equivalent segment counts across supported denominators.
 * e.g., 2 parts of 1/4 -> 1 part of 1/2, 4 parts of 1/8.
 */
export function findEquivalentSegments(
  fraction: StripFraction,
  denominators: number[] = [1, 2, 4, 8]
): { denominator: number; count: number }[] {
  const simplified = simplifyFraction(fraction);
  const results: { denominator: number; count: number }[] = [];

  for (const d of denominators) {
    if (d % simplified.denominator === 0) {
      const multiplier = d / simplified.denominator;
      const count = simplified.numerator * multiplier;
      results.push({ denominator: d, count });
    }
  }

  return results;
}
