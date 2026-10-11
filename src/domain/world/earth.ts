/**
 * Domain module: Earth motions, day/night cycles, and seasons (E1)
 * See docs/rules/WORLD_RULES.md
 */

export type Season = 'summer' | 'winter' | 'spring' | 'autumn';

/**
 * Calculates local solar hour in India for a given spin angle.
 * Viewing down on the North Pole with the Sun to the left:
 * 0° = noon (12:00), facing the Sun
 * 90° = sunset (18:00)
 * 180° = midnight (00:00)
 * 270° = sunrise (06:00)
 */
export function hourAt(spinDeg: number): number {
  const norm = ((spinDeg % 360) + 360) % 360;
  return (12 + Math.round(norm / 15)) % 24;
}

/**
 * Determines whether the given hour is daytime (06:00 to 17:59).
 */
export function isDay(hour: number): boolean {
  return hour >= 6 && hour < 18;
}

/**
 * Determines season in the Northern Hemisphere (India) by orbital month index.
 * 0 = January, 5 = June, 11 = December.
 * Axial tilt (23.5°) points toward the Sun in June and away in December.
 * Invariant: Orbital distance to Sun does NOT determine seasons.
 */
export function northernSeason(month: number): Season {
  if (month >= 4 && month <= 6) {
    return 'summer';
  }
  if (month === 11 || month <= 1) {
    return 'winter';
  }
  return month <= 3 ? 'spring' : 'autumn';
}
