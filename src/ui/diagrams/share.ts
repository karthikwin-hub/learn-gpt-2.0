/**
 * Plates and fair share diagram generator for D1 & D3 Bodha concept cards.
 */

import { figCircle, figLine, figPath, figSvg, figText } from './fig';

const THREAD = 'var(--thread)';
const LEAF = 'var(--leaf)';

export interface FairSharePlateOptions {
  half?: boolean;
  cutLeft?: boolean;
  eq?: string | null;
}

export function renderFairSharePlates(
  n: number,
  each: number,
  left: number,
  opts: FairSharePlateOptions = {}
): SVGSVGElement {
  const s = figSvg(360, 150, `${n} × ${each}`);
  const gap = 320 / n;

  for (let i = 0; i < n; i++) {
    const cx = 20 + gap * (i + 0.5);
    s.appendChild(
      figCircle(cx, 56, Math.min(34, gap / 2 - 4), {
        fill: 'var(--paper-raised)',
        stroke: 'var(--ink-soft)',
        sw: 1.5,
      })
    );

    for (let j = 0; j < each; j++) {
      s.appendChild(
        figCircle(cx - 12 + (j % 3) * 12, 46 + Math.floor(j / 3) * 13, 5, {
          fill: THREAD,
        })
      );
    }

    if (opts.half) {
      s.appendChild(
        figPath(`M${cx - 5} 76 A 5 5 0 0 1 ${cx + 5} 76 Z`, {
          fill: THREAD,
          stroke: 'none',
        })
      );
    }
  }

  for (let r = 0; r < left; r++) {
    s.appendChild(
      figCircle(150 + r * 16, 122, 6, {
        fill: opts.cutLeft ? 'none' : THREAD,
        stroke: THREAD,
        sw: 2,
      })
    );
  }

  if (left > 0 && opts.cutLeft) {
    for (let c = 0; c < left; c++) {
      s.appendChild(
        figLine(150 + c * 16, 115, 150 + c * 16, 129, {
          stroke: 'var(--ink)',
          sw: 1.5,
        })
      );
    }
  }

  if (opts.eq) {
    s.appendChild(figText(180, 138, opts.eq, { color: LEAF, size: 15 }));
  }

  return s;
}
