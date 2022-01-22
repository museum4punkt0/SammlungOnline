import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { LinearProgress } from '@material-ui/core';

import useStyles from './progressbar.jss';

export function Progressbar({
  value = 0,
  maxValue = 1000,
  styleClasses = '',
}: {
  value: number;
  maxValue: number;
  styleClasses?: string;
}): ReactElement {
  const classes = useStyles();
  const progressValue = Math.min((100 * value) / maxValue);
  return (
    <LinearProgress
      className={clsx(classes.progress, styleClasses)}
      classes={{ bar: classes.bar }}
      value={progressValue}
      variant={'determinate'}
    />
  );
}

