import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryRoot, SmbTopics } from '../generated/graphql';
import { ConfigLoader, EGraphqlTranslationAttributesFields } from '@smb/smb-react-components-library';

const config = ConfigLoader.CurrentConfig;

// Query for data ob the topics landing-page
const FetchTopics = gql`
  query FetchTopics($lang: String!) {
    smb_topics(order_by: { id: desc }) {
      id
      has_slide
      preview_image
      topics_translations(where: { language: { lang: { _eq: $lang } } }) {
        description
        title
      }
      objects {
        object {
          id
        }
      }
    }
  }
`;

// Query for data of a single topic.
const FetchTopic = gql`
    query FetchTopic($id: bigint!, $lang: String!, $title: String!) {
        smb_topics_by_pk(id: $id) {
            preview_image
            objects {
                object {
                    id
                    attachments(where: {primary: {_eq: true}}) {
                        attachment
                        primary
                    }
                    attribute_translations(where: { 
                        attribute_key: { _eq: $title }, 
                        language: {lang: {_eq: $lang}}
                    }) {
                        value
                        attribute_key
                    }
                }
            }
            topics_translations(where: { language: { lang: { _eq: $lang } } }) {
                title
                description
            }
        }
    }
`;

class TopicsRepository {
  fetchTopics(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: Array<SmbTopics> | null;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchTopics, {
      variables: { lang: lang },
    });
    let resultData = null;

    if (!loading && data) {
      resultData = data.smb_topics;
    }

    return { loading, error, data: resultData };
  }

  fetchTopic(
    id: number,
    lang: string,
  ): {
    loading: boolean;
    error: ApolloError | undefined;
    data: SmbTopics | null;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchTopic, {
      variables: { id: id, lang: lang, title: EGraphqlTranslationAttributesFields.title },
    });
    let resultData = null;

    if (!loading && data && data.smb_topics_by_pk) {
      resultData = data.smb_topics_by_pk;
    }

    return { loading, error, data: resultData };
  }
}

export default TopicsRepository;
