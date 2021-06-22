import React, { ReactElement } from 'react';
import { useOpenSeadragon, useZoom } from 'use-open-seadragon';
import { UserOpenSeadragonOptions } from 'use-open-seadragon/lib/types/config/options';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';

import useStyles from './imageZoom.jss';

interface Tiles {
    type: string;
    url: string;
}

const ImageZoomComponent = ({
    tiles,
    osdOptions,
}: {
    tiles: Tiles;
    osdOptions?: UserOpenSeadragonOptions;
}): ReactElement => {
    const classes = useStyles();
    const [imageZoom] = useOpenSeadragon(tiles, osdOptions);
    const { zoomIn, zoomOut } = useZoom();

    return (
        <>
            <div ref={imageZoom} className={classes.imageZoom} />
            <div className={classes.buttonContainer}>
                <IconButton color={'inherit'} onClick={zoomIn}>
                    <AddCircleOutlineOutlinedIcon />
                </IconButton>
                <IconButton color={'inherit'} onClick={zoomOut}>
                    <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
            </div>
        </>
    );
};

const ImageZoom = React.memo(ImageZoomComponent, (prevProps, nextProps) => prevProps.tiles.url === nextProps.tiles.url);

export default ImageZoom;
