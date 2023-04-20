import React, { ReactElement } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import SmbTopicsTheme from './context/Themes/SmbTopicsTheme';
import { I18nextProvider } from 'react-i18next';
import { ApolloProvider } from '@apollo/react-hooks';
import LandingPage from './features/LandingPage/LandingPage';

import {
  Header,
  Footer,
  LoadingSpinner,
  useConfigLoader,
  useGraphQlClient,
  WrappedSpinner,
  CustomCssBaseline,
  HeaderPlatformType,
} from '@smb/smb-react-components-library';

//important do not delete
import i18n from './i18n';

import useStyles from './app.jss';

function App(): ReactElement {
  const classes = useStyles();
  // const { t } = useTranslation();
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
      <I18nextProvider i18n={i18n}>
        {loadingConfig || loading ? (
          <WrappedSpinner loading={loading} />
        ) : (
          <ApolloProvider client={graphQlClient!}>
            <MuiThemeProvider theme={SmbTopicsTheme}>
              <BrowserRouter>
                <CssBaseline />
                <CustomCssBaseline />
                <div className={classes.root}>
                  <Box className={classes.grow}>
                    <Header
                      configuration={config as any}
                      isBlackBackground={true}
                      shouldDisplayLang={true}
                      currentPortal={HeaderPlatformType.TOPIC}
                    />
                    <main className={classes.wrapper}>
                      <LandingPage />
                    </main>
                    <footer
                      style={{
                        backgroundColor: `${SmbTopicsTheme.palette.primary.main}`,
                      }}
                      data-testid="application-footer"
                    >
                      <Footer
                        configuration={config as any}
                        showContactSection={true}
                      />
                    </footer>
                  </Box>
                </div>
              </BrowserRouter>
            </MuiThemeProvider>
          </ApolloProvider>
        )}
      </I18nextProvider>
    </>
  );
}

export default App;
