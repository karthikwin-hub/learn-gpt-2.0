import { describe, expect, it } from 'vitest';
import { EAST_FLOWING, WEST_FLOWING, flowsInRiftValley, seaOf } from './plateau';

describe('the peninsular plateau', () => {
  it('sends the Godavari, Krishna and Kaveri east to the Bay of Bengal', () => {
    for (const r of EAST_FLOWING) expect(seaOf(r)).toBe('bengal');
  });

  it('sends the Narmada and Tapi west, in rift valleys', () => {
    for (const r of WEST_FLOWING) {
      expect(flowsInRiftValley(r)).toBe(true);
      expect(seaOf(r)).toBe('arabian');
    }
    expect(flowsInRiftValley('godavari')).toBe(false);
  });
});
