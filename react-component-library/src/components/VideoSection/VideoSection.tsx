import React, { ReactElement } from 'react';
import ReactPlayer from 'react-player';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { IVideoSectionData } from './typeInterface';
import './videoSection.scss';

export function VideoSection({
  data,
  target = '_blank',
  noPadding,
}: {
  data: IVideoSectionData;
  target?: string;
  noPadding?: boolean;
  isFooter?: boolean;
}): ReactElement {
  const getButtoClassName = () => {
    return noPadding
      ? 'video-card__button video-card__button--no-padding'
      : 'video-card__button';
  };

  const getVideoContainerClassName = () => {
    return 'video-card__video-conatiner';
  };

  return (
    <div className={'video-card'}>
      <div className={'video-card__header'}>
        <Typography
          className={'video-card__header--headline'}
          variant={'h1'}
          component={'h2'}
        >
          {data.title} {data.subtitle && ' - '}
        </Typography>
        <Typography variant={'h1'} component="h3">
          {data.subtitle}
        </Typography>
      </div>

      <div className={'video-card__horizontal-line'} />

      <div className={getVideoContainerClassName()}>
        {data.assets.length > 0 &&
          data.assets.map((asset, index) => {
            return (
              <ReactPlayer
                key={`video-section-${index}`}
                className={'video-card__player'}
                url={asset.url}
                controls
              />
            );
          })}
        {data.link && data.link.href && data.link.caption && (
          <div className={getButtoClassName()}>
            <Link
              className={'video-card__button__link'}
              href={data.link.href}
              target={target}
              variant={'subtitle1'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="68.7"
                height="52.842"
                viewBox="0 0 68.7 52.842"
                className={'video-card__button__arrow'}
              >
                <path
                  id="icon_arrow_link"
                  d="M51.568,19.816H0V33.026H51.568V52.842L68.7,26.421,51.568,0V19.816Z"
                  fill="#0f0900"
                />
              </svg>
              {data.link.caption}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
