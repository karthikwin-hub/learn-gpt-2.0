/**
 * Tile and Area diagram visual builders for M2 and M4 Bodha cards.
 */

import { figGrid, figLine, figRect, figSvg, figText } from './fig';

const IND = 'var(--indigo)';
const TEAL = 'var(--teal)';
const LEAF = 'var(--leaf)';
const THREAD = 'var(--thread)';

/**
 * M2: Multiplication is area tile grid.
 */
export function renderM2Tiles(
  cols: number,
  rows: number,
  filledRows: number,
  totals = false
): SVGSVGElement {
  const cell = Math.min(34, 240 / cols);
  const s = figSvg(360, rows * cell + 50, `${cols} × ${rows}`);
  const x0 = (300 - cols * cell) / 2;
  const y0 = 30;

  s.appendChild(
    figGrid(x0, y0, cols, rows, cell, (_c, r) => (r < filledRows ? 'var(--leaf-soft)' : null))
  );

  s.appendChild(figText(x0 + (cols * cell) / 2, 14, cols, { color: IND, size: 16 }));
  s.appendChild(figText(x0 - 14, y0 + (rows * cell) / 2, rows, { color: TEAL, size: 16 }));

  if (totals) {
    for (let r = 0; r < filledRows; r++) {
      s.appendChild(
        figText(x0 + cols * cell + 26, y0 + r * cell + cell / 2, cols * (r + 1), {
          color: LEAF,
          size: 14,
        })
      );
    }
  }

  return s;
}

/**
 * M4: Cut the rectangle four rooms diagram.
 */
export function renderM4Rooms(a: number, b: number, step: number, label = ''): SVGSVGElement {
  const k = Math.min(9, 260 / a, 150 / b);
  const ta = Math.floor(a / 10) * 10;
  const tb = Math.floor(b / 10) * 10;
  const x0 = 40;
  const y0 = 26;
  const s = figSvg(360, b * k + 70, label);

  interface RoomPart {
    x: number;
    y: number;
    w: number;
    h: number;
  }
  const parts: RoomPart[] = [
    { x: 0, y: 0, w: ta, h: tb },
    { x: ta, y: 0, w: a - ta, h: tb },
    { x: 0, y: tb, w: ta, h: b - tb },
    { x: ta, y: tb, w: a - ta, h: b - tb },
  ];
  const fills = [
    'var(--leaf-soft)',
    'var(--indigo-soft)',
    'var(--teal-soft)',
    'var(--thread-soft)',
  ];

  parts.forEach((p, i) => {
    s.appendChild(
      figRect(x0 + p.x * k, y0 + p.y * k, p.w * k, p.h * k, {
        fill: step >= 1 ? (fills[i] ?? 'var(--leaf-soft)') : 'var(--paper-sunk)',
        stroke: 'var(--ink-soft)',
        rx: 0,
      })
    );
    if (step >= 2) {
      const n = p.w * p.h;
      let cx = x0 + (p.x + p.w / 2) * k;
      const cy = y0 + (p.y + p.h / 2) * k;
      if (p.w < 5) cx = x0 + a * k + 22;
      s.appendChild(figText(cx, cy, n, { size: p.w < 5 || p.h < 5 ? 12 : 16 }));
    }
  });

  if (step >= 1) {
    s.appendChild(
      figLine(x0 + ta * k, y0 - 6, x0 + ta * k, y0 + b * k + 6, {
        stroke: THREAD,
        sw: 3,
      })
    );
    s.appendChild(
      figLine(x0 - 6, y0 + tb * k, x0 + a * k + 6, y0 + tb * k, {
        stroke: THREAD,
        sw: 3,
      })
    );
    s.appendChild(figText(x0 + (ta * k) / 2, 12, ta, { color: IND }));
    s.appendChild(figText(x0 + (ta + (a - ta) / 2) * k, 12, a - ta, { color: IND }));
    s.appendChild(figText(x0 - 16, y0 + (tb * k) / 2, tb, { color: TEAL }));
    s.appendChild(figText(x0 - 16, y0 + (tb + (b - tb) / 2) * k, b - tb, { color: TEAL }));
  } else {
    s.appendChild(figText(x0 + (a * k) / 2, 12, a, { color: IND }));
    s.appendChild(figText(x0 - 16, y0 + (b * k) / 2, b, { color: TEAL }));
  }

  if (step >= 3) {
    const vals = parts.map((p) => p.w * p.h);
    s.appendChild(
      figText(180, y0 + b * k + 30, `${vals.join(' + ')} = ${a * b}`, {
        color: LEAF,
        size: 16,
      })
    );
  }

  return s;
}

/**
 * 23 × 14 as four rooms; the two the working forgot (20 × 4 and 3 × 10) are highlighted in kumkum.
 */
export function renderM4MistakeRooms(reveal: boolean): SVGSVGElement {
  const k = 7;
  const X = 30;
  const Y = 14;
  const svg = figSvg(220, 130, 'Mistake rooms');
  const parts = [
    { x: 0, y: 0, w: 20, h: 10, n: 200, kept: true },
    { x: 20, y: 0, w: 3, h: 10, n: 30, kept: false },
    { x: 0, y: 10, w: 20, h: 4, n: 80, kept: false },
    { x: 20, y: 10, w: 3, h: 4, n: 12, kept: true },
  ];

  parts.forEach((p) => {
    const miss = !p.kept && reveal;
    svg.appendChild(
      figRect(X + p.x * k, Y + p.y * k, p.w * k, p.h * k, {
        fill: p.kept ? 'var(--leaf-soft)' : 'var(--paper-sunk)',
        stroke: miss ? 'var(--kumkum)' : 'var(--ink-soft)',
        sw: miss ? 2.5 : 1,
        dash: miss ? '5 3' : undefined,
      })
    );

    let textX = X + (p.x + p.w / 2) * k;
    const textY = Y + (p.y + p.h / 2) * k;
    const isNarrow = p.w < 5;
    if (isNarrow) {
      textX = X + 23 * k + 14;
    }

    svg.appendChild(
      figText(textX, textY, p.n, {
        anchor: isNarrow ? 'start' : 'middle',
        size: isNarrow ? 11 : 14,
        weight: 600,
        color: miss ? 'var(--kumkum)' : 'var(--ink)',
      })
    );
  });

  svg.appendChild(figText(X + 10 * k, Y - 5, '20', { color: 'var(--indigo)', size: 11 }));
  svg.appendChild(figText(X + 21.5 * k, Y - 5, '3', { color: 'var(--indigo)', size: 11 }));
  svg.appendChild(
    figText(X - 6, Y + 5 * k, '10', { anchor: 'end', color: 'var(--teal)', size: 11 })
  );
  svg.appendChild(
    figText(X - 6, Y + 12 * k, '4', { anchor: 'end', color: 'var(--teal)', size: 11 })
  );

  return svg;
}
