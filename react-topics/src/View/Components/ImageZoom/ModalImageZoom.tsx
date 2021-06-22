import React, { ReactElement } from 'react';
import ImageZoom from './ImageZoom';
import Modal from '@material-ui/core/Modal';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { UserOpenSeadragonOptions } from 'use-open-seadragon/lib/types/config/options';
import { ViewerProvider } from 'use-open-seadragon';
import { IconButton } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import clsx from 'clsx';

import useStyles from './modelImageZoom.jss';

function ModalImageZoom({
    open,
    imageUrl,
    onClose,
    containerClasses = '',
}: {
    open: boolean;
    imageUrl: string;
    onClose: () => void;
    containerClasses?: string;
}): ReactElement {
    const classes = useStyles();
    const tiles = { type: 'image', url: imageUrl };
    const osdOptions: UserOpenSeadragonOptions = {
        showNavigator: true,
        navigatorPosition: 'BOTTOM_RIGHT',
        navigatorAutoFade: true,
        navigatorHeight: 200,
        navigatorWidth: 200,
        maxZoomLevel: 10,
    };

    // FIXME: Backdrop caused a react error
    return (
        <Modal open={open} onClose={onClose} style={{ zIndex: 1400 }}>
            <Backdrop open={open}>
                <div className={clsx(classes.container, containerClasses)}>
                    <ViewerProvider>
                        <ImageZoom tiles={tiles} osdOptions={osdOptions} />
                    </ViewerProvider>
                    <IconButton className={classes.closeButton} onClick={onClose} color={'inherit'}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </div>
            </Backdrop>
        </Modal>
    );
}

export default ModalImageZoom;
