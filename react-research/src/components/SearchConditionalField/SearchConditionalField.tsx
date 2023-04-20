import React from 'react';

import { Grid, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import { SearchConditionalInputFactory, FieldSelect, OperatorSelect } from '../index';
import { ESearchConditionFields, ESearchOperators } from '../../enums/index';
import { ISearchAttributeOption } from '../../types/index';
import { useCreateSearchFormChangeEvent } from '../../providers/index';

import useStyles from './searchConditionalField.jss';
import './searchConditionalField.scss';

export interface ISearchConditionalFieldProps {
  value: string;
  operator: string;
  field: string;
  baseName: string;
  operators: ISearchAttributeOption<ESearchOperators>[];
  availableFields: ISearchAttributeOption<ESearchConditionFields>[];
  onRemove: () => void;
}

const SearchConditionalField: React.FC<ISearchConditionalFieldProps> = props => {
  const {
    value,
    field,
    operator,
    baseName,
    operators,
    availableFields,
    onRemove,
  } = props;
  const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

  const classes = useStyles();

  return (
    <Grid container className={`conditional-fields`}>
      <div className={`conditional-fields__field`}>
        <OperatorSelect
          name={`${baseName}.operator`}
          value={operator}
          operators={operators}
          onChange={createSearchFormChangeEvent}
        />
      </div>
      <div className={`conditional-fields__field`}>
        <FieldSelect
          name={`${baseName}.field`}
          value={field}
          fields={availableFields}
          onChange={createSearchFormChangeEvent}
        />
      </div>

      <div className={`conditional-fields__field`}>
        <SearchConditionalInputFactory
          name={baseName}
          value={value}
          fields={availableFields}
          onChange={createSearchFormChangeEvent}
        />

        <IconButton
          className={classes.clearIcon}
          aria-label="remove condition"
          onClick={onRemove}
        >
          <ClearIcon color="primary" fontSize={'large'} />
        </IconButton>
      </div>
    </Grid>
  );
};

export default SearchConditionalField;
