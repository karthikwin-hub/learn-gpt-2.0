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
    expect(typeof math.testDivisibility).toBe('function');
    expect(typeof math.sumOfDigits).toBe('function');
    expect(typeof math.calculateHCF).toBe('function');
    expect(typeof math.findCommonFactors).toBe('function');
    expect(typeof math.simplifyFractionByHCF).toBe('function');
    expect(typeof math.classifyAngle).toBe('function');
    expect(typeof math.turnFraction).toBe('function');
    expect(typeof math.getAngleInfo).toBe('function');
    expect(typeof math.isArmLengthInvariant).toBe('function');
    expect(typeof math.parallelogramArea).toBe('function');
    expect(typeof math.slantLength).toBe('function');
    expect(typeof math.parallelogramPerimeter).toBe('function');
    expect(typeof math.shearDecomposition).toBe('function');
    expect(typeof math.calculateSymmetryAxes).toBe('function');
    expect(typeof math.minimumTurnDegree).toBe('function');
    expect(typeof math.transformPoint).toBe('function');
    expect(typeof math.detectFaceCollisions).toBe('function');
    expect(typeof math.isValidCubeNet).toBe('function');
    expect(typeof math.getOppositeFacePairs).toBe('function');
    expect(typeof math.diameterFromRadius).toBe('function');
    expect(typeof math.radiusFromDiameter).toBe('function');
    expect(typeof math.chordLength).toBe('function');
    expect(typeof math.isChordDiameter).toBe('function');
    expect(typeof math.totalTangramUnits).toBe('function');
    expect(typeof math.calculateSilhouetteArea).toBe('function');
    expect(typeof math.isAreaConserved).toBe('function');
    expect(typeof math.canTwoSmallTrianglesCompose).toBe('function');
    expect(typeof math.projectOrthographicViews).toBe('function');
    expect(typeof math.generateTopView).toBe('function');
    expect(typeof math.generateFrontView).toBe('function');
    expect(typeof math.generateSideView).toBe('function');
    expect(typeof math.convertLength).toBe('function');
    expect(typeof math.convertMass).toBe('function');
    expect(typeof math.convertCapacity).toBe('function');
    expect(typeof math.parseMetersAndCentimeters).toBe('function');
    expect(typeof math.areMetricQuantitiesEqual).toBe('function');
    expect(typeof math.to24Hour).toBe('function');
    expect(typeof math.to12Hour).toBe('function');
    expect(typeof math.addMinutes).toBe('function');
    expect(typeof math.calculateDuration).toBe('function');
    expect(typeof math.calculateTotalFromIcons).toBe('function');
    expect(typeof math.iconsRequiredForCount).toBe('function');
    expect(typeof math.validatePictographScale).toBe('function');
    expect(typeof math.readBarValue).toBe('function');
    expect(typeof math.generateAxisTicks).toBe('function');
    expect(typeof math.interpolateBarHeight).toBe('function');
    expect(typeof math.findFirstDifferences).toBe('function');
    expect(typeof math.isArithmeticSequence).toBe('function');
    expect(typeof math.isGeometricSequence).toBe('function');
    expect(typeof math.predictNextTerm).toBe('function');
    expect(typeof math.predictNthTerm).toBe('function');
    expect(typeof math.triangularNumber).toBe('function');
    expect(typeof math.squareNumber).toBe('function');
    expect(typeof math.gnomonSize).toBe('function');
    expect(typeof math.triangularLayerSize).toBe('function');
    expect(typeof math.generateTriangularDots).toBe('function');
    expect(typeof math.generateSquareGrid).toBe('function');
  });
});
