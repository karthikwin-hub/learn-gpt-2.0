/**
 * Main application entrypoint
 */

export function initApp(): void {
  const root = document.getElementById('app');
  if (root) {
    root.setAttribute('data-app-ready', 'true');
    root.innerHTML = `
      <main class="app-root" id="view">
        <h1 class="app-title">Gurukul</h1>
      </main>
    `;
  }
}

initApp();
