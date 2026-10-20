/**
 * The Thar Desert (C6): a desert is dry, not always hot. Sand heats up fast and cools down fast under
 * a dry, clear sky, so the Thar swings far between day and night; a seaside town, warmed and cooled by
 * slow water, swings much less. Plants, animals and people live with little water.
 */

export type DesertPlace = 'thar' | 'coast';
export type DesertSeason = 'summer' | 'winter';
export type DesertThing = 'camel' | 'khejri' | 'kund' | 'walls';

/** Typical rounded daily low and high in °C. */
export const DAY_RANGE: Record<DesertPlace, Record<DesertSeason, readonly [number, number]>> = {
  thar: { summer: [25, 45], winter: [5, 25] },
  coast: { summer: [27, 34], winter: [20, 30] },
};

export const DESERT_SEASONS: readonly DesertSeason[] = ['summer', 'winter'];
/** The hours the child can choose, three apart through a whole day. */
export const DESERT_HOURS: readonly number[] = [0, 3, 6, 9, 12, 15, 18, 21];
/** Coolest just before sunrise, warmest in mid-afternoon. */
export const COOLEST_HOUR = 6;
export const WARMEST_HOUR = 15;
/** A Thar reading at or below this counts as the cold the lesson is after. */
export const COLD_ENOUGH = 6;

export const DESERT_THINGS: readonly DesertThing[] = ['camel', 'khejri', 'kund', 'walls'];

/** Temperature at a time of day (0 up to 24 hours), rounded to a whole degree. */
export function temperatureAtHour(place: DesertPlace, season: DesertSeason, hour: number): number {
  if (!Number.isFinite(hour) || hour < 0 || hour >= 24)
    throw new Error(`Hour must be 0 to 24, got ${hour}`);
  const [low, high] = DAY_RANGE[place][season];
  const rise = WARMEST_HOUR - COOLEST_HOUR;
  const h = hour < COOLEST_HOUR ? hour + 24 : hour;
  const share =
    h <= WARMEST_HOUR
      ? (1 - Math.cos((Math.PI * (h - COOLEST_HOUR)) / rise)) / 2
      : (1 + Math.cos((Math.PI * (h - WARMEST_HOUR)) / (24 - rise))) / 2;
  return Math.round(low + (high - low) * share);
}

/** How far the temperature moves between night and day. */
export function daySwing(place: DesertPlace, season: DesertSeason): number {
  const [low, high] = DAY_RANGE[place][season];
  return high - low;
}

export function isColdEnough(season: DesertSeason, hour: number): boolean {
  return temperatureAtHour('thar', season, hour) <= COLD_ENOUGH;
}

/** Each thing helps the desert in its own way; the help is named by the thing's own id. */
export function helpsWith(thing: DesertThing, help: string): boolean {
  return thing === help;
}
