import React, { ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import clsx from 'clsx';

import useStyles from './linkTextCard.jss';
import { Grid } from '@material-ui/core';

export function LinkTextCard({
  title,
  subtitle,
  tintColor,
  textColor = 'white',
  textAreaColor = 'black',
  onClick,
  cardClasses,
  titleTypoClasses,
  subtitleTypoClasses,
  ariaLabel,
}: {
  title: string;
  subtitle: string;
  tintColor?: string;
  textColor?: string;
  textAreaColor?: string;
  onClick: () => void;
  cardClasses?: string;
  titleTypoClasses?: string;
  subtitleTypoClasses?: string;
  ariaLabel?: string;
}): ReactElement {
  const classes = useStyles();
  // eslint-disable-next-line no-console
  console.log('tintColor',tintColor)

  return (
    <Card
      style={{ backgroundColor: textAreaColor }}
      className={clsx(classes.card, cardClasses)}
      onClick={onClick}
    >
      <CardContent
        className={clsx(classes.cardContent)}
        style={{ backgroundColor: textAreaColor }}
      >
        <Grid container direction={'column'} className={classes.cardTitleArea}>
          <Grid
            justify={'space-between'}
            style={{ width: '100%' }}
            className={classes.cardTitleWrapper}
          >
            <Typography
              variant={'h3'}
              style={{ color: textColor }}
              className={clsx(classes.cardTitleTypo, titleTypoClasses)}
            >
              {title}
            </Typography>
            <IconButton aria-label={ariaLabel} style={{ color: textColor }}>
              <ArrowRightAltIcon fontSize={'large'} color={'inherit'} />
            </IconButton>
          </Grid>
          <Grid>
            <Typography
              variant={'body1'}
              style={{ color: textColor, textOverflow: 'ellipsis' }}
              className={clsx(classes.cardSubtitleTypo, subtitleTypoClasses)}
            >
              {subtitle}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
