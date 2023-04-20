/* eslint-disable react/jsx-key */
import React from 'react';
import ReactPlayer from 'react-player';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LanguageService from 'src/utils/LanguageService';

import './carouselHeadline.scss';

import { ICarouselHeadlineProps } from '../../types/carousel.interface';

const CarouselHeadlineComponent: React.FC<ICarouselHeadlineProps> = (props) => {
  const { children, href = '#', text = '', link = true, assets } = props;
  const lang = LanguageService.getCurrentStrapiLanguage();

  function createMarkup(richText: string) {
    return { __html: richText };
  }
  const getTextClassVariant = () => {
    return lang === 'de-LS' ? 'text-card__rich-text__leichte-sprache' : '';
  };

  return (
    <div className={'carousel-headline'}>
      <div className={'carousel-headline__divider'} />
      <Typography
        variant={'h3'}
        component={'h4'}
        className={'carousel-headline__header'}
      >
        {link && (
          <Link color="inherit" href={href}>
            {children}
          </Link>
        )}
        {!link && children}
      </Typography>

      {!assets?.length && text && (
        <Typography
          className={`carousel-headline__text ${getTextClassVariant()}`}
          variant={'body2'}
          component={'div'}
          dangerouslySetInnerHTML={createMarkup(text)}
        />
      )}
      {assets && assets.length > 0 && (
        <div className="video-card__video-conatiner carousel-headline__video">
          {assets.map((asset, index) => {
            return (
              <ReactPlayer
                key={`video-search-buttons-block-${index}`}
                className={'video-card__player'}
                url={asset.url}
                controls
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export const CarouselHeadline = CarouselHeadlineComponent;
