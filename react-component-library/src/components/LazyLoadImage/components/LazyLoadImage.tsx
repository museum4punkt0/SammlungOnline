import React from 'react';

// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import useLazyLoadImage from '../hooks/use-lazy-load-Image.hook';

import useStyles from './lazyLoadBackgroundImage.jss';

import { ILazyLoadImageProps } from '../types';
import { LoadingSpinner } from 'src';

export const LazyLoadImage: React.FC<ILazyLoadImageProps> = (props) => {
  const {
    width = '100%',
    height = '100%',
    cssClass = '',
    Fallback = null,
    src = '',
    size = 'contain',
    onClick,
  } = props;
  const { isError, isLoading, source, blockRef } = useLazyLoadImage(src);

  const classes = useStyles();

  const imageDimensions = {
    height,
    width,
  };

  const handleClick = () => onClick && onClick();

  const styles = {
    ...imageDimensions,
    backgroundSize: size,
    backgroundImage: `url(${source})`,
  };

  return (
    <div
      style={{ ...imageDimensions, position: 'relative' }}
      className={cssClass}
    >
      {(isLoading || isError) && (
        <div className={classes.loaderContainer} style={imageDimensions}>
          {isLoading && <LoadingSpinner />}
          {isError && Fallback}
        </div>
      )}
      <div
        ref={blockRef}
        className={classes.image}
        style={styles}
        onClick={handleClick}
      />
    </div>
  );
};
