/* eslint-disable no-console */
import { useState, useEffect } from 'react';

import { ExhibitModel } from '@smb/smb-react-components-library';

import { useDependency } from '../providers/index';

const getRelatedSearchTermFromExhibit = (exhibit?: ExhibitModel): string => {
  if (exhibit?.involvedParties?.length) {
    return typeof exhibit?.involvedParties[0] === 'string'
      ? exhibit.involvedParties[0]
      : exhibit.involvedParties[0].name || exhibit.involvedParties[0].formatted;
  } else if (exhibit?.technicalTerm) {
    return typeof exhibit.technicalTerm === 'string'
      ? exhibit.technicalTerm
      : exhibit.technicalTerm.formatted;
  } else if (exhibit?.title) {
    return typeof exhibit.title === 'string'
      ? exhibit.title
      : exhibit.title.formatted;
  }
  return '';
};

type UseRelatedExhibitsResult = {
  loading: boolean;
  exhibits: ExhibitModel[];
};

export const useRelatedExhibits = (exhibit?: ExhibitModel): UseRelatedExhibitsResult => {
  const { searchService } = useDependency();

  const [loading, setLoading] = useState<boolean>(true);
  const [relatedExhibits, setRelatedExhibits] = useState<ExhibitModel[]>([]);

  useEffect(() => {
    setLoading(true);
    const relatedSearchTerm = getRelatedSearchTermFromExhibit(exhibit);

    if (relatedSearchTerm) {
      (async () => {
        try {
          const { objects: searchObjects } = await searchService.search({
            question: relatedSearchTerm,
            offset: 0,
            language: 'de',
          });

          const _relatedExhibits = searchObjects?.filter(s => s.id !== exhibit?.id) ?? [];

          setRelatedExhibits(_relatedExhibits);
        } catch (e) {
          setRelatedExhibits([]);
        }

        setLoading(false);
      })();
    }
  }, [exhibit?.id]);

  return { loading, exhibits: relatedExhibits };
};
