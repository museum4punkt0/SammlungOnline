/* eslint-disable no-console */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link, Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import {
  IAttachment,
  FallbackImage,
  LazyLoadImage,
} from '@smb/smb-react-components-library';

import useStyles from './exhibitPreview.jss';

interface IExhibitPreviewProps {
  attachments: IAttachment[];
  creditsLabel: string;
  currentAttachment: IAttachment | null;
  renderDownloadActions: () => React.ReactNode;
  renderZoomActions: () => React.ReactNode;
  onChange?: (attachment: IAttachment) => void;
}

export const MISSING_IMAGES_WITH_REASONS = [5802648, 6545994, 6548841];

const ExhibitPreview: React.FC<IExhibitPreviewProps> = props => {
  const {
    attachments,
    currentAttachment,
    creditsLabel,
    onChange,
    renderDownloadActions,
    renderZoomActions,
  } = props;

  const { id, credits, license, src } = currentAttachment ?? {};
  const { t } = useTranslation();

  const classes = useStyles();

  const specialReason = MISSING_IMAGES_WITH_REASONS.includes(id as number);

  const reasonText = specialReason
    ? t(`details.attachment.missingImageReasons.${id}`)
    : t('image.notFoundText');

  const renderFallbackImage = () => {
    return <FallbackImage text={reasonText} width="100%" height="100%" />;
  };

  const getSelectedClass = (previewSrc: string | undefined, src: string) => {
    return previewSrc === src ? 'selected' : '';
  };

  return (
    <div className={classes.container}>
      <Grid
        data-testid={'detail-page-image-container'}
        aria-label={`Objektabbildung`}
        className={classes.imgContainer}
        item
        container
        justifyContent="center"
      >
        <LazyLoadImage
          Fallback={renderFallbackImage()}
          width="100%"
          height="100%"
          src={specialReason ? '#' : src}
        />
        {renderZoomActions()}
      </Grid>

      {!specialReason && (
        <div className={classes.pictureCreditsWrapper}>
          <Typography variant="caption" className={classes.pictureCredits}>
            {credits && `${creditsLabel}: ${credits}`}
            {license && license.href && (
              <Link
                className={classes.license}
                href={license.href}
                target={license.target || '_blank'}
              >
                {license.text}
                <svg
                  className={classes.svg}
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 195 191"
                >
                  <g fill="#000">
                    <path d="M185.818,0.161 L128.778,0.161 C123.807,0.161 119.778,4.19 119.778,9.161 C119.778,14.132 123.807,18.161 128.778,18.161 L164.09,18.161 L77.79,104.461 C74.275,107.976 74.275,113.674 77.79,117.189 C79.548,118.946 81.851,119.825 84.154,119.825 C86.457,119.825 88.76,118.946 90.518,117.189 L176.818,30.889 L176.818,66.202 C176.818,71.173 180.847,75.202 185.818,75.202 C190.789,75.202 194.818,71.173 194.818,66.202 L194.818,9.162 C194.818,4.19 190.789,0.161 185.818,0.161 Z" />
                    <path d="M149,75.201 C144.029,75.201 140,79.23 140,84.201 L140,172.657 L18,172.657 L18,50.657 L111.778,50.657 C116.749,50.657 120.778,46.628 120.778,41.657 C120.778,36.686 116.749,32.657 111.778,32.657 L9,32.657 C4.029,32.657 0,36.686 0,41.657 L0,181.657 C0,186.628 4.029,190.657 9,190.657 L149,190.657 C153.971,190.657 158,186.628 158,181.657 L158,84.201 C158,79.23 153.971,75.201 149,75.201 Z" />
                  </g>
                </svg>
              </Link>
            )}
            {license && !license.href && <div>{license.text}</div>}
          </Typography>
          {renderDownloadActions()}
        </div>
      )}

      {attachments?.length > 1 && (
        <div className={classes.imgFlexWrapper}>
          <div className={`${classes.imgFlexWrapperInner}`}>
            {attachments.map((attachment, i) => {
              return (
                <LazyLoadImage
                  cssClass={getSelectedClass(src, attachment?.src) as string}
                  key={i}
                  width="100%"
                  height="100%"
                  src={specialReason ? '#' : attachment?.src}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                    onChange && onChange(attachment);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExhibitPreview;
