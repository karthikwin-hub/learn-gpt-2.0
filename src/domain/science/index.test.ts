import { describe, it, expect } from 'vitest';
import { DOMAIN_SCIENCE } from './index';

describe('src/domain/science', () => {
  it('exports science domain identifier and functions', async () => {
    expect(DOMAIN_SCIENCE).toBe('science');
    const sci = await import('./index');
    expect(typeof sci.isValidDigestiveSequence).toBe('function');
    expect(typeof sci.shadowLength).toBe('function');
    expect(typeof sci.rollDistance).toBe('function');
    expect(typeof sci.canGerminate).toBe('function');
    expect(typeof sci.calculateBalanceTilt).toBe('function');
  });
});
