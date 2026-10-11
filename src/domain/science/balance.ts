/**
 * Pure domain module for Two-Pan Balance (K1).
 */

/**
 * Calculates beam tilt in degrees from -25 (left dipping) to +25 (right dipping).
 * When left === right (taking tare into account), returns 0 (level equilibrium).
 */
export function calculateBalanceTilt(
  leftGrams: number,
  rightGrams: number,
  tare = 0,
  maxAngle = 25
): number {
  const effectiveRight = Math.max(0, rightGrams);
  const effectiveLeft = Math.max(0, leftGrams + tare);
  const delta = effectiveRight - effectiveLeft;
  if (Math.abs(delta) < 0.001) return 0;
  // Tilt proportional to mass difference, smoothly saturated
  const rawTilt = delta * 4;
  return Math.max(-maxAngle, Math.min(maxAngle, rawTilt));
}

/**
 * Checks whether both pans are in equilibrium.
 */
export function isBalanced(
  leftGrams: number,
  rightGrams: number,
  tare = 0,
  tolerance = 0.5
): boolean {
  const effectiveRight = Math.max(0, rightGrams);
  const effectiveLeft = Math.max(0, leftGrams + tare);
  return Math.abs(effectiveRight - effectiveLeft) <= tolerance;
}
