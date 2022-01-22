import React, { useMemo } from 'react';
import { useOpenSeadragon, useZoom } from 'use-open-seadragon';

import { IconButton } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';

import useStyles from './imageZoom.jss';
import { UserOpenSeadragonOptions } from 'use-open-seadragon/lib/types/config/options';
import { IImageZoomProps } from '../../types';


const ImageZoom: React.FC<IImageZoomProps> = ({ src }) => {
  const { zoomIn, zoomOut } = useZoom();

  const osdOptions = useMemo((): UserOpenSeadragonOptions => {
    return {
      showNavigator: true,
      navigatorPosition: 'BOTTOM_RIGHT',
      navigatorAutoFade: true,
      navigatorHeight: 200,
      navigatorWidth: 200,
      maxZoomLevel: 10,
    };
  }, []);

  const sources = useMemo(() => {
    return [{ type: 'image', url: src }];
  }, [src]);

  const [imageZoomRef] = useOpenSeadragon(sources, osdOptions);

  const classes = useStyles();

  return (
    <>
      <div ref={imageZoomRef} className={classes.imageZoom} />
      <div className={classes.buttonContainer}>
        <IconButton color="inherit" onClick={zoomIn}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
        <IconButton color="inherit" onClick={zoomOut}>
          <RemoveCircleOutlineOutlinedIcon />
        </IconButton>
      </div>
    </>
  );
};

const propsAreEqual = (previousProps: IImageZoomProps, nextProps: IImageZoomProps) => {
  return previousProps.src !== nextProps.src;
};

export default React.memo(ImageZoom, propsAreEqual);
