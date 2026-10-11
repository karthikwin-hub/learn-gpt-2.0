import { describe, it, expect } from 'vitest';
import { SEED_PARTS, canGerminate, getGerminationStage } from './seed';

describe('seed domain module (J2 Seed Anatomy and Germination)', () => {
  it('defines all four primary seed structures', () => {
    expect(SEED_PARTS.coat).toBeDefined();
    expect(SEED_PARTS.cotyledon).toBeDefined();
    expect(SEED_PARTS.radicle).toBeDefined();
    expect(SEED_PARTS.plumule).toBeDefined();
  });

  it('requires all three conditions (water, air, warmth) to germinate', () => {
    expect(canGerminate({ water: true, air: true, warmth: true })).toBe(true);
    expect(canGerminate({ water: true, air: false, warmth: true })).toBe(false);
    expect(canGerminate({ water: false, air: true, warmth: true })).toBe(false);
    expect(canGerminate({ water: true, air: true, warmth: false })).toBe(false);
  });

  it('progresses through germination stages over time', () => {
    const favorable = { water: true, air: true, warmth: true };
    expect(getGerminationStage(0, favorable)).toBe('dormant');
    expect(getGerminationStage(1, favorable)).toBe('swelling');
    expect(getGerminationStage(3, favorable)).toBe('root');
    expect(getGerminationStage(5, favorable)).toBe('shoot');
  });
});
