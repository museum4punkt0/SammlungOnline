import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Checkbox, FormControlLabel } from '@material-ui/core';

import useStyles from './searchFilterCheckbox.jss';

export interface ISearchFilterCheckbox {
  label: string;
  name: string;
  value: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

const SearchFilterCheckbox: React.FC<ISearchFilterCheckbox> = props => {
  const { label, name, value, onChange, disabled } = props;
  const { control } = useFormContext();
  const { field: checkBox } = useController({ name, control, defaultValue: value });
  const classes = useStyles();

  const handleChange = () => {
    checkBox.onChange(!checkBox.value);
    onChange && onChange(checkBox.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    event.stopPropagation();
    checkBox.onChange(!checkBox.value);
    onChange && onChange(checkBox.value);
  };

  const classesOverrides = {
    root: classes.focus,
  };

  return (
    <FormControlLabel
      label={label}
      value={checkBox.value}
      classes={classesOverrides}
      control={<Checkbox checked={checkBox.value} color="primary" />}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default SearchFilterCheckbox;
