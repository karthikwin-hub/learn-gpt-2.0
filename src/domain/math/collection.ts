/**
 * Pure domain logic for Knot N4: Fractions of a Collection & Like Fractions.
 * Encapsulates set partitioning, calculating fractions of collections, and like-fraction addition.
 */

export interface Fraction {
  num: number;
  den: number;
}

export type CollectionFraction = Fraction;

export interface SetPartition {
  total: number;
  parts: number;
  itemsPerPart: number;
  remainder: number;
}

/**
 * Partitions a discrete collection of items into equal parts/baskets.
 */
export function partitionSet(total: number, parts: number): SetPartition {
  if (total <= 0 || !Number.isInteger(total)) {
    throw new Error('Total items must be a positive integer');
  }
  if (parts <= 0 || !Number.isInteger(parts)) {
    throw new Error('Parts must be a positive integer');
  }
  const itemsPerPart = Math.floor(total / parts);
  const remainder = total % parts;
  return {
    total,
    parts,
    itemsPerPart,
    remainder,
  };
}

/**
 * Calculates a fraction of a discrete set: (total / den) * num.
 * Verifies that the collection can be evenly partitioned by the denominator.
 */
export function fractionOfSet(total: number, num: number, den: number): number {
  if (den <= 0 || !Number.isInteger(den)) {
    throw new Error('Denominator must be a positive integer');
  }
  if (num < 0 || !Number.isInteger(num)) {
    throw new Error('Numerator must be a non-negative integer');
  }
  if (total <= 0 || !Number.isInteger(total)) {
    throw new Error('Total must be a positive integer');
  }
  if (total % den !== 0) {
    throw new Error(`Total ${total} cannot be evenly divided into ${den} parts`);
  }
  return (total / den) * num;
}

/**
 * Adds two like fractions (fractions sharing the exact same denominator).
 * Invariant: The denominator remains unchanged; only numerators add.
 */
export function addLikeFractions(a: Fraction, b: Fraction): Fraction {
  if (a.den <= 0 || b.den <= 0) {
    throw new Error('Denominators must be positive');
  }
  if (a.den !== b.den) {
    throw new Error(`Cannot add fractions with unlike denominators (${a.den} !== ${b.den})`);
  }
  return {
    num: a.num + b.num,
    den: a.den,
  };
}

/**
 * Verifies if a proposed sum correctly adds like fractions without falling into the
 * misconception of adding denominators together.
 */
export function isLikeFractionSum(a: Fraction, b: Fraction, sum: Fraction): boolean {
  if (a.den !== b.den) return false;
  return sum.den === a.den && sum.num === a.num + b.num;
}

/**
 * Formats a fraction as a string representation (e.g. "3/5").
 */
export function formatFraction(f: Fraction): string {
  return `${f.num}/${f.den}`;
}
