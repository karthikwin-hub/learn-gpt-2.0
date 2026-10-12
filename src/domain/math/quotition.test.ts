import { describe, it, expect } from 'vitest';
import { repeatedSubtractionSteps, quotitionDivide, compareSharingVsGrouping } from './quotition';

describe('quotition domain logic (D2)', () => {
  it('computes exact backward subtraction hops until zero', () => {
    const hops = repeatedSubtractionSteps(20, 4);
    expect(hops).toHaveLength(5);
    expect(hops[0]).toEqual({ step: 1, from: 20, subtracted: 4, remaining: 16 });
    expect(hops[1]).toEqual({ step: 2, from: 16, subtracted: 4, remaining: 12 });
    expect(hops[2]).toEqual({ step: 3, from: 12, subtracted: 4, remaining: 8 });
    expect(hops[3]).toEqual({ step: 4, from: 8, subtracted: 4, remaining: 4 });
    expect(hops[4]).toEqual({ step: 5, from: 4, subtracted: 4, remaining: 0 });
  });

  it('computes hops with remainder correctly when total cannot be fully divided', () => {
    const hops = repeatedSubtractionSteps(22, 5);
    expect(hops).toHaveLength(4);
    expect(hops[3]).toEqual({ step: 4, from: 7, subtracted: 5, remaining: 2 });
  });

  it('computes full quotition division with exact division', () => {
    const res = quotitionDivide(18, 6);
    expect(res.quotient).toBe(3);
    expect(res.remainder).toBe(0);
    expect(res.equation).toBe('18 ÷ 6 = 3');
    expect(res.hops).toHaveLength(3);
  });

  it('computes full quotition division with non-zero remainder', () => {
    const res = quotitionDivide(22, 5);
    expect(res.quotient).toBe(4);
    expect(res.remainder).toBe(2);
    expect(res.equation).toBe('22 ÷ 5 = 4 R 2');
  });

  it('models sharing vs grouping duality comparison', () => {
    const duality = compareSharingVsGrouping(20, 4);
    expect(duality.sharing.platesCount).toBe(4);
    expect(duality.sharing.itemsPerPlate).toBe(5);
    expect(duality.grouping.boxCapacity).toBe(4);
    expect(duality.grouping.boxesCount).toBe(5);
  });

  it('throws descriptive error on invalid inputs', () => {
    expect(() => repeatedSubtractionSteps(20, 0)).toThrow('Group size must be greater than zero');
    expect(() => repeatedSubtractionSteps(-5, 2)).toThrow('Total must be non-negative');
    expect(() => compareSharingVsGrouping(22, 5)).toThrow('Param must divide total evenly');
  });
});
