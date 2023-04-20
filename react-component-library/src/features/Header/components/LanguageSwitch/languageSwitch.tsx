import React, { useState, useEffect } from 'react';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { useTranslation } from 'react-i18next';
import { Typography, Link, withStyles } from '@material-ui/core';

import LanguageService from '../../../../utils/LanguageService';
import {
  getLanguageRoute,
  getLanguageOptionIcon,
} from '../../../../utils/language-helper';
import './language-switcher.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LanguageSwitch: React.FC<any> = ({
  platform,
  className,
  localizations,
}: {
  platform: string;
  className: string;
  localizations: {
    main: any[];
    options: any[];
    availableLanguages: string[];
  };
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('de');
  const strapiLanguage = LanguageService.getCurrentStrapiLanguage();
  const currentLanguage = LanguageService.getCurrentLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  const selectedLanguageClass = (lang: string, anchorEl?: boolean) => {
    return `${strapiLanguage.toLocaleLowerCase()}` === lang || anchorEl
      ? `language-switch__lang language-switch__lang--${platform} language-switch__lang--selected-${platform}`
      : `language-switch__lang language-switch__lang--${platform}`;
  };

  const mobileClass = (isMobile?: boolean) => {
    return isMobile ? `language-switch__lang--mobile` : '';
  };

  const handleClick = () => {
    const anchorEl = document.querySelector('header');
    setAnchorEl(anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderLanguageOptions = (option: any, isMobile?: boolean) => {
    const lang = option.value.toLocaleLowerCase();
    const optionObj = getLanguageObject(lang, option.icon, true);

    return (
      <Link
        tabIndex={0}
        key={optionObj.value}
        href={getLanguageRoute(option)}
        hrefLang={optionObj.hrefLang}
        aria-label={optionObj.ariaLabel}
        className={`${selectedLanguageClass(optionObj.value)} ${mobileClass(
          isMobile,
        )}`}
      >
        <svg
          viewBox="0 0 28 30"
          dangerouslySetInnerHTML={{ __html: optionObj.icon }}
        ></svg>
      </Link>
    );
  };

  const getLanguageObject = (
    lang: string,
    icon?: string,
    options?: boolean,
  ) => {
    const locale = lang.toLocaleLowerCase();
    if (options)
      return {
        value: lang,
        hrefLang: t(`language.${locale}.hrefLang`),
        ariaLabel: t(`language.${locale}.ariaLabel`),
        icon: getLanguageOptionIcon(icon),
      };
    return {
      value: lang,
      label: t(`language.${locale}.label`),
      hrefLang: t(`language.${locale}.hrefLang`),
      ariaLabel: t(`language.${locale}.ariaLabel`),
    };
  };

  const renderMenuItem = (lang: any) => {
    const routeObj = getLanguageObject(lang.value);
    const route = getLanguageRoute(
      lang,
      localizations.availableLanguages,
      true,
    );

    return (
      <li
        className="language-switch__menu__item"
        key={routeObj.value}
        tabIndex={-1}
      >
        {route ? (
          <Link
            variant="h4"
            tabIndex={0}
            href={route}
            hrefLang={routeObj.hrefLang}
            aria-label={routeObj.ariaLabel}
            className={'language-switch__language'}
          >
            {routeObj.label}
          </Link>
        ) : (
          <Typography
            component={'p'}
            variant={'h4'}
            className={
              'language-switch__language language-switch__language--selected'
            }
          >
            {routeObj.label}
          </Typography>
        )}
      </li>
    );
  };

  const StyledMenu = withStyles({
    paper: {
      left: '0 !important',
      width: '100%',
      right: 0,
      maxWidth: '100%',
      borderRadius: 0,
      boxShadow: 'none',
      outlineColor: 'transparent !important',
    },
  })((props: MenuProps) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  return (
    <div className={`language-switch ${className}`}>
      {/* Toggle Languages */}
      <button
        className={`button-reset ${selectedLanguageClass(
          '',
          Boolean(anchorEl),
        )} ${mobileClass(true)}`}
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Typography component={'p'} variant={'h4'}>
          {selectedLanguage}
        </Typography>
      </button>

      {/* Language Options (default language / simple language / sign language) */}
      {localizations.options &&
        localizations.options.map((option) => {
          return renderLanguageOptions(option);
        })}

      {/* Languages Menu */}
      <StyledMenu
        className={`language-switch__menu language-switch__menu--${platform} `}
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {localizations.main &&
          localizations.main.map((lang) => {
            return renderMenuItem(lang);
          })}
        <li
          className={`language-switch__menu__item language-switch__menu__item--options`}
          tabIndex={-1}
        >
          {/* Language Options (default language / simple language / sign language) mobile */}
          {localizations.options &&
            localizations.options.map((option) => {
              return renderLanguageOptions(option, true);
            })}
        </li>
      </StyledMenu>
    </div>
  );
};

export default LanguageSwitch;
