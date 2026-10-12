import { describe, expect, it } from 'vitest';
import {
  PRESET_CLAIMS,
  findCounterexample,
  verifyUniversalStatement,
  formatDisproof,
} from './counterexample';

describe('counterexample domain math', () => {
  it('identifies 14 as counterexample for ends-in-4-div-4', () => {
    const claim = PRESET_CLAIMS['ends-in-4-div-4']!;
    const result = findCounterexample(claim);

    expect(result.holds).toBe(false);
    expect(result.counterexample).toBe(14);
    expect(result.passedExamples).toEqual([4]);
  });

  it('identifies 2 as counterexample for primes-are-odd', () => {
    const claim = PRESET_CLAIMS['primes-are-odd']!;
    const result = findCounterexample(claim);

    expect(result.holds).toBe(false);
    expect(result.counterexample).toBe(2);
    expect(result.passedExamples).toHaveLength(0);
  });

  it('identifies 0 as counterexample for mult-makes-bigger', () => {
    const claim = PRESET_CLAIMS['mult-makes-bigger']!;
    const result = findCounterexample(claim);

    expect(result.holds).toBe(false);
    expect(result.counterexample).toBe(0);
  });

  it('verifies universal statement holding when no counterexample exists', () => {
    const isEven = (n: number) => n % 2 === 0;
    const evens = [2, 4, 6, 8, 10];
    const result = verifyUniversalStatement(isEven, evens);

    expect(result.holds).toBe(true);
    expect(result.counterexample).toBeUndefined();
    expect(result.passedCount).toBe(5);
  });

  it('verifies universal statement failing when counterexample exists', () => {
    const isEven = (n: number) => n % 2 === 0;
    const mixed = [2, 4, 5, 8];
    const result = verifyUniversalStatement(isEven, mixed);

    expect(result.holds).toBe(false);
    expect(result.counterexample).toBe(5);
    expect(result.passedCount).toBe(2);
  });

  it('formats clean disproof message', () => {
    const msg = formatDisproof('All primes are odd', 2);
    expect(msg).toBe('Disproved: "All primes are odd" fails for 2!');
  });
});
