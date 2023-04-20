import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Grid, Link, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { LanguageService } from '../../../services/LanguageService';

import useStyles from './notFoundPage.jss';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const classes = useStyles();
  let type = 'notFound';

  if (pathname === '/gebärdensprache') {
    type = pathname.split('/')[1];
  }

  const getCurrentLocale = () => {
    const defaultLang = 'de';
    const lang = LanguageService.getCurrentLanguage();
    let currentLocale = '';

    if (lang !== defaultLang) {
      currentLocale = `/${currentLocale}${lang}`;
    }

    return currentLocale;
  };

  const textContext = {
    notFound: {
      title: '404',
      subTitle: t('notFoundPage.title'),
      description: t('notFoundPage.description'),
      link: {
        href: `${getCurrentLocale()}`,
        text: t('notFoundPage.toMainPage'),
      },
    },

    gebärdensprache: {
      title: 'Gebärdensprache',
      subTitle: t('notFoundPage.title'),
      description: t('notFoundPage.description'),
      link: {
        href: `/`,
        text: t('notFoundPage.toMainPage'),
      },
    },
  };

  return (
    <div className={classes.container}>
      <Grid className={classes.content} container>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h1" component="p">
            {textContext[type]?.title}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h3" component="p">
            {t('notFoundPage.title')}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="body1" component="p">
            {t('notFoundPage.description')}
          </Typography>
          <div className={classes.toMainPageContainer}>
            <Link
              component={RouterLink}
              to={textContext[type]?.link.href}
              className={classes.toMainPageLink}
              color="secondary"
            >
              <ArrowBackIosIcon color="secondary" />
              {t('notFoundPage.toMainPage')}
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
