/* eslint-disable no-console */
/* eslint-disable react/jsx-key */
import React from 'react';

import { Typography, Link, SvgIcon } from '@material-ui/core';

import './heroSlide.scss';

interface IHeroSlide {
  title: string;
  text?: string;
  image: string;
  caption?: string | null;
  href?: string;
  actionText?: string;
  actionHref?: string;
  section?: string;
  id: string;
  target?: string;
  subtitle?: string;
}

export const HeroSilde: React.FC<IHeroSlide> = (props) => {
  const {
    title,
    id,
    text,
    image,
    href,
    caption,
    section,
    actionText,
    actionHref,
    target,
    subtitle,
  } = props;

  return (
    <div className={`hero-slide section--X`} id={id} tabIndex={0}>
      <div className={`hero-slide__content hero-slide__content--${section}`}>
        {subtitle && (
          <Typography
            variant="subtitle1"
            className={`hero-slide__content__subtitle`}
          >
            {subtitle}
          </Typography>
        )}
        <Typography variant="h2" component="h2">
          {title}
        </Typography>
        {text && (
          <Typography variant="body1" className={`hero-slide__content__text`}>
            {text}
          </Typography>
        )}
        {actionHref && actionText && (
          <>
            <a
              href={actionHref}
              target={target}
              rel="noreferrer"
              aria-label={`${(actionText && ': ' && subtitle) || actionText}`}
            >
              <Typography variant="body1">{actionText}</Typography>
              <span className="link-animation"></span>
            </a>
          </>
        )}
      </div>
      <div className={`hero-slide__slide-buttons`}>
        <div className={`swiper-button-prev swiper-button-prev-intro-hero`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="40.704"
            viewBox="0 0 24 40.704"
          >
            <path
              id="icon_arrow_right_black"
              d="M24,3.639,20.339,0,0,20.352,20.36,40.7,24,37.066,7.28,20.352Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={`swiper-button-next swiper-button-next-intro-hero`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="40.704"
            viewBox="0 0 24 40.704"
          >
            <path
              id="icon_arrow_right_black"
              d="M24,3.639,20.339,0,0,20.352,20.36,40.7,24,37.066,7.28,20.352Z"
              transform="translate(24 40.704) rotate(180)"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      {caption && (
        <div className={`hero-slide__bar section--X`}>
          <div className={`hero-slide__bar__inner`}>
            <Link
              className={'hero-slide__bar__link'}
              href={href}
              aria-label={`Link zu ${caption}`}
              target={'_blank'}
              variant="subtitle1"
            >
              <SvgIcon
                viewBox="0 0 30 23.075"
                className={'hero-slide__bar__link__arrow'}
              >
                <path
                  id="icon_arrow_link"
                  d="M22.519,8.653H0v5.769H22.519v8.653L30,11.538,22.519,0V8.653Z"
                  fill="#fff"
                />
              </SvgIcon>
              {caption}
            </Link>
          </div>
        </div>
      )}
      <img
        className="hero-slide__image"
        src={image}
        alt="Current Slide Image"
      />
    </div>
  );
};
