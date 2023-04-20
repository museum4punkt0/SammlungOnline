/* eslint-disable no-console */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { resources } from './config/translation';

const langDetector: any = {
  name: 'langDetector',

  lookup() {
    const allowedLang = ['de-LS', 'de-DGS', 'en', 'en-SL', 'en-ASL'];
    let found;
    if (typeof window !== 'undefined') {
      const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      if (language instanceof Array) {
        const firstParam = language[0].replace('/', '');

        if (allowedLang.includes(firstParam)) {
          found = firstParam;
        }
      }
    }
    return found;
  },
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(langDetector);

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    detection: { order: ['langDetector'], caches: [] },
    resources,
    fallbackLng: 'de',
    cache: {
      store: null,
    },
    debug: false,
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    //   // useLocalStorage: false,
    // },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      wait: true,
    },
  });

export default i18n;
