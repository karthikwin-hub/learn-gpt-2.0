/**
 * Pollution (Q3 "Pollution and us"): what each everyday cause dirties, and which bin each kind of waste
 * belongs in (green for wet waste that rots, blue for dry waste).
 */

export type PollutionKind = 'air' | 'water' | 'land' | 'noise';
export type PollutionCause = 'factory' | 'sewage' | 'burning' | 'dumping' | 'traffic';

export const POLLUTION_KINDS: readonly PollutionKind[] = ['air', 'water', 'land', 'noise'];
export const POLLUTION_CAUSES: readonly PollutionCause[] = [
  'factory',
  'sewage',
  'burning',
  'dumping',
  'traffic',
];

const EFFECTS: Record<PollutionCause, readonly PollutionKind[]> = {
  factory: ['air', 'water'],
  sewage: ['water'],
  burning: ['air'],
  dumping: ['land', 'water'],
  traffic: ['air', 'noise'],
};

export function effectsOf(cause: PollutionCause): readonly PollutionKind[] {
  return EFFECTS[cause];
}

/** How many of the active causes dirty each part of the surroundings; 0 means clean. */
export function pollutionReadings(
  active: readonly PollutionCause[]
): Record<PollutionKind, number> {
  const out: Record<PollutionKind, number> = { air: 0, water: 0, land: 0, noise: 0 };
  for (const c of new Set(active)) for (const k of EFFECTS[c]) out[k]++;
  return out;
}

/** The highest reading any part can reach, with every cause on. */
export const MAX_READING = Math.max(...Object.values(pollutionReadings(POLLUTION_CAUSES)));

export function isAllClean(active: readonly PollutionCause[]): boolean {
  return Object.values(pollutionReadings(active)).every((n) => n === 0);
}

export type WasteBin = 'wet' | 'dry';
export type WasteItem = 'peel' | 'leaves' | 'tea' | 'bottle' | 'paper' | 'can';

export const WASTE_BINS: readonly WasteBin[] = ['wet', 'dry'];
export const WASTE_ITEMS: readonly WasteItem[] = [
  'peel',
  'bottle',
  'leaves',
  'paper',
  'tea',
  'can',
];

const BIN_OF: Record<WasteItem, WasteBin> = {
  peel: 'wet',
  leaves: 'wet',
  tea: 'wet',
  bottle: 'dry',
  paper: 'dry',
  can: 'dry',
};

export function binFor(item: WasteItem): WasteBin {
  return BIN_OF[item];
}
