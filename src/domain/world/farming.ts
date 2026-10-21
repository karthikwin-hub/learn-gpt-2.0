/**
 * Farms of India (C2): crops are grown in three seasons. Kharif crops are sown with the monsoon in June
 * and July, rabi crops in the cool winter from October to December, and zaid crops in the short hot
 * summer between them. A crop sown out of its season fails, so no crop can be grown at any time.
 */

export type CropSeason = 'kharif' | 'rabi' | 'zaid';
export type Crop = 'rice' | 'cotton' | 'wheat' | 'mustard' | 'watermelon' | 'cucumber';

export const CROP_SEASONS: readonly CropSeason[] = ['kharif', 'rabi', 'zaid'];

/** Months (1 = January) in which each season's crops are sown. */
export const SOWING_MONTHS: Record<CropSeason, readonly number[]> = {
  kharif: [6, 7],
  rabi: [10, 11, 12],
  zaid: [3, 4],
};

export const CROPS: readonly Crop[] = [
  'rice',
  'wheat',
  'watermelon',
  'cotton',
  'mustard',
  'cucumber',
];

const SEASON_OF: Record<Crop, CropSeason> = {
  rice: 'kharif',
  cotton: 'kharif',
  wheat: 'rabi',
  mustard: 'rabi',
  watermelon: 'zaid',
  cucumber: 'zaid',
};

export function seasonOfCrop(crop: Crop): CropSeason {
  return SEASON_OF[crop];
}

/** The season whose crops are sown in `month`, or null in a month of growing and harvest. */
export function sowingSeasonOf(month: number): CropSeason | null {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Month must be 1 to 12, got ${month}`);
  }
  return CROP_SEASONS.find((s) => SOWING_MONTHS[s].includes(month)) ?? null;
}

export function canSow(crop: Crop, month: number): boolean {
  return sowingSeasonOf(month) === seasonOfCrop(crop);
}

/** The bench's three fields: a month each, and the crop that suits it. */
export const FIELDS: readonly { month: number; crop: Crop }[] = [
  { month: 7, crop: 'rice' },
  { month: 11, crop: 'wheat' },
  { month: 4, crop: 'watermelon' },
];

/** The crops offered for every field. */
export const FIELD_CROPS: readonly Crop[] = FIELDS.map((f) => f.crop);
