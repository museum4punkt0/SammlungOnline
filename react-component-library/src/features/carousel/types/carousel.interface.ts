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
  variant?: string;
  text?: string;
  link?: boolean;
  assets?: { url: string }[];
  children?: React.ReactNode;
}
export interface ICarouselImageCardProps {
  img: string;
  caption?: string;
  link?: string | undefined;
  maxWidth?: number;
  color?: string;
  maxHeight?: number;
}

export interface ICarouselImageCardNewProps {
  img?: string;
  image?: string;
  title?: string;
  subTitle?: string;
  collection?: string;
  date?: string;
  link?: string | undefined;
  maxWidth?: number;
  color?: string;
  maxHeight?: number;
}
