import { describe, it, expect } from 'vitest';
import { DOMAIN_I18N } from './index';

describe('src/domain/i18n', () => {
  it('exports i18n domain identifier', () => {
    expect(DOMAIN_I18N).toBe('i18n');
  });
});
