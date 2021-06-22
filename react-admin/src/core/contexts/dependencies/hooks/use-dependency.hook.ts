import { useContext } from 'react';
import { DependencyContext, IDependencyContext } from '../dependencies.context';

export const useDependency = (): IDependencyContext => useContext(DependencyContext);
