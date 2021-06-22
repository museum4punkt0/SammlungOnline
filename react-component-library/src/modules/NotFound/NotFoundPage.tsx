import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { Grid, Link, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import useStyles from './notFoundPage.jss';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid className={classes.content} container>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant='h1' component='p'>
            404
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant='h3' component='p'>
            {t('notFoundPage.title')}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant='body1' component='p'>
            {t('notFoundPage.description')}
          </Typography>
          <div className={classes.toMainPageContainer}>
            <Link component={RouterLink} to='/' className={classes.toMainPageLink} color='secondary'>
              <ArrowBackIosIcon color='secondary' />
              {t('notFoundPage.toMainPage')}
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFoundPage;
