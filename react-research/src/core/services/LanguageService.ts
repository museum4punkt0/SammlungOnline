import i18next from 'i18next';

class LanguageService {
    static getCurrentLanguage(): string {
        return i18next.language || 'de';
    }
}

export default LanguageService;
