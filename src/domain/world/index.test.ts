import { describe, it, expect } from 'vitest';
import { DOMAIN_WORLD } from './index';

describe('src/domain/world', () => {
  it('exports world domain identifier', () => {
    expect(DOMAIN_WORLD).toBe('world');
  });
});
