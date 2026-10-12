import { describe, it, expect } from 'vitest';
import {
  TANGRAM_PIECES,
  ALL_PIECE_IDS,
  TOTAL_TANGRAM_UNITS,
  getTangramPiece,
  totalTangramUnits,
  calculateSilhouetteArea,
  isAreaConserved,
  canTwoSmallTrianglesCompose,
  SILHOUETTES,
} from './tangram';

describe('tangram domain logic', () => {
  it('defines exactly 7 geometric pieces summing to 16 units', () => {
    expect(TANGRAM_PIECES).toHaveLength(7);
    expect(ALL_PIECE_IDS).toHaveLength(7);

    const sumUnits = TANGRAM_PIECES.reduce((sum, p) => sum + p.unitArea, 0);
    expect(sumUnits).toBe(TOTAL_TANGRAM_UNITS);
    expect(sumUnits).toBe(16);

    const sumFractions = TANGRAM_PIECES.reduce((sum, p) => sum + p.relativeFraction, 0);
    expect(sumFractions).toBeCloseTo(1.0, 5);
  });

  it('correctly retrieves individual pieces and verifies unit areas', () => {
    const l1 = getTangramPiece('large_triangle_1')!;
    expect(l1.unitArea).toBe(4);
    expect(l1.relativeFraction).toBe(0.25);

    const med = getTangramPiece('medium_triangle')!;
    expect(med.unitArea).toBe(2);

    const sq = getTangramPiece('square')!;
    expect(sq.unitArea).toBe(2);

    const par = getTangramPiece('parallelogram')!;
    expect(par.unitArea).toBe(2);

    const sm1 = getTangramPiece('small_triangle_1')!;
    expect(sm1.unitArea).toBe(1);

    const sm2 = getTangramPiece('small_triangle_2')!;
    expect(sm2.unitArea).toBe(1);
  });

  it('verifies that two small triangles can compose medium triangle, square, and parallelogram', () => {
    expect(canTwoSmallTrianglesCompose('medium_triangle')).toBe(true);
    expect(canTwoSmallTrianglesCompose('square')).toBe(true);
    expect(canTwoSmallTrianglesCompose('parallelogram')).toBe(true);

    // Large triangle is 4 units, not 2
    expect(canTwoSmallTrianglesCompose('large_triangle_1')).toBe(false);
  });

  it('calculates total units and silhouette area', () => {
    expect(totalTangramUnits()).toBe(16);
    expect(calculateSilhouetteArea(ALL_PIECE_IDS, 100)).toBe(100);

    // Subset of pieces
    const subset = ['small_triangle_1', 'small_triangle_2'] as const;
    expect(totalTangramUnits([...subset])).toBe(2);
    expect(calculateSilhouetteArea([...subset], 100)).toBe(12.5);
  });

  it('proves area is strictly conserved across all silhouette presets', () => {
    expect(SILHOUETTES.length).toBeGreaterThanOrEqual(4);

    const squarePreset = SILHOUETTES.find((s) => s.id === 'square')!;
    const candlePreset = SILHOUETTES.find((s) => s.id === 'candle')!;
    const boatPreset = SILHOUETTES.find((s) => s.id === 'boat')!;
    const swanPreset = SILHOUETTES.find((s) => s.id === 'swan')!;

    expect(isAreaConserved(squarePreset.pieces, candlePreset.pieces)).toBe(true);
    expect(isAreaConserved(squarePreset.pieces, boatPreset.pieces)).toBe(true);
    expect(isAreaConserved(squarePreset.pieces, swanPreset.pieces)).toBe(true);

    expect(calculateSilhouetteArea(squarePreset.pieces, 100)).toBe(100);
    expect(calculateSilhouetteArea(candlePreset.pieces, 100)).toBe(100);
    expect(calculateSilhouetteArea(boatPreset.pieces, 100)).toBe(100);
    expect(calculateSilhouetteArea(swanPreset.pieces, 100)).toBe(100);
  });
});
