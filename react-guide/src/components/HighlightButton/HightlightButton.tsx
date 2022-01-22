import React, { ReactElement } from 'react';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import useStyles from './hightlightButton.jss';
import { useTranslation } from 'react-i18next';

function HighlightButton({
  caption,
  onClick,
  children,
}: {
  caption: string;
  onClick: (event: React.MouseEvent) => void;
  children?: ReactElement;
}): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={t('button play')}
      className={classes.playButton}
      onClick={(event: React.MouseEvent): void => onClick(event)}
    >
      <Typography variant={'h4'} className={clsx(classes.playButtonTypo)}>
        {caption}
      </Typography>
      {children}
    </div>
  );
}

export default HighlightButton;
