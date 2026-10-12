/**
 * Pure domain model for mathematical logic and marble gates (threads L1–L4).
 * Boolean operations, input truth combinations, and marble routing paths.
 */

export type GateType = 'and' | 'or' | 'not';
export type RouteOutcome = 'yes' | 'no';
export type RouteCheckpoint = 'A' | 'B' | RouteOutcome;

export const GATE_TYPES: readonly GateType[] = ['and', 'or', 'not'] as const;

export function evaluateAndGate(a: boolean, b: boolean): boolean {
  return a && b;
}

export function evaluateOrGate(a: boolean, b: boolean): boolean {
  return a || b;
}

export function evaluateNotGate(a: boolean): boolean {
  return !a;
}

export interface TruthTableRow {
  inputs: boolean[];
  output: boolean;
}

export function generateTruthTable(gateType: 'AND' | 'OR' | 'NOT' | GateType): TruthTableRow[] {
  const norm = gateType.toLowerCase() as GateType;
  if (norm === 'not') {
    return [
      { inputs: [false], output: true },
      { inputs: [true], output: false },
    ];
  }
  const combinations: [boolean, boolean][] = [
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ];
  return combinations.map(([a, b]) => ({
    inputs: [a, b],
    output: norm === 'and' ? evaluateAndGate(a, b) : evaluateOrGate(a, b),
  }));
}

/**
 * Evaluate the logical output of a gate given boolean inputs.
 */
export function evalGate(type: GateType, a: boolean, b: boolean = false): boolean {
  switch (type) {
    case 'and':
      return a && b;
    case 'or':
      return a || b;
    case 'not':
      return !a;
    default:
      throw new Error(`Unknown gate type: ${type}`);
  }
}

/**
 * Return canonical truth table input rows for the given gate.
 */
export function getGateInputs(type: GateType): [boolean, boolean][] | [boolean][] {
  if (type === 'not') {
    return [[false], [true]];
  }
  return [
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ];
}

/**
 * Determine the route a dropped marble takes through doors A and B.
 *
 * AND: through door A, then door B; any closed door deflects into "no".
 * OR: tries door A; if open -> "yes"; if closed, rolls across to try door B.
 * NOT: an open door A dumps it into "no"; a closed door deflects it to "yes".
 */
export function getMarbleRoute(type: GateType, a: boolean, b: boolean = false): RouteCheckpoint[] {
  if (type === 'and') {
    if (!a) return ['A', 'no'];
    if (!b) return ['A', 'B', 'no'];
    return ['A', 'B', 'yes'];
  }
  if (type === 'or') {
    if (a) return ['A', 'yes'];
    if (b) return ['A', 'B', 'yes'];
    return ['A', 'B', 'no'];
  }
  // NOT gate:
  return a ? ['A', 'no'] : ['A', 'yes'];
}

/**
 * Get route key string for lookup in route coordinates.
 */
export function getRouteKey(type: GateType, a: boolean, b: boolean = false): string {
  return getMarbleRoute(type, a, b).join(',');
}

/**
 * Generate string key for a truth table row: "a,b" or "a".
 */
export function getRowKey(type: GateType, a: boolean, b: boolean = false): string {
  return type === 'not' ? String(a) : `${a},${b}`;
}

/**
 * Check if all required rows for a gate have been tested in the truth table.
 */
export function isTableComplete(type: GateType, recordedRows: Record<string, boolean>): boolean {
  const allInputs = getGateInputs(type);
  return allInputs.every((inp) => {
    const k = getRowKey(type, inp[0], inp[1] ?? false);
    return recordedRows[k] !== undefined;
  });
}
