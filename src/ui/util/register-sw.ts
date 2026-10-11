/**
 * Service Worker registration helper.
 */

export function registerServiceWorker(): void {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    location.protocol.startsWith('http')
  ) {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  }
}
