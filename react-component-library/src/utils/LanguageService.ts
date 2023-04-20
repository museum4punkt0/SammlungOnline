import i18next from 'i18next';

const defaultLanguage = 'de';

class LanguageService {
  static getDefaultLanguage(): string {
    return defaultLanguage;
  }

  static getCurrentStrapiLanguage(): string {
    return i18next.language || defaultLanguage;
  }

  static getCurrentLanguage(): string {
    const searchLang = i18next.language?.split('-')[0];
    return searchLang || defaultLanguage;
  }
}

export default LanguageService;
