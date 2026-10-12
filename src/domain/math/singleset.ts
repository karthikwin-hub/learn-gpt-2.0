/**
 * Pure domain logic for Sort by a Rule (Single Set & Universe of Discourse) (Knot S1).
 *
 * Core concepts:
 * - A set is a well-defined collection where membership is determined by an invariant rule.
 * - Universe of Discourse (U): every object either strictly belongs INSIDE or stays OUTSIDE.
 * - No fuzzy in-between ("on the line").
 * - Kunal's misconception: inventing extra exclusions (15 ends in 5, so belongs inside 'ends in 5' regardless of divisibility by 3).
 */

export interface SetItem {
  id: string;
  label: string;
  kind: 'number' | 'shape';
  value?: number;
  sides?: number;
  color?: 'red' | 'blue' | 'yellow';
}

export interface SetRuleDefinition {
  id: string;
  name: string;
  description: string;
  test: (item: SetItem) => boolean;
}

export const SINGLE_SET_RULES: Record<string, SetRuleDefinition> = {
  'multiples-of-5': {
    id: 'multiples-of-5',
    name: 'Multiples of 5',
    description: 'Numbers that divide evenly by 5 (0, 5, 10, 15, 20...)',
    test: (item) => typeof item.value === 'number' && item.value % 5 === 0,
  },
  'ends-in-5': {
    id: 'ends-in-5',
    name: 'Numbers Ending in 5',
    description: 'Numbers whose last digit is 5 (5, 15, 25, 35...)',
    test: (item) => typeof item.value === 'number' && Math.abs(item.value) % 10 === 5,
  },
  'even-numbers': {
    id: 'even-numbers',
    name: 'Even Numbers',
    description: 'Numbers divisible by 2 (2, 4, 6, 8, 10...)',
    test: (item) => typeof item.value === 'number' && item.value % 2 === 0,
  },
  'four-sides': {
    id: 'four-sides',
    name: 'Four-Sided Shapes',
    description: 'Geometric figures with exactly 4 straight sides (quadrilaterals)',
    test: (item) => item.kind === 'shape' && item.sides === 4,
  },
  'red-color': {
    id: 'red-color',
    name: 'Red Color',
    description: 'Items that are colored red',
    test: (item) => item.color === 'red',
  },
};

/**
 * Validates whether a ruleId is recognized.
 */
export function validateSetRule(ruleId: string): boolean {
  return ruleId in SINGLE_SET_RULES;
}

/**
 * Tests whether an item belongs inside the set defined by ruleId.
 */
export function testRuleMembership(item: SetItem, ruleId: string): boolean {
  const rule = SINGLE_SET_RULES[ruleId];
  if (!rule) return false;
  return rule.test(item);
}

/**
 * Partitions a collection of items into inside (satisfies rule) and outside (fails rule).
 */
export function partitionSet(
  items: SetItem[],
  ruleId: string
): { inside: SetItem[]; outside: SetItem[] } {
  const inside: SetItem[] = [];
  const outside: SetItem[] = [];

  for (const item of items) {
    if (testRuleMembership(item, ruleId)) {
      inside.push(item);
    } else {
      outside.push(item);
    }
  }

  return { inside, outside };
}

export const DEFAULT_UNIVERSE_ITEMS: SetItem[] = [
  { id: 'num-5', label: '5', kind: 'number', value: 5 },
  { id: 'num-15', label: '15', kind: 'number', value: 15 },
  { id: 'num-20', label: '20', kind: 'number', value: 20 },
  { id: 'num-34', label: '34', kind: 'number', value: 34 },
  { id: 'num-42', label: '42', kind: 'number', value: 42 },
  { id: 'shape-square', label: 'Square', kind: 'shape', sides: 4, color: 'blue' },
  { id: 'shape-triangle', label: 'Triangle', kind: 'shape', sides: 3, color: 'red' },
  { id: 'shape-rect', label: 'Rectangle', kind: 'shape', sides: 4, color: 'red' },
  { id: 'shape-circle', label: 'Circle', kind: 'shape', sides: 0, color: 'yellow' },
];
