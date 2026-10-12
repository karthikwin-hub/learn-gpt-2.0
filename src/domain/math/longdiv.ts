/**
 * Domain logic for Knot D4: Long Division Algorithm
 *
 * Models the multi-step standard long division algorithm column by column,
 * with explicit enforcement of the Zero Gate (when brought-down digit < divisor).
 */

export interface LongDivisionStep {
  stepIndex: number;
  placeName: string;
  workingValue: number;
  quotientDigit: number;
  product: number;
  difference: number;
  broughtDownDigit?: number;
  nextWorkingValue: number;
  isZeroGate: boolean;
}

export interface LongDivisionTrace {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  steps: LongDivisionStep[];
  equation: string;
  verified: boolean;
}

const PLACE_NAMES: Record<number, string> = {
  1: 'ones',
  2: 'tens',
  3: 'hundreds',
  4: 'thousands',
  5: 'ten-thousands',
};

/**
 * Executes standard columnar long division step by step.
 * e.g., 612 / 3 -> 204.
 */
export function executeLongDivisionSteps(dividend: number, divisor: number): LongDivisionTrace {
  if (divisor <= 0) {
    throw new Error('Divisor must be greater than zero');
  }
  if (dividend < 0) {
    throw new Error('Dividend must be non-negative');
  }

  const digits = String(dividend).split('').map(Number);
  const totalDigits = digits.length;
  const steps: LongDivisionStep[] = [];

  let currentWorking = 0;
  const quotientDigits: number[] = [];

  for (let i = 0; i < totalDigits; i++) {
    const digit = digits[i];
    if (digit === undefined) continue;
    currentWorking = currentWorking * 10 + digit;

    const quotientDigit = Math.floor(currentWorking / divisor);
    const product = quotientDigit * divisor;
    const difference = currentWorking - product;
    const isZeroGate = quotientDigit === 0 && (quotientDigits.length > 0 || i > 0);

    const placePower = totalDigits - i;
    const placeName = PLACE_NAMES[placePower] || `place-10^${placePower - 1}`;

    const nextDigit = i + 1 < totalDigits ? digits[i + 1] : undefined;
    const nextWorkingValue = nextDigit !== undefined ? difference * 10 + nextDigit : difference;

    steps.push({
      stepIndex: i + 1,
      placeName,
      workingValue: currentWorking,
      quotientDigit,
      product,
      difference,
      broughtDownDigit: nextDigit,
      nextWorkingValue,
      isZeroGate,
    });

    quotientDigits.push(quotientDigit);
    currentWorking = difference;
  }

  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;
  const verified = verifyLongDivision(dividend, divisor, quotient, remainder);

  const equation =
    remainder > 0
      ? `${dividend} ÷ ${divisor} = ${quotient} R ${remainder}`
      : `${dividend} ÷ ${divisor} = ${quotient}`;

  return {
    dividend,
    divisor,
    quotient,
    remainder,
    steps,
    equation,
    verified,
  };
}

/**
 * Validates division result using inverse multiplication:
 * Dividend = (Quotient * Divisor) + Remainder, with 0 <= Remainder < Divisor.
 */
export function verifyLongDivision(
  dividend: number,
  divisor: number,
  quotient: number,
  remainder: number
): boolean {
  return quotient * divisor + remainder === dividend && remainder >= 0 && remainder < divisor;
}
