/**
 * Banned words and gamification checks for Gurukul.
 * Enforces Calm Pedagogical Feedback invariant (US5-AS1):
 * strictly zero praise words, points, stars, streaks, or timer pressure.
 */

export const BANNED_WORDS: Record<string, string[]> = {
  en: [
    'great',
    'good job',
    'smart',
    'bravo',
    'well done',
    'awesome',
    'excellent',
    'superb',
    'streak',
    'point',
    'points',
    'star',
    'stars',
    'score',
    'coins',
    'badge',
    'trophy',
  ],
  hi: [
    'शाबाश',
    'बहुत अच्छा',
    'बढ़िया',
    'शानदार',
    'अंक',
    'पॉइंट्स',
    'स्टार',
    'तारे',
    'स्कोर',
    'स्ट्रिक',
  ],
  te: ['మంచి పని', 'చాలా బాగుంది', 'గొప్పది', 'పాయింట్లు', 'నక్షత్రాలు', 'స్కోరు', 'స్ట్రీక్'],
  bn: ['দারুণ', 'সাবাশ', 'খুব ভালো', 'পয়েন্ট', 'স্টার', 'তারা', 'স্কোর', 'স্ট্রিক'],
  ta: ['நன்று', 'மிக நன்று', 'அருமை', 'புள்ளிகள்', 'நட்சத்திரங்கள்', 'மதிப்பெண்', 'ஸ்ட்ரீக்'],
};

export interface BannedWordsCheckResult {
  valid: boolean;
  violations: string[];
}

/**
 * Checks a string against the banned words list for a language (or across all languages).
 */
export function checkBannedWords(text: string, lang?: string): BannedWordsCheckResult {
  const normalized = text.toLowerCase();
  const violations: string[] = [];

  const wordLists = lang && BANNED_WORDS[lang] ? [BANNED_WORDS[lang]] : Object.values(BANNED_WORDS);

  for (const list of wordLists) {
    for (const word of list) {
      // Check word boundaries for English / Latin words
      const isLatin = /^[a-z\s]+$/i.test(word);
      const pattern = isLatin ? new RegExp(`\\b${word}\\b`, 'i') : new RegExp(word, 'i');

      if (pattern.test(normalized)) {
        violations.push(word);
      }
    }
  }

  return {
    valid: violations.length === 0,
    violations: Array.from(new Set(violations)),
  };
}
