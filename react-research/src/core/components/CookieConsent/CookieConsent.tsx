import React from 'react';
import CookieConsentComponent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';

const CookieConsent: React.FC = () => {
    const { t } = useTranslation();

    return (
        <CookieConsentComponent
            location="bottom"
            buttonText="OK"
            cookieName="Banner"
            style={{ backgroundColor: 'black', color: 'white' }}
            buttonStyle={{ backgroundColor: 'white', color: 'black' }}
            expires={150}
        >
            {t('cookieBanner.content')}
        </CookieConsentComponent>
    );
};

export default CookieConsent;
