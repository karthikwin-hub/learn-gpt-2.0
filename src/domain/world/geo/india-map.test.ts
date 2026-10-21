import { describe, expect, it } from 'vitest';
import { REGIONS } from '../states';
import { DISPUTED_PATH, MAP_H, MAP_W, RIVER_PATHS, STATE_PATHS, project } from './india-map';
import { boundsOf, insideRings, ringsOf, type Box } from './shape';

const rings = Object.fromEntries(Object.entries(STATE_PATHS).map(([id, d]) => [id, ringsOf(d)]));
const box = (id: string): Box => boundsOf(rings[id] ?? []);
const touch = (a: Box, b: Box, gap = 1.5) =>
  a.minX - gap <= b.maxX &&
  b.minX - gap <= a.maxX &&
  a.minY - gap <= b.maxY &&
  b.minY - gap <= a.maxY;

describe('India map data (048, generated from Survey of India boundaries)', () => {
  it('has a path for each of the 36 regions and nothing else', () => {
    expect(Object.keys(STATE_PATHS).sort()).toEqual(REGIONS.map((r) => r.id).sort());
  });

  it('keeps every region non-empty and inside the frame', () => {
    for (const r of REGIONS) {
      const b = box(r.id);
      expect(rings[r.id]?.length, r.id).toBeGreaterThan(0);
      expect(b.minX, r.id).toBeGreaterThanOrEqual(0);
      expect(b.minY, r.id).toBeGreaterThanOrEqual(0);
      expect(b.maxX, r.id).toBeLessThanOrEqual(MAP_W);
      expect(b.maxY, r.id).toBeLessThanOrEqual(MAP_H);
    }
  });

  it('places neighbouring regions next to each other', () => {
    for (const r of REGIONS)
      for (const n of r.neighbours) expect(touch(box(r.id), box(n)), `${r.id} and ${n}`).toBe(true);
  });

  it('keeps the disputed areas as their own layer, inside India', () => {
    const patches = ringsOf(DISPUTED_PATH);
    expect(patches.length).toBeGreaterThan(0);
    const all = Object.values(rings).flat();
    for (const ring of patches) {
      const b = boundsOf([ring]);
      expect(all.some((r) => touch(b, boundsOf([r]), 0))).toBe(true);
    }
  });

  it('keeps the main rivers inside the outline', () => {
    const all = Object.values(rings).flat();
    for (const id of [
      'ganga',
      'yamuna',
      'brahmaputra',
      'godavari',
      'krishna',
      'kaveri',
      'narmada',
      'tapi',
    ]) {
      const pts = ringsOf(RIVER_PATHS[id] ?? '').flat();
      expect(pts.length, id).toBeGreaterThan(5);
      const inside = pts.filter((p) => insideRings(p, all)).length;
      expect(inside / pts.length, id).toBeGreaterThan(0.95);
    }
  });

  it('projects known capitals inside their own state', () => {
    const capitals: [string, number, number][] = [
      ['delhi', 28.61, 77.21],
      ['telangana', 17.39, 78.49],
      ['tn', 13.08, 80.27],
      ['wb', 22.57, 88.36],
      ['gujarat', 23.22, 72.65],
      ['assam', 26.14, 91.79],
      ['kerala', 8.52, 76.94],
      ['jk', 34.08, 74.8],
    ];
    for (const [id, lat, lon] of capitals)
      expect(insideRings(project(lat, lon), rings[id] ?? []), id).toBe(true);
  });
});
