/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import React from 'react';

import { CardMedia, Typography } from '@material-ui/core';
import NoSimOutlinedIcon from '@material-ui/icons/NoSimOutlined';
import { useTranslation } from 'react-i18next';

import './collectionCard.scss';
import { ICollectionCardProps } from '../../types';

export const CollectionCardComponent: React.FC<ICollectionCardProps> = (
  props,
) => {
  const { t } = useTranslation();
  const {
    image,
    section,
    title,
    subtitle,
    href,
    target = '',
    actionText = '',
  } = props;

  return (
    <a
      href={href}
      target={target}
      className={`collectionCard collectionCard--${section}`}
      aria-label={`Link zu ${title}`}
    >
      <div
        className="collectionCard__image-wrapper"
        aria-label={`Abbildung von ${title}`}
      >
        <div className="collectionCard__image-wrapper__no-image">
          <NoSimOutlinedIcon fontSize="large" />
        </div>
        <CardMedia
          className="collectionCard__image-wrapper__image"
          image={image}
        />
      </div>
      <div className="collectionCard__content">
        <div className="collectionCard__content__inner">
          <Typography
            variant="overline"
            className="collectionCard__content__subtitle"
          >
            {subtitle}
          </Typography>
          <Typography
            variant="h3"
            component={'h4'}
            className="collectionCard__content__title"
          >
            {title}
          </Typography>
        </div>
        {actionText && (
          <div className="collectionCard__content__button">
            <Typography
              variant="h4"
              component={'span'}
              className="collectionCard__content__button__text"
            >
              {t(actionText)}
            </Typography>
            <span className="link-animation"></span>
          </div>
        )}
      </div>
    </a>
  );
};

export const CollectionCard = CollectionCardComponent;
