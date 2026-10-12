/**
 * Pure domain functions for rectangular arrays, equal groups,
 * and commutative rotation invariance (Knots M1 and M3).
 */

export interface ArrayCell {
  row: number;
  col: number;
}

export interface RotatedArray {
  rows: number;
  cols: number;
  total: number;
}

/**
 * Calculates the total number of items in a rectangular array: rows * cols.
 */
export function arrayTotal(rows: number, cols: number): number {
  return rows * cols;
}

/**
 * Rotates an array by 90 degrees, turning rows into columns while conserving total items.
 */
export function rotateArrayDimensions(rows: number, cols: number): RotatedArray {
  return {
    rows: cols,
    cols: rows,
    total: rows * cols,
  };
}

/**
 * Generates coordinate cells for an array of rows x cols.
 */
export function generateArrayGrid(rows: number, cols: number): ArrayCell[] {
  const cells: ArrayCell[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ row: r, col: c });
    }
  }
  return cells;
}

/**
 * Verifies that a * b === b * a (commutative invariance).
 */
export function isCommutativeProduct(a: number, b: number): boolean {
  return a * b === b * a;
}
