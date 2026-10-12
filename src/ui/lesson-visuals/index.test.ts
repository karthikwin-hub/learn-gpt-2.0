import { describe, expect, it } from 'vitest';
import { mergeTables } from './index';

const pic = () => document.createElementNS('http://www.w3.org/2000/svg', 'svg');

describe('046 lesson-visuals registry (FR-002)', () => {
  it('combines a knot’s cards from one group with its mistake picture from another', () => {
    const t = mergeTables({
      A: { G2: { cards: { what: pic } } },
      B: { G2: { mistake: pic } },
    });
    expect(t.G2?.cards?.what).toBe(pic);
    expect(t.G2?.mistake).toBe(pic);
  });

  it('refuses a picture defined by two groups, instead of silently replacing it', () => {
    expect(() =>
      mergeTables({ A: { G2: { cards: { what: pic } } }, B: { G2: { cards: { what: pic } } } })
    ).toThrow(/G2 what figure is defined twice/);
  });
});
