/**
 * Robust Service Worker for Gurukul Shell offline caching.
 */

const CACHE_NAME = 'gurukul-shell-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/src/ui/components/theme/tokens.css',
  '/src/ui/components/theme/shell.css',
  '/fonts/NotoSans-Regular.ttf',
  '/fonts/NotoSansDevanagari-Regular.ttf',
  '/fonts/NotoSansTelugu-Regular.ttf',
  '/fonts/NotoSansBengali-Regular.ttf',
  '/fonts/NotoSansTamil-Regular.ttf',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(CORE_ASSETS.map((url) => cache.add(url)));
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          return (await caches.match('/index.html')) || (await caches.match('/'));
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      })
  );
});
