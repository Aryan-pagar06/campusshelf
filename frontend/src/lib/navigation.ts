/**
 * Lightweight client-side router navigation helper
 * Preserves browser history and triggers popstate updates
 */
export function navigateTo(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
