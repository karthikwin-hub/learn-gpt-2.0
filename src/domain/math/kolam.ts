/**
 * Pure domain model for Knot G4: Kolam Mirror (Line vs Rotational Symmetry)
 * and traditional single-line loop kolams on dot grids.
 */

export interface KolamPoint {
  x: number;
  y: number;
}

/**
 * Calculates the count of mirror reflection symmetry axes.
 * In a cyclic group C_n (pure rotation), mirror axes = 0.
 * In a dihedral group D_n (mirror symmetry), mirror axes = order.
 */
export function calculateSymmetryAxes(order: number, hasMirror: boolean): number {
  if (order <= 0) return 0;
  return hasMirror ? order : 0;
}

/**
 * Calculates the smallest rotational turn degree that maps a pattern onto itself.
 * For order n, turn = 360° / n.
 */
export function minimumTurnDegree(order: number): number {
  if (order <= 0) return 360;
  return Math.round((360 / order) * 100) / 100;
}

/**
 * Transforms a 2D point around a center origin (cx, cy) using rotation and optional reflection.
 */
export function transformPoint(
  x: number,
  y: number,
  cx: number,
  cy: number,
  angleDeg: number,
  mirror: boolean = false
): KolamPoint {
  // Translate to origin
  let dx = x - cx;
  const dy = y - cy;

  // Optional mirror flip across vertical axis
  if (mirror) {
    dx = -dx;
  }

  // Rotate around origin
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const rx = dx * cos - dy * sin;
  const ry = dx * sin + dy * cos;

  return {
    x: Math.round((cx + rx) * 100) / 100,
    y: Math.round((cy + ry) * 100) / 100,
  };
}

/**
 * Checks whether rotational symmetry implies mirror symmetry.
 * Mathematically: FALSE. A shape can have rotational symmetry without any mirror axes.
 */
export function rotationRequiresMirror(): boolean {
  return false;
}

/**
 * Generates an m x n grid of dots for traditional kolams.
 * Dots sit at odd coordinates (2i + 1, 2j + 1).
 */
export function dots(m: number, n: number): KolamPoint[] {
  const out: KolamPoint[] = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      out.push({ x: 2 * i + 1, y: 2 * j + 1 });
    }
  }
  return out;
}

/**
 * Generates an unbroken closed mirror curve bouncing off the border around m x n dots.
 */
export function mirrorCurve(m: number, n: number): KolamPoint[] {
  const W = 2 * m;
  const H = 2 * n;
  let x = 1;
  let y = 0;
  let dx = 1;
  let dy = 1;
  const pts: KolamPoint[] = [];
  let guard = 4 * W * H + 8;
  do {
    pts.push({ x, y });
    if (x + dx < 0 || x + dx > W) dx = -dx;
    if (y + dy < 0 || y + dy > H) dy = -dy;
    x += dx;
    y += dy;
    guard--;
  } while (!(x === 1 && y === 0) && guard > 0);
  return pts;
}

/**
 * Points that lie on the border get pushed outward so loops swing around the edge dots.
 */
export function softenBorder(pts: KolamPoint[], m: number, n: number, push: number): KolamPoint[] {
  const W = 2 * m;
  const H = 2 * n;
  return pts.map((p) => {
    const q = { x: p.x, y: p.y };
    if (p.x === 0) q.x -= push;
    if (p.x === W) q.x += push;
    if (p.y === 0) q.y -= push;
    if (p.y === H) q.y += push;
    return q;
  });
}

/**
 * Smooth closed SVG path through the points (quadratic curves via midpoints).
 */
export function toPath(pts: KolamPoint[], scale: number, offset: number): string {
  function P(p: KolamPoint) {
    return { x: p.x * scale + offset, y: p.y * scale + offset };
  }
  function mid(a: KolamPoint, b: KolamPoint) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }
  const s = pts.map(P);
  const n = s.length;
  if (n === 0) return '';
  const first = s[0];
  const last = s[n - 1];
  if (!first || !last) return '';
  const start = mid(last, first);
  let d = 'M' + start.x.toFixed(2) + ' ' + start.y.toFixed(2);
  for (let i = 0; i < n; i++) {
    const c = s[i];
    const next = s[(i + 1) % n];
    if (!c || !next) continue;
    const e = mid(c, next);
    d += ' Q' + c.x.toFixed(2) + ' ' + c.y.toFixed(2) + ' ' + e.x.toFixed(2) + ' ' + e.y.toFixed(2);
  }
  return d + ' Z';
}
