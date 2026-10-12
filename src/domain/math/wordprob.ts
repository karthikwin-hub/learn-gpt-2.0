/**
 * Domain logic for Knot A3: Which Operation? (Word Problem Action Modeling)
 *
 * Maps story situations to physical root actions (Combine, Compare, Replicate, Partition)
 * and busts misleading keyword heuristics.
 */

export type RootAction = 'combine' | 'compare' | 'separate' | 'replicate' | 'partition';
export type MathOperator = '+' | '-' | '×' | '÷';

export interface TapeDiagramBar {
  label: string;
  value: number;
}

export interface ProblemModel {
  id: string;
  story: string;
  action: RootAction;
  operator: MathOperator;
  a: number;
  b: number;
  result: number;
  tapeDiagram: {
    type: 'parts-whole' | 'comparison' | 'equal-groups' | 'shares';
    bars: TapeDiagramBar[];
  };
}

/**
 * Maps a physical root action to its standard mathematical operator.
 */
export function classifyRootAction(action: RootAction): MathOperator {
  switch (action) {
    case 'combine':
      return '+';
    case 'compare':
    case 'separate':
      return '-';
    case 'replicate':
      return '×';
    case 'partition':
      return '÷';
  }
}

/**
 * Evaluates an arithmetic expression given two operands and an operator.
 */
export function evaluateProblemModel(a: number, b: number, operator: MathOperator): number {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
  }
}

/**
 * Models a comparison situation measuring the gap between two amounts.
 * e.g., 40 m pole vs 15 m pole -> 40 - 15 = 25 m difference gap.
 */
export function buildComparisonGap(
  larger: number,
  smaller: number
): { difference: number; equation: string } {
  if (larger < smaller) {
    throw new Error('Larger quantity must be greater than or equal to smaller');
  }
  const difference = larger - smaller;
  return {
    difference,
    equation: `${larger} - ${smaller} = ${difference}`,
  };
}
