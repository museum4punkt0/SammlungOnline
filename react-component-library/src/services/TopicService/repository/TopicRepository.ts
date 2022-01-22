import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryRoot, SmbTopics } from '../../../generated/graphql';
import { EGraphqlTranslationAttributesFields } from '../../../config/graphql-translation-attributes-fields.enum';


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
    query FetchTopic($id: bigint!, $lang: String!) {
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
                        attribute_key: { _eq: "${EGraphqlTranslationAttributesFields.title}" }, 
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

export const FetchTopicsByExhibitId = gql`
  query FetchObjectById($object_id: bigint!, $attributes: [String!], $lang: String!) {
    smb_topics_objects(where: { objects_id: { _eq: $object_id } }) {
      topic {
        id
        topics_translations(where: { language: { lang: { _eq: $lang } } }) {
          title
        }
      }
    }
  }
`;

class TopicRepository {
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
      variables: { id: id, lang: lang },
    });
    let resultData = null;

    if (!loading && data && data.smb_topics_by_pk) {
      resultData = data.smb_topics_by_pk;
    }

    return { loading, error, data: resultData };
  }
  public fetchTopicsByExhibitId(exhibitId: number, lang: string) {
    const { loading, error, data } = useQuery<QueryRoot>(FetchTopicsByExhibitId, {
      variables: { lang: lang, object_id: exhibitId },
    });

    return { loading, error, data: data?.smb_topics_objects };
  }
  
}

export default TopicRepository;
