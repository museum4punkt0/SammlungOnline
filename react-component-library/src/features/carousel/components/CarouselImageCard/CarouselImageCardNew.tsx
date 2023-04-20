/* eslint-disable no-console */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Link } from '@material-ui/core';

import './carouselImageCard.scss';

import { ICarouselImageCardNewProps } from '../../types/carousel.interface';
import { FallbackImage } from '../../../../components/FallbackImage/components/FallbackImage';
import { LazyLoadImage } from 'src';

export const CarouselImageCard: React.FC<ICarouselImageCardNewProps> = (
  props,
) => {
  const { t } = useTranslation();

  const {
    img = '',
    image = '',
    title = '',
    subTitle = '',
    collection = '',
    date = '',
    color = '#0F0900',
    link = '',
    maxWidth = 250,
    maxHeight = 200,
  } = props;
  const content = [title, subTitle, date, collection];

  const renderFallbackImage = () => {
    return (
      <FallbackImage
        label={title}
        text={t('image.notFoundText')}
        width={maxWidth}
        height={maxHeight}
      />
    );
  };
  const getContent = () => {
    return content.filter((item) => item);
  };

  const getContentVariant = (index: number) => {
    if (index === 0) return 'h4';
    else return 'body2';
  };

  const getContentClassName = (index: number, lastIndex: number) => {
    if (index === 0) return 'card__text';
    else if (index === lastIndex) return 'card__text card__text--bold';
    else return 'card__text card__text--small';
  };

  return (
    <Link
      data-testid={'carousel-card'}
      aria-label={`Link zu ${getContent()[0]}`}
      href={link}
      className="card"
      style={{ color: color }}
    >
      <div
        className="card__image"
        aria-label={`Abbildung von ${getContent()[0]}`}
      >
        <LazyLoadImage
          Fallback={renderFallbackImage()}
          width={maxWidth}
          height={maxHeight}
          src={img ? img : image}
        />
      </div>
      <div className="card__text-wrappr">
        {getContent().map((item, index) => {
          const lastItemIndex = getContent().length - 1;
          return item ? (
            <Typography
              key={`attr-${index}`}
              className={getContentClassName(index, lastItemIndex)}
              variant={getContentVariant(index)}
              color="inherit"
            >
              {item}
            </Typography>
          ) : (
            <></>
          );
        })}

        {/* {subTitle && (
          <Typography
            className="card__text card__text--small"
            variant="body2"
            color="inherit"
          >
            {subTitle}
          </Typography>
        )} */}
        {/* {date && (
          <Typography
            className="card__text card__text--small"
            variant="body2"
            color="inherit"
          >
            {date}
          </Typography>
        )} */}
        {/* {collection && (
          <Typography
            className="card__text card__text--small card__text--bold"
            variant="body2"
            color="inherit"
          >
            {collection}
          </Typography>
        )} */}
      </div>
    </Link>
  );
};
