import { describe, it, expect } from 'vitest';
import { arrayTotal, rotateArrayDimensions, generateArrayGrid, isCommutativeProduct } from './rect';

describe('domain/math/rect: Rectangular Arrays and Commutative Rotation', () => {
  describe('arrayTotal', () => {
    it('computes total items as rows * cols', () => {
      expect(arrayTotal(3, 8)).toBe(24);
      expect(arrayTotal(8, 3)).toBe(24);
      expect(arrayTotal(4, 5)).toBe(20);
    });
  });

  describe('rotateArrayDimensions', () => {
    it('swaps rows and cols while conserving total items (90 degree rotation)', () => {
      const rotated = rotateArrayDimensions(3, 8);
      expect(rotated.rows).toBe(8);
      expect(rotated.cols).toBe(3);
      expect(rotated.total).toBe(24);
    });

    it('works on square arrays', () => {
      const square = rotateArrayDimensions(4, 4);
      expect(square.rows).toBe(4);
      expect(square.cols).toBe(4);
      expect(square.total).toBe(16);
    });
  });

  describe('generateArrayGrid', () => {
    it('generates rows * cols coordinate cells', () => {
      const grid = generateArrayGrid(3, 4);
      expect(grid).toHaveLength(12);
      expect(grid[0]).toEqual({ row: 0, col: 0 });
      expect(grid[11]).toEqual({ row: 2, col: 3 });
    });
  });

  describe('isCommutativeProduct', () => {
    it('verifies commutative equality across dimensions', () => {
      expect(isCommutativeProduct(3, 8)).toBe(true);
      expect(isCommutativeProduct(7, 9)).toBe(true);
      expect(isCommutativeProduct(12, 5)).toBe(true);
    });
  });
});
