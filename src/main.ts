/**
 * Main application entrypoint for Gurukul (Learn GPT 2.0).
 */

import { setLang } from './domain/i18n/core';
import { storage } from './persistence/storage';
import { router } from './ui/components/app/router';
import { initLanguageSheet } from './ui/components/chrome/language-sheet';
import { initTopbar } from './ui/components/chrome/topbar';
import { createAshramScreen } from './ui/components/screens/ashram';
import { createBodhaScreen } from './ui/components/screens/bodha';
import { createExplainScreen } from './ui/components/screens/explain';
import { createFilmScreen } from './ui/components/screens/film';
import { createJaalScreen } from './ui/components/screens/jaal';
import { createGrownupsScreen } from './ui/components/screens/grownups';
import { createLanguageScreen } from './ui/components/screens/language';
import { createMistakeScreen } from './ui/components/screens/mistake';
import { createOpeningScreen } from './ui/components/screens/opening';
import { createPrashnaScreen } from './ui/components/screens/prashna';
import { createRectScreen } from './ui/components/screens/rect';
import { createDrumsScreen } from './ui/components/screens/drums';
import { createShareScreen } from './ui/components/screens/share';
import { createShalaScreen } from './ui/components/screens/shala';
import { createStopScreen } from './ui/components/screens/stop';
import { createWonderScreen } from './ui/components/screens/wonder';
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
  router.register(createGrownupsScreen());

  // Lesson engine & 7-stage rhythm screens
  router.register(createWonderScreen());
  router.register(createPrashnaScreen());
  router.register(createBodhaScreen());
  router.register(createFilmScreen());
  router.register(createRectScreen());
  router.register(createDrumsScreen());
  router.register(createShareScreen());
  router.register(createMistakeScreen());
  router.register(createExplainScreen());
  router.register(createStopScreen());

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
