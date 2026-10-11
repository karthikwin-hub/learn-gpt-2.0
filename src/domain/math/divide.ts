/**
 * Pure division domain rules for Gurukul (docs/rules/MATH_RULES.md §19).
 * Partitive fair sharing, quotative grouping, remainder trays, and fraction partitions.
 */

import { gcd } from './multiply';

export interface ShareResult {
  each: number;
  remainder: number;
}

/**
 * Fair share (partitive division): total items distributed evenly over n groups.
 * Satisfies the division invariant: total = groups * each + remainder (0 <= remainder < groups).
 */
export function share(total: number, groups: number): ShareResult {
  if (groups <= 0) throw new Error('Groups must be positive');
  const each = Math.floor(total / groups);
  return { each, remainder: total - each * groups };
}

/**
 * Dealing sequence order, one item per plate round-and-round, exactly as a child deals by hand.
 * Items that cannot complete a full round receive index -1 representing the leftover tray.
 */
export function dealSequence(total: number, groups: number): number[] {
  if (groups <= 0) return [];
  const s = share(total, groups);
  const seq: number[] = [];
  for (let i = 0; i < s.each * groups; i++) {
    seq.push(i % groups);
  }
  for (let j = 0; j < s.remainder; j++) {
    seq.push(-1);
  }
  return seq;
}

export interface Fraction {
  num: number;
  den: number;
  simpleNum: number;
  simpleDen: number;
}

/**
 * Leftovers cut into equal pieces: remainder r over g plates -> each plate gets r/g, simplified.
 */
export function leftoverFraction(remainder: number, groups: number): Fraction | null {
  if (remainder <= 0 || groups <= 0) return null;
  const g = gcd(remainder, groups);
  return {
    num: remainder,
    den: groups,
    simpleNum: remainder / g,
    simpleDen: groups / g,
  };
}

/**
 * Factor pairs of an integer n: all pairs [a, b] such that a * b = n (a <= b).
 * Represents all rectangular floors of area n.
 */
export function factorPairs(n: number): [number, number][] {
  if (n <= 0) return [];
  const pairs: [number, number][] = [];
  for (let a = 1; a * a <= n; a++) {
    if (n % a === 0) {
      pairs.push([a, n / a]);
    }
  }
  return pairs;
}
