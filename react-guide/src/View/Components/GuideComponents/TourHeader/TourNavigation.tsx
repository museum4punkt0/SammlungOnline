import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IconButton, Grid, Switch, Typography } from '@material-ui/core';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import useStyles from './tourNavigation.jss';

interface  ITourNavigationProps {
    share?: boolean;
    accessibility?: boolean;
}

const  TourNavigation: React.FC<ITourNavigationProps> = (props) => {
    const { share = false, accessibility = false } = props;

    const { t } = useTranslation();
    const history = useHistory();

    const classes = useStyles();

    return (
        <Grid item container direction='row' wrap='nowrap' justify='space-between' style={{ margin: '1rem 0' }}>
            <Grid item container xs={2} direction='row' justify='flex-start' wrap='nowrap'>
                <IconButton
                    disableRipple
                    className={classes.backButton}
                    onClick={history.goBack}
                >
                    <ArrowBackIosIcon color='primary' className={classes.iconHover} />
                    <Typography variant="overline" className={classes.linkText}>
                        {t('back')}
                    </Typography>
                </IconButton>
            </Grid>
            <Grid item container xs={3} justify='space-between'>
                {accessibility && (
                    <Grid item container xs={4} direction='row' wrap='nowrap' justify='flex-start'>
                        <Grid item container alignContent='center'>
                            <Switch
                                classes={{
                                    switchBase: classes.switchBase,
                                    checked: classes.checked,
                                    track: classes.track,
                                    root: classes.root,
                                }}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </Grid>
                        <Grid item container alignContent='center'>
                            <Typography>{t('accessible')}</Typography>
                        </Grid>
                    </Grid>
                )}
                {share && (
                    <Grid item container xs={1}>
                        <Grid item container alignContent='center'>
                            <ShareOutlinedIcon style={{ color: 'black' }} />
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default TourNavigation;
