import { describe, expect, it } from 'vitest';
import {
  createBlocks,
  getRegion,
  getRegionCounts,
  sameSort,
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
});
