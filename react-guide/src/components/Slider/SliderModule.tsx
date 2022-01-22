import React, { ReactElement, useState, useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SliderContent from './SliderContent';
import Dots from './Dots';
import clsx from 'clsx';

import useStyles from './sliderModule.jss';

function calcActiveIndex(index: number, length: number): number {
  if (index < 0) {
    return length - 1;
  }
  if (index >= length) {
    return 0;
  }

  return index;
}

function SliderModule({
  children,
  interval,
  playing = true,
  arrows = true,
  dots = true,
  sliderClasses = '',
  onSlide,
  activeIndex = 0,
  setActiveIndex,
  onProgressUpdate,
  progressUpdateStepSize = 60,
}: {
  children: ReactElement | ReactElement[];
  interval?: number;
  playing?: boolean;
  arrows?: boolean;
  dots?: boolean;
  sliderClasses?: string;
  onSlide?: (index: number) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onProgressUpdate?: (progressValue: number) => void;
  progressUpdateStepSize?: number;
}): ReactElement {
  const classes = useStyles();
  const [progressValue, setProgressValue] = useState(0);
  const [index, setIndex] = useState(activeIndex);
  const autoPlay = useRef<() => void>();

  let length = 1;
  if (Array.isArray(children)) {
    length = children.length;
  }

  const updateValues = (index: number): void => {
    setActiveIndex(index);
    setIndex(index);
    setProgressValue(0);
    onSlide && onSlide(index);
  };

  const incrementActiveIndex = (): void => {
    const newIndex = calcActiveIndex(activeIndex + 1, length);
    updateValues(newIndex);
  };
  const decrementActiveIndex = (): void => {
    const newIndex = calcActiveIndex(activeIndex - 1, length);
    updateValues(newIndex);
  };
  const updateProgress = (): void => {
    if (!interval || !playing) {
      return;
    }

    let newProgressValue = progressValue + progressUpdateStepSize;
    if (newProgressValue >= interval) {
      newProgressValue = 0;
      incrementActiveIndex();
    }
    if (index !== activeIndex) {
      setIndex(activeIndex);
      newProgressValue = 0;
    }

    onProgressUpdate && onProgressUpdate(newProgressValue);
    setProgressValue(newProgressValue);
  };

  useEffect((): void => {
    if (interval && playing) {
      autoPlay.current = updateProgress;
    }
  });
  useEffect((): void => {
    if (!playing && activeIndex !== index) {
      setProgressValue(0);
      onProgressUpdate && onProgressUpdate(0);
    }
  }, [playing, activeIndex, index, progressValue, onProgressUpdate]);
  useEffect(() => {
    if (!interval || !playing) {
      return;
    }

    const play = (): void => {
      autoPlay.current && autoPlay.current();
    };

    const autoPlayInterval = setInterval(play, progressUpdateStepSize);
    return (): void => clearInterval(autoPlayInterval);
  });

  return (
    <div className={clsx(classes.sliderModule, sliderClasses)}>
      <SliderContent activeIndex={activeIndex}>{children}</SliderContent>
      {arrows && (
        <IconButton
          className={classes.arrowBack}
          color="inherit"
          onClick={decrementActiveIndex}
        >
          <ArrowBackIosIcon color={'inherit'} />
        </IconButton>
      )}
      {arrows && (
        <IconButton
          className={classes.arrowForward}
          color="inherit"
          onClick={incrementActiveIndex}
        >
          <ArrowForwardIosIcon color={'inherit'} />
        </IconButton>
      )}
      {dots && <Dots activeIndex={activeIndex} length={length} />}
    </div>
  );
}

export default SliderModule;
