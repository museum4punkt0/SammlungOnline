import React, { ReactElement } from 'react';
import { Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import useStyles from './hightlightButton.jss';

export type hightlightButtonProps = {
  caption: string;
  onClick: (event: any) => void;
  children?: ReactElement;
};

export function HighlightButton({
  caption,
  onClick,
  children,
}: hightlightButtonProps): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Button
      aria-label={t('button play')}
      className={classes.playButton}
      onClick={(event): void => onClick(event)}
    >
      <Typography
        component="div"
        variant={'h4'}
        className={clsx(classes.playButtonTypo)}
      >
        {caption}
      </Typography>
      {children}
    </Button>
  );
}

