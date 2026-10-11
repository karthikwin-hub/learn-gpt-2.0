import { describe, it, expect } from 'vitest';
import { DOMAIN_SCIENCE } from './index';

describe('src/domain/science', () => {
  it('exports science domain identifier', () => {
    expect(DOMAIN_SCIENCE).toBe('science');
  });
});
