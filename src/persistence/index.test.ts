import { describe, it, expect, beforeEach } from 'vitest';
import { STORAGE_PREFIX, storage } from './index';

describe('src/persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('uses gurukul: namespace prefix', () => {
    expect(STORAGE_PREFIX).toBe('gurukul:');
  });

  it('stores and retrieves serialized data', () => {
    storage.set('theme', 'night');
    expect(localStorage.getItem('gurukul:theme')).toBe(JSON.stringify('night'));
    expect(storage.get('theme', 'day')).toBe('night');
  });

  it('returns fallback when key does not exist', () => {
    expect(storage.get('missing', 'default-val')).toBe('default-val');
  });

  it('removes specific keys', () => {
    storage.set('temp', 123);
    expect(storage.get('temp', 0)).toBe(123);
    storage.remove('temp');
    expect(storage.get('temp', 0)).toBe(0);
  });

  it('clears only gurukul: prefixed keys', () => {
    storage.set('key1', 'val1');
    localStorage.setItem('other:key', 'keep');
    storage.clearAll();
    expect(storage.get('key1', null)).toBeNull();
    expect(localStorage.getItem('other:key')).toBe('keep');
  });
});
