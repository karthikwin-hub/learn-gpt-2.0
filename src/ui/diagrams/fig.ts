/**
 * SVG diagram primitives for Bodha concept cards.
 */

import { svg as createSvg } from '../util/dom';
import { plainText } from '../util/markup';

export interface TextOptions {
  anchor?: string;
  size?: number;
  weight?: number;
  color?: string;
}

export interface RectOptions {
  rx?: number;
  fill?: string;
  stroke?: string;
  sw?: number;
  dash?: string;
  opacity?: number;
}

export interface LineOptions {
  stroke?: string;
  sw?: number;
  dash?: string;
}

export interface CircleOptions {
  fill?: string;
  stroke?: string;
  sw?: number;
  opacity?: number;
}

export interface PathOptions {
  fill?: string;
  stroke?: string;
  sw?: number;
  dash?: string;
  opacity?: number;
}

export function figSvg(w: number, h: number, label?: string): SVGSVGElement {
  return createSvg('svg', {
    viewBox: `0 0 ${w} ${h}`,
    role: 'img',
    'aria-label': plainText(label || ''),
  }) as SVGSVGElement;
}

export function figText(
  x: number,
  y: number,
  s: string | number,
  o: TextOptions = {}
): SVGTextElement {
  return createSvg('text', {
    x,
    y,
    'text-anchor': o.anchor || 'middle',
    'dominant-baseline': 'middle',
    'font-size': o.size || 14,
    'font-weight': o.weight || 600,
    fill: o.color || 'var(--ink)',
    'font-family': 'var(--font)',
    text: String(s),
  }) as SVGTextElement;
}

export function figRect(
  x: number,
  y: number,
  w: number,
  h: number,
  o: RectOptions = {}
): SVGRectElement {
  return createSvg('rect', {
    x,
    y,
    width: w,
    height: h,
    rx: o.rx === undefined ? 3 : o.rx,
    fill: o.fill || 'none',
    stroke: o.stroke || 'var(--ink-soft)',
    'stroke-width': o.sw || 1.2,
    ...(o.dash ? { 'stroke-dasharray': o.dash } : {}),
    ...(o.opacity !== undefined ? { opacity: o.opacity } : {}),
  }) as SVGRectElement;
}

export function figLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  o: LineOptions = {}
): SVGLineElement {
  return createSvg('line', {
    x1,
    y1,
    x2,
    y2,
    stroke: o.stroke || 'var(--ink)',
    'stroke-width': o.sw || 2,
    'stroke-linecap': 'round',
    ...(o.dash ? { 'stroke-dasharray': o.dash } : {}),
  }) as SVGLineElement;
}

export function figCircle(
  cx: number,
  cy: number,
  r: number,
  o: CircleOptions = {}
): SVGCircleElement {
  return createSvg('circle', {
    cx,
    cy,
    r,
    fill: o.fill || 'none',
    stroke: o.stroke || 'none',
    'stroke-width': o.sw || 1.5,
    ...(o.opacity !== undefined ? { opacity: o.opacity } : {}),
  }) as SVGCircleElement;
}

export function figPath(d: string, o: PathOptions = {}): SVGPathElement {
  return createSvg('path', {
    d,
    fill: o.fill || 'none',
    stroke: o.stroke || 'var(--ink)',
    'stroke-width': o.sw || 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    ...(o.dash ? { 'stroke-dasharray': o.dash } : {}),
    ...(o.opacity !== undefined ? { opacity: o.opacity } : {}),
  }) as SVGPathElement;
}

export function figGrid(
  x: number,
  y: number,
  cols: number,
  rows: number,
  cell: number,
  fill?: (c: number, r: number) => string | null
): SVGGElement {
  const g = createSvg('g') as SVGGElement;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      g.appendChild(
        figRect(x + c * cell + 1, y + r * cell + 1, cell - 2, cell - 2, {
          fill: (fill && fill(c, r)) || 'var(--paper-sunk)',
          stroke: 'none',
          rx: 2,
        })
      );
    }
  }
  return g;
}
