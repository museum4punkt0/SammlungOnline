import { useQuery } from '@apollo/react-hooks';

import { QueryRoot } from '../../../generated/graphql';

import { FetchTours, FetchToursByExhibitId } from './graphql';

class ToursRepository {
    public fetchTours(lang: string) {
        const { loading, error, data } = useQuery<QueryRoot>(FetchTours, { variables: { lang: lang } });

        return { loading, error, data: data?.smb_tours ?? null };
    }

    public fetchToursByExhibitId(exhibitId: number, lang: string) {
        const { loading, error, data } = useQuery<QueryRoot>(FetchToursByExhibitId, {
            variables: { object_id: exhibitId, lang },
        });

        return { loading, error, data: data?.smb_tours_objects ?? null };
    }
}

export default ToursRepository;
