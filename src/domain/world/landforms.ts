/**
 * Landforms (E3 "Mountains, plateaus, plains"): a landform is named by two things together, how high
 * it stands and the shape of its top, so height alone never makes a mountain.
 */

export type LandHeight = 'low' | 'high';
export type LandTop = 'flat' | 'peaked';
export type Landform = 'plain' | 'plateau' | 'mountain' | 'hill';

export const LAND_HEIGHTS: readonly LandHeight[] = ['low', 'high'];
export const LAND_TOPS: readonly LandTop[] = ['flat', 'peaked'];

const FORM: Record<LandHeight, Record<LandTop, Landform>> = {
  low: { flat: 'plain', peaked: 'hill' },
  high: { flat: 'plateau', peaked: 'mountain' },
};

export function landformOf(height: LandHeight, top: LandTop): Landform {
  return FORM[height][top];
}

/** The three main landforms, from the highest to the lowest, as drawn from the hills to the sea. */
export const MAIN_LANDFORMS: readonly Landform[] = ['mountain', 'plateau', 'plain'];

/** The order the bench asks the child to build them in. */
export const LANDFORM_TARGETS: readonly Landform[] = ['plateau', 'mountain', 'plain'];

/** Most people live and farm on plains: flat, low land with deep soil and rivers. */
export const MOST_PEOPLE_LIVE_ON: Landform = 'plain';
