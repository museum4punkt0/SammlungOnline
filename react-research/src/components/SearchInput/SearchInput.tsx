/* eslint-disable no-console */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useFetchSuggestions } from '../../hooks';
import { ISuggestion } from '../../types';
import { ExtendedSearchSuggestionBody, MainSearchSuggestionBody } from '../index';

import useStyles from './searchInput.jss';
import useInputStyles from './input.jss';
import { useFilters } from './use-filters.hook';
import {ESearchConditionFields, ESearchFormFields, ESearchOperators} from "../../enums";
import {useFormContext} from "react-hook-form";
import {useCreateSearchFormChangeEvent, useFormConditionsController} from "../../providers";

export interface ISearchInputProps {
  label: string;
  value?: string;
  defaultValue?: string;
  disableSuggestions?: boolean;
  mainInput?: boolean;
  mainInputCSS?: boolean;
  fieldName?: string;
  variant?: 'filled' | 'standard' | 'outlined' | undefined;
  onChange?: (value1: string | ISuggestion, values2?: string) => void;
  onBlur?: () => void;
  onSelect?: (value: string | ISuggestion) => void;
  helperText?: string;
  inputValue?: string;
  error?: boolean;
  isExtendedSearchInput?: boolean;
  id?: string;
}

/**
 * Component rendering the search input responsible with fetching the suggestion
 * list and autocomplete after value select also reused in advanced filters
 *
 * -----
 * TODO: right now it seems the search value is controlled from multiple
 *  functions/callbacks/event handlers however none seem to be the real
 *  controller of the value. Needs more investigation as it points to high
 *  design flaws. Seems to be a miss-use of MUI.
 * @param props
 * @constructor
 */
const SearchInput: React.FC<ISearchInputProps> = props => {
  const {
    label,
    onChange,
    fieldName,
    defaultValue,
    mainInput = false,
    mainInputCSS = false,
    variant,
    helperText,
    inputValue = '',
    error = false,
    onBlur,
    onSelect,
    disableSuggestions = false,
    isExtendedSearchInput = false,
  } = props;

  const fetchSuggestions = useFetchSuggestions();

  const { t: translate } = useTranslation();

  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestionList, setSuggestionList] = useState<ISuggestion[]>([]);

  const classes = useStyles();
  const inputStyles = useInputStyles();
  const { qAdvancedAll } = useFilters();

  const formCtx = useFormContext();
  const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();
  const conditionsControl = useFormConditionsController();

  const renderSuggestionBody = (suggestion: ISuggestion) => {
    return (
      <>
        {isExtendedSearchInput ? (
          <ExtendedSearchSuggestionBody suggestion={suggestion} />
        ) : (
          <MainSearchSuggestionBody suggestion={suggestion} />
        )}
      </>
    );
  };

  useEffect(() => {
    if (value && !disableSuggestions) {
      !loading && setLoading(true);

      fetchSuggestions(value, fieldName, qAdvancedAll)
        .then(suggestions => {
          setLoading(false);
          setSuggestionList(suggestions);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [value]);

  // todo: this does not seem to be ever called - needs more investigation
  const handleOnChange = (suggestion: string | ISuggestion | null) => {
    if (typeof suggestion === 'string') {
      setValue(suggestion);
      onSelect && onSelect(suggestion);
      onChange && onChange(suggestion);
    } else if (suggestion) {
      setValue(suggestion.value);
      onSelect && onSelect(suggestion.value);
      onChange && onChange(suggestion.value, '');
    }
  };
  const getProps = () => {
    if (mainInput) return { inputValue: inputValue };
  };

  return (
    <Autocomplete
      id={'test_search_id'} // for jest snapshots
      open={isOpen && !!suggestionList.length}
      {...getProps()}
      loading={loading}
      blurOnSelect={true}
      classes={{
        popper: classes.popper,
        paper: mainInputCSS ? classes.paperMain : classes.paper,
        listbox: classes.listbox,
        option: classes.option,
        root: inputStyles.root,
      }}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(event: ChangeEvent<any>, value: string | ISuggestion | null) => {
        if(!isExtendedSearchInput && typeof value !== 'string' &&  value?.field){
          conditionsControl?.append({
            field: value.field as ESearchConditionFields,
            value: value.value,
            operator: ESearchOperators.AND,
          });
          formCtx.setValue(ESearchFormFields.conditions, [
            ...formCtx.getValues(ESearchFormFields.conditions),
          ]);
          formCtx.setValue(ESearchFormFields.question, '');
          createSearchFormChangeEvent();
        }

        if (mainInput) return handleOnChange(value);
        if (value) {
          onSelect && onSelect(value);
          onChange && onChange(value);
          setValue('');
        }
      }}
      onBlur={() => onBlur && onBlur()}
      freeSolo
      style={{ width: '100%' }}
      aria-label={translate('search field')}
      getOptionLabel={(opt: ISuggestion) => opt.value ?? opt}
      options={suggestionList}
      renderOption={renderSuggestionBody}
      defaultValue={defaultValue || ''}
      renderInput={params => {
        return (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            className={classes.label}
            label={label}
            autoComplete="off"
            variant={variant}
            style={{ width: '100%' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onChange && onChange(event.target.value);
              setValue(event.target.value);
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: loading ? (
                <CircularProgress color="primary" size={20} />
              ) : null,
            }}
          />
        );
      }}
    />
  );
};

export default SearchInput;
