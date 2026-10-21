/**
 * Pictures for the chapters to read. A figure id is either a reading-only picture from READING_FIGURES
 * (`dig:all`, `map:coast`), or a lesson picture `<knot>:<part>` with part `prashna`, `mistake`,
 * `mistake.reveal` or a Bodha card key, optionally `@<step>` for the worked example (`C8:example@3`).
 */

import { DIG_LAYERS, DUG } from '../../domain/world';
import { renderDig } from '../diagrams/loka/dig';
import { mapCrop, mapPlaces, renderIndiaMap } from '../diagrams/loka/india-map';
import { getVisuals, type CardKey } from './index';

export const READING_FIGURES: Record<string, () => SVGSVGElement> = {
  'dig:all': () => renderDig({ revealed: DIG_LAYERS, finds: DUG }),
  'map:coast': () =>
    renderIndiaMap({
      found: ['gujarat', 'maharashtra', 'goa', 'karnataka', 'kerala', 'tn', 'ap', 'odisha', 'wb'],
    }),
  'map:rice': () =>
    renderIndiaMap({
      found: ['wb', 'up', 'punjab', 'odisha', 'ap', 'telangana'],
      places: mapPlaces(['darjeeling']),
    }),
  'map:cities': () =>
    renderIndiaMap({
      rivers: ['ganga', 'yamuna'],
      places: mapPlaces(['delhi', 'kolkata', 'mumbai', 'chennai', 'hyderabad', 'bengaluru']),
    }),
  'map:himalaya': () =>
    renderIndiaMap({ found: ['ladakh', 'jk', 'hp', 'uk', 'sikkim', 'arunachal'] }),
  'map:plains': () =>
    renderIndiaMap({
      zones: ['plains'],
      rivers: ['ganga', 'yamuna', 'brahmaputra'],
      places: mapPlaces(['haridwar', 'patna']),
    }),
  'map:thar': () =>
    renderIndiaMap({
      found: ['rajasthan'],
      zones: ['thar'],
      places: mapPlaces(['jaisalmer', 'bikaner']),
      crop: mapCrop(32, 68, 22, 80),
    }),
  'map:ganga': () =>
    renderIndiaMap({
      rivers: ['ganga', 'yamuna', 'ghaghara', 'son'],
      places: mapPlaces(
        ['gangotri', 'haridwar', 'prayagraj', 'varanasi', 'patna', 'kolkata'],
        ['prayagraj', 'kolkata']
      ),
      crop: mapCrop(32, 76, 21, 90),
    }),
  'map:landforms': () =>
    renderIndiaMap({ zones: ['himalaya', 'plains', 'thar', 'deccan', 'ghats'] }),
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
