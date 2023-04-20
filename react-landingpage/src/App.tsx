/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';
import CssBaseline from '@material-ui/core/CssBaseline';
// import routes from './routes/Routes';
import SwitchRoutes from './routes/SwitchRoutes';

import {
  useConfigLoader,
  useGraphQlClient,
  CommonTheme,
  Header,
  Footer,
  CustomCssBaseline,
  HeaderPlatformType,
} from '@smb/smb-react-components-library';

import WrappedSpinner from './components/Spinner';
import i18n from './i18n';
import useStyles from './app.jss';

function App(): ReactElement {
  // useConfigLoader will trigger head-request to fetch X-React-App-Stage header. Value change of loadingConfig will
  // result in rerendering the component.
  const { loading, graphQlClient } = useGraphQlClient();
  const classes = useStyles();
  const { loadingConfig, config } = useConfigLoader();

  const getRoute = (): boolean => {
    const contactSectionRoutes = {
      '/': true,
      '/de-LS': true,
      '/de-DGS': true,
      '/en': true,
      '/en-SL': true,
      '/en-ASL': true,
    };
    if ((contactSectionRoutes as any)[location.pathname as any])
      return (contactSectionRoutes as any)[location.pathname as any];
    else return false;
  };

  // The HeaderServiceContextProvider is necessary because a graphQL-query will be performed, but provided to the
  // ApolloProvider in this step. So otherwise hooks will crash in an epic way.
  return (
    <>
      <I18nextProvider i18n={i18n}>
        {loadingConfig || loading ? (
          <WrappedSpinner loading={loading} />
        ) : (
          <>
            {!loading && !loadingConfig && (
              <ApolloProvider client={graphQlClient!}>
                <MuiThemeProvider theme={CommonTheme}>
                  <BrowserRouter>
                    <CssBaseline />
                    <CustomCssBaseline />
                    <div className={classes.root}>
                      <Header
                        configuration={config as any}
                        shouldDisplayLang={true}
                        currentPortal={HeaderPlatformType.INTRO}
                      />
                      <main className={classes.wrapper}>
                        <SwitchRoutes />
                      </main>
                      <footer data-testid={'application-footer-wrapper'}>
                        <Footer
                          configuration={config as any}
                          showContactSection={getRoute()}
                        />
                      </footer>
                    </div>
                  </BrowserRouter>
                </MuiThemeProvider>
              </ApolloProvider>
            )}
          </>
        )}
      </I18nextProvider>
    </>
  );
}

export default App;
