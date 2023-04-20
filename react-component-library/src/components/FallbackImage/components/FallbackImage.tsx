import React from 'react';

import NoSimOutlinedIcon from '@material-ui/icons/NoSimOutlined';

import useStyles from './FallbackImage.jss';
import { Typography } from '@material-ui/core';
import { IFallbackImageProps } from '../types';

export const FallbackImage: React.FC<IFallbackImageProps> = (props) => {
  const {
    label = 'not found image icon',
    text = 'Ohne Abbildungen',
    height = '100%',
    width = '100%',
  } = props;

  const classes = useStyles();

  return (
    <div
      role="img"
      aria-label={label}
      className={classes.container}
      style={{ height, width }}
    >
      <Typography variant="body2" className={classes.headline}>
        {text}
      </Typography>
      <NoSimOutlinedIcon fontSize="large" />
    </div>
  );
};
