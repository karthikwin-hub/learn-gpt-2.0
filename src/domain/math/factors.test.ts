import { describe, expect, it } from 'vitest';
import {
  findAllFactors,
  findFactorPairs,
  isValidRectangle,
  arrangeTiles,
  isSquareNumber,
  createFactorState,
  trySetRows,
} from './factors';

describe('domain/math/factors', () => {
  it('computes all factors for a given number', () => {
    expect(findAllFactors(12)).toEqual([1, 2, 3, 4, 6, 12]);
    expect(findAllFactors(20)).toEqual([1, 2, 4, 5, 10, 20]);
    expect(findAllFactors(7)).toEqual([1, 7]);
    expect(findAllFactors(16)).toEqual([1, 2, 4, 8, 16]);
  });

  it('computes factor pairs ordered by width', () => {
    expect(findFactorPairs(12)).toEqual([
      [1, 12],
      [2, 6],
      [3, 4],
    ]);
    expect(findFactorPairs(16)).toEqual([
      [1, 16],
      [2, 8],
      [4, 4],
    ]);
    expect(findFactorPairs(13)).toEqual([[1, 13]]);
  });

  it('identifies valid rectangle dimensions', () => {
    expect(isValidRectangle(12, 1)).toBe(true);
    expect(isValidRectangle(12, 2)).toBe(true);
    expect(isValidRectangle(12, 3)).toBe(true);
    expect(isValidRectangle(12, 4)).toBe(true);
    expect(isValidRectangle(12, 5)).toBe(false);
    expect(isValidRectangle(12, 7)).toBe(false);
  });

  it('calculates tile arrangement columns and remainders', () => {
    expect(arrangeTiles(12, 3)).toEqual({
      columns: 4,
      remainder: 0,
      isValid: true,
    });
    expect(arrangeTiles(12, 5)).toEqual({
      columns: 2,
      remainder: 2,
      isValid: false,
    });
  });

  it('detects square numbers', () => {
    expect(isSquareNumber(16)).toBe(true);
    expect(isSquareNumber(25)).toBe(true);
    expect(isSquareNumber(12)).toBe(false);
    expect(isSquareNumber(18)).toBe(false);
  });

  it('manages factor workbench state transitions and pair discovery', () => {
    const state = createFactorState(12);
    expect(state.discoveredPairs).toEqual([[1, 12]]);

    const r3 = trySetRows(state, 3);
    expect(r3.valid).toBe(true);
    expect(r3.columns).toBe(4);
    expect(state.discoveredPairs).toEqual([
      [1, 12],
      [3, 4],
    ]);

    const r5 = trySetRows(state, 5);
    expect(r5.valid).toBe(false);
    expect(r5.remainder).toBe(2);
    expect(state.discoveredPairs.length).toBe(2);

    const r2 = trySetRows(state, 2);
    expect(r2.valid).toBe(true);
    expect(state.discoveredPairs).toEqual([
      [1, 12],
      [2, 6],
      [3, 4],
    ]);
  });
});
