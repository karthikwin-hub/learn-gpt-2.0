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
import { createNotebookScreen } from './ui/components/screens/notebook';
import { createPrashnaScreen } from './ui/components/screens/prashna';
import { createRectScreen } from './ui/components/screens/rect';
import { createDrumsScreen } from './ui/components/screens/drums';
import { createShareScreen } from './ui/components/screens/share';
import { createRopeScreen } from './ui/components/screens/rope';
import { createKolamScreen } from './ui/components/screens/kolam';
import { createSetsScreen } from './ui/components/screens/sets';
import { createLogicScreen } from './ui/components/screens/logic';
import { createPlaceScreen } from './ui/components/screens/place';
import { createRomanScreen } from './ui/components/screens/roman';
import { createFractionsScreen } from './ui/components/screens/fractions';
import { createCollectionScreen } from './ui/components/screens/collection';
import { createDecimalsScreen } from './ui/components/screens/decimals';
import { createRegroupScreen } from './ui/components/screens/regroup';
import { createEstimateScreen } from './ui/components/screens/estimate';
import { createQuotitionScreen } from './ui/components/screens/quotition';
import { createLongdivScreen } from './ui/components/screens/longdiv';
import { createWordprobScreen } from './ui/components/screens/wordprob';
import { createFactorsScreen } from './ui/components/screens/factors';
import { createPrimesScreen } from './ui/components/screens/primes';
import { createDivisibilityScreen } from './ui/components/screens/divisibility';
import { createHcfScreen } from './ui/components/screens/hcf';
import { createAnglesScreen } from './ui/components/screens/angles';
import { createShearScreen } from './ui/components/screens/shear';
import { createCubenetScreen } from './ui/components/screens/cubenet';
import { createMoneyScreen } from './ui/components/screens/money';
import { createDigestScreen } from './ui/components/screens/digest';
import { createRampScreen } from './ui/components/screens/ramp';
import { createShadowScreen } from './ui/components/screens/shadow';
import { createSeedScreen } from './ui/components/screens/seed';
import { createBalanceScreen } from './ui/components/screens/balance';
import { createTimelineScreen } from './ui/components/screens/timeline';
import { createEarthScreen } from './ui/components/screens/earth';
import { createMapScreen } from './ui/components/screens/map';
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
  router.register(createNotebookScreen());
  router.register(createGrownupsScreen());

  // Lesson engine & 7-stage rhythm screens
  router.register(createWonderScreen());
  router.register(createPrashnaScreen());
  router.register(createBodhaScreen());
  router.register(createFilmScreen());
  router.register(createRectScreen());
  router.register(createDrumsScreen());
  router.register(createShareScreen());
  router.register(createRopeScreen());
  router.register(createKolamScreen());
  router.register(createSetsScreen());
  router.register(createLogicScreen());
  router.register(createPlaceScreen());
  router.register(createRomanScreen());
  router.register(createFractionsScreen());
  router.register(createCollectionScreen());
  router.register(createDecimalsScreen());
  router.register(createRegroupScreen());
  router.register(createEstimateScreen());
  router.register(createQuotitionScreen());
  router.register(createLongdivScreen());
  router.register(createWordprobScreen());
  router.register(createFactorsScreen());
  router.register(createPrimesScreen());
  router.register(createDivisibilityScreen());
  router.register(createHcfScreen());
  router.register(createAnglesScreen());
  router.register(createShearScreen());
  router.register(createCubenetScreen());
  router.register(createMoneyScreen());
  router.register(createDigestScreen());
  router.register(createRampScreen());
  router.register(createShadowScreen());
  router.register({ ...createShadowScreen(), id: 'sundial' });
  router.register(createSeedScreen());
  router.register(createBalanceScreen());
  router.register(createTimelineScreen());
  router.register(createEarthScreen());
  router.register({ ...createEarthScreen(), id: 'seasons' });
  router.register(createMapScreen());
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
