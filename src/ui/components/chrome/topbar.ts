/**
 * Topbar chrome controller: back button, language sheet toggle, night theme toggle, and sound toggle.
 */

import { t } from '../../../domain/i18n/core';
import { storage } from '../../../persistence/storage';
import { clear, svg } from '../../util/dom';
import { router } from '../app/router';
import { voice } from '../voice/voice';
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

  const soundBtn = document.getElementById('btn-sound');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const nextSound = !voice.enabled;
      voice.setEnabled(nextSound);
      updateSoundButton(soundBtn, nextSound);
    });
    updateSoundButton(soundBtn, voice.enabled);
  }

  applyTheme();
}

function updateSoundButton(btn: HTMLElement, isEnabled: boolean): void {
  btn.setAttribute('aria-pressed', String(isEnabled));
  btn.style.opacity = isEnabled ? '1' : '0.4';
  btn.setAttribute('aria-label', isEnabled ? t('topbar.soundOff') : t('topbar.soundOn'));
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

  const themeBtn = document.getElementById('btn-theme');
  if (themeBtn) {
    const isNight = theme === 'night';
    themeBtn.setAttribute('aria-label', isNight ? t('topbar.themeLight') : t('topbar.themeDark'));
    clear(themeBtn);
    if (isNight) {
      const icon = svg('svg', {
        viewBox: '0 0 24 24',
        width: '24',
        height: '24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
      });
      icon.appendChild(svg('circle', { cx: '12', cy: '12', r: '5' }));
      icon.appendChild(
        svg('path', {
          d: 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
        })
      );
      themeBtn.appendChild(icon);
    } else {
      const moon = svg('svg', {
        viewBox: '0 0 24 24',
        width: '24',
        height: '24',
        fill: 'currentColor',
      });
      moon.appendChild(
        svg('path', {
          d: 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z',
        })
      );
      themeBtn.appendChild(moon);
    }
  }
}
