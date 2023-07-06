import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Grid, IconButton } from '@material-ui/core';

import { useWindowDimensions } from '@smb/smb-react-components-library';

import { SearchInput } from '../index';
import { ISuggestion } from '../../types';
import { useCreateSearchFormChangeEvent, useDependency } from '../../providers';
import { ESearchFormFields } from '../../enums';

import useStyles from './mainSearch.jss';

interface IMainSearchProps {
  search?: string;
}

const MainSearch: React.FC<IMainSearchProps> = ({ search }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState(search); //
  const { width } = useWindowDimensions();
  const labelTextValue = t(
    width < 900 ? 'searchForm.labels.search' : 'searchForm.labels.searchLong',
  );
  const { setValue, getValues } = useFormContext();
  const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

  const { searchQueryParamsService } = useDependency();
  const { search: queryParams } = useLocation();
  const searchQueryParamsConditions = searchQueryParamsService.parse(queryParams)
    .conditions;

  // Make the same behavior as user click Enter
  const handleSelectValue = (option: string | ISuggestion) => {
    // try avoid rendering if value don`t change
    if (typeof option === 'string' && searchValue !== option) {
      createSearchFormChangeEvent();
    } else if (typeof option !== 'string' && searchValue !== option.value) {
      createSearchFormChangeEvent();
    }

    if (typeof option !== 'string' && option.field) {
      setTimeout(() => {
        setSearchValue('');
        setValue(ESearchFormFields.conditions, [
          ...getValues(ESearchFormFields.conditions),
        ]);
      }, 700);
    }
    setSearchValue('');
  };

  const classes = useStyles();

  return (
    <Grid
      style={{ margin: '5px 0' }}
      container
      spacing={0}
      className={classes.searchInputContainer}
    >
      <div
        className={classes.searchInput}
        onKeyDown={ev => ev.key === 'Enter' && createSearchFormChangeEvent()}
      >
        <SearchInput
          id="search_id"
          variant="outlined"
          defaultValue={search}
          mainInput={true}
          mainInputCSS={true}
          inputValue={searchValue}
          label={labelTextValue}
          onSelect={handleSelectValue}
          onChange={(option, searchValueParam?: string) => {
            const searchValue: string | ISuggestion | undefined = searchValueParam ?? option;

            if (typeof option === 'string') {
              setSearchValue(searchValue as string);
              return setValue(ESearchFormFields.question, searchValue);
            }
            if (option.field) {
              const conditions = [
                ...searchQueryParamsConditions,
                {
                  field: option.field,
                  value: option.value,
                  operator: 'AND',
                },
              ];
              setSearchValue(option.value);
              setValue(ESearchFormFields.question, '');
              return setValue(ESearchFormFields.conditions, conditions);
            }
            setSearchValue(option.value);
            return setValue(ESearchFormFields.question, option.value);
          }}
        />
      </div>
      <div className={classes.searchIconContainer}>
        <IconButton
          type="submit"
          className={classes.button}
          aria-label={t('start search')}
          onClick={createSearchFormChangeEvent}
        >
          <SearchOutlinedIcon
            color="secondary"
            fontSize="large"
            className={classes.searchIcon}
          />
        </IconButton>
      </div>
    </Grid>
  );
};

export default MainSearch;
