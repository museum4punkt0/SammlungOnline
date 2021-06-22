import { useEffect, useState } from 'react';
import allSettled from 'promise.allsettled/implementation';

export function useLazyImageLoader(src: string): { loadingImage: boolean; imageSrc?: string; loadingError: boolean } {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>('');

    useEffect(() => {
        const img = new Image();
        if (img) {
            img.onload = (): void => {
                setLoading(false);
                setImageSrc(src);
            };
            img.onerror = (): void => {
                setLoading(false);
                setError(true);
            };
            img.src = src;
        }

        return () => {
            img.src = '';
        };
    }, [src]);

    return { loadingImage: loading, imageSrc: imageSrc, loadingError: error };
}

export function useLazyImagesLoader(srcs: string[]): { loadingImages: boolean; loadingError: boolean } {
    const [loading, setLoading] = useState(true);
    const [error] = useState(false);

    useEffect(() => {
        const imgPromises: Promise<void>[] = [];

        for (const i in srcs) {
            imgPromises.push(
                new Promise(async (resolve) => {
                    const img = new Image();
                    img.onload = (): void => {
                        resolve();
                    };
                    img.src = srcs[i];
                }),
            );
        }

        allSettled(imgPromises).then(() => {
            setLoading(false);
        });
    }, [srcs]);

    return { loadingImages: loading, loadingError: error };
}
