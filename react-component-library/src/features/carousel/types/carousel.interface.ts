import { CarouselProps } from 'nuka-carousel';
import React from 'react';

export interface ISizes {
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

export interface ICarouselHeadlineProps {
  href?: string;
  color?: string;
  children?: React.ReactNode;
}
export interface ICarouselImageCardProps {
  img: string;
  caption?: string;
  link?: string | undefined;
  maxWidth?: number;
  maxHeight?: number;
}

