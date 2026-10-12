import { describe, it, expect } from 'vitest';
import {
  detectFaceCollisions,
  isValidCubeNet,
  getOppositeFacePairs,
  type GridSquare,
} from './cubenet';

describe('src/domain/math/cubenet', () => {
  it('validates the classic Latin Cross / T net as a valid cube net', () => {
    // Classic T net:
    //   . [0] . .
    // [1] [2] [3] [4]
    //   . [5] . .
    const tNet: GridSquare[] = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 2 },
    ];
    const res = detectFaceCollisions(tNet);
    expect(res.valid).toBe(true);
    expect(res.connected).toBe(true);
    expect(res.overlaps).toEqual([]);
    expect(Object.keys(res.faceAssignments).length).toBe(6);
  });

  it('rejects a solid 2x3 rectangle of 6 squares and detects face collisions', () => {
    // 2x3 grid:
    // [0] [1] [2]
    // [3] [4] [5]
    const rect2x3: GridSquare[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];
    const res = detectFaceCollisions(rect2x3);
    expect(res.valid).toBe(false);
    expect(res.overlaps.length).toBeGreaterThan(0);
  });

  it('rejects a straight strip of 6 squares in a line', () => {
    const lineNet: GridSquare[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
    ];
    const res = detectFaceCollisions(lineNet);
    expect(res.valid).toBe(false);
    expect(res.overlaps.length).toBeGreaterThan(0);
  });

  it('rejects disconnected sets of squares', () => {
    const disconnected: GridSquare[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 7, y: 5 },
    ];
    const res = detectFaceCollisions(disconnected);
    expect(res.valid).toBe(false);
    expect(res.connected).toBe(false);
  });

  it('evaluates 2D matrix representations via isValidCubeNet', () => {
    const validMatrix = [
      [0, 1, 0, 0],
      [1, 1, 1, 1],
      [0, 1, 0, 0],
    ];
    expect(isValidCubeNet(validMatrix)).toBe(true);

    const invalidMatrix = [
      [1, 1, 1],
      [1, 1, 1],
    ];
    expect(isValidCubeNet(invalidMatrix)).toBe(false);
  });

  it('returns opposite face pairs', () => {
    const pairs = getOppositeFacePairs('t-net');
    expect(pairs).toHaveLength(3);
    expect(pairs).toContainEqual(['BOTTOM', 'TOP']);
    expect(pairs).toContainEqual(['NORTH', 'SOUTH']);
    expect(pairs).toContainEqual(['EAST', 'WEST']);
  });
});
