export interface IImageZoomProps {
  src: string;
}

export interface IImageZoomModal {
  open: boolean;
  src: string;
  onClose: () => void;
}

