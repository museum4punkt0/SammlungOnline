import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  SORT_VALUES_MAP,
  SortOption,
} from '../../utils/configuration/sorting-info.config';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

import { useSearchQuery } from '../../hooks';
import { useWindowSize } from '../../hooks/use-window-size.hook';
import { InputLabel } from '@material-ui/core';

export interface ISortDropdownProps {
  onSortChange: (sort: SortOption) => void;
}

/**
 * Drop-down component showing sorting options for the exhibit search result.
 * Uses the options list in `src/utils/configuration/sorting-info.config.ts` enum.
 * Accepts a callback as props which is called anytime the sort value changes.
 * @param onSortChange - callback called anytime sort value changes
 * @constructor
 */
export const SortDropdown: React.FC<ISortDropdownProps> = ({ onSortChange }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const searchQuery = useSearchQuery();

  const [windowWidth] = useWindowSize();

  const translationPath = 'searchForm.sorting';

  const menuItems = Object.keys(SORT_VALUES_MAP).map(key => {
    return [t(`${translationPath}.${key}`), key];
  });

  const handleChange = (ev: SelectChangeEvent) => {
    const newVal = ev.target.value as SortOption;
    onSortChange(newVal);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const BREAKPOINT = 600;

  return (
    <FormControl
      variant="standard"
      sx={{
        m: 1,
        minWidth: windowWidth > BREAKPOINT ? 120 : 0,
        marginRight: 0,
        fontWeight: '400',
        fontSize: '1rem',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {windowWidth > BREAKPOINT ? (
        <SortByAlphaIcon
          fontSize={'medium'}
          onClick={handleOpen}
          style={{ cursor: 'pointer' }}
          aria-label={t(`${translationPath}.label`)}
        />
      ) : (
        <InputLabel
          id={'sort-label'}
          onClick={handleOpen}
          aria-label={t(`${translationPath}.label`)}
        >
          <SortByAlphaIcon fontSize={'large'} style={{ cursor: 'pointer' }} />
        </InputLabel>
      )}
      <Select
        id={'sort-dropdown-select'}
        value={searchQuery.sort ?? SortOption.RELEVANCE}
        labelId={'sort-label'}
        onChange={handleChange}
        sx={{
          marginLeft: '.3em',
          fontFamily: 'GTWalsheimPro-Bold, Arial',
          fontWeight: '400 !important',
          fontSize: '1.125rem',
          borderWidth: '3px',
          paddingLeft: '.1rem',
          display: windowWidth < BREAKPOINT ? 'none' : 'inline-block',
        }}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        {menuItems.map(values => (
          <MenuItem
            key={values[0]}
            value={values[1]}
            sx={{
              fontFamily: 'GTWalsheimPro-Bold, Arial',
              fontWeight: '400 !important',
              fontSize: '1.125rem',
            }}
            aria-label={values[0]}
          >
            {values[0]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
