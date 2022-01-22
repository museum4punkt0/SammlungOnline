import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';

import useStyles from './searchInput.jss';

import { useFetchSuggestions } from '../../../../../../hooks/use-fetch-suggestions.hook';
import { ISuggestion } from '../../../../services/search/interfaces/search/suggestion.interface';
import { ExtendedSearchSuggestionBody } from './SuggestionBody/ExtendedSearchSuggestionBody/ExtendedSearchSuggestionBody';
import { MainSearchSuggestionBody } from './SuggestionBody/MainSearchSuggestionBody/MainSearchSuggestionBody';

export interface ISearchInputProps {
  label: string;
  value?: string;
  defaultValue?: string;
  disableSuggestions?: boolean;
  fieldName?: string;
  variant?: 'filled' | 'standard' | 'outlined' | undefined;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onSelect?: (value: string) => void;
  helperText?: string;
  error?: boolean;
  isExtendedSearchInput?: boolean;
  id?: string;
}

const SearchInput: React.FC<ISearchInputProps> = (props) => {
  const {
    label,
    onChange,
    fieldName,
    defaultValue,
    variant,
    helperText,
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
        .then((suggestions) => {
          setLoading(false);
          setSuggestionList(suggestions);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [value]);

  return (
    <Autocomplete
      id={'test_search_id'} // for jest snapshots
      open={isOpen && !!suggestionList.length}
      loading={loading}
      classes={{
        popper: classes.popper,
        paper: classes.paper,
        listbox: classes.listbox,
        option: classes.option,
      }}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      freeSolo
      style={{ width: '100%' }}
      aria-label={translate('search field')}
      options={getSuggestionValueArr()}
      renderOption={renderSuggestionBody}
      defaultValue={defaultValue || ''}
      onChange={(event: any, newValue: string | null) => {
        if (newValue) {
          onSelect && onSelect(newValue);
          onChange && onChange(newValue);
        }
      }}
      onBlur={() => onBlur && onBlur()}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
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
              style: { color: 'black' },
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
