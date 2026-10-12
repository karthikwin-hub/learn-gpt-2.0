import { afterEach, describe, expect, it, vi } from 'vitest';
import { readStep } from './bench';

describe('046 bench step from the URL is validated (FR-007)', () => {
  afterEach(() => vi.restoreAllMocks());

  it('uses a whole step inside the range', () => {
    expect(readStep('2', undefined, 3)).toBe(2);
  });

  it('ignores a step that is not a number, out of range or fractional', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(readStep('abc', undefined, 3)).toBe(1);
    expect(readStep('9', 2, 3)).toBe(2);
    expect(readStep('1.5', undefined, 3)).toBe(1);
    expect(readStep('0', undefined, 3)).toBe(1);
    expect(warn).toHaveBeenCalledTimes(4);
  });

  it('falls back to a valid saved step, else step 1', () => {
    expect(readStep(undefined, 3, 3)).toBe(3);
    expect(readStep(undefined, 7, 3)).toBe(1);
    expect(readStep('', 'x', 3)).toBe(1);
  });
});
