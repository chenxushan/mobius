import { initBackToTop } from './ui/back-to-top';
import { initCopyCode } from './ui/code-copy';
import { initMenu } from './ui/menu';
import { initSearch } from './ui/search';
import { initThemeToggle } from './ui/theme';
import { initZoomImage } from './ui/zoom';

export function initApp() {
  initMenu();
  initThemeToggle();
  initSearch();
  initZoomImage();
  initCopyCode();
  initBackToTop();
}

initApp();
document.addEventListener('astro:page-load', initApp);
