/**
 * Pure domain model for Knot G1: Angles as turns.
 * (Ray rotation, angle classification, turn fractions, arm length invariance, and SVG arc geometry).
 */

export type AngleType = 'zero' | 'acute' | 'right' | 'obtuse' | 'straight' | 'reflex' | 'full';

export interface TurnFraction {
  num: number;
  den: number;
  label: string;
}

export interface AngleInfo {
  degrees: number;
  radians: number;
  type: AngleType;
  turnFraction: TurnFraction;
  typeLabel: string;
}

/**
 * Normalizes an angle in degrees into [0, 360].
 */
export function normalizeAngle(degrees: number): number {
  const mod = degrees % 360;
  return mod < 0 ? mod + 360 : mod;
}

/**
 * Classifies an angle by degree measurement.
 */
export function classifyAngle(degrees: number): AngleType {
  const norm = normalizeAngle(degrees);
  if (norm === 0) return degrees === 360 ? 'full' : 'zero';
  if (norm < 90) return 'acute';
  if (norm === 90) return 'right';
  if (norm < 180) return 'obtuse';
  if (norm === 180) return 'straight';
  if (norm < 360) return 'reflex';
  return 'full';
}

/**
 * Calculates the simplified turn fraction of a full circle.
 */
export function turnFraction(degrees: number): TurnFraction {
  const norm = normalizeAngle(degrees);
  if (norm === 0 && degrees !== 360) {
    return { num: 0, den: 1, label: '0 turn' };
  }
  if (norm === 90) {
    return { num: 1, den: 4, label: '1/4 turn (Quarter turn)' };
  }
  if (norm === 180) {
    return { num: 1, den: 2, label: '1/2 turn (Half turn)' };
  }
  if (norm === 270) {
    return { num: 3, den: 4, label: '3/4 turn (Three-quarter turn)' };
  }
  if (norm === 0 || norm === 360) {
    return { num: 1, den: 1, label: 'Full turn' };
  }

  // General simplification: gcd with 360
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const g = gcd(Math.round(norm), 360);
  const num = Math.round(norm) / g;
  const den = 360 / g;
  return { num, den, label: `${num}/${den} turn` };
}

/**
 * Friendly human-readable type label for calm presentation.
 */
export function angleTypeLabel(type: AngleType): string {
  switch (type) {
    case 'zero':
      return 'Zero turn (0°)';
    case 'acute':
      return 'Acute angle (< 90°)';
    case 'right':
      return 'Quarter turn / Right angle (90°)';
    case 'obtuse':
      return 'Obtuse angle (between 90° and 180°)';
    case 'straight':
      return 'Half turn / Straight angle (180°)';
    case 'reflex':
      return 'Reflex angle (> 180°)';
    case 'full':
      return 'Full turn (360°)';
  }
}

/**
 * Generates comprehensive angle information.
 */
export function getAngleInfo(degrees: number): AngleInfo {
  const norm = degrees === 360 ? 360 : normalizeAngle(degrees);
  const rad = (norm * Math.PI) / 180;
  const type = classifyAngle(norm);
  const tf = turnFraction(norm);
  const typeLabel = angleTypeLabel(type);

  return {
    degrees: norm,
    radians: rad,
    type,
    turnFraction: tf,
    typeLabel,
  };
}

/**
 * Core pedagogical invariant: Angular aperture is completely invariant to ray arm length.
 */
export function isArmLengthInvariant(
  angle1: number,
  armLength1: number,
  angle2: number,
  armLength2: number
): boolean {
  if (armLength1 <= 0 || armLength2 <= 0) return false;
  return Math.abs(normalizeAngle(angle1) - normalizeAngle(angle2)) < 0.001;
}

/**
 * Generates SVG path coordinates for an angular sector / arc.
 * Center (cx, cy), radius r, angle in degrees counter-clockwise from horizontal right.
 */
export function arcCoordinates(
  cx: number,
  cy: number,
  radius: number,
  angleDegrees: number
): string {
  const norm = angleDegrees > 360 ? 360 : Math.max(0, angleDegrees);
  if (norm === 0) return '';

  const rad = (norm * Math.PI) / 180;
  const startX = cx + radius;
  const startY = cy;
  const endX = cx + radius * Math.cos(rad);
  const endY = cy - radius * Math.sin(rad); // SVG y goes down, so counter-clockwise sweeps upward

  const largeArcFlag = norm > 180 ? 1 : 0;

  if (norm >= 360) {
    // Full circle
    return `M ${cx - radius} ${cy} A ${radius} ${radius} 0 1 0 ${cx + radius} ${cy} A ${radius} ${radius} 0 1 0 ${cx - radius} ${cy}`;
  }

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY}`;
}
