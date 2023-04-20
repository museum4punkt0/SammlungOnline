import React from 'react';
import clsx from 'clsx';

import useStyles from './loadingSpinner.jss';
import './loadingSpinner.scss';
import { ILoadingSpinnerProps } from '../types';

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  styleClasses = '',
}) => {
  const classes = useStyles();

  return (
    <div
      data-testid={'default-loading-spinner'}
      className={clsx(classes.spinner, styleClasses)}
    >
      <div className={classes.bounce1} id={'spinner-div'} />
      <div className={classes.bounce2} id={'spinner-div'} />
      <div className={classes.bounce3} id={'spinner-div'} />
    </div>
  );
};

export default LoadingSpinner;
