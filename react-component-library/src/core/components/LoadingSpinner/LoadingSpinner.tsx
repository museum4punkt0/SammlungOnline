import React from 'react';
import clsx from 'clsx';

import useStyles from './loadingSpinner.jss';

export interface ILoadingSpinnerProps {
  styleClasses?: string;
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({ styleClasses = '' }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.spinner, styleClasses)}>
      <div className={classes.bounce1} />
      <div className={classes.bounce2} />
      <div className={classes.bounce3} />
    </div>
  );
};

export default LoadingSpinner;
