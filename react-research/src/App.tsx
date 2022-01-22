import React, { ReactElement } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { MuiThemeProvider } from '@material-ui/core/styles';
import SmbResearchTheme from './context/Themes/SmbResearchTheme';

import { CoreContext } from './context/core.context';

import { LoadingSpinner, useConfigLoader } from '@smb/smb-react-components-library';
import SmbLayout from './components/SmbLayout/SmbLayout';

import './i18n';

import { createDependencies, DependencyContext } from './context/dependency.context';

import useStyles from './app.jss';

function App(): ReactElement {
  const { config } = useConfigLoader();
  const classes = useStyles();

  if (self != top) {
    return <div>Embedding this page is not allowed.</div>;
  }

  if (!config) {
    return (
      <div className={classes.loadingWrapper}>
        <LoadingSpinner styleClasses={classes.loadingSpinner} data-testid="spinner" />
      </div>
    );
  }

  const dependencyContext = createDependencies(config);

  return (
    <ApolloProvider client={dependencyContext.apolloClient}>
      <MuiThemeProvider theme={SmbResearchTheme}>
        <CoreContext.Provider value={{ configuration: config }}>
          <DependencyContext.Provider value={dependencyContext}>
            <SmbLayout data-testid="smb-layout" />
          </DependencyContext.Provider>
        </CoreContext.Provider>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
