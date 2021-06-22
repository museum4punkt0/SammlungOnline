import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CarouselProvider, { CarouselProps, CarouselRenderControl } from 'nuka-carousel';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

import clsx from 'clsx';
import { Grid } from '@material-ui/core';

import useStyles from './slider.jss';

export interface ISliderProps extends CarouselProps {
  autoplay?: boolean;
  wrapAround?: boolean;
  enableKeyboardControls?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode[];
}

const SliderComponent: React.FC<ISliderProps> = props => {
  const { children, autoplay = false, wrapAround = false, enableKeyboardControls = false, pauseOnHover = false } = props;

  const classes = useStyles();

  const BottomCenterControls: CarouselRenderControl = props => {
    const { currentSlide, slideCount } = props;

    // const isDisabled = slidesToShow >= slideCount || !currentSlide;

    const dots = [];
    for (let index = 0; index < slideCount; index++) {
      dots[index] = <div key={index} className={clsx(classes.dot, index === currentSlide && classes.dotActive)} />;
    }

    return (
      <Grid container wrap={'nowrap'} className={classes.dotWrapper} direction='row'>
        {dots}
      </Grid>
    );
  };

  const CenterLeftControls: CarouselRenderControl = props => {
    const { previousSlide, slideCount, slidesToShow, currentSlide } = props;

    const isDisabled = slidesToShow >= slideCount || !currentSlide;

    if (isDisabled) {
      return null;
    }

    return (
      <IconButton
        // disabled={isDisabled}
        //   aria-label={previousButtonAriaLabel}
        //   className={classes.arrowContainer}
        size='medium'
        onClick={previousSlide}
        style={{ color: 'white' }}
      >
        <ArrowBackIosOutlinedIcon />
      </IconButton>
    );
  };

  const CenterRightControls: CarouselRenderControl = props => {
    const { nextSlide, slidesToShow, slideCount, currentSlide } = props;

    const isDisabled = slidesToShow >= slideCount || currentSlide === slideCount - slidesToShow;

    if (isDisabled) {
      return null;
    }

    return (
      <IconButton
        // disabled={isDisabled}
        // aria-label={nextButtonAriaLabel}
        size='medium'
        // className={classes.arrowContainer}
        onClick={nextSlide}
        style={{ color: 'white' }}
      >
        <ArrowForwardIosOutlinedIcon />
      </IconButton>
    );
  };

  return (
    <div className={classes.sliderContainer}>
      <CarouselProvider
        autoplay={autoplay}
        wrapAround={wrapAround}
        enableKeyboardControls={enableKeyboardControls}
        // disableEdgeSwiping
        pauseOnHover={pauseOnHover}
        heightMode={'first'}
        renderBottomCenterControls={BottomCenterControls}
        renderCenterLeftControls={CenterLeftControls}
        renderCenterRightControls={CenterRightControls}
      >
        {children}
      </CarouselProvider>
    </div>
  );
};

export const Slider = SliderComponent;
