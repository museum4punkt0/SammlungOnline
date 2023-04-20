import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryRoot, SmbObjects } from '../../generated/graphql';
import {
  ConfigLoader,
  IConfiguration,
  EGraphqlTranslationAttributesFields,
} from 'src';

const FetchHighlights = gql`
  query FetchHighlights(
    $offset: Int!
    $limit: Int!
    $lang: String!
    $attributes: [String!]!
  ) {
    smb_highlights(
      order_by: { object_id: asc }
      offset: $offset
      limit: $limit
      distinct_on: object_id
    ) {
      object {
        id
        attachments(
          order_by: [{ primary: desc }, { attachment: asc }]
          limit: 1
        ) {
          attachment
          primary
        }
        attributes(
          where: {
            attribute_key: { _in: $attributes }
            language: { lang: { _eq: $lang } }
          }
        ) {
          attribute_key
          value
        }
      }
    }
    smb_highlights_aggregate {
      aggregate {
        count
      }
    }
  }
`;

class HighlightRepository {
  private readonly config: IConfiguration;

  constructor() {
    this.config = ConfigLoader.CurrentConfig;
  }

  fetchHighlightObjects(
    offset = 0,
    limit: number = this.config.CAROUSEL_CONFIG.CAROUSEL_HIGHLIGHTS_COUNT,
    lang: string,
  ): {
    loading: boolean;
    error: ApolloError | undefined;
    data: Array<SmbObjects> | null;
    resultCount: number;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchHighlights, {
      variables: {
        offset: offset,
        limit: limit,
        lang: lang,
        attributes: [
          EGraphqlTranslationAttributesFields.title,
          EGraphqlTranslationAttributesFields.technicalTerm,
          EGraphqlTranslationAttributesFields.collection,
        ],
      },
    });
    let resultData = null;
    let resultCount = 0;

    if (!loading && data) {
      resultData = data.smb_highlights.map((highlight) => highlight.object);
      if (data.smb_highlights_aggregate.aggregate?.count) {
        resultCount = data.smb_highlights_aggregate.aggregate.count;
      }
    }

    return {
      loading,
      error,
      data: resultData,
      resultCount,
    };
  }
}

export default HighlightRepository;
