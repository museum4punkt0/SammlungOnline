import { ApolloError, gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryRoot, SmbAssortments } from '../../generated/graphql';

const FetchAssortments = gql`
  query FetchAssortments($language: String) {
    smb_assortments(order_by: { key: asc }) {
      key
      preview_image
      i18n(where: { language: { lang: { _eq: $language } } }) {
        abstract
        description
        subtitle
        title
      }
    }
  }
`;

class AssortmentsRepository {
  fetchAssortmentObjects(lang: string): {
    loading: boolean;
    error: ApolloError | undefined;
    data: Array<SmbAssortments> | null;
    resultCount: number;
  } {
    const { loading, error, data } = useQuery<QueryRoot>(FetchAssortments, {
      variables: {
        language: lang,
      },
    });
    let resultData = null;
    let resultCount = 0;

    if (!loading && data && data.smb_assortments.length) {
      resultData = data.smb_assortments;
      resultCount = data.smb_assortments.length;
    }

    return {
      loading,
      error,
      data: resultData,
      resultCount,
    };
  }
}

export default AssortmentsRepository;
