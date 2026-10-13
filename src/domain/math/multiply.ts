/**
 * Pure multiplication mathematical rules and models.
 * Strictly domain logic with zero DOM or UI dependencies.
 */

import { calculateHCF } from './hcf';
export interface TensOnes {
  tens: number;
  ones: number;
}

export interface PartialRoom {
  x: number;
  y: number;
  w: number;
  h: number;
  product: number;
}

export interface ColumnLine {
  strip: 'ones' | 'tens';
  by: number;
  value: number;
}

export interface ColumnMethodResult {
  lines: ColumnLine[];
  total: number;
}

/**
 * Calculates area of grid / rectangle: cols * rows.
 */
export function area(cols: number, rows: number): number {
  return cols * rows;
}

/**
 * Splits a two-digit integer into its tens and ones components.
 * e.g. 23 -> { tens: 20, ones: 3 }
 */
export function splitTensOnes(n: number): TensOnes {
  const ones = n % 10;
  return { tens: n - ones, ones };
}

/**
 * The four rooms of an area model cut at the tens.
 * Empty rooms (side with length 0) are omitted.
 */
export function partialProducts(cols: number, rows: number): PartialRoom[] {
  const c = splitTensOnes(cols);
  const r = splitTensOnes(rows);
  const rooms: PartialRoom[] = [];

  const colSegments = [
    { w: c.tens, x: 0 },
    { w: c.ones, x: c.tens },
  ];
  const rowSegments = [
    { h: r.tens, y: 0 },
    { h: r.ones, y: r.tens },
  ];

  for (const col of colSegments) {
    for (const row of rowSegments) {
      if (col.w > 0 && row.h > 0) {
        rooms.push({
          x: col.x,
          y: row.y,
          w: col.w,
          h: row.h,
          product: col.w * row.h,
        });
      }
    }
  }

  return rooms;
}

/**
 * The written column method constructed from partial product strips:
 * one line for ones strip, one line for tens strip.
 */
export function columnMethod(cols: number, rows: number): ColumnMethodResult {
  const r = splitTensOnes(rows);
  const lines: ColumnLine[] = [];

  if (r.ones > 0) {
    lines.push({ strip: 'ones', by: r.ones, value: cols * r.ones });
  }
  if (r.tens > 0) {
    lines.push({ strip: 'tens', by: r.tens, value: cols * r.tens });
  }

  return { lines, total: cols * rows };
}

/**
 * Generates multiples of n up to upTo.
 */
export function multiples(n: number, upTo: number): number[] {
  const out: number[] = [];
  for (let k = n; k <= upTo; k += n) {
    out.push(k);
  }
  return out;
}

/** Greatest common divisor; the one implementation is calculateHCF in hcf.ts. */
export const gcd = calculateHCF;

/**
 * Least common multiple of two integers.
 */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return (a * b) / gcd(a, b);
}
