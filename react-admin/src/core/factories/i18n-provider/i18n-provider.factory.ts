import polyglotI18nProvider from 'ra-i18n-polyglot';
import translateMessages from '../../translations/translates';

const i18nProviderFactory = () => {
    return polyglotI18nProvider((locale: string) => translateMessages[locale], 'de');
};

export default i18nProviderFactory;
