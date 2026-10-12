/**
 * Pure domain logic for True for All? (Universal Claims & Counterexamples) (Knot L1).
 *
 * Core concepts:
 * - A universal claim asserts a property holds for ALL elements of a domain.
 * - Any number of positive examples cannot prove 'always'.
 * - A SINGLE counterexample conclusively disproves a universal claim.
 * - Rahul's misconception: multiplying always makes bigger (ignoring 0 and 1).
 */

export interface UniversalClaim {
  id: string;
  statement: string;
  predicate: (n: number) => boolean;
  domain: number[];
  counterexampleSample: number;
  explanation: string;
}

export const PRESET_CLAIMS: Record<string, UniversalClaim> = {
  'ends-in-4-div-4': {
    id: 'ends-in-4-div-4',
    statement: 'Every number ending in 4 is divisible by 4',
    predicate: (n: number) => n % 4 === 0,
    domain: [4, 14, 24, 34, 44, 54, 64],
    counterexampleSample: 14,
    explanation: '14 ends in 4, but 14 ÷ 4 leaves a remainder of 2.',
  },
  'primes-are-odd': {
    id: 'primes-are-odd',
    statement: 'All prime numbers are odd',
    predicate: (n: number) => n % 2 !== 0,
    domain: [2, 3, 5, 7, 11, 13, 17],
    counterexampleSample: 2,
    explanation: '2 is a prime number, but it is even.',
  },
  'mult-makes-bigger': {
    id: 'mult-makes-bigger',
    statement: 'Multiplying a number by another always makes it bigger (5 × b > 5)',
    predicate: (b: number) => 5 * b > 5,
    domain: [0, 1, 2, 3, 4, 5],
    counterexampleSample: 1,
    explanation: '5 × 1 = 5 (equal, not bigger) and 5 × 0 = 0 (smaller).',
  },
};

/**
 * Searches a domain for a counterexample that disproves a claim.
 */
export function findCounterexample(
  claim: UniversalClaim,
  customDomain?: number[]
): { holds: boolean; counterexample?: number; passedExamples: number[] } {
  const domain = customDomain ?? claim.domain;
  const passedExamples: number[] = [];

  for (const val of domain) {
    if (!claim.predicate(val)) {
      return {
        holds: false,
        counterexample: val,
        passedExamples,
      };
    }
    passedExamples.push(val);
  }

  return {
    holds: true,
    passedExamples,
  };
}

/**
 * Tests an arbitrary predicate across an array domain.
 */
export function verifyUniversalStatement<T>(
  predicate: (x: T) => boolean,
  domain: T[]
): { holds: boolean; counterexample?: T; passedCount: number } {
  let passedCount = 0;
  for (const item of domain) {
    if (!predicate(item)) {
      return { holds: false, counterexample: item, passedCount };
    }
    passedCount++;
  }
  return { holds: true, passedCount };
}

/**
 * Formats a clean disproof summary string.
 */
export function formatDisproof(statement: string, counterexample: unknown): string {
  return `Disproved: "${statement}" fails for ${counterexample}!`;
}
