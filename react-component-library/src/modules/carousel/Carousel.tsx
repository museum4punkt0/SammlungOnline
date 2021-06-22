import React from 'react';

import CarouselProvider, { CarouselProps, CarouselRenderControl } from 'nuka-carousel';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import IconButton from '@material-ui/core/IconButton';

import withWidth from '@material-ui/core/withWidth';

import useStyles from './carousel.jss';

interface ISizes {
  xs: number;
  sm: number;
  lg: number;
}

export interface ICarouselProps extends CarouselProps {
  color?: string;
  width: string;
  visibleSlides?: ISizes;
  children: React.ReactNode | React.ReactNode[];
  nextButtonAriaLabel?: string;
  previousButtonAriaLabel?: string;
}

const CarouselComponent: React.FC<ICarouselProps> = props => {
  const {
    cellSpacing,
    width,
    visibleSlides,
    children,
    getControlsContainerStyles,
    color = 'black',
    autoplay = false,
    dragging = true,
    disableEdgeSwiping = true,
    enableKeyboardControls = true,
    nextButtonAriaLabel = 'next',
    afterSlide,
    beforeSlide,
    slideIndex,
    slidesToShow: _slidesToShow,
    previousButtonAriaLabel = 'previous',
    cellAlign = 'left',
    slidesToScroll = 1,
    framePadding = '0 46px',
    renderBottomCenterControls = null,
  } = props;

  const classes = useStyles(props);

  const _width = width === 'md' ? 'sm' : width === 'xl' ? 'lg' : width;
  const slidesToShow = _slidesToShow ?? visibleSlides![_width as keyof typeof visibleSlides];

  const CenterLeftControls: CarouselRenderControl = props => {
    const { previousSlide, slideCount, currentSlide } = props;
    const isDisabled = slidesToShow >= slideCount || !currentSlide;

    if (isDisabled) {
      return null;
    }

    return (
      <IconButton
        disabled={isDisabled}
        aria-label={previousButtonAriaLabel}
        className={classes.arrowContainer}
        size='medium'
        onClick={previousSlide}
        style={{ color: isDisabled ? 'rgba(0, 0, 0, 0.54)' : color }}
      >
        <ArrowBackIosOutlinedIcon />
      </IconButton>
    );
  };

  const CenterRightControls: CarouselRenderControl = props => {
    const { nextSlide, slideCount, currentSlide } = props;

    const isDisabled = slidesToShow >= slideCount || currentSlide === slideCount - slidesToShow;

    if (isDisabled) {
      return null;
    }

    return (
      <IconButton
        disabled={isDisabled}
        aria-label={nextButtonAriaLabel}
        size='medium'
        className={classes.arrowContainer}
        onClick={nextSlide}
        style={{ color: isDisabled ? 'rgba(0, 0, 0, 0.54)' : color }}
      >
        <ArrowForwardIosOutlinedIcon />
      </IconButton>
    );
  };

  return (
    <div className={classes.sliderContainer}>
      <CarouselProvider
        transitionMode='fade'
        autoplay={autoplay}
        dragging={dragging}
        cellAlign={cellAlign}
        slideIndex={slideIndex}
        cellSpacing={cellSpacing}
        framePadding={framePadding}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        disableEdgeSwiping={disableEdgeSwiping}
        enableKeyboardControls={enableKeyboardControls}
        beforeSlide={beforeSlide}
        afterSlide={afterSlide}
        getControlsContainerStyles={getControlsContainerStyles}
        renderBottomCenterControls={renderBottomCenterControls}
        renderCenterLeftControls={CenterLeftControls}
        renderCenterRightControls={CenterRightControls}
      >
        {children}
      </CarouselProvider>
    </div>
  );
};

export const Carousel = withWidth()(CarouselComponent);