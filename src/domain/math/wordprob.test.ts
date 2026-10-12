import { describe, it, expect } from 'vitest';
import { classifyRootAction, evaluateProblemModel, buildComparisonGap } from './wordprob';

describe('word problem action modeling domain logic (A3)', () => {
  it('correctly maps root physical actions to arithmetic operators', () => {
    expect(classifyRootAction('combine')).toBe('+');
    expect(classifyRootAction('compare')).toBe('-');
    expect(classifyRootAction('separate')).toBe('-');
    expect(classifyRootAction('replicate')).toBe('×');
    expect(classifyRootAction('partition')).toBe('÷');
  });

  it('correctly evaluates all four mathematical operators', () => {
    expect(evaluateProblemModel(24, 6, '+')).toBe(30);
    expect(evaluateProblemModel(24, 6, '-')).toBe(18);
    expect(evaluateProblemModel(24, 6, '×')).toBe(144);
    expect(evaluateProblemModel(24, 6, '÷')).toBe(4);
  });

  it('throws descriptive error on division by zero', () => {
    expect(() => evaluateProblemModel(10, 0, '÷')).toThrow('Division by zero');
  });

  it('correctly models comparison gap subtraction', () => {
    const gap = buildComparisonGap(40, 15);
    expect(gap.difference).toBe(25);
    expect(gap.equation).toBe('40 - 15 = 25');
  });

  it('throws when smaller quantity exceeds larger quantity in comparison gap', () => {
    expect(() => buildComparisonGap(15, 40)).toThrow('Larger quantity must be greater');
  });
});
