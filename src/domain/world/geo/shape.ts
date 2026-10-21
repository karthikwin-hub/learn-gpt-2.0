/** Read the generated map's path data back into points, for bounds, crops and inside tests. */

export type Pt = readonly [number, number];
export interface Box {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/** Rings of points from path data made only of M, relative l and z commands. */
export function ringsOf(d: string): Pt[][] {
  const rings: Pt[][] = [];
  let ring: Pt[] = [];
  let x = 0;
  let y = 0;
  for (const [, cmd, a, b] of d.matchAll(/([Mlz])\s*(-?[\d.]+)?\s*(-?[\d.]+)?/g)) {
    if (cmd === 'z') continue;
    if (cmd === 'M') {
      if (ring.length) rings.push(ring);
      ring = [];
      x = Number(a);
      y = Number(b);
    } else {
      x += Number(a);
      y += Number(b);
    }
    ring.push([x, y]);
  }
  if (ring.length) rings.push(ring);
  return rings;
}

export function boundsOf(rings: readonly (readonly Pt[])[]): Box {
  const box = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  for (const ring of rings)
    for (const [x, y] of ring) {
      box.minX = Math.min(box.minX, x);
      box.minY = Math.min(box.minY, y);
      box.maxX = Math.max(box.maxX, x);
      box.maxY = Math.max(box.maxY, y);
    }
  return box;
}

export function areaOf(ring: readonly Pt[]): number {
  let sum = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i] as Pt;
    const [xj, yj] = ring[j] as Pt;
    sum += xj * yi - xi * yj;
  }
  return Math.abs(sum) / 2;
}

/** Even-odd test against all rings, so holes and islands both count correctly. */
export function insideRings(p: Pt, rings: readonly (readonly Pt[])[]): boolean {
  let hit = false;
  for (const ring of rings)
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i] as Pt;
      const [xj, yj] = ring[j] as Pt;
      if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) hit = !hit;
    }
  return hit;
}
