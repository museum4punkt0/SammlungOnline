/* eslint-disable no-console */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { resources } from './config/translation';

const defaultLanguage = 'de';

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    debug: false,
    resources,
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
