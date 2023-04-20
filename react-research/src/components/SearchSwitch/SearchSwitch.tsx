import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormControlLabel, Switch, Typography } from '@material-ui/core';

import useStyles from './searchSwitch.jss';

export interface ISearchSwitchProps {
  name: string;
  label: string;
  value: boolean;
  defaultValue?: boolean;
  onChange?: () => void;
}

const SearchSwitch: React.FC<ISearchSwitchProps> = props => {
  const { label, name, defaultValue, onChange } = props;

  const { control } = useFormContext();
  const { field: switchField } = useController({ name, control, defaultValue });

  const renderLabel = () => {
    return (
      <Typography variant="overline" color="textSecondary">
        {label}
      </Typography>
    );
  };

  const renderControl = () => {
    return (
      <Switch
        {...switchField}
        tabIndex={-1}
        name={name}
        checked={switchField.value}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          checked: classes.checked,
          disabled: classes.disabled,
          track: classes.track,
        }}
        onChange={(event: any) => {
          onChange && onChange();
          switchField.onChange(event.target.checked);
        }}
      />
    );
  };

  const classes = useStyles();
  const classesOverrides = { root: classes.focus };

  return (
    <FormControlLabel
      tabIndex={0}
      label={renderLabel()}
      control={renderControl()}
      classes={classesOverrides}
      onKeyPress={() => {
        onChange && onChange();
        switchField.onChange(!switchField.value);
      }}
    />
  );
};

export default SearchSwitch;
