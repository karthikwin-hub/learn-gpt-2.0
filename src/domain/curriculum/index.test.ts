import { describe, it, expect } from 'vitest';
import { DOMAIN_CURRICULUM } from './index';

describe('src/domain/curriculum', () => {
  it('exports curriculum domain identifier', () => {
    expect(DOMAIN_CURRICULUM).toBe('curriculum');
  });
});
