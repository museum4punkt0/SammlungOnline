import React from 'react';
import { Grid } from '@material-ui/core';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { SearchFiltersContainer, MainSearch, SearchFormControls } from '../index';
import { ISearchFormData } from '../../types';
import {
  ISearchFormContext,
  SearchFormContext,
  FacetsContextProvider,
} from '../../providers';
import { useDebouncedCallback } from '../../hooks';
import { ESearchFormFields } from '../../enums';

export interface ISearchFormProps {
  defaultValues?: ISearchFormData;
  onSubmit: (data: ISearchFormData) => void;
  onChange?: (data: ISearchFormData) => void;
}

/**
 * Component rendering entire search panel - input and filters and controls
 *
 * -----
 * NOTE: it is a memoized component and does a manual state check before rerender
 * @param props - default form values and the submit function
 * @constructor
 */
const SearchFormComponent: React.FC<ISearchFormProps> = props => {
  const { onSubmit, defaultValues } = props;
  const formMethods = useForm<ISearchFormData>({
    shouldUnregister: false,
    defaultValues,
  });

  // actual conditions inputs and values (ex: AND, TITEL, 'bachus and ..')
  const conditionsController = useFieldArray({
    control: formMethods.control,
    name: ESearchFormFields.conditions,
  });

  const { handleSubmit, getValues } = formMethods;

  const handleChange = useDebouncedCallback(() => {
    const formValues = (getValues() as unknown) as ISearchFormData;
    onSubmit(formValues);
  }, 200);

  const searchFormContext: ISearchFormContext = {
    onSearchFormChange: handleChange,
    conditionsController: conditionsController,
  };

  return (
    <FormProvider {...formMethods}>
      <SearchFormContext.Provider value={searchFormContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={0}>
            <SearchFormControls />
            <MainSearch search={defaultValues?.question} />
            <FacetsContextProvider>
              <SearchFiltersContainer />
            </FacetsContextProvider>
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
