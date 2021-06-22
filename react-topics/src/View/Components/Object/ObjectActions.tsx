import React, { ReactElement, useContext } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
// import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
// import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
// import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import ObjectContext, { ObjectContextData } from './ObjectContext';
import { useTranslation } from 'react-i18next';

import useStyles from './objectActions.jss';

function ObjectActions({
    classNames,
    showImageActions,
}: {
    classNames: string;
    showImageActions: boolean;
}): ReactElement {
    const classes = useStyles();
    const objectContextData: ObjectContextData = useContext<ObjectContextData>(ObjectContext);
    const { t } = useTranslation();
    return (
        <div className={clsx(classes.actionsContainer, classNames)}>
            {/* 
            <IconButton color={'inherit'} onClick={objectContextData.emailButtonPressed}>
                <EmailOutlinedIcon />
            </IconButton>
            <IconButton color={'inherit'} onClick={objectContextData.shareButtonPressed}>
                <ShareOutlinedIcon />
            </IconButton>
            <IconButton color={'inherit'} onClick={objectContextData.driveFileButtonPressed}>
                <InsertDriveFileOutlinedIcon />
            </IconButton>
            */}
            {showImageActions && (
                <IconButton
                    aria-label={t('download image')}
                    data-cy={'object-actions-download'}
                    color={'inherit'}
                    onClick={objectContextData.downloadButtonPressed}
                >
                    <SaveAltOutlinedIcon />
                </IconButton>
            )}
            {showImageActions && (
                <IconButton
                    aria-label={t('zoom in')}
                    data-cy={'object-actions-zoom'}
                    color={'inherit'}
                    onClick={objectContextData.zoomButtonPressed}
                >
                    <ZoomInOutlinedIcon />
                </IconButton>
            )}
        </div>
    );
}

export default ObjectActions;
