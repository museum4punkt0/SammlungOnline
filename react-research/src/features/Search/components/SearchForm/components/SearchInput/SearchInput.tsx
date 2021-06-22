import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';

import useStyles from './searchInput.jss';

import { useFetchSuggestions } from '../../../../../../core/hooks/use-fetch-suggestions.hook';

export interface ISearchInputProps {
    label: string;
    value?: string;
    defaultValue?: string;
    disableSuggestions?: boolean;
    fieldName?: string;
    variant?: 'filled' | 'standard' | 'outlined' | undefined;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onSelect?: () => void;
    helperText?: string;
    error?: boolean;
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
    } = props;

    const fetchSuggestions = useFetchSuggestions();

    const { t: translate } = useTranslation();

    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [suggestionList, setSuggestionList] = useState<string[]>([]);

    const classes = useStyles();

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
            options={suggestionList}
            defaultValue={defaultValue || ''}
            onChange={(e, value: string | null) => {
                if (value) {
                    onChange && onChange(value);
                    onSelect && onSelect();
                }
            }}
            onBlur={() => onBlur && onBlur()}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={error}
                    helperText={helperText}
                    label={label}
                    autoComplete="off"
                    variant={variant}
                    style={{ width: '100%' }}
                    onChange={(event) => {
                        onChange && onChange(event.target.value);
                        setValue(event.target.value);
                    }}
                    InputProps={{
                        ...params.InputProps,
                        style: { color: 'black' },
                        endAdornment: loading ? <CircularProgress color="primary" size={20} /> : null,
                    }}
                />
            )}
        />
    );
};

export default SearchInput;
