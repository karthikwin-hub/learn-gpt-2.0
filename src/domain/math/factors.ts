/**
 * Factors Make Rectangles domain model (Knot F1).
 *
 * Implements pure mathematical functions for factor discovery through
 * rectangular grid tiling, rainbow pair tracking, and square symmetry.
 */

export interface FactorPair {
  rows: number;
  cols: number;
}

export interface FactorWorkbenchState {
  total: number;
  rows: number;
  discoveredPairs: [number, number][];
}

/**
 * Returns all unique factors of positive integer n in ascending order.
 */
export function findAllFactors(n: number): number[] {
  if (n <= 0 || !Number.isInteger(n)) return [];
  const factors = new Set<number>();
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 1; i <= limit; i++) {
    if (n % i === 0) {
      factors.add(i);
      factors.add(n / i);
    }
  }
  return Array.from(factors).sort((a, b) => a - b);
}

/**
 * Returns all factor pairs [r, c] for n, where r <= c and r * c === n.
 */
export function findFactorPairs(n: number): [number, number][] {
  if (n <= 0 || !Number.isInteger(n)) return [];
  const pairs: [number, number][] = [];
  const limit = Math.floor(Math.sqrt(n));
  for (let r = 1; r <= limit; r++) {
    if (n % r === 0) {
      pairs.push([r, n / r]);
    }
  }
  return pairs;
}

/**
 * Checks if a total number of tiles can form a complete rectangle with given rows.
 */
export function isValidRectangle(total: number, rows: number): boolean {
  if (rows <= 0 || !Number.isInteger(rows)) return false;
  return total % rows === 0;
}

/**
 * Returns columns count (floor) and leftover tiles when arranged in given rows.
 */
export function arrangeTiles(
  total: number,
  rows: number
): { columns: number; remainder: number; isValid: boolean } {
  if (rows <= 0 || !Number.isInteger(rows)) {
    return { columns: 0, remainder: total, isValid: false };
  }
  const columns = Math.floor(total / rows);
  const remainder = total % rows;
  return { columns, remainder, isValid: remainder === 0 };
}

/**
 * Checks whether n is a perfect square.
 */
export function isSquareNumber(n: number): boolean {
  if (n < 0 || !Number.isInteger(n)) return false;
  const sqrt = Math.round(Math.sqrt(n));
  return sqrt * sqrt === n;
}

/**
 * Creates initial state for Factors workbench.
 */
export function createFactorState(total = 12): FactorWorkbenchState {
  return {
    total,
    rows: 1,
    discoveredPairs: [[1, total]],
  };
}

/**
 * Attempts to set row height in the workbench, discovering the pair if clean rectangle.
 */
export function trySetRows(
  state: FactorWorkbenchState,
  rows: number
): {
  valid: boolean;
  columns: number;
  remainder: number;
  pair?: [number, number];
} {
  const { columns, remainder, isValid } = arrangeTiles(state.total, rows);
  state.rows = rows;
  if (isValid) {
    const pair: [number, number] = [Math.min(rows, columns), Math.max(rows, columns)];
    const exists = state.discoveredPairs.some(([r, c]) => r === pair[0] && c === pair[1]);
    if (!exists) {
      state.discoveredPairs.push(pair);
      state.discoveredPairs.sort((a, b) => a[0] - b[0]);
    }
    return { valid: true, columns, remainder: 0, pair };
  }
  return { valid: false, columns, remainder };
}
