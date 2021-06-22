import { useState } from 'react';

export interface IUseShowFiltersHandlers {
    toggle: () => void;
}

const useShowFilters = (): [boolean, IUseShowFiltersHandlers] => {
    const [showFilters, setShowFilters] = useState(false);
    const toggleFilters = () => setShowFilters(!showFilters);

    return [showFilters, { toggle: toggleFilters }];
};

export default useShowFilters;
