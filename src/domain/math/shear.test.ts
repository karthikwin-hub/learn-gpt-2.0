import { describe, it, expect } from 'vitest';
import {
  parallelogramArea,
  slantLength,
  parallelogramPerimeter,
  shearDecomposition,
  isAreaConservedUnderShear,
} from './shear';

describe('src/domain/math/shear', () => {
  it('calculates parallelogram area as base * height regardless of shear', () => {
    expect(parallelogramArea(6, 4)).toBe(24);
    expect(parallelogramArea(10, 5)).toBe(50);
  });

  it('calculates slanted side length via Pythagoras', () => {
    // height = 4, offset = 3 -> slant = 5 (3-4-5 triangle)
    expect(slantLength(4, 3)).toBe(5);
    // height = 4, offset = 0 -> slant = 4 (rectangle)
    expect(slantLength(4, 0)).toBe(4);
  });

  it('calculates perimeter showing increase with slant', () => {
    // base = 6, height = 4, offset = 0 -> 2 * (6 + 4) = 20
    expect(parallelogramPerimeter(6, 4, 0)).toBe(20);
    // base = 6, height = 4, offset = 3 -> 2 * (6 + 5) = 22
    expect(parallelogramPerimeter(6, 4, 3)).toBe(22);
  });

  it('decomposes full geometric properties under shear', () => {
    const props = shearDecomposition(6, 4, 3);
    expect(props.base).toBe(6);
    expect(props.height).toBe(4);
    expect(props.offset).toBe(3);
    expect(props.slant).toBe(5);
    expect(props.area).toBe(24);
    expect(props.perimeter).toBe(22);
  });

  it('proves area conservation under horizontal shear', () => {
    expect(isAreaConservedUnderShear(6, 4, 0, 5)).toBe(true);
  });
});
