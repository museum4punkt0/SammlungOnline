import React, { useEffect, useState } from 'react';
import LanguageService from '../../utils/LanguageService';
import { Typography, withStyles } from '@material-ui/core';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import useStyles from './languageSelector.jss';
import { getLanguageOptionIcon } from '@smb/smb-react-components-library';

export interface ILangItem {
  code: string;
  ariaLabel: string;
  displayName: string;
}

export interface IProps {
  show: boolean;
  className: string;
  languages: Array<ILangItem>;
}

export const LanguageSelector: React.FC<IProps> = ({ show, className, languages }) => {
  const [lang, setLang] = useState(LanguageService.getCurrentLanguage());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    LanguageService.setCurrentLanguage(lang);
  }, [lang]);

  const handleClick = () => {
    const anchorEl = document.querySelector('header');
    setAnchorEl(anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
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

  if (!show) {
    return null;
  }

  return (
    <div className={`${classes.langSelector} ${className}`}>
      <button
        className={classes.selectorButtonNoHover}
        aria-label={'language'}
        onClick={handleClick}
      >
        <Typography component={'p'} variant={'h4'}>
          {lang.toLocaleUpperCase()}
        </Typography>
      </button>
      <button
        className={`${classes.selectorButton} language-switch__lang language-switch__lang--research`}
        onClick={handleClick}
      >
        <svg
          viewBox={'0 0 28 30'}
          dangerouslySetInnerHTML={{ __html: getLanguageOptionIcon('language') }}
        ></svg>
      </button>

      <StyledMenu
        className={`language-switch__menu `}
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map(langItem => {
          return (
            <li
              key={langItem.code}
              role="button"
              aria-pressed={langItem.code === lang}
              onClick={() => {
                setLang(langItem.code);
                handleClose();
              }}
              className={`${classes.langOption} ${langItem.code === lang &&
                classes.currentLang}`}
            >
              <Typography aria-label={langItem.ariaLabel} component={'p'} variant={'h4'}>
                {langItem.displayName}
              </Typography>
            </li>
          );
        })}
      </StyledMenu>
    </div>
  );
};
