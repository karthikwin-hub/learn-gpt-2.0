/**
 * One registry of lesson pictures, keyed by knot id (FR-002). Each group file owns its knots' parts;
 * a knot may take its card figures from one table and its Prashna or mistake picture from another,
 * but no part may be defined twice.
 */

import { PORTED } from './ported';
import { NUMBER } from './number';
import { FACTORS } from './factors';
import { GEOMETRY } from './geometry';
import { MEASURE } from './measure';
import { LOGIC } from './logic';
import type { LessonVisuals, VisualsTable } from './types';

export function mergeTables(tables: Record<string, VisualsTable>): VisualsTable {
  const out: VisualsTable = {};
  for (const [group, table] of Object.entries(tables)) {
    for (const [knot, parts] of Object.entries(table)) {
      const into: LessonVisuals = (out[knot] ||= {});
      for (const part of ['prashna', 'mistake'] as const) {
        if (!parts[part]) continue;
        if (into[part])
          throw new Error(`${knot} ${part} picture is defined twice (again in ${group})`);
        into[part] = parts[part] as never;
      }
      for (const [card, figure] of Object.entries(parts.cards || {})) {
        into.cards ||= {};
        const key = card as keyof NonNullable<LessonVisuals['cards']>;
        if (into.cards[key])
          throw new Error(`${knot} ${card} figure is defined twice (again in ${group})`);
        into.cards[key] = figure;
      }
    }
  }
  return out;
}

const TABLE = mergeTables({ PORTED, NUMBER, FACTORS, GEOMETRY, MEASURE, LOGIC });

export function getVisuals(knotId: string): LessonVisuals {
  return TABLE[knotId] || {};
}

export type { CardKey, LessonVisuals, VisualsTable } from './types';
