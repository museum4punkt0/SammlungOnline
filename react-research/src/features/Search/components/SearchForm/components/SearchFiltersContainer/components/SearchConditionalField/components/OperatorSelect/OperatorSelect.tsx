import React from 'react';
import { useTranslation } from 'react-i18next';
import { useController, useFormContext } from 'react-hook-form';

import { MenuItem, Select, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ISearchAttributeOption } from '../../../../../../interfaces/attribute-option.interface';
import { ESearchOperators } from '../../../../../../../../services/search/enums/search-operators.enum';

interface IOperatorSelectProps {
  value: string;
  name: string;
  operators: ISearchAttributeOption<ESearchOperators>[];
  onChange?: () => void;
}

const OperatorSelect: React.FC<IOperatorSelectProps> = (props) => {
  const { value, name, operators, onChange } = props;

  const { t } = useTranslation();
  const { control } = useFormContext();
  const { field: operatorField } = useController({ name, control, defaultValue: value });

  const handleChange = (event: any) => {
    operatorField.onChange(event.target.value as string);
    onChange && onChange();
  };

  return (
    <Select
      {...operatorField}
      value={operatorField.value}
      style={{ width: '100%' }}
      onChange={handleChange}
      IconComponent={ExpandMoreIcon}
    >
      {operators.map(({ label, value }, i) => (
        <MenuItem key={i} value={value}>
          <Typography variant="body2">{t(label)}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
};

export default OperatorSelect;
