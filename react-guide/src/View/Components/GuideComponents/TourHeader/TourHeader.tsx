import { Divider, Grid, IconButton, Switch, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from './tourHeader.jss';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function TourHeader({
    title,
    share = false
}: {
    title: string;
    share?: boolean;
}): ReactElement {

    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();
    // back
    // accessibility button
    // share button
    // Devider
    // Guide Title

    const backToLandingpage = (): void => {
        history.goBack();
        // .push({
        //     pathname: '/',
        // });
    };

    return (

        <Grid container className={classes.content} style={{ marginBottom: '1rem' }}>
            <Grid item className={classes.headerTitle} >
                <Divider className={classes.divider} style={{ marginBottom: '.5rem' }} />
                <Typography variant='h3'>{t('start')}: {title}</Typography>
            </Grid>
        </Grid>
    );
}

export default TourHeader;
