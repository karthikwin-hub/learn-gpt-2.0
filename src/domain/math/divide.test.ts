import { describe, it, expect } from 'vitest';
import { gcd } from './multiply';
import { share, dealSequence, leftoverFraction, factorPairs } from './divide';

describe('domain/math/divide', () => {
  it('computes greatest common divisor correctly', () => {
    expect(gcd(12, 4)).toBe(4);
    expect(gcd(14, 4)).toBe(2);
    expect(gcd(7, 3)).toBe(1);
    expect(gcd(0, 5)).toBe(5);
  });

  it('computes fair share for exact division (D1: 12 over 4)', () => {
    const res = share(12, 4);
    expect(res).toEqual({ each: 3, remainder: 0 });
    expect(4 * res.each + res.remainder).toBe(12);
  });

  it('computes fair share with remainder (D3: 14 over 4)', () => {
    const res = share(14, 4);
    expect(res).toEqual({ each: 3, remainder: 2 });
    expect(4 * res.each + res.remainder).toBe(14);
    expect(res.remainder).toBeLessThan(4);
  });

  it('generates dealing sequence round-and-round with leftover tray assignment', () => {
    // 14 laddoos over 4 plates: 12 dealt across 4 plates (3 rounds of 0,1,2,3), then 2 leftovers (-1, -1)
    const seq = dealSequence(14, 4);
    expect(seq.length).toBe(14);
    expect(seq.slice(0, 4)).toEqual([0, 1, 2, 3]);
    expect(seq.slice(4, 8)).toEqual([0, 1, 2, 3]);
    expect(seq.slice(8, 12)).toEqual([0, 1, 2, 3]);
    expect(seq.slice(12)).toEqual([-1, -1]);
  });

  it('computes and simplifies leftover fraction partitions', () => {
    const f1 = leftoverFraction(2, 4);
    expect(f1).toEqual({ num: 2, den: 4, simpleNum: 1, simpleDen: 2 });

    const f2 = leftoverFraction(3, 6);
    expect(f2).toEqual({ num: 3, den: 6, simpleNum: 1, simpleDen: 2 });

    const f3 = leftoverFraction(0, 4);
    expect(f3).toBeNull();
  });

  it('finds factor pairs representing rectangular floors (D4)', () => {
    const pairs24 = factorPairs(24);
    expect(pairs24).toEqual([
      [1, 24],
      [2, 12],
      [3, 8],
      [4, 6],
    ]);

    const pairsPrime = factorPairs(7);
    expect(pairsPrime).toEqual([[1, 7]]);
  });
});
