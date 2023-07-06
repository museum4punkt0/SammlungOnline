import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { LazyLoadImage } from '../../../../../components/LazyLoadImage/components/LazyLoadImage';

import useStyles from './exhibitPreview.jss';

import { IExhibitPreviewProps } from '../types';
import { FallbackImage } from '../../../../../components';

export const ExhibitPreview: React.FC<IExhibitPreviewProps> = (props) => {
  const { attachments, currentAttachment, creditsLabel, onChange } = props;
  const { t } = useTranslation();

  const classes = useStyles();

  const { credits, license, src } = currentAttachment ?? {};

  const renderFallbackImage = () => {
    return (
      <FallbackImage
        text={t('image.notFoundText')}
        width="100%"
        height="100%"
      />
    );
  };

  return (
    <Grid className={classes.container} justifyContent="center" container>
      <Grid item lg={1} md={1} sm={12} />
      <Grid
        item
        container
        justifyContent="center"
        lg={8}
        md={8}
        sm={12}
        xs={12}
      >
        <div className={classes.imgContainer}>
          <LazyLoadImage
            Fallback={renderFallbackImage()}
            width="100%"
            height="100%"
            src={src}
          />
        </div>
        <Typography variant="caption" className={classes.pictureCredits}>
          {credits && `${creditsLabel}: ${credits}`}
          {license && license.href && (
            <a className={classes.license} href={license.href} target={license.target || '_blank'}>
              {license.text}
            </a>
          )}
          {license && !license.href && (
            <div className={classes.license}>{license.text}</div>
          )}
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="flex-end"
        justifyContent="flex-end"
        lg={1}
        md={1}
        sm={12}
      >
        <div className={classes.imgPreviewContainer}>
          <div className={classes.imgFlexWrapper}>
            {attachments?.length > 1 &&
              attachments.map((attachment, i) => {
                return (
                  <div key={i} style={{ height: '86px' }}>
                    <LazyLoadImage
                      width="86px"
                      height="86px"
                      src={attachment?.src}
                      onClick={() => onChange && onChange(attachment)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
