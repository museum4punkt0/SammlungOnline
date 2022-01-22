import React from 'react';

export interface ILazyLoadImageProps {
  width?: number | string;
  height?: number | string;
  src?: string;
  size?: 'cover' | 'contain';
  onClick?: () => void;
  Fallback?: React.ReactNode;
}
