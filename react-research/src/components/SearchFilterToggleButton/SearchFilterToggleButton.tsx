import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ToggleButton } from '@material-ui/lab';
import useStyles from './searchFilterToggleButton.jss';
import { useFacetsContext } from '../../providers/facets-context.provider';
import { FiltersGroupName, GROUPS_NAMES_MAP } from '../../parsers/facets-filters.parser';
import { useFilters } from '../SearchInput/use-filters.hook';

export interface ISearchFilterButtonProps {
  name: string;
  label: string;
  filtersGroupName: string;
  searchValue?: string;
  hasValue: boolean;
  onChange?: (value: boolean) => void;
}

const SearchFilterToggleButton: React.FC<ISearchFilterButtonProps> = props => {
  const { label, hasValue, searchValue, name, filtersGroupName, onChange } = props;

  const { control, setValue } = useFormContext();
  const { field: toggleButton } = useController({
    name,
    control,
    defaultValue: hasValue,
  });

  const {
    facetsParser,
    updateFacets,
    addFilterToSelectedFiltersList,
    removeElementFromSelectedFiltersList,
    isFilterInEntryPoint,
  } = useFacetsContext();

  const handleChange = () => {
    toggleButton.onChange(!toggleButton.value);
    if (!hasValue) {
      addFilterToSelectedFiltersList(filtersGroupName, label);
    } else if (hasValue) {
      removeElementFromSelectedFiltersList(filtersGroupName, label);
    }
    onChange && onChange(!hasValue);
    updateFacets();
  };

  const classes = useStyles();
  const parserGroupName = GROUPS_NAMES_MAP.get(filtersGroupName);
  // check if there is a facet with this key or label
  const filterByLabel = facetsParser.getFilterConfig(
    parserGroupName as FiltersGroupName,
    label ?? '',
  );
  const filterByValue = facetsParser.getFilterConfig(
    parserGroupName as FiltersGroupName,
    searchValue ?? '',
  );
  const disabled = filterByValue.disabled && filterByLabel.disabled;

  if (disabled && hasValue) {
    if (facetsParser?.hasValues() && !isFilterInEntryPoint(label)) {
      setValue(name, false);
      removeElementFromSelectedFiltersList(filtersGroupName, label);
      onChange && onChange(false);
    }
  }

  return (
    <ToggleButton
      value={toggleButton.value}
      selected={!!toggleButton.value}
      className={classes.toggleButton}
      onChange={handleChange}
      disabled={disabled}
    >
      <span>{label}</span>
    </ToggleButton>
  );
};

export default SearchFilterToggleButton;
