import { describe, it, expect } from 'vitest';
import { dots, mirrorCurve, softenBorder, toPath } from './index';

describe('src/domain/math/kolam', () => {
  it('generates m x n grid of dots', () => {
    const grid = dots(3, 4);
    expect(grid.length).toBe(12);
    expect(grid[0]).toEqual({ x: 1, y: 1 });
  });

  it('generates unbroken closed mirror curve points', () => {
    const pts = mirrorCurve(3, 4);
    expect(pts.length).toBeGreaterThan(0);
    expect(pts[0]).toEqual({ x: 1, y: 0 });
  });

  it('softens border points outward', () => {
    const pts = mirrorCurve(3, 4);
    const softened = softenBorder(pts, 3, 4, 0.45);
    expect(softened.length).toBe(pts.length);
  });

  it('generates valid SVG path data', () => {
    const pts = softenBorder(mirrorCurve(3, 4), 3, 4, 0.45);
    const pathStr = toPath(pts, 22, 0);
    expect(pathStr.startsWith('M')).toBe(true);
    expect(pathStr.endsWith('Z')).toBe(true);
    expect(pathStr.includes('Q')).toBe(true);
  });
});

describe('src/domain/math/index exports', () => {
  it('exports numbers, fractions, and money functions', async () => {
    const math = await import('./index');
    expect(typeof math.formatIndianNumeral).toBe('function');
    expect(typeof math.areFractionsEquivalent).toBe('function');
    expect(typeof math.calculateTotalPaise).toBe('function');
    expect(typeof math.toRoman).toBe('function');
    expect(typeof math.fromRoman).toBe('function');
    expect(typeof math.partitionSet).toBe('function');
    expect(typeof math.fractionOfSet).toBe('function');
    expect(typeof math.addLikeFractions).toBe('function');
    expect(typeof math.decomposeDecimal).toBe('function');
    expect(typeof math.decimalToHundredths).toBe('function');
    expect(typeof math.subtractWithRegrouping).toBe('function');
    expect(typeof math.addWithRegrouping).toBe('function');
    expect(typeof math.roundToNearest).toBe('function');
    expect(typeof math.estimateSum).toBe('function');
    expect(typeof math.repeatedSubtractionSteps).toBe('function');
    expect(typeof math.quotitionDivide).toBe('function');
    expect(typeof math.executeLongDivisionSteps).toBe('function');
    expect(typeof math.verifyLongDivision).toBe('function');
    expect(typeof math.classifyRootAction).toBe('function');
    expect(typeof math.evaluateProblemModel).toBe('function');
    expect(typeof math.findAllFactors).toBe('function');
    expect(typeof math.findFactorPairs).toBe('function');
    expect(typeof math.isValidRectangle).toBe('function');
    expect(typeof math.isPrime).toBe('function');
    expect(typeof math.isComposite).toBe('function');
    expect(typeof math.sievePrimesUpTo).toBe('function');
    expect(typeof math.primeFactorize).toBe('function');
  });
});
