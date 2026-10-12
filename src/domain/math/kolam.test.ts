import { describe, it, expect } from 'vitest';
import {
  calculateSymmetryAxes,
  minimumTurnDegree,
  transformPoint,
  rotationRequiresMirror,
} from './kolam';

describe('src/domain/math/kolam', () => {
  it('calculates symmetry axes correctly for mirror and rotation modes', () => {
    expect(calculateSymmetryAxes(4, true)).toBe(4);
    expect(calculateSymmetryAxes(4, false)).toBe(0);
    expect(calculateSymmetryAxes(8, true)).toBe(8);
    expect(calculateSymmetryAxes(8, false)).toBe(0);
    expect(calculateSymmetryAxes(0, true)).toBe(0);
  });

  it('calculates minimum turn degree for various symmetry orders', () => {
    expect(minimumTurnDegree(4)).toBe(90);
    expect(minimumTurnDegree(2)).toBe(180);
    expect(minimumTurnDegree(1)).toBe(360);
    expect(minimumTurnDegree(8)).toBe(45);
    expect(minimumTurnDegree(0)).toBe(360);
  });

  it('transforms 2D points accurately with rotation and reflection', () => {
    const origin = { cx: 0, cy: 0 };
    // Rotate (10, 0) by 90 degrees -> (0, 10)
    const p90 = transformPoint(10, 0, origin.cx, origin.cy, 90, false);
    expect(p90.x).toBe(0);
    expect(p90.y).toBe(10);

    // Rotate (10, 0) by 180 degrees -> (-10, 0)
    const p180 = transformPoint(10, 0, origin.cx, origin.cy, 180, false);
    expect(p180.x).toBe(-10);
    expect(p180.y).toBe(0);

    // Mirror flip across vertical axis without rotation
    const pMirror = transformPoint(10, 5, origin.cx, origin.cy, 0, true);
    expect(pMirror.x).toBe(-10);
    expect(pMirror.y).toBe(5);
  });

  it('asserts fundamental symmetry invariant: rotation does not require mirror lines', () => {
    expect(rotationRequiresMirror()).toBe(false);
  });
});
