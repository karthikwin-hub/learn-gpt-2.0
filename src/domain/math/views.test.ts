import { describe, it, expect } from 'vitest';
import {
  projectOrthographicViews,
  generateTopView,
  generateFrontView,
  generateSideView,
  countBlocks,
  STRUCTURE_PRESETS,
} from './views';

describe('orthographic perspective views domain logic', () => {
  it('correctly projects vertical tower onto top, front, and side views', () => {
    // 3 blocks stacked vertically at x=1, y=1, z=0, 1, 2
    const tower = [
      { x: 1, y: 1, z: 0 },
      { x: 1, y: 1, z: 1 },
      { x: 1, y: 1, z: 2 },
    ];
    const views = projectOrthographicViews(tower, 3, 3, 3);

    // Top view: only 1 square occupied at (1, 1), with height 3
    expect(views.top[1]?.[1]).toBe(true);
    expect(views.top[0]?.[0]).toBe(false);
    expect(views.topHeightMap[1]?.[1]).toBe(3);

    // Front view: column x=1 occupied across all z (0, 1, 2)
    expect(views.front[0]?.[1]).toBe(true);
    expect(views.front[1]?.[1]).toBe(true);
    expect(views.front[2]?.[1]).toBe(true);
    expect(views.front[0]?.[0]).toBe(false);

    // Side view: column y=1 occupied across all z (0, 1, 2)
    expect(views.side[0]?.[1]).toBe(true);
    expect(views.side[1]?.[1]).toBe(true);
    expect(views.side[2]?.[1]).toBe(true);
    expect(views.side[0]?.[0]).toBe(false);
  });

  it('proves staircase top view collapses vertical steps into a flat line', () => {
    const stair = STRUCTURE_PRESETS.find((p) => p.id === 'staircase')!;
    expect(stair).toBeDefined();

    const top = generateTopView(stair.blocks, 3, 3);
    // At y=1, columns x=0, 1, 2 are all occupied
    expect(top[1]?.[0]).toBe(true);
    expect(top[1]?.[1]).toBe(true);
    expect(top[1]?.[2]).toBe(true);
    // Looking straight down, there are NO vertical drops: just a row of 3 squares!
    expect(top[0]?.[0]).toBe(false);
    expect(top[2]?.[2]).toBe(false);

    const front = generateFrontView(stair.blocks, 3, 3);
    // Front view shows the steps: x=0 has height 1, x=1 has height 2, x=2 has height 3
    expect(front[0]?.[0]).toBe(true);
    expect(front[1]?.[0]).toBe(false); // z=1 at x=0 is empty
    expect(front[1]?.[1]).toBe(true);
    expect(front[2]?.[1]).toBe(false); // z=2 at x=1 is empty
    expect(front[2]?.[2]).toBe(true);
  });

  it('correctly generates side views and handles boundary coordinates', () => {
    const stair = STRUCTURE_PRESETS.find((p) => p.id === 'staircase')!;
    const side = generateSideView(stair.blocks, 3, 3);

    // From the side, looking through depth y=1, height reaches z=0, 1, 2
    expect(side[0]?.[1]).toBe(true);
    expect(side[1]?.[1]).toBe(true);
    expect(side[2]?.[1]).toBe(true);
  });

  it('counts active blocks accurately', () => {
    expect(countBlocks([])).toBe(0);
    const tower = STRUCTURE_PRESETS.find((p) => p.id === 'tower')!;
    expect(countBlocks(tower.blocks)).toBe(3);
  });

  it('ignores out-of-bounds blocks gracefully', () => {
    const badBlocks = [
      { x: -1, y: 0, z: 0 },
      { x: 5, y: 1, z: 1 },
      { x: 1, y: 1, z: 1 },
    ];
    const views = projectOrthographicViews(badBlocks, 3, 3, 3);
    expect(views.top[1]?.[1]).toBe(true);
    expect(views.top[0]?.[0]).toBe(false);
  });
});
