import React, { ReactElement } from 'react';
import { Modal } from '@material-ui/core';

import useStyles from './mediaPlayerOverlay.jss';
import { MediaPlayerContext } from '../MediaPlayerContext/MediaPlayerContext';

export function MediaPlayerOverlay({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const classes = useStyles();

  return (
    <MediaPlayerContext.Consumer>
      {(mediaPlayerContext): ReactElement => (
        <Modal
          className={classes.modal}
          open={
            mediaPlayerContext.open !== undefined
              ? mediaPlayerContext.open
              : true
          }
          onClose={mediaPlayerContext.togglePlayerPlaying}
        >
          <div>{children}</div>
        </Modal>
      )}
    </MediaPlayerContext.Consumer>
  );
}
