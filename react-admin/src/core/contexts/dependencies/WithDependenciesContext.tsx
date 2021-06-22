import React, { useMemo } from 'react';
import { createDependencies, DependencyContext } from './dependencies.context';

import { useConfiguration } from '../configuration/hooks/use-configuration.hook';

interface IWithDependenciesProps {
    children?: React.ReactNode;
}

const WithDependenciesContext: React.FC<IWithDependenciesProps> = ({ children }) => {
    const configuration = useConfiguration();
    const dependencies = useMemo(() => createDependencies(configuration), [configuration]);

    return <DependencyContext.Provider value={dependencies}>{children}</DependencyContext.Provider>;
};

export default WithDependenciesContext;
