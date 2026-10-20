import { describe, expect, it } from 'vitest';
import { DUG, isOlder, kindOf, layerOf, oldestOf } from './sources';

describe('sources and dig layers (I1)', () => {
  it('an inscription is writing, but an archaeological source', () => {
    expect(kindOf('inscription')).toBe('archaeological');
    expect(kindOf('manuscript')).toBe('literary');
    expect(kindOf('diary')).toBe('literary');
  });

  it('deeper finds are older', () => {
    expect(isOlder('seal', 'coin')).toBe(true);
    expect(isOlder('coin', 'pot')).toBe(false);
  });

  it('orders the dug finds oldest first by taking the deepest each time', () => {
    const left = [...DUG];
    const order: string[] = [];
    while (left.length) {
      const next = oldestOf(left);
      order.push(next);
      left.splice(left.indexOf(next), 1);
    }
    expect(order).toEqual(['seal', 'pot', 'inscription', 'coin']);
  });

  it('a written source has no layer', () => {
    expect(() => layerOf('diary')).toThrow(/no layer/);
    expect(() => oldestOf([])).toThrow();
  });
});
