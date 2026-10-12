import { afterEach, describe, expect, it, vi } from 'vitest';
import { storage } from './storage';

describe('046 storage failures are reported, not swallowed (FR-007)', () => {
  afterEach(() => vi.restoreAllMocks());

  it('keeps working and warns once when the browser refuses to save', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => storage.set('a', 1)).not.toThrow();
    storage.set('b', 2);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0]?.[0])).toContain('write');
  });

  it('returns the fallback and warns when reading is blocked', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    expect(storage.get('x', 'fallback')).toBe('fallback');
    expect(warn).toHaveBeenCalled();
  });
});
