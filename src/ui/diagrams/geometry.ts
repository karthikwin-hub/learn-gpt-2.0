/**
 * Bodha diagram generators for geometry knots G2 (Rope & Pegs) and G4 (Kolam Flower Petals).
 */

import { t } from '../../domain/i18n/core';
import { figCircle, figLine, figPath, figRect, figSvg, figText } from './fig';

const THREAD = 'var(--thread)';
const IND = 'var(--indigo)';
const TEAL = 'var(--teal)';
const LEAF = 'var(--leaf)';

/**
 * Renders one or more rope rectangles comparing dimensions and areas.
 */
export function renderG2Ropes(list: [number, number][], showArea: boolean): SVGSVGElement {
  const sumW = list.reduce((a, r) => a + r[0], 0);
  const maxH = Math.max(...list.map((r) => r[1]));
  const k = Math.min(24, (320 - 30 * (list.length - 1)) / sumW, 100 / maxH);
  const hTotal = 30 + maxH * k + 44;
  const s = figSvg(360, hTotal, list.map((r) => `${r[0]} × ${r[1]}`).join(', '));

  let x = (360 - sumW * k - 30 * (list.length - 1)) / 2;
  list.forEach((r) => {
    const rw = r[0] * k;
    const rh = r[1] * k;
    s.appendChild(
      figRect(x, 30, rw, rh, {
        fill: showArea ? 'var(--leaf-soft)' : 'none',
        stroke: THREAD,
        sw: 4,
        rx: 2,
      })
    );
    s.appendChild(figText(x + rw / 2, 16, `${r[0]} m`, { color: IND, size: 12 }));
    s.appendChild(figText(x + rw / 2, 30 + rh + 16, `${r[1]} m`, { color: TEAL, size: 12 }));
    if (showArea) {
      s.appendChild(
        figText(x + rw / 2, 30 + rh / 2, r[0] * r[1], {
          color: LEAF,
          size: r[1] < 2 ? 0 : 18,
        })
      );
      if (r[1] < 2) {
        s.appendChild(
          figText(x + rw / 2, 30 + rh + 34, `${r[0] * r[1]} m²`, {
            color: LEAF,
            size: 14,
          })
        );
      }
    }
    x += rw + 30;
  });

  return s;
}

function petal(cx: number, cy: number, angle: number, mirrorable: boolean): SVGPathElement {
  const d = mirrorable
    ? 'M0 0 C 10 -18, 30 -18, 40 0 C 30 18, 10 18, 0 0'
    : 'M0 0 C 14 -22, 34 -16, 40 0 C 26 4, 12 10, 0 0';
  const p = figPath(d, {
    fill: 'var(--leaf-soft)',
    stroke: LEAF,
    sw: 1.4,
  });
  p.setAttribute('transform', `translate(${cx} ${cy}) rotate(${angle}) scale(1.6)`);
  return p;
}

/**
 * Renders flower petals illustrating 4-fold rotational vs bilateral mirror symmetry.
 */
export function renderG4Flower(
  mirrorable: boolean,
  showMirror: boolean,
  showTurn: boolean
): SVGSVGElement {
  const s = figSvg(360, 180, mirrorable ? t('kolam.mirror') : t('kolam.turn'));
  const cx = 180;
  const cy = 90;

  [0, 90, 180, 270].forEach((a) => {
    s.appendChild(petal(cx, cy, a, mirrorable));
  });

  s.appendChild(figCircle(cx, cy, 4, { fill: 'var(--ink)' }));

  if (showMirror) {
    s.appendChild(
      figLine(cx - 70, cy, cx + 70, cy, {
        stroke: IND,
        sw: 2,
        dash: '6 5',
      })
    );
    s.appendChild(
      figLine(cx, cy - 70, cx, cy + 70, {
        stroke: IND,
        sw: 2,
        dash: '6 5',
      })
    );
  }

  if (showTurn) {
    s.appendChild(
      figPath(`M${cx + 60} ${cy - 28} A 66 66 0 0 1 ${cx + 28} ${cy + 60}`, {
        stroke: TEAL,
        sw: 2.5,
        fill: 'none',
      })
    );
    s.appendChild(figText(cx + 76, cy + 46, '90°', { color: TEAL }));
  }

  return s;
}
