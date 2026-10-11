/**
 * Main application entrypoint for Gurukul (Learn GPT 2.0).
 */

import { setLang } from './domain/i18n/core';
import { storage } from './persistence/storage';
import { router } from './ui/components/app/router';
import { initLanguageSheet } from './ui/components/chrome/language-sheet';
import { initTopbar } from './ui/components/chrome/topbar';
import { createAshramScreen } from './ui/components/screens/ashram';
import { createJaalScreen } from './ui/components/screens/jaal';
import { createLanguageScreen } from './ui/components/screens/language';
import { createOpeningScreen } from './ui/components/screens/opening';
import { createShalaScreen } from './ui/components/screens/shala';
import { registerServiceWorker } from './ui/util/register-sw';

export function initApp(): void {
  // 1. Language preference restored from storage
  const savedLang = storage.get<string | null>('lang', null);
  setLang(savedLang || 'en', true);

  // 2. Initialize Chrome UI
  initTopbar();
  initLanguageSheet();

  // 3. Register screens
  router.register(createOpeningScreen());
  router.register(createLanguageScreen());
  router.register(createAshramScreen());
  router.register(createShalaScreen());
  router.register(createJaalScreen());

  // 4. Register service worker for offline shell
  registerServiceWorker();

  // 5. Determine initial start route
  const hash = typeof location !== 'undefined' ? location.hash : '';
  const startRoute = savedLang ? 'home' : 'opening';

  if (!hash || hash === '#' || hash === '#/') {
    router.replace(startRoute);
  }

  router.start(startRoute);

  const root = document.getElementById('app');
  if (root) {
    root.setAttribute('data-app-ready', 'true');
  }
}

initApp();
