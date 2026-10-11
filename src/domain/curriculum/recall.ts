/**
 * Pure domain module: Interleaved spaced recall generator.
 * Selects past knots for gentle retrieval practice based on spaced repetition intervals.
 * Never imports UI or persistence. (ARCHITECTURE.md §4)
 */

export interface KnotHistoryEntry {
  knotId: string;
  completedAt: number; // timestamp in ms
  reviewCount?: number;
  lastReviewedAt?: number;
}

export interface RecallRecommendation {
  knotId: string;
  reason: 'due_review' | 'deepen' | 'starter';
  priority: number;
}

export interface RecallPlan {
  recommendations: RecallRecommendation[];
  promptKey: string;
}

const ONE_HOUR = 3600 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

/**
 * Computes spaced retrieval priority for a knot.
 * Higher priority = more urgent to review.
 */
export function computeRecallPriority(entry: KnotHistoryEntry, now: number = Date.now()): number {
  const lastTime = entry.lastReviewedAt || entry.completedAt;
  const elapsed = Math.max(0, now - lastTime);
  const reviews = Math.max(0, entry.reviewCount || 0);

  // Ideal interval doubles with each successful review: 1 day, 2 days, 4 days, 8 days...
  const targetInterval = ONE_DAY * Math.pow(2, Math.min(reviews, 4));

  // If elapsed exceeds target interval, urgency is >= 1.0
  const ratio = elapsed / targetInterval;
  return Number(ratio.toFixed(3));
}

/**
 * Evaluates completion history and produces recommended return questions.
 */
export function generateReturnQuestions(
  history: KnotHistoryEntry[],
  options: { now?: number; maxSuggestions?: number } = {}
): RecallPlan {
  const now = options.now ?? Date.now();
  const maxSuggestions = options.maxSuggestions ?? 3;

  if (!history || history.length === 0) {
    return {
      recommendations: [],
      promptKey: 'recall.starter',
    };
  }

  // Deduplicate by knotId keeping most recent
  const map = new Map<string, KnotHistoryEntry>();
  for (const item of history) {
    const existing = map.get(item.knotId);
    if (!existing || item.completedAt > existing.completedAt) {
      map.set(item.knotId, item);
    }
  }

  const entries = Array.from(map.values());

  const scored: RecallRecommendation[] = entries.map((entry) => {
    const priority = computeRecallPriority(entry, now);
    const reason: RecallRecommendation['reason'] =
      priority >= 1.0 ? 'due_review' : entry.reviewCount ? 'deepen' : 'starter';

    return {
      knotId: entry.knotId,
      reason,
      priority,
    };
  });

  // Sort descending by priority (highest urgency first)
  scored.sort((a, b) => b.priority - a.priority);

  const recommendations = scored.slice(0, maxSuggestions);

  const top = recommendations[0];
  const promptKey = top && top.priority >= 1.0 ? 'recall.returnPrompt' : 'recall.continuePrompt';

  return {
    recommendations,
    promptKey,
  };
}
