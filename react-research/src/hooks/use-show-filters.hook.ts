import { useState } from 'react';
export interface IUseShowFiltersHandlers {
  toggle: (state?: boolean) => void;
}

export const useShowFilters = (): [boolean, IUseShowFiltersHandlers] => {
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = (state?: boolean) =>
    state ? setShowFilters(!state) : setShowFilters(!showFilters);

  return [showFilters, { toggle: toggleFilters }];
};
