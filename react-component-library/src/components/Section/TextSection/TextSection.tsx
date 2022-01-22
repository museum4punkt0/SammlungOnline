import React, { ReactElement } from 'react';
import { TextSectionData } from './TextSectionContext';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Button from '@material-ui/core/Button';

import useStyles from './textSection.jss';

export function TextSection({
  textSectionData,
  isWrapped,
}: {
  textSectionData: TextSectionData;
  isWrapped?: boolean | undefined;
}): ReactElement {
  const classes = useStyles();
  return (
    <div
      className={isWrapped ? classes.content : classes.standalone}
      style={{ backgroundColor: textSectionData.moduleBackgroundColor }}
    >
      <div className={classes.contentWrapper}>
        <div className={classes.headlineWrapper}>
          <Typography
            variant={'h2'}
            style={{ color: textSectionData.titleColor }}
          >
            {textSectionData.title}
          </Typography>
          <Typography
            component="div"
            variant={'h3'}
            style={{ color: textSectionData.titleColor }}
          >
            {textSectionData.subtitle}
          </Typography>
        </div>
        <div
          className={classes.horizontalLine}
          style={{ backgroundColor: textSectionData.titleColor }}
        />
        <div
          className={classes.textArea}
          style={{ backgroundColor: textSectionData.textAreaColor }}
        >
          <Typography
            className={classes.textContent}
            variant={'body2'}
            style={{ color: textSectionData.textColor }}
          >
            {textSectionData.text}
          </Typography>
          <div className={classes.buttonArea}>
            <Button
              tabIndex={0}
              className={classes.buttonLink}
              href={textSectionData.link.href}
              style={{
                color: textSectionData.textColor,
                outlineColor: textSectionData.textColor,
              }}
              target={'_blank'}
            >
              {textSectionData.link.caption}
              <ArrowRightAltIcon
                className={classes.buttonLinkArrow}
                style={{ color: textSectionData.textColor }}
                fontSize={'large'}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

