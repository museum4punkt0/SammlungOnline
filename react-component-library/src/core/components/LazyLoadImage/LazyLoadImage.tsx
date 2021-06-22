import React from 'react';

// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import useLazyLoadImage from './hooks/use-lazy-load-Image.hook';

import useStyles from './lazyLoadBackgroundImage.jss';
import { LoadingSpinner } from '../../core.module';

export interface ILazyLoadImageProps {
  width: number | string;
  height: number | string;
  src?: string;
  size?: 'cover' | 'contain';
  onClick?: () => void;
  Fallback?: React.ReactNode;
}

const LazyLoadImage: React.FC<ILazyLoadImageProps> = props => {
  const { width = '100%', height = '100%', Fallback = null, src = '', size = 'contain', onClick } = props;
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
    <div style={{ ...imageDimensions, position: 'relative' }}>
      {(isLoading || isError) && (
        <div className={classes.loaderContainer} style={imageDimensions}>
          {isLoading && <LoadingSpinner />}
          {isError && Fallback}
        </div>
      )}
      <div ref={blockRef} className={classes.image} style={styles} onClick={handleClick} />
    </div>
  );
};

export default LazyLoadImage;
