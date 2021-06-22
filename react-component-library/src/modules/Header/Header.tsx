import React, { useCallback, useState } from 'react';

import { IConfiguration } from '../../core/config/configuration';

import AppBar from '@material-ui/core/AppBar';
import HeaderToolbar from './components/HeaderToolbar/HeaderToolbar';
import NavigationDrawer from './components/HeaderDrawer/NavigationDrawer';
import HeaderLink from './components/HeaderLink/HeaderLink';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import HeaderLogo from './components/HeaderLogo/HeaderLogo';
import { ButtonBase, Grid } from '@material-ui/core';

import useHeaderLinks from './hooks/use-header-links.hook';

import useStyles from './header.jss';
import useHeaderFadeInOutAnimation from './hooks/use-header-fade-in-out-animation.hook';

export interface IAppHeaderProps {
  configuration: IConfiguration;
}

export interface IHeaderColorPalette {
  main?: string;
  secondary?: string;
}

export type HeaderPaletteHandlers = {
  setMain: (value: string) => void;
  setSecondary: (value: string) => void;
};

export type UseHeaderPaletteResult = {
  main: string;
  secondary: string;
  handlers: HeaderPaletteHandlers;
};

const useHeaderPalette = (palette: IHeaderColorPalette = {}): UseHeaderPaletteResult => {
  const [main, setMain] = useState(palette.main ?? '#ffffff');
  const [secondary, setSecondary] = useState(palette.secondary ?? '#000000');

  return { main, secondary, handlers: { setMain, setSecondary } };
};

export type UseDrawerHandlers = {
  openDrawer: () => void;
  closeDrawer: () => void;
};

type UseDrawerResult = {
  open: boolean;
  handlers: UseDrawerHandlers;
};

const useDrawer = (): UseDrawerResult => {
  const [open, setOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  return { open, handlers: { closeDrawer, openDrawer } };
};

const Header: React.FC<IAppHeaderProps> = props => {
  const { configuration } = props;

  const links = useHeaderLinks(configuration);

  const { ref: appBarRef, opacity: appBarOpacity, display: appBarDisplay } = useHeaderFadeInOutAnimation();

  const {
    open,
    handlers: { closeDrawer, openDrawer },
  } = useDrawer();

  const currentPortalLinkConfig = links.find(({ href }) => href.includes(window?.location?.host)) || links[0];
  const { color: currentPortalColor, drawerColor: currentPortalDrawerColor, title } = currentPortalLinkConfig;

  const { main: mainColor, secondary: secondaryColor, handlers } = useHeaderPalette({
    main: currentPortalColor,
    secondary: currentPortalDrawerColor,
  });
  const { setSecondary, setMain } = handlers;

  const setCurrentPortalColors = useCallback(() => {
    setMain(currentPortalColor);
    setSecondary(currentPortalDrawerColor);
  }, [currentPortalDrawerColor, currentPortalColor]);

  const handleDrawerClose = useCallback(() => {
    closeDrawer();
    setCurrentPortalColors();
  }, []);

  const onLinkMouseOver = (color: string, drawerColor: string) => {
    setMain(color);
    setSecondary(drawerColor);
  };

  const classes = useStyles()();

  return (
    <div style={{ position: 'absolute' }}>
      {!open && (
        <AppBar position='fixed' className={classes.appBar} ref={appBarRef} style={{ opacity: appBarOpacity, display: appBarDisplay }}>
          <div className={classes.wrapper}>
            <HeaderToolbar title={title} color={mainColor} onMenuOpen={openDrawer} />
          </div>
        </AppBar>
      )}
      <NavigationDrawer open={open} onClose={handleDrawerClose} backgroundColor={secondaryColor}>
        <Grid className={classes.actionsContainer} container justify='center' alignItems='flex-start'>
          <Grid item xs={8} container justify='flex-start' alignItems='flex-start'>
            <HeaderLogo color={mainColor} />
          </Grid>
          <Grid item xs={4} container justify='flex-end' alignItems='flex-start'>
            <ButtonBase className={classes.menuButton} color='inherit' onClick={closeDrawer} style={{ outlineColor: mainColor }}>
              <CloseOutlinedIcon className={classes.menuIconClose} style={{ color: mainColor }} />
            </ButtonBase>
          </Grid>
        </Grid>
        <Grid container direction='column' alignItems='flex-end'>
          {links.map(({ href, color, drawerColor, title, subtitle }, index) => {
            return (
              <HeaderLink
                key={index}
                href={href}
                color={color}
                title={title}
                subtitle={subtitle}
                onMouseOver={() => onLinkMouseOver(color, drawerColor)}
                onMouseLeave={setCurrentPortalColors}
              />
            );
          })}
        </Grid>
      </NavigationDrawer>
    </div>
  );
};

export default Header;
