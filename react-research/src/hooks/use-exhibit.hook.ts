import { useEffect, useState } from 'react';
import { ExhibitModel } from '@smb/smb-react-components-library';

import { useDependency } from '../providers/index';

export type UseFetchExhibitResult = {
  exhibit: ExhibitModel | null;
  loading: boolean;
  error: Error | false;
};

export const useFetchExhibit = (id: number): UseFetchExhibitResult => {
  const { exhibitService } = useDependency();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | false>(false);
  const [exhibit, setExhibit] = useState<ExhibitModel | null>(null);

  useEffect(() => {
    (async () => {
      const _exhibitOrError = await exhibitService.findOne(id);
      if (_exhibitOrError instanceof Error) {
        setError(_exhibitOrError);
      } else {
        setExhibit(_exhibitOrError);
      }
      setLoading(false);
    })();
  }, [id]);

  return {
    exhibit,
    loading,
    error,
  };
};
