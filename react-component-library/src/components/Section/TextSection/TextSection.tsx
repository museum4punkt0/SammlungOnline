/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import { TextSectionData } from './TextSectionContext';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LanguageService from 'src/utils/LanguageService';

import './textSection.scss';
export function TextSection({
  textSectionData,
  target = '_blank',
  noPadding,
}: // isFooter = false,
{
  textSectionData: TextSectionData;
  target?: string;
  noPadding?: boolean;
  isFooter?: boolean;
}): ReactElement {
  const lang = LanguageService.getCurrentStrapiLanguage();

  const getButtonCss = () => {
    return noPadding
      ? 'text-card__button text-card__button--no-padding'
      : 'text-card__button';
  };

  function createMarkup(richText: string) {
    return { __html: richText };
  }

  const getTextClassVariant = () => {
    return lang === 'de-LS'
      ? 'text-card__rich-text text-card__rich-text__leichte-sprache'
      : 'text-card__rich-text';
  };

  return (
    <div className={'text-card'}>
      <div className={'text-card__header'}>
        <Typography
          className={'text-card__header--headline'}
          variant={'h1'}
          component={'h2'}
        >
          {textSectionData.title} {textSectionData.subtitle && ' – '}
        </Typography>
        <Typography
          variant={'h1'}
          component="h3"
          className={'text-card__header--headline2'}
        >
          {textSectionData.subtitle}
        </Typography>
      </div>

      <div className={'text-card__horizontal-line'} />

      <Typography
        className={getTextClassVariant()}
        variant={'body2'}
        component={'div'}
        dangerouslySetInnerHTML={createMarkup(textSectionData.text)}
      />

      {textSectionData.link &&
        textSectionData.link.href &&
        textSectionData.link.caption && (
          <div className={getButtonCss()}>
            <Link
              className={'text-card__button__link'}
              href={textSectionData.link.href}
              target={target}
              aria-label={`Link zu ${textSectionData.title}`}
              variant={'subtitle1'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="68.7"
                height="52.842"
                viewBox="0 0 68.7 52.842"
                className={'text-card__button__arrow'}
              >
                <path
                  id="icon_arrow_link"
                  d="M51.568,19.816H0V33.026H51.568V52.842L68.7,26.421,51.568,0V19.816Z"
                  fill="#0f0900"
                />
              </svg>
              {textSectionData.link.caption}
            </Link>
          </div>
        )}
    </div>
  );
}
