import { useState, useEffect } from 'react';

import { ExhibitModel } from 'smb-react-components-library';

import { useExhibitId } from '../../../core/hooks/use-exhibit-id.hook';
import { useSearchQuery } from '../../../core/hooks/use-search-query.hook';
import { useDependency } from '../../../core/store/dependency.context';

export type UseExhibitPaginationResult = [ExhibitModel | null, ExhibitModel | null];

export const useExhibitPagination = (offset: number): UseExhibitPaginationResult => {
    const exhibitId = useExhibitId();
    const { searchService, searchFiltersManager } = useDependency();
    const [paginationResult, setPaginationResult] = useState<[ExhibitModel | null, ExhibitModel | null]>([null, null]);

    const searchObject = useSearchQuery();

    useEffect(() => {
        (async () => {
            try {
                const filters = searchFiltersManager.createFilters(searchObject);

                const _offset = offset - 1;

                const { objects: neighbouringObjects } = await searchService.search({
                    ...searchObject,
                    filters,
                    offset: _offset > 0 ? _offset : 0,
                    limit: 3,
                });

                const indexOfCurrentExhibhit = neighbouringObjects.findIndex(
                    (neighbouringObject) => neighbouringObject.id == exhibitId,
                );

                let previous = null;
                let next = null;

                if (indexOfCurrentExhibhit === 1) {
                    previous = neighbouringObjects[indexOfCurrentExhibhit - 1];
                    next = neighbouringObjects[indexOfCurrentExhibhit + 1];
                } else if (indexOfCurrentExhibhit === 0) {
                    next = neighbouringObjects[indexOfCurrentExhibhit + 1];
                } else if (indexOfCurrentExhibhit === 2) {
                    previous = neighbouringObjects[indexOfCurrentExhibhit - 1];
                }

                setPaginationResult([previous, next]);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [offset]);

    return paginationResult;
};
