/**
 * One registry of lesson pictures, keyed by knot id (FR-002). Each group file owns its knots;
 * a later table replaces an earlier entry for the same knot.
 */

import { PORTED } from './ported';
import { NUMBER } from './number';
import { FACTORS } from './factors';
import { GEOMETRY } from './geometry';
import { MEASURE } from './measure';
import { LOGIC } from './logic';
import type { LessonVisuals, VisualsTable } from './types';

const TABLE: VisualsTable = { ...PORTED, ...NUMBER, ...FACTORS, ...GEOMETRY, ...MEASURE, ...LOGIC };

export function getVisuals(knotId: string): LessonVisuals {
  return TABLE[knotId] || {};
}

export type { CardKey, LessonVisuals, VisualsTable } from './types';
