import React, { ReactElement } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { MuiThemeProvider } from '@material-ui/core/styles';
import SmbResearchTheme from './Themes/SmbResearchTheme';

import { useConfig } from './core/hooks/use-config.hook';
import { CoreContext } from './core/store/core.context';

import { LoadingSpinner } from 'smb-react-components-library';
import SmbLayout from './core/components/SmbLayout/SmbLayout';

import './i18n';

import { createDependencies, DependencyContext } from './core/store/dependency.context';

import useStyles from './app.jss';

function App(): ReactElement {
    const configuration = useConfig();
    const classes = useStyles();

    if (!configuration) {
        return (
            <div className={classes.loadingWrapper}>
                <LoadingSpinner styleClasses={classes.loadingSpinner} />
            </div>
        );
    }

    const dependencyContext = createDependencies(configuration);

    return (
        <ApolloProvider client={dependencyContext.apolloClient}>
            <MuiThemeProvider theme={SmbResearchTheme}>
                <CoreContext.Provider value={{ configuration }}>
                    <DependencyContext.Provider value={dependencyContext}>
                        <SmbLayout />
                    </DependencyContext.Provider>
                </CoreContext.Provider>
            </MuiThemeProvider>
        </ApolloProvider>
    );
}

export default App;
