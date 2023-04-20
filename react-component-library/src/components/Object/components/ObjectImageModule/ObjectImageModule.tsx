import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { LoadingSpinner } from 'src';

import ObjectContext, {
  ObjectAttachment,
  ObjectContextData,
} from '../ObjectContext/ObjectContext';
import useStyles from './objectImageModule.jss';

const hasMultipleAttachments = (obj?: ObjectContextData) => {
  const attachments = obj?.objectData?.attachments;
  return attachments && attachments.length > 1;
};
const previewStyle = (image: string, cropped: boolean) => {
  return {
    backgroundImage: `url(${image})`,
    backgroundSize: cropped ? 'cover' : 'contain',
  };
};
const previewSize = (attachment: ObjectAttachment): string => {
  // TODO use size from config
  return attachment.resize(86, 86);
};

function ObjectImageModule({
  currentAttachment,
  cropped = true,
}: {
  currentAttachment?: ObjectAttachment;
  cropped?: boolean;
}): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  const objectContextData = useContext<ObjectContextData>(ObjectContext);
  if (!currentAttachment) {
    return (
      <div className={classes.container} data-testid={''}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.imgAside}></div>
        <div className={classes.imgContainer}>
          <div
            className={classes.imgFrame}
            style={{
              display: 'flex',
              alignContent: 'center',
              backgroundImage: `url(${currentAttachment.src})`,
            }}
          ></div>
          <div
            style={{
              alignSelf: 'flex-end',
              alignContent: 'center',
            }}
          >
            <Typography
              variant={'caption'}
              className={clsx(classes.pictureCredits)}
            >
              {t('attachment attribute picture credits')}:{' '}
              {currentAttachment.credits || 'Staatliche Museen zu Berlin'}
              {currentAttachment.license && (
                <a
                  className={clsx(classes.license)}
                  href={currentAttachment.license.href}
                  target={currentAttachment.license.target || '_blank'}
                >
                  {currentAttachment.license.text}
                </a>
              )}
            </Typography>
          </div>
        </div>

        <div className={classes.imgAside}>
          {hasMultipleAttachments(objectContextData) && (
            <div>
              <div className={classes.imgPreviewContainer}>
                <div className={classes.imgFlexWrapper}>
                  {objectContextData!.objectData!.attachments?.map(
                    (attachment, index): ReactElement => (
                      <LazyLoadComponent key={index}>
                        <div
                          className={classes.imgPreview}
                          key={index}
                          style={previewStyle(previewSize(attachment), cropped)}
                          onClick={() =>
                            objectContextData.previewClicked(attachment)
                          }
                        />
                      </LazyLoadComponent>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ObjectImageModule;
