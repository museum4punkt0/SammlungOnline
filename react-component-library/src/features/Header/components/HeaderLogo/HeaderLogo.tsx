import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@material-ui/core';
import { ReactComponent as SmbLogo } from '../../assets/smb-logo.svg';
import LanguageService from '../../../../utils/LanguageService';

import useStyles from './headerLogo.jss';
import { IHeaderLogoProps } from '../../types/interfaces';

const HeaderLogo: React.FC<IHeaderLogoProps> = ({ color, link, ...props }) => {
  const { t } = useTranslation();
  const classes = useStyles({ color })();

  const getCurrentLocale = () => {
    const defaultLang = 'de';
    const lang = LanguageService.getCurrentStrapiLanguage();
    const currentLocale = link;

    if (currentLocale.includes(`/${lang}`)) return currentLocale;
    if (lang !== defaultLang && currentLocale !== '/') {
      return `${currentLocale}/${lang}`;
    } else if (lang !== defaultLang) {
      return `${currentLocale}${lang}`;
    }
    return currentLocale;
  };

  return (
    <Link
      className={classes.logoLink}
      href={getCurrentLocale()}
      aria-label={t('header.logo')}
      {...props}
    >
      <SmbLogo className={classes.logo} fill={color} />
    </Link>
  );
};

export default HeaderLogo;
