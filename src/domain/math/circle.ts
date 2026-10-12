/**
 * Circle mathematics domain logic: Centre, Radius, Diameter, and Chords.
 *
 * Core invariant:
 * - A circle is the set of all points at distance `r` from the centre.
 * - The diameter is the maximum chord, passing through the centre: d = 2 * r.
 * - Any chord at perpendicular distance d_c from the centre has length:
 *     2 * sqrt(r^2 - d_c^2)
 *   which is strictly less than 2r when d_c > 0.
 */

export interface CircleComparison {
  radius: number;
  diameter: number;
  chordLength: number;
  isDiameter: boolean;
  differenceFromDiameter: number;
}

/**
 * Calculates circle diameter given radius.
 */
export function diameterFromRadius(radius: number): number {
  if (radius < 0) return 0;
  return radius * 2;
}

/**
 * Calculates circle radius given diameter.
 */
export function radiusFromDiameter(diameter: number): number {
  if (diameter < 0) return 0;
  return diameter / 2;
}

/**
 * Calculates chord length at a perpendicular distance from the centre.
 * Half-chord = sqrt(r^2 - d^2), Chord = 2 * sqrt(r^2 - d^2).
 */
export function chordLength(radius: number, distanceFromCenter: number): number {
  if (radius <= 0) return 0;
  const d = Math.abs(distanceFromCenter);
  if (d >= radius) return 0;
  return 2 * Math.sqrt(radius * radius - d * d);
}

/**
 * Checks whether a chord passes through the centre (is a diameter).
 */
export function isChordDiameter(distanceFromCenter: number, tolerance = 1e-4): boolean {
  return Math.abs(distanceFromCenter) <= tolerance;
}

/**
 * Calculates circumference: 2 * pi * r.
 */
export function circumference(radius: number): number {
  if (radius < 0) return 0;
  return 2 * Math.PI * radius;
}

/**
 * Calculates circle area: pi * r^2.
 */
export function circleArea(radius: number): number {
  if (radius < 0) return 0;
  return Math.PI * radius * radius;
}

/**
 * Produces comparison between diameter and chord at given offset.
 */
export function compareChordToDiameter(
  radius: number,
  distanceFromCenter: number
): CircleComparison {
  const r = Math.max(0, radius);
  const d = diameterFromRadius(r);
  const cLen = chordLength(r, distanceFromCenter);
  const isDiam = isChordDiameter(distanceFromCenter);
  return {
    radius: r,
    diameter: d,
    chordLength: cLen,
    isDiameter: isDiam,
    differenceFromDiameter: Math.max(0, d - cLen),
  };
}
