/**
 * Storage adapter with 'gurukul:' prefix and JSON serialization.
 * Complies with DPDP Act 2023: zero PII.
 */

export const STORAGE_PREFIX = 'gurukul:';

export interface StorageAdapter {
  get<T>(key: string, fallback: T): T;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clearAll(): void;
  keys(): string[];
}

const reported = new Set<string>();

/* Storage can be blocked or full; the app keeps working in memory, but the failure must be visible. */
function report(op: string, err: unknown): void {
  if (reported.has(op)) return;
  reported.add(op);
  console.warn(`gurukul storage ${op} failed; progress may not be saved`, err);
}

export const storage: StorageAdapter = {
  get<T>(key: string, fallback: T): T {
    try {
      if (typeof localStorage === 'undefined') return fallback;
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      if (raw === null) return fallback;
      try {
        return JSON.parse(raw) as T;
      } catch {
        // Fallback for unquoted raw strings (e.g. from init scripts)
        return raw as unknown as T;
      }
    } catch (err) {
      report('read', err);
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (err) {
      report('write', err);
    }
  },

  remove(key: string): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (err) {
      report('remove', err);
    }
  },

  clearAll(): void {
    try {
      if (typeof localStorage === 'undefined') return;
      const allKeys = Object.keys(localStorage);
      for (const k of allKeys) {
        if (k.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(k);
        }
      }
    } catch (err) {
      report('clear', err);
    }
  },

  keys(): string[] {
    try {
      if (typeof localStorage === 'undefined') return [];
      return Object.keys(localStorage)
        .filter((k) => k.startsWith(STORAGE_PREFIX))
        .map((k) => k.slice(STORAGE_PREFIX.length));
    } catch (err) {
      report('list', err);
      return [];
    }
  },
};
