/**
 * Topbar chrome controller: back button, language sheet toggle, and night theme toggle.
 */

import { storage } from '../../../persistence/storage';
import { router } from '../app/router';
import { openLanguageSheet } from './language-sheet';

export function initTopbar(): void {
  const backBtn = document.getElementById('btn-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      router.back();
    });
  }

  const langBtn = document.getElementById('btn-lang');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      openLanguageSheet();
    });
  }

  const themeBtn = document.getElementById('btn-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }

  applyTheme();
}

export function toggleTheme(): void {
  const currentTheme = storage.get<'day' | 'night'>('theme', 'day');
  const nextTheme = currentTheme === 'night' ? 'day' : 'night';
  storage.set('theme', nextTheme);
  applyTheme();
}

export function applyTheme(): void {
  const theme = storage.get<'day' | 'night'>('theme', 'day');
  document.documentElement.setAttribute('data-theme', theme);
  if (typeof document !== 'undefined' && document.body) {
    document.body.setAttribute('data-theme', theme);
  }
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'night' ? '#171A21' : '#F6F1E7');
  }
}
