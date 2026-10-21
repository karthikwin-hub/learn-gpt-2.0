import { describe, expect, it } from 'vitest';
import { CIVIC_JOBS, GOV_LEVELS, levelForJob, levelOfRepresentative } from './civics';

describe('levels of government (Q1)', () => {
  it('a lane’s streetlight is a local job, not the Prime Minister’s', () => {
    expect(levelForJob('streetlight')).toBe('local');
    expect(levelForJob('garbage')).toBe('local');
  });

  it('police and state highways are state jobs; money and the army are union jobs', () => {
    expect(levelForJob('police')).toBe('state');
    expect(levelForJob('highway')).toBe('state');
    expect(levelForJob('rupee')).toBe('union');
    expect(levelForJob('army')).toBe('union');
  });

  it('every level has two jobs in the bench', () => {
    for (const level of GOV_LEVELS) {
      expect(CIVIC_JOBS.filter((j) => levelForJob(j) === level)).toHaveLength(2);
    }
  });

  it('people elect a sarpanch, an MLA and an MP', () => {
    expect(levelOfRepresentative('sarpanch')).toBe('local');
    expect(levelOfRepresentative('mla')).toBe('state');
    expect(levelOfRepresentative('mp')).toBe('union');
    expect(() => levelForJob('moon' as never)).toThrow();
  });
});
