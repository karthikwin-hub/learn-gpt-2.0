/**
 * Domain module: sources of history and layers of a dig (I1).
 * See docs/rules/WORLD_RULES.md
 */

export type SourceKind = 'archaeological' | 'literary';

export type ClueId = 'coin' | 'inscription' | 'pot' | 'seal' | 'manuscript' | 'diary';

export interface Clue {
  readonly id: ClueId;
  readonly kind: SourceKind;
  /** Layer of the dig it was found in, 1 = top. Written sources are read, not dug. */
  readonly layer?: number;
}

export const DIG_LAYERS = 4;

export const CLUES: readonly Clue[] = [
  { id: 'coin', kind: 'archaeological', layer: 1 },
  { id: 'inscription', kind: 'archaeological', layer: 2 },
  { id: 'pot', kind: 'archaeological', layer: 3 },
  { id: 'seal', kind: 'archaeological', layer: 4 },
  { id: 'manuscript', kind: 'literary' },
  { id: 'diary', kind: 'literary' },
];

export const SOURCE_KINDS: readonly SourceKind[] = ['archaeological', 'literary'];

function clue(id: ClueId): Clue {
  const c = CLUES.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown clue: ${id}`);
  return c;
}

export function kindOf(id: ClueId): SourceKind {
  return clue(id).kind;
}

export function layerOf(id: ClueId): number {
  const layer = clue(id).layer;
  if (layer === undefined) throw new Error(`${id} is read, not dug: it has no layer`);
  return layer;
}

export const DUG: readonly ClueId[] = CLUES.filter((c) => c.layer !== undefined).map((c) => c.id);

/**
 * Layers settle one on top of another, so in an undisturbed dig a deeper find is older.
 */
export function isOlder(a: ClueId, b: ClueId): boolean {
  return layerOf(a) > layerOf(b);
}

/** The oldest of the finds still to be ordered: the one from the deepest layer. */
export function oldestOf(ids: readonly ClueId[]): ClueId {
  if (ids.length === 0) throw new Error('No finds to order');
  return ids.reduce((a, b) => (isOlder(b, a) ? b : a));
}
