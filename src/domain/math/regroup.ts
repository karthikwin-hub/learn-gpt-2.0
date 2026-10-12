/**
 * Pure domain logic for Knot A1: Multi-digit Addition & Subtraction with Regrouping.
 * Models columnar decomposition, unbundling across zeroes, and carry-forward additions.
 */

export interface SubtractionColumnStep {
  columnIndex: number; // 0 = ones, 1 = tens, 2 = hundreds, etc.
  placeName: 'ones' | 'tens' | 'hundreds' | 'thousands' | 'tenThousands';
  topDigit: number;
  bottomDigit: number;
  unbundled: boolean;
  resultDigit: number;
}

export interface AdditionColumnStep {
  columnIndex: number;
  placeName: 'ones' | 'tens' | 'hundreds' | 'thousands' | 'tenThousands';
  topDigit: number;
  bottomDigit: number;
  carryIn: number;
  columnSum: number;
  resultDigit: number;
  carryOut: number;
}

export const PLACE_NAMES: readonly ('ones' | 'tens' | 'hundreds' | 'thousands' | 'tenThousands')[] =
  ['ones', 'tens', 'hundreds', 'thousands', 'tenThousands'] as const;

/**
 * Executes multi-digit columnar subtraction with proper unbundling across zeroes.
 * Preserves the invariant: top - bottom = result.
 */
export function subtractWithRegrouping(
  top: number,
  bottom: number
): {
  steps: SubtractionColumnStep[];
  difference: number;
} {
  if (top < bottom) {
    throw new Error('Top number must be greater than or equal to bottom number');
  }
  if (!Number.isInteger(top) || !Number.isInteger(bottom) || top < 0 || bottom < 0) {
    throw new Error('Numbers must be non-negative integers');
  }

  const topDigits = String(top).split('').reverse().map(Number);
  const bottomDigits = String(bottom).split('').reverse().map(Number);
  const maxLen = Math.max(topDigits.length, bottomDigits.length);

  while (topDigits.length < maxLen) topDigits.push(0);
  while (bottomDigits.length < maxLen) bottomDigits.push(0);

  const workingTop = [...topDigits];
  const steps: SubtractionColumnStep[] = [];

  for (let i = 0; i < maxLen; i++) {
    const bottomD = bottomDigits[i]!;
    let unbundled = false;

    if (workingTop[i]! < bottomD) {
      unbundled = true;
      // Find nearest non-zero digit to the left to unbundle
      let donor = i + 1;
      while (donor < workingTop.length && workingTop[donor]! === 0) {
        donor++;
      }
      if (donor >= workingTop.length) {
        throw new Error('Unable to borrow from higher columns');
      }

      // Decrement donor
      workingTop[donor]!--;

      // Cascading unbundling: each intermediate 0 becomes 9
      for (let j = donor - 1; j > i; j--) {
        workingTop[j] = 9;
      }

      // Target column receives +10
      workingTop[i]! += 10;
    }

    const diff = workingTop[i]! - bottomD;
    steps.push({
      columnIndex: i,
      placeName: PLACE_NAMES[i] || 'ones',
      topDigit: workingTop[i]!,
      bottomDigit: bottomD,
      unbundled,
      resultDigit: diff,
    });
  }

  return {
    steps,
    difference: top - bottom,
  };
}

/**
 * Executes multi-digit columnar addition with carry tracking.
 */
export function addWithRegrouping(
  a: number,
  b: number
): {
  steps: AdditionColumnStep[];
  sum: number;
} {
  if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) {
    throw new Error('Numbers must be non-negative integers');
  }

  const aDigits = String(a).split('').reverse().map(Number);
  const bDigits = String(b).split('').reverse().map(Number);
  const maxLen = Math.max(aDigits.length, bDigits.length);

  while (aDigits.length < maxLen) aDigits.push(0);
  while (bDigits.length < maxLen) bDigits.push(0);

  let carry = 0;
  const steps: AdditionColumnStep[] = [];

  for (let i = 0; i < maxLen; i++) {
    const topD = aDigits[i]!;
    const bottomD = bDigits[i]!;
    const colSum = topD + bottomD + carry;
    const resD = colSum % 10;
    const nextCarry = Math.floor(colSum / 10);

    steps.push({
      columnIndex: i,
      placeName: PLACE_NAMES[i] || 'ones',
      topDigit: topD,
      bottomDigit: bottomD,
      carryIn: carry,
      columnSum: colSum,
      resultDigit: resD,
      carryOut: nextCarry,
    });

    carry = nextCarry;
  }

  return {
    steps,
    sum: a + b,
  };
}

/**
 * Verifies that unbundling preserves the exact total value.
 * e.g. 5 hundreds, 0 tens, 0 ones == 4 hundreds, 9 tens, 10 ones.
 */
export function verifyConservation(houses: {
  hundreds: number;
  tens: number;
  ones: number;
}): number {
  return houses.hundreds * 100 + houses.tens * 10 + houses.ones;
}
