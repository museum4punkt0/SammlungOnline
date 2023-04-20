/* eslint-disable no-console */
import { createRef, RefObject, useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export type UseHeaderFadeInOutAnimationResult = {
  opacity: number;
  visibility: string;
  ref: RefObject<HTMLDivElement>;
};

const useHeaderFadeInOutAnimation = (): UseHeaderFadeInOutAnimationResult => {
  const [ref] = useState<RefObject<HTMLDivElement>>(
    createRef<HTMLDivElement>(),
  );
  const [appBarOpacity, setAppBarOpacity] = useState<number>(1);
  const [appBarVisibility, setAppBarVisibility] = useState<
    'visible' | 'hidden'
  >('visible');
  const history = useHistory();

  const updateAppBarOpacity = () => {
    if (!ref!.current) {
      return;
    }
    const nativeElement = ref!.current!;

    const { scrollY } = window;

    let opacity;
    let currectOpacity;

    let visibility: 'visible' | 'hidden';

    if (!scrollY) {
      opacity = 1;
      visibility = 'visible';
    } else if (scrollY - 50 >= nativeElement.offsetHeight) {
      opacity = 0;
      visibility = 'hidden';
    } else {
      currectOpacity =
        (nativeElement.offsetHeight - scrollY - 50) /
        nativeElement.offsetHeight;
      opacity = currectOpacity > 0 ? currectOpacity : 0;

      visibility = opacity === 0 ? 'hidden' : 'visible';
    }

    setAppBarVisibility(visibility);
    setAppBarOpacity(opacity);
  };

  useLayoutEffect(() => {
    const unregisterHistoryListener = history.listen(updateAppBarOpacity);
    document.addEventListener('scroll', updateAppBarOpacity);

    return () => {
      unregisterHistoryListener();
      document.removeEventListener('scroll', updateAppBarOpacity);
    };
  }, []);

  return {
    opacity: appBarOpacity,
    visibility: appBarVisibility,
    ref,
  };
};

export default useHeaderFadeInOutAnimation;
