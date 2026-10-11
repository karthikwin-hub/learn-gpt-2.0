/**
 * Pure geometry rules: rope rectangles and symmetry groups.
 * Based on Sulba Sutras rope geometry and kolam symmetry groups.
 */

export interface RopeRectangle {
  w: number;
  h: number;
  perimeter: number;
  area: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export type Transform2D = (p: Point2D) => Point2D;
export type SymmetryMode = 'mirror' | 'turn';

/**
 * A rectangle made from a closed rope of fixed length.
 * Width is whole units from 1 to perimeter / 2 - 1.
 */
export function ropeRect(perimeter: number, width: number): RopeRectangle {
  const half = perimeter / 2;
  const w = Math.max(1, Math.min(half - 1, Math.round(width)));
  const h = half - w;
  return {
    w,
    h,
    perimeter: 2 * (w + h),
    area: w * h,
  };
}

/**
 * All valid integral rectangles with given perimeter.
 */
export function ropeOptions(perimeter: number): RopeRectangle[] {
  const out: RopeRectangle[] = [];
  for (let w = 1; w < perimeter / 2; w++) {
    out.push(ropeRect(perimeter, w));
  }
  return out;
}

/**
 * Rectangle that maximizes area for the given perimeter (the square or closest to square).
 */
export function maxAreaRect(perimeter: number): RopeRectangle {
  const options = ropeOptions(perimeter);
  if (options.length === 0) {
    return ropeRect(perimeter, 1);
  }
  return options.reduce((best, r) => (r.area > best.area ? r : best));
}

/**
 * Symmetry transforms about the origin.
 * mode 'turn': cyclic group C_n (n rotations).
 * mode 'mirror': dihedral group D_n (n rotations and n reflections, so n mirror lines).
 * Each transform maps a point {x, y} to a new point.
 */
export function symmetryTransforms(order: number, mode: SymmetryMode): Transform2D[] {
  const list: Transform2D[] = [];
  for (let k = 0; k < order; k++) {
    const a = (2 * Math.PI * k) / order;
    list.push(rotation(a));
    if (mode === 'mirror') {
      list.push(reflection(a / 2));
    }
  }
  return list;
}

export function rotation(a: number): Transform2D {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return (p: Point2D) => ({
    x: c * p.x - s * p.y,
    y: s * p.x + c * p.y,
  });
}

/**
 * Reflection across the line through the origin at angle t.
 */
export function reflection(t: number): Transform2D {
  const c = Math.cos(2 * t);
  const s = Math.sin(2 * t);
  return (p: Point2D) => ({
    x: c * p.x + s * p.y,
    y: s * p.x - c * p.y,
  });
}

/**
 * Angles (radians) of the mirror lines for D_n, measured from the x-axis.
 */
export function mirrorLineAngles(order: number): number[] {
  const out: number[] = [];
  for (let k = 0; k < order; k++) {
    out.push((Math.PI * k) / order);
  }
  return out;
}

/**
 * Smallest turn (in degrees) that maps the pattern onto itself.
 */
export function smallestTurn(order: number): number {
  return 360 / order;
}
