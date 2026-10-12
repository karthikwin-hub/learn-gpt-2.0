import { describe, it, expect } from 'vitest';
import {
  testRuleMembership,
  partitionSet,
  validateSetRule,
  SINGLE_SET_RULES,
  DEFAULT_UNIVERSE_ITEMS,
} from './singleset';

describe('singleset domain logic (Sort by a Rule & Universe of Discourse)', () => {
  describe('validateSetRule', () => {
    it('recognizes supported rules', () => {
      expect(validateSetRule('multiples-of-5')).toBe(true);
      expect(validateSetRule('ends-in-5')).toBe(true);
      expect(validateSetRule('even-numbers')).toBe(true);
      expect(validateSetRule('four-sides')).toBe(true);
      expect(validateSetRule('unknown-rule')).toBe(false);
    });
  });

  describe('testRuleMembership', () => {
    it('evaluates multiples of 5 correctly (Prashna: 34 is outside)', () => {
      expect(
        testRuleMembership({ id: '1', label: '34', kind: 'number', value: 34 }, 'multiples-of-5')
      ).toBe(false);
      expect(
        testRuleMembership({ id: '2', label: '15', kind: 'number', value: 15 }, 'multiples-of-5')
      ).toBe(true);
      expect(
        testRuleMembership({ id: '3', label: '20', kind: 'number', value: 20 }, 'multiples-of-5')
      ).toBe(true);
    });

    it('evaluates numbers ending in 5 correctly (Kunal: 15 is inside)', () => {
      expect(
        testRuleMembership({ id: '1', label: '15', kind: 'number', value: 15 }, 'ends-in-5')
      ).toBe(true);
      expect(
        testRuleMembership({ id: '2', label: '25', kind: 'number', value: 25 }, 'ends-in-5')
      ).toBe(true);
      expect(
        testRuleMembership({ id: '3', label: '20', kind: 'number', value: 20 }, 'ends-in-5')
      ).toBe(false);
    });

    it('evaluates shape attributes correctly', () => {
      expect(
        testRuleMembership({ id: '1', label: 'Square', kind: 'shape', sides: 4 }, 'four-sides')
      ).toBe(true);
      expect(
        testRuleMembership({ id: '2', label: 'Triangle', kind: 'shape', sides: 3 }, 'four-sides')
      ).toBe(false);
      expect(
        testRuleMembership({ id: '3', label: 'Circle', kind: 'shape', sides: 0 }, 'four-sides')
      ).toBe(false);
    });
  });

  describe('partitionSet', () => {
    it('splits universe items into inside and outside partitions', () => {
      const { inside, outside } = partitionSet(DEFAULT_UNIVERSE_ITEMS, 'multiples-of-5');
      const insideLabels = inside.map((i) => i.label);
      const outsideLabels = outside.map((i) => i.label);

      expect(insideLabels).toEqual(expect.arrayContaining(['5', '15', '20']));
      expect(outsideLabels).toEqual(expect.arrayContaining(['34', '42', 'Square', 'Triangle']));
      expect(inside.length + outside.length).toBe(DEFAULT_UNIVERSE_ITEMS.length);
    });
  });

  describe('SINGLE_SET_RULES definitions', () => {
    it('defines non-empty rule set', () => {
      expect(Object.keys(SINGLE_SET_RULES).length).toBeGreaterThanOrEqual(4);
    });
  });
});
