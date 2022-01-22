import { ApolloError } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { SmbTopics, QueryRoot } from '../../config/generated/graphql';

import { FetchTopics, FetchTopic, FetchTopicsByExhibitId } from './graphql';

class TopicsRepository {
  public fetchTopics(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: Array<SmbTopics> | null;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchTopics, {
      variables: { lang: lang },
    });

    return { loading, error, data: data?.smb_topics ?? null };
  }

  public fetchTopic(
    id: number,
    lang: string,
  ): { loading: boolean; error: ApolloError | undefined; data: SmbTopics | null } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchTopic, {
      variables: { id: id, lang: lang },
    });

    return { loading, error, data: data?.smb_topics_by_pk ?? null };
  }

  public fetchTopicsByExhibitId(exhibitId: number, lang: string) {
    const { loading, error, data } = useQuery<QueryRoot>(FetchTopicsByExhibitId, {
      variables: { lang: lang, object_id: exhibitId },
    });

    return { loading, error, data: data?.smb_topics_objects ?? null };
  }
}

export default TopicsRepository;
