/**
 * Pure set theory model over attribute blocks (shape × colour × size).
 * Inspired by Zoltán Dienes' logic blocks.
 */

export type BlockShape = 'circle' | 'square' | 'triangle';
export type BlockColour = 'yellow' | 'green' | 'black';
export type BlockSize = 'big' | 'small';

export interface AttributeBlock {
  id: number;
  shape: BlockShape;
  colour: BlockColour;
  size: BlockSize;
}

export type SetRule =
  'yellow' | 'green' | 'black' | 'circle' | 'square' | 'triangle' | 'big' | 'small';

export type VennRegion = 'both' | 'a' | 'b' | 'none';

export interface RegionCounts {
  both: number;
  a: number;
  b: number;
  none: number;
}

export const SET_RULES: Record<SetRule, (b: AttributeBlock) => boolean> = {
  yellow: (it) => it.colour === 'yellow',
  green: (it) => it.colour === 'green',
  black: (it) => it.colour === 'black',
  circle: (it) => it.shape === 'circle',
  square: (it) => it.shape === 'square',
  triangle: (it) => it.shape === 'triangle',
  big: (it) => it.size === 'big',
  small: (it) => it.size === 'small',
};

export const RULE_ORDER: readonly SetRule[] = [
  'yellow',
  'circle',
  'big',
  'green',
  'triangle',
  'small',
  'square',
  'black',
] as const;

/**
 * Generates the canonical set of 12 attribute blocks.
 */
export function createBlocks(): AttributeBlock[] {
  const spec: [BlockShape, BlockColour, BlockSize][] = [
    ['circle', 'yellow', 'big'],
    ['circle', 'yellow', 'small'],
    ['circle', 'green', 'big'],
    ['circle', 'black', 'small'],
    ['square', 'yellow', 'big'],
    ['square', 'green', 'small'],
    ['square', 'black', 'big'],
    ['square', 'green', 'big'],
    ['triangle', 'yellow', 'small'],
    ['triangle', 'green', 'big'],
    ['triangle', 'black', 'big'],
    ['triangle', 'black', 'small'],
  ];
  return spec.map(([shape, colour, size], i) => ({
    id: i,
    shape,
    colour,
    size,
  }));
}

/**
 * Pure predicate classification for Venn membership.
 */
export function classifyVennRegion(inA: boolean, inB: boolean): VennRegion {
  if (inA && inB) return 'both';
  if (inA) return 'a';
  if (inB) return 'b';
  return 'none';
}

/**
 * Classifies an attribute block into one of the 4 Venn regions given ruleA and ruleB.
 */
export function getRegion(block: AttributeBlock, ruleA: SetRule, ruleB: SetRule): VennRegion {
  const inA = SET_RULES[ruleA](block);
  const inB = SET_RULES[ruleB](block);
  return classifyVennRegion(inA, inB);
}

/**
 * Verifies that the sum of all 4 Venn regions matches the expected total.
 */
export function verifyVennSum(counts: RegionCounts, total: number): boolean {
  return counts.both + counts.a + counts.b + counts.none === total;
}

/**
 * Tallies blocks across the 4 Venn regions.
 */
export function getRegionCounts(
  blocks: AttributeBlock[],
  ruleA: SetRule,
  ruleB: SetRule
): RegionCounts {
  const c: RegionCounts = { both: 0, a: 0, b: 0, none: 0 };
  for (const block of blocks) {
    c[getRegion(block, ruleA, ruleB)]++;
  }
  return c;
}

/**
 * Checks whether two pairs of rules partition the given blocks identically.
 */
export function sameSort(
  blocks: AttributeBlock[],
  a1: SetRule,
  b1: SetRule,
  a2: SetRule,
  b2: SetRule
): boolean {
  return blocks.every((it) => getRegion(it, a1, b1) === getRegion(it, a2, b2));
}
