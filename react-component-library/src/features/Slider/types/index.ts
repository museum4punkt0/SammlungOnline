import { CarouselProps } from 'nuka-carousel';
import React from 'react';

export interface ISliderProps extends CarouselProps {
  autoplay?: boolean;
  wrapAround?: boolean;
  enableKeyboardControls?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode[];
}
