import React from 'react';

import { Grid, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import OperatorSelect from './components/OperatorSelect/OperatorSelect';
import FieldSelect from './components/FieldSelect/FieldSelect';
import SearchConditionalInputFactory from './components/SearchConditionalInputFactory/SearchConditionalInputFactory';

import { ESearchConditionFields } from '../../../../../../../../core/services/search/enums/search-condition-fields.enum';
import { ESearchOperators } from '../../../../../../../../core/services/search/enums/search-operators.enum';

import { ISearchAttributeOption } from '../../../../interfaces/attribute-option.interface';

import useStyles from './searchConditionalField.jss';
import { useCreateSearchFormChangeEvent } from '../../../../search-form.context';

export interface ISearchConditionalFieldProps {
    value: string;
    operator: string;
    field: string;
    baseName: string;
    operators: ISearchAttributeOption<ESearchOperators>[];
    availableFields: ISearchAttributeOption<ESearchConditionFields>[];
    onRemove: () => void;
}

const SearchConditionalField: React.FC<ISearchConditionalFieldProps> = (props) => {
    const { value, field, operator, baseName, operators, availableFields, onRemove } = props;
    const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item container justify="space-between" lg={5} md={5} sm={6} xs={12}>
                <Grid item container alignItems="flex-end" xs={2} sm={2} md={2} lg={2}>
                    <OperatorSelect
                        name={`${baseName}.operator`}
                        value={operator}
                        operators={operators}
                        onChange={createSearchFormChangeEvent}
                    />
                </Grid>
                <Grid item container alignItems="flex-end" xs={9} sm={9} md={9} lg={9}>
                    <FieldSelect
                        name={`${baseName}.field`}
                        value={field}
                        fields={availableFields}
                        onChange={createSearchFormChangeEvent}
                    />
                </Grid>
            </Grid>
            <Grid item container justify="space-between" lg={7} md={7} sm={6} xs={12}>
                <Grid item container alignItems="flex-end" lg={11} md={11} sm={11} xs={11}>
                    <SearchConditionalInputFactory
                        name={baseName}
                        value={value}
                        fields={availableFields}
                        onChange={createSearchFormChangeEvent}
                    />
                </Grid>
                <Grid item container alignItems="center" justify="flex-end" lg={1} md={1} sm={1} xs={1}>
                    <IconButton className={classes.clearIcon} aria-label="remove condition" onClick={onRemove}>
                        <ClearIcon color="primary" fontSize="small" />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SearchConditionalField;
