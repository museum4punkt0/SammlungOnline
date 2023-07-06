import React from 'react';

import { Backdrop, IconButton, Modal } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ImageZoom from '../ImageZoom/ImageZoom';

import { ViewerProvider } from 'use-open-seadragon';

import useStyles from './imageZoomModal.jss';
import { IImageZoomModal } from '../../types';

export const ImageZoomModal: React.FC<IImageZoomModal> = ({
  open,
  src,
  onClose,
}) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={onClose}
      onContextMenu={(event) => {
        event?.preventDefault();
        event?.stopPropagation();
      }}
    >
      <Backdrop open={open}>
        <div className={classes.container}>
          <ViewerProvider>
            <ImageZoom src={src} />
          </ViewerProvider>
          <IconButton className={classes.closeButton} onClick={onClose}>
            <CloseOutlinedIcon fontSize={'large'}/>
          </IconButton>
        </div>
      </Backdrop>
    </Modal>
  );
};
