import { translations, type Lang, type TranslationKey } from '../../data/i18n';

const STORAGE_KEY = 'mobius-lang';

export function getStoredLang(defaultLang: Lang = 'zh'): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'zh') {
      return stored;
    }
  } catch {
    // localStorage might not be available.
  }
  return defaultLang;
}

export function setStoredLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage might not be available.
  }
}

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key];
}
