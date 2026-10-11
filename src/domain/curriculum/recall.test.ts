import { describe, it, expect } from 'vitest';
import { computeRecallPriority, generateReturnQuestions, type KnotHistoryEntry } from './recall';

describe('src/domain/curriculum/recall', () => {
  const NOW = 1700000000000;
  const ONE_DAY = 24 * 3600 * 1000;

  it('handles empty history gracefully', () => {
    const result = generateReturnQuestions([], { now: NOW });
    expect(result.recommendations).toEqual([]);
    expect(result.promptKey).toBe('recall.starter');
  });

  it('computes higher priority for knots reviewed longer ago', () => {
    const recent: KnotHistoryEntry = {
      knotId: 'M4',
      completedAt: NOW - 2 * 3600 * 1000, // 2 hours ago
      reviewCount: 0,
    };
    const older: KnotHistoryEntry = {
      knotId: 'M2',
      completedAt: NOW - 2 * ONE_DAY, // 2 days ago
      reviewCount: 0,
    };

    const prioRecent = computeRecallPriority(recent, NOW);
    const prioOlder = computeRecallPriority(older, NOW);

    expect(prioOlder).toBeGreaterThan(prioRecent);
    expect(prioOlder).toBeGreaterThanOrEqual(1.0);
  });

  it('orders multiple knots by recall urgency', () => {
    const history: KnotHistoryEntry[] = [
      { knotId: 'M4', completedAt: NOW - 3 * ONE_DAY, reviewCount: 0 },
      { knotId: 'M5', completedAt: NOW - 1 * 3600 * 1000, reviewCount: 0 },
      { knotId: 'D1', completedAt: NOW - 5 * ONE_DAY, reviewCount: 1 },
    ];

    const result = generateReturnQuestions(history, { now: NOW });
    expect(result.recommendations.length).toBe(3);
    expect(result.recommendations[0]?.knotId).toBe('M4'); // 3 days with 0 reviews = 3x target interval
    expect(result.recommendations[0]?.reason).toBe('due_review');
    expect(result.promptKey).toBe('recall.returnPrompt');
  });

  it('limits suggestions based on maxSuggestions option', () => {
    const history: KnotHistoryEntry[] = [
      { knotId: 'M1', completedAt: NOW - 10 * ONE_DAY },
      { knotId: 'M2', completedAt: NOW - 8 * ONE_DAY },
      { knotId: 'M3', completedAt: NOW - 6 * ONE_DAY },
      { knotId: 'M4', completedAt: NOW - 4 * ONE_DAY },
    ];

    const result = generateReturnQuestions(history, { now: NOW, maxSuggestions: 2 });
    expect(result.recommendations.length).toBe(2);
    expect(result.recommendations[0]?.knotId).toBe('M1');
    expect(result.recommendations[1]?.knotId).toBe('M2');
  });

  it('deduplicates history keeping latest record', () => {
    const history: KnotHistoryEntry[] = [
      { knotId: 'M4', completedAt: NOW - 10 * ONE_DAY, reviewCount: 0 },
      { knotId: 'M4', completedAt: NOW - 1 * ONE_DAY, reviewCount: 1 },
    ];

    const result = generateReturnQuestions(history, { now: NOW });
    expect(result.recommendations.length).toBe(1);
    expect(result.recommendations[0]?.knotId).toBe('M4');
  });
});
