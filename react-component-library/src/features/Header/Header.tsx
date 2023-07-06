/* eslint-disable no-console */
/* eslint-disable react/jsx-key */
import React, { useCallback, useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import HeaderToolbar from './components/HeaderToolbar/HeaderToolbar';
import NavigationDrawer from './components/HeaderDrawer/NavigationDrawer';
import HeaderLink from './components/HeaderLink/HeaderLink';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import HeaderLogo from './components/HeaderLogo/HeaderLogo';
import { ButtonBase, Grid } from '@material-ui/core';

// import useHeaderLinks from './hooks/use-header-links.hook';
import useStyles from './header.jss';
import useHeaderFadeInOutAnimation from './hooks/use-header-fade-in-out-animation.hook';
import { IAppHeaderProps, IHeaderColorPalette } from './types/interfaces';
import { UseDrawerResult, UseHeaderPaletteResult } from './types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CommonTheme from '../../typografie/CommonTheme';
import { SiteConfigService } from 'src/services/SiteConfig';

const useHeaderPalette = (
  palette: IHeaderColorPalette = {},
): UseHeaderPaletteResult => {
  const [main, setMain] = useState(palette.main ?? '#ffffff');
  return { main, handlers: { setMain } };
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

const Header: React.FC<IAppHeaderProps> = (props) => {
  const {
    isBlackBackground,
    shouldDisplayLang,
    currentPortal,
    configuration,
    children,
  } = props;
  const backgroundColor = '#0f0900f7'; // 97% opacity
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedLink, setSelectedLink] = useState(true);
  const [color, setColor] = useState('');
  const [title, setTitle] = useState('');
  const [drawerColor, setDrawerColor] = useState('');

  const siteHeaderMenu = new SiteConfigService();
  const {
    loading,
    data: { headerData: links, localizations },
  } = siteHeaderMenu.getSiteConfigData();

  useEffect(() => {
    if (!loading && !links) return;

    if (!loading) {
      links &&
        links.forEach((link) => {
          if (link.type === currentPortal) {
            const color = link?.drawerColor ? link?.drawerColor : link?.color;
            setSelectedColor(color);
            setMain(color);
          }
        });

      const currentPortalLinkConfig =
        (links && links.find(({ type }) => type === currentPortal)) ||
        (links && links[0]);

      const { color, title, drawerColor } = currentPortalLinkConfig;

      setColor(color);
      setTitle(title);
      setDrawerColor(drawerColor);
    }
  }, [loading]);

  //Header fade out/in animation function
  const {
    ref: appBarRef,
    opacity: appBarOpacity,
    visibility: appBarVisibility,
  } = useHeaderFadeInOutAnimation();

  const {
    open,
    handlers: { closeDrawer, openDrawer },
  } = useDrawer();

  const { main: mainColor, handlers } = useHeaderPalette({
    main: drawerColor,
  });

  const { setMain } = handlers;

  const setCurrentPortalColors = useCallback(() => {
    drawerColor ? setMain(drawerColor) : setMain(color);
    setSelectedLink(true);
  }, [drawerColor]);

  const handleDrawerClose = useCallback(() => {
    closeDrawer();
    setCurrentPortalColors();
  }, []);

  const onLinkMouseOver = (color: string, drawerColor: string) => {
    drawerColor ? setMain(drawerColor) : setMain(color);
    setSelectedLink(false);
  };

  const classes = useStyles()();

  const getAppBarClass = () => {
    return isBlackBackground
      ? `${classes.appBar} ${classes.appBarBlack} ${classes.appBarWithLang}`
      : `${classes.appBar} ${classes.appBarWithLang}`;
  };

  const getLogoLink = () => {
    if (links) {
      const logoLink = links.filter((link) => link.type === 'INTRO');
      return logoLink[0].href;
    }
    return '/';
  };

  return (
    <>
      <MuiThemeProvider theme={CommonTheme}>
        {!open && (
          <AppBar
            position="fixed"
            className={getAppBarClass()}
            ref={appBarRef}
            style={{
              opacity: appBarOpacity,
              visibility: appBarVisibility as any,
            }}
          >
            {!loading && (
              <div className={(classes.wrapper, classes.sectionWrapper)}>
                <HeaderToolbar
                  configuration={configuration}
                  title={title}
                  type={currentPortal}
                  color={color}
                  logoLink={getLogoLink()}
                  localizations={localizations}
                  shouldDisplayLang={shouldDisplayLang}
                  onMenuOpen={openDrawer}
                >
                  {children}
                </HeaderToolbar>
              </div>
            )}
          </AppBar>
        )}
        {!loading && (
          <NavigationDrawer
            open={open}
            onClose={handleDrawerClose}
            backgroundColor={backgroundColor}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="flex-start"
              className={classes.drawerHeader}
            >
              <Grid
                item
                xs={8}
                container
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <HeaderLogo
                  color={mainColor}
                  tabIndex={-1}
                  link={getLogoLink()}
                />
              </Grid>

              <Grid
                item
                xs={4}
                container
                justifyContent="flex-end"
                alignItems="flex-start"
              >
                <ButtonBase
                  className={classes.menuButton}
                  color="inherit"
                  onClick={closeDrawer}
                  style={{ outlineColor: mainColor }}
                >
                  <CloseOutlinedIcon
                    className={classes.menuIconClose}
                    style={{ color: mainColor }}
                  />
                </ButtonBase>
              </Grid>
            </Grid>
            <Grid container direction="column" alignItems="flex-end">
              {links &&
                links.map(
                  (
                    { href, color, drawerColor, title, subTitle, type },
                    index,
                  ) => {
                    return (
                      <HeaderLink
                        selected={selectedLink && type === currentPortal}
                        selectedColor={selectedColor}
                        key={index}
                        href={href}
                        color={mainColor}
                        title={title}
                        subtitle={subTitle}
                        onMouseOver={() => onLinkMouseOver(color, drawerColor)}
                        onMouseLeave={setCurrentPortalColors}
                      />
                    );
                  },
                )}
            </Grid>
          </NavigationDrawer>
        )}
      </MuiThemeProvider>
    </>
  );
};

export default Header;
