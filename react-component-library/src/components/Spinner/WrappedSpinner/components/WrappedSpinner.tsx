import useStyles from './spinner.jss';
import './spinner.scss';
import { LoadingSpinner } from 'src';
import React from 'react';

interface SpinnerProps {
  loading: boolean;
  platform?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ platform }) => {
  const classes = useStyles();
  const getSpinnerClassName = () => {
    return `${classes.loadingWrapper} loading-platform--${platform}`;
  };
  return (
    <div
      data-testid={'page-loading-spinner-wrapper'}
      className={getSpinnerClassName()}
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
