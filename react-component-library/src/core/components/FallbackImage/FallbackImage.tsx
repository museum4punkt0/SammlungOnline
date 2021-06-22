import React from 'react';

import NoSimOutlinedIcon from '@material-ui/icons/NoSimOutlined';

import useStyles from './FallbackImage.jss';
import { Typography } from '@material-ui/core';

export interface IFallbackImageProps {
  label?: string;
  text: string;
  height?: number | string;
  width?: number | string;
}

const FallbackImage: React.FC<IFallbackImageProps> = props => {
  const { label = 'not found image icon', text = 'Ohne Abbildungen', height = '100%', width = '100%' } = props;

  const classes = useStyles();

  return (
    <div role='img' aria-label={label} className={classes.container} style={{ height, width }}>
      <div>
        <Typography variant='body2' className={classes.headline}>
          {text}
        </Typography>
        <NoSimOutlinedIcon fontSize='large' />
      </div>
    </div>
  );
};

export default FallbackImage;
