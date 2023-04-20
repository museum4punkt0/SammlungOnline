import React from 'react';

import CarouselProvider, { CarouselRenderControl } from 'nuka-carousel';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import IconButton from '@material-ui/core/IconButton';

import withWidth from '@material-ui/core/withWidth';

import useStyles from './carousel.jss';
import { ICarouselProps } from '../types/carousel.interface';

const CarouselComponent: React.FC<ICarouselProps> = (props) => {
  const {
    // cellSpacing,
    width,
    visibleSlides,
    children,
    color = '#000',
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
    // cellAlign = 'left',
    slidesToScroll = 1,
    framePadding = '0 0',
    renderBottomCenterControls = null,
  } = props;

  const classes = useStyles(props);

  const _width = width === 'md' ? 'sm' : width === 'xl' ? 'lg' : width;
  const slidesToShow =
    _slidesToShow ?? visibleSlides![_width as keyof typeof visibleSlides];

  const CenterLeftControls: CarouselRenderControl = (props) => {
    const { previousSlide, slideCount, currentSlide } = props;
    const isDisabled = slidesToShow >= slideCount || !currentSlide;

    return (
      <IconButton
        aria-label={previousButtonAriaLabel}
        className={classes.arrowContainer}
        size="medium"
        onClick={previousSlide}
        style={getControlsStyle(isDisabled)}
      >
        <ArrowBackIosOutlinedIcon />
      </IconButton>
    );
  };

  const getControlsStyle = (isDisabled: boolean) => {
    if (isDisabled)
      return {
        color: '#c2c2ba',
        opacity: '0.4',
        cursor: 'unset',
        'background-color': 'transparent',
      };
    else
      return {
        color: color,
      };
  };

  const CenterRightControls: CarouselRenderControl = (props) => {
    const { nextSlide, slideCount, currentSlide } = props;

    const isDisabled =
      slidesToShow >= slideCount || currentSlide === slideCount - slidesToShow;

    return (
      <IconButton
        aria-label={nextButtonAriaLabel}
        size="medium"
        className={classes.arrowContainer}
        onClick={nextSlide}
        style={getControlsStyle(isDisabled)}
      >
        <ArrowForwardIosOutlinedIcon />
      </IconButton>
    );
  };

  return (
    <div className={classes.sliderContainer}>
      <CarouselProvider
        transitionMode="fade"
        autoplay={autoplay}
        dragging={dragging}
        // cellAlign={cellAlign}
        slideIndex={slideIndex}
        // cellSpacing={cellSpacing}
        framePadding={framePadding}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        disableEdgeSwiping={disableEdgeSwiping}
        enableKeyboardControls={enableKeyboardControls}
        beforeSlide={beforeSlide}
        afterSlide={afterSlide}
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
