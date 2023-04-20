/* eslint-disable no-console */
import React from 'react';
// import { useLocation } from 'react-router-dom';

import {
  Typography,
  Toolbar,
  ButtonBase,
  // Link,
  // SvgIcon,
} from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
// import LanguageService from '../../../../utils/LanguageService';
import LanguageSwitch from '../LanguageSwitch/languageSwitch';

import useStyles from './headerToolbar.jss';
import './headerToolbar.scss';
import { IAppHeaderToolbarProps } from '../../types/interfaces';

const HeaderToolbar: React.FC<IAppHeaderToolbarProps> = (props) => {
  const {
    onMenuOpen,
    color,
    title,
    type,
    shouldDisplayLang,
    logoLink,
    localizations,
  } = props;

  const classes = useStyles(props)();
  const platform = type ? type.toLocaleLowerCase() : '';

  const getToolbarClassName = () => {
    return `header-toolbar header-toolbar--with-lang ${classes.toolbar}`;
  };

  return (
    <Toolbar className={getToolbarClassName()}>
      <div className={`header-toolbar__item`}>
        <HeaderLogo color={color} link={logoLink} />

        {shouldDisplayLang && (
          <LanguageSwitch
            platform={platform}
            className={classes.languageSwitch}
            localizations={localizations}
          />
        )}
      </div>

      <ButtonBase
        className={`header-toolbar__menu ${classes.menuButtonFocus}`}
        onClick={onMenuOpen}
      >
        <Typography variant="h2" component="h1" className={classes.title}>
          {title}
        </Typography>
        {
          <DehazeIcon
            viewBox="-5 0 24 24"
            className={classes.menuIconArrow}
            fontSize={'large'}
          />
        }
      </ButtonBase>
    </Toolbar>
  );
};

export default HeaderToolbar;
