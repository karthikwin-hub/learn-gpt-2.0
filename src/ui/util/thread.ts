/**
 * Thread tracking utility for managing current lesson knot and carry-on state.
 */

import { storage } from '../../persistence/storage';
import type { ThreadContinueState } from '../../domain/lesson/types';

let inMemoryThread: string | null = null;

export function enterThread(
  knotId: string,
  route: string,
  params?: Record<string, string> | null
): void {
  inMemoryThread = knotId;
  const continueState: ThreadContinueState = {
    knot: knotId,
    route,
    params: params || null,
  };
  storage.set('continue', continueState);
}

export function getCurrentThread(): string | null {
  if (inMemoryThread) return inMemoryThread;
  const cont = storage.get<ThreadContinueState | null>('continue', null);
  return cont?.knot || null;
}

export function clearThread(): void {
  inMemoryThread = null;
  storage.set('continue', null);
}
