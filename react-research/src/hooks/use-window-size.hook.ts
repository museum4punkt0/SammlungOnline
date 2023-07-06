import { useEffect, useState } from 'react';

/**
 * Hook for getting current window size (width, height).
 * Listens for a resize event and updates size state.
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<number[]>([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return [...windowSize];
};
