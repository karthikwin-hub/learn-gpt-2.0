import { describe, it, expect } from 'vitest';
import {
  triangularNumber,
  squareNumber,
  gnomonSize,
  triangularLayerSize,
  generateTriangularDots,
  generateSquareGrid,
} from './growing';

describe('growing patterns domain logic (Figurate & Triangular Numbers)', () => {
  describe('triangularNumber', () => {
    it('calculates triangular numbers for stages 1 to 6', () => {
      expect(triangularNumber(1)).toBe(1);
      expect(triangularNumber(2)).toBe(3); // 1 + 2
      expect(triangularNumber(3)).toBe(6); // 1 + 2 + 3
      expect(triangularNumber(4)).toBe(10); // 1 + 2 + 3 + 4 (Prashna)
      expect(triangularNumber(5)).toBe(15);
      expect(triangularNumber(6)).toBe(21);
    });

    it('returns 0 for non-positive inputs', () => {
      expect(triangularNumber(0)).toBe(0);
      expect(triangularNumber(-2)).toBe(0);
    });
  });

  describe('squareNumber', () => {
    it('calculates square numbers for stages 1 to 6', () => {
      expect(squareNumber(1)).toBe(1);
      expect(squareNumber(2)).toBe(4);
      expect(squareNumber(3)).toBe(9);
      expect(squareNumber(4)).toBe(16);
      expect(squareNumber(5)).toBe(25); // Amit's misconception check: 25 vs 10
      expect(squareNumber(6)).toBe(36);
    });

    it('returns 0 for non-positive inputs', () => {
      expect(squareNumber(0)).toBe(0);
      expect(squareNumber(-3)).toBe(0);
    });
  });

  describe('gnomonSize', () => {
    it('calculates L-shaped added border tiles 2n - 1', () => {
      expect(gnomonSize(1)).toBe(1);
      expect(gnomonSize(2)).toBe(3); // 1 + 3 = 4
      expect(gnomonSize(3)).toBe(5); // 4 + 5 = 9
      expect(gnomonSize(4)).toBe(7); // 9 + 7 = 16
      expect(gnomonSize(5)).toBe(9); // 16 + 9 = 25
    });

    it('returns 0 for non-positive inputs', () => {
      expect(gnomonSize(0)).toBe(0);
    });
  });

  describe('triangularLayerSize', () => {
    it('returns n for stage n', () => {
      expect(triangularLayerSize(1)).toBe(1);
      expect(triangularLayerSize(4)).toBe(4);
      expect(triangularLayerSize(0)).toBe(0);
    });
  });

  describe('generateTriangularDots', () => {
    it('generates exact number of dots matching T_n', () => {
      const dots3 = generateTriangularDots(3);
      expect(dots3.length).toBe(6);
      expect(dots3.filter((d) => d.layer === 3).length).toBe(3);

      const dots4 = generateTriangularDots(4);
      expect(dots4.length).toBe(10);
      expect(dots4.filter((d) => d.layer === 4).length).toBe(4);
    });

    it('returns empty array for stage <= 0', () => {
      expect(generateTriangularDots(0)).toEqual([]);
    });
  });

  describe('generateSquareGrid', () => {
    it('generates n x n tiles with gnomon layer indices', () => {
      const grid3 = generateSquareGrid(3);
      expect(grid3.length).toBe(9);

      // Layer 1 has 1 tile (1,1)
      expect(grid3.filter((t) => t.layer === 1).length).toBe(1);
      // Layer 2 has 3 tiles (gnomon size 2)
      expect(grid3.filter((t) => t.layer === 2).length).toBe(3);
      // Layer 3 has 5 tiles (gnomon size 3)
      expect(grid3.filter((t) => t.layer === 3).length).toBe(5);
    });

    it('returns empty array for stage <= 0', () => {
      expect(generateSquareGrid(0)).toEqual([]);
    });
  });
});
