/**
 * Pure domain logic for Knot A2: Estimate First & Mental Benchmarks.
 * Models friendly benchmark rounding, estimation guardrails, and wild error detection.
 */

/**
 * Rounds a number to the nearest benchmark (10, 100, 1000).
 */
export function roundToNearest(val: number, benchmark: 10 | 100 | 1000 = 10): number {
  if (isNaN(val) || !isFinite(val)) {
    throw new Error('Value must be a finite number');
  }
  return Math.round(val / benchmark) * benchmark;
}

/**
 * Computes an estimated sum using friendly benchmark rounding alongside the exact sum.
 */
export function estimateSum(
  a: number,
  b: number,
  benchmark: 10 | 100 = 100
): {
  roundA: number;
  roundB: number;
  estimate: number;
  exact: number;
  diff: number;
} {
  const roundA = roundToNearest(a, benchmark);
  const roundB = roundToNearest(b, benchmark);
  const estimate = roundA + roundB;
  const exact = a + b;
  return {
    roundA,
    roundB,
    estimate,
    exact,
    diff: Math.abs(exact - estimate),
  };
}

/**
 * Computes an estimated product using friendly benchmark rounding.
 */
export function estimateProduct(
  a: number,
  b: number,
  benchmark: 10 | 100 = 10
): {
  roundA: number;
  roundB: number;
  estimate: number;
  exact: number;
} {
  const roundA = roundToNearest(a, benchmark);
  const roundB = roundToNearest(b, benchmark);
  const estimate = roundA * roundB;
  const exact = a * b;
  return {
    roundA,
    roundB,
    estimate,
    exact,
  };
}

/**
 * Detects whether a proposed answer is a "wild error" outside reasonable estimation bounds.
 * Flagged if candidate deviates from estimate by more than 2x or is less than 0.5x.
 */
export function isWildError(candidate: number, estimate: number): boolean {
  if (estimate <= 0) return false;
  const ratio = candidate / estimate;
  return ratio > 2.0 || ratio < 0.5;
}
