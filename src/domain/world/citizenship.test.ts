import { describe, expect, it } from 'vitest';
import { DUTIES, RIGHTS, SITUATIONS, dutyFor, isCareful } from './citizenship';

describe('citizenship', () => {
  it('pairs each right with a different duty', () => {
    const duties = RIGHTS.map(dutyFor);
    expect(new Set(duties).size).toBe(RIGHTS.length);
    expect([...duties].sort()).toEqual([...DUTIES].sort());
    expect(dutyFor('vote')).toBe('choose');
    expect(dutyFor('public')).toBe('protect');
  });

  it('has exactly one careful action per situation', () => {
    for (const s of SITUATIONS) {
      expect(s.actions.filter((a) => isCareful(s.id, a))).toEqual([s.careful]);
    }
    expect(isCareful('tap', 'closeTap')).toBe(true);
    expect(isCareful('wrapper', 'hideIt')).toBe(false);
  });

  it('fails fast on an action that is not offered', () => {
    expect(() => isCareful('tap', 'binIt')).toThrow();
  });
});
