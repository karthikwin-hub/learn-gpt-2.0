import { describe, it, expect, beforeEach } from 'vitest';
import { pothi } from './pothi';
import { storage } from './storage';

describe('src/persistence/pothi', () => {
  beforeEach(() => {
    storage.clearAll();
  });

  it('saves and retrieves notebook pages', () => {
    expect(pothi.getPages()).toEqual([]);

    const saved = pothi.savePage({
      thread: 'M4',
      fills: ['tens', 'room', 'add'],
      model: { cols: 23, rows: 14 },
      route: 'rect',
    });

    expect(saved.id).toBeDefined();
    expect(saved.thread).toBe('M4');
    expect(pothi.getPages().length).toBe(1);
    expect(pothi.getPages()[0]?.fills).toEqual(['tens', 'room', 'add']);
  });

  it('manages kept sutras with deduplication', () => {
    expect(pothi.getSutras()).toEqual([]);

    pothi.saveSutra('M4');
    pothi.saveSutra('M4'); // duplicate
    pothi.saveSutra('D1');

    expect(pothi.getSutras()).toEqual(['M4', 'D1']);

    pothi.removeSutra('M4');
    expect(pothi.getSutras()).toEqual(['D1']);
  });

  it('clears pages and sutras when requested', () => {
    pothi.savePage({ thread: 'M4', fills: [] });
    pothi.saveSutra('M4');

    expect(pothi.getPages().length).toBe(1);
    expect(pothi.getSutras().length).toBe(1);

    pothi.clearAll();

    expect(pothi.getPages()).toEqual([]);
    expect(pothi.getSutras()).toEqual([]);
  });
});
