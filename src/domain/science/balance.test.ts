import { describe, it, expect } from 'vitest';
import { calculateBalanceTilt, isBalanced } from './balance';

describe('balance domain module (K1 Two-Pan Balance)', () => {
  it('detects balanced equilibrium when masses are equal', () => {
    expect(calculateBalanceTilt(10, 10)).toBe(0);
    expect(isBalanced(10, 10)).toBe(true);
  });

  it('tilts toward the heavier side within max angle bounds', () => {
    // right heavier -> positive tilt
    const rightTilt = calculateBalanceTilt(5, 10);
    expect(rightTilt).toBeGreaterThan(0);
    expect(isBalanced(5, 10)).toBe(false);

    // left heavier -> negative tilt
    const leftTilt = calculateBalanceTilt(10, 5);
    expect(leftTilt).toBeLessThan(0);
    expect(isBalanced(10, 5)).toBe(false);

    // extreme difference clamped to 25 degrees
    expect(calculateBalanceTilt(0, 100)).toBe(25);
    expect(calculateBalanceTilt(100, 0)).toBe(-25);
  });

  it('applies tare calibration offset', () => {
    // left is 8g, but with +2g tare, balances with 10g right
    expect(calculateBalanceTilt(8, 10, 2)).toBe(0);
    expect(isBalanced(8, 10, 2)).toBe(true);
  });
});
