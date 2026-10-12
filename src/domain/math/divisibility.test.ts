import { describe, expect, it } from 'vitest';
import {
  getDigits,
  sumOfDigits,
  getLastDigit,
  getDigitSumSteps,
  testDivisibility,
} from './divisibility';

describe('domain/math/divisibility', () => {
  it('extracts digits and digit sums', () => {
    expect(getDigits(5232)).toEqual([5, 2, 3, 2]);
    expect(sumOfDigits(5232)).toBe(12);
    expect(getLastDigit(5232)).toBe(2);
    expect(getDigitSumSteps(5232)).toEqual({
      digits: [5, 2, 3, 2],
      sum: 12,
      sumExpression: '5 + 2 + 3 + 2 = 12',
    });
  });

  it('evaluates last digit divisibility rules for 2, 5, 10', () => {
    expect(testDivisibility(5232, 2).passes).toBe(true);
    expect(testDivisibility(43, 2).passes).toBe(false);

    expect(testDivisibility(4125, 5).passes).toBe(true);
    expect(testDivisibility(5232, 5).passes).toBe(false);

    expect(testDivisibility(4120, 10).passes).toBe(true);
    expect(testDivisibility(4125, 10).passes).toBe(false);
  });

  it('evaluates digit sum divisibility rules for 3 and 9', () => {
    // 5232 -> sum is 12 (divisible by 3, not by 9)
    const res3 = testDivisibility(5232, 3);
    expect(res3.passes).toBe(true);
    expect(res3.family).toBe('digit-sum');

    const res9 = testDivisibility(5232, 9);
    expect(res9.passes).toBe(false);
    expect(res9.family).toBe('digit-sum');

    // 729 -> sum is 18 (divisible by both 3 and 9)
    expect(testDivisibility(729, 3).passes).toBe(true);
    expect(testDivisibility(729, 9).passes).toBe(true);

    // 43 -> sum is 7 (neither)
    expect(testDivisibility(43, 3).passes).toBe(false);
  });

  it('evaluates composite divisibility rule for 6 (both even and sum/3)', () => {
    // 5232: even (ends in 2) and sum is 12 (divisible by 3) => passes 6!
    const res6 = testDivisibility(5232, 6);
    expect(res6.passes).toBe(true);
    expect(res6.family).toBe('composite');

    // 27: odd, even though sum is 9 (fails 2-gate)
    expect(testDivisibility(27, 6).passes).toBe(false);

    // 14: even, but sum is 5 (fails 3-gate)
    expect(testDivisibility(14, 6).passes).toBe(false);
  });
});
