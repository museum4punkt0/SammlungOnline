import React from 'react';
// import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
// import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';

import './exhibit-actions.scss';

interface IExhibitActionsProps {
  className?: string;
  showImageActions?: boolean;
  showPermlinkActions?: boolean;
  // showCSVActions?: boolean;
  zoomActionLabel?: string;
  downloadActionLabel?: string;
  // downloadCSVActionLabel?: string;
  onZoom?: () => void;
  onDownload?: () => void;
  // onCSVDownload?: () => void;
  onCopy?: () => void;
}

const ExhibitActions: React.FC<IExhibitActionsProps> = props => {
  const {
    className,
    showImageActions = false,
    showPermlinkActions = false,
    // showCSVActions = false,
    zoomActionLabel = 'zoom',
    downloadActionLabel = 'download',
    // downloadCSVActionLabel = 'csv',
    onZoom,
    onDownload,
    // onCSVDownload,
    onCopy,
  } = props;

  const { t } = useTranslation();
  // const classes = useStyles();

  return (
    <div className={`${className}  exhibit-actions`}>
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
      {showImageActions && onDownload && (
        <Tooltip title={'Download'} arrow={true}>
          <IconButton
            color="inherit"
            aria-label={downloadActionLabel}
            data-testid={'object-actions-download'}
            onClick={onDownload}
            className={`exhibit-actions__btn`}
          >
            <SaveAltOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      )}
      {showImageActions && onZoom && (
        // <Tooltip title={'Zoom'} arrow={true}>
        <IconButton
          color="inherit"
          id="actions-zoom"
          aria-label={zoomActionLabel}
          data-testid={'object-actions-zoom'}
          className={`exhibit-actions__btn`}
          onClick={onZoom}
        >
          <ZoomInOutlinedIcon />
        </IconButton>
        // </Tooltip>
      )}
      {/* {showCSVActions && onCSVDownload && (
        <Tooltip title={'Download CSV'} arrow={true}>
          <IconButton
            color="inherit"
            aria-label={downloadCSVActionLabel}
            data-testid={'object-actions-download'}
            onClick={onCSVDownload}
            className={`exhibit-actions__btn exhibit-actions__btn--csv`}
          >
            <SvgIcon fontSize="large">
              <path
                fill="none"
                stroke="#000"
                strokeWidth="1.9"
                d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L4,23 M18,1 L18,6 L23,6 M7,13 C7,13 6.00000004,13 5,13 C3.99999996,13 3,13.5 3,14.5 L3,16 C3,16 3.00000001,16.5 3,17.5 C2.99999999,18.5 4,19 5,19 L7,19 M13.25,13 C13.25,13 12.25,13 10.75,13 C9.25,13 8.75,13.5 8.75,14.5 C8.75,15.5 9.25,16 10.75,16 C12.25,16 12.75,16.5 12.75,17.5 C12.75,18.5 12.25,19 10.75,19 C9.25,19 8.25,19 8.25,19 M20.5,12 C20.5,12 20.5,12 20.5,12.5 C20.5,13 18,19 18,19 L17.5,19 C17.5,19 15,13 15,12.5 L15,12"
              />
            </SvgIcon>
          </IconButton>
        </Tooltip>
      )} */}
      {showPermlinkActions && onCopy && (
        <Tooltip title={`${t('details.aside.permalinkCopied')}`} arrow={true}>
          <IconButton
            color="inherit"
            aria-label={`${t('details.aside.permalinkCopied')}`}
            data-testid={'object-actions-permlink'}
            className={`exhibit-actions__btn`}
            onClick={onCopy}
          >
            <LinkOutlinedIcon color="primary" fontSize="large" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default ExhibitActions;
