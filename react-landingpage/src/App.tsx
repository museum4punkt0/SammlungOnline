import React, { memo, ReactElement, useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomCssBaseline from './context/Themes/CustomCssBaseline';
import { Box, useTheme } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  useConfigLoader,
  useGraphQlClient,
} from '@smb/smb-react-components-library';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes/Routes';
import SmbLandingPageTheme from './context/Themes/SmbLandingPageTheme';
import SwitchRoutes from './routes/SwitchRoutes';
import WrappedSpinner from './components/Spinner';
import { AppStage } from './config/config';
import { ApolloProvider } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Header, Footer } from '@smb/smb-react-components-library';
import CookieConsent from 'react-cookie-consent';
//important do not delete
import './i18n';

import useStyles from './app.jss';

function App(): ReactElement {
  // useConfigLoader will trigger head-request to fetch X-React-App-Stage header. Value change of loadingConfig will
  // result in rerendering the component.
  const classes = useStyles();
  const { t } = useTranslation();
  const { loadingConfig, appStage, config } = useConfigLoader();
  const { loading, graphQlClient } = useGraphQlClient();

  const theme = useTheme();

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (appStage === AppStage.STAGE || appStage === AppStage.PRODUCTION) {
      event.preventDefault();
    }
  };

  // The HeaderServiceContextProvider is necessary because a graphQL-query will be performed, but provided to the
  // ApolloProvider in this step. So otherwise hooks will crash in an epic way.
  return (
    <>
      {loadingConfig || loading ? (
        <WrappedSpinner loading={loading} />
      ) : (
        <ApolloProvider client={graphQlClient!}>
          <MuiThemeProvider theme={SmbLandingPageTheme}>
            <BrowserRouter>
              <CssBaseline />
              <CustomCssBaseline />
              <div className={classes.root} onContextMenu={onContextMenu}>
                <Box className={classes.grow}>
                  <Header configuration={config as any} />
                  <div className={classes.wrapper}>
                    <SwitchRoutes routes={routes} />
                  </div>
                  <div
                    data-testid={'application-footer-wrapper'}
                    style={{
                      backgroundColor: SmbLandingPageTheme.palette.primary.main,
                    }}
                  >
                    <Footer configuration={config as any} />
                  </div>
                </Box>
              </div>
              {/**
                 <CookieConsent
                 location="bottom"
                 buttonText="OK"
                 cookieName="Banner"
                 style={{ backgroundColor: '#c2c2ba', color: 'black' }}
                 buttonStyle={{ backgroundColor: 'black', color: 'white' }}
                 expires={150}
                 >
                 {t('cookieBanner')}
                 </CookieConsent>
                 */}
            </BrowserRouter>
          </MuiThemeProvider>
        </ApolloProvider>
      )}
    </>
  );
}

export default App;
