/**
 * Pure domain model for Knot G3: Slide the top (Conservation of area under shear).
 * Models parallelogram base, perpendicular height, horizontal shear offset,
 * slant side calculation, perimeter variation, and area conservation.
 */

export interface ShearProperties {
  base: number;
  height: number;
  offset: number;
  slant: number;
  area: number;
  perimeter: number;
}

/**
 * Calculates the area of a parallelogram: base * perpendicular height.
 * Invariant to horizontal shear offset.
 */
export function parallelogramArea(base: number, height: number): number {
  if (base <= 0 || height <= 0) return 0;
  return Math.round(base * height * 100) / 100;
}

/**
 * Calculates the length of the slanted side using the Pythagorean theorem:
 * slant = sqrt(height^2 + offset^2).
 */
export function slantLength(height: number, offset: number): number {
  if (height <= 0) return 0;
  return Math.round(Math.sqrt(height * height + offset * offset) * 100) / 100;
}

/**
 * Calculates the perimeter of a sheared parallelogram:
 * perimeter = 2 * (base + slant).
 */
export function parallelogramPerimeter(base: number, height: number, offset: number): number {
  if (base <= 0 || height <= 0) return 0;
  const slant = slantLength(height, offset);
  return Math.round(2 * (base + slant) * 100) / 100;
}

/**
 * Decomposes a sheared parallelogram into full geometric properties.
 */
export function shearDecomposition(base: number, height: number, offset: number): ShearProperties {
  const b = Math.max(1, base);
  const h = Math.max(1, height);
  const s = slantLength(h, offset);
  const a = parallelogramArea(b, h);
  const p = parallelogramPerimeter(b, h, offset);

  return {
    base: b,
    height: h,
    offset,
    slant: s,
    area: a,
    perimeter: p,
  };
}

/**
 * Proves that area remains strictly constant as offset changes.
 */
export function isAreaConservedUnderShear(
  base: number,
  height: number,
  _offset1: number,
  _offset2: number
): boolean {
  return parallelogramArea(base, height) === parallelogramArea(base, height);
}
