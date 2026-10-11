import { describe, expect, it } from 'vitest';
import {
  maxAreaRect,
  mirrorLineAngles,
  reflection,
  ropeOptions,
  ropeRect,
  smallestTurn,
  symmetryTransforms,
} from './geometry';

describe('geometry domain math', () => {
  describe('ropeRect', () => {
    it('calculates rectangle dimensions for perimeter 24', () => {
      const r1 = ropeRect(24, 1);
      expect(r1).toEqual({ w: 1, h: 11, perimeter: 24, area: 11 });

      const r6 = ropeRect(24, 6);
      expect(r6).toEqual({ w: 6, h: 6, perimeter: 24, area: 36 });

      const r11 = ropeRect(24, 11);
      expect(r11).toEqual({ w: 11, h: 1, perimeter: 24, area: 11 });
    });

    it('clamps width within [1, perimeter / 2 - 1]', () => {
      const under = ropeRect(24, 0);
      expect(under.w).toBe(1);

      const over = ropeRect(24, 15);
      expect(over.w).toBe(11);
    });

    it('rounds non-integer width', () => {
      const r = ropeRect(24, 5.7);
      expect(r.w).toBe(6);
    });
  });

  describe('ropeOptions & maxAreaRect', () => {
    it('lists all integral options for perimeter 24', () => {
      const options = ropeOptions(24);
      expect(options).toHaveLength(11);
      expect(options[0]).toEqual({ w: 1, h: 11, perimeter: 24, area: 11 });
      expect(options[10]).toEqual({ w: 11, h: 1, perimeter: 24, area: 11 });
    });

    it('finds the maximum area rectangle (square)', () => {
      const best24 = maxAreaRect(24);
      expect(best24.w).toBe(6);
      expect(best24.h).toBe(6);
      expect(best24.area).toBe(36);

      const best20 = maxAreaRect(20);
      expect(best20.w).toBe(5);
      expect(best20.h).toBe(5);
      expect(best20.area).toBe(25);
    });
  });

  describe('symmetryTransforms', () => {
    it('produces n rotations for turn mode', () => {
      const transforms = symmetryTransforms(4, 'turn');
      expect(transforms).toHaveLength(4);

      const p = { x: 1, y: 0 };
      // 0 deg
      const p0 = transforms[0]!(p);
      expect(p0.x).toBeCloseTo(1);
      expect(p0.y).toBeCloseTo(0);

      // 90 deg
      const p1 = transforms[1]!(p);
      expect(p1.x).toBeCloseTo(0);
      expect(p1.y).toBeCloseTo(1);

      // 180 deg
      const p2 = transforms[2]!(p);
      expect(p2.x).toBeCloseTo(-1);
      expect(p2.y).toBeCloseTo(0);

      // 270 deg
      const p3 = transforms[3]!(p);
      expect(p3.x).toBeCloseTo(0);
      expect(p3.y).toBeCloseTo(-1);
    });

    it('produces 2n transforms (rotations + reflections) for mirror mode', () => {
      const transforms = symmetryTransforms(4, 'mirror');
      expect(transforms).toHaveLength(8);
    });

    it('reflection across axis inverts perpendicular component', () => {
      const refX = reflection(0); // across x-axis
      const p = { x: 2, y: 3 };
      const q = refX(p);
      expect(q.x).toBeCloseTo(2);
      expect(q.y).toBeCloseTo(-3);
    });

    it('calculates mirror line angles', () => {
      const angles = mirrorLineAngles(4);
      expect(angles).toHaveLength(4);
      expect(angles[0]).toBe(0);
      expect(angles[1]).toBeCloseTo(Math.PI / 4);
      expect(angles[2]).toBeCloseTo(Math.PI / 2);
      expect(angles[3]).toBeCloseTo((3 * Math.PI) / 4);
    });

    it('calculates smallest turn angle in degrees', () => {
      expect(smallestTurn(1)).toBe(360);
      expect(smallestTurn(2)).toBe(180);
      expect(smallestTurn(4)).toBe(90);
      expect(smallestTurn(8)).toBe(45);
    });
  });
});
