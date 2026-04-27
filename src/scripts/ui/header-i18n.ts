import { getStoredLang, setStoredLang, t } from '../lib/i18n';
import type { Lang } from '../../data/i18n';

const navKeyByPath: Record<string, Parameters<typeof t>[1]> = {
  '/': 'home',
  '/about/': 'about',
  '/contact/': 'contact',
  '/tags/': 'tags',
  '/elements/': 'elements',
  '/photos/': 'photos',
  '/videos/': 'videos',
};

function applyTranslations(lang: Lang): void {
  document.querySelectorAll<HTMLAnchorElement>('.nav__link').forEach((el) => {
    const href = el.getAttribute('href');
    if (!href) return;

    const normalizedPath = new URL(href, window.location.origin).pathname;
    const key = navKeyByPath[normalizedPath];
    if (key) {
      el.textContent = t(lang, key);
    }
  });

  const menuTitle = document.querySelector('.nav__title');
  if (menuTitle) {
    menuTitle.textContent = t(lang, 'menu');
  }

  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.textContent = lang === 'en' ? '中' : 'EN';
    langBtn.setAttribute('title', lang === 'en' ? '切换到中文' : 'Switch to English');
  }

  document.documentElement.lang = lang;
}

export function initHeaderI18n(): void {
  const langButton = document.getElementById('lang-toggle-btn');
  const lang = getStoredLang();
  applyTranslations(lang);

  if (!langButton) return;

  langButton.replaceWith(langButton.cloneNode(true));
  const nextButton = document.getElementById('lang-toggle-btn');

  nextButton?.addEventListener('click', () => {
    const current = getStoredLang();
    const next: Lang = current === 'en' ? 'zh' : 'en';
    setStoredLang(next);
    applyTranslations(next);
  });
}
