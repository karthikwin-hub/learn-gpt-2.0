/**
 * Pure domain logic for Growing Patterns (Figurate & Triangular Numbers) (Knot P1).
 *
 * Core concepts:
 * - Triangular numbers: T_n = n(n+1)/2 = 1 + 2 + ... + n (layer n adds n dots).
 * - Square numbers: S_n = n^2 (stage n adds an L-shaped gnomon of 2n - 1 tiles).
 * - Quadratic expansion vs linear misconception (Amit's 5x2 = 10 vs 5x5 = 25).
 */

/**
 * Calculates the nth triangular number: T_n = n(n + 1) / 2.
 */
export function triangularNumber(n: number): number {
  if (n <= 0) return 0;
  return (n * (n + 1)) / 2;
}

/**
 * Calculates the nth square number: S_n = n^2.
 */
export function squareNumber(n: number): number {
  if (n <= 0) return 0;
  return n * n;
}

/**
 * Returns the number of tiles in the L-shaped gnomon added at stage n: 2n - 1.
 */
export function gnomonSize(n: number): number {
  if (n <= 0) return 0;
  return 2 * n - 1;
}

/**
 * Returns the number of dots added in the bottom row at stage n: n.
 */
export function triangularLayerSize(n: number): number {
  if (n <= 0) return 0;
  return n;
}

export interface FigurateDot {
  row: number;
  col: number;
  layer: number;
}

/**
 * Generates dot coordinates for a triangular number pattern up to stage n.
 */
export function generateTriangularDots(stage: number): FigurateDot[] {
  if (stage <= 0) return [];
  const dots: FigurateDot[] = [];
  for (let r = 1; r <= stage; r++) {
    for (let c = 1; c <= r; c++) {
      dots.push({ row: r, col: c, layer: r });
    }
  }
  return dots;
}

/**
 * Generates tile coordinates for a square number pattern up to stage n.
 * layer is 1-indexed gnomon level: max(r, c) + 1.
 */
export function generateSquareGrid(stage: number): FigurateDot[] {
  if (stage <= 0) return [];
  const tiles: FigurateDot[] = [];
  for (let r = 1; r <= stage; r++) {
    for (let c = 1; c <= stage; c++) {
      const layer = Math.max(r, c);
      tiles.push({ row: r, col: c, layer });
    }
  }
  return tiles;
}
