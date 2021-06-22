import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useController, useFormContext } from 'react-hook-form';

import { MenuItem, Select, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ISearchAttributeOption } from '../../../../../../interfaces/attribute-option.interface';
import { ESearchConditionFields } from '../../../../../../../../../../core/services/search/enums/search-condition-fields.enum';

interface IFiledSelectProps {
    value: string;
    name: string;
    fields: ISearchAttributeOption<ESearchConditionFields>[];
    onChange?: () => void;
}

const FieldSelect: React.FC<IFiledSelectProps> = (props) => {
    const { value, name, fields, onChange } = props;

    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState<boolean>(!value);

    const { control } = useFormContext();

    const { field: fieldSelect } = useController({
        name,
        control,
        defaultValue: value ?? fields[0].value,
    });

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        if (isOpen) {
            fieldSelect.onChange(fields[0].value);
            setIsOpen(false);
        }
    };

    const handleChange = (event: any) => {
        fieldSelect.onChange(event.target.value as string);
        onChange && onChange();
    };

    return (
        <Select
            value={fieldSelect.value}
            open={isOpen}
            style={{ width: '100%' }}
            IconComponent={ExpandMoreIcon}
            onOpen={handleOpen}
            onClose={handleClose}
            onChange={handleChange}
        >
            {fields.map(({ value, label }, i) => (
                <MenuItem key={i} value={value}>
                    <Typography variant="body2">{t(label)}</Typography>
                </MenuItem>
            ))}
        </Select>
    );
};

export default FieldSelect;
