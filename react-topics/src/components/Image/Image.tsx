import React, { ReactElement } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FallbackImage } from '../FallbackImage/';
interface Img {
  alt: string;
  height?: number | string;
  width?: number | string;
  src: string;
  caption?: string;
  fallback?: React.ReactNode;
  onClick?: () => void;
}

function Image({
  alt,
  fallback,
  height,
  width,
  caption,
  onClick,
  src,
}: Img): ReactElement {
  const _fallback = fallback ? fallback : <FallbackImage text={''} />;
  const _img =
    src === '' ? (
      _fallback
    ) : (
      <LazyLoadImage alt={alt} height={height} src={src} width={width} />
    );
  return (
    <div
      style={{
        cursor: !onClick ? 'default' : 'pointer',
      }}
      onClick={onClick}
    >
      {_img}
      <span>{caption}</span>
    </div>
  );
}

export default Image;
