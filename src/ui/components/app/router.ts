/**
 * Client hash router with in-memory state preservation and screen lifecycle management.
 */

import { t, getLang, LANGS } from '../../../domain/i18n/core';
import type { LessonStage } from '../../../domain/lesson/types';
import { clear } from '../../util/dom';
import { createStageBar } from '../chrome/stage-bar';
import { voice } from '../voice/voice';

export interface ScreenMeta {
  id: string;
  title?: string | ((params: Record<string, string>) => string);
  hideBack?: boolean;
  hideTopbar?: boolean;
  full?: boolean;
  stage?: LessonStage;
  step?: string;
  bench?: boolean;
  render(
    view: HTMLElement,
    state: Record<string, unknown>,
    params: Record<string, string>
  ): (() => void) | void;
}

export interface Route {
  id: string;
  params: Record<string, string>;
}

export interface CurrentRouteInfo {
  id: string;
  params: Record<string, string>;
  screen: ScreenMeta;
  state: Record<string, unknown>;
}

const screens: Record<string, ScreenMeta> = {};
const screenStates: Record<string, Record<string, unknown>> = {};
let currentInfo: CurrentRouteInfo | null = null;
let currentCleanup: (() => void) | null = null;
let navigationDepth = 0;

export function registerScreen(screen: ScreenMeta): void {
  screens[screen.id] = screen;
}

export function parseHash(hashStr?: string): Route {
  const raw = (hashStr ?? (typeof location !== 'undefined' ? location.hash : '')).replace(
    /^#\/?/,
    ''
  );
  const parts = raw.split('?');
  const params: Record<string, string> = {};
  if (parts[1]) {
    for (const kv of parts[1].split('&')) {
      const [k, v] = kv.split('=');
      if (k) {
        params[decodeURIComponent(k)] = decodeURIComponent(v || '');
      }
    }
  }
  return { id: parts[0] || '', params };
}

export function hashFor(id: string, params?: Record<string, string>): string {
  const q = params
    ? Object.entries(params)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&')
    : '';
  return `#/${id}${q ? '?' + q : ''}`;
}

export function getStateKey(id: string, params: Record<string, string>): string {
  return id + (params.mode ? `:${params.mode}` : '') + (params.k ? `:${params.k}` : '');
}

export function renderCurrentRoute(fallbackRoute = 'home'): void {
  const route = parseHash();
  const screen = screens[route.id] || screens[fallbackRoute];
  if (!screen) return;

  if (currentCleanup) {
    try {
      currentCleanup();
    } catch (err) {
      console.error('Cleanup error:', err);
    }
    currentCleanup = null;
  }

  // Stop previous narration and tone playback
  voice.stop();

  const view = document.getElementById('view');
  if (!view) return;

  clear(view);
  view.className = `view${screen.full ? ' full' : ''}`;
  view.scrollTop = 0;

  const stateKey = getStateKey(route.id, route.params);
  const state = (screenStates[stateKey] = screenStates[stateKey] || {});
  currentInfo = { id: route.id, params: route.params, screen, state };

  // Update topbar chrome
  const titleEl = document.getElementById('topbar-title');
  if (titleEl) {
    const titleText =
      typeof screen.title === 'function'
        ? screen.title(route.params)
        : screen.title
          ? t(screen.title)
          : '';
    titleEl.textContent = titleText;
  }

  const backBtn = document.getElementById('btn-back');
  if (backBtn) {
    backBtn.hidden = !!screen.hideBack;
  }

  const topbar = document.getElementById('topbar');
  if (topbar) {
    topbar.style.display = screen.hideTopbar ? 'none' : '';
  }

  const glyphEl = document.getElementById('lang-glyph');
  if (glyphEl) {
    glyphEl.textContent = LANGS[getLang()]?.glyph || 'A';
  }

  const cleanupResult = screen.render(view, state, route.params);
  currentCleanup = typeof cleanupResult === 'function' ? cleanupResult : null;

  // Insert stage movements bar at the top of the lesson view if screen declares a stage
  if (screen.stage) {
    const stageBar = createStageBar(screen.stage, screen.step || '', !!screen.bench);
    view.insertBefore(stageBar, view.firstChild);
  }
}

export const router = {
  register: registerScreen,

  go(id: string, params?: Record<string, string>): void {
    navigationDepth++;
    if (typeof location !== 'undefined') {
      location.hash = hashFor(id, params);
    }
  },

  replace(id: string, params?: Record<string, string>): void {
    if (typeof location !== 'undefined') {
      location.replace(hashFor(id, params));
    }
  },

  back(): void {
    if (navigationDepth > 0 && typeof history !== 'undefined') {
      navigationDepth--;
      history.back();
    } else {
      this.go('home');
    }
  },

  rerender(): void {
    renderCurrentRoute();
  },

  current(): CurrentRouteInfo | null {
    return currentInfo;
  },

  start(initialRoute = 'home'): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', () => {
        renderCurrentRoute(initialRoute);
      });
      renderCurrentRoute(initialRoute);
    }
  },
};
