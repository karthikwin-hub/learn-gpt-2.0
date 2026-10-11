/**
 * Typed persistence helpers for the Pothi (Sacred Notebook) and Kept Sutras.
 * Complies with DPDP Act 2023: zero PII, local storage only.
 */

import { storage } from './storage';

export interface NotebookPage {
  id: string;
  thread: string;
  fills: string[];
  date: string; // ISO date string
  time: number; // timestamp ms
  model?: Record<string, unknown>;
  route?: string;
  params?: Record<string, string>;
}

export const pothi = {
  getPages(): NotebookPage[] {
    const raw = storage.get<NotebookPage[]>('pages', []);
    if (!Array.isArray(raw)) return [];
    return raw;
  },

  savePage(
    entry: Omit<NotebookPage, 'id' | 'date' | 'time'> & {
      id?: string;
      date?: string;
      time?: number;
    }
  ): NotebookPage {
    const pages = pothi.getPages();
    const id = entry.id || String(Date.now());
    const date = entry.date || new Date().toISOString();
    const time = entry.time || Date.now();

    const newPage: NotebookPage = {
      ...entry,
      id,
      date,
      time,
    };

    pages.push(newPage);
    storage.set('pages', pages);
    return newPage;
  },

  getSutras(): string[] {
    const raw = storage.get<string[]>('sutras', []);
    if (!Array.isArray(raw)) return [];
    return raw;
  },

  saveSutra(knotId: string): void {
    const sutras = pothi.getSutras();
    if (!sutras.includes(knotId)) {
      sutras.push(knotId);
      storage.set('sutras', sutras);
    }
  },

  removeSutra(knotId: string): void {
    const sutras = pothi.getSutras().filter((id) => id !== knotId);
    storage.set('sutras', sutras);
  },

  clearAll(): void {
    storage.remove('pages');
    storage.remove('sutras');
  },
};
