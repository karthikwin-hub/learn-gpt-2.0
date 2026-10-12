/**
 * Domain module for conditionals, implication, and converse fallacy (Knot L3).
 * Explores P -> Q forward truth vs Q -> P converse fallacy, nested subset rings,
 * and counterexample disproofs.
 */

export interface ConditionalRuleItem {
  name: string;
  p: boolean;
  q: boolean;
}

export interface ConditionalStatement {
  id: string;
  premise: string;
  conclusion: string;
  forwardTrue: boolean;
  conversePremise: string;
  converseConclusion: string;
  converseTrue: boolean;
  counterexamples: string[];
  outerRingLabel: string;
  innerRingLabel: string;
  innerItems: string[];
  outerItems: string[];
}

export const PRESET_CONDITIONALS: readonly ConditionalStatement[] = [
  {
    id: 'dogs-legs',
    premise: 'An animal is a dog',
    conclusion: 'It has 4 legs',
    forwardTrue: true,
    conversePremise: 'An animal has 4 legs',
    converseConclusion: 'It is a dog',
    converseTrue: false,
    counterexamples: ['Cat', 'Cow', 'Tiger', 'Horse'],
    outerRingLabel: 'Four-legged animals',
    innerRingLabel: 'Dogs',
    innerItems: ['Labrador', 'Beagle', 'Poodle'],
    outerItems: ['Cat', 'Cow', 'Tiger', 'Horse'],
  },
  {
    id: 'squares-4sides',
    premise: 'A shape is a square',
    conclusion: 'It has 4 sides',
    forwardTrue: true,
    conversePremise: 'A shape has 4 sides',
    converseConclusion: 'It is a square',
    converseTrue: false,
    counterexamples: ['Rectangle', 'Trapezoid', 'Rhombus', 'Kite'],
    outerRingLabel: 'Four-sided shapes (Quadrilaterals)',
    innerRingLabel: 'Squares',
    innerItems: ['Square (2×2)', 'Square (5×5)'],
    outerItems: ['Rectangle', 'Trapezoid', 'Rhombus', 'Kite'],
  },
  {
    id: 'div-10-ends-0',
    premise: 'A number is divisible by 10',
    conclusion: 'It ends in 0',
    forwardTrue: true,
    conversePremise: 'A number ends in 0',
    converseConclusion: 'It is divisible by 10',
    converseTrue: true,
    counterexamples: [],
    outerRingLabel: 'Numbers ending in 0',
    innerRingLabel: 'Multiples of 10',
    innerItems: ['10', '20', '50', '100'],
    outerItems: [],
  },
  {
    id: 'rain-wet',
    premise: 'It rains outside',
    conclusion: 'The courtyard ground is wet',
    forwardTrue: true,
    conversePremise: 'The courtyard ground is wet',
    converseConclusion: 'It rained outside',
    converseTrue: false,
    counterexamples: ['Garden hose', 'Water sprinkler', 'Bucket splash'],
    outerRingLabel: 'Wet courtyard ground',
    innerRingLabel: 'Rain puddles',
    innerItems: ['Monsoon rain', 'Drizzle'],
    outerItems: ['Garden hose', 'Water sprinkler', 'Bucket splash'],
  },
] as const;

/**
 * Classical material conditional (P -> Q).
 * False only when premise P is true and conclusion Q is false.
 */
export function evaluateConditional(p: boolean, q: boolean): boolean {
  if (p && !q) {
    return false;
  }
  return true;
}

/**
 * Checks whether the converse (Q -> P) holds universally across all items.
 * If any domain item has Q=true and P=false, the converse is invalid.
 */
export function isConverseValid(rules: readonly ConditionalRuleItem[]): boolean {
  return !rules.some((item) => item.q && !item.p);
}

/**
 * Checks if every element of subsetP is contained within setQ (P ⊆ Q).
 */
export function testImplicationSubset<T>(subsetP: readonly T[], setQ: readonly T[]): boolean {
  const setQItems = new Set(setQ);
  return subsetP.every((item) => setQItems.has(item));
}

/**
 * Find counterexamples that disprove the converse statement Q -> P.
 */
export function findConverseCounterexamples(statement: ConditionalStatement): string[] {
  return [...statement.counterexamples];
}

/**
 * Returns preset conditional statement by ID.
 */
export function getConditionalStatement(id: string): ConditionalStatement {
  const stmt = PRESET_CONDITIONALS.find((s) => s.id === id);
  if (!stmt) {
    throw new Error(`Unknown conditional statement: ${id}`);
  }
  return stmt;
}
