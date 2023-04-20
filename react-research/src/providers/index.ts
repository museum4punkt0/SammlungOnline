import {IApolloDependencyContext, createApolloDependencies, ApolloDependencyContext, useApolloDependency} from './apollo.context'
import {ICoreContext, CoreContext, useCoreContext} from './core.context'
import {IDependencyContext, createDependencies, DependencyContext, useDependency} from './dependency.context'
import {ISearchFormContext, SearchFormContext, useCreateSearchFormChangeEvent} from './search-form.context'

// eslint-disable-next-line prettier/prettier
export type {
    ISearchFormContext,
    IApolloDependencyContext,
    ICoreContext,
    IDependencyContext
}

export  {
    SearchFormContext,
    useCreateSearchFormChangeEvent,
    createApolloDependencies,
    ApolloDependencyContext,
    useApolloDependency,
    CoreContext,
    useCoreContext,
    createDependencies,
    DependencyContext,
    useDependency
}