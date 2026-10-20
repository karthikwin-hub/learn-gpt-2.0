import { describe, expect, it } from 'vitest';
import {
  LANDFORM_TARGETS,
  LAND_HEIGHTS,
  LAND_TOPS,
  MAIN_LANDFORMS,
  MOST_PEOPLE_LIVE_ON,
  landformOf,
} from './landforms';

describe('landforms', () => {
  it('needs both height and top to name a landform', () => {
    expect(landformOf('high', 'flat')).toBe('plateau');
    expect(landformOf('high', 'peaked')).toBe('mountain');
    expect(landformOf('low', 'flat')).toBe('plain');
    expect(landformOf('low', 'peaked')).toBe('hill');
  });

  it('high land is not always a mountain', () => {
    const highForms = LAND_TOPS.map((top) => landformOf('high', top));
    expect(highForms).toContain('plateau');
    expect(highForms).toContain('mountain');
  });

  it('every target can be built from the two controls', () => {
    const buildable = LAND_HEIGHTS.flatMap((h) => LAND_TOPS.map((tp) => landformOf(h, tp)));
    for (const t of LANDFORM_TARGETS) expect(buildable).toContain(t);
    expect([...LANDFORM_TARGETS].sort()).toEqual([...MAIN_LANDFORMS].sort());
    expect(MOST_PEOPLE_LIVE_ON).toBe('plain');
  });
});
