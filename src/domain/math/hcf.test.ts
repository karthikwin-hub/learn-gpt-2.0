import { describe, expect, it } from 'vitest';
import {
  calculateHCF,
  findCommonFactors,
  classifyVennFactors,
  testTileFit,
  simplifyFractionByHCF,
} from './hcf';
import { gcd } from './multiply';

describe('domain/math/hcf', () => {
  it('computes HCF accurately using Euclid algorithm', () => {
    expect(calculateHCF(12, 18)).toBe(6);
    expect(calculateHCF(16, 24)).toBe(8);
    expect(calculateHCF(8, 12)).toBe(4);
    expect(calculateHCF(7, 13)).toBe(1);
    expect(calculateHCF(20, 30)).toBe(10);
  });

  it('finds shared common factors between two numbers', () => {
    expect(findCommonFactors(12, 18)).toEqual([1, 2, 3, 6]);
    expect(findCommonFactors(16, 24)).toEqual([1, 2, 4, 8]);
    expect(findCommonFactors(8, 12)).toEqual([1, 2, 4]);
    expect(findCommonFactors(7, 13)).toEqual([1]);
  });

  it('partitions factors into Venn diagram sectors', () => {
    // 12 factors: [1, 2, 3, 4, 6, 12]
    // 18 factors: [1, 2, 3, 6, 9, 18]
    // Common: [1, 2, 3, 6]
    const venn = classifyVennFactors(12, 18);
    expect(venn.common).toEqual([1, 2, 3, 6]);
    expect(venn.onlyA).toEqual([4, 12]);
    expect(venn.onlyB).toEqual([9, 18]);
    expect(venn.hcf).toBe(6);
  });

  it('evaluates tile fitting across two beam lengths', () => {
    // 12 and 18: tile 6 fits both and is HCF
    const t6 = testTileFit(12, 18, 6);
    expect(t6.fitsA).toBe(true);
    expect(t6.fitsB).toBe(true);
    expect(t6.isCommonFactor).toBe(true);
    expect(t6.isHCF).toBe(true);

    // tile 2 fits both but is not HCF
    const t2 = testTileFit(12, 18, 2);
    expect(t2.fitsA).toBe(true);
    expect(t2.fitsB).toBe(true);
    expect(t2.isCommonFactor).toBe(true);
    expect(t2.isHCF).toBe(false);

    // tile 4 fits 12 but not 18
    const t4 = testTileFit(12, 18, 4);
    expect(t4.fitsA).toBe(true);
    expect(t4.fitsB).toBe(false);
    expect(t4.isCommonFactor).toBe(false);
    expect(t4.isHCF).toBe(false);
  });

  it('simplifies fractions in one step using HCF', () => {
    expect(simplifyFractionByHCF(12, 18)).toEqual({
      num: 12,
      den: 18,
      simplifiedNum: 2,
      simplifiedDen: 3,
      hcf: 6,
    });
    expect(simplifyFractionByHCF(16, 24)).toEqual({
      num: 16,
      den: 24,
      simplifiedNum: 2,
      simplifiedDen: 3,
      hcf: 8,
    });
  });
});

describe('046 one owner for HCF (FR-006)', () => {
  it('gcd used by fractions and division is the same function as calculateHCF', () => {
    expect(gcd).toBe(calculateHCF);
  });
});
