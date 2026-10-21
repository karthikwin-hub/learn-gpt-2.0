/**
 * E2 drawings: the Earth from space, its surface as 100 squares, the four domains meeting, and all the
 * Earth's water as a jug of 100 drops.
 */

import {
  SURFACE_LAND_PARTS,
  SURFACE_PARTS,
  WATER_DROPS,
  WATER_STORES,
  dropsLeft,
  type Sphere,
  type WaterStore,
} from '../../../domain/world/spheres';
import { t } from '../../../domain/i18n/core';
import { svg } from '../../util/dom';
import { figCircle, figPath, figRect, figSvg, figText } from '../fig';

const WATER = '#7DB9D8';
const LAND = '#A8B86A';
const ROCK = '#B89B72';

/** Squares (row * 10 + column) that are land: rough continents, with Antarctica along the bottom. */
const LAND_CELLS = new Set([
  2, 3, 11, 12, 13, 17, 21, 22, 26, 27, 28, 32, 37, 38, 42, 43, 47, 53, 56, 63, 64, 74, 78, 79, 88,
  89, 91, 92, 93,
]);
if (LAND_CELLS.size !== SURFACE_LAND_PARTS) throw new Error('LAND_CELLS must match the land parts');

function haloText(x: number, y: number, s: string, size = 12): SVGTextElement {
  const el = figText(x, y, s, { size, weight: 700 });
  el.setAttribute('stroke', 'var(--paper)');
  el.setAttribute('stroke-width', '3');
  el.setAttribute('paint-order', 'stroke');
  return el;
}

/** The Earth seen from space. */
export function renderGlobe(): SVGSVGElement {
  const s = figSvg(360, 200, t('domains.globe'));
  s.appendChild(figCircle(180, 100, 94, { fill: 'var(--teal-soft)' }));
  s.appendChild(figCircle(180, 100, 86, { fill: WATER, stroke: 'var(--ink-soft)', sw: 1 }));
  for (const d of [
    'M128 52 Q150 36 170 50 Q176 72 156 84 Q140 96 132 80 Q118 66 128 52 Z',
    'M196 70 Q226 60 240 82 Q236 110 214 120 Q200 106 204 92 Q190 84 196 70 Z',
    'M150 120 Q166 116 170 134 Q160 158 146 150 Q138 134 150 120 Z',
  ]) {
    s.appendChild(figPath(d, { fill: LAND, stroke: 'var(--ink-soft)', sw: 1 }));
  }
  return s;
}

/** The surface as 10 x 10 squares; the first `filled` (in reading order) are coloured in. */
export function renderSurface(filled: number): SVGSVGElement {
  let water = 0;
  let land = 0;
  for (let i = 0; i < filled; i++) {
    if (LAND_CELLS.has(i)) land++;
    else water++;
  }
  const s = figSvg(
    360,
    252,
    filled ? t('domains.surfaceCount', { water, land }) : t('domains.surfaceArt')
  );
  const x0 = 80;
  for (let i = 0; i < SURFACE_PARTS; i++) {
    const x = x0 + (i % 10) * 20;
    const y = 6 + Math.floor(i / 10) * 20;
    const fill = i >= filled ? 'var(--paper-sunk)' : LAND_CELLS.has(i) ? LAND : WATER;
    s.appendChild(figRect(x, y, 18, 18, { fill, stroke: 'var(--hair)', sw: 1, rx: 2 }));
  }
  s.appendChild(figRect(60, 220, 16, 16, { fill: WATER, stroke: 'none', rx: 2 }));
  s.appendChild(
    figText(82, 229, t('domains.waterParts', { n: water }), { size: 13, anchor: 'start' })
  );
  s.appendChild(figRect(200, 220, 16, 16, { fill: LAND, stroke: 'none', rx: 2 }));
  s.appendChild(
    figText(222, 229, t('domains.landParts', { n: land }), { size: 13, anchor: 'start' })
  );
  return s;
}

const SPHERE_LABEL: Record<Sphere, [number, number]> = {
  atmo: [270, 20],
  litho: [74, 212],
  hydro: [290, 214],
  bio: [150, 130],
};

/** Land, water, air and life meeting in one scene; `highlight` rings one domain. */
export function renderSpheres(highlight?: Sphere | null): SVGSVGElement {
  const s = figSvg(
    360,
    230,
    (['litho', 'hydro', 'atmo', 'bio'] as const).map((d) => t(`domains.n.${d}`)).join(', ')
  );
  s.appendChild(figRect(0, 0, 360, 230, { fill: 'var(--teal-soft)', stroke: 'none', rx: 12 }));
  for (const y of [34, 50]) {
    s.appendChild(
      figPath(`M200 ${y} q14 -8 28 0 t28 0 t28 0`, { stroke: 'var(--paper-raised)', sw: 2.5 })
    );
  }
  for (const [x, y, r] of [
    [120, 30, 4],
    [134, 22, 3],
    [146, 34, 5],
  ] as const) {
    s.appendChild(figCircle(x, y, r, { stroke: 'var(--paper-raised)', sw: 1.5 }));
  }
  const landPath = 'M0 230 L0 120 L40 110 L90 60 L130 108 L210 122 L230 230 Z';
  s.appendChild(figPath(landPath, { fill: ROCK, stroke: 'var(--ink-soft)', sw: 1 }));
  s.appendChild(figPath('M0 150 L210 150 L214 170 L0 170 Z', { fill: '#8A6A4A', stroke: 'none' }));
  s.appendChild(
    figPath('M200 124 Q260 116 360 120 L360 230 L226 230 Z', { fill: WATER, stroke: 'none' })
  );
  s.appendChild(
    figPath('M92 66 Q104 92 140 100 Q180 108 206 124', { stroke: WATER, sw: 4, fill: 'none' })
  );
  s.appendChild(figRect(146, 96, 6, 20, { fill: '#7A5A3A', stroke: 'none', rx: 1 }));
  s.appendChild(figCircle(149, 90, 13, { fill: 'var(--leaf)' }));
  s.appendChild(
    figPath('M276 176 Q290 166 304 176 Q290 186 276 176 Z M304 176 L312 170 L312 182 Z', {
      fill: 'var(--thread)',
      stroke: 'var(--ink-soft)',
      sw: 1,
    })
  );
  if (highlight) {
    const ring = { stroke: 'var(--kumkum)', sw: 3 };
    if (highlight === 'atmo') s.appendChild(figRect(4, 4, 352, 70, { ...ring, rx: 10 }));
    if (highlight === 'litho') s.appendChild(figPath(landPath, { ...ring, fill: 'none' }));
    if (highlight === 'hydro') {
      s.appendChild(
        figPath('M200 124 Q260 116 360 120 L360 230 L226 230 Z', { ...ring, fill: 'none' })
      );
    }
    if (highlight === 'bio') {
      s.appendChild(figCircle(149, 98, 24, ring));
      s.appendChild(figCircle(294, 176, 22, ring));
    }
  }
  for (const d of ['atmo', 'litho', 'hydro', 'bio'] as const) {
    const [x, y] = SPHERE_LABEL[d];
    s.appendChild(haloText(x, y, t(`domains.n.${d}`)));
  }
  return s;
}

const DROP_FILL: Record<WaterStore, string> = {
  salt: '#5B7FBF',
  ice: 'var(--paper-raised)',
  fresh: 'var(--teal)',
};

export interface JugOptions {
  poured: readonly WaterStore[];
  highlight?: WaterStore | null;
}

/** All the Earth's water as 100 drops; poured-out stores leave the jug and the rest settle. */
export function renderJug(o: JugOptions): SVGSVGElement {
  const s = figSvg(360, 270, t('domains.jugLeft', { n: dropsLeft(o.poured) }));
  s.appendChild(
    figPath('M96 26 L264 26 L258 194 Q256 204 246 204 L114 204 Q104 204 102 194 Z', {
      fill: 'var(--paper-raised)',
      stroke: 'var(--ink-soft)',
      sw: 2,
    })
  );
  s.appendChild(
    figPath('M264 50 Q300 60 290 110 Q284 140 260 150', { stroke: 'var(--ink-soft)', sw: 3 })
  );
  const kept = (['fresh', 'ice', 'salt'] as const).filter((k) => !o.poured.includes(k));
  let k = 0;
  const g = svg('g') as SVGGElement;
  for (const store of kept) {
    for (let i = 0; i < WATER_DROPS[store]; i++, k++) {
      const cx = 118 + (k % 10) * 14;
      const cy = 192 - Math.floor(k / 10) * 16;
      g.appendChild(
        figPath(
          `M${cx} ${cy - 7} Q${cx + 6} ${cy} ${cx} ${cy + 5} Q${cx - 6} ${cy} ${cx} ${cy - 7} Z`,
          {
            fill: DROP_FILL[store],
            stroke: 'var(--ink-soft)',
            sw: 0.8,
          }
        )
      );
      if (store === o.highlight)
        g.appendChild(figCircle(cx, cy, 9, { stroke: 'var(--kumkum)', sw: 2.5 }));
    }
  }
  s.appendChild(g);
  WATER_STORES.forEach((store, i) => {
    const y = 222 + i * 18;
    const out = o.poured.includes(store);
    s.appendChild(
      figRect(70, y - 6, 12, 12, {
        fill: DROP_FILL[store],
        stroke: 'var(--ink-soft)',
        rx: 6,
        opacity: out ? 0.4 : 1,
      })
    );
    s.appendChild(
      figText(90, y, t(`domains.jug.${store}`, { n: WATER_DROPS[store] }), {
        size: 13,
        anchor: 'start',
        weight: out ? 400 : 600,
        color: out ? 'var(--ink-soft)' : 'var(--ink)',
      })
    );
  });
  return s;
}
