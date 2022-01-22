import { useCallback, useEffect } from 'react';

const useRemoveFocusWhenNotTab = (): void => {
  const handleFirstTab = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 9) {
      document.body.classList.add('user-is-tabbing');
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    document.body.classList.remove('user-is-tabbing');
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  });
};

export default useRemoveFocusWhenNotTab;
