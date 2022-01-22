import React, { ReactElement } from 'react';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import clsx from 'clsx';

import useStyles from './textContainer.jss';

export interface TextContainerTextElement {
  caption: string;
  href: string;
}

export enum TextContainerType {
  TEXT,
  TOPIC,
  GUIDE,
}

function TextContainer({
  containerType,
  title,
  elements,
}: {
  containerType: TextContainerType;
  title: string;
  elements: Array<TextContainerTextElement>;
}): ReactElement {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.content,
        { [classes.contentTopic]: containerType === TextContainerType.TOPIC },
        { [classes.contentGuide]: containerType === TextContainerType.GUIDE },
        { [classes.contentText]: containerType === TextContainerType.TEXT },
      )}
    >
      <Typography
        component="div"
        variant={'h5'}
        className={clsx(
          classes.typoTitle,
          { [classes.typoTopic]: containerType === TextContainerType.TOPIC },
          { [classes.typoGuide]: containerType === TextContainerType.GUIDE },
          { [classes.typoText]: containerType === TextContainerType.TEXT },
        )}
      >
        {title}
      </Typography>
      {elements.map((elem, index) => (
        <Link
          key={index}
          href={elem.href}
          color={'inherit'}
          className={clsx(
            classes.link,
            { [classes.typoTopic]: containerType === TextContainerType.TOPIC },
            { [classes.typoGuide]: containerType === TextContainerType.GUIDE },
            { [classes.typoText]: containerType === TextContainerType.TEXT },
          )}
        >
          {elem.caption}
          <ArrowRightAltIcon />
        </Link>
      ))}
    </div>
  );
}

export default TextContainer;
