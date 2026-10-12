/**
 * Common Factors & HCF domain model (Knot F4).
 *
 * Implements pure mathematical functions for common factors,
 * Euclidean GCD/HCF calculation, Venn intersection classification,
 * dual-rod tile testing, and fraction simplification by HCF.
 */

import { findAllFactors } from './factors';

export interface VennClassification {
  onlyA: number[];
  common: number[];
  onlyB: number[];
  hcf: number;
}

export interface TileFitResult {
  fitsA: boolean;
  fitsB: boolean;
  isCommonFactor: boolean;
  isHCF: boolean;
}

export interface FractionHCFSimplification {
  num: number;
  den: number;
  simplifiedNum: number;
  simplifiedDen: number;
  hcf: number;
}

/**
 * Computes the Highest Common Factor (HCF / GCD) using Euclid's algorithm.
 */
export function calculateHCF(a: number, b: number): number {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  if (x === 0) return y;
  if (y === 0) return x;
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

/**
 * Returns all shared (common) factors between two positive integers in ascending order.
 */
export function findCommonFactors(a: number, b: number): number[] {
  const factorsA = new Set(findAllFactors(a));
  const factorsB = findAllFactors(b);
  return factorsB.filter((f) => factorsA.has(f));
}

/**
 * Partitions factors of a and b into Venn diagram sectors:
 * onlyA, common (intersection), onlyB, and identifies the HCF.
 */
export function classifyVennFactors(a: number, b: number): VennClassification {
  const factorsA = findAllFactors(a);
  const factorsB = findAllFactors(b);
  const common = findCommonFactors(a, b);
  const commonSet = new Set(common);

  const onlyA = factorsA.filter((f) => !commonSet.has(f));
  const onlyB = factorsB.filter((f) => !commonSet.has(f));
  const hcf = common.length > 0 ? common[common.length - 1]! : calculateHCF(a, b);

  return { onlyA, common, onlyB, hcf };
}

/**
 * Checks whether a measuring tile size divides two lengths with zero leftovers.
 */
export function testTileFit(lengthA: number, lengthB: number, tileSize: number): TileFitResult {
  if (tileSize <= 0 || !Number.isInteger(tileSize)) {
    return { fitsA: false, fitsB: false, isCommonFactor: false, isHCF: false };
  }
  const fitsA = lengthA % tileSize === 0;
  const fitsB = lengthB % tileSize === 0;
  const isCommonFactor = fitsA && fitsB;
  const hcf = calculateHCF(lengthA, lengthB);
  const isHCF = tileSize === hcf;

  return { fitsA, fitsB, isCommonFactor, isHCF };
}

/**
 * Simplifies a fraction to its lowest terms in one single step by dividing by its HCF.
 */
export function simplifyFractionByHCF(num: number, den: number): FractionHCFSimplification {
  const hcf = calculateHCF(num, den);
  return {
    num,
    den,
    simplifiedNum: num / hcf,
    simplifiedDen: den / hcf,
    hcf,
  };
}
