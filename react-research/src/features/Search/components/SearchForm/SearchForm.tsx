import React from 'react';

import { Grid } from '@material-ui/core';

import { FormProvider, useForm } from 'react-hook-form';

import SearchFormControls from './components/SearchFormControls/SearchFormControls';

import MainSearch from './components/MainSearch/MainSearch';
import { SearchFiltersContainer } from './components/SearchFiltersContainer/SearchFiltersContainer';

import { ISearchFormData } from './interfaces/form-data.interface';
import { ISearchFormContext, SearchFormContext } from './search-form.context';

import useDebouncedCallback from '../../../../hooks/use-debounce-callback.hook';

export interface ISearchFormProps {
  defaultValues?: ISearchFormData;
  onSubmit: (data: ISearchFormData) => void;
  onChange?: (data: ISearchFormData) => void;
}

const SearchFormComponent: React.FC<ISearchFormProps> = (props) => {
  const { onSubmit, defaultValues } = props;

  const formMethods = useForm<ISearchFormData>({
    shouldUnregister: false,
    defaultValues,
  });
  const { handleSubmit, getValues } = formMethods;

  const handleChange = useDebouncedCallback(() => {
    const formValues = getValues() as unknown as ISearchFormData;

    onSubmit(formValues);
  }, 200);

  const searchFormContext: ISearchFormContext = {
    onSearchFormChange: handleChange,
  };

  return (
    <FormProvider {...formMethods}>
      <SearchFormContext.Provider value={searchFormContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={0}>
            <SearchFormControls />
            <MainSearch search={defaultValues?.question} />
            <SearchFiltersContainer />
          </Grid>
        </form>
      </SearchFormContext.Provider>
    </FormProvider>
  );
};

const SearchForm = React.memo(SearchFormComponent, (prevProps, nextProps) => {
  return (
    prevProps.defaultValues !== nextProps.defaultValues &&
    prevProps.onSubmit !== nextProps.onSubmit
  );
});

export default SearchForm;
