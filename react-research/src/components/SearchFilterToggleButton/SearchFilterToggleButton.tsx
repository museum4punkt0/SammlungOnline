import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { ToggleButton } from '@material-ui/lab';

import useStyles from './searchFilterToggleButton.jss';

export interface ISearchFilterButtonProps {
  name: string;
  label: string;
  hasValue?: string;
  value: boolean;
  onChange?: (value: boolean) => void;
}

const SearchFilterToggleButton: React.FC<ISearchFilterButtonProps> = props => {
  const { label, value, hasValue, name, onChange } = props;

  const { control } = useFormContext();
  const { field: toggleButton } = useController({
    name,
    control,
    defaultValue: value,
  });

  const handleChange = () => {
    toggleButton.onChange(!toggleButton.value);
    onChange && onChange(!value);
  };

  const classes = useStyles();

  return (
    <ToggleButton
      value={toggleButton.value}
      selected={toggleButton.value ? true : false}
      className={classes.toggleButton}
      onChange={handleChange}
      disabled={!hasValue}
    >
      <span>{label}</span>
    </ToggleButton>
  );
};

export default SearchFilterToggleButton;
