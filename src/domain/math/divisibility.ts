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
  reason: string;
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

  switch (divisor) {
    case 2: {
      const isEven = last % 2 === 0;
      return {
        passes: isEven,
        divisor: 2,
        family: 'last-digit',
        reason: isEven
          ? `Last digit ${last} is even (0, 2, 4, 6, 8).`
          : `Last digit ${last} is odd.`,
      };
    }
    case 5: {
      const endsIn0or5 = last === 0 || last === 5;
      return {
        passes: endsIn0or5,
        divisor: 5,
        family: 'last-digit',
        reason: endsIn0or5
          ? `Last digit is ${last} (ends in 0 or 5).`
          : `Last digit is ${last} (must end in 0 or 5).`,
      };
    }
    case 10: {
      const endsIn0 = last === 0;
      return {
        passes: endsIn0,
        divisor: 10,
        family: 'last-digit',
        reason: endsIn0 ? `Last digit is 0.` : `Last digit is ${last} (must end in 0).`,
      };
    }
    case 3: {
      const sumDiv3 = sum % 3 === 0;
      return {
        passes: sumDiv3,
        divisor: 3,
        family: 'digit-sum',
        reason: sumDiv3
          ? `Digit sum ${sumExpression}, and ${sum} is divisible by 3 (${sum} ÷ 3 = ${sum / 3}).`
          : `Digit sum ${sumExpression}, and ${sum} is not divisible by 3.`,
      };
    }
    case 9: {
      const sumDiv9 = sum % 9 === 0;
      return {
        passes: sumDiv9,
        divisor: 9,
        family: 'digit-sum',
        reason: sumDiv9
          ? `Digit sum ${sumExpression}, and ${sum} is divisible by 9 (${sum} ÷ 9 = ${sum / 9}).`
          : `Digit sum ${sumExpression}, and ${sum} is not divisible by 9.`,
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
        reason: passes
          ? `Passes both gates: even (ends in ${last}) AND digit sum ${sum} divides by 3.`
          : !isEven
            ? `Fails gate 2: number ends in ${last} (odd).`
            : `Fails gate 3: digit sum ${sum} does not divide by 3.`,
      };
    }
  }
}
