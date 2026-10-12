import { describe, expect, it } from 'vitest';
import {
  createBlocks,
  getRegion,
  getRegionCounts,
  classifyVennRegion,
  verifyVennSum,
  sameSort,
  evaluateRuleHypothesis,
  generateMysteryVennPuzzle,
  checkAllPuzzleRegions,
  SET_RULES,
  type AttributeBlock,
} from './sets';

describe('sets domain math', () => {
  it('creates exactly 12 attribute blocks', () => {
    const blocks = createBlocks();
    expect(blocks).toHaveLength(12);
    expect(blocks[0]).toEqual({
      id: 0,
      shape: 'circle',
      colour: 'yellow',
      size: 'big',
    });
  });

  it('correctly evaluates all attribute rules', () => {
    const block: AttributeBlock = {
      id: 99,
      shape: 'triangle',
      colour: 'green',
      size: 'small',
    };

    expect(SET_RULES.triangle(block)).toBe(true);
    expect(SET_RULES.circle(block)).toBe(false);
    expect(SET_RULES.green(block)).toBe(true);
    expect(SET_RULES.yellow(block)).toBe(false);
    expect(SET_RULES.small(block)).toBe(true);
    expect(SET_RULES.big(block)).toBe(false);
  });

  it('classifies blocks into 4 Venn regions (yellow and circle)', () => {
    const blocks = createBlocks();
    // Yellow circle big: both
    expect(getRegion(blocks[0]!, 'yellow', 'circle')).toBe('both');
    // Green circle big: in circle only -> b
    expect(getRegion(blocks[2]!, 'yellow', 'circle')).toBe('b');
    // Yellow square big: in yellow only -> a
    expect(getRegion(blocks[4]!, 'yellow', 'circle')).toBe('a');
    // Green square small: neither -> none
    expect(getRegion(blocks[5]!, 'yellow', 'circle')).toBe('none');
  });

  it('tallies regional counts summing to 12', () => {
    const blocks = createBlocks();
    const counts = getRegionCounts(blocks, 'yellow', 'circle');
    expect(counts.both + counts.a + counts.b + counts.none).toBe(12);
    expect(counts.both).toBe(2); // circle yellow big, circle yellow small
    expect(counts.a).toBe(2); // square yellow big, triangle yellow small
    expect(counts.b).toBe(2); // circle green big, circle black small
    expect(counts.none).toBe(6);
  });

  it('identifies identical rule partitions with sameSort', () => {
    const blocks = createBlocks();
    expect(sameSort(blocks, 'yellow', 'circle', 'yellow', 'circle')).toBe(true);
    expect(sameSort(blocks, 'yellow', 'circle', 'green', 'big')).toBe(false);
  });

  it('classifies boolean predicates into Venn regions', () => {
    expect(classifyVennRegion(true, true)).toBe('both');
    expect(classifyVennRegion(true, false)).toBe('a');
    expect(classifyVennRegion(false, true)).toBe('b');
    expect(classifyVennRegion(false, false)).toBe('none');
  });

  it('verifies Venn sum matching total', () => {
    const counts = { both: 2, a: 2, b: 2, none: 6 };
    expect(verifyVennSum(counts, 12)).toBe(true);
    expect(verifyVennSum(counts, 10)).toBe(false);
  });

  it('evaluates rule hypothesis and finds violations', () => {
    const blocks = createBlocks();
    const greenBlocks = blocks.filter((b) => b.colour === 'green');
    const nonGreenBlocks = blocks.filter((b) => b.colour !== 'green');

    // Correct hypothesis: 'green'
    const match = evaluateRuleHypothesis(greenBlocks, nonGreenBlocks, 'green');
    expect(match.matches).toBe(true);
    expect(match.violations).toHaveLength(0);

    // Flawed hypothesis: 'triangle' (fails because circles and squares are also in greenBlocks)
    const mismatch = evaluateRuleHypothesis(greenBlocks, nonGreenBlocks, 'triangle');
    expect(mismatch.matches).toBe(false);
    expect(mismatch.violations.length).toBeGreaterThan(0);
  });

  it('generates mystery Venn puzzles and checks solutions', () => {
    const puzzle = generateMysteryVennPuzzle(1);
    expect(puzzle.ruleA).toBe('green');
    expect(puzzle.ruleB).toBe('big');
    expect(puzzle.blocks).toHaveLength(12);

    expect(checkAllPuzzleRegions(puzzle, 'green', 'big')).toBe(true);
    expect(checkAllPuzzleRegions(puzzle, 'yellow', 'small')).toBe(false);

    const puzzle2 = generateMysteryVennPuzzle(2);
    expect(puzzle2.ruleA).toBe('yellow');
    expect(puzzle2.ruleB).toBe('triangle');

    const puzzle3 = generateMysteryVennPuzzle(3);
    expect(puzzle3.ruleA).toBe('circle');
    expect(puzzle3.ruleB).toBe('small');
  });
});
