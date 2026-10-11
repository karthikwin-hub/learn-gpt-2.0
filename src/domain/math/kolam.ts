/**
 * Kolam mirror curve mathematical model.
 * Generates single-line continuous curves around an m x n grid of dots.
 */

export interface Point {
  x: number;
  y: number;
}

export function dots(m: number, n: number): Point[] {
  const out: Point[] = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      out.push({ x: 2 * i + 1, y: 2 * j + 1 });
    }
  }
  return out;
}

export function mirrorCurve(m: number, n: number): Point[] {
  const W = 2 * m;
  const H = 2 * n;
  let x = 1;
  let y = 0;
  let dx = 1;
  let dy = 1;
  const pts: Point[] = [];
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

export function softenBorder(pts: Point[], m: number, n: number, push: number): Point[] {
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

export function toPath(pts: Point[], scale: number, offset: number): string {
  function P(p: Point): Point {
    return { x: p.x * scale + offset, y: p.y * scale + offset };
  }
  function mid(a: Point, b: Point): Point {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  const s = pts.map(P);
  const n = s.length;
  if (n === 0) return '';
  const pLast = s[n - 1]!;
  const pFirst = s[0]!;
  const start = mid(pLast, pFirst);
  let d = `M${start.x.toFixed(2)} ${start.y.toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const c = s[i]!;
    const nextP = s[(i + 1) % n]!;
    const e = mid(c, nextP);
    d += ` Q${c.x.toFixed(2)} ${c.y.toFixed(2)} ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
  }
  return d + ' Z';
}
