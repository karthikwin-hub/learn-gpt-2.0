import { describe, it, expect } from 'vitest';
import { executeLongDivisionSteps, verifyLongDivision } from './longdiv';

describe('long division domain logic (D4)', () => {
  it('correctly executes multi-step long division without remainder (824 / 4)', () => {
    const trace = executeLongDivisionSteps(824, 4);
    expect(trace.quotient).toBe(206);
    expect(trace.remainder).toBe(0);
    expect(trace.verified).toBe(true);
    expect(trace.steps).toHaveLength(3);

    // Hundreds step
    expect(trace.steps[0]).toMatchObject({
      stepIndex: 1,
      placeName: 'hundreds',
      workingValue: 8,
      quotientDigit: 2,
      product: 8,
      difference: 0,
      broughtDownDigit: 2,
      isZeroGate: false,
    });

    // Tens step (The Zero Gate!)
    expect(trace.steps[1]).toMatchObject({
      stepIndex: 2,
      placeName: 'tens',
      workingValue: 2,
      quotientDigit: 0,
      product: 0,
      difference: 2,
      broughtDownDigit: 4,
      isZeroGate: true,
    });

    // Ones step
    expect(trace.steps[2]).toMatchObject({
      stepIndex: 3,
      placeName: 'ones',
      workingValue: 24,
      quotientDigit: 6,
      product: 24,
      difference: 0,
      isZeroGate: false,
    });
  });

  it('correctly detects Zero Gate for 612 / 3 = 204', () => {
    const trace = executeLongDivisionSteps(612, 3);
    expect(trace.quotient).toBe(204);
    expect(trace.remainder).toBe(0);
    expect(trace.equation).toBe('612 ÷ 3 = 204');
    expect(trace.steps[1]?.isZeroGate).toBe(true);
    expect(trace.steps[1]?.quotientDigit).toBe(0);
  });

  it('correctly executes long division with remainder (735 / 4 = 183 R 3)', () => {
    const trace = executeLongDivisionSteps(735, 4);
    expect(trace.quotient).toBe(183);
    expect(trace.remainder).toBe(3);
    expect(trace.equation).toBe('735 ÷ 4 = 183 R 3');
    expect(trace.verified).toBe(true);
  });

  it('verifies inverse multiplication equation', () => {
    expect(verifyLongDivision(612, 3, 204, 0)).toBe(true);
    expect(verifyLongDivision(735, 4, 183, 3)).toBe(true);
    // Invalid remainder >= divisor
    expect(verifyLongDivision(735, 4, 182, 7)).toBe(false);
    // Incorrect quotient
    expect(verifyLongDivision(612, 3, 24, 0)).toBe(false);
  });

  it('throws descriptive error on invalid inputs', () => {
    expect(() => executeLongDivisionSteps(612, 0)).toThrow('Divisor must be greater than zero');
    expect(() => executeLongDivisionSteps(-10, 2)).toThrow('Dividend must be non-negative');
  });
});
