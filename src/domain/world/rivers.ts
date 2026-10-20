/**
 * Rivers of India (C8): a river flows downhill from its high source to its low mouth, whichever way on
 * the map that is; the Ganga flows mostly east. Rivers fed by Himalayan snow flow all year; rivers fed
 * only by rain run in the monsoon and fall low or dry in the dry months.
 */

export type GangaPlace =
  'gangotri' | 'haridwar' | 'prayagraj' | 'varanasi' | 'patna' | 'sundarbans';
export type RiverFeed = 'snow' | 'rain';

/** In the order the water passes them, with a rounded height above the sea in metres. */
export const GANGA_PLACES: readonly GangaPlace[] = [
  'gangotri',
  'haridwar',
  'prayagraj',
  'varanasi',
  'patna',
  'sundarbans',
];
export const PLACE_HEIGHT: Record<GangaPlace, number> = {
  gangotri: 4000,
  haridwar: 300,
  prayagraj: 100,
  varanasi: 80,
  patna: 50,
  sundarbans: 0,
};

export const RIVER_FEEDS: readonly RiverFeed[] = ['snow', 'rain'];
/** The month the bench asks about: hot, before the monsoon. */
export const DRY_MONTH = 4;

function checkMonth(month: number): void {
  if (!Number.isInteger(month) || month < 1 || month > 12)
    throw new Error(`Month must be 1 to 12, got ${month}`);
}

/**
 * How full a river runs in a month, 0 (dry) to 3 (full). Snow and ice keep a snow-fed river running
 * all year, more when they melt from April to September; the monsoon fills both kinds.
 */
export function waterLevel(feed: RiverFeed, month: number): number {
  checkMonth(month);
  const monsoon = month === 7 || month === 8 ? 2 : month === 6 || month === 9 ? 1 : 0;
  if (feed === 'rain') return month === 10 ? 1 : month >= 6 && month <= 9 ? monsoon + 1 : 0;
  const melt = month >= 4 && month <= 9 ? 1 : 0;
  return Math.min(3, 1 + melt + (monsoon > 1 ? 1 : 0));
}

export function flowsIn(feed: RiverFeed, month: number): boolean {
  return waterLevel(feed, month) > 0;
}

/** True when `order` follows the water downhill from the source so far. */
export function isDownstreamOrder(order: readonly GangaPlace[]): boolean {
  return order.every((p, i) => GANGA_PLACES[i] === p);
}
