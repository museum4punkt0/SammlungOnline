import { useEffect, useRef, useState } from 'react';

type UseLazyLoadIMageResult = {
  isError: boolean;
  isLoading: boolean;
  source: string | null;
  blockRef: any;
};

const useLazyLoadImage = (src: string): UseLazyLoadIMageResult => {
  const [source, setSource] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const blockReactRef = useRef<HTMLElement>(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imageRef = new Image();

  imageRef.addEventListener('load', handleLoad);
  imageRef.onerror = () => {
    setIsLoading(false);
    setIsError(true);
  };

  const loadImage = (_src: string) => {
    setIsError(false);
    setIsLoading(true);
    setSource(_src);

    imageRef.src = _src;
  };

  useEffect(() => {
    let didCancel = false;
    let observer: IntersectionObserver;

    if (blockReactRef.current !== null && source !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                loadImage(src);

                if (blockReactRef.current) {
                  observer.unobserve(blockReactRef.current);
                }
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '0%',
          },
        );

        observer.observe(blockReactRef.current);
      } else {
        loadImage(src);
      }
    }

    return () => {
      didCancel = true;
      if (blockReactRef.current) {
        observer?.unobserve(blockReactRef.current);
      }
    };
  }, [src, source, blockReactRef.current]);

  useEffect(() => {
    return () => {
      imageRef.removeEventListener('load', handleLoad);
    };
  }, []);

  return { isLoading, isError, source, blockRef: blockReactRef };
};

export default useLazyLoadImage;
