import React, { ReactElement } from 'react';
import { useLazyImageLoader } from './LazyImageLoader';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function LazyImage({
    src,
    children,
    fallback,
}: {
    src: string;
    children: ReactElement;
    fallback?: ReactElement;
}): ReactElement {
    const { loadingImage, loadingError } = useLazyImageLoader(src);
    if (loadingImage) {
        return <LoadingSpinner />;
    }
    if (fallback !== undefined && loadingError && !loadingImage) {
        return fallback;
    }
    return children;
}

export default LazyImage;
