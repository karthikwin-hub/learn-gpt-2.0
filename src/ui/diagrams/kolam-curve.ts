/**
 * Visual SVG diagram for the Opening kolam animation and quiet marks.
 */

import { dots, mirrorCurve, softenBorder, toPath } from '../../domain/math/kolam';
import { svg, reducedMotion } from '../util/dom';

export interface KolamLineOptions {
  m?: number;
  n?: number;
  animate?: number;
  label?: string;
  onDone?: () => void;
}

export function drawStroke(
  path: SVGPathElement,
  duration: number,
  delay = 0,
  onComplete?: () => void
): void {
  const len = path.getTotalLength ? path.getTotalLength() : 800;
  path.style.strokeDasharray = String(len);
  path.style.strokeDashoffset = String(len);
  path.getBoundingClientRect();
  path.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`;
  path.style.strokeDashoffset = '0';
  if (onComplete) {
    setTimeout(onComplete, duration + delay);
  }
}

export function renderKolamLine(opts: KolamLineOptions): SVGSVGElement {
  const m = opts.m || 3;
  const n = opts.n || 4;
  const unit = 22;
  const pad = 22;
  const w = 2 * m * unit + 2 * pad;
  const h = 2 * n * unit + 2 * pad;

  const root = svg('svg', {
    viewBox: `0 0 ${w} ${h}`,
    role: 'img',
    'aria-label': opts.label || '',
  });

  const g = svg('g', { transform: `translate(${pad},${pad})` });
  root.appendChild(g);

  const dotNodes = dots(m, n).map((d) => {
    const c = svg('circle', {
      class: 'kolam-dot',
      cx: d.x * unit,
      cy: d.y * unit,
      r: 3.6,
    });
    g.appendChild(c);
    return c;
  });

  const pts = softenBorder(mirrorCurve(m, n), m, n, 0.45);
  const path = svg('path', {
    class: 'kolam-line',
    d: toPath(pts, unit, 0),
  });
  g.appendChild(path);

  if (opts.animate && !reducedMotion()) {
    dotNodes.forEach((c, i) => {
      c.style.opacity = '0';
      c.style.transition = `opacity 300ms ease ${i * 45}ms`;
    });

    requestAnimationFrame(() => {
      dotNodes.forEach((c) => {
        c.style.opacity = '1';
      });
      drawStroke(path, opts.animate!, dotNodes.length * 45 + 200, opts.onDone);
    });
  } else if (opts.onDone) {
    setTimeout(opts.onDone, 0);
  }

  return root;
}
