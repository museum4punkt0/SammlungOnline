import { CarouselProps } from 'nuka-carousel';
import React from 'react';

export interface ISilderSlidesProps {
  slideImage: string;
  slideText: string;
}

export interface ISliderProps extends CarouselProps {
  autoplay?: boolean;
  wrapAround?: boolean;
  enableKeyboardControls?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode[];
  silderSlides?: ISilderSlidesProps[];
}
