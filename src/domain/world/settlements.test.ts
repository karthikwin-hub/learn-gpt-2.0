import { describe, expect, it } from 'vitest';
import { SITE_IDS, growsInto, siteHas, siteLacks, sizeOverTime } from './settlements';

describe('settlements', () => {
  it('a river bank with water, flat land and trade grows into a city', () => {
    expect(siteHas('riverbank')).toEqual(['water', 'flat', 'travel']);
    expect(growsInto('riverbank')).toBe('city');
  });

  it('a dry hilltop far from roads stays empty and lacks all three', () => {
    expect(growsInto('hilltop')).toBe('none');
    expect(siteLacks('hilltop')).toEqual(['water', 'flat', 'travel']);
  });

  it('two needs make a town and one a village', () => {
    expect(growsInto('crossroads')).toBe('town');
    expect(growsInto('lakeside')).toBe('town');
    expect(growsInto('valley')).toBe('village');
    expect(growsInto('sandy')).toBe('village');
  });

  it('only one of the six sites becomes a city', () => {
    expect(SITE_IDS.filter((s) => growsInto(s) === 'city')).toEqual(['riverbank']);
  });

  it('the river bank grows from a village to a town to a city over time', () => {
    expect(sizeOverTime(0)).toBe('village');
    expect(sizeOverTime(0.5)).toBe('town');
    expect(sizeOverTime(1)).toBe('city');
  });
});
