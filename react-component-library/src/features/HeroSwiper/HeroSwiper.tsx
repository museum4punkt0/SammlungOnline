/* eslint-disable react/jsx-key */
import React, { ReactElement } from 'react';
import { SwiperCarousel } from '../index';

import { HeroSilde } from './HeroSlide';
import './heroSwiper.scss';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CommonTheme from '../../typografie/CommonTheme';

export interface IHeroSwiperProps {
  section: string;
  data: IHeroSlide[];
}

interface IHeroSlide {
  title: string;
  text?: string;
  image: string;
  actionText?: string;
  actionHref?: string;
  caption?: string | null;
  href?: string;
  target?: string;
  subtitle?: string;
  id: string;
}

export const HeroSwiper = (props: IHeroSwiperProps): ReactElement => {
  const { data, section } = props;
  const heroCardsCollection = (contextData: IHeroSlide[]) => {
    return contextData.map((slide: IHeroSlide, index: number) => {
      return {
        title: slide?.title,
        caption: slide?.caption,
        text: slide?.text,
        image: slide?.image,
        href: slide?.href,
        actionText: slide?.actionText,
        actionHref: slide?.actionHref,
        subtitle: slide.subtitle ?? '',
        section: section,
        target: slide.target ?? '_blank',
        id: `hero-slide_${index}_${slide.id}`,
      };
    });
  };

  const collections = heroCardsCollection(data);

  return (
    <MuiThemeProvider theme={CommonTheme}>
      <div className="hero-swiper">
        <SwiperCarousel
          data={collections as any}
          type="hero"
          section={section}
          sliderComponent={HeroSilde}
        />
        <div className={`swiper-pagination`}></div>
      </div>
    </MuiThemeProvider>
  );
};
