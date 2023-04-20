import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/react-hooks';
import SmbGuideTheme from './context/Themes/SmbGuideTheme';
// import SwitchRoutes from './routes/SwitchRoutes';
// import routes from './routes/Routes';
import LandingPage from './features/LandingPage/components/LandingPage';

import {
  Footer,
  Header,
  useConfigLoader,
  useGraphQlClient,
  WrappedSpinner,
  LoadingSpinner,
  CustomCssBaseline,
  AppStage,
  HeaderPlatformType,
} from '@smb/smb-react-components-library';

import useStyles from './app.jss';

//important do not delete
import './i18n';

function App(): ReactElement {
  // AppHeader sind Komponenten .. Komponenten sind dumm --> bekommen ihre Werte von außen oder über einen Kontext
  // Pages sind intelligenter und dürfen als Controller agieren

  // useConfigLoader will trigger head-request to fetch X-React-App-Stage header. Value change of loadingConfig will
  // result in rerendering the component.
  const classes = useStyles();
  const { loadingConfig, config } = useConfigLoader();
  const { loading, graphQlClient } = useGraphQlClient();

  const loadingSpinner = (
    <div className={classes.loadingWrapper}>
      <LoadingSpinner styleClasses={classes.loadingSpinner} />
    </div>
  );

  if (loadingConfig || loading) {
    return loadingSpinner;
  }

  // The HeaderServiceContextProvider is necessary because a graphQL-query will be performed, but provided to the
  // ApolloProvider in this step. So otherwise hooks will crash in an epic way.
  return (
    <>
      {loadingConfig || loading ? (
        <WrappedSpinner loading={loading} />
      ) : (
        <ApolloProvider client={graphQlClient!}>
          <MuiThemeProvider theme={SmbGuideTheme}>
            <BrowserRouter>
              <CssBaseline />
              <CustomCssBaseline />

              <div className={classes.root}>
                <Box className={classes.grow}>
                  <Header
                    configuration={config as any}
                    isBlackBackground={true}
                    shouldDisplayLang={true}
                    currentPortal={HeaderPlatformType.GUIDE}
                  />
                  <div className={classes.wrapper}>
                    {/* <SwitchRoutes routes={routes} /> */}
                    <LandingPage />
                  </div>
                  <div
                    style={{
                      backgroundColor: `${SmbGuideTheme.palette.primary.main}`,
                    }}
                    data-testid={'application-footer-wrapper'}
                  >
                    <Footer
                      configuration={config as any}
                      showContactSection={true}
                    />
                  </div>
                </Box>
              </div>
            </BrowserRouter>
          </MuiThemeProvider>
        </ApolloProvider>
      )}
    </>
  );
}

export default App;
