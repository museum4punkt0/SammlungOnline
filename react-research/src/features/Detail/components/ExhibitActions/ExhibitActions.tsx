import React from 'react';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';

import useStyles from './exhibitActions.jss';

interface IExhibitActionsProps {
  classNames?: string;
  showImageActions?: boolean;
  zoomActionLabel?: string;
  downloadActionLabel?: string;
  onZoom?: () => void;
  onDownload?: () => void;
}

const ExhibitActions: React.FC<IExhibitActionsProps> = (props) => {
  const {
    classNames,
    showImageActions = false,
    zoomActionLabel,
    downloadActionLabel,
    onZoom,
    onDownload,
  } = props;

  const classes = useStyles();

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
          color="inherit"
          aria-label={downloadActionLabel || 'download'}
          data-testid={'object-actions-download'}
          onClick={() => onDownload && onDownload()}
        >
          <SaveAltOutlinedIcon />
        </IconButton>
      )}
      {showImageActions && (
        <IconButton
          color="inherit"
          aria-label={zoomActionLabel || 'zoom'}
          data-testid={'object-actions-zoom'}
          onClick={() => onZoom && onZoom()}
        >
          <ZoomInOutlinedIcon />
        </IconButton>
      )}
    </div>
  );
};

export default ExhibitActions;
