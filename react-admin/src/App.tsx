import React from 'react';

import Main from './core/components/Main/Main';
import WithConfigurationContext from './core/contexts/configuration/WithConfigurationContext';
import WithDependenciesContext from './core/contexts/dependencies/WithDependenciesContext';

import './index.css';

const App: React.FC = () => {
    return (
        <WithConfigurationContext>
            <WithDependenciesContext>
                <Main />
            </WithDependenciesContext>
        </WithConfigurationContext>
    );
};

export default App;
