/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useFetchSuggestions } from '../../hooks/index';
import { ISuggestion } from '../../types/index';
import { ExtendedSearchSuggestionBody, MainSearchSuggestionBody } from '../index';

import useStyles from './searchInput.jss';
import useInputStyles from './input.jss';

export interface ISearchInputProps {
  label: string;
  value?: string;
  defaultValue?: string;
  disableSuggestions?: boolean;
  mainInput?: boolean;
  mainInputCSS?: boolean;
  fieldName?: string;
  variant?: 'filled' | 'standard' | 'outlined' | undefined;
  onChange?: (value: string | ISuggestion) => void;
  onBlur?: () => void;
  onSelect?: (value: string | ISuggestion) => void;
  helperText?: string;
  inputValue?: string;
  error?: boolean;
  isExtendedSearchInput?: boolean;
  id?: string;
}

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
  const inpiutClasses = useInputStyles();

  const getSuggestionValueArr = () => {
    if (suggestionList && suggestionList.length) {
      return suggestionList.map((suggestion: ISuggestion) => suggestion.value);
    }
    return [];
  };

  const renderSuggestionBody = (value: string) => {
    if (suggestionList && suggestionList.length) {
      return (
        <>
          {isExtendedSearchInput ? (
            <ExtendedSearchSuggestionBody suggestionList={suggestionList} value={value} />
          ) : (
            <MainSearchSuggestionBody suggestionList={suggestionList} value={value} />
          )}
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    if (value && !disableSuggestions) {
      !loading && setLoading(true);

      fetchSuggestions(value, fieldName)
        .then(suggestions => {
          setLoading(false);
          setSuggestionList(suggestions);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [value]);

  const handleOnChange = (value: string | null) => {
    const selectedOption = suggestionList.filter(item => item.value === value);
    if (selectedOption.length) {
      setValue(selectedOption[0].value);
      onSelect && onSelect(selectedOption[0]);
      onChange && onChange(selectedOption[0]);
      setValue('');
    } else {
      if (value) {
        setValue(value);
        onSelect && onSelect(value);
        onChange && onChange(value);
      }
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
        root: inpiutClasses.root,
      }}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(event: any, value: string | null) => {
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
      options={getSuggestionValueArr()}
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
