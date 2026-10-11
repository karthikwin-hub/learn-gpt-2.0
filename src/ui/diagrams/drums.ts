/**
 * Beat diagram generator for M5 Bodha concept cards.
 */

import { figCircle, figRect, figSvg, figText } from './fig';

const IND = 'var(--indigo)';
const TEAL = 'var(--teal)';
const THREAD = 'var(--thread)';

export function renderM5Beats(a: number, b: number, n: number, step: number): SVGSVGElement {
  const s = figSvg(360, 120, `${a}, ${b}`);
  const dx = 320 / n;

  for (let i = 1; i <= n; i++) {
    const x = 24 + (i - 1) * dx;
    s.appendChild(figText(x, 104, i, { size: 9, weight: 400, color: 'var(--ink-soft)' }));

    const hitA = i % a === 0 && step >= 1;
    const hitB = i % b === 0 && step >= 2;

    s.appendChild(figCircle(x, 36, hitA ? 6 : 2, { fill: hitA ? IND : 'var(--ghost)' }));
    s.appendChild(figCircle(x, 70, hitB ? 6 : 2, { fill: hitB ? TEAL : 'var(--ghost)' }));

    if (step >= 3 && i % a === 0 && i % b === 0) {
      s.appendChild(
        figRect(x - 11, 22, 22, 62, {
          stroke: THREAD,
          sw: 2.5,
          rx: 11,
          fill: 'none',
        })
      );
    }
  }

  return s;
}
