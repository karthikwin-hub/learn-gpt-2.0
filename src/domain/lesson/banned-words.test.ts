import { describe, it, expect } from 'vitest';
import { checkBannedWords } from './banned-words';

describe('Domain: banned-words validator (US5-AS1 invariant)', () => {
  it('passes descriptive reality feedback', () => {
    const feedback = 'That makes 24 tiles. 6 columns of 4 rows.';
    const result = checkBannedWords(feedback, 'en');
    expect(result.valid).toBe(true);
    expect(result.violations).toHaveLength(0);
  });

  it('detects English praise and score terms', () => {
    expect(checkBannedWords('Great job! You earned 10 points!', 'en').valid).toBe(false);
    expect(checkBannedWords('Smart! You kept your streak!', 'en').valid).toBe(false);
    expect(checkBannedWords('Bravo! 3 stars!', 'en').valid).toBe(false);
  });

  it('detects Indic language praise terms', () => {
    expect(checkBannedWords('शाबाश! आपने 5 स्टार पाए', 'hi').valid).toBe(false);
    expect(checkBannedWords('చాలా బాగుంది! 10 పాయింట్లు', 'te').valid).toBe(false);
    expect(checkBannedWords('দারুণ! ৫ তারা', 'bn').valid).toBe(false);
    expect(checkBannedWords('நன்று! 10 புள்ளிகள்', 'ta').valid).toBe(false);
  });
});
