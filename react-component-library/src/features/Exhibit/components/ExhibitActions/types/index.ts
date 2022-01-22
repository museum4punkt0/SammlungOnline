export interface IExhibitActionsProps {
  classNames?: string;
  showImageActions?: boolean;
  zoomActionLabel?: string;
  downloadActionLabel?: string;
  onZoom?: () => void;
  onDownload?: () => void;
}
