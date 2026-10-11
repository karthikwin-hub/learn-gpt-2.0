/**
 * Domain module: Timeline and historical chronology (I2)
 * See docs/rules/WORLD_RULES.md
 */

export type Era = 'BCE' | 'CE';

export interface TimelineEvent {
  id: string;
  year: number;
  about?: boolean;
}

/**
 * Returns signed representation of a historical year.
 * BCE years are negative (-year); CE years are positive (+year).
 * Invariant: Historical reckoning has NO year zero.
 */
export function signed(year: number, era: Era): number {
  if (!year || year < 1) {
    throw new Error('Years start at 1: ' + year);
  }
  return era === 'BCE' ? -year : year;
}

/**
 * Whole years elapsed between a and b.
 * Crossing the BCE/CE join skips the non-existent year zero.
 */
export function yearsBetween(a: number, b: number): number {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  return hi - lo - (lo < 0 && hi > 0 ? 1 : 0);
}

/**
 * Checks whether year a occurred strictly earlier than year b.
 */
export function isEarlier(a: number, b: number): boolean {
  return a < b;
}

/**
 * Maps CE year to its ordinal century (e.g. 1st century is years 1 to 100).
 */
export function centuryCE(year: number): number {
  return Math.ceil(year / 100);
}

/**
 * Six canonical anchor events for Class 5 history thread.
 */
export const EVENTS: readonly TimelineEvent[] = [
  { id: 'harappa', year: -2500, about: true },
  { id: 'ashoka', year: -250, about: true },
  { id: 'aryabhata', year: 499 },
  { id: 'taj', year: 1653, about: true },
  { id: 'independence', year: 1947 },
  { id: 'chandrayaan', year: 2023 },
] as const;

/**
 * Validates that an array of event IDs is in strictly chronological order.
 */
export function chronological(ids: string[]): boolean {
  const at: Record<string, number> = {};
  for (const e of EVENTS) {
    at[e.id] = e.year;
  }
  return ids.every((id, i) => {
    if (i === 0) return true;
    const prevId = ids[i - 1];
    if (!prevId) return false;
    const prevYear = at[prevId];
    const currYear = at[id];
    return typeof prevYear === 'number' && typeof currYear === 'number' && prevYear < currYear;
  });
}
