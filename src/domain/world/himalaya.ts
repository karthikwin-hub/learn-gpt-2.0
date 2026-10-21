/**
 * The Himalaya (C4): air gets colder as you climb, about 6.5 °C for every 1,000 metres, so higher is
 * colder, not warmer, though it is nearer the Sun. The Himalaya rise from the plains in three ranges:
 * the Shivalik, the Himachal and the Himadri.
 */

export type HimalayanRange = 'shivalik' | 'himachal' | 'himadri';

/** Degrees Celsius lost for every 1,000 metres climbed (the usual average for still air). */
export const COOLING_PER_KM = 6.5;
/** A hot day on the plains, in degrees Celsius, taken as height 0. */
export const PLAINS_TEMPERATURE = 32;
export const CLIMB_STEP = 1000;
export const TOP_HEIGHT = 6000;

/** From the plains upward, with a typical height for each in metres. */
export const RANGES: readonly HimalayanRange[] = ['shivalik', 'himachal', 'himadri'];
export const RANGE_HEIGHT: Record<HimalayanRange, number> = {
  shivalik: 1000,
  himachal: 4000,
  himadri: 6000,
};

export function temperatureAt(height: number): number {
  if (!Number.isFinite(height) || height < 0)
    throw new Error(`Height must be 0 or more, got ${height}`);
  return Math.round((PLAINS_TEMPERATURE - (COOLING_PER_KM * height) / 1000) * 10) / 10;
}

export function isFreezing(height: number): boolean {
  return temperatureAt(height) <= 0;
}

/** The lowest height, in whole climbing steps, where water freezes. */
export function freezingStep(): number {
  for (let h = 0; h <= TOP_HEIGHT; h += CLIMB_STEP) if (isFreezing(h)) return h;
  throw new Error('Nothing freezes below the top');
}

/** True when `order` names the ranges from the plains upward so far. */
export function isRisingOrder(order: readonly HimalayanRange[]): boolean {
  return order.every((r, i) => RANGES[i] === r);
}
