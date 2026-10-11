import { describe, it, expect } from 'vitest';
import { STORAGE_PREFIX } from './index';

describe('src/persistence', () => {
  it('uses gurukul: namespace prefix', () => {
    expect(STORAGE_PREFIX).toBe('gurukul:');
  });
});
