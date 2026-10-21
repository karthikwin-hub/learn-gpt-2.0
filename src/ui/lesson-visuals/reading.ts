/**
 * Pictures for the chapters to read. A figure id is either a reading-only picture from READING_FIGURES
 * (`dig:all`, `map:states`), or a lesson picture `<knot>:<part>` with part `prashna`, `mistake`,
 * `mistake.reveal` or a Bodha card key, optionally `@<step>` for the worked example (`C8:example@3`).
 */

import { DIG_LAYERS, DUG } from '../../domain/world';
import { renderDig } from '../diagrams/loka/dig';
import { getVisuals, type CardKey } from './index';

export const READING_FIGURES: Record<string, () => SVGSVGElement> = {
  'dig:all': () => renderDig({ revealed: DIG_LAYERS, finds: DUG }),
};

export function readingFigure(id: string): SVGSVGElement | null {
  const own = READING_FIGURES[id];
  if (own) return own();
  const m = /^([A-Z]\d+):([a-z.]+)(?:@(\d+))?$/.exec(id);
  if (!m) return null;
  const [, knot = '', part = '', step] = m;
  const v = getVisuals(knot);
  if (part === 'prashna') return v.prashna?.() ?? null;
  if (part === 'mistake') return v.mistake?.(false) ?? null;
  if (part === 'mistake.reveal') return v.mistake?.(true) ?? null;
  return v.cards?.[part as CardKey]?.(Number(step ?? 0)) ?? null;
}
