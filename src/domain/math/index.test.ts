import { describe, it, expect } from 'vitest';
import { DOMAIN_MATH } from './index';

describe('src/domain/math', () => {
  it('exports math domain identifier', () => {
    expect(DOMAIN_MATH).toBe('math');
  });
});
