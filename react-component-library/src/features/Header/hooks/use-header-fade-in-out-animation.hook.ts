import { createRef, RefObject, useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export type UseHeaderFadeInOutAnimationResult = {
  display: string;
  opacity: number;
  ref: RefObject<HTMLDivElement>;
};

const useHeaderFadeInOutAnimation = (): UseHeaderFadeInOutAnimationResult => {
  const [ref] = useState<RefObject<HTMLDivElement>>(createRef<HTMLDivElement>());
  const [appBarOpacity, setAppBarOpacity] = useState<number>(1);
  const [appBarDisplay, setAppBarDisplay] = useState<'block' | 'none'>('block');
  const history = useHistory();

  const updateAppBarOpacity = () => {
    if (!ref!.current) {
      return;
    }
    const nativeElement = ref!.current!;


    const { scrollY } = window;

    let opacity;
    let display: 'none' | 'block';

    if (!scrollY) {
      opacity = 1;
      display = 'block';
    } else if (scrollY >= nativeElement.offsetHeight) {
      opacity = 0;
      display = 'none';
    } else {
      opacity = (nativeElement.offsetHeight - scrollY) / nativeElement.offsetHeight;
      display = opacity === 0 ? 'none' : 'block';
    }

    setAppBarDisplay(display);
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

  return { opacity: appBarOpacity, display: appBarDisplay, ref };
};

export default useHeaderFadeInOutAnimation;
