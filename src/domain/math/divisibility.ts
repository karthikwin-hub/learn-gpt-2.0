/**
 * Divisibility Tests domain model (Knot F3).
 *
 * Implements pure mathematical functions for testing divisibility rules
 * across last-digit rules (2, 5, 10), digit-sum rules (3, 9), and composite rules (6).
 */

export type DivisorRule = 2 | 3 | 5 | 6 | 9 | 10;
export type RuleFamily = 'last-digit' | 'digit-sum' | 'composite';

export interface DivisibilityResult {
  passes: boolean;
  divisor: DivisorRule;
  family: RuleFamily;
  /** Why it passes or fails, as an id plus the numbers the explanation needs. */
  reason: DivisibilityReason;
}

export type DivisibilityReasonId =
  | 'even'
  | 'odd'
  | 'ends05'
  | 'notEnds05'
  | 'ends0'
  | 'notEnds0'
  | 'sumDivides'
  | 'sumNotDivides'
  | 'bothGates'
  | 'failGate2'
  | 'failGate3';

export interface DivisibilityReason {
  id: DivisibilityReasonId;
  last: number;
  sum: number;
  sumExpression: string;
  quotient: number;
}

/**
 * Returns digits of an integer as an array of numbers.
 */
export function getDigits(n: number): number[] {
  const absStr = Math.abs(Math.trunc(n)).toString();
  return Array.from(absStr, (char) => Number(char));
}

/**
 * Calculates the sum of digits of an integer.
 */
export function sumOfDigits(n: number): number {
  return getDigits(n).reduce((acc, d) => acc + d, 0);
}

/**
 * Returns the units (last) digit of an integer.
 */
export function getLastDigit(n: number): number {
  return Math.abs(Math.trunc(n)) % 10;
}

/**
 * Breaks down digit sum with explicit visual step expression.
 */
export function getDigitSumSteps(n: number): {
  digits: number[];
  sum: number;
  sumExpression: string;
} {
  const digits = getDigits(n);
  const sum = digits.reduce((acc, d) => acc + d, 0);
  const sumExpression = digits.join(' + ') + ' = ' + sum;
  return { digits, sum, sumExpression };
}

/**
 * Evaluates divisibility using the standard grade 5 divisibility rules.
 */
export function testDivisibility(n: number, divisor: DivisorRule): DivisibilityResult {
  const abs = Math.abs(Math.trunc(n));
  const last = getLastDigit(abs);
  const { sum, sumExpression } = getDigitSumSteps(abs);
  const why = (id: DivisibilityReasonId, quotient = 0): DivisibilityReason => ({
    id,
    last,
    sum,
    sumExpression,
    quotient,
  });

  switch (divisor) {
    case 2: {
      const isEven = last % 2 === 0;
      return {
        passes: isEven,
        divisor: 2,
        family: 'last-digit',
        reason: why(isEven ? 'even' : 'odd'),
      };
    }
    case 5: {
      const endsIn0or5 = last === 0 || last === 5;
      return {
        passes: endsIn0or5,
        divisor: 5,
        family: 'last-digit',
        reason: why(endsIn0or5 ? 'ends05' : 'notEnds05'),
      };
    }
    case 10: {
      const endsIn0 = last === 0;
      return {
        passes: endsIn0,
        divisor: 10,
        family: 'last-digit',
        reason: why(endsIn0 ? 'ends0' : 'notEnds0'),
      };
    }
    case 3: {
      const sumDiv3 = sum % 3 === 0;
      return {
        passes: sumDiv3,
        divisor: 3,
        family: 'digit-sum',
        reason: sumDiv3 ? why('sumDivides', sum / 3) : why('sumNotDivides'),
      };
    }
    case 9: {
      const sumDiv9 = sum % 9 === 0;
      return {
        passes: sumDiv9,
        divisor: 9,
        family: 'digit-sum',
        reason: sumDiv9 ? why('sumDivides', sum / 9) : why('sumNotDivides'),
      };
    }
    case 6: {
      const isEven = last % 2 === 0;
      const sumDiv3 = sum % 3 === 0;
      const passes = isEven && sumDiv3;
      return {
        passes,
        divisor: 6,
        family: 'composite',
        reason: why(passes ? 'bothGates' : !isEven ? 'failGate2' : 'failGate3'),
      };
    }
  }
}
