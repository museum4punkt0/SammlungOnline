import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import QueryParamsService from '../../../../../utils/query-params/query-params.service';

const exhibitOffsetQueryParamsKey = 'exhibitOverviewOffset';

export const useCurrentExhibitOffset = () => {
  const history = useHistory();

  const queryParamsManagerService = new QueryParamsService(history.location.search);
  const defaultExhibitOverviewOffset = Number(
    queryParamsManagerService.get(exhibitOffsetQueryParamsKey),
  );

  const [offset, setOffset] = useState(defaultExhibitOverviewOffset);

  useEffect(() => {
    return history.listen(location => {
      const queryParamsManagerService = new QueryParamsService(location.search);
      const exhibitOverviewOffset = Number(
        queryParamsManagerService.get(exhibitOffsetQueryParamsKey),
      );
      setOffset(exhibitOverviewOffset);
    });
  }, [history]);

  return offset;
};
