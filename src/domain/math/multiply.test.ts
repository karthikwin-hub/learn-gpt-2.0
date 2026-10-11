import { describe, it, expect } from 'vitest';
import { area, splitTensOnes, partialProducts, columnMethod, multiples, lcm } from './multiply';

describe('Math domain: multiply (§8.2 known values)', () => {
  it('calculates area correctly', () => {
    expect(area(6, 4)).toBe(24);
    expect(area(23, 14)).toBe(322);
    expect(area(17, 12)).toBe(204);
  });

  it('splits numbers into tens and ones (DEV_HANDOFF.md §8.2)', () => {
    expect(splitTensOnes(23)).toEqual({ tens: 20, ones: 3 });
    expect(splitTensOnes(17)).toEqual({ tens: 10, ones: 7 });
    expect(splitTensOnes(5)).toEqual({ tens: 0, ones: 5 });
    expect(splitTensOnes(40)).toEqual({ tens: 40, ones: 0 });
  });

  it('computes partial products for 23 × 14 cut at tens (DEV_HANDOFF.md §8.2 line 310)', () => {
    const rooms = partialProducts(23, 14);
    expect(rooms).toHaveLength(4);
    expect(rooms[0]).toEqual({ x: 0, y: 0, w: 20, h: 10, product: 200 });
    expect(rooms[1]).toEqual({ x: 0, y: 10, w: 20, h: 4, product: 80 });
    expect(rooms[2]).toEqual({ x: 20, y: 0, w: 3, h: 10, product: 30 });
    expect(rooms[3]).toEqual({ x: 20, y: 10, w: 3, h: 4, product: 12 });

    const total = rooms.reduce((acc, r) => acc + r.product, 0);
    expect(total).toBe(322);
  });

  it('computes partial products for 17 × 12 cut at tens (DEV_HANDOFF.md §8.2 line 311)', () => {
    const rooms = partialProducts(17, 12);
    expect(rooms).toHaveLength(4);
    expect(rooms[0]).toEqual({ x: 0, y: 0, w: 10, h: 10, product: 100 });
    expect(rooms[1]).toEqual({ x: 0, y: 10, w: 10, h: 2, product: 20 });
    expect(rooms[2]).toEqual({ x: 10, y: 0, w: 7, h: 10, product: 70 });
    expect(rooms[3]).toEqual({ x: 10, y: 10, w: 7, h: 2, product: 14 });

    const total = rooms.reduce((acc, r) => acc + r.product, 0);
    expect(total).toBe(204);
  });

  it('calculates lcm for (4, 6) and (3, 4) (DEV_HANDOFF.md §8.2 line 312)', () => {
    expect(lcm(4, 6)).toBe(12);
    expect(lcm(3, 4)).toBe(12);
    expect(lcm(2, 5)).toBe(10);
  });

  it('generates multiples up to limit', () => {
    expect(multiples(4, 24)).toEqual([4, 8, 12, 16, 20, 24]);
  });

  it('generates column method steps for 23 × 14', () => {
    const result = columnMethod(23, 14);
    expect(result.lines).toEqual([
      { strip: 'ones', by: 4, value: 92 },
      { strip: 'tens', by: 10, value: 230 },
    ]);
    expect(result.total).toBe(322);
  });
});
