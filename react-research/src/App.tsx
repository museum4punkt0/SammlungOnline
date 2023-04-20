import React, { ReactElement } from 'react';

import { ApolloProvider } from '@apollo/react-hooks';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import SmbResearchTheme from './context/Themes/SmbResearchTheme';

import {
  LoadingSpinner,
  useConfigLoader,
  CustomCssBaseline,
} from '@smb/smb-react-components-library';
import SmbLayout from './components/SmbLayout/SmbLayout';

import {
  createApolloDependencies,
  ApolloDependencyContext,
  CoreContext,
} from './providers/index';

import './i18n';

import useStyles from './app.jss';
import './app.scss';

function App({ ssr = false }): ReactElement {
  const { config } = useConfigLoader();
  const classes = useStyles();

  if (!ssr && self != top) {
    return <div>Embedding this page is not allowed.</div>;
  }

  if (!config) {
    return (
      <div className={classes.loadingWrapper}>
        <LoadingSpinner styleClasses={classes.loadingSpinner} data-testid="spinner" />
      </div>
    );
  }

  const apolloDependencyContext = createApolloDependencies(config);

  return (
    <>
      {apolloDependencyContext && (
        <ApolloProvider client={apolloDependencyContext.apolloClient}>
          <MuiThemeProvider theme={SmbResearchTheme}>
            <CssBaseline />
            <CustomCssBaseline />
            <CoreContext.Provider value={{ configuration: config }}>
              <ApolloDependencyContext.Provider value={apolloDependencyContext}>
                <SmbLayout data-testid="smb-layout" />
              </ApolloDependencyContext.Provider>
            </CoreContext.Provider>
          </MuiThemeProvider>
        </ApolloProvider>
      )}
    </>
  );
}

export default App;
