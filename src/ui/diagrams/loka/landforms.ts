/**
 * E3 drawings: a cross-section from the hills to the sea that rises into a mountain, a plateau and a
 * plain, and one landform built from a height and a top.
 */

import {
  MAIN_LANDFORMS,
  landformOf,
  type LandHeight,
  type LandTop,
  type Landform,
} from '../../../domain/world/landforms';
import { t } from '../../../domain/i18n/core';
import { figPath, figRect, figSvg, figText } from '../fig';
import { house } from './parts';

const ROCK = '#B89B72';
const GREEN = '#A8B86A';
const WATER = '#7DB9D8';
const SEA_Y = 160;

const LABEL_X: Record<Landform, number> = { mountain: 70, plateau: 185, plain: 275, hill: 0 };

export interface SectionOptions {
  /** 0 is flat land at sea level; 1 is fully raised. */
  rise: number;
  highlight?: Landform | null;
}

/** Mountain, plateau and plain side by side, with the sea at the right. */
export function renderSection(o: SectionOptions): SVGSVGElement {
  const r = Math.max(0, Math.min(1, o.rise));
  const s = figSvg(
    360,
    200,
    r > 0 ? MAIN_LANDFORMS.map((f) => t(`landforms.n.${f}`)).join(', ') : t('landforms.flat')
  );
  s.appendChild(figRect(0, 0, 360, 200, { fill: 'var(--teal-soft)', stroke: 'none', rx: 12 }));
  s.appendChild(figRect(320, SEA_Y, 40, 40, { fill: WATER, stroke: 'none', rx: 0 }));
  const m = SEA_Y - 120 * r;
  const p = SEA_Y - 70 * r;
  const shapes: Record<'mountain' | 'plateau' | 'plain', string> = {
    mountain: `M0 ${SEA_Y + 40} L0 ${SEA_Y - 10 * r} L70 ${m} L126 ${SEA_Y - 14 * r} L126 ${SEA_Y + 40} Z`,
    plateau: `M126 ${SEA_Y + 40} L126 ${SEA_Y - 14 * r} L150 ${p} L222 ${p - 4 * r} L244 ${SEA_Y - 8 * r} L244 ${SEA_Y + 40} Z`,
    plain: `M244 ${SEA_Y + 40} L244 ${SEA_Y - 8 * r} L320 ${SEA_Y - 6 * r} L320 ${SEA_Y + 40} Z`,
  };
  s.appendChild(figPath(shapes.mountain, { fill: ROCK, stroke: 'var(--ink-soft)', sw: 1 }));
  s.appendChild(figPath(shapes.plateau, { fill: ROCK, stroke: 'var(--ink-soft)', sw: 1 }));
  s.appendChild(figPath(shapes.plain, { fill: GREEN, stroke: 'var(--ink-soft)', sw: 1 }));
  if (r > 0.8) {
    s.appendChild(
      figPath(`M58 ${m + 18} L70 ${m} L84 ${m + 20} L76 ${m + 16} L68 ${m + 22} Z`, {
        fill: 'var(--paper-raised)',
        stroke: 'none',
      })
    );
  }
  if (r > 0.5) {
    s.appendChild(house(262, SEA_Y - 6 * r - 14, 0.8));
    s.appendChild(house(290, SEA_Y - 6 * r - 14, 0.8));
  }
  if (o.highlight && o.highlight !== 'hill') {
    s.appendChild(figPath(shapes[o.highlight], { fill: 'none', stroke: 'var(--kumkum)', sw: 3 }));
  }
  if (r > 0) {
    for (const f of MAIN_LANDFORMS) {
      s.appendChild(figText(LABEL_X[f], 186, t(`landforms.n.${f}`), { size: 13, weight: 700 }));
    }
  }
  return s;
}

export interface ShapeOptions {
  /** Drawn under the shape instead of its name. */
  caption?: string;
  /** Read aloud instead of the caption; nothing is drawn. SVG text does not wrap, so long lines go here. */
  label?: string;
}

/** One landform from a height and a top, captioned with its name unless told otherwise. */
export function renderShape(height: LandHeight, top: LandTop, o: ShapeOptions = {}): SVGSVGElement {
  const text = o.caption ?? t(`landforms.n.${landformOf(height, top)}`);
  const s = figSvg(360, 190, o.label ?? text);
  s.appendChild(figRect(0, 0, 360, 190, { fill: 'var(--teal-soft)', stroke: 'none', rx: 12 }));
  s.appendChild(figRect(0, 150, 360, 40, { fill: GREEN, stroke: 'none', rx: 0 }));
  const h = height === 'high' ? 110 : 34;
  const d =
    top === 'flat'
      ? `M60 150 L${height === 'high' ? 96 : 84} ${150 - h} L${height === 'high' ? 264 : 276} ${150 - h} L300 150 Z`
      : `M90 150 L180 ${150 - h} L270 150 Z`;
  s.appendChild(
    figPath(d, { fill: height === 'high' ? ROCK : GREEN, stroke: 'var(--ink-soft)', sw: 1.5 })
  );
  if (o.label === undefined) s.appendChild(figText(180, 172, text, { size: 15, weight: 700 }));
  return s;
}
