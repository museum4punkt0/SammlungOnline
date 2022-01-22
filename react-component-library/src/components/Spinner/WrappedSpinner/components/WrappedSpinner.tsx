import useStyles from './spinner.jss';
import { LoadingSpinner } from 'src';
import React from 'react';

interface SpinnerProps {
  loading: boolean;
}

export const Spinner: React.FC<SpinnerProps> = () => {
  const classes = useStyles();
  return (
    <div
      data-testid={'page-loading-spinner-wrapper'}
      className={classes.loadingWrapper}
    >
      <LoadingSpinner styleClasses={classes.loadingSpinner} />
    </div>
  );
};

export const areEqual = (
  prevProps: { loading: boolean },
  nextProps: { loading: boolean },
) => prevProps.loading === nextProps.loading;

export const WrappedSpinner = React.memo(Spinner, areEqual);
