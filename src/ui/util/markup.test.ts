import { describe, it, expect } from 'vitest';
import { markupLine } from './markup';

describe('markupLine (FR-005)', () => {
  it('renders struck and highlighted parts as elements, never as HTML', () => {
    const line = markupLine('<s>2,5000</s> → <r>2,05,000</r> <img src=x>');
    expect(line.querySelector('s')?.textContent).toBe('2,5000');
    expect(line.querySelector('.r')?.textContent).toBe('2,05,000');
    expect(line.querySelector('img')).toBeNull();
    expect(line.textContent).toBe('2,5000 → 2,05,000 <img src=x>');
  });
});
