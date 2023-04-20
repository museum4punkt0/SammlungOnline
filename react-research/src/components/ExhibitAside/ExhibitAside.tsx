/* eslint-disable no-console */
import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ExhibitAsideLinks, ExhibitAsideText } from '../index';
import { IAsideContainerItem, IAsideInfoItem } from '../../types/index';

import './exhibit-aside.scss';
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { ExhibitModel, LinkBuilder } from '@smb/smb-react-components-library';

interface IExhibitAsideProps {
  infoItems: IAsideInfoItem[];
  containerElements: IAsideContainerItem[];
  creditLine?: string;
  shareImageUrl?: string;
  exhibit?: ExhibitModel;
}

const ExhibitAside: React.FC<IExhibitAsideProps> = props => {
  const { infoItems, containerElements, creditLine, shareImageUrl, exhibit } = props;
  const { t } = useTranslation();
  const exhibitID = exhibit?.id || 0;
  const shareButtonsLink = new LinkBuilder().getShareButtonHref(exhibitID);

  return (
    <Grid container spacing={2} className={'exhibit-aside'}>
      {infoItems.length > 0 && (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={'exhibit-aside__text-container'}
        >
          {infoItems.map((infoItem, i) => {
            return (
              <ExhibitAsideText
                key={i}
                title={infoItem.title}
                content={infoItem.content}
                content2={infoItem.content2}
                url={infoItem.url}
              />
            );
          })}
        </Grid>
      )}
      {creditLine && (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={'exhibit-aside__credit-line'}
        >
          <Typography>{creditLine}</Typography>
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {containerElements.map((containerElement, i) => {
          return (
            <ExhibitAsideLinks
              key={i}
              type={containerElement.type}
              links={containerElement.links}
              title={containerElement.title}
            />
          );
        })}

        <div className={'shareButtonsWrapper'}>
          <Typography variant="h6" component={'h6'} style={{ lineHeight: '32px' }}>
            {t('sharebuttons.title')}
          </Typography>
          <div className={'shareButtons'}>
            <FacebookShareButton
              url={shareButtonsLink}
              quote={'title'}
              className={'shareButton'}
            >
              <FacebookIcon size={32} round bgStyle={{ fill: 'black' }} />
            </FacebookShareButton>
            <TwitterShareButton url={shareButtonsLink} className={'shareButton'}>
              <TwitterIcon size={32} round bgStyle={{ fill: 'black' }} />
            </TwitterShareButton>
            {shareImageUrl && (
              <PinterestShareButton
                url={shareButtonsLink}
                media={shareImageUrl}
                description={exhibit?.title}
                className={'shareButton'}
              >
                <PinterestIcon size={32} round bgStyle={{ fill: 'black' }} />
              </PinterestShareButton>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ExhibitAside;
