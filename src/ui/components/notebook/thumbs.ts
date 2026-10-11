/**
 * Model Thumbnail Renderers for the Notebook (Pothi).
 * Generates compact 48x48 SVG illustrations representing the child's manipulative state.
 */

import { svg } from '../../util/dom';
import type { NotebookPage } from '../../../persistence/pothi';

const INK_SOFT = 'var(--ink-soft)';

function rectThumb(m: Record<string, unknown>): SVGElement[] {
  const c = Number(m.cols) || 23;
  const r = Number(m.rows) || 14;
  const k = 40 / Math.max(c, r);
  const w = c * k;
  const h = r * k;
  const x = (48 - w) / 2;
  const y = (48 - h) / 2;

  const out: SVGElement[] = [
    svg('rect', {
      x,
      y,
      width: w,
      height: h,
      fill: 'var(--leaf-soft)',
      stroke: INK_SOFT,
      'stroke-width': 1,
    }),
  ];

  if (c >= 10 && c % 10) {
    const cutX = x + Math.floor(c / 10) * 10 * k;
    out.push(
      svg('line', {
        x1: cutX,
        y1: y,
        x2: cutX,
        y2: y + h,
        stroke: 'var(--thread)',
        'stroke-width': 1.5,
      })
    );
  }

  if (r >= 10 && r % 10) {
    const cutY = y + Math.floor(r / 10) * 10 * k;
    out.push(
      svg('line', {
        x1: x,
        y1: cutY,
        x2: x + w,
        y2: cutY,
        stroke: 'var(--thread)',
        'stroke-width': 1.5,
      })
    );
  }

  return out;
}

function shareThumb(m: Record<string, unknown>, leftover: boolean): SVGElement[] {
  const total = Number(m.total) || (leftover ? 14 : 12);
  const plates = Number(m.plates) || 4;
  const each = Math.floor(total / plates);
  const rem = total % plates;

  const out: SVGElement[] = [];
  const cols = Math.min(plates, 3);
  const rowsN = Math.ceil(plates / cols);

  for (let i = 0; i < plates; i++) {
    const cx = 24 + ((i % cols) - (cols - 1) / 2) * 15;
    const cy = 19 + (Math.floor(i / cols) - (rowsN - 1) / 2) * 16;
    out.push(
      svg('circle', {
        cx,
        cy,
        r: 7,
        fill: 'var(--paper-raised)',
        stroke: INK_SOFT,
        'stroke-width': 1,
      })
    );
    out.push(
      svg('text', {
        x: cx,
        y: cy + 0.5,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'font-size': 7,
        'font-weight': 700,
        fill: 'var(--ink)',
        'font-family': 'var(--font)',
        text: String(each),
      })
    );
  }

  if (rem > 0) {
    for (let j = 0; j < rem; j++) {
      out.push(
        svg('circle', {
          cx: 10 + j * 7,
          cy: 43,
          r: 2.6,
          fill: m.cut || leftover ? 'var(--thread)' : 'var(--kumkum)',
        })
      );
    }
  }

  return out;
}

function ropeThumb(m: Record<string, unknown>): SVGElement[] {
  const perimeter = Number(m.perimeter) || 24;
  const w = Number(m.w) || 6;
  const h = perimeter / 2 - w;
  const k = 38 / (perimeter / 2);
  const rw = w * k;
  const rh = h * k;

  return [
    svg('rect', {
      x: (48 - rw) / 2,
      y: (48 - rh) / 2,
      width: rw,
      height: rh,
      fill: 'var(--leaf-soft)',
      stroke: 'var(--thread)',
      'stroke-width': 2,
    }),
  ];
}

function kolamThumb(m: Record<string, unknown>): SVGElement[] {
  const order = Number(m.order) || 4;
  const out: SVGElement[] = [
    svg('rect', { x: 0, y: 0, width: 48, height: 48, fill: 'var(--ground)' }),
  ];

  // Draw symmetric loops around center (24, 24)
  const step = (2 * Math.PI) / order;
  for (let i = 0; i < order; i++) {
    const angle = i * step;
    const r = 14;
    const cx = 24 + Math.cos(angle) * r;
    const cy = 24 + Math.sin(angle) * r;
    out.push(
      svg('circle', {
        cx,
        cy,
        r: 5,
        fill: 'none',
        stroke: 'var(--rice)',
        'stroke-width': 1.2,
      })
    );
  }
  return out;
}

function drumsThumb(m: Record<string, unknown>): SVGElement[] {
  const a = Number(m.a) || 3;
  const b = Number(m.b) || 4;
  const n = 12;
  const out: SVGElement[] = [];

  for (let i = 1; i <= n; i++) {
    const x = 4 + (i - 1) * (40 / (n - 1));
    if (i % a === 0) {
      out.push(svg('circle', { cx: x, cy: 18, r: 1.8, fill: 'var(--indigo)' }));
    }
    if (i % b === 0) {
      out.push(svg('circle', { cx: x, cy: 30, r: 1.8, fill: 'var(--teal)' }));
    }
    if (i % a === 0 && i % b === 0) {
      out.push(
        svg('circle', {
          cx: x,
          cy: 24,
          r: 4.5,
          fill: 'none',
          stroke: 'var(--thread)',
          'stroke-width': 1.5,
        })
      );
    }
  }
  return out;
}

function setsThumb(m: Record<string, unknown>): SVGElement[] {
  const lay = (m.layout as string) || 'overlap';
  let A = { x: 18, y: 24, r: 13 };
  let B = { x: 30, y: 24, r: 13 };
  if (lay === 'apart') {
    A = { x: 13, y: 24, r: 10 };
    B = { x: 35, y: 24, r: 10 };
  } else if (lay === 'inside') {
    A = { x: 24, y: 24, r: 18 };
    B = { x: 26, y: 26, r: 9 };
  }

  return [
    svg('circle', {
      cx: A.x,
      cy: A.y,
      r: A.r,
      fill: 'var(--indigo-soft)',
      stroke: 'var(--indigo)',
      'stroke-width': 1.5,
      'fill-opacity': 0.6,
    }),
    svg('circle', {
      cx: B.x,
      cy: B.y,
      r: B.r,
      fill: 'var(--teal-soft)',
      stroke: 'var(--teal)',
      'stroke-width': 1.5,
      'fill-opacity': 0.6,
    }),
  ];
}

function logicThumb(m: Record<string, unknown>): SVGElement[] {
  const type = (m.type as string) || 'and';
  const out: SVGElement[] = [];
  const rows =
    type === 'not'
      ? [
          [false, false],
          [true, false],
        ]
      : [
          [false, false],
          [false, true],
          [true, false],
          [true, true],
        ];

  rows.forEach((inp, i) => {
    const y = 8 + i * (32 / Math.max(1, rows.length - 1));
    let yes = false;
    if (type === 'and') yes = Boolean(inp[0] && inp[1]);
    else if (type === 'or') yes = Boolean(inp[0] || inp[1]);
    else if (type === 'not') yes = !inp[0];

    out.push(
      svg('circle', {
        cx: 12,
        cy: y,
        r: 3,
        fill: inp[0] ? 'var(--indigo)' : 'none',
        stroke: 'var(--indigo)',
      })
    );
    if (type !== 'not') {
      out.push(
        svg('circle', {
          cx: 22,
          cy: y,
          r: 3,
          fill: inp[1] ? 'var(--teal)' : 'none',
          stroke: 'var(--teal)',
        })
      );
    }
    out.push(
      svg('circle', {
        cx: 36,
        cy: y,
        r: 3.5,
        fill: yes ? 'var(--leaf)' : 'var(--ghost)',
      })
    );
  });

  return out;
}

export function renderThumbnail(page: Partial<NotebookPage>): SVGElement {
  const m = (page.model as Record<string, unknown>) || {};
  let children: SVGElement[];

  switch (page.thread) {
    case 'M4':
      children = rectThumb(m);
      break;
    case 'M5':
      children = drumsThumb(m);
      break;
    case 'D1':
      children = shareThumb(m, false);
      break;
    case 'D3':
      children = shareThumb(m, true);
      break;
    case 'G2':
      children = ropeThumb(m);
      break;
    case 'G4':
      children = kolamThumb(m);
      break;
    case 'S2':
    case 'S3':
      children = setsThumb(m);
      break;
    case 'L2':
      children = logicThumb(m);
      break;
    default:
      children = [
        svg('circle', {
          cx: 24,
          cy: 24,
          r: 8,
          fill: 'var(--thread)',
        }),
      ];
      break;
  }

  return svg(
    'svg',
    {
      viewBox: '0 0 48 48',
      width: '100%',
      height: '100%',
      'aria-hidden': 'true',
    },
    children
  );
}
