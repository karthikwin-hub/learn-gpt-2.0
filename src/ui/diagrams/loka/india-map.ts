/**
 * The map of India (feature 048): Survey of India state boundaries from the generated map data, with
 * optional rivers, places and a crop. Regions too small to see on a phone carry a round marker, so a
 * chosen one still shows; choosing itself stays on the benches' named buttons.
 */

import { t } from '../../../domain/i18n/core';
import { REGIONS, STATE_COUNT, UT_COUNT } from '../../../domain/world/states';
import {
  DISPUTED_PATH,
  MAP_H,
  MAP_W,
  RIVER_PATHS,
  STATE_PATHS,
  project,
} from '../../../domain/world/geo/india-map';
import { areaOf, boundsOf, ringsOf, type Box, type Pt } from '../../../domain/world/geo/shape';
import { PLACES, type PlaceId } from '../../../domain/world/geo/places';
import { ZONES, type ZoneId } from '../../../domain/world/geo/zones';
import { svg } from '../../util/dom';
import { figCircle, figRect, figSvg, figText } from '../fig';

const STATE = '#E3D3AE';
const UT = 'var(--teal-soft)';
const FOUND = '#A8B86A';
const CHOSEN = 'var(--kumkum)';
const HIDDEN = '#F1EBDD';
const RIVER = '#3D7FBF';
const ZONE_FILL: Readonly<Record<ZoneId, string>> = {
  himalaya: '#B8A48E',
  plains: '#A9C77A',
  thar: '#EDC27A',
  deccan: '#CFA06E',
  ghats: '#6E9A57',
};
/** Regions smaller than this many square map units (about Goa) get a marker. */
const SMALL = 120;

export interface MapPlace {
  lat: number;
  lon: number;
  label: string;
  /** Write the label to the left of the dot instead of the right. */
  left?: boolean;
}

export interface IndiaMapOptions {
  /** How many regions are filled in, in the order of `REGIONS`; all of them when left out. */
  shown?: number;
  chosen?: string | null;
  found?: readonly string[];
  /** River ids from the map data, drawn in blue. */
  rivers?: readonly string[];
  places?: readonly MapPlace[];
  /** Approximate teaching zones, clipped to India's outline. */
  zones?: readonly ZoneId[];
  /** Part of the map to show, in map units; the whole of India when left out. */
  crop?: Box;
  /** One short line drawn under the map. */
  caption?: string;
}

/** Where a small region's marker goes: the middle of its largest piece. */
const MARKERS: Readonly<Record<string, Pt>> = Object.fromEntries(
  Object.entries(STATE_PATHS).flatMap(([id, d]) => {
    const rings = ringsOf(d);
    if (rings.reduce((sum, r) => sum + areaOf(r), 0) >= SMALL) return [];
    const big = rings.reduce((a, b) => (areaOf(b) > areaOf(a) ? b : a));
    const b = boundsOf([big]);
    return [[id, [(b.minX + b.maxX) / 2, (b.minY + b.maxY) / 2] as Pt]];
  })
);

function fillOf(id: string, kind: string, o: IndiaMapOptions): string {
  if (id === o.chosen) return CHOSEN;
  if (o.found?.includes(id)) return FOUND;
  return kind === 'ut' ? UT : STATE;
}

let clips = 0;

/** The map itself, in map units scaled to `scale`, cut to `crop`. */
function drawMap(o: IndiaMapOptions, crop: Box, scale: number, small: boolean): SVGGElement {
  const shown = o.shown ?? REGIONS.length;
  const clipId = `india-crop-${++clips}`;
  const clip = svg('clipPath', { id: clipId });
  clip.appendChild(
    figRect(crop.minX, crop.minY, crop.maxX - crop.minX, crop.maxY - crop.minY, { rx: 0 })
  );
  const map = svg('g', {
    transform: `scale(${scale}) translate(${-crop.minX} ${-crop.minY})`,
    'clip-path': `url(#${clipId})`,
  });
  map.appendChild(clip);
  const line = (d: string, attrs: Record<string, string | number>, into: Element = map) =>
    into.appendChild(
      svg('path', {
        d,
        'vector-effect': 'non-scaling-stroke',
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
        ...attrs,
      })
    );

  REGIONS.forEach((r, i) => {
    const d = STATE_PATHS[r.id];
    if (!d) throw new Error(`No map path for ${r.id}`);
    const on = i < shown;
    const fill = on ? fillOf(r.id, r.kind, o) : HIDDEN;
    line(d, {
      fill,
      stroke: 'var(--ink-soft)',
      'stroke-width': r.id === o.chosen ? 1.6 : small ? 0.3 : 0.6,
      ...(on && !small ? { 'data-region': r.id, 'data-kind': r.kind } : {}),
    });
    const at = MARKERS[r.id];
    if (on && at && !small) {
      const marker = figCircle(at[0], at[1], 4 / scale, {
        fill,
        stroke: 'var(--ink-soft)',
        sw: 1 / scale,
      });
      marker.setAttribute('data-marker', r.id);
      map.appendChild(marker);
    }
  });
  line(DISPUTED_PATH, { fill: HIDDEN, stroke: 'none' });

  if (o.zones?.length) {
    const outlineId = `india-outline-${clips}`;
    const outline = svg('clipPath', { id: outlineId });
    for (const d of Object.values(STATE_PATHS)) line(d, {}, outline);
    map.appendChild(outline);
    const layer = svg('g', { 'clip-path': `url(#${outlineId})` });
    for (const id of o.zones) {
      const z = ZONES[id];
      const pts = z.outline.map(([lat, lon]) =>
        project(lat, lon)
          .map((v) => v.toFixed(1))
          .join(' ')
      );
      line(
        `M${pts.join('L')}Z`,
        {
          fill: small ? 'var(--kumkum)' : ZONE_FILL[id],
          opacity: small ? 0.85 : 0.8,
          stroke: 'none',
          'data-zone': id,
        },
        layer
      );
    }
    map.appendChild(layer);
    if (!small)
      for (const id of o.zones) {
        const [x, y] = project(...ZONES[id].label);
        map.appendChild(haloText(x, y, t(ZONES[id].name), scale, 'middle'));
      }
  }

  for (const id of o.rivers ?? []) {
    const d = RIVER_PATHS[id];
    if (!d) throw new Error(`No river path for ${id}`);
    line(d, { fill: 'none', stroke: RIVER, 'stroke-width': small ? 1 : 2, 'data-river': id });
  }

  for (const p of o.places ?? []) {
    const [x, y] = project(p.lat, p.lon);
    map.appendChild(
      figCircle(x, y, 4 / scale, { fill: 'var(--ink)', stroke: '#fff', sw: 1.2 / scale })
    );
    const dx = (p.left ? -7 : 7) / scale;
    map.appendChild(haloText(x + dx, y, p.label, scale, p.left ? 'end' : 'start'));
  }
  return map;
}

function haloText(x: number, y: number, s: string, scale: number, anchor: string): SVGTextElement {
  const text = figText(x, y, s, { size: 15 / scale, anchor, weight: 700 });
  text.setAttribute('paint-order', 'stroke');
  text.setAttribute('stroke', '#fff');
  text.setAttribute('stroke-width', String(3 / scale));
  return text;
}

/** City dots for `places`, named in the current language; ids in `left` are labelled on the left. */
export function mapPlaces(ids: readonly PlaceId[], left: readonly PlaceId[] = []): MapPlace[] {
  return ids.map((id) => ({
    lat: PLACES[id].lat,
    lon: PLACES[id].lon,
    label: t(PLACES[id].name),
    left: left.includes(id),
  }));
}

/** A crop of the map around a latitude and longitude range. */
export function mapCrop(north: number, west: number, south: number, east: number): Box {
  const [minX, minY] = project(north, west);
  const [maxX, maxY] = project(south, east);
  return { minX, minY, maxX, maxY };
}

export function renderIndiaMap(o: IndiaMapOptions = {}): SVGSVGElement {
  const shown = o.shown ?? REGIONS.length;
  const found = o.found ?? [];
  const label = [
    shown ? t('states.map', { states: STATE_COUNT, uts: UT_COUNT }) : t('states.empty'),
    o.chosen ? t(`states.n.${o.chosen}`) : '',
    ...found.map((id) => t(`states.n.${id}`)),
    ...(o.zones ?? []).map((id) => t(ZONES[id].name)),
    ...(o.places ?? []).map((p) => p.label),
    o.caption ?? '',
  ]
    .filter(Boolean)
    .join(', ');

  const crop = o.crop ?? { minX: 0, minY: 0, maxX: MAP_W, maxY: MAP_H };
  const scale = MAP_W / (crop.maxX - crop.minX);
  const mapH = (crop.maxY - crop.minY) * scale;
  const footY = mapH + 14;
  const notes = o.zones?.length ? 2 : 1;
  const s = figSvg(MAP_W, footY + 14 + notes * 26 + (o.caption ? 36 : 0), label);
  s.appendChild(figRect(0, 0, MAP_W, mapH, { fill: '#EEF4F7', stroke: 'none', rx: 8 }));
  s.appendChild(drawMap(o, crop, scale, false));

  s.appendChild(figRect(8, footY, 18, 18, { fill: STATE, rx: 3 }));
  s.appendChild(figText(32, footY + 9, t('states.state'), { size: 17, anchor: 'start' }));
  s.appendChild(figRect(150, footY, 18, 18, { fill: UT, rx: 3 }));
  s.appendChild(figText(174, footY + 9, t('states.ut'), { size: 17, anchor: 'start' }));
  const note = (i: number, text: string) =>
    s.appendChild(
      figText(8, footY + 36 + i * 24, text, {
        size: 15,
        anchor: 'start',
        color: 'var(--ink-soft)',
        weight: 500,
      })
    );
  note(0, t('states.source'));
  if (o.zones?.length) note(1, t('map.approx'));
  if (o.caption) {
    s.appendChild(
      figText(MAP_W / 2, footY + 32 + notes * 26, o.caption, { size: 20, weight: 700 })
    );
  }
  return s;
}

/** A small locator map to set inside another drawing: where on India the drawing is. */
export function renderIndiaInset(
  o: Pick<IndiaMapOptions, 'zones' | 'found' | 'rivers'>,
  x: number,
  y: number,
  width: number
): SVGGElement {
  const scale = width / MAP_W;
  const g = svg('g', {
    transform: `translate(${x} ${y})`,
    'data-inset': 'india',
    'aria-hidden': 'true',
  });
  g.appendChild(
    figRect(-3, -3, width + 6, MAP_H * scale + 6, {
      fill: '#F7F9FA',
      stroke: 'var(--ink-soft)',
      rx: 4,
      sw: 0.8,
    })
  );
  g.appendChild(drawMap(o, { minX: 0, minY: 0, maxX: MAP_W, maxY: MAP_H }, scale, true));
  return g;
}
