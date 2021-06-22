import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import { Grid, IconButton } from '@material-ui/core';
import SearchInput from '../SearchInput/SearchInput';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useCreateSearchFormChangeEvent } from '../../search-form.context';

import { ESearchFormFields } from '../../enums/search-form-fields.enum';

import useStyles from './mainSearch.jss';

interface IMainSearchProps {
    search?: string;
}

const MainSearch: React.FC<IMainSearchProps> = ({ search }) => {
    const { t } = useTranslation();

    const { setValue } = useFormContext();
    const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

    const classes = useStyles();

    return (
        <Grid style={{ margin: '5px 0' }} container spacing={0}>
            <div className={classes.searchInput}>
                <SearchInput
                    variant="outlined"
                    defaultValue={search}
                    label={t('searchForm.labels.search')}
                    onSelect={createSearchFormChangeEvent}
                    onChange={(value) => {
                        setValue(ESearchFormFields.question, value);
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
                    <SearchOutlinedIcon color="secondary" fontSize="large" className={classes.searchIcon} />
                </IconButton>
            </div>
        </Grid>
    );
};

export default MainSearch;
