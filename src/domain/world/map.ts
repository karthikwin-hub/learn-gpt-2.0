/**
 * Domain module: Maps, cardinal directions, coordinates, and scale (E4)
 * See docs/rules/WORLD_RULES.md
 */

export type CompassDir = 'N' | 'E' | 'S' | 'W';

export interface CourtyardLayout {
  readonly cols: number;
  readonly rows: number;
  readonly places: {
    readonly gate: readonly [number, number];
    readonly well: readonly [number, number];
    readonly tulsi: readonly [number, number];
    readonly tree: readonly [number, number];
    readonly house: readonly (readonly [number, number])[];
  };
}

export const DIRS: Record<CompassDir, readonly [number, number]> = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
} as const;

export const COURTYARD: CourtyardLayout = {
  cols: 8,
  rows: 6,
  places: {
    gate: [1, 5],
    well: [6, 1],
    tulsi: [3, 2],
    tree: [1, 1],
    house: [
      [4, 3],
      [5, 3],
      [4, 4],
      [5, 4],
    ],
  },
} as const;

/**
 * Moves one step in a cardinal direction.
 */
export function step(at: readonly [number, number], dir: CompassDir): [number, number] {
  const d = DIRS[dir];
  if (!d) {
    throw new Error('Unknown direction: ' + dir);
  }
  return [at[0] + d[0], at[1] + d[1]];
}

/**
 * Generates coordinate path from a sequence of directional moves.
 */
export function walk(
  start: readonly [number, number],
  moves: readonly CompassDir[]
): [number, number][] {
  const path: [number, number][] = [[start[0], start[1]]];
  for (const m of moves) {
    const current = path[path.length - 1];
    if (current) {
      path.push(step(current, m));
    }
  }
  return path;
}

/**
 * Checks whether a given grid cell is blocked (by courtyard boundary walls or the house).
 */
export function isBlocked(c: number, r: number): boolean {
  if (c < 0 || r < 0 || c >= COURTYARD.cols || r >= COURTYARD.rows) {
    return true;
  }
  return COURTYARD.places.house.some((h) => h[0] === c && h[1] === r);
}

/**
 * Converts map grid squares traversed to real-world ground distance.
 * Invariant: Distance is always calculated by multiplication, never addition.
 */
export function realDistance(squares: number, metresPerSquare: number): number {
  return squares * metresPerSquare;
}
