import React from 'react';

import { Backdrop, IconButton, Modal } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ImageZoom from './ImageZoom/ImageZoom';

import { ViewerProvider } from 'use-open-seadragon';

import useStyles from './imageZoomModal.jss';

interface IImageZoomModal {
  open: boolean;
  src: string;
  onClose: () => void;
}

const ImageZoomModal: React.FC<IImageZoomModal> = ({ open, src, onClose }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose}>
      <Backdrop open={open}>
        <div className={classes.container}>
          <ViewerProvider>
            <ImageZoom src={src} />
          </ViewerProvider>
          <IconButton className={classes.closeButton} onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </div>
      </Backdrop>
    </Modal>
  );
};

export default ImageZoomModal;
