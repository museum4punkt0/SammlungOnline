import i18next from 'i18next';

const localStorageKey = 'i18next-lang';
class LanguageService {
  static getCurrentLanguage(): string {
    const stored = localStorage.getItem(localStorageKey);
    const i18lang = i18next.language ?? 'de';
    if (!stored) {
      localStorage.setItem(localStorageKey, i18lang);
      return i18lang;
    }
    i18next.changeLanguage(stored);
    return stored;
  }

  static setCurrentLanguage(lang: string): void {
    localStorage.setItem(localStorageKey, lang);
    i18next.changeLanguage(lang);
  }
}

export default LanguageService;
